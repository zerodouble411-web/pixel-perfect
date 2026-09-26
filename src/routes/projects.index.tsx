import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState } from "react";
import { ProjectCard } from "@/components/project-card";
import { api } from "@/lib/api";
import { projectCategories } from "@/lib/portfolio-data";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — Laban Panda Khisa" },
      {
        name: "description",
        content: "Case studies of payment platforms, operations systems and AI workspaces built with Laravel 12 and React.",
      },
      { property: "og:title", content: "Projects — Laban Panda Khisa" },
      { property: "og:description", content: "Production case studies: payments, operations and AI systems." },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const { data, isLoading } = useQuery({
    queryKey: ["projects", search, category],
    queryFn: () => api.projects({ search, category }),
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <p className="eyebrow">Work</p>
      <h1 className="mt-3 font-display text-4xl font-bold">Projects</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
        Search and filter production systems. Each case study covers problem, architecture, challenges, metrics and code.
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects, stacks or tags..."
            className="w-full rounded-lg border border-input bg-background py-3 pl-10 pr-4 text-sm outline-none focus:border-primary"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {projectCategories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`rounded-full border px-4 py-2 text-xs transition-colors ${
                category === c ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="panel h-80 animate-pulse" />
          ))}
        </div>
      ) : data && data.length > 0 ? (
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {data.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <p className="mt-16 text-center text-sm text-muted-foreground">No projects match that search.</p>
      )}
    </div>
  );
}
