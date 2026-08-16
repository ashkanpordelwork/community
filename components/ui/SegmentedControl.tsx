"use client";

import { cn } from "@/lib/cn";

interface SegmentedControlProps<T extends string> {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  className,
}: SegmentedControlProps<T>) {
  return (
    <div className={cn("inline-flex gap-2", className)}>
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "h-11 rounded-pill border-2 border-ink px-6 text-[13px] font-bold tracking-wide transition-colors",
              active ? "bg-ink text-paper" : "bg-paper text-ink"
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
