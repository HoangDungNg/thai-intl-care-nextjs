import { AboutSection } from "@/sections/about-section";
import { CustomerFeedback } from "@/sections/customer-feedback";
import ExpertiseSection from "@/sections/expertise-section";
import { HeroSection } from "@/sections/hero-section";
import { ServicesSection } from "@/sections/services-section";
import { Fragment } from "react/jsx-runtime";

export default function Home() {
  return (
    <Fragment>
      <HeroSection />
      <AboutSection />
      <CustomerFeedback />
      <ServicesSection />
      <ExpertiseSection />
    </Fragment>
  );
}
