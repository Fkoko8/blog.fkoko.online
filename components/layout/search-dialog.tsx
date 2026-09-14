'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, X, FileText, Bike, Package, Trophy } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import posts from '@/data/posts.json';
import rides from '@/data/rides.json';
import gear from '@/data/gear.json';
import races from '@/data/races.json';

interface SearchResult {
  type: 'post' | 'ride' | 'gear' | 'race';
  title: string;
  subtitle: string;
  href: string;
  icon: React.ReactNode;
}

export default function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!open) {
      setQuery('');
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const results = useMemo<SearchResult[]>(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();

    const postResults: SearchResult[] = posts
      .filter((p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.tags.some((t) => t.includes(q)))
      .slice(0, 5)
      .map((p) => ({
        type: 'post',
        title: p.title,
        subtitle: `Blog · ${p.category}`,
        href: `/blog/${p.slug}`,
        icon: <FileText className="h-4 w-4" />,
      }));

    const rideResults: SearchResult[] = rides
      .filter((r) => r.title.toLowerCase().includes(q) || r.location.toLowerCase().includes(q) || r.type.toLowerCase().includes(q))
      .slice(0, 3)
      .map((r) => ({
        type: 'ride',
        title: r.title,
        subtitle: `Ride · ${r.distance} km · ${r.location}`,
        href: '/rides',
        icon: <Bike className="h-4 w-4" />,
      }));

    const gearResults: SearchResult[] = gear
      .filter((g) => g.name.toLowerCase().includes(q) || g.category.toLowerCase().includes(q))
      .slice(0, 3)
      .map((g) => ({
        type: 'gear',
        title: g.name,
        subtitle: `Gear · ${g.category}`,
        href: '/gear',
        icon: <Package className="h-4 w-4" />,
      }));

    const raceResults: SearchResult[] = races
      .filter((r) => r.name.toLowerCase().includes(q) || r.location.toLowerCase().includes(q))
      .slice(0, 3)
      .map((r) => ({
        type: 'race',
        title: r.name,
        subtitle: `Race · ${r.location}`,
        href: '/races',
        icon: <Trophy className="h-4 w-4" />,
      }));

    return [...postResults, ...rideResults, ...gearResults, ...raceResults];
  }, [query]);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[80] flex items-start justify-center bg-black/60 p-4 pt-[15vh] backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.97 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <Search className="h-5 w-5 text-muted-foreground" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search posts, rides, gear, races..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
            />
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground" aria-label="Close search">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="max-h-[50vh] overflow-y-auto">
            {query.trim() && results.length === 0 && (
              <div className="p-8 text-center text-sm text-muted-foreground">
                No results for &ldquo;{query}&rdquo;
              </div>
            )}
            {!query.trim() && (
              <div className="p-8 text-center text-sm text-muted-foreground">
                Search across blog posts, rides, gear, and races.
              </div>
            )}
            {results.map((r, i) => (
              <Link
                key={i}
                href={r.href}
                onClick={onClose}
                className="flex items-center gap-3 border-b border-border/50 px-4 py-3 transition-colors hover:bg-muted/50"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  {r.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{r.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{r.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
