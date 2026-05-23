import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border mt-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="display text-3xl">
            Gul<span className="text-gold">p</span>
          </div>
          <p className="mt-2 text-xs tracking-[0.2em] uppercase text-muted-foreground">
            Cocktails & Kitchen
          </p>
          <p className="mt-4 text-sm text-muted-foreground max-w-sm leading-relaxed">
            Bangalore's theatrical cocktail destination. Dramatic tableside spectacles,
            creative mixology, and a soulful fusion of local Naati flavors and global plates.
          </p>
        </div>
        <div>
          <div className="eyebrow mb-4">Visit</div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            16, Outer Ring Road<br/>
            Beside Domino's, 3rd Phase<br/>
            Banashankari, Bangalore 560085
          </p>
        </div>
        <div>
          <div className="eyebrow mb-4">Hours</div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Open Daily<br/>
            12:00 PM – 12:00 AM<br/>
            <a href="tel:+919845967899" className="text-gold link-underline mt-2 inline-block">
              +91 98459 67899
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Gulp Cocktails & Kitchen. All rights reserved.</div>
          <div className="flex gap-6">
            <Link to="/menu" className="link-underline">Menu</Link>
            <Link to="/about" className="link-underline">Story</Link>
            <Link to="/reservations" className="link-underline">Reservations</Link>
            <a href="https://instagram.com/gulpcocktails_blr" target="_blank" rel="noopener noreferrer" className="link-underline">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
