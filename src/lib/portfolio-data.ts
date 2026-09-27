/**
 * Mock data layer. Shapes mirror the Laravel 12 API contract in /backend
 * (see backend/API_CONTRACT.md). Swapping mock -> live only requires
 * changing the functions in src/lib/api.ts.
 */

import khwwcImg from "@/assets/project-khwwc.jpg";
import motorbikeImg from "@/assets/project-motorbike.jpg";
import pandaaiImg from "@/assets/project-pandaai.jpg";

export type Hero = {
  name: string;
  title: string;
  roles: string[];
  tagline: string;
  availability: string;
  location: string;
  phone: string;
  email: string;
  website: string;
};

export const hero: Hero = {
  name: "Laban Panda Khisa",
  title: "Backend Software Engineer",
  roles: [
    "Backend Software Engineer",
    "Laravel & API Architect",
    "Payments Infrastructure Builder",
    "Redis & Queue Systems Engineer",
  ],
  tagline:
    "I build payment infrastructure, queue-driven systems and production APIs that stay up when traffic does not behave.",
  availability: "Available for work",
  location: "Nairobi, Kenya",
  phone: "0111679286",
  email: "hello@pandatechs.co.ke",
  website: "pandatechs.co.ke",
};

export type StatCard = {
  label: string;
  value: string;
  detail: string;
  trend: number;
};

export const liveCards: StatCard[] = [
  { label: "Production Systems", value: "Multiple", detail: "Deployed & monitored", trend: 4 },
  { label: "Payment Infrastructure", value: "STK Push + Wallet", detail: "M-Pesa Daraja", trend: 12 },
  { label: "Redis Queue Systems", value: "Active", detail: "Workers healthy", trend: 7 },
  { label: "AI Engineering", value: "Copilot + ChatGPT + Kiro", detail: "Daily workflow", trend: 3 },
];

export const counters = [
  { label: "Years building", value: 5, suffix: "+" },
  { label: "Systems shipped", value: 24, suffix: "" },
  { label: "API endpoints", value: 380, suffix: "+" },
  { label: "Uptime target", value: 99, suffix: ".9%" },
];

export type TimelineItem = {
  year: string;
  role: string;
  org: string;
  summary: string;
  highlights: string[];
};

export const about = {
  bio: "I am a backend engineer focused on money-movement systems: wallets, STK Push collections, reconciliation, queues and the observability that keeps them honest. I write Laravel the way production demands it — form requests, API resources, policies, jobs, retries and idempotency keys.",
  timeline: [
    {
      year: "2024 — now",
      role: "Backend Software Engineer",
      org: "PandaTechs",
      summary: "Designing payment and operations platforms for Kenyan SMEs.",
      highlights: [
        "M-Pesa STK Push collections with idempotent callbacks",
        "Redis-backed queues for reconciliation and notifications",
        "Role-based admin CMS with Sanctum token auth",
      ],
    },
    {
      year: "2023 — 2024",
      role: "API Engineer",
      org: "Freelance / contract",
      summary: "Built and hardened REST APIs for logistics and welfare platforms.",
      highlights: ["Versioned API resources", "Queue workers with retry/backoff", "MySQL query tuning"],
    },
    {
      year: "2021 — 2023",
      role: "Full-Stack Developer",
      org: "Independent",
      summary: "Shipped dashboards and internal tools with React and Laravel.",
      highlights: ["React + TanStack Query front ends", "Storage and media pipelines", "CI-driven deploys"],
    },
  ] as TimelineItem[],
};

export type Service = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  details: string[];
};

