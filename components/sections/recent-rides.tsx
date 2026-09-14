'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Mountain, Clock, MapPin } from 'lucide-react';
import FadeIn from '@/components/shared/fade-in';
import SectionHeader from '@/components/shared/section-header';
import RouteThumbnail from '@/components/shared/route-thumbnail';
import { useActivities } from '@/hooks/use-activities';
import type { Ride } from '@/lib/types';

export default function RecentRides() {
  const rides = useActivities();
  const recent = rides.slice(0, 5) as Ride[];

  if (!recent.length) {
    return null;
  }

  return (
    <FadeIn>
      <SectionHeader
        title="Recent Rides"
        subtitle="Every ride, documented"
        action={
          <Link href="/rides" className="group flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-accent">
            All rides
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        }
      />
      <div className="space-y-2">
        {recent.map((ride) => (
          <Link key={ride.id} href={ride.activityUrl ?? '/rides'} className="block" target={ride.activityUrl ? '_blank' : undefined} rel={ride.activityUrl ? 'noreferrer' : undefined}>
            <div className="card-editorial group flex items-center gap-4 p-4 transition-all hover:border-accent/30">
              {/* Route thumbnail */}
              <div className="relative hidden h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-border bg-muted/30 sm:block">
                {ride.routeImage ? (
                  <Image src={ride.routeImage} alt={ride.title} fill sizes="96px" className="object-cover" />
                ) : (
                  <RouteThumbnail seed={ride.id} distance={ride.distance} elevation={ride.elevation} />
                )}
              </div>

              {/* Title */}
              <div className="min-w-0 flex-1">
                <h3 className="font-heading text-base font-semibold uppercase tracking-tight transition-colors group-hover:text-accent">
                  {ride.title}
                </h3>
                <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {ride.location}
                </div>
              </div>

              {/* Stats */}
              <div className="flex shrink-0 items-center gap-4 sm:gap-6">
                <div className="text-center">
                  <p className="stat-value text-lg text-foreground">{ride.distance}</p>
                  <p className="text-xs font-mono text-muted-foreground">KM</p>
                </div>
                <div className="hidden text-center sm:block">
                  <p className="stat-value text-lg text-foreground">{ride.elevation}</p>
                  <p className="text-xs font-mono text-muted-foreground">M</p>
                </div>
                <div className="hidden text-center sm:block">
                  <p className="stat-value text-lg text-foreground">{ride.duration}</p>
                  <p className="text-xs font-mono text-muted-foreground">TIME</p>
                </div>
              </div>

              {/* Date */}
              <div className="hidden shrink-0 text-right lg:block">
                <p className="text-xs font-mono uppercase text-muted-foreground">
                  {new Date(ride.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}
                </p>
                <p className="text-xs font-mono text-muted-foreground/60">
                  {new Date(ride.date).getFullYear()}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </FadeIn>
  );
}
