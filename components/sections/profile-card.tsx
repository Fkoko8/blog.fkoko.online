'use client';

import { Instagram, Youtube, Activity, Github, MapPin } from 'lucide-react';
import SmartImage from '@/components/shared/smart-image';
import FadeIn from '@/components/shared/fade-in';
import profile from '@/data/profile.json';
import { useSiteContent } from '@/hooks/use-site-content';

export default function ProfileCard() {
  const content = useSiteContent();
  return (
    <FadeIn className="h-full">
      <div className="card-editorial grain flex h-full flex-col p-6">
        <div className="flex items-start gap-4">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-border">
            <SmartImage src={content['profile.avatar'] || profile.avatar} alt={content['profile.name'] || profile.name} fill />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-heading text-xl font-bold uppercase tracking-tight">{content['profile.displayName']}</h3>
            <p className="text-xs text-muted-foreground">{content['profile.role']}</p>
            <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground/70">
              <MapPin className="h-3 w-3" />
              {content['profile.location']}
            </div>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {content['profile.bio']}
        </p>

        <div className="mt-4 border-l-2 border-accent/50 pl-3">
          <p className="font-hand text-lg text-foreground/80">&ldquo;{content['profile.quote']}&rdquo;</p>
        </div>

        <div className="mt-auto flex gap-2 pt-6">
          <a href={profile.socials.instagram} target="_blank" rel="noopener noreferrer" className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-accent hover:border-accent/50" aria-label="Instagram">
            <Instagram className="h-4 w-4" />
          </a>
          <a href={profile.socials.youtube} target="_blank" rel="noopener noreferrer" className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-accent hover:border-accent/50" aria-label="YouTube">
            <Youtube className="h-4 w-4" />
          </a>
          <a href={profile.socials.strava} target="_blank" rel="noopener noreferrer" className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-accent hover:border-accent/50" aria-label="Strava">
            <Activity className="h-4 w-4" />
          </a>
          <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-accent hover:border-accent/50" aria-label="GitHub">
            <Github className="h-4 w-4" />
          </a>
        </div>
      </div>
    </FadeIn>
  );
}
