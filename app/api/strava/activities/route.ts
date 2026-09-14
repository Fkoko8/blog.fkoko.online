import { NextResponse } from 'next/server';
import { getStravaActivities } from '@/lib/strava';

export async function GET() {
  try {
    const activities = await getStravaActivities();
    if (!activities) {
      return NextResponse.json({ configured: false, activities: [] });
    }

    return NextResponse.json({ configured: true, activities });
  } catch (error) {
    console.error('Failed to load Strava activities', error);
    return NextResponse.json({ configured: true, activities: [] }, { status: 502 });
  }
}