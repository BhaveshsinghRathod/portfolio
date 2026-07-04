// ─────────────────────────────────────────────────────────────
// Tool/lab write-ups. Each entry becomes a page at /writeups/<slug>.
//
// HOW TO ADD A NEW WRITE-UP:
// Copy an existing object below, change the slug (must be unique,
// no spaces — used in the URL), and fill in real content.
//
// `sections` is a flexible list — each section can have any
// combination of: body (paragraph text), commands (array of
// strings, rendered as a terminal block), bullets (array of
// strings, rendered as a list).
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
        heading: "Topoogy",
        commands: ["192.168.56.10: Kali Linux (attacker)",
            "192.168.56.20: Uubuntu Server, headless, Wazuh agent installed, SSH exposed" ,
            "192.168.56.1: macOS host running Wazuh manager + dashboard, receiving forwarded logs from the agent"
        ]
      },
      {
        heading: "Attack Chain (MITRE ATT&CK Mapped)"},
        {
        heading: "1. Reconnaissance - T1046 (Netowrk Service Scanning)",
        commands: ["nmap -sV -p- 192.168.56.20"],
        body: "Identifies SSH (22/TCP) open, OpenSSH version fingerprinted - attacker now knows a viable entry point.",
      },
      {
        heading: "2. Initial Access - T1110.001 (Brute Force: Password Guessing)",
        commands: ["hydra -l ubuntu -P /usr/share/wordlists/rockyou.txt ssh://192.168.56.20 -t 4"],
        body: "Repeated authentication attempts against the ubuntu account until a weak/reused password succeeds.",
      },
      {
        heading: "3. Persistence - T1098.004 (SSH Authorized Keys)",
        commands: ["ssh ubuntu@192.168.56.20",
            "cat id_rsa.pub >> ~/.ssh/authorized_keys"
        ],
        body: "Attacker places their public SSH key in the ubuntu user's ~/.ssh/authorized_keys file, enabling persistent access.",
      },
      {
        heading: "4. Discovery - T1082 / T1033 (System Info / Account Discovery)",
        commands: ["whoami; id; uname -a; cat /etc/passwd; last -a"],
      },
        {
            heading: "How Wazuh Catches each stage",
            bullets: [
                "Recon",
                "Brute-Force",
                "Successful login after failures",
                "Persistence via authorized keys",
            ]
        },
        {
            heading: "Incident Response Timeline",
            bullets: [
                "Wazuh dashboard shows a spike in authenication_failures from 192.168.56.10 against 192.168.56.20",
                "Correlated alerts: successful login immediately following the failure burst -> escalate to high severity.",
                "FIM alert: authorized keys modified on the victim host within seconds of the successful login -> confirms persistence attempt, not just a lucky legitimate login.",
                "Response: isolate the host (or in your automation project's terms, this is exactly the kind of incident your SOAR pipeline would auto-rank and route for approval).",
            ],
        },
        {
            heading: "Mitigation & Remediation",
            bullets: [
                "Immediate: kill the attacker's active session, remove the injected key from authorized_keys, rotate the compromised account's credentials.",
                "Configuration hardening: disable SSH password authentication entirely, enforce key-only auth, move SSh off port 22 or gate it behind a bastion/VPN",
                "Detection hardening: tune the brute force rule threshold to your actual traffic patterns, enable FIM on ~/.ssh/ and /etc/passwd, add active-response to auto-block an IP after N failures.",
                "Long Term: MFA on SSH, network segmentation so the victim host isn't directly reachable from an untrusted segment, centralized alerting to Slack/email so this doesn't rely on someone watching a dashboard.",
            ],
        }
    ],
  },
];