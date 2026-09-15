import { NextResponse } from 'next/server';
import { getIntervalsActivities } from '@/lib/intervals';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const activities = await getIntervalsActivities();
    if (!activities) {
      return NextResponse.json({ configured: false, activities: [] });
    }

    return NextResponse.json({ configured: true, activities });
  } catch (error) {
    console.error('Failed to load Intervals.icu activities', error);
    return NextResponse.json({ configured: true, activities: [] }, { status: 502 });
  }
}