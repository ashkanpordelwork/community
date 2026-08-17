export type JoinRequestStatus = "pending" | "approved" | "rejected";

export interface JoinRequest {
  id: string;
  eventId: string;
  requesterName: string;
  status: JoinRequestStatus;
  createdAt: number;
}

const KEY = "kooh-join-requests";

const DEMO_REQUESTERS = ["آرش رضایی", "مریم احمدی"];

function loadAll(): JoinRequest[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(KEY);
  return raw ? (JSON.parse(raw) as JoinRequest[]) : [];
}

function saveAll(list: JoinRequest[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(list));
}

export function loadJoinRequestsForEvent(eventId: string): JoinRequest[] {
  return loadAll()
    .filter((r) => r.eventId === eventId)
    .sort((a, b) => a.createdAt - b.createdAt);
}

export function findMyRequest(eventId: string, requesterName: string): JoinRequest | undefined {
  return loadAll().find((r) => r.eventId === eventId && r.requesterName === requesterName);
}

export function createJoinRequest(eventId: string, requesterName: string): JoinRequest {
  const all = loadAll();
  const existing = all.find((r) => r.eventId === eventId && r.requesterName === requesterName);
  if (existing) return existing;
  const request: JoinRequest = {
    id: crypto.randomUUID(),
    eventId,
    requesterName,
    status: "pending",
    createdAt: Date.now(),
  };
  all.push(request);
  saveAll(all);
  return request;
}

export function updateJoinRequestStatus(id: string, status: JoinRequestStatus) {
  const all = loadAll();
  const next = all.map((r) => (r.id === id ? { ...r, status } : r));
  saveAll(next);
}

// Seeds a couple of sample incoming requests on a freshly-created event so the
// approve/reject flow has something to demonstrate against (mock data only).
export function seedDemoRequests(eventId: string) {
  const all = loadAll();
  if (all.some((r) => r.eventId === eventId)) return;
  const seeded = DEMO_REQUESTERS.map((name) => ({
    id: crypto.randomUUID(),
    eventId,
    requesterName: name,
    status: "pending" as const,
    createdAt: Date.now(),
  }));
  saveAll([...all, ...seeded]);
}
