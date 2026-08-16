"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar } from "@/components/ui/Avatar";
import { loadMockSession, type MockProfile } from "@/lib/mock-session";

export default function ProfilePage() {
  const router = useRouter();
  const [session, setSession] = useState<MockProfile | null | undefined>(undefined);

  useEffect(() => {
    const s = loadMockSession();
    if (!s) {
      router.replace("/onboarding/phone");
      return;
    }
    setSession(s);
  }, [router]);

  if (!session) return null;

  return (
    <div className="flex flex-col px-6 pb-8 pt-8">
      <div className="flex flex-col items-center text-center">
        <Avatar name={session.name} src={session.avatarDataUrl ?? undefined} size={96} />
        <h1 className="mt-4 text-h1 text-ink">{session.name}</h1>
        <p className="mt-1 text-body-sm text-muted">۰ رویداد · بدون امتیاز</p>

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

      <div className="mt-6 flex divide-x divide-x-reverse divide-border-soft border-y-2 border-border-soft py-4">
        <div className="flex-1 text-center">
          <p className="text-h2 text-ink">۰</p>
          <p className="text-caption uppercase tracking-wide text-muted">دنبال‌کننده</p>
        </div>
        <div className="flex-1 text-center">
          <p className="text-h2 text-ink">۰</p>
          <p className="text-caption uppercase tracking-wide text-muted">دنبال‌شونده</p>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-2 text-center">
        <p className="text-body text-ink">هنوز رویدادی ثبت نشده</p>
        <p className="text-body-sm text-muted">
          وقتی در رویدادی شرکت کنید یا رویدادی برگزار کنید، اینجا نمایش داده می‌شود
        </p>
      </div>
    </div>
  );
}
