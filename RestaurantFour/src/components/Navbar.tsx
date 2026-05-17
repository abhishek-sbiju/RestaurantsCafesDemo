import { useState } from "react";

const navLinks = ["About Us", "Food Menu", "Ambiance", "Testimonial"];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="flex items-center gap-1">
          <svg width="40" height="28" viewBox="0 0 40 28" fill="none" className="text-primary">
            <path d="M5 24C8 14 14 6 20 6C26 6 32 14 35 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            <path d="M10 24C12 18 16 12 20 12C24 12 28 18 30 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase().replace(" ", "-")}`} className="text-sm font-body tracking-wide text-foreground/80 hover:text-primary transition-colors">
              {link}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a href="#reservation" className="hidden md:inline-block border border-foreground/30 rounded-full px-6 py-2 text-sm font-body hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
          Reservation
        </a>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background border-t border-border px-6 pb-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase().replace(" ", "-")}`} onClick={() => setOpen(false)} className="text-sm font-body py-2 text-foreground/80">
              {link}
            </a>
          ))}
          <a href="#reservation" className="border border-foreground/30 rounded-full px-6 py-2 text-sm font-body text-center">Reservation</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
