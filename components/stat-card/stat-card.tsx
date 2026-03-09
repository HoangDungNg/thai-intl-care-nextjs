"use client";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { Counter } from "../counter/counter";
import gsap from "gsap";
import styles from "./styles.module.css";
import { cn } from "@/lib/utils";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  icon: string;
  color: string;
  accentColor: string;
}

interface StatItemProps {
  stat: Stat;
  index: number;
  parentRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
}

function StatItem({ className, stat, index, parentRef }: StatItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        itemRef.current,
        { opacity: 0, y: 32, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          delay: index * 0.18,
          ease: "expo.out",
          scrollTrigger: {
            trigger: parentRef.current,
            start: "top 85%",
            once: true,
          },
        },
      );
    },
    { scope: itemRef },
  );

  return (
    <div ref={itemRef} className={cn(styles["stat-item"], className)} style={{ opacity: 0 }}>
      {/* Glow blob behind card */}
      <div className={styles["stat-glow"]} style={{ background: stat.accentColor }} />

      {/* Glass card */}
      <div className={cn(styles["stat-card"], "bg-linear-to-br", stat.color)}>
        {/* Icon badge */}
        <div className={styles["icon-badge"]} style={{ color: stat.accentColor }}>
          <span className={styles["icon-symbol"]}>{stat.icon}</span>
        </div>

        {/* Counter */}
        <Counter
          value={stat.value}
          suffix={stat.suffix}
          accentColor={stat.accentColor}
          triggerRef={parentRef}
        />

        {/* Labels */}
        <p className={styles["stat-label"]}>{stat.label}</p>
        <p className={styles["stat-sublabel"]}>{stat.sublabel}</p>

        {/* Decorative line */}
        <div className={styles["deco-line"]} style={{ background: stat.accentColor }} />
      </div>
    </div>
  );
}

export { StatItem, type Stat };
