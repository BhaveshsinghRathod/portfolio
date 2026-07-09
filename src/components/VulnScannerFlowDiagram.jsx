import { useEffect, useRef, useState } from "react";
import {
  Radar,
  RefreshCw,
  DatabaseZap,
  Laptop,
  Server,
  Gauge,
  LayoutDashboard,
  TrendingUp,
  Sparkles,
  ArrowRight,
  ArrowDown,
  Play,
  RotateCcw,
} from "lucide-react";
import StatusTag from "./StatusTag";

const ICONS = {
  scan: Radar,
  sync: RefreshCw,
  enrich: DatabaseZap,
  local: Laptop,
  ssh: Server,
  risk: Gauge,
  dashboard: LayoutDashboard,
  trend: TrendingUp,
  llm: Sparkles,
};

const NODES = {
  scan: {
    title: "nmap Scan",
    icon: "scan",
    desc: "Full 65535-port scan from the Kali VM — deliberately not the top-1000 default, since an earlier default-port scan silently missed the MicroK8s API server entirely.",
    tools: ["nmap -p- -sV -sC --script vuln"],
    log: { sev: "info", text: "scan: 172.16.121.130 — 7 open services found" },
  },
  sync: {
    title: "Sync to MacBook",
    icon: "sync",
    desc: "rsync (falling back to scp) pulls raw scan XML from Kali to the analyst workstation over key-based SSH.",
    tools: ["rsync", "sync_results.sh"],
    log: { sev: "info", text: "sync: results/scan_172.16.121.130_*.xml pulled" },
  },
  enrich: {
    title: "CVE Enrichment",
    icon: "enrich",
    desc: "Every CVE found gets a real CVSS score from NVD and a real-world exploitation probability from EPSS — batched, rate-limited, and cached locally so repeat runs don't re-hit the API.",
    tools: ["NVD REST API v2.0", "EPSS API (FIRST.org)"],
    log: { sev: "medium", text: "enrich: 5 CVEs resolved via NVD + EPSS" },
  },
  local: {
    title: "Asset Context — Local",
    icon: "local",
    desc: "On the MacBook, real osquery queries pull live OS/ports/packages/session data directly.",
    tools: ["osqueryi --json"],
    log: { sev: "info", text: "asset_context: local osquery — 12 fields collected" },
  },
  ssh: {
    title: "Asset Context — SSH Fallback",
    icon: "ssh",
    desc: "The Ubuntu VM doesn't have osquery installed, so this path SSHs in and runs native commands (ss, who, dpkg-query) instead — normalized to the exact same output schema as the local path, field for field.",
    tools: ["ss -tulnp", "who", "dpkg-query"],
    log: { sev: "info", text: "asset_context: ssh fallback — schema-matched to osquery" },
  },
  risk: {
    title: "Risk Scoring",
    icon: "risk",
    desc: "A simple, explainable formula — not a black box: 40% normalized CVSS + 40% normalized EPSS + 20% normalized asset criticality. The LLM layer downstream narrates this number; it never computes it.",
    tools: ["risk_engine.py"],
    log: { sev: "high", text: "risk_engine: CVE-2007-6750 scored 68.7 (HIGH)" },
  },
  dashboard: {
    title: "Dashboard",
    icon: "dashboard",
    desc: "Streamlit + Plotly: severity/asset breakdown charts, a risk-sorted triage table, and a Data Quality column flagging any missing-data fallbacks.",
    tools: ["Streamlit", "Plotly", "pandas"],
    log: { sev: "info", text: "dashboard: triage table rendered, sorted by risk desc" },
  },
  trend: {
    title: "Trend Tracking",
    icon: "trend",
    desc: "Every run appends to an SQLite history — findings are categorized new / resolved / persisting, with a risk-score delta so a CVE that suddenly gets weaponized is visible.",
    tools: ["SQLite", "trend_tracker.py"],
    log: { sev: "info", text: "trend: 0 new, 1 persisting, 0 resolved" },
  },
  llm: {
    title: "Local LLM Narration",
    icon: "llm",
    desc: "3-layer defense-in-depth — deterministic sanitization, a second model as verifier, and a regex safety net — turns the scored findings into plain-English explanations without ever touching the risk number itself.",
    tools: ["Ollama — llama3.2-3b", "phi4-mini (verifier)"],
    log: { sev: "info", text: "llm: executive summary generated, 0 product-mismatch terms" },
  },
};

const MAIN_SEQUENCE = ["scan", "sync", "enrich"];
const OUTPUT_SEQUENCE = ["dashboard", "trend", "llm"];

