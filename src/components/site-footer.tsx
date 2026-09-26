import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { hero } from "@/lib/portfolio-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-lg font-semibold">
            panda<span className="text-primary">techs</span>
          </p>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            {hero.name} — {hero.title}. Payment infrastructure, queue systems and production APIs built with Laravel 12.
          </p>
          <div className="mt-5 flex gap-3">
            {[Github, Linkedin, Mail, Phone].map((Icon, i) => (
              <span key={i} className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground">
                <Icon className="size-4" />
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow">Explore</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/projects" className="hover:text-primary">Projects</Link></li>
            <li><Link to="/architecture" className="hover:text-primary">Architecture</Link></li>
            <li><Link to="/analytics" className="hover:text-primary">Analytics</Link></li>
            <li><Link to="/lab" className="hover:text-primary">Engineering lab</Link></li>
            <li><Link to="/admin" className="hover:text-primary">Admin CMS</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">Contact</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>{hero.phone}</li>
            <li>{hero.website}</li>
            <li>{hero.location}</li>
            <li className="text-primary">{hero.availability}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border px-4 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {hero.name}. Frontend demo data; Laravel 12 API contract in /backend.
      </div>
    </footer>
  );
}
