"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar } from "@/components/ui/Avatar";
import { EventCard } from "@/components/ui/EventCard";
import { loadMockSession, type MockProfile } from "@/lib/mock-session";
import { getEventHistoryFor, type UnifiedEvent } from "@/lib/events";
import { getAverageRating } from "@/lib/mock-ratings";
import { getFollowingProfiles } from "@/lib/mock-follows";
import { StarRating } from "@/components/ui/StarRating";
import type { MockProfileSummary } from "@/lib/mock-data";

export default function ProfilePage() {
  const router = useRouter();
  const [session, setSession] = useState<MockProfile | null | undefined>(undefined);
  const [history, setHistory] = useState<UnifiedEvent[]>([]);
  const [following, setFollowing] = useState<MockProfileSummary[]>([]);
  const [rating, setRating] = useState<{ average: number | null; count: number }>({
    average: null,
    count: 0,
  });

  useEffect(() => {
    const s = loadMockSession();
    if (!s) {
      router.replace("/onboarding/phone");
      return;
    }
    setSession(s);
    setHistory(getEventHistoryFor(s.name));
    setRating(getAverageRating(s.name));
    setFollowing(getFollowingProfiles());
  }, [router]);

  if (!session) return null;

  return (
    <div className="flex flex-col px-6 pb-8 pt-8">
      <div className="flex flex-col items-center text-center">
        <Avatar name={session.name} src={session.avatarDataUrl ?? undefined} size={96} />
        <h1 className="mt-4 text-h1 text-ink">{session.name}</h1>
        <div className="mt-1 flex items-center gap-1.5 text-body-sm text-muted-strong">
          <span>{history.length} رویداد</span>
          {rating.average !== null ? (
            <>
              <span>·</span>
              <StarRating value={rating.average} size={14} />
              <span>
                {rating.average.toFixed(1)} ({rating.count})
              </span>
            </>
          ) : (
            <>
              <span>·</span>
              <span>بدون امتیاز</span>
            </>
          )}
        </div>

        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {session.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-pill bg-surface px-3 py-1 text-caption font-medium text-muted-strong"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 flex border-y-2 border-ink py-4">
        <Link
          href="/profile/connections?tab=followers"
          className="flex-1 border-e-2 border-ink text-center"
        >
          <p className="text-h2 text-ink">۰</p>
          <p className="text-caption uppercase tracking-wide text-muted-strong">دنبال‌کننده</p>
        </Link>
        <Link href="/profile/connections?tab=following" className="flex-1 text-center">
          <p className="text-h2 text-ink">{following.length}</p>
          <p className="text-caption uppercase tracking-wide text-muted-strong">دنبال‌شونده</p>
        </Link>
      </div>

      <div className="mt-8">
        <h2 className="text-h2 text-ink">تاریخچهٔ رویدادها</h2>
        {history.length === 0 ? (
          <div className="mt-4 flex flex-col items-center gap-2 text-center">
            <p className="text-body text-ink">هنوز رویدادی ثبت نشده</p>
            <p className="text-body-sm text-muted-strong">
              وقتی در رویدادی شرکت کنید یا رویدادی برگزار کنید، اینجا نمایش داده می‌شود
            </p>
          </div>
        ) : (
          <div className="mt-4 flex flex-col gap-4">
            {history.map((event) => (
              <Link key={event.id} href={`/events/${event.id}`}>
                <EventCard
                  title={event.title}
                  topic={event.topic}
                  date={event.date}
                  location={event.location}
                  organizerName={event.organizerName}
                  accent={event.accent}
                  held
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
