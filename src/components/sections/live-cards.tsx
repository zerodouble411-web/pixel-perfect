import { Activity, Boxes, Cpu, Wallet } from "lucide-react";
import { liveCards } from "@/lib/portfolio-data";

const icons = [Boxes, Wallet, Activity, Cpu];

export function LiveCards() {
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
                </div>
                <h3 className="mt-4 text-sm text-muted-foreground">{card.label}</h3>
                <p className="mt-1 font-display text-lg font-semibold">{card.value}</p>
                <p className="mt-4 text-xs text-muted-foreground">{card.detail}</p>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
