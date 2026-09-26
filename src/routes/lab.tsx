import { createFileRoute } from "@tanstack/react-router";
import { EngineeringTerminal } from "@/components/engineering-terminal";
import { GithubActivity } from "@/components/github-activity";

export const Route = createFileRoute("/lab")({
  head: () => ({
    meta: [
      { title: "Engineering lab — Laban Panda Khisa" },
      {
        name: "description",
        content: "An interactive shell and contribution activity view. Type help, skills, projects or sudo hire laban.",
      },
      { property: "og:title", content: "Engineering lab — Laban Panda Khisa" },
      { property: "og:description", content: "A working terminal and contribution graph inside the portfolio." },
    ],
  }),
  component: LabPage,
});

function LabPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <p className="eyebrow">Engineering lab</p>
      <h1 className="mt-3 font-display text-4xl font-bold">Terminal & activity</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
        Try <span className="font-mono text-primary">help</span>, <span className="font-mono text-primary">skills</span>,{" "}
        <span className="font-mono text-primary">projects</span> or{" "}
        <span className="font-mono text-primary">sudo hire laban</span>.
      </p>

      <div className="mt-8 space-y-6">
        <EngineeringTerminal />
        <GithubActivity />
      </div>
    </div>
  );
}
