import Link from 'next/link';
import { Instagram, Youtube, Github, Activity } from 'lucide-react';
import settings from '@/data/settings.json';
import profile from '@/data/profile.json';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/30">
      <div className="container-editorial py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-heading text-2xl font-bold">
              FK<span className="text-accent">.</span>
            </h3>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              {settings.siteSubheadline}
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">Navigate</h4>
            <div className="grid grid-cols-2 gap-2">
              {settings.navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">Connect</h4>
            <div className="flex gap-3">
              <a href={profile.socials.instagram} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-accent hover:border-accent/50" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
              <a href={profile.socials.youtube} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-accent hover:border-accent/50" aria-label="YouTube">
                <Youtube className="h-4 w-4" />
              </a>
              <a href={profile.socials.strava} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-accent hover:border-accent/50" aria-label="Strava">
                <Activity className="h-4 w-4" />
              </a>
              <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-accent hover:border-accent/50" aria-label="GitHub">
                <Github className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-4 font-hand text-lg text-muted-foreground">{profile.quote}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground/60">
            &copy; {new Date().getFullYear()} {profile.displayName}. All rights reserved.
          </p>
          <p className="text-xs font-mono text-muted-foreground/60">
            REAL RIDES. REAL PROGRESS.
          </p>
        </div>
      </div>
    </footer>
  );
}
