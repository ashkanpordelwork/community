"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { BackButton } from "@/components/ui/BackButton";
import { Avatar } from "@/components/ui/Avatar";
import { VerifiedBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EventCard } from "@/components/ui/EventCard";
import { MOCK_PROFILES } from "@/lib/mock-data";
import { getEventHistoryFor, type UnifiedEvent } from "@/lib/events";
import { getAverageRating } from "@/lib/mock-ratings";
import { StarRating } from "@/components/ui/StarRating";

export default function PublicProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const profile = MOCK_PROFILES.find((p) => p.id === id);
  const [following, setFollowing] = useState(profile?.following ?? false);
  const [history, setHistory] = useState<UnifiedEvent[]>([]);
  const [rating, setRating] = useState<{ average: number | null; count: number }>({
    average: profile?.rating ?? null,
    count: profile?.eventsCount ?? 0,
  });

  useEffect(() => {
    if (!profile) return;
    setHistory(getEventHistoryFor(profile.name));
    setRating(getAverageRating(profile.name, { rating: profile.rating, count: profile.eventsCount }));
  }, [profile]);

  if (!profile) notFound();

  return (
    <div className="mx-auto flex w-full max-w-[480px] flex-1 flex-col px-6 pb-10 pt-6">
      <BackButton onClick={() => router.back()} />

      <div className="mt-6 flex flex-col items-center text-center">
        <Avatar name={profile.name} size={96} />
        <div className="mt-4 flex items-center gap-2">
          <h1 className="text-h1 text-ink">{profile.name}</h1>
          {profile.verified && <VerifiedBadge />}
        </div>
        <div className="mt-1 flex items-center gap-1.5 text-body-sm text-muted-strong">
          <span>{profile.eventsCount} رویداد</span>
          {rating.average !== null && (
            <>
              <span>·</span>
              <StarRating value={rating.average} size={14} />
              <span>
                {rating.average.toFixed(1)} ({rating.count})
              </span>
            </>
          )}
        </div>

        {profile.social && (
          <a
            href={`https://${profile.social}`}
            target="_blank"
            rel="noreferrer"
            className="mt-2 text-body-sm font-medium text-accent-blue"
          >
            {profile.social}
          </a>
        )}

        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {profile.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-pill bg-surface px-3 py-1 text-caption font-medium text-muted-strong"
            >
              {tag}
            </span>
          ))}
        </div>

        <Button
          variant={following ? "secondary" : "primary"}
          size="sm"
          fullWidth={false}
          className="mt-5 px-10"
          onClick={() => setFollowing((f) => !f)}
        >
          {following ? "دنبال می‌کنید" : "دنبال کردن"}
        </Button>
      </div>

      <div className="mt-6 flex border-y-2 border-ink py-4">
        <div className="flex-1 border-e-2 border-ink text-center">
          <p className="text-h2 text-ink">{profile.followers}</p>
          <p className="text-caption uppercase tracking-wide text-muted-strong">دنبال‌کننده</p>
        </div>
        <div className="flex-1 text-center">
          <p className="text-h2 text-ink">{profile.followingCount}</p>
          <p className="text-caption uppercase tracking-wide text-muted-strong">دنبال‌شونده</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-h2 text-ink">تاریخچهٔ رویدادها</h2>
        <div className="mt-4 flex flex-col gap-4">
          {history.length === 0 && (
            <p className="text-body-sm text-muted-strong">هنوز رویدادی ثبت نکرده</p>
          )}
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
      </div>
    </div>
  );
}
