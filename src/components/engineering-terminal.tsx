import { useEffect, useRef, useState } from "react";
import { hero, projects, skills } from "@/lib/portfolio-data";

type Line = { kind: "in" | "out"; text: string };

const banner: Line[] = [
  { kind: "out", text: "pandatechs shell v1.0 — type `help` to list commands" },
];

function run(raw: string): string[] {
  const cmd = raw.trim().toLowerCase();
  switch (cmd) {
    case "":
      return [];
    case "help":
      return [
        "available commands:",
        "  whoami     identity and availability",
        "  skills     technical skill levels",
        "  projects   production systems",
        "  stack      backend stack in use",
        "  contact    how to reach me",
        "  clear      clear the screen",
        "  sudo hire laban",
      ];
    case "whoami":
      return [`${hero.name} — ${hero.title}`, hero.tagline, `status: ${hero.availability}`];
    case "skills":
      return skills.map((s) => `  ${s.name.padEnd(18)} ${"█".repeat(Math.round(s.level / 8))} ${s.level}%`);
    case "projects":
      return projects.map((p) => `  ${p.slug.padEnd(24)} ${p.category.padEnd(12)} ${p.year}`);
    case "stack":
      return ["Laravel 12 · Sanctum · MySQL · Redis · Queue workers · Storage · Notifications", "React 19 · TypeScript · TanStack Query · Tailwind"];
    case "contact":
      return [`phone:   ${hero.phone}`, `email:   ${hero.email}`, `web:     ${hero.website}`, `city:    ${hero.location}`];
    case "sudo hire laban":
      return ["[sudo] authenticating...", "Access Granted", "Welcome to Production Engineering"];
    default:
      return [`command not found: ${raw.trim()} — try \`help\``];
  }
}

export function EngineeringTerminal() {
  const [lines, setLines] = useState<Line[]>(banner);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [lines]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const entry = value;
    setValue("");
    setHistory((h) => [...h, entry]);
    if (entry.trim().toLowerCase() === "clear") {
      setLines(banner);
      return;
    }
    setLines((prev) => [...prev, { kind: "in", text: entry }, ...run(entry).map((t) => ({ kind: "out" as const, text: t }))]);
  }

  return (
    <div className="panel overflow-hidden">
      <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-4 py-3">
        <span className="size-3 rounded-full bg-destructive/70" />
        <span className="size-3 rounded-full bg-warning/70" />
        <span className="size-3 rounded-full bg-success/70" />
        <span className="ml-2 font-mono text-xs text-muted-foreground">laban@pandatechs: ~</span>
      </div>
      <div className="h-80 overflow-y-auto bg-background/70 p-4 font-mono text-[0.8rem] leading-relaxed">
        {lines.map((line, i) => (
          <p key={i} className={line.kind === "in" ? "text-primary" : "text-muted-foreground"}>
            {line.kind === "in" ? <span className="text-success">$ </span> : null}
            <span className="whitespace-pre-wrap">{line.text}</span>
          </p>
        ))}
        <div ref={endRef} />
      </div>
      <form onSubmit={submit} className="flex items-center gap-2 border-t border-border bg-surface-2 px-4 py-3">
        <span className="font-mono text-sm text-success">$</span>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "ArrowUp" && history.length) {
              e.preventDefault();
              setValue(history[history.length - 1] ?? "");
            }
          }}
          placeholder="type a command, e.g. help"
          className="flex-1 bg-transparent font-mono text-sm outline-none placeholder:text-muted-foreground"
          aria-label="Terminal command"
        />
      </form>
    </div>
  );
}
