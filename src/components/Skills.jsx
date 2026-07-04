import { skillGroups } from "../data/content";

export default function Skills() {
  return (
    <section id="skills" className="border-b border-line bg-panel py-20">
      <div className="container-page">
        <p className="font-mono text-[12px] uppercase tracking-wider text-amber">Capabilities</p>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          What's in the toolkit
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <div key={group.title} className="bg-panel p-6">
              <h3 className="font-mono text-[12px] font-medium uppercase tracking-wide text-steel">
                {group.title}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-line bg-paper px-2.5 py-1 text-[13px] text-ink"
                  >
                    {item}
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
