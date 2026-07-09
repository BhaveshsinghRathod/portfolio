import { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { writeups } from "../data/writeups";
import StatusTag from "../components/StatusTag";

function ScreenshotThumb({ src, caption }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-panel">
      {failed ? (
        <div className="flex h-40 flex-col items-center justify-center gap-1 p-4 text-center">
          <span className="font-mono text-[10px] uppercase tracking-wide text-mist">
            not uploaded yet
          </span>
          <code className="break-all font-mono text-[10px] text-mist">{src}</code>
        </div>
      ) : (
        <img
          src={src}
          alt={caption}
          className="h-40 w-full object-cover"
          onError={() => setFailed(true)}
        />
      )}
      {caption && (
        <p className="border-t border-line px-3 py-2 text-[12px] text-steel">{caption}</p>
      )}
    </div>
  );
}

function Section({ section }) {
  return (
    <div className="flex flex-col gap-3 border-b border-line py-8 first:pt-0 last:border-b-0">
      <h2 className="font-display text-lg font-semibold text-ink">{section.heading}</h2>

      {section.body && (
        <p className="max-w-2xl text-[15px] leading-relaxed text-steel">{section.body}</p>
      )}

      {section.commands?.length > 0 && (
        <pre className="mt-1 overflow-x-auto rounded-xl bg-ink p-4 font-mono text-[13px] leading-relaxed text-paper/90">
          {section.commands.map((c, i) => (
            <div key={i} className={c.trim().startsWith("#") ? "text-paper/40" : ""}>
              {!c.trim().startsWith("#") && <span className="mr-2 text-amber">$</span>}
              {c}
            </div>
          ))}
        </pre>
      )}

      {section.formula && (
        <pre className="mt-1 overflow-x-auto rounded-xl border border-line bg-panel p-4 font-mono text-[13px] leading-relaxed text-ink">
          {section.formula}
        </pre>
      )}

      {section.table && (
        <div className="mt-1 overflow-x-auto rounded-xl border border-line">
          <table className="w-full min-w-[420px] border-collapse text-left text-[13px]">
            <thead>
              <tr className="bg-panel">
                {section.table.headers.map((h) => (
                  <th
                    key={h}
                    className="border-b border-line px-4 py-2.5 font-mono text-[11px] font-medium uppercase tracking-wide text-mist"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row, i) => (
                <tr key={i} className="border-b border-line last:border-b-0">
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-2.5 align-top text-steel">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {section.bullets?.length > 0 && (
        <ul className="mt-1 flex flex-col gap-2.5">
          {section.bullets.map((b, i) => (
            <li key={i} className="flex gap-3 text-[14px] leading-relaxed text-steel">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}

      {section.gallery?.length > 0 && (
        <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {section.gallery.map((g) => (
            <ScreenshotThumb key={g.src} src={g.src} caption={g.caption} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function WriteupDetail() {
  const { slug } = useParams();
  const writeup = writeups.find((w) => w.slug === slug);

  if (!writeup) return <Navigate to="/writeups" replace />;

  return (
    <section className="py-16">
      <div className="container-page max-w-3xl">
        <Link
          to="/writeups"
          className="font-mono text-[12px] text-mist transition-colors hover:text-ink"
        >
          ← All write-ups
        </Link>

        <div className="mt-6 flex flex-col gap-4 border-b border-line pb-8">
          <div className="flex flex-wrap items-center gap-3">
            <StatusTag status={writeup.status} />
            <span className="font-mono text-[12px] text-mist">{writeup.date}</span>
          </div>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {writeup.title}
          </h1>
          <p className="font-mono text-[13px] text-steel">{writeup.tool}</p>
          <div className="flex flex-wrap gap-1.5">
            {writeup.tags.map((t) => (
              <span
                key={t}
                className="rounded-md bg-panel px-2 py-1 font-mono text-[11px] text-steel"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          {writeup.sections.map((s, i) => (
            <Section key={i} section={s} />
          ))}
        </div>
      </div>
    </section>
  );
}