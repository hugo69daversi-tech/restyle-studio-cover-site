import Link from 'next/link';
import { InstagramGlyph, FacebookGlyph, TiktokGlyph } from '@/components/ui/SocialIcons';
import { FullLogo } from '@/components/ui/Logo';
import type { SiteSettings } from '@/lib/types';

export function Footer({ settings }: { settings: SiteSettings | null }) {
  const email = settings?.email || 'ReStyleStudioCover@gmail.com';
  const phone = settings?.telephone || '+33 7 85 96 53 47';
  const reseaux = [
    { url: settings?.instagram_url, label: 'Instagram', Glyph: InstagramGlyph },
    { url: settings?.facebook_url, label: 'Facebook', Glyph: FacebookGlyph },
    { url: settings?.tiktok_url, label: 'TikTok', Glyph: TiktokGlyph },
  ].filter((r) => r.url);

  return (
    <footer className="relative overflow-hidden border-t border-white/10 pb-28 pt-16 md:pb-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 text-sm text-brand-cream/60 md:grid-cols-3">
          <div>
            <p className="font-display text-base font-bold text-brand-cream">ReStyle Studio</p>
            <p className="mt-3">Covering &amp; rénovation intérieure — {settings?.zone_intervention || 'Moselle & Luxembourg'}</p>
          </div>
          <div className="space-y-2">
            <p className="font-display text-base font-bold text-brand-cream">Contact</p>
            <a href={`tel:${phone.replace(/\s/g, '')}`} className="block hover:text-brand-cream">
              {phone}
            </a>
            <a href={`mailto:${email}`} className="block hover:text-brand-cream">
              {email}
            </a>
          </div>
          <div>
            <p className="font-display text-base font-bold text-brand-cream">Suivez-nous</p>
            <div className="mt-3 flex gap-3">
              {reseaux.map(({ url, label, Glyph }) => (
                <a
                  key={label}
                  href={url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-brand-cream transition-colors hover:border-brand-pink hover:text-brand-pink"
                >
                  <Glyph className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <FullLogo className="mx-auto mt-16 h-auto w-full max-w-4xl" />

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-brand-cream/50 md:flex-row">
          <p>&copy; {new Date().getFullYear()} ReStyle Studio SARL. Tous droits réservés.</p>
          <div className="flex flex-wrap justify-center gap-5">
            <Link href="/blog" className="hover:text-brand-cream">
              Blog
            </Link>
            <Link href="/mentions-legales" className="hover:text-brand-cream">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="hover:text-brand-cream">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
