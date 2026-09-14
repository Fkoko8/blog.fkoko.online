'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import SmartImage from '@/components/shared/smart-image';
import profile from '@/data/profile.json';
import settings from '@/data/settings.json';

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden grain">
      <div className="container-editorial relative pt-8 pb-16 lg:pt-12 lg:pb-24">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:gap-8">
          {/* Left: text */}
          <motion.div
            style={{ opacity }}
            className="flex flex-col justify-center"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-4 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              Cycling Blog
            </motion.span>

            <h1 className="font-heading text-5xl font-bold uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6 }}
                className="block"
              >
                Real Rides
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6 }}
                className="block"
              >
                Real Progress
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="block text-muted-foreground"
              >
                In Between.
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 max-w-md text-sm text-muted-foreground sm:text-base"
            >
              {settings.siteSubheadline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-all hover:bg-accent/90 hover:shadow-[0_0_30px_-5px] hover:shadow-accent/50"
              >
                Read Latest Post
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent/50"
              >
                About Me
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: image with annotations */}
          <motion.div
            style={{ y }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border sm:aspect-[5/6] lg:aspect-[4/5]">
              <SmartImage
                src={profile.cover}
                alt="Cyclist on forest trail"
                fill
                priority
                className="rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

              {/* Handwritten annotations */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute left-4 top-4 rounded-xl bg-background/60 px-3 py-2 backdrop-blur-md"
              >
                <p className="font-hand text-xl text-accent">Same trails.</p>
                <p className="font-hand text-xl text-foreground">Different mindset.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-4 right-4 rounded-xl bg-background/60 px-3 py-2 backdrop-blur-md"
              >
                <p className="font-hand text-xl text-accent">Progress</p>
                <p className="font-hand text-xl text-foreground">not perfection.</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground/60"
        >
          <ArrowDown className="h-3 w-3 animate-bounce" />
          Scroll to explore
        </motion.div>
      </div>
    </section>
  );
}
