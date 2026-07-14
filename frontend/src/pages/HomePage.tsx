import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { ConditionsSection } from "../components/ConditionsSection";
import { AdvantagesSection } from "../components/AdvantagesSection";
// import { ContactForm } from "../components/ContactForm";
import { ConsultationForm } from "../components/ConsultationForm";
// import { ReviewsCarousel } from "../components/ReviewsCarousel";
import { ProcessTimeline } from "../components/ProcessTimeline";
import { WhatWeDoSection } from "../components/WhatWeDoSection";
import { ServicesSection } from "../components/ServicesSection";
import { FaqSection } from "../components/FaqSection";
import { ContactsSection } from "../components/ContactsSection";
import { Footer } from "../components/Footer";

export function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <WhatWeDoSection />
        <AdvantagesSection />
        <ConditionsSection />
        <ProcessTimeline />
        <ConsultationForm />
        {/* <ContactForm /> */}
        {/* <ReviewsCarousel /> */}
        <FaqSection />
        <ContactsSection />
        <ServicesSection />
      </main>
      <Footer />
    </>
  );
}
