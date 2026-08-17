"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BackButton } from "@/components/ui/BackButton";
import { loadMockSession } from "@/lib/mock-session";

export default function FollowersPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!loadMockSession()) {
      router.replace("/onboarding/phone");
      return;
    }
    setReady(true);
  }, [router]);

  if (!ready) return null;

  return (
    <div className="mx-auto flex w-full max-w-[480px] flex-1 flex-col px-6 pb-8 pt-6">
      <div className="flex items-center gap-4">
        <BackButton onClick={() => router.back()} />
        <h1 className="text-h1 text-ink">دنبال‌کنندگان</h1>
      </div>

      <p className="mt-10 text-center text-body-sm text-muted-strong">هنوز کسی شما را دنبال نکرده</p>
    </div>
  );
}
