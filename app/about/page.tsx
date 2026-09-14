'use client';

import { motion } from 'framer-motion';
import { MapPin, Bike, Wrench, BookOpen, Compass } from 'lucide-react';
import SmartImage from '@/components/shared/smart-image';
import profile from '@/data/profile.json';
import goals from '@/data/goals.json';
import type { Goal } from '@/lib/types';

const sections = [
  {
    title: 'Who I Am',
    icon: <MapPin className="h-5 w-5" />,
    text: `I'm ${profile.name}, a student and XC cyclist based in ${profile.location}. I build things — websites, bikes, and a life I'm proud of. This site is where it all comes together.`,
  },
  {
    title: 'Why I Ride',
    icon: <Bike className="h-5 w-5" />,
    text: 'I ride because it\'s the one thing in my life that\'s entirely mine. No group projects, no deadlines, no compromises. Just me, the trail, and how hard I\'m willing to work. The bike doesn\'t care about excuses.',
  },
  {
    title: 'What I\'m Building',
    icon: <Wrench className="h-5 w-5" />,
    text: 'A race-ready XC bike, a consistent training routine, and this journal — a place to document the journey. Every ride, every upgrade, every race. It\'s all part of the same project: getting better, one step at a time.',
  },
  {
    title: 'What I\'m Learning',
    icon: <BookOpen className="h-5 w-5" />,
    text: 'How to train smart, not just hard. How to handle technical descents without fear. How to balance school, work, and riding. How to accept that progress is never linear, but always forward.',
  },
  {
    title: 'Where I\'m Going',
    icon: <Compass className="h-5 w-5" />,
    text: 'More races, longer rides, harder trails. A sub-1:40 XC race time. An FTP of 260W. New trails, new challenges, and the same simple goal: ride fast, learn a lot, and enjoy the process.',
  },
];

export default function AboutPage() {
  const goalList = goals as Goal[];

  return (
    <div className="container-editorial section-padding">
      {/* Hero */}
      <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_300px]">
        <div>
          <h1 className="font-heading text-4xl font-bold uppercase tracking-tight sm:text-5xl lg:text-6xl">
            About
          </h1>
          <p className="mt-4 max-w-lg text-lg text-muted-foreground">{profile.bio}</p>
          <div className="mt-6 border-l-2 border-accent pl-4">
            <p className="font-hand text-2xl text-foreground/80">&ldquo;{profile.quote}&rdquo;</p>
          </div>
        </div>
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-border">
          <SmartImage src={profile.avatar} alt={profile.name} fill />
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {sections.map((section, i) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
            className="card-editorial grain p-6"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                {section.icon}
              </span>
              <h2 className="font-heading text-2xl font-bold uppercase tracking-tight">{section.title}</h2>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">{section.text}</p>
          </motion.div>
        ))}
      </div>

      {/* Goals summary */}
      <div className="mt-12">
        <h2 className="mb-4 font-heading text-2xl font-bold uppercase tracking-tight">Current Goals</h2>
        <div className="card-editorial p-6">
          <div className="space-y-3">
            {goalList.map((goal) => (
              <div key={goal.id} className="flex items-center gap-3">
                <div className={`flex h-5 w-5 items-center justify-center rounded border ${
                  goal.done ? 'border-accent bg-accent' : 'border-border'
                }`}>
                  {goal.done && <span className="text-xs text-accent-foreground">✓</span>}
                </div>
                <span className={`flex-1 text-sm ${goal.done ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                  {goal.text}
                </span>
                {!goal.done && (
                  <span className="text-xs font-mono text-muted-foreground">{goal.progress}%</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
