import { githubActivity } from "@/lib/portfolio-data";

export function GithubActivity() {
  return (
    <div className="panel p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="eyebrow">Contribution activity</p>
          <p className="mt-1 text-xs text-muted-foreground">{githubActivity.note}</p>
        </div>
      </div>
    </div>
  );
}
