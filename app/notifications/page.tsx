"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BackButton } from "@/components/ui/BackButton";
import { Avatar } from "@/components/ui/Avatar";
import { loadNotifications, markAllRead, type AppNotification } from "@/lib/mock-notifications";

export default function NotificationsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  useEffect(() => {
    setNotifications(loadNotifications());
    markAllRead();
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-[480px] flex-1 flex-col px-6 pb-8 pt-6">
      <div className="flex items-center gap-4">
        <BackButton onClick={() => router.back()} />
        <h1 className="text-h1 text-ink">اعلان‌ها</h1>
      </div>

      {notifications.length === 0 ? (
        <p className="mt-10 text-center text-body-sm text-muted-strong">
          هنوز اعلانی ندارید — وقتی افرادی که دنبال می‌کنید رویداد جدید منتشر کنند، اینجا می‌بینید
        </p>
      ) : (
        <div className="mt-6 flex flex-col gap-2">
          {notifications.map((n) => (
            <Link
              key={n.id}
              href={`/events/${n.eventId}`}
              className="flex items-center gap-3 rounded-pill px-2 py-2 active:bg-surface"
            >
              <Avatar name={n.organizerName} size={44} />
              <p className="flex-1 text-body-sm text-ink">
                <span className="font-bold">{n.organizerName}</span> یک رویداد جدید منتشر کرد:{" "}
                <span className="font-bold">{n.eventTitle}</span>
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
