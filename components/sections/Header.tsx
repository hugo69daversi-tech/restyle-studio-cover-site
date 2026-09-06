import { Logo } from '@/components/ui/Logo';
import { Icon } from '@/components/ui/Icon';
import type { SiteSettings } from '@/lib/types';

export function Header({ settings }: { settings: SiteSettings | null }) {
  const phone = settings?.telephone || '+33 7 85 96 53 47';
  const compteurActif = settings?.compteur_actif && settings.compteur_valeur > 0;

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-brand-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
          <Logo size={40} />
          <div className="leading-tight">
            <p className="text-sm font-bold tracking-wide">
              Re<span className="text-gradient">Style</span>{' '}
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-cream/70">
                Studio
              </span>
            </p>
            {compteurActif ? (
              <p className="text-[11px] font-semibold text-gradient">
                +{settings!.compteur_valeur} chantiers réalisés
              </p>
            ) : (
              <p className="text-[11px] uppercase tracking-widest text-brand-cream/50">
                Covering &amp; rénovation
              </p>
            )}
          </div>
        </div>
        <a
          href={`tel:${phone.replace(/\s/g, '')}`}
          className="hidden items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-brand-cream transition-colors hover:border-brand-pink/60 sm:flex"
        >
          <Icon name="phone" className="h-4 w-4" />
          {phone}
        </a>
      </div>
    </header>
  );
}
