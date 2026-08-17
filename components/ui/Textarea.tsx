import { cn } from "@/lib/cn";
import type { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  helper?: string;
}

export function Textarea({ error, helper, className, id, ...props }: TextareaProps) {
  return (
    <div className="w-full">
      <textarea
        id={id}
        className={cn(
          "min-h-28 w-full rounded-md border-2 bg-surface px-4 py-3 text-body text-ink outline-none transition-colors placeholder:text-muted",
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
