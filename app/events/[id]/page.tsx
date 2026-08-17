"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Textarea } from "@/components/ui/Textarea";
import { StarRating, StarRatingInput } from "@/components/ui/StarRating";
import { getEventById, isEventHeld, type UnifiedEvent } from "@/lib/events";
import { loadMockSession } from "@/lib/mock-session";
import { MOCK_PROFILES } from "@/lib/mock-data";
import {
  createJoinRequest,
  loadJoinRequestsForEvent,
  updateJoinRequestStatus,
  type JoinRequest,
} from "@/lib/mock-join-requests";
import { findMyRating, getAverageRating, saveRating, type Rating } from "@/lib/mock-ratings";
import { addComment, loadCommentsForEvent, type Comment } from "@/lib/mock-comments";

const accentMap = {
  blue: "bg-accent-blue-soft text-accent-blue",
  pink: "bg-accent-pink-soft text-accent-pink",
  gold: "bg-accent-gold-soft text-accent-gold",
};

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [event, setEvent] = useState<UnifiedEvent | null | undefined>(undefined);
  const [myName, setMyName] = useState<string | null>(null);
  const [requests, setRequests] = useState<JoinRequest[]>([]);
  const [myRating, setMyRating] = useState<Rating | undefined>(undefined);
  const [draftStars, setDraftStars] = useState(0);
  const [draftComment, setDraftComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  const refreshRequests = () => setRequests(loadJoinRequestsForEvent(id));
  const refreshComments = () => setComments(loadCommentsForEvent(id));

  useEffect(() => {
    setEvent(getEventById(id) ?? null);
    const name = loadMockSession()?.name ?? null;
    setMyName(name);
    if (name) setMyRating(findMyRating(id, name));
    refreshRequests();
    refreshComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (event === undefined) return null;

  if (!event) {
    return (
      <div className="mx-auto flex w-full max-w-[480px] flex-1 flex-col items-center justify-center px-6 pb-8 pt-6 text-center">
        <p className="text-body text-ink">این رویداد پیدا نشد</p>
        <Button variant="outline" size="sm" fullWidth={false} className="mt-4" onClick={() => router.push("/feed")}>
          بازگشت به فید
        </Button>
      </div>
    );
  }

  const held = isEventHeld(event);
  const myRequest = myName ? requests.find((r) => r.requesterName === myName) : undefined;
  const pending = requests.filter((r) => r.status === "pending");
  const approved = requests.filter((r) => r.status === "approved");
  const parsedCapacity = Number(event.capacity);
  const capacityLimit =
    event.capacityType === "limited" && event.capacity && !Number.isNaN(parsedCapacity) && parsedCapacity > 0
      ? parsedCapacity
      : null;
  const capacityFull = capacityLimit !== null && approved.length >= capacityLimit;

  const respond = (requestId: string, status: "approved" | "rejected") => {
    updateJoinRequestStatus(requestId, status);
    refreshRequests();
  };

  const requestToJoin = () => {
    if (!myName) return;
    createJoinRequest(event.id, myName);
    refreshRequests();
  };

  const submitRating = () => {
    if (!myName || draftStars === 0) return;
    const rating = saveRating(event.id, myName, event.organizerName, draftStars, draftComment.trim());
    setMyRating(rating);
  };

  const submitComment = () => {
    const text = newComment.trim();
    if (!myName || !text) return;
    addComment(event.id, myName, text);
    setNewComment("");
    refreshComments();
  };

  const organizerSeedProfile = MOCK_PROFILES.find((p) => p.id === event.organizerId);
  const organizerRating = getAverageRating(
    event.organizerName,
    organizerSeedProfile
      ? { rating: organizerSeedProfile.rating, count: organizerSeedProfile.eventsCount }
      : undefined
  );

  return (
    <div className="mx-auto flex w-full max-w-[480px] flex-1 flex-col px-6 pb-8 pt-6">
      <BackButton onClick={() => router.back()} />

      <div className="mt-5 flex items-center gap-2">
        <span
          className={`inline-block w-fit rounded-pill px-3 py-1 text-caption font-bold uppercase tracking-wide ${accentMap[event.accent]}`}
        >
          {event.topic}
        </span>
        {held && (
          <span className="inline-block w-fit rounded-pill border-2 border-ink bg-surface px-3 py-1 text-caption font-bold uppercase tracking-wide text-muted-strong">
            برگزار شد
          </span>
        )}
      </div>
      <h1 className="mt-3 text-h1 text-ink">{event.title}</h1>
      <p className="mt-2 text-body-sm text-muted-strong">
        {event.date}
        {event.location ? ` · ${event.location}` : ""}
      </p>

      <Card className="mt-6 flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Avatar name={event.organizerName} size={44} />
          <div>
            <p className="text-body font-bold text-ink">{event.organizerName}</p>
            {organizerRating.average !== null ? (
              <div className="mt-0.5 flex items-center gap-1.5">
                <StarRating value={organizerRating.average} size={14} />
                <span className="text-caption text-muted-strong">
                  {organizerRating.average.toFixed(1)} ({organizerRating.count})
                </span>
              </div>
            ) : (
              <p className="text-caption text-muted-strong">برگزارکننده</p>
            )}
          </div>
        </div>
        {!event.isMine && (
          <Link href={`/profile/${event.organizerId}`}>
            <Button variant="secondary" size="sm" fullWidth={false}>
              مشاهدهٔ پروفایل
            </Button>
          </Link>
        )}
      </Card>

      <div className="mt-6">
        <h2 className="text-h2 text-ink">توضیحات</h2>
        <p className="mt-2 text-body text-muted-strong">
          {event.description?.trim() ||
            "این یک رویداد نمونه است. جزئیات مسیر، شرایط ورود و نقاط توقف در نسخهٔ نهایی این بخش نمایش داده می‌شود."}
        </p>
      </div>

      {event.isMine ? (
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-h2 text-ink">درخواست‌های شرکت</h2>
            {capacityLimit !== null && (
              <span className="text-caption font-bold text-muted-strong">
                {approved.length} از {capacityLimit} نفر
              </span>
            )}
          </div>

          {(held ? approved.length === 0 : pending.length === 0 && approved.length === 0) && (
            <p className="mt-3 text-body-sm text-muted-strong">
              {held ? "کسی در این رویداد شرکت نکرد" : "هنوز کسی درخواست شرکت نداده"}
            </p>
          )}

          {!held && pending.length > 0 && (
            <div className="mt-4 flex flex-col gap-3">
              {pending.map((r) => (
                <Card key={r.id} className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={r.requesterName} size={40} />
                    <span className="text-body-sm font-bold text-ink">{r.requesterName}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="accent-blue"
                      size="sm"
                      fullWidth={false}
                      disabled={capacityFull}
                      onClick={() => respond(r.id, "approved")}
                    >
                      تأیید
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      fullWidth={false}
                      onClick={() => respond(r.id, "rejected")}
                    >
                      رد
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {approved.length > 0 && (
            <div className="mt-4">
              <p className="text-caption uppercase tracking-wide text-muted-strong">شرکت‌کنندگان تأییدشده</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {approved.map((r) => (
                  <span
                    key={r.id}
                    className="flex items-center gap-2 rounded-pill border-2 border-ink bg-paper py-1 pe-3 ps-1 text-body-sm font-medium text-ink"
                  >
                    <Avatar name={r.requesterName} size={24} bordered={false} />
                    {r.requesterName}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : held ? (
        <div className="mt-8">
          {myRequest?.status === "approved" ? (
            <>
              <p className="text-center text-body-sm font-bold text-success">
                شما در این رویداد شرکت کردید ✓
              </p>
              <div className="mt-6">
                <h2 className="text-h2 text-ink">امتیازدهی به برگزارکننده</h2>
                {myRating ? (
                  <Card className="mt-3 p-4">
                    <StarRating value={myRating.stars} size={22} />
                    {myRating.comment && (
                      <p className="mt-2 text-body-sm text-muted-strong">{myRating.comment}</p>
                    )}
                  </Card>
                ) : (
                  <Card className="mt-3 flex flex-col items-center gap-3 p-4">
                    <StarRatingInput value={draftStars} onChange={setDraftStars} />
                    <Textarea
                      placeholder="نظر شما دربارهٔ این رویداد (اختیاری)"
                      value={draftComment}
                      onChange={(e) => setDraftComment(e.target.value)}
                      className="min-h-20"
                    />
                    <Button
                      variant="accent-blue"
                      size="sm"
                      fullWidth={false}
                      className="px-10"
                      disabled={draftStars === 0}
                      onClick={submitRating}
                    >
                      ثبت امتیاز
                    </Button>
                  </Card>
                )}
              </div>
            </>
          ) : (
            <p className="text-center text-body-sm text-muted-strong">این رویداد برگزار شده است</p>
          )}
        </div>
      ) : (
        <div className="mt-8">
          {myRequest?.status === "approved" && (
            <p className="mb-3 text-center text-body-sm font-bold text-success">
              درخواست شما تأیید شد ✓
            </p>
          )}
          {myRequest?.status === "rejected" && (
            <p className="mb-3 text-center text-body-sm font-bold text-accent-pink">
              درخواست شما رد شد
            </p>
          )}
          <Button
            variant={myRequest?.status === "approved" ? "secondary" : "accent-blue"}
            disabled={!!myRequest}
            onClick={requestToJoin}
          >
            {myRequest?.status === "pending"
              ? "در انتظار تأیید برگزارکننده"
              : myRequest?.status === "approved"
                ? "شرکت شما تأیید شده"
                : myRequest?.status === "rejected"
                  ? "درخواست رد شد"
                  : "درخواست شرکت"}
          </Button>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-h2 text-ink">نظرات</h2>
        <div className="mt-4 flex flex-col gap-3">
          {comments.length === 0 && (
            <p className="text-body-sm text-muted-strong">هنوز نظری ثبت نشده</p>
          )}
          {comments.map((c) => (
            <Card key={c.id} className="p-3">
              <div className="flex items-center gap-2">
                <Avatar name={c.authorName} size={28} bordered={false} />
                <span className="text-body-sm font-bold text-ink">{c.authorName}</span>
              </div>
              <p className="mt-2 text-body-sm text-muted-strong">{c.text}</p>
            </Card>
          ))}
        </div>

        {myName && (
          <div className="mt-4 flex items-end gap-2">
            <input
              placeholder="نظرت رو بنویس..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submitComment()}
              className="h-12 flex-1 rounded-pill border-2 border-transparent bg-surface px-5 text-body-sm text-ink outline-none focus:border-ink focus:bg-paper"
            />
            <Button
              variant="accent-blue"
              size="sm"
              fullWidth={false}
              disabled={!newComment.trim()}
              onClick={submitComment}
            >
              ارسال
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
