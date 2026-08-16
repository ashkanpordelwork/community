import { cn } from "@/lib/cn";
import Image from "next/image";

interface AvatarProps {
  src?: string;
  name: string;
  size?: number;
  bordered?: boolean;
  className?: string;
}

export function Avatar({ src, name, size = 48, bordered = true, className }: AvatarProps) {
  const initial = name.trim().charAt(0);
  return (
    <div
      style={{ width: size, height: size }}
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full bg-surface-strong",
        bordered && "border-2 border-ink",
        className
      )}
    >
      {src ? (
        <Image src={src} alt={name} fill className="object-cover" />
      ) : (
        <span
          className="flex h-full w-full items-center justify-center font-bold text-ink"
          style={{ fontSize: size * 0.4 }}
        >
          {initial}
        </span>
      )}
    </div>
  );
}
