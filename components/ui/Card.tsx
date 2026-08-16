import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-lg border-2 border-ink bg-paper shadow-hard",
        className
      )}
      {...props}
    />
  );
}
