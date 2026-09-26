import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { analytics } from "@/lib/portfolio-data";

const axis = { stroke: "var(--muted-foreground)", fontSize: 11 };
const tooltipStyle = {
  background: "var(--surface-2)",
  border: "1px solid var(--border)",
  borderRadius: "10px",
  fontSize: "12px",
  color: "var(--foreground)",
};

export function AnalyticsDashboard() {
  const totalPayments = analytics.payments.reduce((sum, p) => sum + p.value, 0);

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <section className="panel p-6 lg:col-span-2">
        <p className="eyebrow">API requests (7 days)</p>
        <div className="mt-5 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={analytics.requests}>
              <defs>
                <linearGradient id="apiFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="cacheFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="day" tick={axis} axisLine={false} tickLine={false} />
              <YAxis tick={axis} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="api" stroke="var(--chart-1)" fill="url(#apiFill)" strokeWidth={2} name="API hits" />
              <Area type="monotone" dataKey="cached" stroke="var(--chart-2)" fill="url(#cacheFill)" strokeWidth={2} name="Redis cache hits" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="panel p-6">
        <p className="eyebrow">Queue health (jobs / 4h)</p>
        <div className="mt-5 h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analytics.queue}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="hour" tick={axis} axisLine={false} tickLine={false} />
              <YAxis tick={axis} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--muted)" }} />
              <Bar dataKey="processed" fill="var(--chart-1)" radius={[4, 4, 0, 0]} name="Processed" />
              <Bar dataKey="failed" fill="var(--chart-3)" radius={[4, 4, 0, 0]} name="Failed" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="panel p-6">
        <p className="eyebrow">Payment outcomes</p>
        <div className="mt-5 flex items-center gap-6">
          <div className="h-48 flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={analytics.payments} dataKey="value" innerRadius={45} outerRadius={70} paddingAngle={3}>
                  {analytics.payments.map((_, i) => (
                    <Cell key={i} fill={`var(--chart-${i + 1})`} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="space-y-3 text-sm">
            {analytics.payments.map((p, i) => (
              <li key={p.name} className="flex items-center gap-2">
                <span className="size-2.5 rounded-full" style={{ background: `var(--chart-${i + 1})` }} />
                <span className="text-muted-foreground">{p.name}</span>
                <span className="font-mono">{((p.value / totalPayments) * 100).toFixed(1)}%</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="panel p-6 lg:col-span-2">
        <p className="eyebrow">Deployments per week</p>
        <div className="mt-5 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analytics.deployments}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="week" tick={axis} axisLine={false} tickLine={false} />
              <YAxis tick={axis} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="deploys" stroke="var(--chart-1)" strokeWidth={2.5} dot={{ r: 4 }} name="Deploys" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
