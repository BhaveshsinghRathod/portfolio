// ─────────────────────────────────────────────────────────────
// All portfolio content lives here. Edit this file to update
// text, links, projects, skills, etc. — no need to touch
// component code for content changes.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Bhaveshsingh Rathod",
  role: "SOC Analyst / Security Automation Engineer",
  location: "Chicago, IL",
  tagline: "I build the systems that catch threats faster than a human can blink.",
  summary:
    "CompTIA Security+ certified Cybersecurity Engineering graduate student with hands-on experience building AI-augmented SOAR pipelines on Wazuh SIEM, custom Python and PowerShell automation over REST APIs, and multi-OS endpoint monitoring across Windows, macOS, Linux, iOS, and Android. My detection-automation work cut mean alert triage time by over 90% — from a 45-minute manual process down to under 90 seconds. Targeting SOC Analyst, Security Operations Analyst, Security Automation Engineer, and SIEM Engineer roles, with a focus on scalable detection engineering for an AI-native threat landscape.",
  email: "bhaveshsinghrathod@gmail.com",
  linkedin: "https://linkedin.com/in/REPLACE_ME",
  github: "https://github.com/REPLACE_ME",
  resumeFile: "/resume.pdf",
};

export const stats = [
  { value: "90%+", label: "reduction in mean alert triage time" },
  { value: "45min → <90s", label: "manual triage vs. AI-assisted triage" },
  { value: "6-device", label: "multi-OS lab environment built & monitored" },
];

export const skillGroups = [
  {
    title: "Security Operations",
    items: [
      "Wazuh SIEM",
      "Wazuh EDR",
      "SOAR Automation",
      "Alert Triage & Escalation",
      "Log Ingestion & Correlation",
      "Incident Response",
      "Intrusion Detection",
      "Threat Intelligence Workflows",
      "Vulnerability Management",
      "Endpoint Detection & Response",
    ],
  },
  {
    title: "Detection & Analysis",
    items: [
      "Network Traffic Analysis",
      "Cyber Forensics",
      "Custom Detection Scripting",
      "Back-testing Frameworks",
      "MITRE ATT&CK Framework",
      "NIST CSF",
    ],
  },
  {
    title: "Endpoint & Infrastructure",
    items: [
      "Windows / macOS / Linux",
      "iOS / Android",
      "Kali Linux",
      "Active Directory",
      "VMware / VirtualBox",
      "Docker",
      "Git / GitHub",
    ],
  },
  {
    title: "Languages & Automation",
    items: ["Python", "PowerShell", "Bash", "Go", "Java", "REST API Integration"],
  },
  {
    title: "Security Tools",
    items: ["Burp Suite", "Wireshark", "Nmap"],
  },
  {
    title: "Cryptography & Architecture",
    items: [
      "SHA-256 / Hashing Algorithms",
      "Applied Cryptography",
      "Blockchain Architecture",
      "TCP/IP & Network Security Protocols",
    ],
  },
];

