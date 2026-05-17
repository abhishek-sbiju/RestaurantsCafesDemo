import boothImg from "@/assets/booth-dining.jpg";
import gardenImg from "@/assets/garden-dining.jpg";

const stats = [
  { value: "100", suffix: "+", label: "Dishes" },
  { value: "20K", suffix: "+", label: "Guests" },
  { value: "12", suffix: "+", label: "Achievements" },
  { value: "10", suffix: "+", label: "Branches" },
];

const UniqueSection = () => (
  <section id="about-us" className="py-20 bg-background">
    <div className="container mx-auto px-6">
      <h2 className="font-heading text-4xl md:text-5xl text-center mb-16 italic text-foreground">
        What makes us unique?
      </h2>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Quote + image */}
        <div>
          <p className="font-heading text-3xl md:text-5xl italic text-primary leading-tight mb-8">
            "Seamless blend<br />of elegance and<br />comfort."
          </p>
          <img src={gardenImg} alt="Garden dining" width={800} height={600} loading="lazy" className="w-full rounded-sm object-cover h-64 md:h-80" />
        </div>

        {/* Booth image + stats */}
        <div className="flex flex-col gap-8">
          <img src={boothImg} alt="Booth seating" width={800} height={600} loading="lazy" className="w-full rounded-sm object-cover h-48 md:h-56" />
          <div className="grid grid-cols-2 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-heading text-4xl md:text-5xl text-stat-color">
                  {s.value}<span className="text-stat-color/60">{s.suffix}</span>
                </p>
                <p className="font-body text-sm text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default UniqueSection;
