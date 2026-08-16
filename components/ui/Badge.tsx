import { cn } from "@/lib/cn";

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
    <path
      d="M20 6 9 17l-5-5"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function VerifiedBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-pill bg-ink px-2.5 py-1 text-[11px] font-bold text-paper",
        className
      )}
    >
      <CheckIcon />
      تأیید شده
    </span>
  );
}
