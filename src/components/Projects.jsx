import { useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "../data/content";
import StatusTag from "./StatusTag";
import SoarFlowDiagram from "./SoarFlowDiagram";
import VulnScannerFlowDiagram from "./VulnScannerFlowDiagram";

function CaseFile({ project, index }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <article className="rounded-2xl border border-line bg-panel">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full flex-col gap-4 p-6 text-left sm:p-8"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] text-mist">
              CASE-{String(index + 1).padStart(3, "0")}
            </span>
            <StatusTag status={project.status} />
          </div>
          <span className="font-mono text-[11px] text-mist">{project.period}</span>
        </div>

        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">
            {project.title}
          </h3>
          <span
            className={`mt-1 shrink-0 font-mono text-lg text-mist transition-transform ${open ? "rotate-45" : ""}`}
          >
            +
          </span>
        </div>

        <p className="max-w-2xl text-[15px] leading-relaxed text-steel">{project.summary}</p>

        <div className="flex flex-wrap gap-2 pt-1">
          {project.tools.map((t) => (
            <span
              key={t}
              className="rounded-md bg-paper px-2 py-1 font-mono text-[11px] text-steel"
            >
              {t}
            </span>
          ))}
        </div>
      </button>

      {open && (
        <div className="border-t border-line px-6 pb-8 pt-6 sm:px-8">
          <p className="font-mono text-[11px] uppercase tracking-wide text-mist">
            Incident log
          </p>
          <ul className="mt-4 flex flex-col gap-3">
            {project.details.map((d, i) => (
              <li key={i} className="flex gap-3 text-[14px] leading-relaxed text-steel">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                <span>{d}</span>
              </li>
            ))}
          </ul>

          {project.links?.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-4">
              {project.links.map((l) => (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[13px] font-medium text-amber underline underline-offset-4 hover:text-ink"
                >
                  {l.label} →
                </a>
              ))}
            </div>
          )}

          {project.writeupSlug && (
            <div className="mt-6">
              <Link
                to={`/writeups/${project.writeupSlug}`}
                className="font-mono text-[13px] font-medium text-amber underline underline-offset-4 hover:text-ink"
              >
                Read the full write-up →
              </Link>
            </div>
          )}

          {project.interactiveDiagram && (
            <div className="mt-8">
              <SoarFlowDiagram />
            </div>
          )}
          {project.vulnScannerDiagram && (
            <div className="mt-8">
              <VulnScannerFlowDiagram />
            </div>
          )}
        </div>
      )}
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="border-b border-line py-20">
      <div className="container-page">
        <p className="font-mono text-[12px] uppercase tracking-wider text-amber">Case Files</p>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Projects & labs
        </h2>
        <p className="mt-4 max-w-xl text-[15px] text-steel">
          Each entry is a real project — what I built, the tools involved, and what came out of
          it. Click a case to expand the full log.
        </p>

        <div className="mt-12 flex flex-col gap-5">
          {projects.map((p, i) => (
            <CaseFile key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