// status: "deployed" | "monitoring" | "archived"
export const projects = [
  {
    status: "deployed",
    period: "May 2026 – Jul 2026",
    title: "Vulnerability Scanner + Risk Prioritization Tool",
    writeupSlug: "vuln-scanner",
    vulnScannerDiagram: true,
    summary:
      "A vulnerability scanner that goes past raw CVSS: it enriches every finding with real EPSS exploitation-probability data and live asset context, then produces a single explainable risk score — the same likelihood × impact × asset-value logic real vuln management teams use.",
    details: [
      "Built and validated end-to-end against a real three-machine home lab: a Kali attack box scanning a headless Ubuntu server running a live MicroK8s cluster + Apache, with a MacBook running enrichment, scoring, the dashboard, and a local LLM layer.",
      "Proved the core value proposition with real data: a 19-year-old Apache Slowloris CVE (CVSS 5.0, 'medium') scored 68.7 (HIGH) and correctly outranked a brand-new 2026 OpenSSH CVE (CVSS 7.5, 'high') that scored only 50.2 (MEDIUM) — because the old bug has a 71.6% real-world EPSS exploitation probability versus under 0.5% for the new one.",
      "Designed a dual-mode asset-context collector — real osquery locally, SSH + native-command fallback remotely — that normalizes both paths to an identical output schema, so installing osquery on a new remote target later requires zero downstream code changes.",
      "Diagnosed and fixed a real network-topology false-negative: an initial scan silently missed 5 of 7 live services because of a hypervisor NAT address masking the VM's real bridged IP — root-caused via ip a / iptables and iptables-legacy inspection before concluding the block was upstream of the guest OS.",
      "Built a 3-layer defense-in-depth architecture for the local LLM narration layer (deterministic input sanitization → a second, different model as verifier → a deterministic regex safety net) after discovering the primary model would reproduce Apache-specific remediation advice for non-Apache findings — the LLM narrates, it never scores.",
    ],
    tools: [
      "nmap",
      "NVD REST API",
      "EPSS API",
      "osquery",
      "Python",
      "SQLite",
      "Streamlit",
      "Plotly",
      "Ollama (llama3.2-3b + phi4-mini)",
    ],
    links: [],
  },
  {
    status: "deployed",
    period: "Mar 2026 – May 2026",
    title: "Enterprise Multi-Model SOAR Automation",
    interactiveDiagram: true,
    summary:
      "An end-to-end agentic SOAR pipeline that ingests security logs, ranks incidents by confidence score, and recommends mitigation — with a human-in-the-loop approval step before anything executes.",
    details: [
      "Architected a local-LLM pipeline (Ollama) that autonomously ranks the top 5 priority incidents by confidence score and selects the optimal mitigation script from a curated response library.",
      "Built a human-in-the-loop approval workflow: the AI presents its recommended action and confidence score, and waits for operator approval — with a fallback to manually select an alternative or escalate.",
      "Automated response actions (alert suppression, IP blocking, endpoint isolation) mapped to MITRE ATT&CK tactics — Initial Access, Execution, Persistence, Lateral Movement — for structured threat categorization.",
      "Built a React frontend, integrated via REST API, giving operators full control: log review, AI recommendation viewing, approve/reject, and manual script selection. Reduced mean triage time from 45 minutes to under 90 seconds.",
      "Engineered automated executive report generation — a one-page post-incident summary of detected threats, confidence scores, actions taken, and escalation decisions for stakeholder communication.",
    ],
    tools: ["Ollama (local LLM)", "Python", "React", "REST API", "MITRE ATT&CK"],
    links: [
      // { label: "GitHub repo", url: "https://github.com/REPLACE_ME/soar-automation" },
      // { label: "Write-up", url: "" },
    ],
  },
  {
    status: "deployed",
    period: "Dec 2025 – Feb 2026",
    title: "Wazuh Home Lab — Multi-OS Threat Detection & Log Analysis",
    writeupSlug: "wazuh-home-lab",
    summary:
      "A local adversarial lab replicating enterprise-scale SOC monitoring: attack simulations against a monitored victim endpoint, tuned Wazuh detection logic, and documented findings mapped to MITRE ATT&CK.",
    details: [
      "Built a local adversarial lab in VirtualBox on macOS: Kali Linux as the attack machine, Ubuntu (headless server) as the victim endpoint, with a Wazuh EDR agent forwarding real-time logs to a centralized Wazuh SIEM dashboard.",
      "Executed attack simulations — brute-force / credential attacks, Nmap port scanning and enumeration, malware behavior observation — against the Ubuntu target, then analyzed the resulting alerts and endpoint telemetry to understand detection logic and correlation.",
      "Designed and tuned Wazuh detection rules and alert thresholds across a 6-device multi-OS environment, replicating enterprise-scale SOC monitoring and triage procedures.",
      "Ran continuous vulnerability assessment workflows across the multi-OS environment, documenting findings and remediation steps aligned to MITRE ATT&CK techniques.",
    ],
    tools: ["Wazuh SIEM/EDR", "Kali Linux", "VirtualBox", "Nmap", "MITRE ATT&CK"],
    links: [],
  },
  {
    status: "archived",
    period: "Nov 2023 – Apr 2024",
    title: "Blockchain-Based Document Storage & Authentication System",
    summary:
      "Led a 3-person team building a decentralized document authentication system, replacing centralized storage to remove single points of failure.",
    details: [
      "Designed and deployed a blockchain-based document authentication system, securing and authenticating multiple documents on a decentralized architecture.",
      "Replaced traditional centralized storage to eliminate single points of failure and reduce unauthorized access risk.",
      "Implemented SHA-256 hashing for tamper-evident, cryptographically verifiable document retrieval on every request.",
    ],
    tools: ["Blockchain", "SHA-256", "Cryptography"],
    links: [],
  },
  {
    status: "archived",
    period: "Oct 2023 – Nov 2023",
    title: "Image Encryption & Decryption Tool",
    summary:
      "A Python-based tool for encrypting and decrypting image files of any major format, built independently.",
    details: [
      "Built a Python-based image encryption tool supporting all major file formats, using symmetric encryption to preserve confidentiality of locally stored assets.",
      "Designed an end-to-end encrypt-store-decrypt pipeline ensuring data remains unreadable at rest, with full recovery on authenticated decryption request.",
    ],
    tools: ["Python", "Symmetric Encryption"],
    links: [],
  },
];

export const certifications = [
  {
    name: "CompTIA Security+",
    issuer: "CompTIA",
    date: "June 2026 – June 2029",
    id: "833460f9513f40068c3145d87b0d6a21",
    verified: true,
    file: "/certificates/Security+.pdf",
  },
  {
    name: "Advent of Cyber 2024",
    issuer: "TryHackMe",
    date: "December 2024",
    id: "24 Cybersecurity Challenges completed",
    verified: true,
    file: "/certificates/THM-TEDGQIRRYD.pdf",
  },
  {
    name: "Cybersecurity Job Simulation",
    issuer: "Telstra (via Forage)",
    date: "July 2024",
    verified: true,
    file: "/certificates/Telstra%20Cybersecurity%20Job%20Simulation.pdf",
  },
  {
    name: "NSE 1 — Network Security Associate",
    issuer: "Fortinet",
    date: "March 2023",
    verified: true,
    file: "/certificates/NSE1.pdf",
  },
  {
    name: "Cybersecurity Job Simulation",
    issuer: "Goldman Sachs (via Forage)",
    date: "September 2022",
    verified: true,
    file: "/certificates/Goldman%20Sachs%20virtual%20program.pdf",
  },
  {
    name: "Cybersecurity Job Simulation",
    issuer: "Mastercard (via Forage)",
    date: "July 2024",
    verified: true,
    file: "/certificates/Mastercard%20Cybersecurity%20Job%20Simulation.pdf",
  },
  {
    name: "Cryptography and Network Security",
    issuer: "NPTEL / IIT Kharagpur",
    date: "Jul – Oct 2022",
    verified: true,
    file: "/certificates/Cryptography%20and%20Network%20Security%20NPTL.jpg",
  },
];

