export interface Checkpoint {
  id: string;
  name: string;
  time: string;
  location: string;
  description: string;
}

export interface DraftEvent {
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

export function saveCreatedEvent(event: DraftEvent) {
  if (typeof window === "undefined") return;
  const existing = loadCreatedEvents();
  existing.push(event);
  window.localStorage.setItem(KEY, JSON.stringify(existing));
}

export function loadCreatedEvents(): DraftEvent[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(KEY);
  return raw ? (JSON.parse(raw) as DraftEvent[]) : [];
}
