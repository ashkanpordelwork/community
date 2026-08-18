"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Chip } from "@/components/ui/Chip";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatBox } from "@/components/ui/StatBox";
import { EventCard } from "@/components/ui/EventCard";
import { ProfileCard } from "@/components/ui/ProfileCard";
import { StepProgress } from "@/components/ui/StepProgress";
import { VerifiedBadge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Logo } from "@/components/ui/Logo";

const colors = [
  { name: "ink", cls: "bg-ink" },
  { name: "app-bg", cls: "bg-app-bg" },
  { name: "paper", cls: "bg-paper border border-border-soft" },
  { name: "surface", cls: "bg-surface" },
  { name: "muted", cls: "bg-muted" },
  { name: "accent-blue", cls: "bg-accent-blue" },
  { name: "accent-blue-soft", cls: "bg-accent-blue-soft" },
  { name: "accent-pink", cls: "bg-accent-pink" },
  { name: "accent-pink-soft", cls: "bg-accent-pink-soft" },
  { name: "accent-gold", cls: "bg-accent-gold" },
  { name: "accent-gold-soft", cls: "bg-accent-gold-soft" },
  { name: "success", cls: "bg-success" },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-h2 text-ink">{title}</h2>
      {children}
    </section>
  );
}

export default function DesignSystemPage() {
  const [unit, setUnit] = useState<"imperial" | "metric">("metric");
  const [selected, setSelected] = useState<string[]>(["گزینه دو"]);

  const toggle = (opt: string) =>
    setSelected((s) => (s.includes(opt) ? s.filter((x) => x !== opt) : [...s, opt]));

  return (
    <main className="mx-auto w-full max-w-[480px] px-6 py-10">
      <h1 className="mb-2 text-display text-ink">سیستم طراحی</h1>
      <p className="mb-10 text-body text-muted-strong">
        مرجع بصری کامپوننت‌ها — رنگ، تایپوگرافی، فاصله‌گذاری و state ها
      </p>

      <Section title="لوگو">
        <div className="flex flex-wrap items-end gap-6">
          <div className="flex flex-col items-center gap-2">
            <Logo size={72} className="text-ink" />
            <span className="text-caption text-muted-strong">۷۲px</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Logo size={44} className="text-ink" />
            <span className="text-caption text-muted-strong">۴۴px</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Logo size={28} className="text-ink" />
            <span className="text-caption text-muted-strong">۲۸px</span>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-lg bg-ink p-4">
            <Logo size={44} className="text-paper" />
            <span className="text-caption text-paper/70">روی زمینهٔ تیره</span>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <Logo size={32} className="text-ink" />
          <span dir="ltr" className="text-h2 font-black tracking-tight text-ink">
            Circle
          </span>
        </div>
      </Section>

      <Section title="رنگ">
        <div className="grid grid-cols-3 gap-3">
          {colors.map((c) => (
            <div key={c.name} className="flex flex-col items-center gap-2">
              <div className={`h-14 w-14 rounded-md ${c.cls}`} />
              <span className="text-caption text-muted-strong">{c.name}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="تایپوگرافی">
        <div className="space-y-3">
          <p className="text-display">عنوان دیسپلی</p>
          <p className="text-h1">عنوان اصلی H1</p>
          <p className="text-h2">عنوان بخش H2</p>
          <p className="text-body">متن اصلی بدنه با وزن رگیولار برای خواندن راحت</p>
          <p className="text-body-sm text-muted-strong">متن ثانویهٔ کوچک‌تر</p>
          <p className="text-caption uppercase tracking-wide text-muted-strong">برچسب کپشن</p>
          <p className="text-stat">۱۵</p>
        </div>
      </Section>

      <Section title="دکمه‌ها">
        <div className="space-y-3">
          <Button variant="primary">دکمهٔ اصلی</Button>
          <Button variant="accent-blue">دکمهٔ تأکیدی آبی</Button>
          <Button variant="accent-pink">دکمهٔ تأکیدی صورتی</Button>
          <Button variant="secondary">دکمهٔ ثانویه</Button>
          <Button variant="primary" disabled>
            دکمهٔ غیرفعال
          </Button>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" fullWidth={false}>
              حالت کوچک
            </Button>
            <Button variant="secondary" size="sm" fullWidth={false}>
              ثانویه کوچک
            </Button>
          </div>
        </div>
      </Section>

      <Section title="ورودی متن">
        <div className="space-y-4">
          <Input placeholder="نام خود را وارد کنید" defaultValue="اشکان" />
          <Input placeholder="حالت خطا" defaultValue="12" error="فقط حروف مجاز است" />
          <Input placeholder="با راهنما" helper="این نام روی پروفایل شما نمایش داده می‌شود" />
        </div>
      </Section>

      <Section title="انتخابگر (Chip)">
        <div className="space-y-3">
          {["گزینه یک", "گزینه دو", "گزینه سه"].map((opt) => (
            <Chip key={opt} selected={selected.includes(opt)} onClick={() => toggle(opt)}>
              {opt}
            </Chip>
          ))}
        </div>
      </Section>

      <Section title="Segmented Control">
        <SegmentedControl
          value={unit}
          onChange={setUnit}
          options={[
            { value: "imperial", label: "امپریال" },
            { value: "metric", label: "متریک" },
          ]}
        />
      </Section>

      <Section title="نوار پیشرفت گام‌به‌گام">
        <StepProgress step={2} totalSteps={5} />
      </Section>

      <Section title="نوار پیشرفت">
        <div className="flex flex-col gap-3">
          <ProgressBar value={65} />
          <ProgressBar value={40} colorClassName="bg-accent-pink" />
        </div>
      </Section>

      <Section title="جعبهٔ آماری">
        <div className="flex gap-3">
          <StatBox label="مدت" value="۲۶" unit="دقیقه" accentClassName="text-accent-blue" />
          <StatBox label="سختی" value="۶" />
        </div>
      </Section>

      <Section title="بج تأیید">
        <VerifiedBadge />
      </Section>

      <Section title="آواتار">
        <div className="flex gap-3">
          <Avatar name="آرش" size={40} />
          <Avatar name="مریم" size={56} />
          <Avatar name="جواد" size={72} />
        </div>
      </Section>

      <Section title="کارت رویداد">
        <EventCard
          title="صعود به قله توچال"
          topic="کوهنوردی"
          date="۲۵ مرداد"
          location="تهران"
          organizerName="آرش رضایی"
          accent="blue"
        />
      </Section>

      <Section title="کارت پروفایل">
        <ProfileCard
          name="آرش رضایی"
          tags={["کوهنوردی", "دویدن"]}
          eventsCount={12}
          rating={4.8}
          verified
        />
      </Section>
    </main>
  );
}
