/**
 * Single data-access layer.
 *
 * Today every function resolves mock data. When the Laravel 12 backend in
 * /backend is deployed, set VITE_API_URL and flip `USE_API` to true — the
 * response shapes are identical, so no component changes are required.
 */

import {
  about,
  analytics,
  architecture,
  githubActivity,
  hero,
  liveCards,
  projects,
  services,
  skills,
  testimonials,
  type Project,
} from "./portfolio-data";
import { company, solutions, type Solution } from "./company-data";

const USE_API = false;
export const CONTACT_API_ENABLED = USE_API;
export const API_BASE = import.meta.env["VITE_API_URL"] ?? "https://api.pandatechs.co.ke/api";

async function mock<T>(value: T, ms = 220): Promise<T> {
  await new Promise((r) => setTimeout(r, ms));
  return value;
}

async function request<T>(path: string, fallback: T): Promise<T> {
  if (!USE_API) return mock(fallback);
  const res = await fetch(`${API_BASE}${path}`, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`API ${res.status}`);
  const body = (await res.json()) as { data: T };
  return body.data;
}

export const api = {
  company: () => request("/company", company),
  hero: () => request("/portfolio/hero", hero),
  about: () => request("/portfolio/about", about),
  services: () => request("/portfolio/services", services),
  skills: () => request("/portfolio/skills", skills),
  liveCards: () => request("/portfolio/live-cards", liveCards),
  testimonials: () => request("/portfolio/testimonials", testimonials),
  architecture: () => request("/portfolio/architecture", architecture),
  analytics: () => request("/portfolio/analytics", analytics),
  github: () => request("/portfolio/github-activity", githubActivity),
  solutions: () => request<Solution[]>("/company/solutions", solutions),
  projects: (params?: { search?: string; category?: string; featured?: boolean }) => {
    const query = new URLSearchParams();
    if (params?.search) query.set("search", params.search);
    if (params?.category && params.category !== "All") query.set("category", params.category);
    if (params?.featured) query.set("featured", "1");
    const filtered = projects.filter((p) => {
      const matchesSearch = params?.search
        ? `${p.name} ${p.summary} ${p.tags.join(" ")}`.toLowerCase().includes(params.search.toLowerCase())
        : true;
      const matchesCategory = params?.category && params.category !== "All" ? p.category === params.category : true;
      const matchesFeatured = params?.featured ? p.featured : true;
      return matchesSearch && matchesCategory && matchesFeatured;
    });
    return request<Project[]>(`/projects?${query.toString()}`, filtered);
  },
  project: (slug: string) => {
    const found = projects.find((p) => p.slug === slug) ?? null;
    return request<Project | null>(`/projects/${slug}`, found);
  },
  sendMessage: async (payload: { name: string; email: string; projectType: string; budget: string; message: string }) => {
    if (!USE_API) throw new Error("Online contact is not connected yet");
    const res = await fetch(`${API_BASE}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Could not send message");
    return (await res.json()) as { status: string; id: string };
  },
};
