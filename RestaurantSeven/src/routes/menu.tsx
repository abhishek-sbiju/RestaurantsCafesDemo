import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Gulp Cocktails & Kitchen" },
      { name: "description", content: "Explore Gulp's signature cocktails, theatrical serves, and a multi-cuisine kitchen menu blending Naati, Continental, Chinese, and North Indian flavours." },
      { property: "og:title", content: "Menu — Gulp Cocktails & Kitchen" },
      { property: "og:description", content: "Signature cocktails and multi-cuisine kitchen menu." },
    ],
  }),
  component: MenuPage,
});

const signatureCocktails = [
  { n: "I", name: "Ghost Rider", desc: "Dark rum, bitter chocolate, crushed ice, cocoa dust — served in a crystal skull, set ablaze tableside", tag: "Theatrical" },
  { n: "II", name: "Tropical Coconut", desc: "Branded whole-coconut serve with rum, coconut cream, bougainvillea, fresh pineapple garnish", tag: "Signature" },
  { n: "III", name: "Gold Espresso Martini", desc: "Premium vodka, fresh espresso, Kahlúa, golden crema — served in a crystal coupe", tag: "Classic" },
  { n: "IV", name: "Tubby Teddy", desc: "Tropical pineapple-coconut rum, edible gummy bear, signature velvet foam bubbles in a miniature bathtub", tag: "Instagrammable" },
  { n: "V", name: "Smoky Old Fashioned", desc: "Bourbon, aromatic bitters, smoked rosemary, demerara — tableside smoke infusion", tag: "Premium" },
  { n: "VI", name: "Garden Spritz", desc: "Gin, elderflower, cucumber, tonic, fresh basil — light, botanical, refreshing", tag: "Botanical" },
];

const kitchenHighlights = [
  { cat: "Naati & Local", items: ["Ghee Roast Prawns", "Mangalorean Fish Fry", "Mutton Sukka", "Ragi Mudde"] },
  { cat: "Tandoor & Grill", items: ["Stuffed Herb Mushroom Tikka", "Tandoori Chicken", "Paneer Tikka", "Seekh Kebabs"] },
  { cat: "Continental", items: ["Aglio Olio", "Grilled Chicken Steak", "Mushroom Risotto", "Fish & Chips"] },
  { cat: "Chinese & Asian", items: ["Chilli Chicken", "Dragon Chicken", "Veg Manchurian", "Hakka Noodles"] },
];

function MenuPage() {
  return (
    <Layout>
      <section className="pt-40 pb-20 text-center px-6">
        <div className="eyebrow">— The Menu</div>
        <h1 className="display mt-6 text-6xl md:text-8xl">
          Sip. Savour.<br/>
          <span className="italic text-gold">Spectacle.</span>
        </h1>
        <p className="mt-8 max-w-xl mx-auto text-muted-foreground leading-relaxed">
          A curated journey through theatrical cocktails and soulful multi-cuisine plates.
          Every serve is crafted to excite the eyes before the palate.
        </p>
      </section>

      {/* SIGNATURE COCKTAILS */}
      <section className="mx-auto max-w-3xl px-6 pb-20">
        <div className="eyebrow mb-8">— Signature Cocktails</div>
        <ul className="divide-y divide-border border-t border-b border-border">
          {signatureCocktails.map((c) => (
            <li key={c.n} className="py-10 grid grid-cols-[3rem_1fr] md:grid-cols-[4rem_1fr_auto] gap-6 items-baseline">
              <div className="display text-3xl text-gold">{c.n}</div>
              <div>
                <h3 className="display text-3xl md:text-4xl">{c.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
              <div className="hidden md:block text-xs tracking-[0.25em] uppercase text-gold-soft">
                {c.tag}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* KITCHEN HIGHLIGHTS */}
      <section className="mx-auto max-w-3xl px-6 pb-32">
        <div className="eyebrow mb-8">— From the Kitchen</div>
        <div className="grid md:grid-cols-2 gap-10">
          {kitchenHighlights.map((cat) => (
            <div key={cat.cat} className="bg-card p-8 border border-border">
              <h3 className="display text-2xl text-gold mb-6">{cat.cat}</h3>
              <ul className="space-y-3">
                {cat.items.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground mb-6">
            Full menu available at the restaurant. Prices vary by season.
          </p>
          <Link to="/reservations" className="btn-gold">Reserve a Table</Link>
        </div>
      </section>
    </Layout>
  );
}
