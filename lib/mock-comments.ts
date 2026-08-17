export interface Comment {
  id: string;
  eventId: string;
  authorName: string;
  text: string;
  createdAt: number;
}

const KEY = "kooh-comments";

function loadAll(): Comment[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(KEY);
  return raw ? (JSON.parse(raw) as Comment[]) : [];
}

function saveAll(list: Comment[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(list));
}

export function loadCommentsForEvent(eventId: string): Comment[] {
  return loadAll()
    .filter((c) => c.eventId === eventId)
    .sort((a, b) => a.createdAt - b.createdAt);
}

export function addComment(eventId: string, authorName: string, text: string): Comment {
  const comment: Comment = {
    id: crypto.randomUUID(),
    eventId,
    authorName,
    text,
    createdAt: Date.now(),
  };
  const all = loadAll();
  all.push(comment);
  saveAll(all);
  return comment;
}
