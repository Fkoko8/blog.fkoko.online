'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SmartImage from '@/components/shared/smart-image';
import FadeIn from '@/components/shared/fade-in';
import SectionHeader from '@/components/shared/section-header';
import bike from '@/data/bike.json';

export default function CurrentBike() {
  return (
    <FadeIn>
      <SectionHeader title="Current Bike" subtitle={bike.name} />
      <div className="card-editorial grain grid gap-0 lg:grid-cols-2">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto">
          <SmartImage src={bike.image} alt={bike.name} fill />
        </div>

        {/* Specs */}
        <div className="flex flex-col p-6">
          <p className="text-sm text-muted-foreground">{bike.tagline}</p>
          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
            {bike.specifications.slice(0, 8).map((spec) => (
              <div key={spec.label} className="flex items-center justify-between border-b border-border/50 py-2">
                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{spec.label}</span>
                <span className="text-sm font-medium text-foreground">{spec.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Weight</span>
              <p className="stat-value text-2xl text-accent">{bike.weight}</p>
            </div>
            <Link
              href="/bike"
              className="group flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-all hover:bg-accent/90"
            >
              Full Build
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
