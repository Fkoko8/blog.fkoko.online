'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import SmartImage from '@/components/shared/smart-image';
import FadeIn from '@/components/shared/fade-in';
import SectionHeader from '@/components/shared/section-header';
import photos from '@/data/photos.json';
import type { Photo } from '@/lib/types';

export default function PhotoDiary() {
  const [lightbox, setLightbox] = useState<Photo | null>(null);
  const photoList = photos as Photo[];

  if (!photoList.length) {
    return null;
  }

  return (
    <FadeIn>
      <SectionHeader title="Photo Diary" subtitle="Moments from the trail and beyond" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {photoList.map((photo, i) => (
          <motion.button
            key={photo.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setLightbox(photo)}
            className={`group relative overflow-hidden rounded-xl border border-border ${
              photo.width > photo.height ? 'col-span-2 row-span-1' : 'col-span-1 row-span-2'
            }`}
            style={{ aspectRatio: `${photo.width}/${photo.height}` }}
          >
            <SmartImage src={photo.src} alt={photo.caption} fill className="transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            {photo.annotation && (
              <p className="absolute bottom-3 left-3 font-hand text-lg text-accent opacity-0 transition-opacity group-hover:opacity-100">
                {photo.annotation}
              </p>
            )}
            <p className="absolute bottom-3 right-3 max-w-[60%] text-right text-xs text-foreground/80 opacity-0 transition-opacity group-hover:opacity-100">
              {photo.caption}
            </p>
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-h-[85vh] max-w-3xl overflow-hidden rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={lightbox.src} alt={lightbox.caption} className="max-h-[85vh] w-full object-contain" />
              {lightbox.annotation && (
                <p className="absolute bottom-4 left-4 font-hand text-2xl text-accent">{lightbox.annotation}</p>
              )}
              <p className="absolute bottom-4 right-4 text-sm text-foreground/80">{lightbox.caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </FadeIn>
  );
}
