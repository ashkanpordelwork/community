import { MOCK_EVENTS, type MockEvent } from "./mock-data";
import { loadCreatedEvents, type Checkpoint } from "./mock-events-store";
import { loadMockSession } from "./mock-session";
import { formatJalaliDate } from "./jalali";
import { loadJoinRequestsForEvent } from "./mock-join-requests";

export const MY_ORGANIZER_ID = "me";

export interface UnifiedEvent extends MockEvent {
  description?: string;
  checkpoints?: Checkpoint[];
  capacityType?: "limited" | "open";
  capacity?: string;
  entryCondition?: string;
  isMine: boolean;
}

function fromMock(event: MockEvent): UnifiedEvent {
  return { ...event, isMine: false };
}

export function getAllEvents(): UnifiedEvent[] {
  const session = loadMockSession();
  const created = loadCreatedEvents().map((draft, index): UnifiedEvent => {
    const location = draft.checkpoints.find((c) => c.location.trim())?.location ?? "";
    return {
      id: draft.id,
      title: draft.title,
      topic: draft.topic,
      date: `${formatJalaliDate(draft.date)} · ${draft.time}`,
      dateTimeISO: `${draft.date}T${draft.time}:00`,
      location,
      organizerId: MY_ORGANIZER_ID,
      organizerName: session?.name ?? "من",
      accent: (["blue", "pink", "gold"] as const)[index % 3],
      following: false,
      description: draft.description,
      checkpoints: draft.checkpoints,
      capacityType: draft.capacityType,
      capacity: draft.capacity,
      entryCondition: draft.entryCondition,
      isMine: true,
    };
  });
  return [...created.reverse(), ...MOCK_EVENTS.map(fromMock)];
}

export function getEventById(id: string): UnifiedEvent | undefined {
  return getAllEvents().find((e) => e.id === id);
}

export function isEventHeld(event: Pick<UnifiedEvent, "dateTimeISO">): boolean {
  const time = new Date(event.dateTimeISO).getTime();
  return !Number.isNaN(time) && time < Date.now();
}

/** Held events organized by, or joined (approved) by, the given profile name. */
export function getEventHistoryFor(profileName: string): UnifiedEvent[] {
  const all = getAllEvents().filter(isEventHeld);
  const organized = all.filter((e) => e.organizerName === profileName);
  const joined = all.filter(
    (e) =>
      e.organizerName !== profileName &&
      loadJoinRequestsForEvent(e.id).some((r) => r.requesterName === profileName && r.status === "approved")
  );
  return [...organized, ...joined].sort(
    (a, b) => new Date(b.dateTimeISO).getTime() - new Date(a.dateTimeISO).getTime()
  );
}
