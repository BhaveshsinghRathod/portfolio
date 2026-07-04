import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { profile } from "../data/content";

const LINKS = [
  { href: "/#projects", label: "Case Files" },
  { href: "/#skills", label: "Capabilities" },
  { href: "/#certifications", label: "Certifications" },
  { href: "/#experience", label: "Experience" },
  { href: "/writeups", label: "Write-ups" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${scrolled ? "border-line bg-paper/90 backdrop-blur" : "border-transparent bg-transparent"
        }`}
    >
      <nav className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="font-display text-base font-semibold tracking-tight text-ink">
          {profile.name.split(" ")[0]}
          <span className="text-amber">.</span>
          <span className="ml-1.5 hidden font-mono text-[11px] font-normal tracking-wide text-mist sm:inline">
            SEC_OPS
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                to={l.href}
                className="font-mono text-[13px] text-steel transition-colors hover:text-ink"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block"> <a

          href={profile.resumeFile}
          className="rounded-full border border-ink bg-ink px-4 py-2 font-mono text-[12px] font-medium text-paper transition-colors hover:bg-ink/90"
        >
          Resume ↓
        </a>
        </div>

        <button
          className="md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <div className="flex flex-col gap-1.5">
            <span className="h-0.5 w-6 bg-ink" />
            <span className="h-0.5 w-6 bg-ink" />
          </div>
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-paper md:hidden">
          <ul className="container-page flex flex-col gap-4 py-6">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  to={l.href}
                  onClick={() => setOpen(false)}
                  className="font-mono text-sm text-steel hover:text-ink"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={profile.resumeFile} className="font-mono text-sm text-amber">
                Resume ↓
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}