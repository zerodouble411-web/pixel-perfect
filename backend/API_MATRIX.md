# Laravel 12 API matrix

Base URL: `https://api.pandatechs.co.ke/api`  
Media type: `application/json`  
Authentication: Laravel Sanctum bearer token  
Envelope: successful JSON responses use `{ "data": ... }` unless Laravel pagination adds `links` and `meta`.

## Common behavior

| Concern | Contract |
| --- | --- |
| Headers | Send `Accept: application/json`; send `Content-Type: application/json` for JSON bodies. |
| Authentication | Protected endpoints require `Authorization: Bearer <token>`. |
| Admin authorization | Admin endpoints additionally require the Sanctum `admin` ability. |
| Validation error | `422` with `{ "message": "The given data was invalid.", "errors": { "field": ["message"] } }`. |
| Other errors | `401` unauthenticated, `403` unauthorized, `404` missing resource, `429` throttled, `500` server failure. |
| Timestamps | ISO 8601 strings in UTC. |
| IDs | Positive integers unless a resource explicitly uses a slug. |

## Complete endpoint matrix

**Status key:** Scaffolded means a controller exists in this repository. Contracted means the endpoint and shape are specified but its controller still needs implementation in the Laravel application.

### Authentication

| Method | Path | Access | Request | Success | Status |
| --- | --- | --- | --- | --- | --- |
| POST | `/login` | Public | `email` required email; `password` required string | `200 { data: { token, user } }` | Scaffolded |
| GET | `/me` | Authenticated | — | `200 { data: User }` | Scaffolded |
| POST | `/logout` | Authenticated | — | `200 { data: { status: "logged_out" } }` | Scaffolded |

`User` is `{ id: number, name: string, email: string }`. Invalid login credentials return `422`. Logout revokes only the current access token.

### Company website

| Method | Path | Access | Query/body | Success | Cache | Status |
| --- | --- | --- | --- | --- | --- | --- |
| GET | `/company` | Public | — | `200 { data: Company }` | 10 min | Contracted |
| GET | `/company/solutions` | Public | — | `200 { data: Solution[] }` | 10 min | Contracted |

`Company`:

```json
{
  "name": "Pandatechs",
  "tagline": "Software systems for Kenyan businesses — from a first website to full financial platforms.",
  "website": "pandatechs.co.ke",
  "phone": "0111679286",
  "location": "Nairobi, Kenya",
  "shellCode": "<?php ...",
  "ceo": {
    "name": "Laban Panda Khisa",
    "role": "Founder & CEO, Backend Software Engineer",
    "bio": "..."
  }
}
```

`Solution` is `{ slug, name, tier, category, summary, features }`; `tier` is `Starter`, `Business`, or `Enterprise`, and `features` is a string array.

### Public portfolio

| Method | Path | Access | Success data shape | Cache | Status |
| --- | --- | --- | --- | --- | --- |
| GET | `/portfolio/hero` | Public | `Hero` | 10 min | Contracted |
| GET | `/portfolio/about` | Public | `About` | 10 min | Contracted |
| GET | `/portfolio/services` | Public | `Service[]` | 10 min | Contracted |
| GET | `/portfolio/skills` | Public | `Skill[]` | 10 min | Contracted |
| GET | `/portfolio/live-cards` | Public | `LiveCard[]` | 60 sec | Contracted |
| GET | `/portfolio/testimonials` | Public | `Testimonial[]` | 10 min | Contracted |
| GET | `/portfolio/architecture` | Public | `Architecture` | 10 min | Contracted |
| GET | `/portfolio/analytics` | Public | `Analytics` | 60 sec | Contracted |
| GET | `/portfolio/github-activity` | Public | `GitHubActivity` | 10 min | Contracted |

Resource contracts:

- `Hero`: `{ name, title, roles: string[], tagline, availability, location, phone, email, website }`.
- `About`: `{ bio, timeline: TimelineItem[] }`; `TimelineItem`: `{ year, role, org, summary, highlights: string[] }`.
- `Service`: `{ id, title, description, technologies: string[], details: string[] }`.
- `Skill`: `{ name, level, category, note, projects: string[] }`; `level` is integer `0..100`.
- `LiveCard`: `{ label, value, detail, trend }`.
- `Testimonial`: `{ name, role, quote }`.
- `Architecture`: `{ nodes: ArchitectureNode[], flow: string[] }`; node is `{ id, label, group, description, responsibilities: string[] }`.
- `Analytics`: `{ requests: object[], queue: object[], payments: object[], deployments: object[] }` with chart-ready points matching the frontend data layer.
- `GitHubActivity`: `{ note, totals: { commits, repositories, streak, reviews }, weeks }`.

### Projects

