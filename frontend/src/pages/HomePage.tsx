import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HeroSection } from "../components/HeroSection";
import { ConditionsSection } from "../components/ConditionsSection";
import { AdvantagesSection } from "../components/AdvantagesSection";
import { ConsultationForm } from "../components/ConsultationForm";
import { ProcessTimeline } from "../components/ProcessTimeline";
import { WhatWeDoSection } from "../components/WhatWeDoSection";
import { ServicesSection } from "../components/ServicesSection";
import { FaqSection } from "../components/FaqSection";

export function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
      return;
    }
    const id = location.hash.replace("#", "");
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    });
  }, [location.pathname, location.hash]);

  return (
    <main>
      <HeroSection />
      <WhatWeDoSection />
      <AdvantagesSection />
      <ConditionsSection />
      <ProcessTimeline />
      <ConsultationForm />
      <FaqSection />
      <ServicesSection />
    </main>
  );
}
