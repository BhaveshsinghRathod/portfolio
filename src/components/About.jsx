import { profile, education } from "../data/content";

export default function About() {
  return (
    <section id="about" className="border-b border-line py-20">
      <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="font-mono text-[12px] uppercase tracking-wider text-amber">About</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Detection engineering, treated like a product problem.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-steel">
            {profile.summary}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <p className="font-mono text-[12px] uppercase tracking-wider text-mist">Education</p>
          {education.map((e) => (
            <div key={e.degree} className="rounded-xl border border-line bg-panel p-5">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-base font-semibold text-ink">{e.degree}</h3>
                <span className="shrink-0 font-mono text-[11px] text-mist">{e.period}</span>
              </div>
              <p className="mt-1.5 text-sm text-steel">{e.school}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
