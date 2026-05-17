import { useState } from "react";
import foodBeef from "@/assets/food-beef.jpg";
import foodChicken from "@/assets/food-chicken.jpg";
import foodVegetable from "@/assets/food-vegetable.jpg";
import foodSoup from "@/assets/food-soup.jpg";

const categories = ["Pakistani", "Mexican", "Spanish", "Turkish", "Bengali"];

const dishes = [
  { name: "Beef Cuisine", desc: "A refined dining experience where elegance blends with.", img: foodBeef },
  { name: "Chicken Cuisine", desc: "A refined dining experience where elegance blends.", img: foodChicken },
  { name: "Vegetable Cuisine", desc: "A refined dining experience where elegance blends.", img: foodVegetable },
  { name: "Corn Soup", desc: "A refined dining experience where elegance blends.", img: foodSoup },
];

const MenuSection = () => {
  const [active, setActive] = useState("Pakistani");

  return (
    <section id="food-menu" className="py-20 bg-muted">
      <div className="container mx-auto px-6 text-center">
        <h2 className="font-heading text-4xl md:text-5xl italic text-foreground mb-4">Our signature menu</h2>
        <p className="font-body text-muted-foreground max-w-xl mx-auto mb-8 text-sm">
          A refined dining experience where elegance blends with unforgettable tastes. A refined dining experience where elegance blends with unforgettable tastes.
        </p>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-body transition-colors ${
                active === cat
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-background text-foreground/70 hover:bg-background/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dishes grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dishes.map((dish) => (
            <div key={dish.name} className="bg-background rounded-sm overflow-hidden text-left">
              <img src={dish.img} alt={dish.name} width={640} height={512} loading="lazy" className="w-full h-48 object-cover" />
              <div className="p-5">
                <h3 className="font-heading text-xl italic mb-2 text-foreground">{dish.name}</h3>
                <p className="font-body text-xs text-muted-foreground mb-4">{dish.desc}</p>
                <a href="#" className="inline-block border border-primary/40 text-primary rounded-full px-5 py-1.5 text-xs font-body hover:bg-primary hover:text-primary-foreground transition-colors">
                  See More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
