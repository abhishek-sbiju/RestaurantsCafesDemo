import { Facebook, Linkedin, Twitter } from "lucide-react";

const footerLinks = ["About Us", "Food Menu", "Ambiance", "Testimonial"];

const Footer = () => (
  <footer className="bg-secondary text-secondary-foreground pt-16 pb-8">
    <div className="container mx-auto px-6">
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <svg width="40" height="28" viewBox="0 0 40 28" fill="none" className="text-secondary-foreground">
          <path d="M5 24C8 14 14 6 20 6C26 6 32 14 35 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
          <path d="M10 24C12 18 16 12 20 12C24 12 28 18 30 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Links */}
      <div className="flex flex-wrap justify-center gap-8 mb-12">
        {footerLinks.map((link) => (
          <a key={link} href={`#${link.toLowerCase().replace(" ", "-")}`} className="font-heading text-lg italic text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
            {link}
          </a>
        ))}
      </div>

      <div className="border-t border-secondary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-body text-secondary-foreground/60">
        <p>336 East Shewrapara, Mirpur,<br className="md:hidden" /> Dhaka, Bangladesh</p>
        <p>+880 1314147350</p>
        <p>hello@fibostudio.com</p>
        <div className="flex gap-4">
          <Facebook size={16} className="hover:text-secondary-foreground transition-colors cursor-pointer" />
          <Linkedin size={16} className="hover:text-secondary-foreground transition-colors cursor-pointer" />
          <Twitter size={16} className="hover:text-secondary-foreground transition-colors cursor-pointer" />
        </div>
      </div>

      <p className="text-center text-xs font-body text-secondary-foreground/40 mt-6">
        2025 Fibo Studio. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
