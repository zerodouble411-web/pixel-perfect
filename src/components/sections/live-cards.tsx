import { Activity, Boxes, Cpu, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { Counter } from "@/components/counter";
import { counters, liveCards } from "@/lib/portfolio-data";

const icons = [Boxes, Wallet, Activity, Cpu];

export function LiveCards() {
  const [pulse, setPulse] = useState(() => liveCards.map((c) => c.trend));

  useEffect(() => {
    const id = setInterval(() => {
      setPulse((prev) => prev.map((v) => Math.max(1, Math.min(24, v + Math.round((Math.random() - 0.45) * 4)))));
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="border-b border-border bg-surface/60">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {liveCards.map((card, i) => {
            const Icon = icons[i] ?? Activity;
            return (
              <article key={card.label} className="panel panel-hover p-5">
                <div className="flex items-center justify-between">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-xs text-success">
                    <span className="size-1.5 animate-pulse-dot rounded-full bg-success" />
                    live
                  </span>
                </div>
                <h3 className="mt-4 text-sm text-muted-foreground">{card.label}</h3>
                <p className="mt-1 font-display text-lg font-semibold">{card.value}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{card.detail}</span>
                  <span className="font-mono text-primary">+{pulse[i]}/min</span>
                </div>
                <div className="mt-3 h-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-flame transition-all duration-700"
                    style={{ width: `${40 + (pulse[i] ?? 4) * 2.4}%` }}
                  />
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 grid gap-4 rounded-2xl border border-border bg-background/50 p-6 sm:grid-cols-4">
          {counters.map((c) => (
            <div key={c.label} className="text-center">
              <p className="font-display text-3xl font-bold text-primary">
                <Counter value={c.value} suffix={c.suffix} />
              </p>
              <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{c.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
