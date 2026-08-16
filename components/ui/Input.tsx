import { cn } from "@/lib/cn";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  helper?: string;
}

export function Input({ error, helper, className, id, ...props }: InputProps) {
  return (
    <div className="w-full">
      <input
        id={id}
        className={cn(
          "h-14 w-full rounded-pill border-2 bg-surface px-6 text-center text-h2 text-ink outline-none transition-colors placeholder:text-muted",
          "focus:border-ink focus:bg-paper",
          error ? "border-accent-pink bg-paper" : "border-transparent",
          className
        )}
        {...props}
      />
      {(helper || error) && (
        <p
          className={cn(
            "mt-2 px-2 text-caption uppercase tracking-wide",
            error ? "text-accent-pink" : "text-muted"
          )}
        >
          {error || helper}
        </p>
      )}
    </div>
  );
}
