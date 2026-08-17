"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { MOCK_EVENTS } from "@/lib/mock-data";
import { notFound } from "next/navigation";

const accentMap = {
  blue: "bg-accent-blue-soft text-accent-blue",
  pink: "bg-accent-pink-soft text-accent-pink",
  gold: "bg-accent-gold-soft text-accent-gold",
};

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const event = MOCK_EVENTS.find((e) => e.id === id);

  if (!event) notFound();

  return (
    <div className="mx-auto flex w-full max-w-[480px] flex-1 flex-col px-6 pb-8 pt-6">
      <BackButton onClick={() => router.back()} />

      <span
        className={`mt-5 inline-block w-fit rounded-pill px-3 py-1 text-caption font-bold uppercase tracking-wide ${accentMap[event.accent]}`}
      >
        {event.topic}
      </span>
      <h1 className="mt-3 text-h1 text-ink">{event.title}</h1>
      <p className="mt-2 text-body-sm text-muted">
        {event.date} · {event.location}
      </p>

      <Card className="mt-6 flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Avatar name={event.organizerName} size={44} />
          <div>
            <p className="text-body font-bold text-ink">{event.organizerName}</p>
            <p className="text-caption text-muted">برگزارکننده</p>
          </div>
        </div>
        <Link href={`/profile/${event.organizerId}`}>
          <Button variant="secondary" size="sm" fullWidth={false}>
            مشاهدهٔ پروفایل
          </Button>
        </Link>
      </Card>

      <div className="mt-6">
        <h2 className="text-h2 text-ink">توضیحات</h2>
        <p className="mt-2 text-body text-muted-strong">
          این یک رویداد نمونه است. جزئیات مسیر، شرایط ورود و نقاط توقف در نسخهٔ نهایی این بخش
          نمایش داده می‌شود.
        </p>
      </div>

      <div className="mt-auto pt-10">
        <Button variant="accent-blue">درخواست شرکت</Button>
      </div>
    </div>
  );
}
