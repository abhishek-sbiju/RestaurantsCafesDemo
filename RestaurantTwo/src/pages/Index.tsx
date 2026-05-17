import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import InfoCards from "@/components/InfoCards";
import AboutSection from "@/components/AboutSection";
import FooterSection from "@/components/FooterSection";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <InfoCards />
    <AboutSection />
    <FooterSection />
  </div>
);

export default Index;
