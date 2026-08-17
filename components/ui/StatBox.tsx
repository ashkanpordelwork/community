import { cn } from "@/lib/cn";

interface StatBoxProps {
  label: string;
  value: string;
  unit?: string;
  accentClassName?: string;
  className?: string;
}

export function StatBox({ label, value, unit, accentClassName = "text-ink", className }: StatBoxProps) {
  return (
    <div className={cn("flex-1 rounded-md border-2 border-ink bg-paper px-4 py-3", className)}>
      <p className="text-caption uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-1 text-h1">
        <span className={accentClassName}>{value}</span>
        {unit && <span className="ms-1 text-body-sm font-medium text-muted">{unit}</span>}
      </p>
    </div>
  );
}
