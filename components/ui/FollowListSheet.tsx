"use client";

import Link from "next/link";
import { BottomSheet } from "./BottomSheet";
import { Avatar } from "./Avatar";
import { VerifiedBadge } from "./Badge";

export interface FollowListPerson {
  id: string;
  name: string;
  tags: string[];
  verified?: boolean;
}

interface FollowListSheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  people: FollowListPerson[];
  emptyMessage: string;
}

export function FollowListSheet({ open, onClose, title, people, emptyMessage }: FollowListSheetProps) {
  return (
    <BottomSheet open={open} onClose={onClose}>
      <p className="text-center text-h2 text-ink">{title}</p>

      {people.length === 0 ? (
        <p className="mt-6 pb-2 text-center text-body-sm text-muted-strong">{emptyMessage}</p>
      ) : (
        <div className="mt-4 flex max-h-[55vh] flex-col gap-2 overflow-y-auto">
          {people.map((person) => (
            <Link
              key={person.id}
              href={`/profile/${person.id}`}
              onClick={onClose}
              className="flex items-center gap-3 rounded-pill px-2 py-2 active:bg-surface"
            >
              <Avatar name={person.name} size={44} />
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-body-sm font-bold text-ink">{person.name}</span>
                  {person.verified && <VerifiedBadge />}
                </div>
                {person.tags.length > 0 && (
                  <p className="text-caption text-muted-strong">{person.tags.join(" · ")}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </BottomSheet>
  );
}
