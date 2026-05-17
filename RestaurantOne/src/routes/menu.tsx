import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "The Menu — Verdé" },
      { name: "description", content: "Verdé's seven-course botanical tasting menu, composed each morning from the harvest." },
      { property: "og:title", content: "The Menu — Verdé" },
      { property: "og:description", content: "A seven-course botanical tasting menu." },
    ],
  }),
  component: MenuPage,
});

const courses = [
  { n: "I", name: "Garden Snow", desc: "Frozen herb consommé, salt-baked turnip, wild watercress", pairing: "Champagne · Larmandier-Bernier" },
  { n: "II", name: "Smoked Beetroot", desc: "Burnt hay, aged hazelnut, sheep's milk, sorrel oil", pairing: "Jura · Domaine Tissot" },
  { n: "III", name: "Hand-rolled Tortelli", desc: "Browned butter, sage, fresh ricotta, sunchoke", pairing: "Friulano · Vignai da Duline" },
  { n: "IV", name: "Turbot · Pine", desc: "Line-caught Brittany turbot, douglas fir butter, salt-baked celeriac", pairing: "Meursault · Roulot" },
  { n: "V", name: "Quail · Charcoal", desc: "Grilled quail, fermented black garlic, smoked yolk, watercress", pairing: "Volnay · Marquis d'Angerville" },
  { n: "VI", name: "Bitter Greens", desc: "Aged Comté, walnut, lardo, frisée — a quiet pause", pairing: "" },
  { n: "VII", name: "Black Honey", desc: "Buckwheat ice cream, charred plum, bee pollen, beeswax tuile", pairing: "Tokaji · Royal Tokaji" },
];

function MenuPage() {
  return (
    <Layout>
      <section className="pt-40 pb-20 text-center px-6">
        <div className="eyebrow">— Tasting Menu · Autumn</div>
        <h1 className="display mt-6 text-6xl md:text-8xl">
          Seven movements.<br/>
          <span className="italic text-gold">One evening.</span>
        </h1>
        <p className="mt-8 max-w-xl mx-auto text-muted-foreground leading-relaxed">
          Composed each morning from the harvest. Served from 18:30.
          Allergies and convictions accommodated with grace — please advise on booking.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-32">
        <ul className="divide-y divide-border border-t border-b border-border">
          {courses.map((c) => (
            <li key={c.n} className="py-10 grid grid-cols-[3rem_1fr] md:grid-cols-[4rem_1fr_auto] gap-6 items-baseline">
              <div className="display text-3xl text-gold">{c.n}</div>
              <div>
                <h3 className="display text-3xl md:text-4xl">{c.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                {c.pairing && (
                  <p className="mt-3 text-[0.7rem] tracking-[0.25em] uppercase text-gold-soft">
                    Pairing · {c.pairing}
                  </p>
                )}
              </div>
              <div className="hidden md:block text-xs tracking-[0.25em] uppercase text-muted-foreground">
                {c.n === "VII" ? "Finale" : "Course"}
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-16 grid md:grid-cols-2 gap-10 text-sm text-muted-foreground">
          <div>
            <div className="eyebrow mb-3">Tasting Menu</div>
            <p className="display text-4xl text-foreground">€220 <span className="text-base text-muted-foreground">/ person</span></p>
          </div>
          <div>
            <div className="eyebrow mb-3">With Wine Pairing</div>
            <p className="display text-4xl text-foreground">€340 <span className="text-base text-muted-foreground">/ person</span></p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link to="/reservations" className="btn-gold">Reserve a Table</Link>
        </div>
      </section>
    </Layout>
  );
}
