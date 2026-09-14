'use client';

import { Gauge, HeartPulse, Weight, Clock, MapPin } from 'lucide-react';
import AnimatedNumber from '@/components/shared/animated-number';
import FadeIn from '@/components/shared/fade-in';
import profile from '@/data/profile.json';

interface StatItem {
  icon: React.ReactNode;
  value: number;
  displayValue: string;
  unit: string;
  label: string;
  change: string;
}

export default function StatsBar() {
  const s = profile.stats;

  const stats: StatItem[] = [
    { icon: <Gauge className="h-5 w-5" />, value: s.ftp, displayValue: '', unit: 'W', label: 'FTP', change: s.ftpChange },
    { icon: <HeartPulse className="h-5 w-5" />, value: s.lthr, displayValue: '', unit: 'BPM', label: 'LTHR', change: s.lthrChange },
    { icon: <Weight className="h-5 w-5" />, value: s.weight, displayValue: '', unit: 'KG', label: 'WEIGHT', change: s.weightChange },
    { icon: <Clock className="h-5 w-5" />, value: 0, displayValue: s.weeklyHours, unit: '', label: 'THIS WEEK', change: s.weeklyChange },
    { icon: <MapPin className="h-5 w-5" />, value: s.monthlyKm, displayValue: '', unit: 'KM', label: 'THIS MONTH', change: s.monthlyChange },
  ];

  return (
    <FadeIn>
      <div className="card-editorial grain">
        <div className="grid grid-cols-2 divide-x divide-y divide-border border-border sm:grid-cols-3 lg:grid-cols-5 lg:divide-y-0">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col gap-2 p-5">
              <div className="flex items-center gap-2 text-muted-foreground">
                {stat.icon}
                <span className="text-xs font-mono uppercase tracking-wider">{stat.label}</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                {stat.displayValue ? (
                  <span className="stat-value text-2xl text-foreground sm:text-3xl">{stat.displayValue}</span>
                ) : (
                  <AnimatedNumber value={stat.value} className="stat-value text-2xl text-foreground sm:text-3xl" />
                )}
                {stat.unit && <span className="text-sm font-mono text-muted-foreground">{stat.unit}</span>}
              </div>
              {stat.change && stat.change !== '0' && (
                <span className="text-xs font-mono text-accent">{stat.change}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}
