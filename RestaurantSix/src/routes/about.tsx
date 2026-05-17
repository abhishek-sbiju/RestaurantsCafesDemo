import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import chef from "@/assets/chef.jpg";
import interior from "@/assets/interior.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Verdé" },
      { name: "description", content: "The story of Verdé and Chef Élise Marchand — a decade of botanical, seasonal cooking in Paris." },
      { property: "og:title", content: "Our Story — Verdé" },
      { property: "og:description", content: "A decade of botanical, seasonal cooking in Paris." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <Layout>
      <section className="pt-40 pb-24 px-6 max-w-4xl mx-auto text-center">
        <div className="eyebrow">— Since 2014</div>
        <h1 className="display mt-6 text-6xl md:text-8xl">
          A quiet cuisine,<br/>
          <span className="italic text-gold">rooted in soil.</span>
        </h1>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 md:px-10 grid md:grid-cols-2 gap-16 items-center pb-24">
        <div className="aspect-[4/5] overflow-hidden">
          <img src={chef} alt="Chef Élise Marchand" width={1200} height={1500} loading="lazy" className="h-full w-full object-cover" />
        </div>
        <div>
          <div className="eyebrow">— Élise Marchand</div>
          <h2 className="display mt-6 text-4xl md:text-5xl">From a hedgerow in Normandy.</h2>
          <div className="mt-8 space-y-5 text-muted-foreground leading-relaxed">
            <p>
              Élise grew up between her grandmother's kitchen and a wild
              hedgerow at the edge of a Normandy farm. She trained at L'Arpège
              and Mirazur before opening Verdé in 2014 with a single conviction:
              that restraint is the most generous thing a cook can offer.
            </p>
            <p>
              Today, Verdé holds two Michelin stars and a Green Star for sustainability.
              Élise still walks the garden every morning before service.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-card">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-24 grid md:grid-cols-3 gap-12">
          <Pillar n="01" t="The Garden" d="Three hectares of biodynamic kitchen garden in Île-de-France. 140 varietals, most heirloom, all cultivated for flavour over yield." />
          <Pillar n="02" t="The Network" d="Day-boat fishermen in Brittany, foragers in the Morvan, a single butter-maker in the Pays Basque. We know every supplier by name." />
          <Pillar n="03" t="The Room" d="22 seats, an open kitchen, no music. The conversation between dish and diner is what we serve." />
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-24 grid md:grid-cols-[1.2fr_1fr] gap-16 items-center">
        <div className="aspect-[4/3] overflow-hidden">
          <img src={interior} alt="The Verdé dining room" width={1600} height={1200} loading="lazy" className="h-full w-full object-cover" />
        </div>
        <div>
          <div className="eyebrow">— Accolades</div>
          <ul className="mt-8 divide-y divide-border border-t border-b border-border">
            {[
              ["2024", "World's 50 Best · No. 27"],
              ["2023", "Michelin · Second Star"],
              ["2022", "Michelin · Green Star, Sustainability"],
              ["2019", "Gault & Millau · Chef of the Year"],
              ["2017", "Michelin · First Star"],
              ["2014", "Verdé opens · Paris IV"],
            ].map(([y, t]) => (
              <li key={y} className="py-5 flex justify-between items-baseline gap-6">
                <span className="display text-2xl text-gold">{y}</span>
                <span className="text-sm md:text-base text-muted-foreground text-right">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  );
}

function Pillar({ n, t, d }: { n: string; t: string; d: string }) {
  return (
    <div>
      <div className="text-gold text-sm tracking-[0.3em]">{n}</div>
      <h3 className="display mt-4 text-3xl">{t}</h3>
      <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{d}</p>
    </div>
  );
}
