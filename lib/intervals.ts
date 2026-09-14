import type { Ride } from '@/lib/types';

interface IntervalsActivity {
  id: string | number;
  name: string;
  type: string;
  start_date_local?: string;
  start_date?: string;
  distance?: number;
  moving_time?: number;
  total_elevation_gain?: number;
  average_speed?: number;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  description?: string | null;
}

const formatDuration = (seconds = 0) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const formatLocation = (activity: IntervalsActivity) =>
  [activity.city, activity.state, activity.country].filter(Boolean).join(', ') || 'Intervals.icu activity';

export const mapIntervalsActivity = (activity: IntervalsActivity): Ride => ({
  id: `intervals-${activity.id}`,
  title: activity.name,
  date: activity.start_date_local || activity.start_date || new Date().toISOString(),
  distance: Math.round(((activity.distance || 0) / 1000) * 10) / 10,
  elevation: Math.round(activity.total_elevation_gain || 0),
  duration: formatDuration(activity.moving_time),
  avgSpeed: Math.round((activity.average_speed || 0) * 3.6 * 10) / 10,
  type: activity.type.replace('VirtualRide', 'Virtual Ride'),
  location: formatLocation(activity),
  routeImage: null,
  notes: activity.description || 'Activity imported from Intervals.icu.',
  activityUrl: `https://intervals.icu/activities/${activity.id}`,
});

export async function getIntervalsActivities() {
  const athleteId = process.env.INTERVALS_ATHLETE_ID;
  const apiKey = process.env.INTERVALS_API_KEY;

  if (!athleteId || !apiKey) {
    return null;
  }

  const credentials = Buffer.from(`${apiKey}:`).toString('base64');
  const response = await fetch(
    `https://intervals.icu/api/v1/athlete/${encodeURIComponent(athleteId)}/activities?limit=20`,
    {
      headers: { Authorization: `Basic ${credentials}` },
      next: { revalidate: 300 },
    }
  );

  if (!response.ok) {
    throw new Error(`Intervals.icu API returned ${response.status}`);
  }

  const activities = (await response.json()) as IntervalsActivity[];
  return activities.map(mapIntervalsActivity);
}