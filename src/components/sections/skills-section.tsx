import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { projects, skillCategories, skills, type Skill } from "@/lib/portfolio-data";

export function SkillsSection() {
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState<Skill | null>(null);

  const visible = category === "All" ? skills : skills.filter((s) => s.category === category);

  return (
    <section id="skills" className="border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <p className="eyebrow">My expertise</p>
        <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Skills dashboard</h2>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            {skills.slice(0, 7).map((skill) => (
              <div key={skill.name}>
                <div className="flex items-center justify-between text-sm">
                  <span>{skill.name}</span>
                  <span className="font-mono text-xs text-primary">{skill.level}%</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-flame transition-all duration-1000" style={{ width: `${skill.level}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="flex flex-wrap gap-2">
              {skillCategories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                    category === c
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {visible.map((skill) => (
                <button
                  key={skill.name}
                  type="button"
                  onClick={() => setActive(skill)}
                  className={`panel panel-hover p-4 text-left ${active?.name === skill.name ? "glow-ring" : ""}`}
                >
                  <p className="font-mono text-sm">{skill.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{skill.category}</p>
                </button>
              ))}
            </div>

            {active ? (
              <div className="panel mt-4 animate-rise p-5">
                <p className="font-display font-semibold text-primary">{active.name}</p>
                <p className="mt-2 text-sm text-muted-foreground">{active.note}</p>
                <p className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">Used in</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {active.projects.map((slug) => {
                    const project = projects.find((p) => p.slug === slug);
                    if (!project) return null;
                    return (
                      <Link
                        key={slug}
                        to="/projects/$slug"
                        params={{ slug }}
                        className="rounded-full border border-primary/40 px-3 py-1 text-xs text-primary hover:bg-primary/10"
                      >
                        {project.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ) : (
              <p className="mt-4 text-xs text-muted-foreground">Select a technology to see where it is used in production.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
