'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Search } from 'lucide-react';
import SmartImage from '@/components/shared/smart-image';
import EmptyState from '@/components/shared/empty-state';
import gear from '@/data/gear.json';
import type { GearItem } from '@/lib/types';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-3.5 w-3.5 ${
            star <= Math.floor(rating)
              ? 'fill-accent text-accent'
              : star <= rating
              ? 'fill-accent/50 text-accent'
              : 'text-muted-foreground/30'
          }`}
        />
      ))}
      <span className="ml-1 text-xs font-mono text-muted-foreground">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function GearPage() {
  const [category, setCategory] = useState('ALL');
  const [query, setQuery] = useState('');

  const categories = ['ALL', ...Array.from(new Set(gear.map((g) => g.category)))];
  const gearList = gear as GearItem[];

  const filtered = useMemo(() => {
    let result = [...gearList];
    if (category !== 'ALL') result = result.filter((g) => g.category === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (g) => g.name.toLowerCase().includes(q) || g.category.toLowerCase().includes(q) || g.opinion.toLowerCase().includes(q)
      );
    }
    return result;
  }, [category, query, gearList]);

  return (
    <div className="container-editorial section-padding">
      <div className="mb-8">
        <h1 className="font-heading text-4xl font-bold uppercase tracking-tight sm:text-5xl">Gear</h1>
        <p className="mt-2 max-w-lg text-muted-foreground">Personal gear journal. Not a shop — just honest opinions on stuff I use.</p>
      </div>

      {/* Search */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search gear..."
            className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`rounded-lg px-3 py-1.5 text-xs font-mono font-semibold uppercase tracking-wider transition-all ${
              category === cat
                ? 'bg-accent text-accent-foreground'
                : 'border border-border text-muted-foreground hover:text-foreground hover:border-accent/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gear grid */}
      {filtered.length === 0 ? (
        <EmptyState title="No gear found" description="Try a different category or search term." icon={<Search className="h-8 w-8" />} />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="card-editorial group h-full overflow-hidden"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <SmartImage src={item.image} alt={item.name} fill className="transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute left-3 top-3 rounded-full bg-background/80 px-2.5 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-accent backdrop-blur-md">
                    {item.category}
                  </span>
                </div>
                <div className="flex flex-col gap-3 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-heading text-lg font-semibold leading-tight transition-colors group-hover:text-accent">{item.name}</h3>
                  </div>
                  <StarRating rating={item.rating} />
                  <div className="flex items-center gap-1 text-xs font-mono text-muted-foreground">
                    <span className="uppercase tracking-wider">Tested:</span>
                    {item.distanceTested}
                  </div>
                  <p className="text-sm text-muted-foreground">{item.opinion}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
