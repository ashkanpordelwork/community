import { cn } from "@/lib/cn";

function Star({ filled, size = 20 }: { filled: boolean; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"}>
      <path
        d="m12 3 2.9 5.88 6.49.94-4.7 4.58 1.11 6.47L12 17.77l-5.8 3.1 1.11-6.47-4.7-4.58 6.49-.94L12 3Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface StarRatingProps {
  value: number;
  outOf?: number;
  size?: number;
  className?: string;
}

/** Read-only star display, filled up to the nearest whole star. */
export function StarRating({ value, outOf = 5, size = 18, className }: StarRatingProps) {
  const filledCount = Math.round(value);
  return (
    <div className={cn("flex items-center gap-0.5 text-accent-gold", className)}>
      {Array.from({ length: outOf }, (_, i) => (
        <Star key={i} filled={i < filledCount} size={size} />
      ))}
    </div>
  );
}

interface StarRatingInputProps {
  value: number;
  onChange: (value: number) => void;
  outOf?: number;
  size?: number;
  className?: string;
}

/** Interactive tap-to-select star rating. */
export function StarRatingInput({ value, onChange, outOf = 5, size = 32, className }: StarRatingInputProps) {
  return (
    <div className={cn("flex items-center gap-1 text-accent-gold", className)}>
      {Array.from({ length: outOf }, (_, i) => {
        const starValue = i + 1;
        return (
          <button
            key={i}
            type="button"
            aria-label={`${starValue} ستاره`}
            onClick={() => onChange(starValue)}
            className="p-0.5"
          >
            <Star filled={starValue <= value} size={size} />
          </button>
        );
      })}
    </div>
  );
}
