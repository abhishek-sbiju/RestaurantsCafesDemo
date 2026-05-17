import { Clock, BookOpen, UtensilsCrossed } from "lucide-react";

const cards = [
  { icon: Clock, title: "Work Hours", desc: "Mon – Sun / 12 am – 12pm" },
  { icon: BookOpen, title: "Book a Table", desc: "(850) 324-7023" },
  { icon: UtensilsCrossed, title: "Best Menu", desc: "Taste the difference" },
];

const InfoCards = () => (
  <section id="info" className="relative z-20 -mt-16 px-6 md:px-12">
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-px bg-border rounded-sm overflow-hidden">
      {cards.map(({ icon: Icon, title, desc }) => (
        <div key={title} className="bg-card flex flex-col items-center py-10 px-6 text-center">
          <Icon className="text-primary mb-4" size={28} strokeWidth={1.5} />
          <h3 className="font-heading text-lg font-semibold text-foreground">{title}</h3>
          <p className="text-muted-foreground text-sm mt-1 font-body">{desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default InfoCards;
