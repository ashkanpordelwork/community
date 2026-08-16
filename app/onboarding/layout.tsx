"use client";

import { usePathname, useRouter } from "next/navigation";
import { OnboardingProvider } from "@/lib/onboarding-context";
import { StepProgress } from "@/components/ui/StepProgress";

const STEP_ORDER = ["phone", "otp", "name", "tags", "photo"];

function StepHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const current = pathname.split("/").pop() ?? "";
  const stepIndex = STEP_ORDER.indexOf(current);
  if (stepIndex === -1) return null;

  return (
    <div className="px-6 pt-6">
      <StepProgress
        step={stepIndex + 1}
        totalSteps={STEP_ORDER.length}
        onBack={() => router.back()}
      />
    </div>
  );
}

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <OnboardingProvider>
      <div className="mx-auto flex w-full max-w-[480px] flex-1 flex-col">
        <StepHeader />
        {children}
      </div>
    </OnboardingProvider>
  );
}
