import { Link } from "react-router-dom";
import { writeups } from "../data/writeups";
import StatusTag from "../components/StatusTag";

export default function WriteupsIndex() {
  return (
    <section className="py-20">
      <div className="container-page">
        <p className="font-mono text-[12px] uppercase tracking-wider text-amber">Field notes</p>
        <h1 className="mt-3 max-w-xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Tool write-ups
        </h1>
        <p className="mt-4 max-w-xl text-[15px] text-steel">
          Setup notes, commands, and findings from hands-on work with each tool — the kind of
          detail that doesn't fit on a resume.
        </p>

        {writeups.length === 0 ? (
          <p className="mt-12 text-[14px] text-mist">No write-ups published yet — check back soon.</p>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {writeups.map((w) => (
              <Link
                key={w.slug}
                to={`/writeups/${w.slug}`}
                className="group flex flex-col gap-3 rounded-2xl border border-line bg-panel p-6 transition-all hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <StatusTag status={w.status} />
                  <span className="font-mono text-[11px] text-mist">{w.date}</span>
                </div>
                <h2 className="font-display text-lg font-semibold text-ink">{w.title}</h2>
                <p className="text-[14px] leading-relaxed text-steel">{w.summary}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {w.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-paper px-2 py-1 font-mono text-[11px] text-steel"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <span className="mt-1 font-mono text-[12px] font-medium text-amber opacity-0 transition-opacity group-hover:opacity-100">
                  Read report →
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}