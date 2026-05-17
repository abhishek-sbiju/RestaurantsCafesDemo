import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Emory J Hobel",
    text: "Dining at Luxury was an unforgettable experience! From the moment we stepped in, we were captivated by the elegant ambiance and warm hospitality.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Derek Gehl",
    text: "The attention to detail in every dish was astounding – the flavors were exquisite, and the presentation was like a work.",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    name: "Josh Koop",
    text: "From the moment we stepped in, we were captivated by the elegant ambiance and warm hospitality.",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  },
];

const TestimonialsSection = () => (
  <section id="testimonial" className="py-20 bg-background">
    <div className="container mx-auto px-6 text-center">
      <h2 className="font-heading text-3xl md:text-5xl italic mb-3 text-foreground">
        Exquisite Experiences,<br />Cherished Moments
      </h2>
      <p className="font-body text-sm text-muted-foreground max-w-lg mx-auto mb-14">
        The attention to detail in every dish was astounding – the flavors were exquisite, and the presentation was like a work.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t) => (
          <div key={t.name} className="bg-muted rounded-sm p-8 flex flex-col items-center text-center">
            <img src={t.avatar} alt={t.name} width={72} height={72} loading="lazy" className="w-16 h-16 rounded-full object-cover mb-4 -mt-12 border-4 border-background" />
            <h4 className="font-heading text-xl italic text-foreground mb-3">{t.name}</h4>
            <p className="font-body text-xs text-muted-foreground leading-relaxed mb-4">{t.text}</p>
            <div className="flex gap-0.5 text-primary">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
