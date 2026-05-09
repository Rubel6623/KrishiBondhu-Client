import Hero from "../../components/home/Hero";
import MarqueeStrip from "../../components/home/MarqueeStrip";
import Stats from "../../components/home/Stats";
import HowItWorks from "../../components/home/HowItWorks";
import Services from "../../components/home/Services";
import EquipmentMarketplace from "../../components/home/EquipmentMarketplace";
import AiAssistant from "../../components/home/AiAssistant";
import Testimonials from "../../components/home/Testimonials";
import TopProviders from "../../components/home/TopProviders";
import CtaBanner from "../../components/home/CtaBanner";
import Blog from "../../components/home/Blog";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeStrip />
      <Services />
      <EquipmentMarketplace />
      <TopProviders />
      <AiAssistant />
      <CtaBanner />
      <HowItWorks />
      <Stats />
      <Blog />
      <Testimonials />
    </>
  );
}
