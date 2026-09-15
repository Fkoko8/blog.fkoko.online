'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Mountain, Clock, MapPin, X, Activity } from 'lucide-react';
import FadeIn from '@/components/shared/fade-in';
import SectionHeader from '@/components/shared/section-header';
import RouteThumbnail from '@/components/shared/route-thumbnail';
import settings from '@/data/settings.json';
import type { RouteEntry } from '@/lib/types';

export default function ExploreRoutes() {
  const [selected, setSelected] = useState<RouteEntry | null>(null);
  const routes = settings.routes as RouteEntry[];

  if (!routes.length) {
    return null;
  }

  return (
    <FadeIn>
      <SectionHeader title="Explore Rides" subtitle="Routes I keep coming back to" />
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card topo-bg p-6">
        {/* Topographic SVG background */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.04]" preserveAspectRatio="none">
          <defs>
            <pattern id="topo" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M0,50 Q25,30 50,50 T100,50" fill="none" stroke="currentColor" strokeWidth="1" />
              <path d="M0,30 Q25,10 50,30 T100,30" fill="none" stroke="currentColor" strokeWidth="1" />
              <path d="M0,70 Q25,50 50,70 T100,70" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#topo)" />
        </svg>

        <div className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {routes.map((route, i) => (
            <motion.button
              key={route.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelected(route)}
              className="group flex flex-col gap-3 rounded-xl border border-border bg-background/60 p-4 text-left transition-all hover:border-accent/30 hover:bg-background/80"
            >
              <div className="h-16 overflow-hidden rounded-lg border border-border bg-muted/30">
                <RouteThumbnail seed={route.id} distance={route.distance} elevation={route.elevation} />
              </div>
              <div>
                <h3 className="font-heading text-base font-semibold uppercase tracking-tight transition-colors group-hover:text-accent">
                  {route.name}
                </h3>
                <span className="text-xs font-mono text-muted-foreground">{route.type} · {route.difficulty}</span>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1 font-mono text-muted-foreground">
                  <Activity className="h-3 w-3" />
                  {route.distance} km
                </span>
                <span className="flex items-center gap-1 font-mono text-muted-foreground">
                  <Mountain className="h-3 w-3" />
                  {route.elevation} m
                </span>
                <span className="flex items-center gap-1 font-mono text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {route.time}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Route detail modal */}
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
              className="w-full max-w-md overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-border p-4">
                <h3 className="font-heading text-xl font-bold uppercase tracking-tight">{selected.name}</h3>
                <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground" aria-label="Close">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-4">
                <div className="h-32 overflow-hidden rounded-xl border border-border bg-muted/30">
                  <RouteThumbnail seed={selected.id} distance={selected.distance} elevation={selected.elevation} />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Distance</span>
                    <p className="stat-value text-lg text-foreground">{selected.distance} km</p>
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Elevation</span>
                    <p className="stat-value text-lg text-foreground">{selected.elevation} m</p>
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Est. Time</span>
                    <p className="stat-value text-lg text-foreground">{selected.time}</p>
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Difficulty</span>
                    <p className="text-sm font-semibold text-accent">{selected.difficulty}</p>
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Type</span>
                    <p className="text-sm font-semibold text-foreground">{selected.type}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </FadeIn>
  );
}
