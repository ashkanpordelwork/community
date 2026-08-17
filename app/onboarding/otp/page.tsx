"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/lib/onboarding-context";
import { Button } from "@/components/ui/Button";

const LENGTH = 4;

export default function OtpPage() {
  const router = useRouter();
  const { phone } = useOnboarding();
  const [digits, setDigits] = useState<string[]>(Array(LENGTH).fill(""));

  const code = digits.join("");
  const isValid = code.length === LENGTH;

  const handleChange = (index: number, raw: string) => {
    const v = raw.replace(/[^\d]/g, "").slice(-1);
    const next = [...digits];
    next[index] = v;
    setDigits(next);
    if (v && index < LENGTH - 1) {
      const el = document.getElementById(`otp-${index + 1}`);
      el?.focus();
    }
  };

  return (
    <div className="flex flex-1 flex-col px-6 pb-8 pt-6">
      <h1 className="text-h1 text-ink">کد تأیید را وارد کنید</h1>
      <p className="mt-2 text-caption uppercase tracking-wide text-muted-strong">
        کد ۴ رقمی به شمارهٔ {phone || "شما"} پیامک شد
      </p>

      <div className="mt-10 flex justify-center gap-3" dir="ltr">
        {digits.map((d, i) => (
          <input
            key={i}
            id={`otp-${i}`}
            value={d}
            onChange={(e) => handleChange(i, e.target.value)}
            inputMode="numeric"
            maxLength={1}
            className="h-16 w-14 rounded-md border-2 border-ink bg-surface text-center text-h1 text-ink outline-none focus:bg-paper"
          />
        ))}
      </div>

      <button type="button" className="mx-auto mt-6 text-body-sm font-bold text-accent-blue">
        ارسال مجدد کد
      </button>

      <div className="mt-auto pt-10">
        <Button disabled={!isValid} onClick={() => router.push("/onboarding/name")}>
          تأیید
        </Button>
      </div>
    </div>
  );
}
