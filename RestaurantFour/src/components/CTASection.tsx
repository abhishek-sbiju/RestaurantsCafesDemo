const CTASection = () => (
  <section id="reservation" className="py-16 bg-background">
    <div className="container mx-auto px-6">
      <div className="bg-primary rounded-sm p-12 md:p-16 grid md:grid-cols-2 gap-8 items-center">
        <h2 className="font-heading text-4xl md:text-5xl italic text-primary-foreground leading-tight">
          Indulge in a<br />Dining Experience<br />Beyond Compare.
        </h2>
        <div>
          <p className="font-body text-sm text-primary-foreground/80 mb-6 max-w-sm">
            The attention to detail in every dish was astounding – the flavors were exquisite, and the presentation was like a work.
          </p>
          <a href="#" className="inline-block bg-background text-foreground rounded-sm px-8 py-3 font-body text-sm hover:bg-background/90 transition-colors">
            Reserve Table Now
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default CTASection;
