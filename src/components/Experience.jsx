import { experience } from "../data/content";

export default function Experience() {
  return (
    <section id="experience" className="border-b border-line py-20">
      <div className="container-page">
        <p className="font-mono text-[12px] uppercase tracking-wider text-amber">Track record</p>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Experience
        </h2>

        <div className="mt-12 flex flex-col gap-8">
          {experience.map((e) => (
            <div key={e.role + e.org} className="grid grid-cols-1 gap-4 sm:grid-cols-[220px_1fr]">
              <div>
                <p className="font-display text-base font-semibold text-ink">{e.role}</p>
                <p className="text-[14px] text-steel">{e.org}</p>
                <p className="mt-1 font-mono text-[11px] text-mist">{e.period}</p>
              </div>
              <ul className="flex flex-col gap-3 border-l border-line pl-6">
                {e.points.map((p, i) => (
                  <li key={i} className="flex gap-3 text-[14px] leading-relaxed text-steel">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
