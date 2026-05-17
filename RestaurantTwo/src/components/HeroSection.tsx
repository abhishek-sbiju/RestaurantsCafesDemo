import heroBg from "@/assets/hero-bg.jpg";
import { ChevronDown } from "lucide-react";

const HeroSection = () => (
  <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
    <img src={heroBg} alt="Gourmet food" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
    <div className="absolute inset-0 bg-background/60" />

    <div className="relative z-10 text-center max-w-2xl px-6 animate-fade-in-up">
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight text-foreground">
        Life's Too Short For Boring Food
      </h1>
      <p className="mt-6 text-muted-foreground text-base md:text-lg font-body max-w-md mx-auto">
        A culinary journey crafted with passion, fresh ingredients, and timeless recipes.
      </p>
    </div>

    <a href="#info" className="absolute bottom-8 z-10 text-primary animate-bounce">
      <ChevronDown size={32} />
    </a>
  </section>
);

export default HeroSection;
