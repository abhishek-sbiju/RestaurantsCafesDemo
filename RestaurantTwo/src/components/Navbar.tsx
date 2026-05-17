import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = ["Home", "Menu", "About", "Contact"];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 py-5">
      <div className="flex items-center gap-2">
        <span className="text-primary text-2xl font-heading font-bold">◎</span>
        <span className="text-foreground text-xl font-heading font-semibold tracking-wide">Demo</span>
      </div>

      <ul className="hidden md:flex items-center gap-8 text-sm tracking-widest uppercase font-body">
        {navLinks.map((link) => (
          <li key={link}>
            <a href={`#${link.toLowerCase()}`} className="text-foreground/80 hover:text-primary transition-colors">
              {link}
            </a>
          </li>
        ))}
      </ul>

      <a
        href="tel:+18001234567"
        className="hidden md:inline-block bg-primary text-primary-foreground px-5 py-2 text-sm font-semibold rounded-sm hover:brightness-110 transition"
      >
        +1 800 123 4567
      </a>

      <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {open && (
        <div className="absolute top-full left-0 w-full bg-background/95 backdrop-blur-sm md:hidden flex flex-col items-center gap-4 py-6">
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-foreground/80 hover:text-primary text-sm uppercase tracking-widest" onClick={() => setOpen(false)}>
              {link}
            </a>
          ))}
          <a href="tel:+18001234567" className="bg-primary text-primary-foreground px-5 py-2 text-sm font-semibold rounded-sm">
            +1 800 123 4567
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
