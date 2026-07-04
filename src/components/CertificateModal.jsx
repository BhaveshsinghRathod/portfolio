import { useEffect, useState } from "react";

function isPdf(path) {
  return path?.toLowerCase().endsWith(".pdf");
}

export default function CertificateModal({ cert, onClose }) {
  const [failed, setFailed] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!cert) return;
    let cancelled = false;
    setChecking(true);
    setFailed(false);

    fetch(cert.file, { method: "HEAD" })
      .then((res) => {
        if (!cancelled) setFailed(!res.ok);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      })
      .finally(() => {
        if (!cancelled) setChecking(false);
      });

    return () => {
      cancelled = true;
    };
  }, [cert]);

  useEffect(() => {
    if (!cert) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [cert, onClose]);

  if (!cert) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${cert.name} certificate`}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-ink/70 backdrop-blur-sm" />

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-line bg-panel shadow-2xl"
      >
        <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-4">
          <div className="min-w-0">
            <p className="truncate font-display text-base font-semibold text-ink">{cert.name}</p>
            <p className="truncate text-[13px] text-steel">
              {cert.issuer} · {cert.date}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            {!checking && !failed && (
              <a
                href={cert.file}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[12px] font-medium text-amber underline underline-offset-4 hover:text-ink"
              >
                Open full size ↗
              </a>
            )}
            <button
              onClick={onClose}
              aria-label="Close"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-steel transition-colors hover:border-ink hover:text-ink"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto bg-paper">
          {checking ? (
            <div className="flex h-full min-h-[320px] items-center justify-center">
              <span className="font-mono text-[12px] text-mist">loading…</span>
            </div>
          ) : failed ? (
            <div className="flex h-full min-h-[320px] flex-col items-center justify-center gap-2 p-10 text-center">
              <span className="font-mono text-[12px] uppercase tracking-wide text-mist">
                404
              </span>
              <p className="text-sm text-steel">
                Certificate file not found yet. Add it to{" "}
                <code className="rounded bg-line px-1.5 py-0.5 font-mono text-[12px] text-ink">
                  public{cert.file}
                </code>
              </p>
            </div>
          ) : isPdf(cert.file) ? (
            <iframe src={cert.file} title={cert.name} className="h-[75vh] w-full" />
          ) : (
            <img
              src={cert.file}
              alt={`${cert.name} certificate`}
              className="mx-auto max-h-[75vh] w-auto"
              onError={() => setFailed(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
