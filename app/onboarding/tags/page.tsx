"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/lib/onboarding-context";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const SUGGESTED = ["کوهنوردی", "دویدن", "دوچرخه‌سواری", "دورهمی", "طبیعت‌گردی", "کمپینگ"];
const MAX_TAGS = 3;

export default function TagsPage() {
  const router = useRouter();
  const { tags, setTags } = useOnboarding();
  const [selected, setSelected] = useState<string[]>(tags);
  const [customTag, setCustomTag] = useState("");

  const toggle = (tag: string) => {
    setSelected((prev) => {
      if (prev.includes(tag)) return prev.filter((t) => t !== tag);
      if (prev.length >= MAX_TAGS) return prev;
      return [...prev, tag];
    });
  };

  const addCustom = () => {
    const t = customTag.trim();
    if (!t || selected.includes(t) || selected.length >= MAX_TAGS) return;
    setSelected((prev) => [...prev, t]);
    setCustomTag("");
  };

  const isValid = selected.length >= 1 && selected.length <= MAX_TAGS;

  return (
    <div className="flex flex-1 flex-col px-6 pb-8 pt-6">
      <h1 className="text-h1 text-ink">به چه فعالیت‌هایی علاقه دارید؟</h1>
      <p className="mt-2 text-caption uppercase tracking-wide text-muted">
        بین ۱ تا {MAX_TAGS} گزینه انتخاب کنید
      </p>

      <div className="mt-8 flex flex-col gap-3">
        {SUGGESTED.map((tag) => (
          <Chip key={tag} selected={selected.includes(tag)} onClick={() => toggle(tag)}>
            {tag}
          </Chip>
        ))}
        {selected
          .filter((t) => !SUGGESTED.includes(t))
          .map((tag) => (
            <Chip key={tag} selected onClick={() => toggle(tag)}>
              {tag}
            </Chip>
          ))}
      </div>

      <div className="mt-4 flex gap-2">
        <Input
          placeholder="تگ دلخواه..."
          value={customTag}
          onChange={(e) => setCustomTag(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addCustom()}
          className="!h-11 !text-body"
        />
        <Button variant="outline" size="sm" fullWidth={false} onClick={addCustom}>
          افزودن
        </Button>
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
