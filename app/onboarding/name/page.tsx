"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "@/lib/onboarding-context";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const MAX_LEN = 20;

export default function NamePage() {
  const router = useRouter();
  const { name, setName } = useOnboarding();
  const [value, setValue] = useState(name);

  const isValid = value.trim().length >= 2;

  return (
    <div className="flex flex-1 flex-col px-6 pb-8 pt-6">
      <h1 className="text-h1 text-ink">چه نامی روی پروفایل‌تان بیاید؟</h1>
      <p className="mt-2 text-caption uppercase tracking-wide text-muted-strong">
        این نام روی پروفایل شما نمایش داده می‌شود
      </p>

      <div className="mt-10">
        <Input
          placeholder="مثلاً آرش رضایی"
          value={value}
          onChange={(e) => setValue(e.target.value.slice(0, MAX_LEN))}
          helper={`فقط حروف و فاصله · ${value.length}/${MAX_LEN}`}
        />
      </div>

      <div className="mt-auto pt-10">
        <Button
          disabled={!isValid}
          onClick={() => {
            setName(value.trim());
            router.push("/onboarding/tags");
          }}
        >
          ادامه
        </Button>
      </div>
    </div>
  );
}
