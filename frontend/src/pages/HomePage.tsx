import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { RequirementsList } from "../components/RequirementsList";
import { ConditionsSection } from "../components/ConditionsSection";
import { AdvantagesSection } from "../components/AdvantagesSection";
import { ContactForm } from "../components/ContactForm";
import { ReviewsCarousel } from "../components/ReviewsCarousel";
import { CountriesCircle } from "../components/CountriesCircle";
import { ServicesSection } from "../components/ServicesSection";
import { ContactButtons } from "../components/ContactButtons";
import { Footer } from "../components/Footer";

export function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <RequirementsList />
        <ConditionsSection />
        <AdvantagesSection />
        <CountriesCircle />
        <ContactForm />
        <ReviewsCarousel />
        <ServicesSection />
      </main>
      <Footer />
      <ContactButtons />
    </>
  );
}
