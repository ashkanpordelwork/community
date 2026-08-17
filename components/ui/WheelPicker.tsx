"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface WheelItem {
  value: string;
  label: string;
}

export interface WheelColumnConfig {
  id: string;
  items: WheelItem[];
  value: string;
  onChange: (value: string) => void;
  width?: number;
}

const ITEM_HEIGHT = 44;
const VISIBLE_COUNT = 5;
const CONTAINER_HEIGHT = ITEM_HEIGHT * VISIBLE_COUNT;
const PAD = ((VISIBLE_COUNT - 1) / 2) * ITEM_HEIGHT;

function WheelColumn({ items, value, onChange, width }: WheelColumnConfig) {
  const ref = useRef<HTMLDivElement>(null);
  const lastEmitted = useRef(value);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollToIndex = (index: number, behavior: ScrollBehavior) => {
    ref.current?.scrollTo({ top: index * ITEM_HEIGHT, behavior });
  };

  // Sync scroll position when the value changes from outside this column.
  useEffect(() => {
    if (value === lastEmitted.current) return;
    const index = items.findIndex((i) => i.value === value);
    if (index >= 0) scrollToIndex(index, "auto");
    lastEmitted.current = value;
  }, [value, items]);

  useEffect(() => {
    const index = items.findIndex((i) => i.value === value);
    if (index >= 0) scrollToIndex(index, "auto");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = () => {
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      const el = ref.current;
      if (!el) return;
      const index = Math.round(el.scrollTop / ITEM_HEIGHT);
      const clamped = Math.min(Math.max(index, 0), items.length - 1);
      const next = items[clamped];
      if (next && next.value !== lastEmitted.current) {
        lastEmitted.current = next.value;
        onChange(next.value);
      }
    }, 120);
  };

  return (
    <div
      className="relative"
      style={{ height: CONTAINER_HEIGHT, width: width ?? 72 }}
    >
      <div
        ref={ref}
        onScroll={handleScroll}
        className="hide-scrollbar h-full snap-y snap-mandatory overflow-y-auto overscroll-contain"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0, black " +
            PAD * 0.6 +
            "px, black " +
            (CONTAINER_HEIGHT - PAD * 0.6) +
            "px, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0, black " +
            PAD * 0.6 +
            "px, black " +
            (CONTAINER_HEIGHT - PAD * 0.6) +
            "px, transparent 100%)",
        }}
      >
        <div style={{ height: PAD }} />
        {items.map((item) => (
          <div
            key={item.value}
            className={cn(
              "flex snap-center items-center justify-center text-h2 transition-colors",
              item.value === value ? "text-ink" : "text-faded"
            )}
            style={{ height: ITEM_HEIGHT }}
          >
            {item.label}
          </div>
        ))}
        <div style={{ height: PAD }} />
      </div>
    </div>
  );
}

export function WheelPicker({ columns }: { columns: WheelColumnConfig[] }) {
  return (
    <div className="relative mx-auto flex w-fit items-center justify-center">
      <div
        className="pointer-events-none absolute inset-x-0 z-10 border-y-2 border-ink"
        style={{ top: PAD, height: ITEM_HEIGHT }}
      />
      <div className="flex items-center gap-1">
        {columns.map((col) => (
          <WheelColumn key={col.id} {...col} />
        ))}
      </div>
    </div>
  );
}
