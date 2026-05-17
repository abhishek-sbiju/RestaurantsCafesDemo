import hallImg from "@/assets/ambiance-hall.jpg";
import loungeImg from "@/assets/ambiance-lounge.jpg";
import terraceImg from "@/assets/ambiance-terrace.jpg";

const spaces = [
  { name: "The grand dining hall", img: hallImg },
  { name: "The prestige lounge", img: loungeImg },
  { name: "The sommelier's reserve", img: terraceImg },
];

const AmbianceSection = () => (
  <section id="ambiance" className="py-20 bg-surface-dark text-primary-foreground">
    <div className="container mx-auto px-6 text-center">
      <h2 className="font-heading text-4xl md:text-5xl italic mb-12">
        Atmosphere of<br />elegance & comfort
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {spaces.map((space) => (
          <div key={space.name} className="group">
            <div className="overflow-hidden rounded-sm mb-3">
              <img
                src={space.img}
                alt={space.name}
                width={640}
                height={512}
                loading="lazy"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <p className="font-heading text-lg italic text-primary-foreground/90">{space.name}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AmbianceSection;
