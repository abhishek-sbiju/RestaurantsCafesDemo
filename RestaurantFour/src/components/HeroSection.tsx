import heroImg from "@/assets/hero-dining.jpg";

const HeroSection = () => (
  <section className="relative h-[90vh] min-h-[600px] mt-16 overflow-hidden">
    <img src={heroImg} alt="Fine dining interior" width={1920} height={1080} className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0 bg-[hsl(var(--hero-overlay)/0.55)]" />
    <div className="relative z-10 container mx-auto h-full flex items-end pb-20 px-6">
      <div className="grid md:grid-cols-2 gap-8 items-end w-full">
        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-light text-primary-foreground leading-[1.05]">
          Fine Dining &<br />Restaurant
        </h1>
        <div className="flex flex-col items-start gap-6 md:pb-4">
          <p className="text-primary-foreground/80 font-body text-base max-w-md">
            A refined dining experience where elegance blends with unforgettable tastes.
          </p>
          <a href="#reservation" className="inline-block border border-primary-foreground/40 bg-primary hover:bg-primary/90 text-primary-foreground rounded-sm px-8 py-3 font-body text-sm tracking-wide transition-colors">
            Reserve Your Table
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
