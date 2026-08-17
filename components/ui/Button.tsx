import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "accent-blue" | "accent-pink" | "secondary" | "outline";
type Size = "md" | "sm";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  /**
   * Whether to render the hard offset shadow. Defaults to `size === "md"` —
   * full-size buttons are page-level primary CTAs and keep the shadow;
   * `sm` buttons are secondary/contextual actions (inside cards, list rows,
   * next to other controls) and stay flat. Pass explicitly to override.
   */
  shadow?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary: "bg-ink text-paper border-ink",
  "accent-blue": "bg-accent-blue text-paper border-ink",
  "accent-pink": "bg-accent-pink text-paper border-ink",
  secondary: "bg-paper text-ink border-ink",
  outline: "bg-paper text-ink border-ink shadow-none",
};

const sizeClasses: Record<Size, string> = {
  md: "h-14 px-6 text-button",
  sm: "h-11 px-5 text-[13px]",
};

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = true,
  shadow,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  const hasShadow = shadow ?? size === "md";
  const stateClasses = disabled
    ? "bg-faded border-faded text-paper shadow-none"
    : cn(variant !== "outline" && hasShadow && "shadow-hard", variantClasses[variant]);

  return (
    <button
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-pill border-2 font-bold tracking-wide transition-transform duration-100 disabled:pointer-events-none",
        !disabled && "active:translate-x-[-2px] active:translate-y-[2px] active:shadow-none",
        stateClasses,
        sizeClasses[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