export const services: Service[] = [
  {
    id: "backend",
    title: "Backend Development",
    description: "Backend APIs designed around domain boundaries, not controllers.",
    technologies: ["Laravel 12", "Node.js", "Python", "MySQL", "Redis"],
    details: [
      "Form requests and API resources for every endpoint",
      "Token authentication and granular policies",
      "Service + repository layering with tests",
      "Redis caching and rate limiting",
    ],
  },
  {
    id: "payments",
    title: "Payment Infrastructure",
    description: "STK Push, wallets, ledgers and reconciliation that balances.",
    technologies: ["M-Pesa Daraja", "Wallets", "Ledger", "Webhooks"],
    details: [
      "Idempotent callback handling",
      "Double-entry wallet ledger",
      "Automatic retries and dead-letter review",
      "Settlement and reconciliation reports",
    ],
  },
  {
    id: "queues",
    title: "Queues & Background Jobs",
    description: "Work that must not be lost moves through Redis queues.",
    technologies: ["Redis", "Horizon", "Workers", "Notifications"],
    details: [
      "Prioritised queues per workload",
      "Backoff, retry and failure alerting",
      "Scheduled jobs and batch processing",
      "Queue health dashboards",
    ],
  },
  {
    id: "frontend",
    title: "Product Front Ends",
    description: "React dashboards that make backend data usable.",
    technologies: ["React 19", "TypeScript", "TanStack Query", "Tailwind"],
    details: [
      "Typed API clients",
      "Optimistic updates and cache invalidation",
      "Accessible component systems",
      "Charts and operational views",
    ],
  },
  {
    id: "integrations",
    title: "API Integrations",
    description: "Bank integrations and currency converter APIs for connected financial workflows.",
    technologies: ["Bank APIs", "Currency converter APIs", "Webhooks"],
    details: [
      "Bank API connectivity and payment workflows",
      "Currency conversion API integrations",
      "Webhook handling and resilient error recovery",
    ],
  },
];

export type Skill = { name: string; level: number; category: string; note: string; projects: string[] };

export const skills: Skill[] = [
  { name: "Laravel", level: 96, category: "Backend", note: "Primary framework since 2021. Queues, policies, resources, testing.", projects: ["khwwc-platform", "motorbike-business-os"] },
  { name: "PHP", level: 94, category: "Backend", note: "Modern PHP 8.3 with typed properties and enums.", projects: ["khwwc-platform"] },
  { name: "Node.js", level: 82, category: "Backend", note: "JavaScript services and API integration workflows.", projects: [] },
  { name: "Python", level: 82, category: "Backend", note: "Backend scripting and API integration workflows.", projects: [] },
  { name: "MySQL", level: 88, category: "Database", note: "Schema design, indexing, slow query analysis.", projects: ["khwwc-platform", "motorbike-business-os"] },
  { name: "Redis", level: 90, category: "Infrastructure", note: "Queues, caching, locks and rate limiting in production.", projects: ["khwwc-platform", "panda-ai"] },
  { name: "REST API design", level: 93, category: "Backend", note: "Versioning, pagination, error contracts, idempotency.", projects: ["khwwc-platform", "panda-ai"] },
  { name: "React", level: 85, category: "Frontend", note: "React 19 with TanStack Query and typed clients.", projects: ["motorbike-business-os", "panda-ai"] },
  { name: "TypeScript", level: 84, category: "Frontend", note: "Strict mode, generics, discriminated unions.", projects: ["panda-ai"] },
  { name: "Docker", level: 78, category: "Infrastructure", note: "Local parity and deployment images.", projects: ["motorbike-business-os"] },
  { name: "Linux / VPS", level: 82, category: "Infrastructure", note: "Nginx, supervisor, certbot, zero-drama deploys.", projects: ["khwwc-platform"] },
  { name: "M-Pesa Daraja", level: 92, category: "Payments", note: "STK Push, C2B, B2C and callback reconciliation.", projects: ["khwwc-platform", "motorbike-business-os"] },
  { name: "Bank integrations", level: 82, category: "Integrations", note: "Connecting banking APIs to payment workflows.", projects: [] },
  { name: "Currency converter APIs", level: 82, category: "Integrations", note: "Exchange-rate API connectivity and currency conversion workflows.", projects: [] },
  { name: "Tailwind CSS", level: 88, category: "Frontend", note: "Token-driven design systems.", projects: ["panda-ai"] },
  { name: "Git / CI", level: 86, category: "Tooling", note: "Trunk-based flow with automated checks.", projects: ["khwwc-platform"] },
];

export const skillCategories = ["All", "Backend", "Payments", "Integrations", "Infrastructure", "Database", "Frontend", "Tooling"];

export type Project = {
  slug: string;
  name: string;
  category: string;
  featured: boolean;
  summary: string;
  image: string;
  tags: string[];
  year: string;
  problem: string;
  solution: string;
  architecture: string[];
  challenges: { title: string; body: string }[];
  results: { label: string; value: string }[];
  metrics: { month: string; requests: number; success: number }[];
  timeline: { phase: string; detail: string }[];
  code: { title: string; language: string; snippet: string };
};

