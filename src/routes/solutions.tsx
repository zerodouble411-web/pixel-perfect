import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SolutionCard } from "@/components/solution-card";
import { api } from "@/lib/api";
import { solutionTiers } from "@/lib/company-data";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Systems & Solutions — Pandatechs" },
      { name: "description", content: "Websites, e-commerce, POS, school, hospital, HR, SACCO and financial systems by Pandatechs." },
      { property: "og:title", content: "Systems & Solutions — Pandatechs" },
      { property: "og:description", content: "Every system we build, from starter websites to financial platforms." },
    ],
  }),
  component: SolutionsPage,
});

function SolutionsPage() {
  const [tier, setTier] = useState<string>("All");
  const { data = [] } = useQuery({ queryKey: ["solutions"], queryFn: api.solutions });
  const list = tier === "All" ? data : data.filter((s) => s.tier === tier);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <p className="eyebrow">Solutions</p>
      <h1 className="mt-3 font-display text-4xl font-bold">Systems we build</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
        Pick a starting point. Every system is customised to your business, with M-Pesa and bank integrations available.
      </p>
      <div className="mt-8 flex flex-wrap gap-2">
        {["All", ...solutionTiers].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTier(t)}
            className={`rounded-full border px-4 py-2 text-xs transition-colors ${tier === t ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {list.map((s) => <SolutionCard key={s.slug} solution={s} />)}
      </div>
    </div>
  );
}
