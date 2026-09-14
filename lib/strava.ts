import type { Ride } from '@/lib/types';

interface StravaActivity {
  id: number;
  name: string;
  type: string;
  start_date: string;
  distance: number;
  moving_time: number;
  total_elevation_gain: number;
  average_speed: number;
  location_city: string | null;
  location_state: string | null;
  location_country: string | null;
  description: string | null;
}

const formatDuration = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const formatLocation = (activity: StravaActivity) =>
  [activity.location_city, activity.location_state, activity.location_country].filter(Boolean).join(', ') || 'Strava activity';

export const mapStravaActivity = (activity: StravaActivity): Ride => ({
  id: `strava-${activity.id}`,
  title: activity.name,
  date: activity.start_date,
  distance: Math.round((activity.distance / 1000) * 10) / 10,
  elevation: Math.round(activity.total_elevation_gain),
  duration: formatDuration(activity.moving_time),
  avgSpeed: Math.round(activity.average_speed * 3.6 * 10) / 10,
  type: activity.type.replace('VirtualRide', 'Virtual Ride'),
  location: formatLocation(activity),
  routeImage: null,
  notes: activity.description || 'Activity imported from Strava.',
  stravaUrl: `https://www.strava.com/activities/${activity.id}`,
});

async function refreshAccessToken() {
  const clientId = process.env.STRAVA_CLIENT_ID;
  const clientSecret = process.env.STRAVA_CLIENT_SECRET;
  const refreshToken = process.env.STRAVA_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  const response = await fetch('https://www.strava.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  });

  if (!response.ok) {
    throw new Error(`Strava token refresh returned ${response.status}`);
  }

  const data = (await response.json()) as { access_token: string };
  return data.access_token;
}

async function fetchActivities(accessToken: string) {
  return fetch('https://www.strava.com/api/v3/athlete/activities?per_page=20', {
    headers: { Authorization: `Bearer ${accessToken}` },
    next: { revalidate: 300 },
  });
}

export async function getStravaActivities() {
  let accessToken: string | null = process.env.STRAVA_ACCESS_TOKEN ?? null;
  if (!accessToken && !process.env.STRAVA_REFRESH_TOKEN) {
    return null;
  }

  if (!accessToken) {
    accessToken = await refreshAccessToken();
  }

  if (!accessToken) {
    return null;
  }

  let response = await fetchActivities(accessToken);
  if (response.status === 401) {
    const refreshedToken = await refreshAccessToken();
    if (refreshedToken) {
      response = await fetchActivities(refreshedToken);
    }
  }

  if (!response.ok) {
    throw new Error(`Strava API returned ${response.status}`);
  }

  const activities = (await response.json()) as StravaActivity[];
  return activities.map(mapStravaActivity);
}