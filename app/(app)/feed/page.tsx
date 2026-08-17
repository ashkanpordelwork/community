"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { EventCard } from "@/components/ui/EventCard";
import { MOCK_EVENTS } from "@/lib/mock-data";
import { cn } from "@/lib/cn";

type Tab = "public" | "following";

export default function FeedPage() {
  const [tab, setTab] = useState<Tab>("public");
  const [query, setQuery] = useState("");

  const events = useMemo(() => {
    const base = tab === "following" ? MOCK_EVENTS.filter((e) => e.following) : MOCK_EVENTS;
    const q = query.trim();
    return q ? base.filter((e) => e.title.includes(q) || e.topic.includes(q)) : base;
  }, [tab, query]);

  return (
    <div className="flex flex-col px-6 pb-8 pt-6">
      <div className="flex items-center justify-between">
        <h1 className="text-h1 text-ink">رویدادها</h1>
        <Link
          href="/events/create"
          aria-label="ساخت رویداد جدید"
          className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink bg-ink text-paper shadow-hard-sm"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
            />
          </svg>
        </Link>
      </div>

      <input
        placeholder="جستجوی رویداد یا تاپیک..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mt-4 h-12 w-full rounded-pill border-2 border-transparent bg-surface px-5 text-body-sm text-ink outline-none focus:border-ink focus:bg-paper"
      />

      <div className="mt-4 flex gap-2">
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

        {events.length === 0 && tab === "following" && (
          <div className="mt-10 flex flex-col items-center gap-3 text-center">
            <p className="text-body text-ink">هنوز کسی را دنبال نمی‌کنید</p>
            <p className="text-body-sm text-muted-strong">
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

        {events.length === 0 && tab === "public" && (
          <p className="mt-10 text-center text-body text-muted-strong">نتیجه‌ای پیدا نشد</p>
        )}
      </div>
    </div>
  );
}
