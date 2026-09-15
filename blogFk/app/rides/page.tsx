'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Mountain, Clock, MapPin, Gauge, X } from 'lucide-react';
import RouteThumbnail from '@/components/shared/route-thumbnail';
import EmptyState from '@/components/shared/empty-state';
import { useActivities } from '@/hooks/use-activities';
import type { Ride } from '@/lib/types';

export default function RidesPage() {
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [selected, setSelected] = useState<Ride | null>(null);
  const rides = useActivities();

  const types = ['ALL', ...Array.from(new Set(rides.map((r) => r.type)))];

  const filtered = useMemo(() => {
    let result = [...rides] as Ride[];
    if (typeFilter !== 'ALL') result = result.filter((r) => r.type === typeFilter);
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (r) => r.title.toLowerCase().includes(q) || r.location.toLowerCase().includes(q) || r.notes.toLowerCase().includes(q)
      );
    }
    return result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [query, typeFilter, rides]);

  const totalDistance = filtered.reduce((sum, r) => sum + r.distance, 0);
  const totalElevation = filtered.reduce((sum, r) => sum + r.elevation, 0);

  return (
    <div className="container-editorial section-padding">
      <div className="mb-8">
        <h1 className="font-heading text-4xl font-bold uppercase tracking-tight sm:text-5xl">Rides</h1>
        <p className="mt-2 max-w-lg text-muted-foreground">Every ride, every climb, every descent. The full journal.</p>
      </div>

      {/* Summary stats */}
      <div className="mb-8 grid grid-cols-3 gap-4">
        <div className="card-editorial p-4">
          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Total Rides</span>
          <p className="stat-value mt-1 text-2xl text-foreground">{filtered.length}</p>
        </div>
        <div className="card-editorial p-4">
          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Total Distance</span>
          <p className="stat-value mt-1 text-2xl text-foreground">{totalDistance.toFixed(1)} km</p>
        </div>
        <div className="card-editorial p-4">
          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Total Elevation</span>
          <p className="stat-value mt-1 text-2xl text-foreground">{totalElevation.toLocaleString()} m</p>
        </div>
      </div>

      {/* Search + filter */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search rides..."
            className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30"
          />
        </div>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            className={`rounded-lg px-3 py-1.5 text-xs font-mono font-semibold uppercase tracking-wider transition-all ${
              typeFilter === t
                ? 'bg-accent text-accent-foreground'
                : 'border border-border text-muted-foreground hover:text-foreground hover:border-accent/50'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Rides grid */}
      {filtered.length === 0 ? (
        <EmptyState title="No rides found" description="Try a different filter or search term." icon={<Search className="h-8 w-8" />} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((ride) => (
              <motion.button
                key={ride.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelected(ride)}
                className="card-editorial group p-4 text-left transition-all hover:border-accent/30"
              >
                <div className="relative mb-3 h-20 overflow-hidden rounded-lg border border-border bg-muted/30">
                  {ride.routeImage ? (
                    <Image src={ride.routeImage} alt={ride.title} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
                  ) : (
                    <RouteThumbnail seed={ride.id} distance={ride.distance} elevation={ride.elevation} />
                  )}
                </div>
                <div className="flex items-start justify-between">
                  <div className="min-w-0">
                    <h3 className="font-heading text-base font-semibold uppercase tracking-tight transition-colors group-hover:text-accent">
                      {ride.title}
                    </h3>
                    <span className="text-xs font-mono text-muted-foreground">{ride.type}</span>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">
                    {new Date(ride.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="stat-value text-base text-foreground">{ride.distance}</p>
                    <p className="text-xs font-mono text-muted-foreground">KM</p>
                  </div>
                  <div>
                    <p className="stat-value text-base text-foreground">{ride.elevation}</p>
                    <p className="text-xs font-mono text-muted-foreground">M</p>
                  </div>
                  <div>
                    <p className="stat-value text-base text-foreground">{ride.duration}</p>
                    <p className="text-xs font-mono text-muted-foreground">TIME</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Ride detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-border p-4">
                <div>
                  <h3 className="font-heading text-xl font-bold uppercase tracking-tight">{selected.title}</h3>
                  <span className="text-xs font-mono text-muted-foreground">{selected.type}</span>
                </div>
                <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground" aria-label="Close">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-4">
                <div className="relative mb-4 h-32 overflow-hidden rounded-xl border border-border bg-muted/30">
                  {selected.routeImage ? (
                    <Image src={selected.routeImage} alt={selected.title} fill sizes="(max-width: 640px) 100vw, 512px" className="object-cover" />
                  ) : (
                    <RouteThumbnail seed={selected.id} distance={selected.distance} elevation={selected.elevation} />
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Distance</span>
                    <p className="stat-value text-lg text-foreground">{selected.distance} km</p>
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Elevation</span>
                    <p className="stat-value text-lg text-foreground">{selected.elevation} m</p>
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Time</span>
                    <p className="stat-value text-lg text-foreground">{selected.duration}</p>
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Avg Speed</span>
                    <p className="stat-value text-lg text-foreground">{selected.avgSpeed} km/h</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {selected.location}
                </div>
                <div className="mt-4 border-t border-border pt-4">
                  <p className="text-sm text-foreground/80">{selected.notes}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
