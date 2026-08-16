"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const items = [
  {
    href: "/feed",
    label: "فید",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 11 12 4l8 7v8a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1v-8Z"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinejoin="round"
          fill={active ? "currentColor" : "none"}
        />
      </svg>
    ),
  },
  {
    href: "/profile",
    label: "پروفایل",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth={2} fill={active ? "currentColor" : "none"} />
        <path
          d="M4.5 20c1.4-3.6 4.4-5.5 7.5-5.5s6.1 1.9 7.5 5.5"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky bottom-0 z-10 border-t-2 border-ink bg-paper">
      <div className="mx-auto flex max-w-[480px] items-center justify-around py-2">
        {items.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 rounded-md px-6 py-1.5",
                active ? "text-ink" : "text-muted"
              )}
            >
              {item.icon(active)}
              <span className="text-[11px] font-bold">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
