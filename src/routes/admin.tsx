import { createFileRoute } from "@tanstack/react-router";
import {
  BarChart3,
  Inbox,
  LayoutDashboard,
  MessageSquareQuote,
  Sparkles,
  Trash2,
  Wrench,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AnalyticsDashboard } from "@/components/analytics-dashboard";
import { hero as heroSeed, projects as projectSeed, skills as skillSeed, testimonials as testimonialSeed } from "@/lib/portfolio-data";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin CMS — Laban Panda Khisa" },
      { name: "description", content: "Portfolio content editor preview for hero, skills, projects and testimonials." },
      { property: "og:title", content: "Admin CMS — Laban Panda Khisa" },
      { property: "og:description", content: "Portfolio content editor preview, pending a connected API." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

const tabs = [
  { id: "hero", label: "Hero", icon: Sparkles },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "projects", label: "Projects", icon: LayoutDashboard },
  { id: "testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { id: "messages", label: "Messages", icon: Inbox },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
] as const;

type TabId = (typeof tabs)[number]["id"];

const field = "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary";

function AdminPage() {
  const [tab, setTab] = useState<TabId>("hero");

  const [heroDraft, setHeroDraft] = useState({ ...heroSeed });
  const [skillList, setSkillList] = useState(skillSeed.map((s) => ({ name: s.name, level: s.level, category: s.category })));
  const [projectList, setProjectList] = useState(projectSeed.map((p) => ({ slug: p.slug, name: p.name, category: p.category, featured: p.featured })));
  const [quotes, setQuotes] = useState(testimonialSeed.map((t) => ({ ...t })));
  const messages: { id: number; name: string; email: string; subject: string; read: boolean }[] = [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="eyebrow">Content management</p>
          <h1 className="mt-2 font-display text-3xl font-bold">Admin CMS</h1>
        </div>
        <p className="text-xs text-muted-foreground">Editor preview · Changes are not saved or published</p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[220px_1fr]">
        <nav className="panel h-fit p-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                tab === t.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <t.icon className="size-4" />
              {t.label}
            </button>
          ))}
        </nav>

        <div className="space-y-5">
          {tab === "hero" ? (
            <section className="panel p-6">
              <h2 className="font-display text-lg font-semibold">Hero content</h2>
              <p className="mt-1 font-mono text-xs text-muted-foreground">PUT /api/admin/hero</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {(["name", "title", "tagline", "availability", "location", "phone", "email", "website"] as const).map((key) => (
                  <label key={key} className="text-sm">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">{key}</span>
                    <input
                      className={`${field} mt-1`}
                      value={heroDraft[key]}
                      onChange={(e) => setHeroDraft({ ...heroDraft, [key]: e.target.value })}
                    />
                  </label>
                ))}
              </div>
              <button
                onClick={() => toast.info("Changes are only visible in this editor until the API is connected")}
                className="mt-5 rounded-full bg-flame px-5 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                Preview changes
              </button>
            </section>
          ) : null}

          {tab === "skills" ? (
            <section className="panel p-6">
              <h2 className="font-display text-lg font-semibold">Skills</h2>
              <p className="mt-1 font-mono text-xs text-muted-foreground">POST / PUT / DELETE /api/admin/skills</p>
              <div className="mt-5 space-y-2">
                {skillList.map((s, i) => (
                  <div key={s.name} className="flex items-center gap-3 rounded-lg border border-border p-3">
                    <input
                      className="flex-1 bg-transparent text-sm outline-none"
                      value={s.name}
                      onChange={(e) => setSkillList(skillList.map((x, xi) => (xi === i ? { ...x, name: e.target.value } : x)))}
                    />
                    <span className="font-mono text-xs text-muted-foreground">{s.category}</span>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={s.level}
                      onChange={(e) => setSkillList(skillList.map((x, xi) => (xi === i ? { ...x, level: Number(e.target.value) } : x)))}
                      className="w-32 accent-[var(--primary)]"
                    />
                    <span className="w-10 text-right font-mono text-xs text-primary">{s.level}%</span>
                    <button
                      aria-label={`Delete ${s.name}`}
                      onClick={() => {
                        setSkillList(skillList.filter((_, xi) => xi !== i));
                         toast.info("Removed from this editor only");
                      }}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {tab === "projects" ? (
            <section className="panel p-6">
              <h2 className="font-display text-lg font-semibold">Projects</h2>
              <p className="mt-1 font-mono text-xs text-muted-foreground">CRUD /api/admin/projects</p>
              <div className="mt-5 space-y-2">
                {projectList.map((p, i) => (
                  <div key={p.slug} className="flex flex-wrap items-center gap-3 rounded-lg border border-border p-3">
                    <input
                      className="flex-1 bg-transparent text-sm outline-none"
                      value={p.name}
                      onChange={(e) => setProjectList(projectList.map((x, xi) => (xi === i ? { ...x, name: e.target.value } : x)))}
                    />
                    <span className="rounded-md bg-muted px-2 py-1 font-mono text-[0.68rem] text-muted-foreground">{p.category}</span>
                    <label className="flex items-center gap-2 text-xs text-muted-foreground">
                      <input
                        type="checkbox"
                        checked={p.featured}
                        onChange={(e) => setProjectList(projectList.map((x, xi) => (xi === i ? { ...x, featured: e.target.checked } : x)))}
                        className="accent-[var(--primary)]"
                      />
                      Featured
                    </label>
                  </div>
                ))}
              </div>
              <button
                 onClick={() => toast.info("Changes are only visible in this editor until the API is connected")}
                className="mt-5 rounded-full bg-flame px-5 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                 Preview changes
              </button>
            </section>
          ) : null}

          {tab === "testimonials" ? (
            <section className="panel p-6">
              <h2 className="font-display text-lg font-semibold">Testimonials</h2>
              <p className="mt-1 font-mono text-xs text-muted-foreground">CRUD /api/admin/testimonials</p>
              <div className="mt-5 space-y-3">
                {quotes.map((q, i) => (
                  <div key={i} className="rounded-lg border border-border p-4">
                    <input
                      className={field}
                      value={q.name}
                      onChange={(e) => setQuotes(quotes.map((x, xi) => (xi === i ? { ...x, name: e.target.value } : x)))}
                    />
                    <textarea
                      rows={3}
                      className={`${field} mt-2`}
                      value={q.quote}
                      onChange={(e) => setQuotes(quotes.map((x, xi) => (xi === i ? { ...x, quote: e.target.value } : x)))}
                    />
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {tab === "messages" ? (
            <section className="panel p-6">
              <h2 className="font-display text-lg font-semibold">Inbox</h2>
              <p className="mt-1 font-mono text-xs text-muted-foreground">GET /api/admin/messages</p>
               <div className="mt-5 space-y-2">
                {messages.map((m) => (
                  <button
                    key={m.id}
                     onClick={() => {}}
                    className={`flex w-full items-center justify-between rounded-lg border p-4 text-left ${
                      m.read ? "border-border" : "border-primary/50 bg-primary/5"
                    }`}
                  >
                    <div>
                      <p className="text-sm font-medium">{m.subject}</p>
                      <p className="font-mono text-xs text-muted-foreground">{m.email}</p>
                    </div>
                    {!m.read ? <span className="rounded-full bg-primary/15 px-2 py-1 text-[0.65rem] text-primary">new</span> : null}
                  </button>
                ))}
                 <p className="text-sm text-muted-foreground">No messages. Online contact is not connected yet.</p>
              </div>
            </section>
          ) : null}

          {tab === "analytics" ? <AnalyticsDashboard /> : null}
        </div>
      </div>
    </div>
  );
}
