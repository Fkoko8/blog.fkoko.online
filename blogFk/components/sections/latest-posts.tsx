'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SmartImage from '@/components/shared/smart-image';
import FadeIn from '@/components/shared/fade-in';
import SectionHeader from '@/components/shared/section-header';
import fallbackPosts from '@/data/posts.json';
import type { Post } from '@/lib/types';

export default function LatestPosts() {
  const [posts, setPosts] = useState<Post[]>(fallbackPosts as Post[]);

  useEffect(() => {
    fetch('/api/posts')
      .then((response) => (response.ok ? response.json() : null))
      .then((data: Post[] | null) => {
        if (data?.length) setPosts(data);
      })
      .catch(() => undefined);
  }, []);

  const latest = [...posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4) as Post[];

  if (!latest.length) {
    return null;
  }

  return (
    <FadeIn>
      <SectionHeader
        title="Latest from the Blog"
        subtitle="Thoughts, rides, and lessons from the trail"
        action={
          <Link href="/blog" className="group flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-accent">
            All posts
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        }
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {latest.map((post, i) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
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
              </div>
            </article>
          </Link>
        ))}
      </div>
    </FadeIn>
  );
}
