export interface MockProfile {
  phone: string;
  name: string;
  tags: string[];
  avatarDataUrl: string | null;
}

const KEY = "kooh-mock-session";

export function saveMockSession(profile: MockProfile) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(profile));
}

export function loadMockSession(): MockProfile | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(KEY);
  return raw ? (JSON.parse(raw) as MockProfile) : null;
}
