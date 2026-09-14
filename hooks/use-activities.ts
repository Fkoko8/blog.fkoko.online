'use client';

import { useEffect, useState } from 'react';
import fallbackRides from '@/data/rides.json';
import type { Ride } from '@/lib/types';

export function useActivities() {
  const [rides, setRides] = useState<Ride[]>(fallbackRides as Ride[]);

  useEffect(() => {
    let active = true;

    fetch('/api/activities')
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { activities?: Ride[] } | null) => {
        if (active && data?.activities?.length) {
          setRides(data.activities);
        }
      })
      .catch(() => undefined);

    return () => {
      active = false;
    };
  }, []);

  return rides;
}