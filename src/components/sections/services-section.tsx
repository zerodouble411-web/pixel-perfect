import { ArrowUpRight, Cpu, LayoutDashboard, Server, Wallet } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { services, type Service } from "@/lib/portfolio-data";

const icons = [Server, Wallet, Cpu, LayoutDashboard];

export function ServicesSection() {
  const [active, setActive] = useState<Service | null>(null);

  return (
    <section id="services" className="border-b border-border bg-surface/50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <p className="eyebrow text-center">What I do</p>
        <h2 className="mt-3 text-center font-display text-3xl font-bold sm:text-4xl">Services</h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const Icon = icons[i] ?? Server;
            return (
              <button
                key={service.id}
                type="button"
                onClick={() => setActive(service)}
                className="panel panel-hover group p-6 text-left"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 font-display font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                  Learn more <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-lg border-border bg-surface">
          <DialogHeader>
            <DialogTitle className="font-display">{active?.title}</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">{active?.description}</p>
          <ul className="mt-2 space-y-2">
            {active?.details.map((d) => (
              <li key={d} className="flex gap-2 text-sm">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                {d}
              </li>
            ))}
          </ul>
          <div className="mt-3 flex flex-wrap gap-2">
            {active?.technologies.map((t) => (
              <span key={t} className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted-foreground">
                {t}
              </span>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
