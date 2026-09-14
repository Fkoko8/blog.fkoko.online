'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { type Variants } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}

export default function FadeIn({ children, delay = 0, y = 20, className, once = true }: FadeInProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '-50px' });

  const variants: Variants = {
    hidden: { opacity: 0, y },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
