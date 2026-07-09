// ─────────────────────────────────────────────────────────────
// Tool/lab write-ups. Each entry becomes a page at /writeups/<slug>.
//
// HOW TO ADD A NEW WRITE-UP:
// Copy an existing object below, change the slug (must be unique,
// no spaces — used in the URL), and fill in real content.
//
// `sections` is a flexible list — each section can have any
// combination of: body (paragraph text), commands (array of
// strings, rendered as a terminal block), formula (string,
// rendered as a plain code block), table ({headers, rows}),
// bullets (array of strings), gallery (array of {src, caption}).
//
// IMPORTANT: only put commands/findings you actually ran/observed.
// This is a professional portfolio — everything here should be
// something you can explain in an interview.
// ─────────────────────────────────────────────────────────────

export const writeups = [
  {
    slug: "wazuh-home-lab",
    title: "Wazuh Home Lab — Setup, Detection Tuning & Findings",
    tool: "Wazuh SIEM / EDR",
    date: "Dec 2025 – Feb 2026",
    status: "deployed",
    tags: ["Wazuh", "Kali Linux", "VirtualBox", "Nmap", "MITRE ATT&CK"],
    summary:
      "TODO: one or two sentences summarizing this report for the index card — e.g. what environment you built and the headline finding.",
    relatedProjectTitle: "Wazuh Home Lab — Multi-OS Threat Detection & Log Analysis",
    sections: [
      {
        heading: "Objective",
        body:
          "TODO: What were you trying to accomplish with this lab? e.g. replicate an enterprise SOC monitoring setup, learn Wazuh rule tuning, practice detecting common attack techniques.",
      },
      {
        heading: "Environment & Setup",
        body:
          "TODO: Describe the lab topology — hypervisor, VM specs, network setup. e.g. 'VirtualBox on macOS host, Kali Linux attacker VM on a NAT network, Ubuntu Server victim VM running the Wazuh agent, Wazuh manager + dashboard on a separate VM.'",
        commands: [
          "# TODO: replace with the actual commands you ran to install/configure Wazuh",
          "# e.g. curl -sO https://packages.wazuh.com/4.x/wazuh-install.sh",
          "# e.g. sudo bash wazuh-install.sh -a",
        ],
      },
      {
        heading: "Attack Simulation & Commands",
        body:
          "TODO: Describe each simulated attack and the exact commands used from the Kali attacker VM.",
        commands: [
          "# TODO: e.g. nmap -sV -p- 192.168.56.20",
          "# TODO: e.g. hydra -l admin -P rockyou.txt ssh://192.168.56.20",
        ],
      },
      {
        heading: "Detection Rule Tuning",
        body:
          "TODO: Which Wazuh rules did you tune or write? Reference rule IDs if you have them, and explain what threshold/logic you changed and why.",
      },
      {
        heading: "Findings",
        bullets: [
          "TODO: e.g. Default Wazuh SSH brute-force rule triggered after 8 failed attempts within 120s — tuned threshold to reduce false positives from a legitimate automated backup job.",
          "TODO: e.g. Nmap full port scans were not flagged by default rule set — added a custom rule keyed on Suricata/Zeek port-scan signatures.",
          "TODO: add more findings as bullet points",
        ],
      },
      {
        heading: "Takeaways",
        body:
          "TODO: What would you do differently at enterprise scale? What did this teach you about detection engineering tradeoffs (noise vs. coverage)?",
      },
    ],
  },
  {
    slug: "vuln-scanner",
    title: "Vulnerability Scanner + Risk Prioritization Tool",
    tool: "nmap, NVD/EPSS APIs, osquery, Streamlit, Ollama",
    date: "May 2026 – Jul 2026",
    status: "deployed",
    tags: ["nmap", "NVD", "EPSS", "osquery", "Python", "Streamlit", "Ollama"],
    summary:
      "A vulnerability scanner that prioritizes findings by real-world exploitation likelihood (EPSS) and live asset context, not just raw CVSS — validated end-to-end against a real 3-machine home lab.",
    relatedProjectTitle: "Vulnerability Scanner + Risk Prioritization Tool",
    sections: [
      {
        heading: "Overview",
        body:
          "This tool scans a target host for open ports and known vulnerabilities, enriches every finding with real CVE data (severity) and real-world exploitation likelihood, weighs it against how important the affected asset actually is, and produces a single prioritized risk score per finding — the same 'likelihood × impact × asset value' logic real vulnerability management teams use, instead of just sorting a vuln list by raw CVSS. Two things separate this from a basic scanner wrapper: EPSS-weighted prioritization (proven with real data — see Real Findings below) and live asset context pulled via osquery/SSH rather than a static spreadsheet of 'this server is important.'",
      },
      {
        heading: "Lab Topology",
        table: {
          headers: ["Machine", "Role", "Key detail"],
          rows: [
            ["Kali VM", "Attacker-perspective scanner", "172.16.121.128, user dr1ftkali, bridged networking"],
            [
              "Ubuntu Server VM",
              "Scan target",
              "172.16.121.130, Ubuntu 26.04, runs MicroK8s + Apache + Mosquitto, user dr1ftubuntu",
            ],
            [
              "MacBook",
              "Analyst workstation",
              "Runs enrichment, scoring, dashboard, and local LLM layer; osquery installed locally",
            ],
          ],
        },
      },
      {
        heading: "Why This Topology",
        body:
          "Scanning happens on Kali — a realistic attacker vantage point — while enrichment, scoring, and the dashboard run on the Mac, which has a better Python/analysis environment. This mirrors how real pentest and vuln-management workflows separate the recon box from the analyst workstation, and is why a sync script and dual-mode asset-context collection (real osquery locally, SSH + native-command fallback remotely) exist at all.",
      },
      {
        heading: "Tech Stack",
        table: {
          headers: ["Component", "Tool", "Why"],
          rows: [
            ["Port/service/vuln scanning", "nmap 7.98 (-p- -sV -sC --script vuln)", "Full 65535-port coverage — default top-1000 misses Kubernetes entirely"],
            ["CVE severity data", "NVD REST API v2.0", "Authoritative CVSS scores + descriptions"],
            ["Exploitation likelihood", "EPSS API (FIRST.org)", "Real-world exploitation probability — the key differentiator vs. CVSS-only tools"],
            ["Asset context (local)", "osquery", "Live OS/ports/packages/sessions on the MacBook"],
            ["Asset context (remote)", "SSH + native commands (ss, who, dpkg-query)", "Ubuntu VM has no osquery — same output schema as the local path"],
            ["Dashboard", "Streamlit + Plotly + pandas", "Fast to build, good for a portfolio demo"],
            ["Local LLM", "Ollama — llama3.2-3b + phi4-mini", "Plain-English explanations without touching the actual risk score"],
          ],
        },
      },
      {
        heading: "Phase 1 — Scan Engine",
        body:
          "Runs nmap against a target from the Kali VM and parses the resulting XML into structured JSON findings. Scan arguments are read from a config file, not hardcoded.",
        commands: [
          "cd ~/vuln-scanner",
          "python3 scanner/nmap_scan.py 172.16.121.130",
          "# config/targets.yaml:",
          "# nmap_args: \"-p- -sV -sC --script vuln -T4 --open\"",
        ],
      },
      {
        heading: "Phase 2 — Sync & CVE Enrichment",
        body:
          "Results sync from Kali to the MacBook over SSH, then every CVE found gets a real CVSS score from NVD and a real-world exploitation probability from EPSS — batched and cached locally so repeat runs don't re-hit the API.",
        commands: [
          "# on the MacBook:",
          "./scanner/sync_results.sh dr1ftkali@172.16.121.128",
          "python3 main.py --skip-scan results/scan_172.16.121.130_<timestamp>.xml",
        ],
      },
      {
        heading: "Phase 3 — Asset Context",
        body:
          "Two collection modes, deliberately built to the same output schema: real osquery on the MacBook, SSH + native commands on the Ubuntu VM (which doesn't have osquery installed).",
        commands: [
          "python3 scanner/asset_context.py ssh dr1ftubuntu@172.16.121.130",
          "python3 scanner/asset_context.py local",
        ],
      },
      {
        heading: "Phase 4 — Risk Scoring",
        body:
          "A simple, explainable formula — not a black box. Asset criticality itself gets adjusted from a human-assigned base value using live signals: active sessions present (+0.5), listening service count over 20 (+1.0) or over 10 (+0.5), capped at 5.0. On the real Ubuntu VM, base criticality 4 was adjusted to 5.0 after detecting 27 listening services.",
        formula:
          "normalized_cvss  = cvss_score / 10\nnormalized_epss  = epss_score              (already 0-1)\nnormalized_asset = asset_criticality / 5\n\nrisk_score = (normalized_cvss * 0.4 + normalized_epss * 0.4 + normalized_asset * 0.2) * 100\n\nSeverity bands: CRITICAL ≥ 80, HIGH ≥ 60, MEDIUM ≥ 35, LOW < 35",
      },
      {
        heading: "Phase 5 & 6 — Dashboard & Trend Tracking",
        body:
          "The dashboard reads scan results and presents severity/asset breakdown charts, a risk-sorted triage table, per-CVE detail, and data-quality flags for any missing-data fallbacks. Every run also appends to an SQLite history — findings are categorized new / resolved / persisting, with cross-scan identity keyed on (asset, host, port, protocol, CVE ID) so the same CVE on two different hosts is never confused as one finding.",
        commands: [
          "streamlit run dashboard/app.py",
          "python3 scanner/trend_tracker.py list",
          "python3 scanner/trend_tracker.py compare --latest",
        ],
      },
      {
        heading: "Phase 7 — Local LLM Layer",
        body:
          "The LLM narrates; it never scores. Every risk number anywhere in this project comes from the deterministic risk engine, regardless of what any LLM-generated text says. A 3-layer defense-in-depth design fixed a real failure mode: the primary model (llama3.2-3b) would reproduce Apache-specific remediation advice for non-Apache findings, because the source NVD description was written for Apache and present verbatim in the prompt. Layer 1 sanitizes the input before it reaches any LLM; Layer 2 uses a second, different model (phi4-mini) as a verifier when needed; Layer 3 is a deterministic regex safety net that guarantees zero factually-wrong product claims ever reach the screen.",
        commands: [
          "python3 scanner/llm_analysis.py summarize results/enriched_findings.json --cve CVE-2007-6750",
          "python3 scanner/llm_analysis.py executive-summary results/enriched_findings.json",
          "python3 scanner/llm_analysis.py trend --old 1 --new 2",
        ],
      },
      {
        heading: "Full Pipeline — One Command",
        commands: [
          "python3 main.py                                          # scan + enrich + score + record history",
          "python3 main.py --skip-scan results/scan_<...>.xml        # skip scanning, process existing XML",
        ],
      },
      {
        heading: "Real Findings & Troubleshooting",
        body:
          "These came from actually running this against live infrastructure, not synthetic testing.",
        bullets: [
          "nmap's default port range misses Kubernetes entirely: initial scans using nmap's default (top 1000 ports) found only ports 22 and 80 open, while ss -tulnp on the VM directly showed 7 reachable services, including the MicroK8s API server on 16443 and kubelet on 10250 — neither in nmap's default list. Fixed by switching to -p- (all 65535 ports), trading ~15s for ~9-10 minutes of scan time for accuracy.",
          "NAT vs. bridged networking caused a full false-negative scan: early scans against a hypervisor NAT address found the same 3 ports missing every time. Ruled out a guest firewall (ufw, iptables, iptables-legacy all checked). Root cause: the scanned IP was forwarding only SSH — the VM's real interface address was different. Switching to bridged networking and rescanning the correct IP revealed the full, accurate attack surface.",
          "EPSS correctly beat CVSS in a real prioritization decision: CVE-2007-6750 (Slowloris, CVSS 5.0 'medium,' EPSS 71.6%) scored 68.7 (HIGH) and correctly outranked CVE-2026-35385 (a brand-new OpenSSH CVE, CVSS 7.5 'high,' EPSS 0.4%), which scored only 50.2 (MEDIUM) — proven against genuine NVD/EPSS data, not a contrived example.",
          "Config drift between the test harness and the real pipeline: the scanner module's standalone test block had its own hardcoded nmap arguments, separate from the main config. When the config was updated, standalone test runs silently kept using stale arguments. Fixed by making the test harness load from the same config file the real pipeline uses.",
          "LLM product-mismatch hallucination: see the Local LLM Layer section above — root-caused and fixed with a 3-layer defense-in-depth design rather than just better prompting.",
        ],
      },
      {
        heading: "Key Design Decisions",
        bullets: [
          "Explainable risk formula, not a black box — 40% CVSS + 40% EPSS + 20% asset criticality is a simple, documented, defensible weighting.",
          "Graceful degradation everywhere — every external dependency (NVD, EPSS, SSH, osquery, Ollama) fails without crashing the pipeline; a partial result beats a hard crash in a real ops tool.",
          "Schema parity across dual collection modes — the osquery-local and SSH-fallback asset context paths produce identical output shapes, so installing real osquery on a new target later requires zero downstream code changes.",
          "Missing data is flagged, never silently defaulted — cvss_was_missing / epss_was_missing flags flow all the way to the dashboard's Data Quality column.",
          "The LLM narrates; it never scores — every risk number displayed anywhere comes from the deterministic risk engine.",
          "Append-only history — scan history is never overwritten, so historical comparison is always possible.",
        ],
      },
      {
        heading: "Screenshots",
        body:
          "TODO: drop screenshots into public/screenshots/vuln-scanner/ using the filenames below (or update the paths here to match your own filenames).",
        gallery: [
          { src: "/screenshots/vuln-scanner/dashboard-overview.png", caption: "Dashboard — severity & asset breakdown" },
          { src: "/screenshots/vuln-scanner/triage-table.png", caption: "Risk-sorted triage table" },
          { src: "/screenshots/vuln-scanner/cve-detail.png", caption: "Per-CVE detail view" },
          { src: "/screenshots/vuln-scanner/trend-comparison.png", caption: "Trend tracking — scan-to-scan diff" },
        ],
      },
    ],
  },
];