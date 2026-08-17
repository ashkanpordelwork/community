"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BackButton } from "@/components/ui/BackButton";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Card } from "@/components/ui/Card";
import { PickerField } from "@/components/ui/PickerField";
import { DateWheelPicker, TimeWheelPicker } from "@/components/ui/DateTimeWheel";
import { formatJalaliDate } from "@/lib/jalali";
import { saveCreatedEvent, type Checkpoint } from "@/lib/mock-events-store";
import { seedDemoRequests } from "@/lib/mock-join-requests";

const TOPIC_SUGGESTIONS = ["کوهنوردی", "دویدن", "دوچرخه‌سواری", "طبیعت‌گردی", "دورهمی"];

function newCheckpoint(): Checkpoint {
  return { id: crypto.randomUUID(), name: "", time: "", location: "", description: "" };
}

function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function CreateEventPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [customTopic, setCustomTopic] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);
  const [capacityType, setCapacityType] = useState<"limited" | "open">("limited");
  const [capacity, setCapacity] = useState("");
  const [entryCondition, setEntryCondition] = useState("");

  const effectiveTopic = topic || customTopic.trim();
  const isValid = title.trim().length >= 3 && effectiveTopic.length > 0 && date && time;

  const updateCheckpoint = (id: string, patch: Partial<Checkpoint>) => {
    setCheckpoints((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  };

  const removeCheckpoint = (id: string) => {
    setCheckpoints((prev) => prev.filter((c) => c.id !== id));
  };

  const publish = () => {
    const created = saveCreatedEvent({
      title: title.trim(),
      topic: effectiveTopic,
      date,
      time,
      description,
      checkpoints,
      capacityType,
      capacity,
      entryCondition,
    });
    seedDemoRequests(created.id);
    router.push(`/events/${created.id}`);
  };

  return (
    <div className="mx-auto flex w-full max-w-[480px] flex-1 flex-col px-6 pb-10 pt-6">
      <div className="flex items-center gap-4">
        <BackButton onClick={() => router.back()} />
        <h1 className="text-h1 text-ink">رویداد جدید</h1>
      </div>

      <div className="mt-8 flex flex-col gap-2">
        <span className="px-1 text-caption uppercase tracking-wide text-muted-strong">عنوان رویداد</span>
        <Input
          placeholder="مثلاً صعود به قله دماوند"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="!text-body text-right"
        />
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <span className="px-1 text-caption uppercase tracking-wide text-muted-strong">تاپیک</span>
        <div className="flex flex-wrap gap-2">
          {TOPIC_SUGGESTIONS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => {
                setTopic(t);
                setCustomTopic("");
              }}
              className={`h-10 rounded-pill border-2 border-ink px-4 text-body-sm font-bold ${
                topic === t ? "bg-ink text-paper" : "bg-paper text-ink"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <Input
          placeholder="یا یک تاپیک دلخواه بنویس..."
          value={customTopic}
          onChange={(e) => {
            setCustomTopic(e.target.value);
            setTopic("");
          }}
          className="!h-11 !text-body text-right"
        />
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <span className="px-1 text-caption uppercase tracking-wide text-muted-strong">تاریخ</span>
        <PickerField
          label="تاریخ رویداد"
          value={date}
          defaultDraft={todayISO()}
          displayValue={formatJalaliDate}
          onConfirm={setDate}
          renderPicker={(draft, setDraft) => <DateWheelPicker value={draft} onChange={setDraft} />}
        />
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <span className="px-1 text-caption uppercase tracking-wide text-muted-strong">ساعت</span>
        <PickerField
          label="ساعت شروع"
          value={time}
          defaultDraft="08:00"
          displayValue={(v) => v}
          onConfirm={setTime}
          renderPicker={(draft, setDraft) => <TimeWheelPicker value={draft} onChange={setDraft} />}
        />
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <span className="px-1 text-caption uppercase tracking-wide text-muted-strong">توضیحات</span>
        <Textarea
          placeholder="جزئیات مسیر، سختی، وسایل موردنیاز..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-h2 text-ink">نقاط توقف (Checkpoint)</h2>
          <Button
            variant="outline"
            size="sm"
            fullWidth={false}
            onClick={() => setCheckpoints((prev) => [...prev, newCheckpoint()])}
          >
            + افزودن
          </Button>
        </div>

        {checkpoints.length === 0 && (
          <p className="mt-3 text-body-sm text-muted-strong">هنوز نقطهٔ توقفی اضافه نشده</p>
        )}

        <div className="mt-4 flex flex-col gap-4">
          {checkpoints.map((cp, i) => (
            <Card key={cp.id} className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-caption font-bold uppercase tracking-wide text-muted">
                  نقطهٔ {i + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeCheckpoint(cp.id)}
                  className="text-caption font-bold text-accent-pink"
                >
                  حذف
                </button>
              </div>
              <div className="mt-3 flex flex-col gap-3">
                <input
                  placeholder="نام نقطه"
                  value={cp.name}
                  onChange={(e) => updateCheckpoint(cp.id, { name: e.target.value })}
                  className="h-11 w-full rounded-pill border-2 border-transparent bg-surface px-4 text-body-sm text-ink outline-none focus:border-ink focus:bg-paper"
                />
                <input
                  placeholder="مکان"
                  value={cp.location}
                  onChange={(e) => updateCheckpoint(cp.id, { location: e.target.value })}
                  className="h-11 w-full rounded-pill border-2 border-transparent bg-surface px-4 text-body-sm text-ink outline-none focus:border-ink focus:bg-paper"
                />
                <div>
                  <span className="px-1 text-caption uppercase tracking-wide text-muted">
                    ساعت رسیدن
                  </span>
                  <div className="mt-1">
                    <PickerField
                      label="ساعت رسیدن"
                      value={cp.time}
                      defaultDraft="08:00"
                      displayValue={(v) => v}
                      onConfirm={(v) => updateCheckpoint(cp.id, { time: v })}
                      renderPicker={(draft, setDraft) => (
                        <TimeWheelPicker value={draft} onChange={setDraft} />
                      )}
                    />
                  </div>
                </div>
                <input
                  placeholder="توضیح کوتاه (اختیاری)"
                  value={cp.description}
                  onChange={(e) => updateCheckpoint(cp.id, { description: e.target.value })}
                  className="h-11 w-full rounded-pill border-2 border-transparent bg-surface px-4 text-body-sm text-ink outline-none focus:border-ink focus:bg-paper"
                />
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-h2 text-ink">ظرفیت</h2>
        <div className="mt-3 flex gap-2">
          <Chip selected={capacityType === "limited"} onClick={() => setCapacityType("limited")}>
            محدود
          </Chip>
          <Chip selected={capacityType === "open"} onClick={() => setCapacityType("open")}>
            آزاد
          </Chip>
        </div>
        {capacityType === "limited" && (
          <input
            type="number"
            inputMode="numeric"
            placeholder="حداکثر تعداد نفرات"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            className="mt-3 h-14 w-full rounded-pill border-2 border-transparent bg-surface px-4 text-body text-ink outline-none focus:border-ink focus:bg-paper"
          />
        )}
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <span className="px-1 text-caption uppercase tracking-wide text-muted-strong">
          شرط ورود (اختیاری)
        </span>
        <Input
          placeholder="مثلاً داشتن سابقهٔ کوهنوردی ارتفاع بالا"
          value={entryCondition}
          onChange={(e) => setEntryCondition(e.target.value)}
          className="!text-body text-right"
        />
      </div>

      <div className="mt-10">
        <Button disabled={!isValid} onClick={publish}>
          انتشار رویداد
        </Button>
      </div>
    </div>
  );
}
