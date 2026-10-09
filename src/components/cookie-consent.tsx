import { Cookie, Settings2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type Consent = { analytics: boolean };

const COOKIE_NAME = "pandatechs_cookie_consent";

function readConsent(): Consent | null {
  const value = document.cookie.split("; ").find((row) => row.startsWith(`${COOKIE_NAME}=`))?.split("=")[1];
  if (!value) return null;
  try {
    return JSON.parse(decodeURIComponent(value)) as Consent;
  } catch {
    return null;
  }
}

function writeConsent(consent: Consent) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(consent))}; Max-Age=15552000; Path=/; SameSite=Lax${secure}`;
  window.dispatchEvent(new CustomEvent("pandatechs:consent", { detail: consent }));
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [settings, setSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const saved = readConsent();
    setAnalytics(saved?.analytics ?? false);
    setVisible(saved === null);
    const open = () => {
      const current = readConsent();
      setAnalytics(current?.analytics ?? false);
      setSettings(true);
      setVisible(true);
    };
    window.addEventListener("pandatechs:open-cookie-settings", open);
    return () => window.removeEventListener("pandatechs:open-cookie-settings", open);
  }, []);

  const save = (consent: Consent) => {
    writeConsent(consent);
    setAnalytics(consent.analytics);
    setVisible(false);
    setSettings(false);
  };

  if (!visible) return null;

  return (
    <aside className="fixed inset-x-3 bottom-20 z-50 mx-auto max-w-xl border border-border bg-surface p-5 shadow-2xl md:bottom-5" aria-label="Cookie preferences">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"><Cookie className="size-4" /></span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h2 className="font-display text-base font-semibold tracking-normal">Your cookie choices</h2>
            {readConsent() && (
              <Button variant="ghost" size="icon" onClick={() => setVisible(false)} aria-label="Close cookie settings"><X /></Button>
            )}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Essential cookies keep your preferences. Optional analytics help us understand website visits and stay off unless you allow them.
          </p>

          {settings && (
            <div className="mt-4 space-y-3 border-y border-border py-4">
              <div className="flex items-center justify-between gap-4">
                <div><Label>Essential cookies</Label><p className="mt-1 text-xs text-muted-foreground">Required to remember your choice.</p></div>
                <Switch checked disabled aria-label="Essential cookies always enabled" />
              </div>
              <div className="flex items-center justify-between gap-4">
                <div><Label htmlFor="analytics-cookies">Analytics cookies</Label><p className="mt-1 text-xs text-muted-foreground">Optional website usage measurement.</p></div>
                <Switch id="analytics-cookies" checked={analytics} onCheckedChange={setAnalytics} aria-label="Allow analytics cookies" />
              </div>
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            {settings ? (
              <Button onClick={() => save({ analytics })}>Save choices</Button>
            ) : (
              <Button onClick={() => save({ analytics: true })}>Accept all</Button>
            )}
            <Button variant="outline" onClick={() => save({ analytics: false })}>Essential only</Button>
            {!settings && <Button variant="ghost" onClick={() => setSettings(true)}><Settings2 />Manage</Button>}
          </div>
        </div>
      </div>
    </aside>
  );
}