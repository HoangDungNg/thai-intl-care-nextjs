import { HTMLProps } from "react";
import styles from "./styles.module.css";
import { cn } from "@/lib/utils";

export const Glass = ({ className, children, ...props }: HTMLProps<HTMLDivElement>) => {
  return (
    <div className={cn(styles["glass"], className)} {...props}>
      {children}
    </div>
  );
};
