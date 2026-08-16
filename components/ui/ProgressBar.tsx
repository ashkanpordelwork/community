import { cn } from "@/lib/cn";

interface ProgressBarProps {
  value: number; // 0..100
  colorClassName?: string;
  className?: string;
}

export function ProgressBar({ value, colorClassName = "bg-ink", className }: ProgressBarProps) {
  return (
    <div className={cn("h-2.5 w-full overflow-hidden rounded-pill bg-track", className)}>
      <div
        className={cn("h-full rounded-pill transition-all", colorClassName)}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
