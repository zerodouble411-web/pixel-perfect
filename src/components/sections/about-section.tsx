import { ChevronDown, MapPin, Phone, ShieldCheck, User } from "lucide-react";
import { useState } from "react";
import { about, hero } from "@/lib/portfolio-data";

export function AboutSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="about" className="border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <p className="eyebrow">About me</p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold sm:text-4xl">
          Backend systems that handle money, load and audits
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">{about.bio}</p>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-3">
            {about.timeline.map((item, i) => {
              const open = openIndex === i;
              return (
                <article
                  key={item.year}
                  className={`panel overflow-hidden transition-all ${open ? "glow-ring" : ""}`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  >
                    <div>
                      <p className="font-mono text-xs text-primary">{item.year}</p>
                      <p className="mt-1 font-display font-semibold">{item.role}</p>
                      <p className="text-xs text-muted-foreground">{item.org}</p>
                    </div>
                    <ChevronDown className={`size-4 shrink-0 transition-transform ${open ? "rotate-180 text-primary" : ""}`} />
                  </button>
                  {open ? (
                    <div className="border-t border-border px-5 py-4">
                      <p className="text-sm text-muted-foreground">{item.summary}</p>
                      <ul className="mt-3 space-y-2">
                        {item.highlights.map((h) => (
                          <li key={h} className="flex gap-2 text-sm">
                            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>

          <aside className="panel h-fit p-6">
            <p className="eyebrow">Profile</p>
            <dl className="mt-4 space-y-4 text-sm">
              {[
                { icon: User, label: "Name", value: hero.name },
                { icon: Phone, label: "Phone", value: hero.phone },
                { icon: MapPin, label: "Location", value: hero.location },
                { icon: ShieldCheck, label: "Availability", value: hero.availability },
              ].map((row) => (
                <div key={row.label} className="flex items-start gap-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <row.icon className="size-4" />
                  </span>
                  <div>
                    <dt className="text-xs uppercase tracking-widest text-muted-foreground">{row.label}</dt>
                    <dd className="font-medium">{row.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
            <p className="mt-6 border-t border-border pt-4 text-xs text-muted-foreground">
              Web: {hero.website} · Email: {hero.email}
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
