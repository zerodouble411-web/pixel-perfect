import { buildContributionGrid, githubActivity } from "@/lib/portfolio-data";

const shades = [
  "bg-muted",
  "bg-primary/25",
  "bg-primary/45",
  "bg-primary/70",
  "bg-primary",
];

export function GithubActivity() {
  const grid = buildContributionGrid();

  return (
    <div className="panel p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="eyebrow">Contribution activity</p>
          <p className="mt-1 text-xs text-muted-foreground">{githubActivity.note}</p>
        </div>
        <div className="flex gap-5 text-center">
          {Object.entries(githubActivity.totals).map(([label, value]) => (
            <div key={label}>
              <p className="font-display text-lg font-bold text-primary">{value}</p>
              <p className="text-[0.65rem] uppercase tracking-widest text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <div className="flex gap-[3px]">
          {grid.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((level, di) => (
                <span key={di} className={`size-[10px] rounded-[2px] ${shades[level]}`} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-[0.65rem] text-muted-foreground">
        Less
        {shades.map((s, i) => (
          <span key={i} className={`size-[10px] rounded-[2px] ${s}`} />
        ))}
        More
      </div>
    </div>
  );
}
