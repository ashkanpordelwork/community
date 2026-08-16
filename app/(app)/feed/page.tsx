"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { EventCard } from "@/components/ui/EventCard";
import { MOCK_EVENTS } from "@/lib/mock-data";
import { cn } from "@/lib/cn";

type Tab = "public" | "following";

export default function FeedPage() {
  const [tab, setTab] = useState<Tab>("public");

  const events = useMemo(
    () => (tab === "following" ? MOCK_EVENTS.filter((e) => e.following) : MOCK_EVENTS),
    [tab]
  );

  return (
    <div className="flex flex-col px-6 pb-8 pt-6">
      <h1 className="text-h1 text-ink">رویدادها</h1>

      <div className="mt-5 flex gap-2">
        <button
          type="button"
          onClick={() => setTab("public")}
          className={cn(
            "h-11 flex-1 rounded-pill border-2 border-ink text-body-sm font-bold",
            tab === "public" ? "bg-ink text-paper" : "bg-paper text-ink"
          )}
        >
          فید عمومی
        </button>
        <button
          type="button"
          onClick={() => setTab("following")}
          className={cn(
            "h-11 flex-1 rounded-pill border-2 border-ink text-body-sm font-bold",
            tab === "following" ? "bg-ink text-paper" : "bg-paper text-ink"
          )}
        >
          دنبال‌شده‌ها
        </button>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {events.map((event) => (
          <Link key={event.id} href={`/events/${event.id}`}>
            <EventCard
              title={event.title}
              topic={event.topic}
              date={event.date}
              location={event.location}
              organizerName={event.organizerName}
              accent={event.accent}
            />
          </Link>
        ))}

        {events.length === 0 && (
          <div className="mt-10 flex flex-col items-center gap-3 text-center">
            <p className="text-body text-ink">هنوز کسی را دنبال نمی‌کنید</p>
            <p className="text-body-sm text-muted">
              برای دیدن رویدادهای افراد موردعلاقه‌تان، اول چند نفر را دنبال کنید
            </p>
            <button
              type="button"
              onClick={() => setTab("public")}
              className="mt-2 text-body-sm font-bold text-accent-blue"
            >
              رفتن به فید عمومی
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
