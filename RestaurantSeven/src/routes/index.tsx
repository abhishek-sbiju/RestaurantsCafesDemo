import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import heroCoconut from "@/assets/imagetwo.jpg";
import barInterior from "@/assets/2025-10-01.jpg";
import espressoMartini from "@/assets/imagethree.jpg";
import ghostRider from "@/assets/imageone.jpg";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gulp Cocktails & Kitchen — Theatrical Dining & Lounge in Bangalore" },
      { name: "description", content: "Experience dramatic tableside mixology, signature cocktails, local fusion Naati flavors, and vibrant DJ nights at Gulp Cocktails & Kitchen, Banashankari." },
      { property: "og:title", content: "Gulp Cocktails & Kitchen" },
      { property: "og:description", content: "Theatrical cocktails, creative mixology, and vibrant nightlife in Banashankari, Bangalore." },
    ],
  }),
  component: Index,
});

const heroSlides = [
  { src: ghostRider, alt: "The signature Ghost Rider skull cocktail", eyebrow: "Signature Serve", title: "The Ghost Rider" },
  { src: heroCoconut, alt: "Branded Gulp coconut cocktail", eyebrow: "Signature Serve", title: "Tropical Coconut" },
  { src: espressoMartini, alt: "Premium espresso martini", eyebrow: "Classic Craft", title: "Gold Espresso Martini" }
];

