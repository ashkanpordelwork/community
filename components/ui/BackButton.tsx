import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes } from "react";

export function BackButton({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-label="بازگشت"
      className={cn(
        "flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink bg-paper",
        className
      )}
      {...props}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="rtl:scale-x-[-1]">
        <path
          d="M5 12h14M5 12l6-6M5 12l6 6"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
