import { Icon } from '@/components/ui/Icon';
import { DEVIS_HREF } from '@/lib/devis';

/** Barre d'action toujours visible en bas d'ecran sur mobile. */
export function MobileCtaBar({ phone }: { phone: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex gap-2 border-t border-white/10 bg-brand-bg/90 p-3 backdrop-blur-md md:hidden">
      <a
        href={`tel:${phone.replace(/\s/g, '')}`}
        className="btn-secondary flex-1 gap-2 px-4 py-3"
        aria-label={`Appeler le ${phone}`}
      >
        <Icon name="phone" className="h-5 w-5" />
        Appeler
      </a>
      <a href={DEVIS_HREF} className="btn-primary flex-[1.6] px-4 py-3">
        Devis gratuit
      </a>
    </div>
  );
}
