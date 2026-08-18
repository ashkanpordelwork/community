import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

export default function OnboardingIndex() {
  return (
    <div className="relative flex flex-1 flex-col items-center overflow-hidden px-6 pb-8 pt-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-accent-gold-soft"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 left-1/2 h-[260px] w-[260px] -translate-x-1/2 rounded-full bg-accent-pink-soft/60"
      />

      <div className="relative flex flex-1 flex-col items-center justify-center text-center">
        <Logo size={104} className="text-ink" />

        <span dir="ltr" className="mt-6 text-display font-black tracking-tight text-ink">
          Circle
        </span>

        <p className="mt-3 max-w-[280px] text-h2 font-bold text-ink">
          هر حلقه، یه ماجراجویی جدید
        </p>
      </div>

      <div className="relative flex w-full flex-col gap-4 pb-2">
        <Link href="/onboarding/phone">
          <Button>بیا شروع کنیم</Button>
        </Link>
      </div>
    </div>
  );
}
