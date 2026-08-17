"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/lib/onboarding-context";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const SUGGESTED = [
  "کوهنوردی",
  "دویدن",
  "دوچرخه‌سواری",
  "دورهمی",
  "طبیعت‌گردی",
  "کمپینگ",
  "سنگ‌نوردی",
  "اسکی",
  "پیاده‌روی",
  "غارنوردی",
  "قایقرانی",
  "یوگا در طبیعت",
];
const MAX_TAGS = 3;

export default function TagsPage() {
  const router = useRouter();
  const { tags, setTags } = useOnboarding();
  const [selected, setSelected] = useState<string[]>(tags);

  const toggle = (tag: string) => {
    setSelected((prev) => {
      if (prev.includes(tag)) return prev.filter((t) => t !== tag);
      if (prev.length >= MAX_TAGS) return prev;
      return [...prev, tag];
    });
  };

  const isValid = selected.length >= 1 && selected.length <= MAX_TAGS;

  return (
    <div className="flex flex-1 flex-col px-6 pb-8 pt-6">
      <h1 className="text-h1 text-ink">به چه فعالیت‌هایی علاقه دارید؟</h1>
      <p className="mt-2 text-caption uppercase tracking-wide text-muted-strong">
        بین ۱ تا {MAX_TAGS} گزینه انتخاب کنید
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {SUGGESTED.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => toggle(tag)}
            className={cn(
              "h-11 rounded-pill border-2 border-ink px-5 text-body-sm font-bold transition-colors",
              selected.includes(tag) ? "bg-ink text-paper" : "bg-paper text-ink"
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="mt-auto pt-10">
        <Button
          disabled={!isValid}
          onClick={() => {
            setTags(selected);
            router.push("/onboarding/photo");
          }}
        >
          ادامه
        </Button>
      </div>
    </div>
  );
}