| Method | Path | Access | Query | Success | Cache | Status |
| --- | --- | --- | --- | --- | --- | --- |
| GET | `/projects` | Public | `search?: string(≤120)`, `category?: string(≤60)`, `featured?: boolean` | `200 { data: Project[] }` | 10 min per filter set | Scaffolded |
| GET | `/projects/{slug}` | Public | Slug path parameter | `200 { data: Project }` | — | Scaffolded |

Unknown project slugs return `404`. The full `Project` shape is defined in `API_CONTRACT.md`; list responses may omit relationship-heavy `gallery` and `metrics` until loaded.

### Contact and inbox

| Method | Path | Access | Request | Success | Status |
| --- | --- | --- | --- | --- | --- |
| POST | `/contact` | Public, 5/min/IP | `name`, `email`, `project_type`, `budget?`, `message` | `201 { data: { status: "ok", id } }` | Scaffolded |
| GET | `/admin/messages` | Admin | Page query accepted by Laravel paginator | `200` paginated `ContactMessage` collection | Scaffolded |
| PATCH | `/admin/messages/{id}` | Admin | — | `200 { data: ContactMessage }` | Scaffolded |
| DELETE | `/admin/messages/{id}` | Admin | — | `204` empty body | Scaffolded |

Contact validation: `name` 2–120 characters; RFC/DNS-valid `email` ≤180; `project_type` ≤80; optional `budget` ≤80; `message` 12–5000. A successful submission queues an owner notification. `ContactMessage` is `{ id, name, email, project_type, budget, message, ip_address, read_at, created_at, updated_at }`; never expose inbox records publicly.

### Admin content

| Method | Path | Request contract | Success | Status |
| --- | --- | --- | --- | --- |
| PUT | `/admin/hero` | Complete or validated partial `Hero` payload | `200 { data: Hero }` | Contracted |
| PUT | `/admin/about` | Complete or validated partial `About` payload | `200 { data: About }` | Contracted |
| GET | `/admin/skills` | — | `200 { data: Skill[] }` | Contracted |
| POST | `/admin/skills` | `name`, `level`, `category`, `note?`, `projects?` | `201 { data: Skill }` | Contracted |
| PUT/PATCH | `/admin/skills/{id}` | Validated partial `Skill` | `200 { data: Skill }` | Contracted |
| DELETE | `/admin/skills/{id}` | — | `204` | Contracted |
| GET | `/admin/testimonials` | — | `200 { data: Testimonial[] }` | Contracted |
| POST | `/admin/testimonials` | `name`, `role`, `quote`, `rating?` | `201 { data: Testimonial }` | Contracted |
| PUT/PATCH | `/admin/testimonials/{id}` | Validated partial testimonial | `200 { data: Testimonial }` | Contracted |
| DELETE | `/admin/testimonials/{id}` | — | `204` | Contracted |
| GET | `/admin/projects` | Same filters as public project index | `200 { data: Project[] }` | Contracted |
| POST | `/admin/projects` | Full `Project` write payload | `201 { data: Project }` | Contracted |
| PUT/PATCH | `/admin/projects/{slug}` | Validated partial project payload | `200 { data: Project }` | Contracted |
| DELETE | `/admin/projects/{slug}` | — | `204` | Contracted |
| POST | `/admin/projects/{slug}/gallery` | Multipart: `image` file, optional `caption`, optional `position` | `201 { data: ProjectImage }` | Contracted |
| GET | `/admin/analytics` | — | `200 { data: Analytics }` | Contracted |

All rows in this section require `auth:sanctum` plus `ability:admin`. Writes invalidate the relevant public cache tags. Gallery uploads accept JPEG, PNG, or WebP, up to 5 MB. `ProjectImage` is `{ id, url, caption, position }`.

## Project write contract

| Field | Rule |
| --- | --- |
| `slug` | required on create; lowercase slug; unique; max 120 |
| `name` | required string; max 180 |
| `category` | required string; max 60 |
| `featured` | required boolean |
| `year` | required four-digit year |
| `summary` | required string; max 2000 |
| `image` | nullable URL for API responses; persisted upload path server-side |
| `tags` | array of strings; max 20 entries; each max 60 |
| `problem`, `solution` | nullable strings; max 10000 each |
| `architecture` | array of strings |
| `challenges` | array of `{ title, body }` |
| `results` | array of `{ label, value }` |
| `metrics` | array of `{ month, requests, success }`; success `0..100` |
| `timeline` | array of `{ phase, detail }` |
| `code` | nullable `{ title, language, snippet }` |

## Frontend field mapping

The React contact form uses camelCase locally. Before POST `/contact`, map `projectType` to `project_type`. Other response names must remain identical to `src/lib/portfolio-data.ts` and `src/lib/company-data.ts`, because `src/lib/api.ts` swaps local data for API responses without route-level transformation.