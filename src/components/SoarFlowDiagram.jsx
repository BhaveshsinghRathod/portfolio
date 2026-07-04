import { useEffect, useRef, useState } from "react";
import {
  Database,
  Brain,
  Target,
  UserCheck,
  ShieldCheck,
  User,
  FileText,
  ArrowRight,
  ArrowDown,
  Play,
  RotateCcw,
} from "lucide-react";
import { soarFlow } from "../data/content";
import StatusTag from "./StatusTag";

const ICONS = {
  database: Database,
  brain: Brain,
  target: Target,
  "user-check": UserCheck,
  "shield-check": ShieldCheck,
  user: User,
  "file-text": FileText,
};

function NodeCard({ id, node, isActive, isHighlighted, onClick, compact = false }) {
  const Icon = ICONS[node.icon] || Database;
  return (
    <button
      onClick={() => onClick(id)}
      className={`flex shrink-0 flex-col gap-2 rounded-xl border p-4 text-left transition-all ${
        compact ? "w-full sm:w-48" : "w-40 sm:w-44"
      } ${
        isHighlighted
          ? "border-amber bg-amber-soft shadow-md scale-[1.03]"
          : isActive
            ? "border-ink bg-panel shadow-sm"
            : "border-line bg-panel hover:border-ink/30"
      }`}
    >
      <Icon
        size={18}
        strokeWidth={1.75}
        className={isHighlighted ? "text-amber" : "text-steel"}
      />
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

export default function SoarFlowDiagram() {
  const [mode, setMode] = useState("explore"); // "explore" | "simulate"
  const [activeId, setActiveId] = useState("ingest");
  const [simIndex, setSimIndex] = useState(-1); // index into sequence
  const [awaitingDecision, setAwaitingDecision] = useState(false);
  const [decision, setDecision] = useState(null); // "respond" | "escalate" | null
  const [finished, setFinished] = useState(false);
  const [logLines, setLogLines] = useState([]);
  const timerRef = useRef(null);

  const { nodes, sequence } = soarFlow;

  const currentHighlightId =
    mode === "simulate"
      ? finished
        ? "report"
        : decision
          ? decision
          : simIndex >= 0
            ? sequence[simIndex]
            : null
      : null;

  const pushLog = (nodeId) => {
    setLogLines((prev) => [...prev, { id: nodeId, ...nodes[nodeId].log }]);
  };

  const startSimulation = () => {
    clearTimeout(timerRef.current);
    setMode("simulate");
    setLogLines([]);
    setDecision(null);
    setFinished(false);
    setAwaitingDecision(false);
    setSimIndex(0);
    pushLog(sequence[0]);
  };

  const resetSimulation = () => {
    clearTimeout(timerRef.current);
    setMode("explore");
    setSimIndex(-1);
    setAwaitingDecision(false);
    setDecision(null);
    setFinished(false);
    setLogLines([]);
    setActiveId("ingest");
  };

  useEffect(() => {
    if (mode !== "simulate" || finished || awaitingDecision) return;
    if (simIndex < 0) return;

    if (simIndex >= sequence.length - 1) {
      timerRef.current = setTimeout(() => setAwaitingDecision(true), 900);
      return () => clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      const next = simIndex + 1;
      setSimIndex(next);
      pushLog(sequence[next]);
    }, 1300);

    return () => clearTimeout(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, simIndex, awaitingDecision, finished]);

  const handleDecision = (choice) => {
    setAwaitingDecision(false);
    setDecision(choice);
    pushLog(choice);
    timerRef.current = setTimeout(() => {
      pushLog("report");
      setFinished(true);
    }, 1300);
  };

  const activeNode = mode === "explore" ? nodes[activeId] : nodes[currentHighlightId] || nodes.approval;

  return (
    <div className="rounded-2xl border border-line bg-paper p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wide text-mist">
            Interactive pipeline
          </p>
          <h4 className="font-display text-base font-semibold text-ink">How it actually works</h4>
        </div>
        <div className="flex gap-2">
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
      </div>

      <div className="mt-6 flex flex-col items-stretch gap-1 sm:flex-row sm:items-center sm:overflow-x-auto sm:pb-2">
        {sequence.map((id, i) => (
          <div key={id} className="flex flex-col items-center sm:flex-row">
            <NodeCard
              id={id}
              node={nodes[id]}
              isActive={mode === "explore" && activeId === id}
              isHighlighted={mode === "simulate" && currentHighlightId === id}
              onClick={(clickedId) => mode === "explore" && setActiveId(clickedId)}
            />
            {i < sequence.length - 1 && (
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

      <div className="mt-2 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-3">
        <Connector vertical />
      </div>

      {mode === "simulate" && awaitingDecision ? (
        <div className="mx-auto mt-2 flex max-w-md flex-col items-center gap-3 rounded-xl border border-amber bg-amber-soft p-5 text-center">
          <p className="font-mono text-[12px] font-medium text-ink">
            Operator decision required — approve automated response?
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => handleDecision("respond")}
              className="rounded-full bg-verified px-4 py-2 font-mono text-[12px] font-medium text-white hover:opacity-90"
            >
              ✓ Approve
            </button>
            <button
              onClick={() => handleDecision("escalate")}
              className="rounded-full bg-alert px-4 py-2 font-mono text-[12px] font-medium text-white hover:opacity-90"
            >
              ↑ Escalate to analyst
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-2 flex flex-col items-center justify-center gap-1 sm:flex-row sm:gap-4">
          <NodeCard
            id="respond"
            node={nodes.respond}
            compact
            isActive={mode === "explore" && activeId === "respond"}
            isHighlighted={mode === "simulate" && currentHighlightId === "respond"}
            onClick={(id) => mode === "explore" && setActiveId(id)}
          />
          <span className="font-mono text-[11px] text-mist">or</span>
          <NodeCard
            id="escalate"
            node={nodes.escalate}
            compact
            isActive={mode === "explore" && activeId === "escalate"}
            isHighlighted={mode === "simulate" && currentHighlightId === "escalate"}
            onClick={(id) => mode === "explore" && setActiveId(id)}
          />
        </div>
      )}

      <div className="mt-2 flex justify-center">
        <Connector vertical />
      </div>

      <div className="flex justify-center">
        <NodeCard
          id="report"
          node={nodes.report}
          compact
          isActive={mode === "explore" && activeId === "report"}
          isHighlighted={mode === "simulate" && currentHighlightId === "report" && finished}
          onClick={(id) => mode === "explore" && setActiveId(id)}
        />
      </div>

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

      {mode === "simulate" && logLines.length > 0 && (
        <div className="mt-4 rounded-xl border border-line bg-ink p-4">
          <p className="font-mono text-[10px] uppercase tracking-wide text-paper/40">
            live log
          </p>
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