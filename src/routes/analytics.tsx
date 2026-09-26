import { createFileRoute } from "@tanstack/react-router";
import { AnalyticsDashboard } from "@/components/analytics-dashboard";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — Laban Panda Khisa" },
      {
        name: "description",
        content: "Operational dashboard: API traffic, Redis cache hits, queue health, payment outcomes and deploys.",
      },
      { property: "og:title", content: "Analytics — Laban Panda Khisa" },
      { property: "og:description", content: "API traffic, queue health and payment outcomes at a glance." },
    ],
  }),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <p className="eyebrow">Operations</p>
      <h1 className="mt-3 font-display text-4xl font-bold">Analytics dashboard</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
        The kind of view I build for every system I ship. Figures here are demo data served through the same data layer
        the Laravel API will use.
      </p>
      <div className="mt-10">
        <AnalyticsDashboard />
      </div>
    </div>
  );
}
