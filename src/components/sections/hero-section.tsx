import { Link } from "@tanstack/react-router";
import { ArrowRight, Download, Github, Linkedin, Mail, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import portrait from "@/assets/laban-panda-khisa.png.asset.json";
import { hero } from "@/lib/portfolio-data";

function useTypedRole(roles: string[]) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[index % roles.length] ?? "";
    const done = !deleting && text === current;
    const cleared = deleting && text === "";

    const timeout = setTimeout(
      () => {
        if (done) return setDeleting(true);
        if (cleared) {
          setDeleting(false);
          setIndex((i) => i + 1);
          return;
        }
        setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
      },
      done ? 1600 : deleting ? 35 : 70,
    );

    return () => clearTimeout(timeout);
  }, [text, deleting, index, roles]);

  return text;
}

const orbit = ["Laravel", "Node.js", "Python", "React", "Bank APIs", "FX APIs"];

export function HeroSection() {
  const typed = useTypedRole(hero.roles);

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute -left-40 top-0 size-[32rem] rounded-full bg-primary/10 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:py-16">
        <div className="animate-rise">
          <p className="eyebrow">— Hello, I'm</p>
          <h1 className="mt-3 font-display text-4xl font-bold leading-tight sm:text-6xl">
            Laban <span className="text-flame">Panda Khisa</span>
          </h1>
          <p className="mt-4 font-mono text-lg text-muted-foreground sm:text-xl">
            {typed}
            <span className="ml-0.5 inline-block w-[2px] animate-pulse-dot bg-primary align-middle">&nbsp;</span>
          </p>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">{hero.tagline}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-full bg-flame px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              View projects <ArrowRight className="size-4" />
            </Link>
            <a
              href="/resume-laban-panda-khisa.txt"
              download
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:border-primary/60 hover:text-primary"
            >
              Download resume <Download className="size-4" />
            </a>
            <Link
              to="/"
              hash="contact"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:border-primary/60 hover:text-primary"
            >
              Contact
            </Link>
          </div>

          <p className="mt-6 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            <span className="size-2 animate-pulse-dot rounded-full bg-success" />
            {hero.availability}
          </p>

          <div className="mt-6 flex gap-3">
            {[Github, Linkedin, Mail, Phone].map((Icon, i) => (
              <span
                key={i}
                className="flex size-10 items-center justify-center rounded-xl border border-border text-muted-foreground transition-all hover:-translate-y-1 hover:border-primary/60 hover:text-primary"
              >
                <Icon className="size-4" />
              </span>
            ))}
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[17rem] sm:max-w-sm lg:max-w-md">
          <div className="absolute inset-0 rounded-full border border-primary/25 animate-spin-slow" />
          <div className="absolute inset-6 rounded-full border border-dashed border-primary/20" />
          <img
            src={portrait.url}
            width={1145}
            height={1374}
            alt="Portrait of Laban Panda Khisa"
            className="relative size-full rounded-full border-2 border-primary/40 object-cover object-top glow-ring"
          />
          {orbit.map((tech, i) => {
            const angle = (i / orbit.length) * Math.PI * 2;
            return (
              <span
                key={tech}
                className="absolute rounded-xl border border-border bg-surface-2/90 px-3 py-1.5 font-mono text-xs backdrop-blur"
                style={{
                  left: `${(50 + Math.cos(angle) * 48).toFixed(3)}%`,
                  top: `${(50 + Math.sin(angle) * 48).toFixed(3)}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {tech}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
