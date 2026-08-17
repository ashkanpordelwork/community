"use client";

import { WheelPicker } from "./WheelPicker";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

interface DateWheelPickerProps {
  value: string; // "YYYY-MM-DD"
  onChange: (value: string) => void;
}

export function DateWheelPicker({ value, onChange }: DateWheelPickerProps) {
  const today = new Date();
  const [y, m, d] = value
    ? value.split("-").map(Number)
    : [today.getFullYear(), today.getMonth() + 1, today.getDate()];

  const years = range(today.getFullYear(), today.getFullYear() + 3);
  const months = range(1, 12);
  const days = range(1, 31);

  const setPart = (part: "y" | "m" | "d", newValue: number) => {
    const next = { y, m, d, [part]: newValue };
    onChange(`${next.y}-${pad(next.m)}-${pad(next.d)}`);
  };

  return (
    <WheelPicker
      columns={[
        {
          id: "year",
          value: String(y),
          items: years.map((n) => ({ value: String(n), label: String(n) })),
          onChange: (v) => setPart("y", Number(v)),
          width: 84,
        },
        {
          id: "month",
          value: pad(m),
          items: months.map((n) => ({ value: pad(n), label: pad(n) })),
          onChange: (v) => setPart("m", Number(v)),
          width: 60,
        },
        {
          id: "day",
          value: pad(d),
          items: days.map((n) => ({ value: pad(n), label: pad(n) })),
          onChange: (v) => setPart("d", Number(v)),
          width: 60,
        },
      ]}
    />
  );
}

interface TimeWheelPickerProps {
  value: string; // "HH:MM"
  onChange: (value: string) => void;
}

export function TimeWheelPicker({ value, onChange }: TimeWheelPickerProps) {
  const [h, min] = value ? value.split(":").map(Number) : [8, 0];

  const hours = range(0, 23);
  const minutes = range(0, 59);

  const setPart = (part: "h" | "min", newValue: number) => {
    const next = { h, min, [part]: newValue };
    onChange(`${pad(next.h)}:${pad(next.min)}`);
  };

  return (
    <WheelPicker
      columns={[
        {
          id: "minute",
          value: pad(min),
          items: minutes.map((n) => ({ value: pad(n), label: pad(n) })),
          onChange: (v) => setPart("min", Number(v)),
          width: 60,
        },
        {
          id: "hour",
          value: pad(h),
          items: hours.map((n) => ({ value: pad(n), label: pad(n) })),
          onChange: (v) => setPart("h", Number(v)),
          width: 60,
        },
      ]}
    />
  );
}
