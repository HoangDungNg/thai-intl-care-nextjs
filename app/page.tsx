import { GalleryImage } from "@/components/gallery-card/gallery-card";
import { LiquidGlass } from "@/components/liquid-glass/liquid-glass";
import { Testimonials } from "@/sections/testimonials";
import Image from "next/image";

const images: GalleryImage[] = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    alt: "Mountain landscape at dusk",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80",
    alt: "Aerial view of lush green hills",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=600&q=80",
    alt: "Dense forest canopy from below",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80",
    alt: "Golden hour over rolling hills",
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=600&q=80",
    alt: "Misty mountain valley",
  },
  {
    id: "6",
    src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=600&q=80",
    alt: "Sunlight through autumn forest",
  },
  {
    id: "7",
    src: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=600&q=80",
    alt: "Waterfall in tropical forest",
  },
  {
    id: "8",
    src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&q=80",
    alt: "Serene lake at sunrise",
  },
  {
    id: "9",
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80",
    alt: "Rocky mountain peak with clouds",
  },
  {
    id: "10",
    src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80",
    alt: "Ocean waves at sunset",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Testimonials className="max-w-full lg:max-w-360" images={images} />
      <LiquidGlass />
    </div>
  );
}
