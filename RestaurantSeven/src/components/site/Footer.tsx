import { Link } from "@tanstack/react-router";

// SVG Social Icons
function IconInstagram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

const hours = [
  { label: "Mon – Thu", time: "12:00 PM – 11:30 PM" },
  { label: "Fri – Sun", time: "12:00 PM – 1:00 AM" },
];


export function Footer() {
  return (
    <footer className="border-t border-border mt-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 grid gap-12 md:grid-cols-[2fr_1.2fr_1.4fr_1fr]">

        {/* Brand */}
        <div>
          <div className="display text-3xl">
            Gul<span className="text-gold">p</span>
          </div>
          <p className="mt-1 text-xs tracking-[0.2em] uppercase text-muted-foreground">
            Pub · Bar · Family Restaurant
          </p>
          <p className="mt-5 text-sm text-muted-foreground max-w-xs leading-relaxed">
            Bangalore's theatrical cocktail destination. Dramatic tableside spectacles,
            creative mixology, Naati soul food and DJ-led nights — all under one roof.
          </p>

          {/* Social Icons */}
          <div className="mt-6 flex gap-4">
            <a
              href="https://www.instagram.com/gulpcocktails_blr/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-muted-foreground hover:text-gold transition-colors"
            >
              <IconInstagram />
            </a>
            <a
              href="https://www.facebook.com/people/Gulp-Pub-Restaurant/61578465731996/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-muted-foreground hover:text-gold transition-colors"
            >
              <IconFacebook />
            </a>
            <a
              href="https://www.linkedin.com/in/gulp-pub-bar-restaurant-4880453b8/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted-foreground hover:text-gold transition-colors"
            >
              <IconLinkedIn />
            </a>
          </div>
        </div>

        {/* Navigate */}
        <div>
          <div className="eyebrow mb-5">Navigate</div>
          <nav className="flex flex-col gap-3 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <Link to="/menu" className="hover:text-gold transition-colors">Menu</Link>
            <Link to="/about" className="hover:text-gold transition-colors">Story</Link>
            <Link to="/reservations" className="hover:text-gold transition-colors">Reservations</Link>
          </nav>
        </div>

        {/* Hours */}
        <div>
          <div className="eyebrow mb-5">Hours</div>
          <div className="space-y-3">
            {hours.map((h) => (
              <div key={h.label} className="text-xs text-muted-foreground">
                <div className="text-foreground/80 font-medium mb-0.5">{h.label}</div>
                <div>{h.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <div className="eyebrow mb-5">Contact</div>
          <div className="space-y-4 text-sm text-muted-foreground">
            <div>
              <div className="text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground/60 mb-1">Phone</div>
              <a href="tel:+919845967899" className="text-gold hover:underline">
                +91 98459 67899
              </a>
            </div>
            <div>
              <div className="text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground/60 mb-1">Address</div>
              <address className="not-italic leading-relaxed text-xs">
                16, Outer Ring Road<br/>
                3rd Phase, Banashankari<br/>
                Beside Domino's Pizza<br/>
                Bengaluru – 560085
              </address>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Gulp Cocktails & Kitchen. All rights reserved.</div>
          <div className="flex gap-5 flex-wrap justify-center">
            <a href="/privacy-policy" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="/regulations" className="hover:text-gold transition-colors">Regulations</a>
            <a href="https://www.instagram.com/gulpcocktails_blr/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">Instagram</a>
            <a href="https://www.facebook.com/people/Gulp-Pub-Restaurant/61578465731996/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
