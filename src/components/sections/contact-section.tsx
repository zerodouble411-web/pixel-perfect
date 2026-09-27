import { useMutation } from "@tanstack/react-query";
import { Check, Clock, Globe, Loader2, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { api, CONTACT_API_ENABLED } from "@/lib/api";
import { hero } from "@/lib/portfolio-data";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", projectType: "Backend API", budget: "Undecided", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const mutation = useMutation({
    mutationFn: api.sendMessage,
    onSuccess: () => {
      setSent(true);
      setForm({ name: "", email: "", projectType: "Backend API", budget: "Undecided", message: "" });
    },
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = "Please enter your name";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) next.email = "Enter a valid email";
    if (form.message.trim().length < 12) next.message = "Tell me a bit more (12+ characters)";
    setErrors(next);
    if (Object.keys(next).length === 0) mutation.mutate(form);
  }

  const field = "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary";

  return (
    <section id="contact" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.2fr_0.8fr]">
        <div>
          <p className="eyebrow">Get in touch</p>
          <h2 className="mt-3 font-display text-3xl font-bold">Let's build something reliable</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Payments, queues, APIs or a rescue mission on an existing Laravel codebase — tell me what you are building.
          </p>
        </div>

        <form onSubmit={submit} className="panel space-y-4 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <input
                className={field}
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              {errors.name ? <p className="mt-1 text-xs text-destructive">{errors.name}</p> : null}
            </div>
            <div>
              <input
                className={field}
                placeholder="Your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {errors.email ? <p className="mt-1 text-xs text-destructive">{errors.email}</p> : null}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <select className={field} value={form.projectType} onChange={(e) => setForm({ ...form, projectType: e.target.value })}>
              {["Backend API", "Payment integration", "Queue / background jobs", "Full product build", "Code rescue"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
            <select className={field} value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })}>
              {["Undecided", "Under KES 100k", "KES 100k – 500k", "KES 500k+"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>

          <div>
            <textarea
              rows={5}
              className={field}
              placeholder="Tell me about your project..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            {errors.message ? <p className="mt-1 text-xs text-destructive">{errors.message}</p> : null}
          </div>

          {!CONTACT_API_ENABLED ? <p className="text-sm text-muted-foreground">Online messages are not connected yet. Please call {hero.phone} instead.</p> : null}
          <button
            type="submit"
            disabled={mutation.isPending || !CONTACT_API_ENABLED}
            className="inline-flex items-center gap-2 rounded-full bg-flame px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60"
          >
            {mutation.isPending ? <Loader2 className="size-4 animate-spin" /> : sent ? <Check className="size-4" /> : <Send className="size-4" />}
            {mutation.isPending ? "Sending" : sent ? "Message sent" : "Send message"}
          </button>

          {sent ? (
            <p className="animate-rise text-xs text-success">
              Thanks — your message has been sent.
            </p>
          ) : null}
          {mutation.isError ? <p className="text-xs text-destructive">Message could not be sent. Please call {hero.phone} instead.</p> : null}
        </form>

        <aside className="panel h-fit space-y-4 p-6 text-sm">
          {[
            { icon: Phone, label: "Phone", value: hero.phone },
            { icon: Globe, label: "Website", value: hero.website },
            { icon: MapPin, label: "Location", value: hero.location },
            { icon: Clock, label: "Response time", value: "Within 24 hours" },
          ].map((row) => (
            <div key={row.label} className="flex items-start gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <row.icon className="size-4" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{row.label}</p>
                <p className="font-medium">{row.value}</p>
              </div>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}
