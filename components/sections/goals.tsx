'use client';

import { Check } from 'lucide-react';
import FadeIn from '@/components/shared/fade-in';
import SectionHeader from '@/components/shared/section-header';
import goals from '@/data/goals.json';
import type { Goal } from '@/lib/types';

export default function Goals() {
  const goalList = goals as Goal[];

  if (!goalList.length) {
    return null;
  }

  return (
    <FadeIn>
      <SectionHeader title="Next Goals" subtitle="What I'm working toward" />
      <div className="card-editorial grain p-6">
        <div className="space-y-3">
          {goalList.map((goal, i) => (
            <div key={goal.id} className="flex items-center gap-3">
              <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-colors ${
                  goal.done
                    ? 'border-accent bg-accent text-accent-foreground'
                    : 'border-border text-transparent'
                }`}
              >
                {goal.done && <Check className="h-4 w-4" />}
              </div>
              <span className={`flex-1 text-sm ${goal.done ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                {goal.text}
              </span>
              {!goal.done && goal.progress < 100 && (
                <div className="hidden items-center gap-2 sm:flex">
                  <div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-accent transition-all"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">{goal.progress}%</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}
