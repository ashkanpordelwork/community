"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/lib/onboarding-context";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function PhonePage() {
  const router = useRouter();
  const { phone, setPhone } = useOnboarding();
  const [value, setValue] = useState(phone);

  const isValid = /^09\d{9}$/.test(value);

  return (
    <div className="flex flex-1 flex-col px-6 pb-8 pt-6">
      <h1 className="text-h1 text-ink">شمارهٔ موبایل‌تان چیست؟</h1>
      <p className="mt-2 text-caption uppercase tracking-wide text-muted-strong">
        کد تأیید برای همین شماره پیامک می‌شود
      </p>

      <div className="mt-10">
        <Input
          type="tel"
          inputMode="numeric"
          placeholder="۰۹۱۲۳۴۵۶۷۸۹"
          value={value}
          onChange={(e) => setValue(e.target.value.replace(/[^\d]/g, ""))}
          maxLength={11}
        />
      </div>

      <div className="mt-auto pt-10">
        <Button
          disabled={!isValid}
          onClick={() => {
            setPhone(value);
            router.push("/onboarding/otp");
          }}
        >
          ادامه
        </Button>
      </div>
    </div>
  );
}
