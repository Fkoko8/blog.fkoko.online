'use client';

import { motion } from 'framer-motion';
import { Trophy, MapPin, Clock, Mountain, Calendar, Target } from 'lucide-react';
import EmptyState from '@/components/shared/empty-state';
import races from '@/data/races.json';
import type { Race } from '@/lib/types';

export default function RacesPage() {
  const raceList = races as Race[];
  const upcoming = raceList.filter((r) => r.status === 'upcoming');
  const completed = raceList.filter((r) => r.status === 'completed');

  return (
    <div className="container-editorial section-padding">
      <div className="mb-8">
        <h1 className="font-heading text-4xl font-bold uppercase tracking-tight sm:text-5xl">Races</h1>
        <p className="mt-2 max-w-lg text-muted-foreground">XC races, criteriums, and cyclocross. The full season, past and future.</p>
      </div>

      {/* Upcoming */}
      <div className="mb-12">
        <h2 className="mb-4 flex items-center gap-2 font-heading text-2xl font-bold uppercase tracking-tight">
          <Target className="h-5 w-5 text-accent" />
          Upcoming
        </h2>
        {upcoming.length === 0 ? (
          <EmptyState title="No upcoming races" description="Check back soon for the next event." icon={<Calendar className="h-8 w-8" />} />
        ) : (
          <div className="space-y-3">
            {upcoming.map((race, i) => (
              <motion.div
                key={race.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="card-editorial group p-5 transition-all hover:border-accent/30"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-heading text-xl font-semibold uppercase tracking-tight transition-colors group-hover:text-accent">{race.name}</h3>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {race.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(race.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                      <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-mono font-semibold uppercase text-accent">{race.category}</span>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="text-center">
                      <p className="stat-value text-lg text-foreground">{race.distance}</p>
                      <p className="text-xs font-mono text-muted-foreground">KM</p>
                    </div>
                    <div className="text-center">
                      <p className="stat-value text-lg text-foreground">{race.elevation}</p>
                      <p className="text-xs font-mono text-muted-foreground">M</p>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{race.notes}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Completed */}
      <div>
        <h2 className="mb-4 flex items-center gap-2 font-heading text-2xl font-bold uppercase tracking-tight">
          <Trophy className="h-5 w-5 text-accent" />
          Completed
        </h2>
        {completed.length === 0 ? (
          <EmptyState title="No completed races yet" description="Race results will show up here." icon={<Trophy className="h-8 w-8" />} />
        ) : (
          <div className="space-y-3">
            {completed.map((race, i) => (
              <motion.div
                key={race.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="card-editorial group p-5 transition-all hover:border-accent/30"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1">
                    <h3 className="font-heading text-xl font-semibold uppercase tracking-tight transition-colors group-hover:text-accent">{race.name}</h3>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {race.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(race.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                      <span className="rounded-full border border-border px-2 py-0.5 text-xs font-mono font-semibold uppercase text-muted-foreground">{race.category}</span>
                    </div>
                  </div>
                  <div className="flex gap-4 sm:gap-6">
                    {race.position && (
                      <div className="text-center">
                        <p className="stat-value text-lg text-accent">{race.position}</p>
                        <p className="text-xs font-mono text-muted-foreground">OF {race.totalRiders}</p>
                      </div>
                    )}
                    <div className="text-center">
                      <p className="stat-value text-lg text-foreground">{race.distance}</p>
                      <p className="text-xs font-mono text-muted-foreground">KM</p>
                    </div>
                    <div className="text-center">
                      <p className="stat-value text-lg text-foreground">{race.elevation}</p>
                      <p className="text-xs font-mono text-muted-foreground">M</p>
                    </div>
                    {race.time && (
                      <div className="text-center">
                        <p className="stat-value text-lg text-foreground">{race.time}</p>
                        <p className="text-xs font-mono text-muted-foreground">TIME</p>
                      </div>
                    )}
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{race.notes}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Season timeline */}
      <div className="mt-12">
        <h2 className="mb-4 font-heading text-2xl font-bold uppercase tracking-tight">Season Timeline</h2>
        <div className="card-editorial p-6">
          <div className="relative">
            <div className="absolute left-0 top-0 h-full w-0.5 bg-border" />
            <div className="space-y-6">
              {raceList.map((race, i) => (
                <div key={race.id} className="relative flex gap-4 pl-6">
                  <div className={`absolute left-0 top-1 h-3 w-3 -translate-x-[5px] rounded-full border-2 ${
                    race.status === 'upcoming' ? 'border-accent bg-accent' : 'border-border bg-card'
                  }`} />
                  <div>
                    <span className="text-xs font-mono text-muted-foreground">
                      {new Date(race.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                    <h4 className="font-heading text-base font-semibold uppercase tracking-tight">{race.name}</h4>
                    <p className="text-xs text-muted-foreground">{race.location} · {race.category}</p>
                    {race.position && (
                      <span className="mt-1 inline-block text-xs font-mono text-accent">P{race.position}/{race.totalRiders}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
