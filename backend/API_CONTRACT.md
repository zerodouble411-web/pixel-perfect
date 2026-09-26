# Laravel 12 API contract — Portfolio SaaS

Base URL: `https://api.pandatechs.co.ke/api`
Auth: Laravel Sanctum personal access tokens (`Authorization: Bearer <token>`)
All responses are wrapped by API Resources as `{ "data": ... }`.

The React frontend consumes these shapes today through mock data in
`src/lib/portfolio-data.ts`, routed via `src/lib/api.ts`. Setting `USE_API = true`
and `VITE_API_URL` switches the app to the live API with no component changes.

## Authentication

| Method | Endpoint      | Body                  | Notes                       |
| ------ | ------------- | --------------------- | --------------------------- |
| POST   | `/login`      | `email`, `password`   | Returns `{ token, user }`   |
| POST   | `/logout`     | —                     | Revokes the current token   |
| GET    | `/me`         | —                     | Authenticated user profile  |

## Public portfolio

| Method | Endpoint                      | Returns |
| ------ | ----------------------------- | ------- |
| GET    | `/portfolio/hero`             | `{ name, title, roles[], tagline, availability, location, phone, email, website }` |
| GET    | `/portfolio/about`            | `{ bio, timeline[] }` where timeline is `{ year, role, org, summary, highlights[] }` |
| GET    | `/portfolio/services`         | `[{ id, title, description, technologies[], details[] }]` |
| GET    | `/portfolio/skills`           | `[{ name, level, category, note, projects[] }]` |
| GET    | `/portfolio/live-cards`       | `[{ label, value, detail, trend }]` |
| GET    | `/portfolio/testimonials`     | `[{ name, role, quote }]` |
| GET    | `/portfolio/architecture`     | `{ nodes: [{ id, label, group, description, responsibilities[] }], flow: string[] }` |
| GET    | `/portfolio/analytics`        | `{ requests[], queue[], payments[], deployments[] }` |
| GET    | `/portfolio/github-activity`  | `{ note, totals: { commits, repositories, streak, reviews }, weeks }` |

## Projects

| Method | Endpoint            | Query                          |
| ------ | ------------------- | ------------------------------ |
| GET    | `/projects`         | `?search=&category=&featured=` |
| GET    | `/projects/{slug}`  | —                              |

Project resource:

```json
{
  "slug": "khwwc-platform",
  "name": "KHWWC Platform",
  "category": "Payments",
  "featured": true,
  "year": "2024",
  "summary": "…",
  "image": "https://…",
  "tags": ["Laravel 12", "Redis"],
  "problem": "…",
  "solution": "…",
  "architecture": ["…"],
  "challenges": [{ "title": "…", "body": "…" }],
  "results": [{ "label": "…", "value": "…" }],
  "metrics": [{ "month": "Jan", "requests": 42000, "success": 99.1 }],
  "timeline": [{ "phase": "…", "detail": "…" }],
  "code": { "title": "…", "language": "php", "snippet": "…" }
}
```

## Contact

| Method | Endpoint    | Body |
| ------ | ----------- | ---- |
| POST   | `/contact`  | `name`, `email`, `project_type`, `budget`, `message` |

Validation lives in `StoreContactMessageRequest`. A queued
`ContactMessageReceived` notification is dispatched on the `notifications`
queue; the endpoint is rate limited to 5 requests/minute per IP.

## Admin (auth:sanctum + `ability:admin`)

| Method | Endpoint |
| ------ | -------- |
| PUT    | `/admin/hero` |
| PUT    | `/admin/about` |
| POST / PUT / DELETE | `/admin/skills[/{id}]` |
| POST / PUT / DELETE | `/admin/services[/{id}]` |
| POST / PUT / DELETE | `/admin/projects[/{slug}]` |
| POST   | `/admin/projects/{slug}/gallery` (multipart upload to Storage) |
| POST / PUT / DELETE | `/admin/testimonials[/{id}]` |
| GET / PATCH / DELETE | `/admin/messages[/{id}]` |
| GET    | `/admin/analytics` |

## Errors

```json
{ "message": "The given data was invalid.", "errors": { "email": ["…"] } }
```

Status codes: `401` unauthenticated, `403` unauthorised, `404` missing,
`422` validation, `429` throttled, `500` server.

## Infrastructure expectations

- Redis drives `cache`, `queue` and `session`.
- Queues: `payments`, `notifications`, `reports` (each with its own worker).
- Jobs declare `$tries` and `$backoff`; failures land in `failed_jobs`.
- Scheduler runs nightly settlement/report jobs.
- Storage disk `public` (or S3) holds project gallery images and exports.
