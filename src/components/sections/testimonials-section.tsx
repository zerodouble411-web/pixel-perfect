import { Quote } from "lucide-react";
import { useEffect, useState } from "react";
import { testimonials } from "@/lib/portfolio-data";

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 5200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="border-b border-border bg-surface/50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <p className="eyebrow">Feedback</p>
        <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">What collaborators say</h2>
        {testimonials.length === 0 ? <p className="mt-5 text-sm text-muted-foreground">References available on request.</p> : null}

        {testimonials.length > 0 ? <div className="mt-8 overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {testimonials.map((t, i) => (
              <figure key={i} className="w-full shrink-0 px-1">
                <div className="panel p-8">
                  <Quote className="size-6 text-primary" />
                  <blockquote className="mt-4 text-lg leading-relaxed">{t.quote}</blockquote>
                  <figcaption className="mt-6 text-sm">
                    <span className="font-semibold">{t.name}</span>
                    <span className="block text-xs text-muted-foreground">{t.role}</span>
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div> : null}

        {testimonials.length > 0 ? <div className="mt-5 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-primary" : "w-1.5 bg-muted"}`}
            />
          ))}
        </div> : null}
      </div>
    </section>
  );
}
