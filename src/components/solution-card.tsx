import { Check } from "lucide-react";
import type { Solution } from "@/lib/company-data";

export function SolutionCard({ solution }: { solution: Solution }) {
  return (
    <div className="panel panel-hover flex flex-col p-6">
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-xs text-primary">{solution.category}</span>
        <span className="rounded-full border border-border px-2.5 py-0.5 text-[0.65rem] text-muted-foreground">{solution.tier}</span>
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold">{solution.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{solution.summary}</p>
      <ul className="mt-4 flex-1 space-y-2">
        {solution.features.map((f) => (
          <li key={f} className="flex gap-2 text-sm">
            <Check className="mt-0.5 size-4 shrink-0 text-primary" /> {f}
          </li>
        ))}
      </ul>
      <a
        href={`https://wa.me/254111679286?text=${encodeURIComponent(`Hello Pandatechs, I'd like a quote for: ${solution.name}`)}`}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex justify-center rounded-full border border-primary/50 px-4 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/10"
      >
        Request a quote
      </a>
    </div>
  );
}
