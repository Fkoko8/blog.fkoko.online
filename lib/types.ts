export interface Profile {
  name: string;
  displayName: string;
  role: string;
  location: string;
  bio: string;
  avatar: string;
  cover: string;
  quote: string;
  socials: {
    instagram: string;
    youtube: string;
    strava: string;
    github: string;
  };
  stats: {
    ftp: number;
    lthr: number;
    weight: number;
    weeklyHours: string;
    monthlyKm: number;
    weeklyChange: string;
    monthlyChange: string;
    ftpChange: string;
    lthrChange: string;
    weightChange: string;
  };
}

export interface BikeSpec {
  label: string;
  value: string;
}

export interface BuildHistoryEntry {
  stage: string;
  date: string;
  description: string;
  weight: string;
}

export interface BikeUpgrade {
  component: string;
  brand: string;
  status: string;
  notes: string;
}

export interface Bike {
  name: string;
  tagline: string;
  image: string;
  weight: string;
  year: number;
  overview: string;
  specifications: BikeSpec[];
  geometry: Record<string, string>;
  buildHistory: BuildHistoryEntry[];
  setupNotes: string[];
  upgrades: BikeUpgrade[];
}

export interface PostContentBlock {
  type: 'paragraph' | 'heading' | 'quote' | 'stats';
  text?: string;
  items?: { label: string; value: string }[];
}

export interface Post {
  slug: string;
  title: string;
  category: string;
  date: string;
  readingTime: string;
  author: string;
  excerpt: string;
  image: string;
  tags: string[];
  content: PostContentBlock[];
  relatedRideId: string | null;
}

export interface Ride {
  id: string;
  title: string;
  date: string;
  distance: number;
  elevation: number;
  duration: string;
  avgSpeed: number;
  type: string;
  location: string;
  routeImage: string | null;
  notes: string;
}

export interface TrainingDay {
  day: string;
  distance: number;
  time: number;
  elevation: number;
  tss: number;
}

export interface Training {
  weeklySummary: {
    totalTime: string;
    totalDistance: number;
    totalElevation: number;
    totalTSS: number;
  };
  days: TrainingDay[];
  metrics: string[];
  plan: {
    focus: string;
    phase: string;
    weeksRemaining: number;
    weeklyTargetHours: number;
  };
}

export interface Race {
  id: string;
  name: string;
  date: string;
  location: string;
  distance: number;
  elevation: number;
  status: string;
  category: string;
  notes: string;
  position?: number;
  totalRiders?: number;
  time?: string;
}

export interface GearItem {
  id: string;
  name: string;
  category: string;
  rating: number;
  distanceTested: string;
  opinion: string;
  image: string;
}

export interface Goal {
  id: string;
  text: string;
  done: boolean;
  progress: number;
}

export interface Photo {
  id: string;
  src: string;
  caption: string;
  annotation: string | null;
  category: string;
  width: number;
  height: number;
}

export interface RouteEntry {
  id: string;
  name: string;
  distance: number;
  elevation: number;
  time: string;
  type: string;
  difficulty: string;
}

export interface Settings {
  siteName: string;
  siteTagline: string;
  siteSubheadline: string;
  navItems: { label: string; href: string }[];
  blogCategories: string[];
  routes: RouteEntry[];
}
