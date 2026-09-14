import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight, Clock, Calendar, User } from 'lucide-react';
import SmartImage from '@/components/shared/smart-image';
import posts from '@/data/posts.json';
import rides from '@/data/rides.json';
import settings from '@/data/settings.json';
import type { Post } from '@/lib/types';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return { title: 'Post not found' };

  return {
    title: `${post.title} — FKOKO`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = posts.find((p) => p.slug === params.slug) as Post | undefined;
  if (!post) notFound();

  const relatedRide = post.relatedRideId ? rides.find((r) => r.id === post.relatedRideId) : null;
  const morePosts = (posts as Post[])
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 2);

  return (
    <article className="grain">
      {/* Hero image */}
      <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <SmartImage src={post.image} alt={post.title} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      <div className="container-editorial relative -mt-32">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <Link href="/" className="hover:text-accent">HOME</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-accent">BLOG</Link>
          <span>/</span>
          <span className="text-foreground">{post.category}</span>
        </nav>

        {/* Header */}
        <div className="mx-auto max-w-3xl">
          <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-accent">
            {post.category}
          </span>
          <h1 className="mt-4 font-heading text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {new Date(post.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readingTime}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto mt-10 max-w-3xl space-y-6">
          {post.content.map((block, i) => {
            if (block.type === 'paragraph') {
              return (
                <p key={i} className="text-base leading-relaxed text-foreground/90 sm:text-lg">
                  {block.text}
                </p>
              );
            }
            if (block.type === 'heading') {
              return (
                <h2 key={i} className="font-heading text-2xl font-bold uppercase tracking-tight sm:text-3xl">
                  {block.text}
                </h2>
              );
            }
            if (block.type === 'quote') {
              return (
                <blockquote key={i} className="border-l-4 border-accent pl-6">
                  <p className="font-heading text-xl font-medium italic text-foreground/90 sm:text-2xl">
                    &ldquo;{block.text}&rdquo;
                  </p>
                </blockquote>
              );
            }
            if (block.type === 'stats' && block.items) {
              return (
                <div key={i} className="grid grid-cols-2 gap-4 rounded-2xl border border-border bg-card p-6 sm:grid-cols-4">
                  {block.items.map((item, j) => (
                    <div key={j}>
                      <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{item.label}</span>
                      <p className="stat-value mt-1 text-xl text-foreground sm:text-2xl">{item.value}</p>
                    </div>
                  ))}
                </div>
              );
            }
            return null;
          })}
        </div>

        {/* Tags */}
        <div className="mx-auto mt-8 max-w-3xl">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="tag-pill">#{tag}</span>
            ))}
          </div>
        </div>

        {/* Related ride */}
        {relatedRide && (
          <div className="mx-auto mt-12 max-w-3xl">
            <h3 className="mb-4 text-xs font-mono uppercase tracking-wider text-muted-foreground">Related Ride</h3>
            <Link href="/rides" className="block">
              <div className="card-editorial group flex items-center gap-4 p-4 transition-all hover:border-accent/30">
                <div className="min-w-0 flex-1">
                  <h4 className="font-heading text-lg font-semibold uppercase tracking-tight">{relatedRide.title}</h4>
                  <p className="text-sm text-muted-foreground">{relatedRide.location}</p>
                </div>
                <div className="flex gap-6">
                  <div className="text-center">
                    <p className="stat-value text-lg">{relatedRide.distance}</p>
                    <p className="text-xs font-mono text-muted-foreground">KM</p>
                  </div>
                  <div className="text-center">
                    <p className="stat-value text-lg">{relatedRide.elevation}</p>
                    <p className="text-xs font-mono text-muted-foreground">M</p>
                  </div>
                  <div className="text-center">
                    <p className="stat-value text-lg">{relatedRide.duration}</p>
                    <p className="text-xs font-mono text-muted-foreground">TIME</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* More posts */}
        {morePosts.length > 0 && (
          <div className="mx-auto mt-16 max-w-5xl">
            <h3 className="mb-6 font-heading text-2xl font-bold uppercase tracking-tight">More in {post.category}</h3>
            <div className="grid gap-6 sm:grid-cols-2">
              {morePosts.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`}>
                  <article className="card-editorial group h-full transition-all hover:border-accent/30">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <SmartImage src={p.image} alt={p.title} fill className="transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-4">
                      <h4 className="font-heading text-lg font-semibold leading-tight transition-colors group-hover:text-accent">{p.title}</h4>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back */}
        <div className="mx-auto mt-12 max-w-3xl">
          <Link href="/blog" className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-accent">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to blog
          </Link>
        </div>
      </div>

      <div className="h-16" />
    </article>
  );
}
