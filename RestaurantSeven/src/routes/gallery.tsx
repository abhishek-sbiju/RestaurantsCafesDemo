import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { useState } from "react";
import ghostRider from "@/assets/imageone.jpg";
import heroCoconut from "@/assets/imagetwo.jpg";
import espressoMartini from "@/assets/imagethree.jpg";
import barInterior from "@/assets/2025-10-01.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Gulp Cocktails & Kitchen" },
      { name: "description", content: "A visual tour of Gulp Cocktails & Kitchen — signature serves, the bar interior, and theatrical tableside moments." },
    ],
  }),
  component: Gallery,
});

const photos = [
  { src: barInterior,     alt: "The Gulp bar — gold capsule shelves, teal velvet seating and the iconic G neon sign",   label: "The Space",            category: "Interior" },
  { src: ghostRider,      alt: "The Ghost Rider — crystal skull cocktail with cocoa dust dusted tableside",             label: "The Ghost Rider",       category: "Cocktails" },
  { src: heroCoconut,     alt: "Tropical Coconut serve — branded coconut with bougainvillea and fresh pineapple",       label: "Tropical Coconut",      category: "Cocktails" },
  { src: espressoMartini, alt: "Gold Espresso Martini — crystal coupe with perfect crema on black marble",             label: "Gold Espresso Martini", category: "Cocktails" },
];

function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  function prev() { setActive((p) => (p === null ? null : (p - 1 + photos.length) % photos.length)); }
  function next() { setActive((p) => (p === null ? null : (p + 1) % photos.length)); }

  return (
    <Layout>
      <section className="pt-40 pb-16 px-6 text-center max-w-3xl mx-auto">
        <div className="eyebrow">— Gallery</div>
        <h1 className="display mt-6 text-6xl md:text-7xl">
          Every frame,<br/>
          <span className="italic text-gold">a story.</span>
        </h1>
        <p className="mt-6 text-muted-foreground leading-relaxed">
          A visual taste of what waits for you at Gulp — theatrical serves, a stunning bar, and moments
          that are as beautiful to photograph as they are to experience.
        </p>
      </section>

      {/* Masonry grid */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 pb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] gap-3">
          {/* Large feature tile */}
          <div
            className="relative overflow-hidden cursor-zoom-in group lg:row-span-2 aspect-[4/5] lg:aspect-auto"
            onClick={() => setActive(0)}
          >
            <img src={photos[0].src} alt={photos[0].alt} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
            <Chip label={photos[0].label} category={photos[0].category} />
          </div>

          {/* Remaining tiles */}
          {photos.slice(1).map((p, i) => (
            <div
              key={p.label}
              className="relative overflow-hidden cursor-zoom-in group aspect-[4/3]"
              onClick={() => setActive(i + 1)}
            >
              <img src={p.src} alt={p.alt} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
              <Chip label={p.label} category={p.category} />
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs tracking-[0.25em] uppercase text-muted-foreground">
          Follow us{" "}
          <a href="https://www.instagram.com/gulpcocktails_blr/" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
            @gulpcocktails_blr
          </a>{" "}
          for more
        </p>
      </section>

      {/* Lightbox */}
      {active !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          {/* Prev */}
          <button
            className="absolute left-4 md:left-8 text-white/70 hover:text-gold text-4xl z-10 transition-colors"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous"
          >
            ‹
          </button>

          <div className="relative max-h-[90vh] max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={photos[active].src}
              alt={photos[active].alt}
              className="max-h-[85vh] w-auto mx-auto object-contain rounded-sm"
            />
            <div className="mt-4 text-center">
              <div className="text-white display text-xl">{photos[active].label}</div>
              <div className="mt-1 text-[0.65rem] tracking-[0.25em] uppercase text-gold/70">{photos[active].category}</div>
            </div>
          </div>

          {/* Next */}
          <button
            className="absolute right-4 md:right-8 text-white/70 hover:text-gold text-4xl z-10 transition-colors"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next"
          >
            ›
          </button>

          {/* Close */}
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-gold text-2xl z-10 transition-colors"
            onClick={() => setActive(null)}
            aria-label="Close"
          >
            ✕
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {photos.map((_, i) => (
              <button
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${i === active ? "bg-gold" : "bg-white/30"}`}
                onClick={(e) => { e.stopPropagation(); setActive(i); }}
              />
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
}

function Chip({ label, category }: { label: string; category: string }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
      <div className="text-[0.6rem] tracking-[0.25em] uppercase text-gold/80">{category}</div>
      <div className="text-white text-sm font-medium mt-0.5">{label}</div>
    </div>
  );
}
