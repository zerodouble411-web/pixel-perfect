import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SolutionCard } from "@/components/solution-card";
import { CompanyShell } from "@/components/company-shell";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import portrait from "@/assets/laban-panda-khisa.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pandatechs — Software Systems for Businesses in Kenya" },
      { name: "description", content: "Websites, POS, school, hospital, SACCO and financial systems built in Nairobi by Pandatechs." },
      { property: "og:title", content: "Pandatechs — Software Systems for Businesses in Kenya" },
      { property: "og:description", content: "From starter websites to POS, school, hospital and financial systems." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Pandatechs — Software Systems for Businesses in Kenya" },
      { name: "twitter:description", content: "From starter websites to POS, school, hospital and financial systems." },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Pandatechs",
        url: "https://pandatechs.co.ke",
        email: "hello@pandatechs.co.ke",
        telephone: "+254111679286",
        founder: { "@type": "Person", name: "Laban Panda Khisa", jobTitle: "Founder & CEO" },
        address: { "@type": "PostalAddress", addressLocality: "Nairobi", addressCountry: "KE" },
        areaServed: "Kenya",
      }),
    }],
  }),
  component: Home,
});

function Home() {
  const { data: company } = useQuery({ queryKey: ["company"], queryFn: api.company });
  const { data: solutions = [] } = useQuery({ queryKey: ["solutions"], queryFn: api.solutions });
  if (!company) return null;
  const highlighted = solutions.filter((s) => ["pos", "school-management", "hospital-management", "financial-platform", "starter-website", "sacco-microfinance"].includes(s.slug));

  return (
    <>
      <section className="border-b border-border bg-shell" aria-label="Pandatechs engineering">
        <div className="mx-auto max-w-7xl px-4 py-10 text-center sm:px-6 sm:py-12">
          <p className="font-mono text-xs text-code-string">{company.location} <span className="mx-2 text-code-comment">/</span> Software engineering</p>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-bold leading-tight tracking-normal sm:text-6xl">
            {company.name}<span className="text-primary">_</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">{company.tagline}</p>
          <CompanyShell code={company.shellCode} />
          <div className="mt-3 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
            <Link to="/solutions">
              View our systems <ArrowRight className="size-4" />
            </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-shell">
            <a href={`tel:${company.phone}`}>
              Call {company.phone}
            </a>
            </Button>
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
