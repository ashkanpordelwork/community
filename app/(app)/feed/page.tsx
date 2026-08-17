"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { EventCard } from "@/components/ui/EventCard";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { VerifiedBadge } from "@/components/ui/Badge";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { getAllEvents, isEventHeld, type UnifiedEvent } from "@/lib/events";
import { loadMockSession } from "@/lib/mock-session";
import { getSuggestedProfiles, toggleFollow, type SuggestedProfile } from "@/lib/mock-follows";
import { getUnreadCount, notifyNewEvent } from "@/lib/mock-notifications";

type Tab = "public" | "following";

export default function FeedPage() {
  const [tab, setTab] = useState<Tab>("public");
  const [query, setQuery] = useState("");
  // Starts empty so the server-rendered markup (no localStorage access) matches
  // the client's first paint; created events are filled in after mount.
  const [allEvents, setAllEvents] = useState<UnifiedEvent[]>([]);
  const [suggestions, setSuggestions] = useState<SuggestedProfile[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const refreshSuggestions = () => {
    const session = loadMockSession();
    setSuggestions(session ? getSuggestedProfiles(session.tags) : []);
  };

  useEffect(() => {
    setAllEvents(getAllEvents());
    refreshSuggestions();
    setUnreadCount(getUnreadCount());
  }, []);

  const follow = (id: string, profileName: string) => {
    toggleFollow(id);
    refreshSuggestions();
    const nextEvents = getAllEvents();
    setAllEvents(nextEvents);
    const theirEvents = nextEvents
      .filter((e) => e.organizerId === id)
      .sort((a, b) => new Date(b.dateTimeISO).getTime() - new Date(a.dateTimeISO).getTime());
    if (theirEvents[0]) notifyNewEvent(theirEvents[0].id, profileName, theirEvents[0].title);
    setUnreadCount(getUnreadCount());
  };

  const events = useMemo(() => {
    const base = tab === "following" ? allEvents.filter((e) => e.following) : allEvents;
    const q = query.trim();
    return q ? base.filter((e) => e.title.includes(q) || e.topic.includes(q)) : base;
  }, [tab, query, allEvents]);

  return (
    <div className="flex flex-col px-6 pb-8 pt-6">
      <div className="flex items-center justify-between">
        <h1 className="text-h1 text-ink">رویدادها</h1>
        <div className="flex items-center gap-2">
          <Link
            href="/notifications"
            aria-label="اعلان‌ها"
            className="relative flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink bg-paper text-ink"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 9a6 6 0 0 1 12 0v4l1.5 3h-15L6 13V9Z"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinejoin="round"
              />
              <path d="M10 19a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
            </svg>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -left-1 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-ink bg-accent-pink px-1 text-[10px] font-bold text-paper">
                {unreadCount}
              </span>
            )}
          </Link>
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
      </div>

      <input
        placeholder="جستجوی رویداد یا تاپیک..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mt-4 h-12 w-full rounded-pill border-2 border-transparent bg-surface px-5 text-body-sm text-ink outline-none focus:border-ink focus:bg-paper"
      />

      <SegmentedControl
        className="mt-4"
        value={tab}
        onChange={setTab}
        options={[
          { value: "public", label: "فید عمومی" },
          { value: "following", label: "دنبال‌شده‌ها" },
        ]}
      />

      {tab === "following" && suggestions.length > 0 && (
        <div className="mt-6">
          <h2 className="text-h2 text-ink">پیشنهاد برای دنبال کردن</h2>
          <div className="mt-3 flex flex-col gap-3">
            {suggestions.map(({ profile, sharedTags }) => (
              <Card key={profile.id} className="flex flex-col gap-3 p-3">
                <div className="flex items-center gap-3">
                  <Link href={`/profile/${profile.id}`}>
                    <Avatar name={profile.name} size={44} />
                  </Link>
                  <div className="flex-1">
                    <Link href={`/profile/${profile.id}`} className="flex items-center gap-1.5">
                      <span className="text-body-sm font-bold text-ink">{profile.name}</span>
                      {profile.verified && <VerifiedBadge />}
                    </Link>
                    <p className="text-caption text-muted-strong">
                      علاقهٔ مشترک: {sharedTags.join("، ")}
                    </p>
                  </div>
                </div>
                <Button variant="secondary" size="sm" onClick={() => follow(profile.id, profile.name)}>
                  دنبال کردن
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}

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
              held={isEventHeld(event)}
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
