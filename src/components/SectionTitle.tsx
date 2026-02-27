import type { ReactNode } from "react";
import { cn } from "../lib/utils";

interface SectionTitleProps {
  small?: ReactNode;
  title: ReactNode;
  accent?: ReactNode;
  smallClass?: string;
  smallDevClass?: string;
  className?: string;
}

export default function SectionTitle({
  small,
  title,
  accent,
  smallClass,
  className,
  smallDevClass,
}: SectionTitleProps) {
  return (
    <div>
      {small && (
        <div className={cn("flex items-center gap-2 mb-2 ", smallDevClass)}>
          <div className="h-px w-12 bg-brand-yellow " />
          <p className={cn("", smallClass)}>{small}</p>
        </div>
      )}
      <h2 className={className}>
        {title}
        {accent && (
          <span className="italic font-light lowercase text-brand-yellow">
            {accent}
          </span>
        )}
      </h2>
    </div>
  );
}
