"use client";
import { Glass } from "@/components/glass/glass";
import { Stat, StatItem } from "@/components/stat-card/stat-card";
import Image from "next/image";
import { useRef } from "react";

const STATS: Stat[] = [
  {
    value: 150,
    suffix: "+",
    label: "Smiles Transformed",
    sublabel: "Successful treatments",
    icon: "✦",
    color: "from-teal-400/20 to-cyan-300/10",
    accentColor: "#2dd4bf",
  },
  {
    value: 500,
    suffix: "+",
    label: "Happy Customers",
    sublabel: "Trusted by families",
    icon: "◈",
    color: "from-sky-400/20 to-blue-300/10",
    accentColor: "#38bdf8",
  },
  {
    value: 98,
    suffix: "%",
    label: "Satisfaction Rate",
    sublabel: "5-star experiences",
    icon: "❋",
    color: "from-emerald-400/20 to-teal-300/10",
    accentColor: "#34d399",
  },
];

export const CallToAction = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  return (
    <div className="relative h-screen w-full max-w-360">
      <Glass className="absolute inset-0 z-10 m-auto flex h-[60%] w-[70%] items-center p-6">
        <div className="flex flex-1 flex-row gap-4">
          {STATS.map((stat, i) => (
            <StatItem
              className="flex-1"
              key={stat.label}
              stat={stat}
              index={i}
              parentRef={cardRef}
            />
          ))}
        </div>
      </Glass>
      <Image className="object-cover" src="/images/customer-experience-bg.png" alt="Example" fill />
    </div>
  );
};
