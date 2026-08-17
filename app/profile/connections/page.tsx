"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { BackButton } from "@/components/ui/BackButton";
import { Avatar } from "@/components/ui/Avatar";
import { VerifiedBadge } from "@/components/ui/Badge";
import { loadMockSession } from "@/lib/mock-session";
import { getFollowingProfiles } from "@/lib/mock-follows";
import type { MockProfileSummary } from "@/lib/mock-data";
import { cn } from "@/lib/cn";

type Tab = "followers" | "following";

function ConnectionsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab: Tab = searchParams.get("tab") === "followers" ? "followers" : "following";

  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState<Tab>(initialTab);
  const [following, setFollowing] = useState<MockProfileSummary[]>([]);

  useEffect(() => {
    if (!loadMockSession()) {
      router.replace("/onboarding/phone");
      return;
    }
    setFollowing(getFollowingProfiles());
    setReady(true);
  }, [router]);

  if (!ready) return null;

  return (
    <div className="mx-auto flex w-full max-w-[480px] flex-1 flex-col px-6 pb-8 pt-6">
      <div className="flex items-center gap-4">
        <BackButton onClick={() => router.back()} />
        <h1 className="text-h1 text-ink">ارتباطات</h1>
      </div>

      <div className="mt-6 flex gap-2">
        <button
          type="button"
          onClick={() => setTab("followers")}
          className={cn(
            "h-11 flex-1 rounded-pill border-2 border-ink text-body-sm font-bold",
            tab === "followers" ? "bg-ink text-paper" : "bg-paper text-ink"
          )}
        >
          دنبال‌کنندگان
        </button>
        <button
          type="button"
          onClick={() => setTab("following")}
          className={cn(
            "h-11 flex-1 rounded-pill border-2 border-ink text-body-sm font-bold",
            tab === "following" ? "bg-ink text-paper" : "bg-paper text-ink"
          )}
        >
          دنبال‌شونده‌ها
        </button>
      </div>

      {tab === "followers" ? (
        <p className="mt-10 text-center text-body-sm text-muted-strong">هنوز کسی شما را دنبال نکرده</p>
      ) : following.length === 0 ? (
        <p className="mt-10 text-center text-body-sm text-muted-strong">هنوز کسی را دنبال نکرده‌اید</p>
      ) : (
        <div className="mt-6 flex flex-col gap-2">
          {following.map((person) => (
            <Link
              key={person.id}
              href={`/profile/${person.id}`}
              className="flex items-center gap-3 rounded-pill px-2 py-2 active:bg-surface"
            >
              <Avatar name={person.name} size={48} />
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-body-sm font-bold text-ink">{person.name}</span>
                  {person.verified && <VerifiedBadge />}
                </div>
                {person.tags.length > 0 && (
                  <p className="text-caption text-muted-strong">{person.tags.join(" · ")}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ConnectionsPage() {
  return (
    <Suspense fallback={null}>
      <ConnectionsContent />
    </Suspense>
  );
}
