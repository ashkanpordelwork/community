const KEY = "kooh-following";

function loadFollowing(): string[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(KEY);
  return raw ? (JSON.parse(raw) as string[]) : [];
}

function saveFollowing(ids: string[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(ids));
}

export function isFollowing(profileId: string): boolean {
  return loadFollowing().includes(profileId);
}

export function toggleFollow(profileId: string): boolean {
  const ids = loadFollowing();
  const idx = ids.indexOf(profileId);
  if (idx === -1) {
    ids.push(profileId);
    saveFollowing(ids);
    return true;
  }
  ids.splice(idx, 1);
  saveFollowing(ids);
  return false;
}

export function getFollowingCount(): number {
  return loadFollowing().length;
}
