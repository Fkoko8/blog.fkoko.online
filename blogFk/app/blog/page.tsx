'use client';

import { useState, useMemo, useEffect } from 'react';
import { Search, ArrowUpDown, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import SmartImage from '@/components/shared/smart-image';
import EmptyState from '@/components/shared/empty-state';
import settings from '@/data/settings.json';
import fallbackPosts from '@/data/posts.json';
import type { Post } from '@/lib/types';

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>(fallbackPosts as Post[]);
  const [category, setCategory] = useState('ALL');
  const [query, setQuery] = useState('');
  const [sortDesc, setSortDesc] = useState(true);

  const categories = settings.blogCategories;

  useEffect(() => {
    fetch('/api/posts')
      .then((response) => (response.ok ? response.json() : null))
      .then((data: Post[] | null) => {
        if (data?.length) setPosts(data);
      })
      .catch(() => undefined);
  }, []);

  const filtered = useMemo(() => {
    let result = [...posts];

    if (category !== 'ALL') {
      result = result.filter((p) => p.category === category);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q))
      );
    }

    result.sort((a, b) => {
      const cmp = new Date(a.date).getTime() - new Date(b.date).getTime();
      return sortDesc ? -cmp : cmp;
    });

    return result;
  }, [category, query, sortDesc]);

  return (
    <div className="container-editorial section-padding">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-4xl font-bold uppercase tracking-tight sm:text-5xl">
          The Blog
        </h1>
        <p className="mt-2 max-w-lg text-muted-foreground">
          Rides, training, gear, races, and life in between. Every post from the journey.
        </p>
      </div>

      {/* Search + Sort */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts..."
            className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30"
          />
        </div>
        <button
          onClick={() => setSortDesc(!sortDesc)}
          className="flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground hover:border-accent/50"
        >
          <ArrowUpDown className="h-4 w-4" />
          {sortDesc ? 'Newest first' : 'Oldest first'}
        </button>
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

      {/* Posts */}
      {filtered.length === 0 ? (
        <EmptyState
          title="No posts found"
          description="Try a different category or search term."
          icon={<Search className="h-8 w-8" />}
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((post) => (
              <motion.div
                key={post.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <article className="card-editorial group h-full transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <SmartImage
                        src={post.image}
                        alt={post.title}
                        fill
                        className="transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
                      <span className="absolute left-3 top-3 rounded-full bg-background/80 px-2.5 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-accent backdrop-blur-md">
                        {post.category}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2 p-4">
                      <span className="text-xs font-mono text-muted-foreground">
                        {new Date(post.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                        {' · '}
                        {post.readingTime}
                      </span>
                      <h3 className="font-heading text-lg font-semibold leading-tight transition-colors group-hover:text-accent">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                      <div className="mt-1 flex flex-wrap gap-1.5">
                        {post.tags.map((tag) => (
                          <span key={tag} className="tag-pill">#{tag}</span>
                        ))}
                      </div>
                      <div className="mt-2 flex items-center gap-1 text-sm font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
                        Read more
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