export const education = [
  {
    degree: "Master of Cybersecurity Engineering",
    school: "Illinois Institute of Technology, Chicago, IL",
    period: "Aug 2024 – May 2026",
  },
  {
    degree: "Bachelor of Engineering, Computer Engineering",
    school: "Savitribai Phule Pune University, Pune, Maharashtra, India",
    period: "Aug 2020 – Jun 2024",
  },
];

export const experience = [
  {
    role: "Intern",
    org: "Whitebridge Capital, Singapore (remote)",
    period: "Jan 2026 – Apr 2026",
    points: [
      "Monitored live network traffic and system logs across trading infrastructure in a high-availability financial environment, identifying and escalating cross-domain performance anomalies and policy violations for review.",
      "Supported infrastructure stability by diagnosing and resolving system performance bottlenecks across trading systems, maintaining uptime requirements critical to real-time trading operations.",
      "Managed version control repositories using Git to track configuration changes and ensure deployment stability across distributed remote infrastructure.",
    ],
  },
];

// Mock log lines for the hero ticker — purely decorative, styled like a SIEM feed.
export const tickerLines = [
  { sev: "info", text: "wazuh-agent: heartbeat received — 6/6 endpoints online" },
  { sev: "medium", text: "auth.log: 12 failed SSH attempts — 10.0.0.14 (auto-triaged)" },
  { sev: "low", text: "nmap scan detected — internal subnet, flagged for review" },
  { sev: "high", text: "AI triage: incident #4471 ranked priority 1 — awaiting approval" },
  { sev: "info", text: "report generator: post-incident summary exported (PDF)" },
];

// ─────────────────────────────────────────────────────────────
// Interactive flow diagram data for the SOAR Automation project.
// Edit node text/tools here; diagram layout lives in
// src/components/SoarFlowDiagram.jsx
// ─────────────────────────────────────────────────────────────
export const soarFlow = {
  nodes: {
    ingest: {
      title: "Log Ingestion",
      icon: "database",
      desc: "Wazuh SIEM streams live security logs into the pipeline in real time, across every monitored endpoint.",
      tools: ["Wazuh SIEM", "REST API"],
      log: { sev: "info", text: "ingest: streaming logs from 6 endpoints" },
    },
    triage: {
      title: "AI Triage (Ollama)",
      icon: "brain",
      desc: "A local LLM ranks the top 5 priority incidents by confidence score. Nothing leaves the local environment — no data sent to a third-party API.",
      tools: ["Ollama (local LLM)", "Python"],
      log: { sev: "medium", text: "triage: ranked 5 incidents by confidence score" },
    },
    mitre: {
      title: "MITRE ATT&CK Mapping",
      icon: "target",
      desc: "Each incident is tagged to a tactic — Initial Access, Execution, Persistence, or Lateral Movement — for structured, consistent categorization.",
      tools: ["MITRE ATT&CK"],
      log: { sev: "medium", text: "mitre: incident #4471 tagged — Lateral Movement" },
    },
    approval: {
      title: "Human-in-the-Loop Approval",
      icon: "user-check",
      desc: "The AI presents its recommended action and confidence score. An operator must approve before anything executes — or escalate to manual review.",
      tools: ["React dashboard", "REST API"],
      log: { sev: "high", text: "approval: awaiting operator decision on #4471" },
    },
    respond: {
      title: "Automated Response",
      icon: "shield-check",
      desc: "On approval, the system executes the mitigation immediately — alert suppression, IP blocking, or endpoint isolation.",
      tools: ["Python", "Response script library"],
      log: { sev: "low", text: "response: endpoint isolated — action complete in <90s" },
    },
    escalate: {
      title: "Manual Escalation",
      icon: "user",
      desc: "On rejection, the incident routes to manual analyst review — the operator selects an alternative script or handles it directly.",
      tools: ["Operator judgement"],
      log: { sev: "medium", text: "escalation: routed to analyst for manual handling" },
    },
    report: {
      title: "Executive Report",
      icon: "file-text",
      desc: "A one-page post-incident summary is auto-generated: threats detected, confidence scores, actions taken, and escalation decisions — for stakeholder communication.",
      tools: ["Automated report generation"],
      log: { sev: "info", text: "report: post-incident summary exported (PDF)" },
    },
  },
  sequence: ["ingest", "triage", "mitre", "approval"],
};