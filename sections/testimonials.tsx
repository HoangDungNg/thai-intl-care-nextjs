import { CARDS } from "@/components/fan-card-slider/data-example";
import { FanCardSlider } from "@/components/fan-card-slider/fan-card-slider";

export const Testimonials = () => {
  return (
    <div className="max-w-5xl bg-[url('/images/testimonial-bg.png')] bg-cover bg-center">
      <FanCardSlider cards={CARDS} />
    </div>
  );
};
