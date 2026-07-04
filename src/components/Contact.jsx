import { profile } from "../data/content";

export default function Contact() {
  return (
    <section id="contact" className="bg-ink py-20">
      <div className="container-page">
        <div className="flex flex-col gap-6">
          <p className="font-mono text-[12px] uppercase tracking-wider text-amber">Contact</p>
          <h2 className="max-w-xl font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
            Let's talk about your SOC.
          </h2>
          <p className="max-w-lg text-[15px] leading-relaxed text-paper/70">
            Open to SOC Analyst, Security Operations Analyst, Security Automation Engineer, and
            SIEM Engineer roles. Based in {profile.location} — open to remote and relocation.
          </p>

          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <a
              href={`mailto:${profile.email}`}
              className="font-mono text-lg font-medium text-paper underline decoration-amber underline-offset-4 hover:text-amber"
            >
              {profile.email}
            </a>
            <span className="font-mono text-sm text-paper/50">{profile.phone}</span>
          </div>

          <div className="mt-4 flex flex-wrap gap-4">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-paper/30 px-5 py-2.5 font-mono text-[13px] text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink"
            >
              LinkedIn ↗
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-paper/30 px-5 py-2.5 font-mono text-[13px] text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink"
            >
              GitHub ↗
            </a>
            <a
              href={profile.resumeFile}
              className="rounded-full bg-amber px-5 py-2.5 font-mono text-[13px] font-medium text-ink transition-transform hover:-translate-y-0.5"
            >
              Download résumé ↓
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-paper/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] text-paper/40">
            © {new Date().getFullYear()} {profile.name}. Built and monitored personally.
          </p>
          <p className="font-mono text-[11px] text-paper/40">status: available</p>
        </div>
      </div>
    </section>
  );
}
