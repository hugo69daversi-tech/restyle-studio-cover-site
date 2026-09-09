import Link from 'next/link';
import { InstagramGlyph, FacebookGlyph, TiktokGlyph } from '@/components/ui/SocialIcons';
import type { SiteSettings } from '@/lib/types';

export function Footer({ settings }: { settings: SiteSettings | null }) {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center text-sm text-brand-cream/60">
        <p>
          ReStyle Studio Cover — {settings?.zone_intervention || 'Moselle & Luxembourg'} —{' '}
          <a href={`mailto:${settings?.email || 'ReStyleStudioCover@gmail.com'}`} className="hover:text-brand-cream">
            {settings?.email || 'ReStyleStudioCover@gmail.com'}
          </a>{' '}
          —{' '}
          <a href={`tel:${(settings?.telephone || '+33785965347').replace(/\s/g, '')}`} className="hover:text-brand-cream">
            {settings?.telephone || '+33 7 85 96 53 47'}
          </a>
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {settings?.instagram_url && (
            <a
              href={settings.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-brand-cream transition-colors hover:border-brand-pink/60"
            >
              <InstagramGlyph className="h-4 w-4" />
              Instagram
            </a>
          )}
          {settings?.facebook_url && (
            <a
              href={settings.facebook_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-brand-cream transition-colors hover:border-brand-pink/60"
            >
              <FacebookGlyph className="h-4 w-4" />
              Facebook
            </a>
          )}
          {settings?.tiktok_url && (
            <a
              href={settings.tiktok_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-brand-cream transition-colors hover:border-brand-pink/60"
            >
              <TiktokGlyph className="h-4 w-4" />
              TikTok
            </a>
          )}
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/blog" className="hover:text-brand-cream">
            Blog
          </Link>
          <Link href="/mentions-legales" className="hover:text-brand-cream">
            Mentions légales
          </Link>
          <Link href="/confidentialite" className="hover:text-brand-cream">
            Politique de confidentialité
          </Link>
          <Link href="/admin" className="hover:text-brand-cream">
            Espace admin
          </Link>
        </div>
        <p>&copy; {new Date().getFullYear()} ReStyle Studio SARL. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