export const projects: Project[] = [
  {
    slug: "khwwc-platform",
    name: "KHWWC Platform",
    category: "Payments",
    featured: true,
    summary: "Welfare contribution and payout platform with M-Pesa STK Push, wallets and member reconciliation.",
    image: khwwcImg,
    tags: ["Laravel 12", "MySQL", "Redis", "M-Pesa"],
    year: "2024",
    problem:
      "Member contributions were tracked in spreadsheets. Payments arrived by M-Pesa with no automatic matching, so reconciliation took days and disputes were common.",
    solution:
      "A Laravel API with a double-entry wallet ledger, STK Push collections, idempotent callbacks and an admin console for statements, payouts and audit trails.",
    architecture: [
      "React admin console -> Laravel API (Sanctum tokens)",
      "STK Push request -> Daraja -> callback endpoint with idempotency key",
      "Callback dispatches a queued ReconcilePayment job on Redis",
      "Ledger entries written in a DB transaction, notifications queued",
      "Nightly scheduled job produces settlement reports to storage",
    ],
    challenges: [
      { title: "Duplicate callbacks", body: "Daraja can retry callbacks. Every transaction carries a unique checkout id used as an idempotency key, so replays are no-ops." },
      { title: "Partial failures", body: "Ledger writes and notifications were split: money moves in a DB transaction, side effects run in queued jobs with retry and backoff." },
      { title: "Audit pressure", body: "Every balance change is derived from immutable ledger rows, never from a mutable balance column." },
    ],
    results: [
      { label: "Reconciliation time", value: "2 days -> minutes" },
      { label: "Manual corrections", value: "-91%" },
      { label: "Callback success", value: "99.4%" },
    ],
    metrics: [
      { month: "Jan", requests: 42000, success: 99.1 },
      { month: "Feb", requests: 51000, success: 99.3 },
      { month: "Mar", requests: 58000, success: 99.2 },
      { month: "Apr", requests: 67000, success: 99.5 },
      { month: "May", requests: 74000, success: 99.4 },
      { month: "Jun", requests: 81000, success: 99.6 },
    ],
    timeline: [
      { phase: "Discovery", detail: "Mapped contribution rules and payout policy" },
      { phase: "Ledger design", detail: "Double-entry schema and migration plan" },
      { phase: "Payments", detail: "STK Push, callbacks, idempotency, retries" },
      { phase: "Console", detail: "Admin statements, disputes, exports" },
      { phase: "Hardening", detail: "Queue monitoring and settlement reports" },
    ],
    code: {
      title: "Idempotent STK callback handler",
      language: "php",
      snippet: `public function handle(StkCallbackRequest $request): JsonResponse
{
    $payload = $request->validated();

    $transaction = Transaction::query()
        ->where('checkout_request_id', $payload['CheckoutRequestID'])
        ->lockForUpdate()
        ->firstOrFail();

    if ($transaction->isSettled()) {
        return response()->json(['status' => 'already_processed']);
    }

    DB::transaction(function () use ($transaction, $payload) {
        $transaction->markSettled($payload);
        app(WalletLedger::class)->credit(
            wallet: $transaction->wallet,
            amount: $transaction->amount,
            reference: $transaction->reference,
        );
    });

    ReconcilePayment::dispatch($transaction)->onQueue('payments');

    return response()->json(['status' => 'ok']);
}`,
    },
  },
  {
    slug: "motorbike-business-os",
    name: "Motorbike Business OS",
    category: "Operations",
    featured: true,
    summary: "Fleet, rider and loan repayment operating system for a boda-boda financing business.",
    image: motorbikeImg,
    tags: ["Laravel 12", "React", "Redis", "Reporting"],
    year: "2025",
    problem:
      "Bike ownership, rider assignment, daily repayments and maintenance were tracked across notebooks and WhatsApp, so arrears were discovered far too late.",
    solution:
      "An operations platform: bike registry, rider agreements, daily repayment capture, arrears scoring and a console that surfaces risk before it compounds.",
    architecture: [
      "React operations console with TanStack Query cache",
      "Laravel API with policy-guarded resources per role",
      "Daily repayment ingestion jobs on a dedicated Redis queue",
      "Arrears scoring recalculated on a schedule",
      "SMS notifications fanned out through queued notifications",
    ],
    challenges: [
      { title: "Offline capture", body: "Field agents lose signal. Repayments queue locally and sync with a deduplicating endpoint." },
      { title: "Fair arrears logic", body: "Grace periods and partial payments needed explicit rules, encoded as testable domain services." },
      { title: "Reporting load", body: "Heavy aggregates are pre-computed nightly and cached in Redis." },
    ],
    results: [
      { label: "Arrears detection", value: "Same day" },
      { label: "Collection rate", value: "+18%" },
      { label: "Report generation", value: "12s -> 0.4s" },
    ],
    metrics: [
      { month: "Jan", requests: 18000, success: 98.4 },
      { month: "Feb", requests: 21000, success: 98.9 },
      { month: "Mar", requests: 25000, success: 99.0 },
      { month: "Apr", requests: 29000, success: 99.2 },
      { month: "May", requests: 33000, success: 99.1 },
      { month: "Jun", requests: 38000, success: 99.4 },
    ],
    timeline: [
      { phase: "Process mapping", detail: "Shadowed daily collection rounds" },
      { phase: "Domain model", detail: "Bikes, riders, agreements, repayments" },
      { phase: "Sync engine", detail: "Deduplicated offline capture" },
      { phase: "Risk scoring", detail: "Scheduled arrears recalculation" },
      { phase: "Rollout", detail: "Agent training and phased migration" },
    ],
    code: {
      title: "Arrears scoring job",
      language: "php",
      snippet: `class RecalculateArrears implements ShouldQueue
{
    public int $tries = 3;
    public array $backoff = [10, 60, 300];

    public function handle(ArrearsCalculator $calculator): void
    {
        Agreement::query()
            ->active()
            ->with('repayments')
            ->chunkById(200, function ($agreements) use ($calculator) {
                foreach ($agreements as $agreement) {
                    $score = $calculator->for($agreement);
                    $agreement->forceFill([
                        'arrears_days'  => $score->days,
                        'risk_band'     => $score->band,
                    ])->save();
                }
            });

        Cache::tags('reports')->flush();
    }
}`,
    },
  },
  {
    slug: "panda-ai",
    name: "PandaAI",
    category: "AI",
    featured: true,
    summary: "AI assistant workspace with streamed responses, usage metering and per-workspace budgets.",
    image: pandaaiImg,
    tags: ["Laravel 12", "React", "Streaming", "Redis"],
    year: "2025",
    problem:
      "Teams wanted an internal AI workspace but needed cost control, audit history and the ability to switch model providers without rewriting the app.",
    solution:
      "A provider-agnostic gateway: Laravel brokers requests, meters tokens per workspace, enforces budgets and streams responses to a React workspace UI.",
    architecture: [
      "React workspace with streaming response rendering",
      "Laravel gateway normalising multiple model providers",
      "Redis counters for per-workspace token budgets",
      "Queued jobs for embeddings and long summaries",
      "Immutable conversation log in MySQL",
    ],
    challenges: [
      { title: "Streaming through PHP", body: "Responses stream chunk by chunk while usage is metered after completion, so a dropped client never loses accounting." },
      { title: "Budget enforcement", body: "Redis counters with atomic increments stop a workspace mid-month without a database round trip per token." },
      { title: "Provider drift", body: "A normalised request/response contract keeps provider swaps to one adapter class." },
    ],
    results: [
      { label: "Provider swap", value: "1 adapter class" },
      { label: "Budget overruns", value: "0" },
      { label: "Median first token", value: "480ms" },
    ],
    metrics: [
      { month: "Jan", requests: 9000, success: 97.8 },
      { month: "Feb", requests: 14000, success: 98.3 },
      { month: "Mar", requests: 19000, success: 98.7 },
      { month: "Apr", requests: 26000, success: 99.0 },
      { month: "May", requests: 31000, success: 99.1 },
      { month: "Jun", requests: 40000, success: 99.3 },
    ],
    timeline: [
      { phase: "Gateway spec", detail: "Normalised provider contract" },
      { phase: "Metering", detail: "Redis counters and budget rules" },
      { phase: "Streaming", detail: "Chunked responses end to end" },
      { phase: "Workspaces", detail: "Roles, history, exports" },
      { phase: "Observability", detail: "Latency and spend dashboards" },
    ],
    code: {
      title: "Budget-aware gateway call",
      language: "php",
      snippet: `public function complete(Workspace $workspace, Prompt $prompt): StreamedResponse
{
    $budget = app(TokenBudget::class);

    abort_if($budget->exhausted($workspace), 402, 'Workspace budget exhausted');

    return response()->stream(function () use ($workspace, $prompt, $budget) {
        $usage = $this->provider->stream($prompt, function (string $chunk) {
            echo $chunk;
            ob_flush();
            flush();
        });

        $budget->record($workspace, $usage->totalTokens);
        ConversationLog::write($workspace, $prompt, $usage);
    }, 200, ['Content-Type' => 'text/event-stream']);
}`,
    },
  },
];

