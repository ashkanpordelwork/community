import { Card } from "./Card";
import { Avatar } from "./Avatar";
import { cn } from "@/lib/cn";

interface EventCardProps {
  title: string;
  topic: string;
  date: string;
  location: string;
  organizerName: string;
  organizerAvatar?: string;
  accent?: "blue" | "pink" | "gold";
  held?: boolean;
  className?: string;
}

const accentMap = {
  blue: "bg-accent-blue-soft text-accent-blue",
  pink: "bg-accent-pink-soft text-accent-pink",
  gold: "bg-accent-gold-soft text-accent-gold",
};

export function EventCard({
  title,
  topic,
  date,
  location,
  organizerName,
  organizerAvatar,
  accent = "blue",
  held = false,
  className,
}: EventCardProps) {
  return (
    <Card className={cn("overflow-hidden p-5", held && "opacity-70", className)}>
      <div className="flex items-center justify-between gap-2">
        <span
          className={cn(
            "inline-block rounded-pill px-3 py-1 text-caption font-bold uppercase tracking-wide",
            accentMap[accent]
          )}
        >
          {topic}
        </span>
        {held && (
          <span className="inline-block rounded-pill border-2 border-ink bg-surface px-3 py-1 text-caption font-bold uppercase tracking-wide text-muted-strong">
            برگزار شد
          </span>
        )}
      </div>
      <h3 className="mt-3 text-h2 text-ink">{title}</h3>
      <p className="mt-1 text-body-sm text-muted">
        {date} · {location}
      </p>
      <div className="mt-4 flex items-center gap-2 border-t-2 border-border-soft pt-4">
        <Avatar name={organizerName} src={organizerAvatar} size={28} bordered={false} />
        <span className="text-body-sm font-medium text-ink">{organizerName}</span>
      </div>
    </Card>
  );
}
