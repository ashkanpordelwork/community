"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/lib/onboarding-context";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { saveMockSession } from "@/lib/mock-session";

export default function PhotoPage() {
  const router = useRouter();
  const { name, phone, tags, avatarDataUrl, setAvatarDataUrl } = useOnboarding();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const finish = () => {
    saveMockSession({ phone, name, tags, avatarDataUrl });
    router.push("/feed");
  };

  return (
    <div className="flex flex-1 flex-col px-6 pb-8 pt-6">
      <h1 className="text-h1 text-ink">یک عکس پروفایل انتخاب کنید</h1>
      <p className="mt-2 text-caption uppercase tracking-wide text-muted">
        این عکس روی پروفایل عمومی شما نمایش داده می‌شود
      </p>

      <div className="mt-12 flex flex-col items-center">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="relative"
        >
          <Avatar name={name || "?"} src={avatarDataUrl ?? undefined} size={120} />
          <span className="absolute -bottom-1 -left-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink bg-accent-blue text-paper shadow-hard-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinejoin="round"
              />
              <circle cx="12" cy="14" r="3.2" stroke="currentColor" strokeWidth={2} />
            </svg>
          </span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () => setAvatarDataUrl(reader.result as string);
            reader.readAsDataURL(file);
          }}
        />
      </div>

      <div className="mt-auto flex flex-col gap-3 pt-10">
        <Button onClick={finish}>شروع کنید</Button>
        <Button variant="outline" onClick={finish}>
          فعلاً رد شو
        </Button>
      </div>
    </div>
  );
}
