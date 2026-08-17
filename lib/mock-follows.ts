import { MOCK_PROFILES, type MockProfileSummary } from "./mock-data";

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

/** The real, mock-user-authored list of profiles the current user follows. */
export function getFollowingProfiles(): MockProfileSummary[] {
  const ids = loadFollowing();
  return MOCK_PROFILES.filter((p) => ids.includes(p.id));
}

// Seed profiles have no real per-account follow graph (only the current mock
// user's follows are tracked in localStorage), so who they follow is fixed
// mock data — just enough for the "mutual follows" section to have something
// real to intersect against.
const SEED_FOLLOWING: Record<string, string[]> = {
  "1": ["2"],
  "2": ["1"],
};

/** Profiles that both the current user and `targetProfileId` follow. */
export function getMutualFollows(targetProfileId: string): MockProfileSummary[] {
  const myFollowingIds = new Set(loadFollowing());
  const theirFollowingIds = SEED_FOLLOWING[targetProfileId] ?? [];
  const mutualIds = theirFollowingIds.filter(
    (id) => myFollowingIds.has(id) && id !== targetProfileId
  );
  return MOCK_PROFILES.filter((p) => mutualIds.includes(p.id));
}

export interface SuggestedProfile {
  profile: MockProfileSummary;
  sharedTags: string[];
}

/** People not already followed, ranked by number of tags shared with `myTags`. */
export function getSuggestedProfiles(myTags: string[], limit = 5): SuggestedProfile[] {
  const myTagSet = new Set(myTags);
  const followedIds = new Set(loadFollowing());

  return MOCK_PROFILES.filter((p) => !followedIds.has(p.id))
    .map((profile) => ({
      profile,
      sharedTags: profile.tags.filter((t) => myTagSet.has(t)),
    }))
    .filter((entry) => entry.sharedTags.length > 0)
    .sort((a, b) => b.sharedTags.length - a.sharedTags.length)
    .slice(0, limit);
}