export const projectCategories = ["All", "Payments", "Operations", "AI"];

export type ArchNode = {
  id: string;
  label: string;
  group: string;
  description: string;
  responsibilities: string[];
};

export const architecture: { nodes: ArchNode[]; flow: string[] } = {
  nodes: [
    {
      id: "client",
      label: "React Client",
      group: "Edge",
      description: "Typed API client with TanStack Query caching and optimistic updates.",
      responsibilities: ["Token storage", "Cache invalidation", "Optimistic UI", "Error surfaces"],
    },
    {
      id: "api",
      label: "Laravel API",
      group: "Application",
      description: "Form requests validate, policies authorise, API resources shape every response.",
      responsibilities: ["Validation", "Authorisation", "Resource shaping", "Rate limiting"],
    },
    {
      id: "redis",
      label: "Redis",
      group: "Infrastructure",
      description: "Queue backend, cache store, lock manager and counter store in one.",
      responsibilities: ["Queue backend for jobs", "Response and aggregate caching", "Atomic counters and budgets", "Distributed locks for payments"],
    },
    {
      id: "workers",
      label: "Queue Workers",
      group: "Infrastructure",
      description: "Supervised workers per queue with retry, backoff and failure alerting.",
      responsibilities: ["Payment reconciliation", "Notifications", "Report generation", "Dead-letter review"],
    },
    {
      id: "mysql",
      label: "MySQL",
      group: "Data",
      description: "Normalised schema with ledger immutability and covering indexes.",
      responsibilities: ["Transactional writes", "Ledger history", "Indexed reporting reads"],
    },
    {
      id: "mpesa",
      label: "M-Pesa Daraja",
      group: "External",
      description: "STK Push collections and callbacks with idempotency protection.",
      responsibilities: ["STK Push initiation", "Callback delivery", "Status queries"],
    },
    {
      id: "storage",
      label: "Storage",
      group: "Data",
      description: "Statements, exports and uploaded media on disk-agnostic storage.",
      responsibilities: ["Signed URLs", "Report archives", "Media uploads"],
    },
  ],
  flow: ["client", "api", "redis", "workers", "mysql"],
};

