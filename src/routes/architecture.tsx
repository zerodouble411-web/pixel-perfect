import { createFileRoute } from "@tanstack/react-router";
import { ArchitectureExplorer } from "@/components/architecture-explorer";

export const Route = createFileRoute("/architecture")({
  head: () => ({
    meta: [
      { title: "Architecture explorer — Laban Panda Khisa" },
      {
        name: "description",
        content: "Interactive map of the Laravel + Redis + MySQL architecture behind these production systems.",
      },
      { property: "og:title", content: "Architecture explorer — Laban Panda Khisa" },
      { property: "og:description", content: "Click through the request flow: client, API, Redis, workers, database." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/architecture" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Architecture explorer — Laban Panda Khisa" },
      { name: "twitter:description", content: "Click through the request flow: client, API, Redis, workers, database." },
    ],
    links: [{ rel: "canonical", href: "/architecture" }],
  }),
  component: ArchitecturePage,
});

function ArchitecturePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <p className="eyebrow">System design</p>
      <h1 className="mt-3 font-display text-4xl font-bold">Architecture explorer</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
        Click any component to see what it owns. The highlighted path animates a request travelling from the client
        through the API, Redis, workers and the database.
      </p>
      <div className="mt-10">
        <ArchitectureExplorer />
      </div>
    </div>
  );
}
