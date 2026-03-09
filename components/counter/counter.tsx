"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import styles from "./styles.module.css";

interface CounterProps {
  value: number;
  suffix: string;
  accentColor: string;
  triggerRef: React.RefObject<HTMLDivElement | null>;
}

export function Counter({ value, suffix, accentColor, triggerRef }: CounterProps) {
  const numRef = useRef<HTMLSpanElement>(null);
  const obj = useRef({ val: 0 });

  useGSAP(
    () => {
      const el = numRef.current;
      if (!el) return;

      gsap.fromTo(
        obj.current,
        { val: 0 },
        {
          val: value,
          duration: 2.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top 85%",
            once: true,
          },
          onUpdate() {
            el.textContent = Math.round(obj.current.val).toString();
          },
          onComplete() {
            el.textContent = value.toString();
          },
        },
      );
    },
    { scope: numRef },
  );

  return (
    <div className={styles["counter-value"]} style={{ color: accentColor }}>
      <span ref={numRef}>0</span>
      <span className={styles["suffix"]}>{suffix}</span>
    </div>
  );
}
