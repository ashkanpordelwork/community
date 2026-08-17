"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BackButton } from "@/components/ui/BackButton";
import { Avatar } from "@/components/ui/Avatar";
import { VerifiedBadge } from "@/components/ui/Badge";
import { loadMockSession } from "@/lib/mock-session";
import { getFollowingProfiles } from "@/lib/mock-follows";
import { type MockProfileSummary } from "@/lib/mock-data";

export default function FollowingPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [people, setPeople] = useState<MockProfileSummary[]>([]);

  useEffect(() => {
    if (!loadMockSession()) {
      router.replace("/onboarding/phone");
      return;
    }
    setPeople(getFollowingProfiles());
    setReady(true);
  }, [router]);

  if (!ready) return null;

  return (
    <div className="mx-auto flex w-full max-w-[480px] flex-1 flex-col px-6 pb-8 pt-6">
      <div className="flex items-center gap-4">
        <BackButton onClick={() => router.back()} />
        <h1 className="text-h1 text-ink">دنبال‌شونده‌ها</h1>
      </div>

      {people.length === 0 ? (
        <p className="mt-10 text-center text-body-sm text-muted-strong">هنوز کسی را دنبال نکرده‌اید</p>
      ) : (
        <div className="mt-6 flex flex-col gap-2">
          {people.map((person) => (
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
