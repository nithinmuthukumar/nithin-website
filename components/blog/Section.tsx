import { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";

interface SectionProps {
  children: ReactNode;
  className?: string;
}

export function Section({ children, className = "" }: SectionProps) {
  return (
    <section className={`my-8 ${className}`}>
      {children}
    </section>
  );
}

