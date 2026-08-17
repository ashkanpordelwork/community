"use client";

import { WheelPicker } from "./WheelPicker";
import { PERSIAN_MONTHS, jalaaliMonthLength, toGregorian, toJalaali } from "@/lib/jalali";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

interface DateWheelPickerProps {
  value: string; // Gregorian ISO "YYYY-MM-DD"
  onChange: (value: string) => void;
}

export function DateWheelPicker({ value, onChange }: DateWheelPickerProps) {
  const today = new Date();
  const [gy, gm, gd] = value
    ? value.split("-").map(Number)
    : [today.getFullYear(), today.getMonth() + 1, today.getDate()];
  const { jy, jm, jd } = toJalaali(gy, gm, gd);

  const years = range(jy - 1, jy + 3);
  const months = range(1, 12);
  const dayCount = jalaaliMonthLength(jy, jm);
  const days = range(1, dayCount);

  const setPart = (part: "jy" | "jm" | "jd", newValue: number) => {
    const next = { jy, jm, jd, [part]: newValue };
    const maxDay = jalaaliMonthLength(next.jy, next.jm);
    const clampedDay = Math.min(next.jd, maxDay);
    const g = toGregorian(next.jy, next.jm, clampedDay);
    onChange(`${g.gy}-${pad(g.gm)}-${pad(g.gd)}`);
  };

  return (
    <WheelPicker
      columns={[
        {
          id: "year",
          value: String(jy),
          items: years.map((n) => ({ value: String(n), label: String(n) })),
          onChange: (v) => setPart("jy", Number(v)),
          width: 84,
        },
        {
          id: "month",
          value: String(jm),
          items: months.map((n) => ({ value: String(n), label: PERSIAN_MONTHS[n - 1] })),
          onChange: (v) => setPart("jm", Number(v)),
          width: 128,
        },
        {
          id: "day",
          value: String(jd),
          items: days.map((n) => ({ value: String(n), label: pad(n) })),
          onChange: (v) => setPart("jd", Number(v)),
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
