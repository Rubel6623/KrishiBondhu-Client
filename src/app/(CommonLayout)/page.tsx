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
import SpecialistsSection from "../../components/home/SpecialistsSection";
import { getUser } from "@/services/auth";

export default async function HomePage() {
  const user = await getUser();

  return (
    <>
      <Hero />
      <MarqueeStrip />
      <Services />
      <EquipmentMarketplace />
      <TopProviders />
      <SpecialistsSection />
      <AiAssistant isLoggedIn={!!user} />
      <CtaBanner />
      <HowItWorks />
      <Stats />
      <Blog />
      <Testimonials />
    </>
  );
}
