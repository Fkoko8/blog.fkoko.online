'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Mountain, Gauge, TrendingUp, Target } from 'lucide-react';
import AnimatedNumber from '@/components/shared/animated-number';
import training from '@/data/training.json';
import { useActivities } from '@/hooks/use-activities';
import { formatHours, getCurrentWeekActivities } from '@/lib/activity-summary';

type Metric = 'distance' | 'time' | 'elevation' | 'tss';

const metricConfig: Record<Metric, { label: string; unit: string; icon: React.ReactNode }> = {
  distance: { label: 'Distance', unit: 'km', icon: <Mountain className="h-4 w-4" /> },
  time: { label: 'Time', unit: 'h', icon: <Clock className="h-4 w-4" /> },
  elevation: { label: 'Elevation', unit: 'm', icon: <TrendingUp className="h-4 w-4" /> },
  tss: { label: 'TSS', unit: '', icon: <Gauge className="h-4 w-4" /> },
};

export default function TrainingPage() {
  const [metric, setMetric] = useState<Metric>('distance');
  const rides = useActivities();
  const days = getCurrentWeekActivities(rides);
  const maxVal = Math.max(...days.map((d) => d[metric]), 1);
  const summary = {
    totalTime: formatHours(days.reduce((sum, day) => sum + day.time, 0)),
    totalDistance: Math.round(days.reduce((sum, day) => sum + day.distance, 0) * 10) / 10,
    totalElevation: days.reduce((sum, day) => sum + day.elevation, 0),
    totalTSS: days.reduce((sum, day) => sum + day.tss, 0),
  };

  return (
    <div className="container-editorial section-padding">
      <div className="mb-8">
        <h1 className="font-heading text-4xl font-bold uppercase tracking-tight sm:text-5xl">Training</h1>
        <p className="mt-2 max-w-lg text-muted-foreground">Live activity data from Intervals.icu for the current week.</p>
      </div>

      {/* Plan overview */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="card-editorial p-4">
          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Phase</span>
          <p className="mt-1 font-heading text-xl font-bold text-foreground">{training.plan.phase}</p>
        </div>
        <div className="card-editorial p-4">
          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Target</span>
          <p className="mt-1 font-heading text-xl font-bold text-foreground">{training.plan.weeklyTargetHours}h/wk</p>
        </div>
        <div className="card-editorial p-4">
          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Weeks Left</span>
          <p className="mt-1 font-heading text-xl font-bold text-foreground">{training.plan.weeksRemaining}</p>
        </div>
        <div className="card-editorial p-4">
          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Focus</span>
          <p className="mt-1 font-heading text-xl font-bold text-accent">Base</p>
        </div>
      </div>

      {/* Weekly summary */}
      <div className="mb-8 card-editorial p-6">
        <h2 className="mb-6 font-heading text-2xl font-bold uppercase tracking-tight">This Week</h2>
        <div className="grid grid-cols-2 gap-4 border-b border-border pb-6 sm:grid-cols-4">
          <div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="text-xs font-mono uppercase tracking-wider">Time</span>
            </div>
            <p className="stat-value mt-1 text-2xl text-foreground">{summary.totalTime}</p>
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Mountain className="h-4 w-4" />
              <span className="text-xs font-mono uppercase tracking-wider">Distance</span>
            </div>
            <p className="stat-value mt-1 text-2xl text-foreground">{summary.totalDistance} km</p>
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs font-mono uppercase tracking-wider">Elevation</span>
            </div>
            <p className="stat-value mt-1 text-2xl text-foreground">{summary.totalElevation} m</p>
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Gauge className="h-4 w-4" />
              <span className="text-xs font-mono uppercase tracking-wider">TSS</span>
            </div>
            <p className="stat-value mt-1 text-2xl text-foreground">{summary.totalTSS || '—'}</p>
          </div>
        </div>

        {/* Metric toggle */}
        <div className="mt-6 flex flex-wrap gap-2">
          {(Object.keys(metricConfig) as Metric[]).map((m) => (
            <button
              key={m}
              onClick={() => setMetric(m)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-mono font-semibold uppercase tracking-wider transition-all ${
                metric === m
                  ? 'bg-accent text-accent-foreground'
                  : 'border border-border text-muted-foreground hover:text-foreground hover:border-accent/50'
              }`}
            >
              {metricConfig[m].icon}
              {metricConfig[m].label}
            </button>
          ))}
        </div>

        {/* Bar chart */}
        <div className="mt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={metric}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-end justify-between gap-3"
            >
              {days.map((day, i) => {
                const val = day[metric];
                const heightPct = (val / maxVal) * 100;
                return (
                  <div key={day.day} className="flex flex-1 flex-col items-center gap-2">
                    <div className="flex h-48 w-full items-end justify-center">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${heightPct}%` }}
                        transition={{ delay: i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="group relative w-full max-w-[48px] rounded-t-md bg-accent/80 transition-colors hover:bg-accent"
                        style={{ minHeight: '4px' }}
                      >
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-mono text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                          {val}{metricConfig[metric].unit}
                        </span>
                      </motion.div>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">{day.day}</span>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Daily breakdown */}
      <div>
        <h2 className="mb-4 font-heading text-2xl font-bold uppercase tracking-tight">Daily Breakdown</h2>
        <div className="space-y-2">
          {days.map((day) => (
            <div key={day.day} className="card-editorial flex items-center gap-4 p-4">
              <span className="w-12 font-heading text-lg font-bold uppercase text-muted-foreground">{day.day}</span>
              <div className="flex flex-1 items-center justify-end gap-6">
                <div className="text-center">
                  <p className="stat-value text-base text-foreground">{day.distance}</p>
                  <p className="text-xs font-mono text-muted-foreground">KM</p>
                </div>
                <div className="text-center">
                  <p className="stat-value text-base text-foreground">{day.time}h</p>
                  <p className="text-xs font-mono text-muted-foreground">TIME</p>
                </div>
                <div className="text-center">
                  <p className="stat-value text-base text-foreground">{day.elevation}</p>
                  <p className="text-xs font-mono text-muted-foreground">M</p>
                </div>
                <div className="text-center">
                  <p className="stat-value text-base text-foreground">{day.tss}</p>
                  <p className="text-xs font-mono text-muted-foreground">TSS</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
