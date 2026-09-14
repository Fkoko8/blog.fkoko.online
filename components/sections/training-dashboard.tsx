'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Mountain, Gauge, TrendingUp } from 'lucide-react';
import FadeIn from '@/components/shared/fade-in';
import SectionHeader from '@/components/shared/section-header';
import AnimatedNumber from '@/components/shared/animated-number';
import training from '@/data/training.json';
import type { TrainingDay } from '@/lib/types';

type Metric = 'distance' | 'time' | 'elevation' | 'tss';

const metricConfig: Record<Metric, { label: string; unit: string; icon: React.ReactNode }> = {
  distance: { label: 'Distance', unit: 'km', icon: <Mountain className="h-4 w-4" /> },
  time: { label: 'Time', unit: 'h', icon: <Clock className="h-4 w-4" /> },
  elevation: { label: 'Elevation', unit: 'm', icon: <TrendingUp className="h-4 w-4" /> },
  tss: { label: 'TSS', unit: '', icon: <Gauge className="h-4 w-4" /> },
};

export default function TrainingDashboard() {
  const [metric, setMetric] = useState<Metric>('distance');
  const days = training.days as TrainingDay[];
  const maxVal = Math.max(...days.map((d) => d[metric]));
  const summary = training.weeklySummary;

  const summaryStats = [
    { label: 'Total Time', value: summary.totalTime, icon: <Clock className="h-4 w-4" /> },
    { label: 'Total Distance', value: `${summary.totalDistance} km`, icon: <Mountain className="h-4 w-4" /> },
    { label: 'Total Elevation', value: `${summary.totalElevation} m`, icon: <TrendingUp className="h-4 w-4" /> },
  ];

  return (
    <FadeIn>
      <SectionHeader title="Training This Week" subtitle={training.plan.focus} />
      <div className="card-editorial grain p-6">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-4 border-b border-border pb-6">
          {summaryStats.map((s, i) => (
            <div key={i} className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                {s.icon}
                <span className="text-xs font-mono uppercase tracking-wider">{s.label}</span>
              </div>
              <p className="stat-value text-xl text-foreground sm:text-2xl">{s.value}</p>
            </div>
          ))}
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
              className="flex items-end justify-between gap-2 sm:gap-3"
            >
              {days.map((day, i) => {
                const val = day[metric];
                const heightPct = (val / maxVal) * 100;
                return (
                  <div key={day.day} className="flex flex-1 flex-col items-center gap-2">
                    <div className="flex h-32 w-full items-end justify-center sm:h-40">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${heightPct}%` }}
                        transition={{ delay: i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full max-w-[32px] rounded-t-md bg-accent/80 transition-colors hover:bg-accent"
                        style={{ minHeight: '4px' }}
                      >
                        <span className="absolute -mt-6 left-1/2 -translate-x-1/2 text-xs font-mono text-muted-foreground opacity-0 transition-opacity hover:opacity-100">
                          {val}
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

        {/* Plan info */}
        <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-border pt-4 text-xs font-mono text-muted-foreground">
          <span>Phase: <span className="text-foreground">{training.plan.phase}</span></span>
          <span>Target: <span className="text-foreground">{training.plan.weeklyTargetHours}h/week</span></span>
          <span>Weeks left: <span className="text-foreground">{training.plan.weeksRemaining}</span></span>
        </div>
      </div>
    </FadeIn>
  );
}
