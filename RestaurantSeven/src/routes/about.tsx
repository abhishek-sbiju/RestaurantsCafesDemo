import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import espressoMartini from "@/assets/imagethree.jpg";
import barInterior from "@/assets/2025-10-01.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Gulp Cocktails & Kitchen" },
      { name: "description", content: "The story behind Gulp Cocktails & Kitchen — Bangalore's most theatrical cocktail destination on Outer Ring Road, Banashankari." },
      { property: "og:title", content: "Our Story — Gulp Cocktails & Kitchen" },
      { property: "og:description", content: "Bangalore's most theatrical cocktail destination." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <Layout>
      <section className="pt-40 pb-24 px-6 max-w-4xl mx-auto text-center">
        <div className="eyebrow">— Cocktails & Kitchen</div>
        <h1 className="display mt-6 text-6xl md:text-8xl">
          Born from a love of<br/>
          <span className="italic text-gold">bold flavours.</span>
        </h1>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 md:px-10 grid md:grid-cols-2 gap-16 items-center pb-24">
        <div className="aspect-[4/5] overflow-hidden">
          <img src={espressoMartini} alt="Premium espresso martini — a symbol of Gulp's mixology craft" width={1200} height={1500} loading="lazy" className="h-full w-full object-cover" />
        </div>
        <div>
          <div className="eyebrow">— The Beginning</div>
          <h2 className="display mt-6 text-4xl md:text-5xl">From a simple idea to Bangalore's cocktail stage.</h2>
          <div className="mt-8 space-y-5 text-muted-foreground leading-relaxed">
            <p>
              Gulp was born from a conviction that a night out should be more than
              just food and drinks — it should be an experience. We wanted to create
              a space where every cocktail tells a story, every plate carries soul,
              and every evening becomes a memory worth sharing.
            </p>
            <p>
              From our home on Outer Ring Road in Banashankari, we've built a reputation
              for theatrical presentation, creative mixology, and a kitchen that fearlessly
              blends rich local Bangalore 'Naati' flavours with global culinary traditions.
              Today, Gulp is one of the most loved cocktail destinations in South Bangalore.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-card">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-24 grid md:grid-cols-3 gap-12">
          <Pillar n="01" t="The Craft" d="Every cocktail is a performance piece. From flaming skulls to branded coconut serves and smoke-infused botanicals — we push the boundaries of what a drink can be." />
          <Pillar n="02" t="The Kitchen" d="A soulful fusion of rich Mangalorean ghee roasts, tandoor-kissed starters, Continental mains, and Chinese favourites — all designed to complement the bar." />
          <Pillar n="03" t="The Stage" d="In-house DJ, golden lounge lighting, botanical walls, and velvet seating. Every element is curated to create the perfect atmosphere for an unforgettable night." />
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-24 grid md:grid-cols-[1.2fr_1fr] gap-16 items-center">
        <div className="aspect-[4/3] overflow-hidden">
          <img src={barInterior} alt="Gulp bar interior with the iconic G logo and illuminated bottle shelves" width={1600} height={1200} loading="lazy" className="h-full w-full object-cover" />
        </div>
        <div>
          <div className="eyebrow">— Milestones</div>
          <ul className="mt-8 divide-y divide-border border-t border-b border-border">
            {[
              ["2025", "Rated 4.2★ — 5,000+ reviews across platforms"],
              ["2025", "Featured on Curly Tales Bangalore"],
              ["2024", "In-house DJ residency launches"],
              ["2024", "Signature Ghost Rider goes viral on Instagram"],
              ["2023", "Gulp Cocktails & Kitchen opens — Banashankari"],
            ].map(([y, t], i) => (
              <li key={i} className="py-5 flex justify-between items-baseline gap-6">
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
