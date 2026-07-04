import { useState } from "react";
import { certifications } from "../data/content";
import CertificateModal from "./CertificateModal";

export default function Certifications() {
  const [active, setActive] = useState(null);

  return (
    <section id="certifications" className="border-b border-line bg-panel py-20">
      <div className="container-page">
        <p className="font-mono text-[12px] uppercase tracking-wider text-amber">Credentials</p>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Certifications
        </h2>
        <p className="mt-4 max-w-xl text-[15px] text-steel">
          Click any card to view the certificate.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((c) => (
            <button
              key={c.file}
              onClick={() => setActive(c)}
              className="group flex flex-col gap-3 rounded-xl border border-line bg-paper p-5 text-left transition-all hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-verified-soft px-2.5 py-1 font-mono text-[11px] font-medium text-verified">
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  VERIFIED
                </span>
                <span className="font-mono text-[11px] text-mist">{c.date}</span>
              </div>
              <div>
                <h3 className="font-display text-[15px] font-semibold leading-snug text-ink">
                  {c.name}
                </h3>
                <p className="mt-0.5 text-[13px] text-steel">{c.issuer}</p>
              </div>
              {c.id && (
                <p className="truncate font-mono text-[10px] text-mist" title={c.id}>
                  ID: {c.id}
                </p>
              )}
              <span className="mt-1 font-mono text-[11px] font-medium text-amber opacity-0 transition-opacity group-hover:opacity-100">
                View certificate →
              </span>
            </button>
          ))}
        </div>
      </div>

      <CertificateModal cert={active} onClose={() => setActive(null)} />
    </section>
  );
}
