import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import UniqueSection from "@/components/UniqueSection";
import MenuSection from "@/components/MenuSection";
import AmbianceSection from "@/components/AmbianceSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <UniqueSection />
    <MenuSection />
    <AmbianceSection />
    <TestimonialsSection />
    <CTASection />
    <Footer />
  </div>
);

export default Index;
