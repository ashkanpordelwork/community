"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { EventCard } from "@/components/ui/EventCard";
import { loadMockSession } from "@/lib/mock-session";

export default function Home() {
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    setHasSession(!!loadMockSession());
  }, []);

  return (
    <main className="mx-auto flex w-full max-w-[480px] flex-1 flex-col px-6 pb-8 pt-16">
      <span dir="ltr" className="text-h2 font-black tracking-tight text-ink">
        Circle
      </span>
      <h1 className="mt-4 text-display text-ink">هر حلقه، یه ماجراجویی جدید</h1>
      <p className="mt-4 text-body text-muted-strong">
        بیا با هم دور هم جمع بشیم؛ پروفایل بساز، سابقهٔ فعالیت‌هات رو نشون بده و به رویدادهای
        گروهی نزدیکت بپیوند.
      </p>

      <div className="mt-10">
        <EventCard
          title="صعود به قله توچال از مسیر ۷"
          topic="کوهنوردی"
          date="۲۵ مرداد"
          location="تهران"
          organizerName="آرش رضایی"
          accent="blue"
        />
      </div>

      <div className="mt-auto flex flex-col gap-4 pt-12">
        <Link href={hasSession ? "/feed" : "/onboarding/phone"}>
          <Button>{hasSession ? "ورود به فید" : "شروع کنید"}</Button>
        </Link>
        {!hasSession && (
          <p className="text-center text-body-sm text-muted-strong">
            قبلاً حساب دارید؟{" "}
            <Link href="/onboarding/phone" className="font-bold text-ink underline">
              ورود
            </Link>
          </p>
        )}
      </div>
    </main>
  );
}
