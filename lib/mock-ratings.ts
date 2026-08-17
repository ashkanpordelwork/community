export interface Rating {
  id: string;
  eventId: string;
  raterName: string;
  organizerName: string;
  stars: number;
  comment: string;
  createdAt: number;
}

const KEY = "kooh-ratings";

function loadAll(): Rating[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(KEY);
  return raw ? (JSON.parse(raw) as Rating[]) : [];
}

function saveAll(list: Rating[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(list));
}

export function findMyRating(eventId: string, raterName: string): Rating | undefined {
  return loadAll().find((r) => r.eventId === eventId && r.raterName === raterName);
}

export function saveRating(
  eventId: string,
  raterName: string,
  organizerName: string,
  stars: number,
  comment: string
): Rating {
  const all = loadAll();
  const existing = all.find((r) => r.eventId === eventId && r.raterName === raterName);
  if (existing) return existing;
  const rating: Rating = {
    id: crypto.randomUUID(),
    eventId,
    raterName,
    organizerName,
    stars,
    comment,
    createdAt: Date.now(),
  };
  all.push(rating);
  saveAll(all);
  return rating;
}

export function loadRatingsForOrganizer(organizerName: string): Rating[] {
  return loadAll()
    .filter((r) => r.organizerName === organizerName)
    .sort((a, b) => b.createdAt - a.createdAt);
}

/**
 * Blends a seeded baseline rating (representing the organizer's prior history)
 * with any new mock ratings collected in this session, so a single new rating
 * doesn't wildly swing a profile that already has an established score.
 */
export function getAverageRating(
  organizerName: string,
  seed?: { rating: number; count: number }
): { average: number | null; count: number } {
  const newRatings = loadRatingsForOrganizer(organizerName);
  const seedRating = seed?.rating ?? 0;
  const seedCount = seed?.count ?? 0;

  const totalCount = seedCount + newRatings.length;
  if (totalCount === 0) return { average: null, count: 0 };

  const total = seedRating * seedCount + newRatings.reduce((sum, r) => sum + r.stars, 0);
  return { average: total / totalCount, count: totalCount };
}
