export interface MockEvent {
  id: string;
  title: string;
  topic: string;
  date: string;
  location: string;
  organizerId: string;
  organizerName: string;
  accent: "blue" | "pink" | "gold";
  following: boolean;
}

export const MOCK_EVENTS: MockEvent[] = [
  {
    id: "1",
    title: "صعود به قله توچال از مسیر ۷",
    topic: "کوهنوردی",
    date: "۲۵ مرداد · ۰۵:۰۰",
    location: "تهران",
    organizerId: "1",
    organizerName: "آرش رضایی",
    accent: "blue",
    following: true,
  },
  {
    id: "2",
    title: "پیمایش دره کهریزک",
    topic: "طبیعت‌گردی",
    date: "۲۸ مرداد · ۰۶:۳۰",
    location: "کرج",
    organizerId: "2",
    organizerName: "مریم احمدی",
    accent: "gold",
    following: false,
  },
  {
    id: "3",
    title: "دویدن گروهی پارک جنگلی",
    topic: "دویدن",
    date: "۱ شهریور · ۱۷:۰۰",
    location: "تهران",
    organizerId: "1",
    organizerName: "آرش رضایی",
    accent: "pink",
    following: true,
  },
];

export interface MockProfileSummary {
  id: string;
  name: string;
  tags: string[];
  eventsCount: number;
  rating: number;
  verified: boolean;
  following: boolean;
  followers: number;
  followingCount: number;
  social?: string;
}

export const MOCK_PROFILES: MockProfileSummary[] = [
  {
    id: "1",
    name: "آرش رضایی",
    tags: ["کوهنوردی", "دویدن"],
    eventsCount: 24,
    rating: 4.8,
    verified: true,
    following: true,
    followers: 312,
    followingCount: 48,
    social: "instagram.com/arash.rezaei",
  },
  {
    id: "2",
    name: "مریم احمدی",
    tags: ["طبیعت‌گردی"],
    eventsCount: 9,
    rating: 4.5,
    verified: false,
    following: false,
    followers: 87,
    followingCount: 120,
  },
];