function NodeCard({ id, isActive, isHighlighted, onClick, compact = false }) {
  const node = NODES[id];
  const Icon = ICONS[node.icon] || Radar;
  return (
    <button
      onClick={() => onClick(id)}
      className={`flex shrink-0 flex-col gap-2 rounded-xl border p-4 text-left transition-all ${
        compact ? "w-full sm:w-44" : "w-40 sm:w-44"
      } ${
        isHighlighted
          ? "scale-[1.03] border-amber bg-amber-soft shadow-md"
          : isActive
            ? "border-ink bg-panel shadow-sm"
            : "border-line bg-panel hover:border-ink/30"
      }`}
    >
      <Icon size={18} strokeWidth={1.75} className={isHighlighted ? "text-amber" : "text-steel"} />
      <span className="font-display text-[13px] font-semibold leading-snug text-ink">
        {node.title}
      </span>
    </button>
  );
}

function Connector({ vertical = false }) {
  return vertical ? (
    <ArrowDown size={16} className="mx-auto shrink-0 text-mist" />
  ) : (
    <ArrowRight size={16} className="mx-2 shrink-0 self-center text-mist sm:mx-3" />
  );
}

export default function VulnScannerFlowDiagram() {
  const [mode, setMode] = useState("explore");
  const [activeId, setActiveId] = useState("scan");
  const [simIndex, setSimIndex] = useState(-1);
  const [awaitingChoice, setAwaitingChoice] = useState(false);
  const [assetChoice, setAssetChoice] = useState(null); // "local" | "ssh"
  const [riskRevealed, setRiskRevealed] = useState(false);
  const [finished, setFinished] = useState(false);
  const [logLines, setLogLines] = useState([]);
  const timerRef = useRef(null);

  const currentHighlightId =
    mode === "simulate"
      ? finished
        ? null
        : riskRevealed
          ? "risk"
          : assetChoice
            ? assetChoice
            : simIndex >= 0
              ? MAIN_SEQUENCE[simIndex]
              : null
      : null;

  const pushLog = (id) => setLogLines((prev) => [...prev, { id, ...NODES[id].log }]);

  const startSimulation = () => {
    clearTimeout(timerRef.current);
    setMode("simulate");
    setLogLines([]);
    setAssetChoice(null);
    setRiskRevealed(false);
    setFinished(false);
    setAwaitingChoice(false);
    setSimIndex(0);
    pushLog(MAIN_SEQUENCE[0]);
  };

  const resetSimulation = () => {
    clearTimeout(timerRef.current);
    setMode("explore");
    setSimIndex(-1);
    setAwaitingChoice(false);
    setAssetChoice(null);
    setRiskRevealed(false);
    setFinished(false);
    setLogLines([]);
    setActiveId("scan");
  };

  useEffect(() => {
    if (mode !== "simulate" || finished || awaitingChoice || riskRevealed) return;
    if (simIndex < 0) return;

    if (simIndex >= MAIN_SEQUENCE.length - 1) {
      timerRef.current = setTimeout(() => setAwaitingChoice(true), 900);
      return () => clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      const next = simIndex + 1;
      setSimIndex(next);
      pushLog(MAIN_SEQUENCE[next]);
    }, 1200);

    return () => clearTimeout(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, simIndex, awaitingChoice, finished, riskRevealed]);

  const handleChoice = (choice) => {
    setAwaitingChoice(false);
    setAssetChoice(choice);
    pushLog(choice);
    timerRef.current = setTimeout(() => {
      pushLog("risk");
      setRiskRevealed(true);
      timerRef.current = setTimeout(() => {
        OUTPUT_SEQUENCE.forEach((id) => pushLog(id));
        setFinished(true);
      }, 1600);
    }, 1200);
  };

  const activeNode =
    mode === "explore" ? NODES[activeId] : NODES[currentHighlightId] || NODES.enrich;

  return (
    <div className="rounded-2xl border border-line bg-paper p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wide text-mist">
            Interactive pipeline
          </p>
          <h4 className="font-display text-base font-semibold text-ink">How it actually works</h4>
        </div>
        {mode === "simulate" ? (
          <button
            onClick={resetSimulation}
            className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 font-mono text-[12px] text-steel hover:border-ink hover:text-ink"
          >
            <RotateCcw size={13} /> Reset
          </button>
        ) : (
          <button
            onClick={startSimulation}
            className="flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-1.5 font-mono text-[12px] font-medium text-paper hover:bg-ink/90"
          >
            <Play size={13} /> Run simulation
          </button>
        )}
      </div>

      {/* Main sequence */}
      <div className="mt-6 flex flex-col items-stretch gap-1 sm:flex-row sm:items-center sm:overflow-x-auto sm:pb-2">
        {MAIN_SEQUENCE.map((id, i) => (
          <div key={id} className="flex flex-col items-center sm:flex-row">
            <NodeCard
              id={id}
              isActive={mode === "explore" && activeId === id}
              isHighlighted={mode === "simulate" && currentHighlightId === id}
              onClick={(cid) => mode === "explore" && setActiveId(cid)}
            />
            {i < MAIN_SEQUENCE.length - 1 && (
              <>
                <span className="sm:hidden">
                  <Connector vertical />
                </span>
                <span className="hidden sm:inline">
                  <Connector />
                </span>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="mt-2 flex justify-center">
        <Connector vertical />
      </div>

      {/* Asset context branch */}
      {mode === "simulate" && awaitingChoice ? (
        <div className="mx-auto mt-2 flex max-w-md flex-col items-center gap-3 rounded-xl border border-amber bg-amber-soft p-5 text-center">
          <p className="font-mono text-[12px] font-medium text-ink">
            Which asset context source? Both produce an identical output schema.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => handleChoice("local")}
              className="rounded-full bg-verified px-4 py-2 font-mono text-[12px] font-medium text-white hover:opacity-90"
            >
              💻 Local (osquery)
            </button>
            <button
              onClick={() => handleChoice("ssh")}
              className="rounded-full bg-ink px-4 py-2 font-mono text-[12px] font-medium text-white hover:opacity-90"
            >
              🖥️ Remote (SSH fallback)
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-2 flex flex-col items-center justify-center gap-1 sm:flex-row sm:gap-4">
          <NodeCard
            id="local"
            compact
            isActive={mode === "explore" && activeId === "local"}
            isHighlighted={mode === "simulate" && currentHighlightId === "local"}
            onClick={(id) => mode === "explore" && setActiveId(id)}
          />
          <span className="font-mono text-[11px] text-mist">or</span>
          <NodeCard
            id="ssh"
            compact
            isActive={mode === "explore" && activeId === "ssh"}
            isHighlighted={mode === "simulate" && currentHighlightId === "ssh"}
            onClick={(id) => mode === "explore" && setActiveId(id)}
          />
        </div>
      )}

      <div className="mt-2 flex justify-center">
        <Connector vertical />
      </div>

      <div className="flex justify-center">
        <NodeCard
          id="risk"
          compact
          isActive={mode === "explore" && activeId === "risk"}
          isHighlighted={mode === "simulate" && currentHighlightId === "risk"}
          onClick={(id) => mode === "explore" && setActiveId(id)}
        />
      </div>

      {/* Real proof-point reveal */}
      {mode === "simulate" && riskRevealed && (
        <div className="mx-auto mt-4 max-w-lg rounded-xl border border-verified bg-verified-soft p-4">
          <p className="font-mono text-[11px] font-medium uppercase tracking-wide text-verified">
            Real validation result
          </p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-ink">
            CVE-2007-6750 (Slowloris) — CVSS 5.0 "medium," EPSS 71.6% →{" "}
            <strong>68.7 HIGH</strong>. Outranked CVE-2026-35385 (OpenSSH) — CVSS 7.5 "high," EPSS
            0.4% → <strong>50.2 MEDIUM</strong>. EPSS-weighted prioritization beat raw CVSS on
            real data.
          </p>
        </div>
      )}

      <div className="mt-2 flex justify-center">
        <Connector vertical />
      </div>

      {/* Output row */}
      <div className="flex flex-col items-center justify-center gap-1 sm:flex-row sm:gap-4">
        {OUTPUT_SEQUENCE.map((id) => (
          <NodeCard
            key={id}
            id={id}
            compact
            isActive={mode === "explore" && activeId === id}
            isHighlighted={mode === "simulate" && finished}
            onClick={(cid) => mode === "explore" && setActiveId(cid)}
          />
        ))}
      </div>

      {/* Detail panel */}
      <div className="mt-6 rounded-xl border border-line bg-panel p-5">
        <h5 className="font-display text-[14px] font-semibold text-ink">{activeNode.title}</h5>
        <p className="mt-1.5 text-[13px] leading-relaxed text-steel">{activeNode.desc}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {activeNode.tools.map((t) => (
            <span key={t} className="rounded-md bg-paper px-2 py-1 font-mono text-[11px] text-steel">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Live log */}
      {mode === "simulate" && logLines.length > 0 && (
        <div className="mt-4 rounded-xl border border-line bg-ink p-4">
          <p className="font-mono text-[10px] uppercase tracking-wide text-paper/40">live log</p>
          <div className="mt-2 flex flex-col gap-2">
            {logLines.map((l, i) => (
              <div key={i} className="flex items-center gap-2">
                <StatusTag status={l.sev} />
                <span className="font-mono text-[12px] text-paper/80">{l.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}