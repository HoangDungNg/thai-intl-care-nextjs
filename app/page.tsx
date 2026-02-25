import { CARDS } from "@/components/fan-card-slider/data-example";
import { FanCardSlider } from "@/components/fan-card-slider/fan-card-slider";
import { Testimonials } from "@/sections/testimonials";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-center">
      <Testimonials />
    </div>
  );
}
