import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border mt-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="display text-3xl">
            Verd<span className="text-gold">é</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-sm leading-relaxed">
            A botanical tasting experience set in the heart of the old quarter.
            Seasonal, locally sourced, quietly extraordinary.
          </p>
        </div>
        <div>
          <div className="eyebrow mb-4">Visit</div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            14 Rue des Jardins<br/>
            75004 Paris<br/>
            +33 1 42 00 00 00
          </p>
        </div>
        <div>
          <div className="eyebrow mb-4">Hours</div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Tue – Sat<br/>
            Dinner · 18:30 – 22:30<br/>
            Closed Sun & Mon
          </p>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Verdé. All rights reserved.</div>
          <div className="flex gap-6">
            <Link to="/menu" className="link-underline">Menu</Link>
            <Link to="/about" className="link-underline">Story</Link>
            <Link to="/reservations" className="link-underline">Reservations</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
