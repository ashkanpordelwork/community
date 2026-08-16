import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  icon?: ReactNode;
}

export function Chip({ selected, icon, className, children, ...props }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        "inline-flex h-14 w-full items-center gap-3 rounded-pill border-2 border-ink px-6 text-body font-bold transition-colors",
        selected ? "bg-ink text-paper shadow-hard" : "bg-paper text-ink shadow-hard",
        className
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
