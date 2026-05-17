import aboutFood from "@/assets/about-food.jpg";
import { Truck, ChefHat } from "lucide-react";

const AboutSection = () => (
  <section id="about" className="py-24 px-6 md:px-12">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div className="overflow-hidden rounded-sm">
        <img src={aboutFood} alt="Artisan food" className="w-full h-[500px] object-cover" loading="lazy" width={800} height={1000} />
      </div>

      <div>
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground leading-tight">
          The Best Place To Eat Is Where The Chef Loves To Cook
        </h2>
        <p className="mt-6 text-muted-foreground font-body leading-relaxed">
          At Demo, every dish is a labour of love. We source the finest seasonal ingredients and transform them into memorable culinary experiences. Whether you dine in or take away, you'll taste the passion in every bite.
        </p>

        <div className="flex gap-4 mt-8">
          <a href="#" className="flex items-center gap-2 bg-card border border-border px-6 py-3 rounded-sm text-sm font-body font-medium text-foreground hover:border-primary transition">
            <ChefHat size={18} className="text-primary" />
            Take away
          </a>
          <a href="#" className="flex items-center gap-2 bg-card border border-border px-6 py-3 rounded-sm text-sm font-body font-medium text-foreground hover:border-primary transition">
            <Truck size={18} className="text-primary" />
            Home delivery
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