export const testimonials: { name: string; role: string; quote: string }[] = [];

export const analytics = {
  requests: [
    { day: "Mon", api: 38000, cached: 22000 },
    { day: "Tue", api: 42000, cached: 26000 },
    { day: "Wed", api: 47000, cached: 31000 },
    { day: "Thu", api: 44000, cached: 29000 },
    { day: "Fri", api: 52000, cached: 35000 },
    { day: "Sat", api: 31000, cached: 19000 },
    { day: "Sun", api: 27000, cached: 16000 },
  ],
  queue: [
    { hour: "00", processed: 420, failed: 3 },
    { hour: "04", processed: 310, failed: 1 },
    { hour: "08", processed: 980, failed: 6 },
    { hour: "12", processed: 1240, failed: 4 },
    { hour: "16", processed: 1110, failed: 7 },
    { hour: "20", processed: 760, failed: 2 },
  ],
  payments: [
    { name: "Settled", value: 1842 },
    { name: "Pending", value: 96 },
    { name: "Failed", value: 31 },
  ],
  deployments: [
    { week: "W1", deploys: 4 },
    { week: "W2", deploys: 6 },
    { week: "W3", deploys: 3 },
    { week: "W4", deploys: 7 },
  ],
};

export const githubActivity = {
  note: "GitHub account not connected.",
  totals: { commits: 0, repositories: 0, streak: 0, reviews: 0 },
  weeks: 52,
};

export function buildContributionGrid(): number[][] {
  // deterministic pseudo-random so server and client render the same grid
  const grid: number[][] = [];
  for (let week = 0; week < 52; week += 1) {
    const col: number[] = [];
    for (let day = 0; day < 7; day += 1) {
      const seed = (week * 7 + day) * 9301 + 49297;
      const value = (seed % 233280) / 233280;
      const weekend = day === 0 || day === 6;
      const level = Math.floor(value * (weekend ? 3 : 5));
      col.push(level);
    }
    grid.push(col);
  }
  return grid;
}
