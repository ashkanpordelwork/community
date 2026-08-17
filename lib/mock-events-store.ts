export interface Checkpoint {
  id: string;
  name: string;
  time: string;
  location: string;
  description: string;
}

export interface DraftEvent {
  id: string;
  title: string;
  topic: string;
  date: string;
  time: string;
  description: string;
  checkpoints: Checkpoint[];
  capacityType: "limited" | "open";
  capacity: string;
  entryCondition: string;
}

const KEY = "kooh-created-events";

export function saveCreatedEvent(event: Omit<DraftEvent, "id">): DraftEvent {
  const saved: DraftEvent = { ...event, id: crypto.randomUUID() };
  if (typeof window === "undefined") return saved;
  const existing = loadCreatedEvents();
  existing.push(saved);
  window.localStorage.setItem(KEY, JSON.stringify(existing));
  return saved;
}

export function loadCreatedEvents(): DraftEvent[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(KEY);
  return raw ? (JSON.parse(raw) as DraftEvent[]) : [];
}