function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    const timer = setInterval(() => {
      setCurrent((c) => {
        setPrev(c);
        return (c + 1) % heroSlides.length;
      });
    }, 5000);
    return () => {
      clearInterval(timer);
      clearTimeout(t);
    };
  }, []);

  return (
    <>
      {heroSlides.map((slide, index) => {
        const isActive = index === current;
        const isPrev = index === prev && prev !== current;
        return (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-30" : isPrev ? "opacity-100 z-20" : "opacity-0 z-10"
            }`}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[7000ms] ease-out ${
                (isActive || isPrev) && mounted ? "scale-110" : "scale-100"
              }`}
            />
          </div>
        );
      })}
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-40 pointer-events-none" />
      <div className="absolute bottom-8 right-8 text-right z-50">
        {heroSlides.map((slide, index) => {
          const isActive = index === current;
          return (
            <div
              key={slide.title}
              className={`absolute bottom-0 right-0 w-max transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="eyebrow text-cream/70">{slide.eyebrow}</div>
              <div className="display text-2xl mt-1">{slide.title}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}

function Index() {
  return (
    <Layout>
      {/* SPLIT HERO */}
      <section className="relative min-h-screen flex flex-col md:grid md:grid-cols-[1.05fr_1fr]">
        <div className="relative flex px-6 md:px-12 lg:px-20 pt-24 md:pt-28 pb-10 md:pb-16 order-2 md:order-1 items-start">
          <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-emerald)" }} />
          <div className="fade-up max-w-xl w-full mt-2">
            <div className="eyebrow flex items-center">
              <span>Cocktails & Kitchen</span><span className="rule" /><span>Bangalore</span>
            </div>
            <h1 className="display mt-5 md:mt-6 text-5xl md:text-6xl lg:text-7xl leading-[1.05]">
              Audacious<br/>
              cocktails.<br/>
              <span className="italic text-gold">Unforgettable</span><br/>nights.
            </h1>
            <p className="mt-5 text-sm md:text-base text-muted-foreground leading-relaxed max-w-md">
              Bangalore's most theatrical cocktail kitchen & bar. Experience dramatic
              tableside spectacles, creative mixology, and a soulful fusion of local
              Naati flavors on Outer Ring Road, Banashankari.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/reservations" hash="booking-form" className="btn-gold">Reserve a Table</Link>
              <Link to="/menu" className="btn-ghost">View the Menu</Link>
            </div>

            <div className="mt-8 md:mt-10 grid grid-cols-3 gap-4 max-w-md border-t border-border pt-6">
              <Stat n="#1" l="Cocktail Spot in BSK" />
              <Stat n="15+" l="Theatrical Signatures" />
              <Stat n="DJ" l="Beats Nightly" />
            </div>
          </div>
        </div>

        <div className="relative min-h-[55vh] md:min-h-screen overflow-hidden bg-black order-1 md:order-2">
          <HeroSlideshow />
        </div>
      </section>

      {/* ETHOS */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-32">
        <div className="grid md:grid-cols-12 gap-12 items-end">
          <div className="md:col-span-5">
            <div className="eyebrow">— Our Ethos</div>
            <h2 className="display mt-6 text-5xl md:text-6xl">
              We don't just<br/>pour drinks.<br/>
              <span className="italic text-gold">We orchestrate</span><br/>spectacles.
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7 space-y-6 text-muted-foreground leading-relaxed">
            <p>
              From flaming chocolate skulls to smoke-infused botanical cocktails,
              every drink at Gulp is designed to be a complete sensory performance.
              We believe in visual theatre, creative presentation, and bold flavour
              experiences that linger long after the last sip.
            </p>
            <p>
              Our kitchen elevates the night with an eclectic menu that beautifully
              marries rich, rustic local Bangalore 'Naati' flavours with contemporary
              global plates — from tandoor-kissed starters to delicate Continental mains.
            </p>
            <Link to="/about" className="inline-flex items-center gap-3 text-gold link-underline text-sm tracking-[0.2em] uppercase">
              Read our story →
            </Link>
          </div>
        </div>
      </section>

      {/* THE SPACE — real bar interior */}
      <section className="grid md:grid-cols-2">
        <div className="relative aspect-[4/5] md:aspect-auto">
          <img src={barInterior} alt="Gulp Cocktails & Kitchen bar interior with illuminated capsule bottle shelves, the iconic G logo, gold chevron tile bar front and teal velvet seating" width={1600} height={1200} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div className="bg-card flex items-center px-8 md:px-16 lg:px-24 py-20">
          <div className="max-w-md">
            <div className="eyebrow">— The Space</div>
            <h3 className="display mt-6 text-4xl md:text-5xl">
              Where gold<br/>
              meets <span className="italic text-gold">velvet.</span>
            </h3>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              A warm, glamorous sanctuary featuring illuminated capsule bar shelves,
              gold-toned chevron tile accents, plush teal velvet seating, and the
              iconic glowing "G" centerpiece. Backed by our resident DJ, Gulp provides
              the perfect setting for celebrations, group parties, and unforgettable nights.
            </p>
            <Link to="/reservations" hash="booking-form" className="btn-gold mt-10">Reserve a Table</Link>
          </div>
        </div>
      </section>

      {/* SIGNATURE COCKTAILS */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-32">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
          <div>
            <div className="eyebrow">— Signatures</div>
            <h2 className="display mt-4 text-5xl md:text-6xl">The showstoppers</h2>
          </div>
          <Link to="/menu" className="text-sm tracking-[0.22em] uppercase text-gold link-underline">
            Full Menu →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-border">
          <Course
            n="01"
            name="Ghost Rider"
            desc="A crystal skull glass filled with rich chocolate cocktail, topped with crushed ice and cocoa powder dusted tableside. Dark rum, bitter chocolate, aromatic bitters."
          />
          <Course
            n="02"
            name="Tropical Coconut"
            desc="Signature serve in a branded whole coconut shell, garnished with fresh bougainvillea, dried pineapple, and tropical rum blended with coconut cream."
          />
          <Course
            n="03"
            name="Gold Espresso Martini"
            desc="Velvety smooth espresso meets premium vodka, finished with a perfect golden crema. Served in a crystal coupe alongside gold barware."
          />
        </div>
      </section>

      {/* MIXOLOGY QUOTE — espresso martini editorial */}
      <section className="grid md:grid-cols-[1fr_1.1fr] items-stretch">
        <div className="bg-secondary flex items-center px-8 md:px-16 lg:px-24 py-24">
          <div className="max-w-md">
            <div className="eyebrow">— The Art of Mixology</div>
            <blockquote className="display mt-8 text-3xl md:text-4xl leading-tight italic">
              "A great cocktail is a complete sensory narrative — the colours,
              the fire, the aroma, and the beats all speak the same language."
            </blockquote>
            <div className="mt-10 text-sm tracking-[0.22em] uppercase text-muted-foreground">
              Gulp Mixology Team · Liquid Gastronomy
            </div>
          </div>
        </div>
        <div className="relative aspect-[4/5] md:aspect-auto">
          <img src={espressoMartini} alt="Premium espresso martini in a crystal coupe glass with perfect golden crema, alongside gold jigger and mixing glass on marble" width={1200} height={1500} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </section>

      {/* PRAISE */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-32 text-center">
        <div className="eyebrow">— Praise</div>
        <div className="mt-10 grid md:grid-cols-3 gap-12 text-muted-foreground">
          <Quote q="The most aesthetic and theatrical cocktails in Banashankari." s="Curly Tales" />
          <Quote q="Incredible lounge energy, great music, and highly Instagram-worthy presentation." s="LBB Bangalore" />
          <Quote q="A phenomenal fusion of Naati soul food and creative liquid alchemy." s="Zomato Gold Reviewer" />
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-background min-h-[480px]">
        {/* Bar interior — subtle blur, not killed */}
        <img
          src={barInterior}
          alt="Gulp Cocktails bar interior"
          width={1600}
          height={900}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-center scale-105 opacity-20 blur-sm ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background h-32 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-l from-background via-transparent to-background w-32 left-auto right-0 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background w-32 z-10 pointer-events-none" />
        <div className="relative z-20 mx-auto max-w-3xl px-6 py-32 md:py-44 text-center">
          <div className="eyebrow text-gold/80">— Reservations</div>
          <h2 className="display mt-6 text-5xl md:text-7xl text-white">
            Join us for a<br/><span className="italic text-gold">theatrical night.</span>
          </h2>
          <p className="mt-6 text-white/70">Open daily · 12:00 PM to 12:00 AM · Banashankari, Bangalore</p>
          <Link to="/reservations" hash="booking-form" className="btn-gold mt-10">Reserve a Table</Link>
        </div>
      </section>
    </Layout>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="display text-3xl text-gold">{n}</div>
      <div className="mt-2 text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground">{l}</div>
    </div>
  );
}

function Course({ n, name, desc }: { n: string; name: string; desc: string }) {
  return (
    <article className="bg-background p-10 md:p-12 transition-colors hover:bg-card group">
      <div className="text-gold text-sm tracking-[0.3em]">{n}</div>
      <h3 className="display mt-6 text-3xl md:text-4xl group-hover:text-gold transition-colors">{name}</h3>
      <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </article>
  );
}

function Quote({ q, s }: { q: string; s: string }) {
  return (
    <div>
      <p className="display italic text-2xl text-foreground">"{q}"</p>
      <div className="mt-4 text-[0.65rem] tracking-[0.3em] uppercase text-gold">{s}</div>
    </div>
  );
}
