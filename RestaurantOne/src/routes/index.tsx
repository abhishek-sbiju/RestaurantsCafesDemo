import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { useEffect, useState } from "react";
import heroDish from "@/assets/hero-dish.jpg";
import interior from "@/assets/interior.jpg";
import chef from "@/assets/chef.jpg";
import dish2 from "@/assets/dish-2.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Verdé — Botanical Fine Dining in Paris" },
      { name: "description", content: "A seasonal tasting menu rooted in the garden. Verdé is an intimate fine-dining experience in the heart of Paris." },
      { property: "og:title", content: "Verdé — Botanical Fine Dining" },
      { property: "og:description", content: "A seasonal tasting menu rooted in the garden." },
    ],
  }),
  component: Index,
});

const heroSlides = [
  {
    src: heroDish,
    alt: "Plated tasting course on emerald linen with gold cutlery",
    eyebrow: "Tonight's Opening",
    title: "Smoked beetroot · Hazelnut · Sorrel",
  },
  {
    src: interior,
    alt: "Verdé dining room with emerald banquettes",
    eyebrow: "The Room",
    title: "Twenty-two seats. One conversation.",
  },
  {
    src: chef,
    alt: "Chef Élise Marchand",
    eyebrow: "Chef Patron",
    title: "Élise Marchand",
  },
  {
    src: dish2,
    alt: "Floral dessert",
    eyebrow: "Signatures",
    title: "A taste of the season",
  },
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
      <section className="relative min-h-screen grid md:grid-cols-[1.05fr_1fr]">
        <div className="relative flex items-center px-6 md:px-16 lg:px-24 pt-32 pb-20">
          <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-emerald)" }} />
          <div className="fade-up max-w-xl">
            <div className="eyebrow flex items-center">
              <span>Est. 2014</span><span className="rule" /><span>Paris IV</span>
            </div>
            <h1 className="display mt-8 text-6xl md:text-7xl lg:text-8xl">
              Of the<br/>
              <span className="italic text-gold">garden,</span><br/>
              for the table.
            </h1>
            <p className="mt-8 text-base md:text-lg text-muted-foreground leading-relaxed max-w-md">
              A seven-course botanical tasting menu by Chef Élise Marchand,
              composed each morning from the day's harvest.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/reservations" hash="booking-form" className="btn-gold">Reserve a Table</Link>
              <Link to="/menu" className="btn-ghost">View the Menu</Link>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-6 max-w-md border-t border-border pt-8">
              <Stat n="II" l="Michelin Stars" />
              <Stat n="7" l="Courses Nightly" />
              <Stat n="22" l="Seats Only" />
            </div>
          </div>
        </div>

        <div className="relative min-h-[60vh] md:min-h-screen overflow-hidden">
          <HeroSlideshow />
        </div>
      </section>

      {/* ETHOS */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-32">
        <div className="grid md:grid-cols-12 gap-12 items-end">
          <div className="md:col-span-5">
            <div className="eyebrow">— Our Ethos</div>
            <h2 className="display mt-6 text-5xl md:text-6xl">
              We don't write<br/>menus.<br/>
              <span className="italic text-gold">We listen</span><br/>to seasons.
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7 space-y-6 text-muted-foreground leading-relaxed">
            <p>
              Every plate begins at dawn in our biodynamic garden in Île-de-France.
              What is ready is what is served. Nothing more, nothing less.
            </p>
            <p>
              The result is a quiet, deliberate cuisine — built on root vegetables,
              cold-water fish, wild herbs, and slow ferments. A cooking that
              prefers restraint to spectacle.
            </p>
            <Link to="/about" className="inline-flex items-center gap-3 text-gold link-underline text-sm tracking-[0.2em] uppercase">
              Read the story →
            </Link>
          </div>
        </div>
      </section>

      {/* IMAGE FEATURE */}
      <section className="grid md:grid-cols-2">
        <div className="relative aspect-[4/5] md:aspect-auto">
          <img src={interior} alt="Verdé dining room with emerald banquettes" width={1600} height={1200} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div className="bg-card flex items-center px-8 md:px-16 lg:px-24 py-20">
          <div className="max-w-md">
            <div className="eyebrow">— The Room</div>
            <h3 className="display mt-6 text-4xl md:text-5xl">
              Twenty-two seats.<br/>
              <span className="italic text-gold">One conversation.</span>
            </h3>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              An emerald velvet banquette curves around the open kitchen.
              Candlelight. Brass. The quiet clatter of copper. A room designed
              to disappear so the food can speak.
            </p>
            <Link to="/reservations" hash="booking-form" className="btn-gold mt-10">Book the Room</Link>
          </div>
        </div>
      </section>

      {/* SIGNATURE COURSES */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-32">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
          <div>
            <div className="eyebrow">— Signatures</div>
            <h2 className="display mt-4 text-5xl md:text-6xl">A taste of the season</h2>
          </div>
          <Link to="/menu" className="text-sm tracking-[0.22em] uppercase text-gold link-underline">
            Full Menu →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-border">
          <Course
            n="01"
            name="Smoked Beetroot"
            desc="Burnt hay · aged hazelnut · sheep's milk · sorrel oil"
          />
          <Course
            n="02"
            name="Turbot · Pine"
            desc="Line-caught Brittany turbot, douglas fir butter, salt-baked celeriac"
          />
          <Course
            n="03"
            name="Black Honey"
            desc="Buckwheat ice cream, charred plum, bee pollen, beeswax tuile"
          />
        </div>
      </section>

      {/* CHEF QUOTE */}
      <section className="grid md:grid-cols-[1fr_1.1fr] items-stretch">
        <div className="bg-secondary flex items-center px-8 md:px-16 lg:px-24 py-24">
          <div className="max-w-md">
            <div className="eyebrow">— Chef Élise Marchand</div>
            <blockquote className="display mt-8 text-3xl md:text-4xl leading-tight italic">
              "I'd rather serve one quiet, honest carrot than ten loud things
              pretending to be cuisine."
            </blockquote>
            <div className="mt-10 text-sm tracking-[0.22em] uppercase text-muted-foreground">
              Élise Marchand · Chef Patron
            </div>
          </div>
        </div>
        <div className="relative aspect-[4/5] md:aspect-auto">
          <img src={chef} alt="Chef Élise Marchand plating with tweezers" width={1200} height={1500} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </section>

      {/* PRESS */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-32 text-center">
        <div className="eyebrow">— Praise</div>
        <div className="mt-10 grid md:grid-cols-3 gap-12 text-muted-foreground">
          <Quote q="Whisper-quiet brilliance." s="Le Monde" />
          <Quote q="The most considered cooking in Paris this year." s="The World's 50 Best" />
          <Quote q="A garden poured onto a plate." s="Vogue France" />
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-background">
        <img src={dish2} alt="Floral dessert" width={1200} height={1500} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-20 blur-sm ken-burns" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background h-32 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-l from-background via-transparent to-background w-32 left-auto right-0 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background w-32 z-10 pointer-events-none" />
        <div className="relative z-20 mx-auto max-w-3xl px-6 py-32 md:py-48 text-center">
          <div className="eyebrow">— Reservations</div>
          <h2 className="display mt-6 text-5xl md:text-7xl">
            Join us for an<br/><span className="italic text-gold">unhurried evening.</span>
          </h2>
          <p className="mt-6 text-muted-foreground">Two seatings nightly · Tuesday through Saturday</p>
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
