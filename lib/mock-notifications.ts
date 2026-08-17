export interface AppNotification {
  id: string;
  eventId: string;
  organizerName: string;
  eventTitle: string;
  createdAt: number;
  read: boolean;
}

const KEY = "kooh-notifications";

function loadAll(): AppNotification[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(KEY);
  return raw ? (JSON.parse(raw) as AppNotification[]) : [];
}

function saveAll(list: AppNotification[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(list));
}

export function loadNotifications(): AppNotification[] {
  return loadAll().sort((a, b) => b.createdAt - a.createdAt);
}

export function getUnreadCount(): number {
  return loadAll().filter((n) => !n.read).length;
}

export function markAllRead() {
  saveAll(loadAll().map((n) => ({ ...n, read: true })));
}

/** Queues a "new event" notification for a followed organizer's event (deduped by event). */
export function notifyNewEvent(eventId: string, organizerName: string, eventTitle: string) {
  const all = loadAll();
  if (all.some((n) => n.eventId === eventId)) return;
  all.push({
    id: crypto.randomUUID(),
    eventId,
    organizerName,
    eventTitle,
    createdAt: Date.now(),
    read: false,
  });
  saveAll(all);
}
