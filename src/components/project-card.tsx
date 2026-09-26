import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/portfolio-data";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to="/projects/$slug"
      params={{ slug: project.slug }}
      className="panel panel-hover group block overflow-hidden"
    >
      <div className="aspect-[16/10] overflow-hidden border-b border-border">
        <img
          src={project.image}
          alt={`${project.name} interface preview`}
          loading="lazy"
          width={1280}
          height={800}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-display font-semibold">{project.name}</p>
            <p className="mt-0.5 font-mono text-xs text-primary">{project.category} · {project.year}</p>
          </div>
          <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:text-primary" />
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-md bg-muted px-2 py-1 font-mono text-[0.68rem] text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
