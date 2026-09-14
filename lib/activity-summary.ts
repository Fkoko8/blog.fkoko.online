import type { Ride } from '@/lib/types';

export interface ActivityDay {
  day: string;
  distance: number;
  time: number;
  elevation: number;
  tss: number;
}

const dateKey = (value: string | Date) => {
  if (typeof value === 'string') {
    const localDate = value.match(/^\d{4}-\d{2}-\d{2}/)?.[0];
    if (localDate) {
      return localDate;
    }
  }

  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    .map((part, index) => (index === 0 ? String(part) : String(part).padStart(2, '0')))
    .join('-');
};

const durationToHours = (duration: string) => {
  const [hours, minutes, seconds] = duration.split(':').map(Number);
  return hours + minutes / 60 + seconds / 3600;
};

export function getCurrentWeekActivities(rides: Ride[], now = new Date()) {
  const monday = new Date(now);
  const day = monday.getDay() || 7;
  monday.setDate(monday.getDate() - day + 1);
  monday.setHours(0, 0, 0, 0);

  return Array.from({ length: 7 }, (_, index): ActivityDay => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    const key = dateKey(date);
    const matching = rides.filter((ride) => dateKey(ride.date) === key);

    return {
      day: date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
      distance: Math.round(matching.reduce((sum, ride) => sum + ride.distance, 0) * 10) / 10,
      time: Math.round(matching.reduce((sum, ride) => sum + durationToHours(ride.duration), 0) * 100) / 100,
      elevation: Math.round(matching.reduce((sum, ride) => sum + ride.elevation, 0)),
      tss: Math.round(matching.reduce((sum, ride) => sum + (ride.trainingLoad || 0), 0)),
    };
  });
}

export const formatHours = (hours: number) => {
  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours - wholeHours) * 60);
  return `${wholeHours}h ${minutes}m`;
};