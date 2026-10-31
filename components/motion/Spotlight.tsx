'use client';

import type { ReactNode, MouseEvent } from 'react';

/** Pose --x/--y sous le curseur pour l'effet `.spotlight` (voir globals.css). */
export function Spotlight({ children, className = '' }: { children: ReactNode; className?: string }) {
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
  };

  return (
    <div onMouseMove={onMove} className={`spotlight ${className}`}>
      {children}
    </div>
  );
}
