import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { api } from "@/lib/api";
import { projects } from "@/lib/portfolio-data";

export const Route = createFileRoute("/projects/$slug")({
  head: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    const title = project ? `${project.name} — case study` : "Project";
    const description = project?.summary ?? "Project case study";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/projects/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: `/projects/${params.slug}` }],
      scripts: project ? [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.name,
          description: project.summary,
          creator: { "@type": "Person", name: "Laban Panda Khisa" },
          dateCreated: String(project.year),
          keywords: project.tags.join(", "),
          url: `/projects/${project.slug}`,
        }),
      }] : [],
    };
  },
  component: ProjectDetail,
});

function ProjectDetail() {
  const { slug } = Route.useParams();
  const { data: project, isLoading } = useQuery({ queryKey: ["project", slug], queryFn: () => api.project(slug) });

  if (isLoading) return <div className="mx-auto max-w-5xl px-4 py-20"><div className="panel h-96 animate-pulse" /></div>;

  if (!project) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-bold">Project not found</h1>
        <Link to="/projects" className="mt-6 inline-block text-primary">Back to projects</Link>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="size-4" /> All projects
      </Link>

      <header className="mt-6">
        <p className="eyebrow">{project.category} · {project.year}</p>
        <h1 className="mt-3 font-display text-4xl font-bold">{project.name}</h1>
        <p className="mt-4 max-w-3xl text-muted-foreground">{project.summary}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span key={t} className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted-foreground">{t}</span>
          ))}
        </div>
      </header>

      <img
        src={project.image}
        alt={`${project.name} dashboard`}
        loading="lazy"
        width={1280}
        height={800}
        className="mt-8 w-full rounded-2xl border border-border object-cover"
      />

      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {project.results.map((r) => (
          <div key={r.label} className="panel p-5">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">{r.label}</p>
            <p className="mt-2 font-display text-xl font-bold text-primary">{r.value}</p>
          </div>
        ))}
      </div>

      <section className="mt-12 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="font-display text-xl font-semibold">The problem</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.problem}</p>
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold">The solution</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.solution}</p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-xl font-semibold">Architecture</h2>
        <ol className="mt-4 space-y-3">
          {project.architecture.map((step, i) => (
            <li key={step} className="panel flex gap-4 p-4 text-sm">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-mono text-xs text-primary">
                {i + 1}
              </span>
              <span className="text-muted-foreground">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-xl font-semibold">Challenges</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {project.challenges.map((c) => (
            <div key={c.title} className="panel p-5">
              <p className="font-semibold text-primary">{c.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-xl font-semibold">Illustrative metrics <span className="text-xs font-normal text-muted-foreground">(not connected to production)</span></h2>
        <div className="panel mt-4 h-64 p-5">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={project.metrics}>
              <defs>
                <linearGradient id="projFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  fontSize: "12px",
                }}
              />
              <Area type="monotone" dataKey="requests" stroke="var(--chart-1)" fill="url(#projFill)" strokeWidth={2} name="Requests" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-xl font-semibold">Code</h2>
        <div className="panel mt-4 overflow-hidden">
          <div className="flex items-center justify-between border-b border-border bg-surface-2 px-4 py-3">
            <p className="font-mono text-xs">{project.code.title}</p>
            <span className="font-mono text-xs text-primary">{project.code.language}</span>
          </div>
          <pre className="overflow-x-auto p-5 font-mono text-[0.78rem] leading-relaxed text-muted-foreground">
            <code>{project.code.snippet}</code>
          </pre>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-xl font-semibold">Delivery timeline</h2>
        <div className="mt-4 space-y-3 border-l border-border pl-6">
          {project.timeline.map((t) => (
            <div key={t.phase} className="relative">
              <span className="absolute -left-[31px] top-1.5 size-2.5 rounded-full bg-primary" />
              <p className="font-semibold">{t.phase}</p>
              <p className="text-sm text-muted-foreground">{t.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
