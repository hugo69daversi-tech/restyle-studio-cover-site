'use client';

import { motion, useInView, useMotionValue, useReducedMotion, animate } from 'motion/react';
import { useEffect, useRef, useState, type ReactNode } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

/** Apparition au scroll : monte, se defloute et s'eclaire. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Titre dont les mots surgissent un par un depuis un masque. */
export function WordsReveal({
  text,
  className,
  accent = [],
  delay = 0,
  as: Tag = 'h2',
}: {
  text: string;
  className?: string;
  /** Index des mots a passer en degrade. */
  accent?: number[];
  delay?: number;
  as?: 'h1' | 'h2' | 'p';
}) {
  const words = text.split(' ');
  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-top">
          <motion.span
            className={`inline-block ${accent.includes(i) ? 'text-gradient' : ''}`}
            initial={{ y: '110%', rotate: 4 }}
            whileInView={{ y: '0%', rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: delay + i * 0.06, ease: EASE }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Nombre qui defile jusqu'a sa valeur quand il entre a l'ecran. */
export function CountUp({ to, prefix = '', suffix = '' }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const value = useMotionValue(0);
  const [display, setDisplay] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(value, to, { duration: 1.8, ease: EASE, onUpdate: (v) => setDisplay(Math.round(v)) });
    return () => controls.stop();
  }, [inView, reduce, to, value]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
