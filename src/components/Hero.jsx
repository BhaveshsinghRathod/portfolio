import { profile, stats, tickerLines } from "../data/content";
import StatusTag from "./StatusTag";

export default function Hero() {
  const doubled = [...tickerLines, ...tickerLines];

  return (
    <section id="top" className="relative overflow-hidden border-b border-line">
      <div className="container-page flex flex-col gap-10 pb-16 pt-20 sm:pt-28">
        <div className="flex max-w-3xl flex-col gap-6">
          <div className="flex items-center gap-2">
            <StatusTag status="deployed" />
            <span className="font-mono text-[12px] text-mist">
              open to SOC Analyst / Security Automation roles
            </span>
          </div>

          <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-6xl">
            {profile.tagline}
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-steel sm:text-lg">
            I'm {profile.name} — a {profile.role.toLowerCase()} based in {profile.location}. I
            build detection pipelines, tune SIEM logic, and automate the alert-to-response
            workflow so analysts spend less time triaging and more time hunting.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#projects"
              className="rounded-full bg-ink px-5 py-3 font-mono text-[13px] font-medium text-paper transition-transform hover:-translate-y-0.5"
            >
              View case files →
            </a>
            <a
              href="#contact"
              className="rounded-full border border-ink px-5 py-3 font-mono text-[13px] font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              Get in touch
            </a>
          </div>
        </div>

        {/* Stat strip */}
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="bg-panel p-6">
              <div className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                {s.value}
              </div>
              <div className="mt-1 font-mono text-[12px] leading-snug text-steel">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Signature element: live SIEM-style feed ticker */}
      <div className="border-t border-line bg-ink py-3">
        <div className="flex overflow-hidden">
          <div className="ticker-track flex shrink-0 items-center gap-10 whitespace-nowrap pr-10">
            {doubled.map((line, i) => (
              <div key={i} className="flex items-center gap-2.5 font-mono text-[12px] text-paper/80">
                <StatusTag status={line.sev} />
                <span>{line.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
