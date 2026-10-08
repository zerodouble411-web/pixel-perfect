import { Link } from "@tanstack/react-router";
import { Boxes, Home, Layers, SquareTerminal, User } from "lucide-react";

const tabs = [
  { to: "/", label: "Home", icon: Home, exact: true },
  { to: "/solutions", label: "Systems", icon: Boxes, exact: false },
  { to: "/portfolio", label: "CEO", icon: User, exact: false },
  { to: "/projects", label: "Work", icon: Layers, exact: false },
  { to: "/lab", label: "Lab", icon: SquareTerminal, exact: false },
];

export function MobileTabBar() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden">
      <ul className="grid grid-cols-5">
        {tabs.map((tab) => (
          <li key={tab.to}>
            <Link
              to={tab.to}
              activeOptions={{ exact: tab.exact }}
              className="flex flex-col items-center gap-1 py-2.5 text-[0.65rem] text-muted-foreground"
              activeProps={{ className: "text-primary" }}
            >
              <tab.icon className="size-5" />
              {tab.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
