import { useEffect, useState } from "react";
import { architecture } from "@/lib/portfolio-data";

export function ArchitectureExplorer() {
  const [activeId, setActiveId] = useState("redis");
  const [pulseStep, setPulseStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setPulseStep((s) => (s + 1) % architecture.flow.length), 900);
    return () => clearInterval(id);
  }, []);

  const active = architecture.nodes.find((n) => n.id === activeId) ?? architecture.nodes[0]!;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
      <div className="panel p-6">
        <p className="eyebrow">Request flow</p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {architecture.flow.map((id, i) => {
            const node = architecture.nodes.find((n) => n.id === id)!;
            const hot = pulseStep === i;
            return (
              <span key={id} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveId(id)}
                  className={`rounded-lg border px-3 py-2 font-mono text-xs transition-all ${
                    hot ? "border-primary bg-primary/15 text-primary" : "border-border text-muted-foreground"
                  }`}
                >
                  {node.label}
                </button>
                {i < architecture.flow.length - 1 ? (
                  <span className={`h-px w-6 transition-colors ${hot ? "bg-primary" : "bg-border"}`} />
                ) : null}
              </span>
            );
          })}
        </div>

        <p className="eyebrow mt-8">All components</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {architecture.nodes.map((node) => (
            <button
              key={node.id}
              type="button"
              onClick={() => setActiveId(node.id)}
              className={`rounded-xl border p-4 text-left transition-all ${
                activeId === node.id
                  ? "border-primary/60 bg-primary/5 glow-ring"
                  : "border-border hover:border-primary/40"
              }`}
            >
              <p className="font-display text-sm font-semibold">{node.label}</p>
              <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-widest text-muted-foreground">{node.group}</p>
            </button>
          ))}
        </div>
      </div>

      <aside className="panel h-fit p-6">
        <p className="eyebrow">{active.group}</p>
        <h3 className="mt-2 font-display text-2xl font-bold text-primary">{active.label}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{active.description}</p>
        <ul className="mt-5 space-y-2">
          {active.responsibilities.map((r) => (
            <li key={r} className="flex gap-2 text-sm">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
              {r}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
