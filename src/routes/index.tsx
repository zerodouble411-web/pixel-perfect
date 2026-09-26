import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroSection } from "@/components/sections/hero-section";
import { LiveCards } from "@/components/sections/live-cards";
import { ProjectCard } from "@/components/project-card";
import { ServicesSection } from "@/components/sections/services-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { projects } from "@/lib/portfolio-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Laban Panda Khisa — Backend Software Engineer" },
      {
        name: "description",
        content:
          "Backend engineer building M-Pesa payment infrastructure, Redis queue systems and Laravel 12 APIs. Explore live dashboards, case studies and architecture.",
      },
      { property: "og:title", content: "Laban Panda Khisa — Backend Software Engineer" },
      {
        property: "og:description",
        content: "Payment infrastructure, queue systems and production Laravel APIs.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      <HeroSection />
      <LiveCards />
      <AboutSection />
      <ServicesSection />
      <SkillsSection />

      <section className="border-b border-border bg-surface/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Featured projects</p>
              <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Production systems</h2>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm transition-colors hover:border-primary/60 hover:text-primary"
            >
              View all projects <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
