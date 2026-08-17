import { Card } from "./Card";
import { Avatar } from "./Avatar";
import { VerifiedBadge } from "./Badge";
import { Button } from "./Button";
import { cn } from "@/lib/cn";

interface ProfileCardProps {
  name: string;
  avatar?: string;
  tags: string[];
  eventsCount: number;
  rating: number;
  verified?: boolean;
  following?: boolean;
  className?: string;
}

export function ProfileCard({
  name,
  avatar,
  tags,
  eventsCount,
  rating,
  verified,
  following,
  className,
}: ProfileCardProps) {
  return (
    <Card className={cn("p-5", className)}>
      <div className="flex items-center gap-3">
        <Avatar name={name} src={avatar} size={56} />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-h2 text-ink">{name}</h3>
            {verified && <VerifiedBadge />}
          </div>
          <p className="mt-0.5 text-body-sm text-muted">
            {eventsCount} رویداد · امتیاز {rating.toFixed(1)}
          </p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-pill bg-surface px-3 py-1 text-caption font-medium text-muted-strong"
          >
            {tag}
          </span>
        ))}
      </div>
      <Button variant={following ? "secondary" : "primary"} size="sm" className="mt-4">
        {following ? "دنبال می‌کنید" : "دنبال کردن"}
      </Button>
    </Card>
  );
}
