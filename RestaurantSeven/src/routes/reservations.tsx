import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { useState } from "react";
import { createReservation } from "@/lib/reservations.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/reservations")({
  head: () => ({
    meta: [
      { title: "Reservations — Gulp Cocktails & Kitchen" },
      { name: "description", content: "Reserve your table at Gulp Cocktails & Kitchen, Banashankari, Bangalore. Open daily 12 PM – 12 AM." },
      { property: "og:title", content: "Reservations — Gulp Cocktails & Kitchen" },
      { property: "og:description", content: "Reserve your table at Gulp. Open daily 12 PM – 12 AM." },
    ],
  }),
  component: Reservations,
});

function Reservations() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setSubmitting(true);
    try {
      await createReservation({
        name: String(fd.get("name") || ""),
        email: String(fd.get("email") || ""),
        phone: String(fd.get("phone") || ""),
        reservation_date: String(fd.get("date") || ""),
        seating: String(fd.get("seat") || "19:00"),
        guests: Number(fd.get("guests") || 2),
        notes: String(fd.get("notes") || "") || null,
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
          Walk-ins welcome. For larger parties or special celebrations, we recommend booking ahead.
          We'll confirm by call or email within a few hours.
        </p>
      </section>

      <section className="mx-auto max-w-[1100px] px-6 pb-32 grid md:grid-cols-[1.2fr_1fr] gap-16">
        <form
          onSubmit={onSubmit}
          className="bg-card p-8 md:p-12 border border-border"
        >
          {sent ? (
            <div className="py-20 text-center">
              <div className="eyebrow">— Thank You</div>
              <h2 className="display mt-6 text-4xl">Your request is in.</h2>
              <p className="mt-4 text-muted-foreground">We'll confirm your reservation shortly via call or email.</p>
            </div>
          ) : (
            <div className="space-y-6">
              <Field label="Full Name"><input name="name" required type="text" className={inp} placeholder="Your name" /></Field>
              <div className="grid grid-cols-2 gap-6">
                <Field label="Email"><input name="email" required type="email" className={inp} placeholder="you@example.com" /></Field>
                <Field label="Phone"><input name="phone" required type="tel" className={inp} placeholder="+91 98765 43210" /></Field>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <Field label="Date"><input name="date" required type="date" className={inp} /></Field>
                <Field label="Guests">
                  <select name="guests" className={inp} defaultValue="2">
                    {[1,2,3,4,5,6,7,8,10,12,15,20].map(n => <option key={n} value={n}>{n} {n===1?"guest":"guests"}</option>)}
                  </select>
                </Field>
              </div>
              <Field label="Preferred Time">
                <input type="time" name="seat" required className={inp} defaultValue="19:00" />
              </Field>
              <Field label="Notes — occasion, dietary needs, special requests">
                <textarea name="notes" rows={4} className={inp} placeholder="Birthday celebration, anniversary, dietary preferences, etc." />
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
              16, Outer Ring Road<br/>Banashankari, Bangalore
            </p>
            <p className="mt-3 text-sm text-muted-foreground">Beside Domino's · 3rd Phase, BSK 560085</p>
          </div>
          <div>
            <div className="eyebrow">— Contact</div>
            <p className="mt-4 text-sm leading-relaxed">
              <a href="tel:+919845967899" className="link-underline">+91 98459 67899</a><br/>
              <a href="https://instagram.com/gulpcocktails_blr" target="_blank" rel="noopener noreferrer" className="link-underline">@gulpcocktails_blr</a>
            </p>
          </div>
          <div>
            <div className="eyebrow">— Hours</div>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Open Daily<br/>
              12:00 PM – 12:00 AM<br/>
              Kitchen & Bar · Full service
            </p>
          </div>
          <div className="border-t border-border pt-8">
            <div className="eyebrow">— Private Events</div>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              For corporate parties, birthdays, anniversaries, farewells, and large group bookings,
              please call us directly at{" "}
              <a href="tel:+919845967899" className="text-gold link-underline">+91 98459 67899</a>.
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
