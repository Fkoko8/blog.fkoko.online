'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Check, Clock, Wrench } from 'lucide-react';
import SmartImage from '@/components/shared/smart-image';
import bike from '@/data/bike.json';

export default function BikePage() {
  return (
    <div className="container-editorial section-padding">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-4xl font-bold uppercase tracking-tight sm:text-5xl">{bike.name}</h1>
        <p className="mt-2 max-w-lg text-muted-foreground">{bike.tagline}</p>
      </div>

      {/* Overview */}
      <div className="mb-12 card-editorial grain overflow-hidden">
        <div className="grid gap-0 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden">
            <SmartImage src={bike.image} alt={bike.name} fill priority />
          </div>
          <div className="flex flex-col justify-center p-6">
            <h2 className="mb-3 font-heading text-2xl font-bold uppercase tracking-tight">Overview</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">{bike.overview}</p>
            <div className="mt-4 flex items-center gap-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Weight</span>
                <p className="stat-value text-2xl text-accent">{bike.weight}</p>
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Year</span>
                <p className="stat-value text-2xl text-foreground">{bike.year}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full spec table */}
      <div className="mb-12">
        <h2 className="mb-4 font-heading text-2xl font-bold uppercase tracking-tight">Full Specification</h2>
        <div className="card-editorial overflow-hidden">
          <div className="divide-y divide-border">
            {bike.specifications.map((spec, i) => (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="flex items-center justify-between p-4 transition-colors hover:bg-muted/30"
              >
                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{spec.label}</span>
                <span className="text-sm font-medium text-foreground">{spec.value}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Geometry */}
      <div className="mb-12">
        <h2 className="mb-4 font-heading text-2xl font-bold uppercase tracking-tight">Geometry</h2>
        <div className="card-editorial p-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {Object.entries(bike.geometry).map(([key, value]) => (
              <div key={key}>
                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{key}</span>
                <p className="stat-value mt-1 text-lg text-foreground">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Build history */}
      <div className="mb-12">
        <h2 className="mb-4 font-heading text-2xl font-bold uppercase tracking-tight">Build History</h2>
        <div className="card-editorial p-6">
          <div className="space-y-0">
            {bike.buildHistory.map((entry, i) => (
              <motion.div
                key={entry.stage}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4"
              >
                <div className="flex flex-col items-center">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                    i === bike.buildHistory.length - 1 ? 'border-accent bg-accent/10' : 'border-border bg-card'
                  }`}>
                    <span className="text-xs font-mono font-bold text-muted-foreground">{i + 1}</span>
                  </div>
                  {i < bike.buildHistory.length - 1 && <div className="w-0.5 flex-1 bg-border" />}
                </div>
                <div className="flex-1 pb-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-lg font-semibold uppercase tracking-tight">{entry.stage}</h3>
                    <span className="text-xs font-mono text-muted-foreground">{entry.date}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{entry.description}</p>
                  <span className="mt-2 inline-block text-xs font-mono text-accent">{entry.weight}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Setup notes */}
      <div className="mb-12">
        <h2 className="mb-4 font-heading text-2xl font-bold uppercase tracking-tight">Setup Notes</h2>
        <div className="card-editorial p-6">
          <ul className="space-y-3">
            {bike.setupNotes.map((note, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span className="text-sm text-foreground/80">{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Upgrades */}
      <div>
        <h2 className="mb-4 font-heading text-2xl font-bold uppercase tracking-tight">Upgrades</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bike.upgrades.map((upgrade, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="card-editorial p-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-base font-semibold uppercase tracking-tight">{upgrade.component}</h3>
                <span className={`rounded-full px-2 py-0.5 text-xs font-mono font-semibold uppercase ${
                  upgrade.status === 'installed'
                    ? 'bg-accent/10 text-accent'
                    : 'border border-border text-muted-foreground'
                }`}>
                  {upgrade.status}
                </span>
              </div>
              <p className="mt-1 text-xs font-mono text-muted-foreground">{upgrade.brand}</p>
              <p className="mt-2 text-sm text-muted-foreground">{upgrade.notes}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
