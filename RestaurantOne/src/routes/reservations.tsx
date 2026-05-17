import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { useState } from "react";
// Mock server function for static build
const useServerFn = (fn: any) => fn;
import { createReservation } from "@/lib/reservations.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/reservations")({
  head: () => ({
    meta: [
      { title: "Reservations — Verdé" },
      { name: "description", content: "Reserve your table at Verdé. Two seatings nightly, Tuesday through Saturday." },
      { property: "og:title", content: "Reservations — Verdé" },
      { property: "og:description", content: "Two seatings nightly · Tuesday through Saturday." },
    ],
  }),
  component: Reservations,
});

function Reservations() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const submit = useServerFn(createReservation);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setSubmitting(true);
    try {
      await submit({
        data: {
          name: String(fd.get("name") || ""),
          email: String(fd.get("email") || ""),
          reservation_date: String(fd.get("date") || ""),
          seating: String(fd.get("seat") || "18:30") as "18:30" | "21:00",
          guests: Number(fd.get("guests") || 2),
          notes: String(fd.get("notes") || "") || null,
        },
      });
      setSent(true);
    } catch (err) {
      console.error(err);
      toast.error("Sorry — we couldn't submit your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Layout>
      <section className="pt-40 pb-16 px-6 text-center max-w-3xl mx-auto">
        <div className="eyebrow">— Reservations</div>
        <h1 className="display mt-6 text-6xl md:text-7xl">
          Reserve your<br/>
          <span className="italic text-gold">evening.</span>
        </h1>
        <p className="mt-6 text-muted-foreground leading-relaxed">
          Two seatings nightly at 18:30 and 21:00. We confirm by email within 24 hours.
        </p>
      </section>

      <section className="mx-auto max-w-[1100px] px-6 pb-32 grid md:grid-cols-[1.2fr_1fr] gap-16">
        <form
          onSubmit={onSubmit}
          className="bg-card p-8 md:p-12 border border-border"
        >
          {sent ? (
            <div className="py-20 text-center">
              <div className="eyebrow">— Merci</div>
              <h2 className="display mt-6 text-4xl">Your request is in.</h2>
              <p className="mt-4 text-muted-foreground">We'll confirm by email within 24 hours.</p>
            </div>
          ) : (
            <div className="space-y-6">
              <Field label="Full Name"><input name="name" required type="text" className={inp} placeholder="Your name" /></Field>
              <Field label="Email"><input name="email" required type="email" className={inp} placeholder="you@example.com" /></Field>
              <div className="grid grid-cols-2 gap-6">
                <Field label="Date"><input name="date" required type="date" className={inp} /></Field>
                <Field label="Guests">
                  <select name="guests" className={inp} defaultValue="2">
                    {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n===1?"guest":"guests"}</option>)}
                  </select>
                </Field>
              </div>
              <Field label="Seating">
                <div className="grid grid-cols-2 gap-3">
                  <label className="border border-border p-4 cursor-pointer hover:border-gold transition-colors text-sm flex items-center gap-3">
                    <input type="radio" name="seat" value="18:30" defaultChecked className="accent-[color:var(--gold)]" /> 18:30
                  </label>
                  <label className="border border-border p-4 cursor-pointer hover:border-gold transition-colors text-sm flex items-center gap-3">
                    <input type="radio" name="seat" value="21:00" className="accent-[color:var(--gold)]" /> 21:00
                  </label>
                </div>
              </Field>
              <Field label="Notes — allergies, occasion, convictions">
                <textarea name="notes" rows={4} className={inp} placeholder="Tell us anything that would help us prepare." />
              </Field>
              <button type="submit" disabled={submitting} className="btn-gold w-full disabled:opacity-60">
                {submitting ? "Sending…" : "Request Reservation"}
              </button>
            </div>
          )}
        </form>

        <aside className="space-y-10">
          <div>
            <div className="eyebrow">— Visit</div>
            <p className="mt-4 display text-2xl leading-snug">
              14 Rue des Jardins<br/>75004 Paris
            </p>
            <p className="mt-3 text-sm text-muted-foreground">Métro · Saint-Paul (Line 1)</p>
          </div>
          <div>
            <div className="eyebrow">— Contact</div>
            <p className="mt-4 text-sm leading-relaxed">
              <a href="tel:+33142000000" className="link-underline">+33 1 42 00 00 00</a><br/>
              <a href="mailto:reserve@verde.paris" className="link-underline">reserve@verde.paris</a>
            </p>
          </div>
          <div>
            <div className="eyebrow">— Service</div>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Tuesday – Saturday<br/>
              Dinner only · 18:30 – 22:30<br/>
              Closed Sunday & Monday
            </p>
          </div>
          <div className="border-t border-border pt-8">
            <div className="eyebrow">— Private Events</div>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              For full buy-outs, weddings, and corporate gatherings, please write to{" "}
              <a href="mailto:events@verde.paris" className="text-gold link-underline">events@verde.paris</a>.
            </p>
          </div>
        </aside>
      </section>
    </Layout>
  );
}

const inp = "w-full bg-transparent border border-border px-4 py-3 text-sm focus:border-gold focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground/60";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[0.65rem] tracking-[0.25em] uppercase text-muted-foreground mb-2">{label}</span>
      {children}
    </label>
  );
}
