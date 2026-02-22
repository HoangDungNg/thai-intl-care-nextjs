"use client";

import TestimonialsCard from "@/components/ui/testimonials-card";

const items = [
  {
    id: 1,
    title: "John Doe",
    description: "This product changed my life! Highly recommended.",
    image:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&q=80",
  },
  {
    id: 2,
    title: "Jane Smith",
    description: "Amazing experience, will definitely use again.",
    image:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&q=80",
  },
  {
    id: 3,
    title: "Mike Johnson",
    description: "Outstanding service and quality.",
    image:
      "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=400&q=80",
  },
];

export const Testimonials = () => {
  return (
    <div className="flex min-h-125px w-full items-center justify-center">
      <TestimonialsCard width={800} items={items} />
    </div>
  );
};
