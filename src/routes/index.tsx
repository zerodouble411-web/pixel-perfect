import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SolutionCard } from "@/components/solution-card";
import { api } from "@/lib/api";
import { company } from "@/lib/company-data";
import portrait from "@/assets/laban-panda-khisa.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pandatechs — Software Systems for Businesses in Kenya" },
      { name: "description", content: "Websites, POS, school, hospital, SACCO and financial systems built in Nairobi by Pandatechs." },
      { property: "og:title", content: "Pandatechs — Software Systems for Businesses in Kenya" },
      { property: "og:description", content: "From starter websites to POS, school, hospital and financial systems." },
    ],
  }),
  component: Home,
});

function Home() {
  const { data: solutions = [] } = useQuery({ queryKey: ["solutions"], queryFn: api.solutions });
  const highlighted = solutions.filter((s) => ["pos", "school-management", "hospital-management", "financial-platform", "starter-website", "sacco-microfinance"].includes(s.slug));

  return (
    <>
      <section className="grid-bg border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6">
          <p className="eyebrow">{company.location}</p>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-bold leading-tight sm:text-6xl">
            Software that runs your <span className="text-flame">business</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">{company.tagline}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/solutions" className="inline-flex items-center gap-2 rounded-full bg-flame px-6 py-3 text-sm font-semibold text-primary-foreground">
              View our systems <ArrowRight className="size-4" />
            </Link>
            <a href={`tel:${company.phone}`} className="rounded-full border border-border px-6 py-3 text-sm hover:border-primary/60">
              Call {company.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">What we build</p>
              <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">From starter to enterprise</h2>
            </div>
            <Link to="/solutions" className="inline-flex items-center gap-2 text-sm text-primary">
              All systems <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {highlighted.map((s) => <SolutionCard key={s.slug} solution={s} />)}
          </div>
        </div>
      </section>

      <section className="bg-surface/50">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-[280px_1fr]">
          <img src={portrait.url} alt={company.ceo.name} className="mx-auto size-64 rounded-2xl border border-border object-cover object-top" />
          <div>
            <p className="eyebrow">Leadership</p>
            <h2 className="mt-3 font-display text-3xl font-bold">{company.ceo.name}</h2>
            <p className="mt-1 text-sm text-primary">{company.ceo.role}</p>
            <p className="mt-4 max-w-2xl text-muted-foreground">{company.ceo.bio}</p>
            <Link to="/portfolio" className="mt-6 inline-flex items-center gap-2 rounded-full bg-flame px-6 py-3 text-sm font-semibold text-primary-foreground">
              View my portfolio <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
