import { Link } from "@tanstack/react-router";
import { Menu, Terminal as TerminalIcon, X } from "lucide-react";
import { useState } from "react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/architecture", label: "Architecture" },
  { to: "/analytics", label: "Analytics" },
  { to: "/lab", label: "Lab" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-flame text-primary-foreground">
            <TerminalIcon className="size-4" />
          </span>
          <span className="font-display text-sm font-semibold tracking-tight">
            panda<span className="text-primary">techs</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-primary" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/"
            hash="contact"
            className="hidden rounded-full border border-primary/50 px-4 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/10 sm:inline-flex"
          >
            Let's talk
          </Link>
          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
            className="rounded-md border border-border p-2 md:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-surface px-4 py-3 md:hidden">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block rounded-md px-2 py-3 text-sm text-muted-foreground"
              activeProps={{ className: "text-primary" }}
            >
              {item.label}
            </Link>
          ))}
          <Link to="/admin" onClick={() => setOpen(false)} className="block px-2 py-3 text-sm text-muted-foreground">
            Admin CMS
          </Link>
        </div>
      ) : null}
    </header>
  );
}
