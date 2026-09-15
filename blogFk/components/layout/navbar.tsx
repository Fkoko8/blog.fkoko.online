'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import settings from '@/data/settings.json';
import profile from '@/data/profile.json';
import ThemeToggle from './theme-toggle';
import SearchDialog from './search-dialog';
import { useSiteContent } from '@/hooks/use-site-content';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const content = useSiteContent();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'border-b border-border bg-background/80 backdrop-blur-md'
            : 'border-b border-transparent bg-background/0'
        }`}
      >
        <nav className="container-editorial flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="font-heading text-xl font-bold tracking-tight">
              FK<span className="text-accent">.</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-7 lg:flex">
            {settings.navItems.map((item) => {
              const label = content[`nav.${item.label.toLowerCase()}`] ?? item.label;
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground hover:border-accent/50"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>
            <ThemeToggle />
            <a
              href={profile.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-9 items-center rounded-lg border border-border px-3 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:border-accent/50 sm:flex"
            >
              IG
            </a>
            <button
              onClick={() => setMobileOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-background lg:hidden"
          >
            <div className="flex h-16 items-center justify-between border-b border-border px-4">
              <span className="font-heading text-xl font-bold">
                FK<span className="text-accent">.</span>
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="flex flex-col gap-1 p-4">
              {settings.navItems.map((item, i) => {
                const label = content[`nav.${item.label.toLowerCase()}`] ?? item.label;
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center justify-between border-b border-border py-4 font-heading text-2xl font-semibold uppercase tracking-tight transition-colors ${
                        isActive ? 'text-accent' : 'text-foreground'
                      }`}
                    >
                      {label}
                      <span className="text-xs font-mono text-muted-foreground">0{i + 1}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
            <div className="absolute bottom-0 left-0 right-0 border-t border-border p-4">
              <p className="font-hand text-lg text-muted-foreground">{profile.quote}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
