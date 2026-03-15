import { AboutSection } from "@/sections/about-section";
import { HeroSection } from "@/sections/hero-section";
import { ServicesSection } from "@/sections/services-section";
import { Fragment } from "react/jsx-runtime";

export default function Home() {
  return (
    <Fragment>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
    </Fragment>
  );
}
