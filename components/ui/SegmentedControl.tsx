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
  const activeIndex = Math.max(
    0,
    options.findIndex((o) => o.value === value)
  );
  const count = options.length;
  // Matches the container's own p-1 (4px). The indicator is absolutely
  // positioned, so it's measured against the padding box, while the flex
  // buttons are measured against the content box (padding box minus this
  // same padding) — the calc() below re-applies that padding by hand so
  // both line up exactly instead of the indicator drifting toward the border.
  const pad = 4;

  return (
    <div
      className={cn(
        "relative flex h-12 items-center rounded-pill border-2 border-ink bg-surface p-1",
        className
      )}
    >
      <div
        className="absolute inset-y-1 rounded-pill bg-ink transition-[inset-inline-start] duration-200 ease-out"
        style={{
          width: `calc((100% - ${pad * 2}px) / ${count})`,
          insetInlineStart: `calc(${pad}px + (100% - ${pad * 2}px) * ${activeIndex} / ${count})`,
        }}
      />
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "relative z-10 flex-1 rounded-pill py-2 text-[13px] font-bold tracking-wide transition-colors",
              active ? "text-paper" : "text-ink"
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
