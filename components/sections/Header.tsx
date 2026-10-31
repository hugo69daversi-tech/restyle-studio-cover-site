'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BrandMark } from '@/components/ui/Logo';
import { Icon } from '@/components/ui/Icon';
import { DEVIS_HREF } from '@/lib/devis';
import type { SiteSettings } from '@/lib/types';

const LIENS = [
  // Prefixe "/" pour fonctionner aussi depuis le blog.
  { href: '/#realisations', label: 'Réalisations' },
  { href: '/#prestations', label: 'Prestations' },
  { href: '/#process', label: 'Comment ça marche' },
];

export function Header({ settings }: { settings: SiteSettings | null }) {
  const phone = settings?.telephone || '+33 7 85 96 53 47';
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled ? 'border-b border-white/10 bg-brand-bg/75 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between px-6">
        <Link href="/" aria-label="ReStyle Studio — accueil">
          <BrandMark />
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-brand-cream/70 lg:flex">
          {LIENS.map((lien) => (
            <a key={lien.href} href={lien.href} className="transition-colors hover:text-brand-cream">
              {lien.label}
            </a>
          ))}
          <Link href="/blog" className="transition-colors hover:text-brand-cream">
            Blog
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/blog"
            className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-brand-cream transition-colors hover:border-brand-pink/60 lg:hidden"
          >
            Blog
          </Link>
          <a
            href={`tel:${phone.replace(/\s/g, '')}`}
            aria-label={`Appeler le ${phone}`}
            className="flex items-center gap-2 rounded-full border border-white/15 p-2.5 text-sm font-semibold text-brand-cream transition-colors hover:border-brand-pink/60 xl:px-4 xl:py-2"
          >
            <Icon name="phone" className="h-4 w-4" />
            <span className="hidden xl:inline">{phone}</span>
          </a>
          <a href={DEVIS_HREF} className="btn-primary hidden px-5 py-2 text-sm md:inline-flex">
            Devis gratuit
          </a>
        </div>
      </div>
    </header>
  );
}
