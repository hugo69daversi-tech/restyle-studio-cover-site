import { Icon } from '@/components/ui/Icon';

export function GarantieBadge({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2">
        <Icon name="shield" className="h-4 w-4 text-gradient" />
        <span className="text-sm font-semibold">
          <span className="text-gradient">10 ans</span> de garantie sur le covering architectural
        </span>
      </div>
    );
  }

  return (
    <div className="card flex items-center gap-4 border-brand-pink/20">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-brand-bg">
        <Icon name="shield" className="h-8 w-8" />
      </div>
      <div>
        <p className="text-2xl font-extrabold text-gradient leading-none">10 ANS</p>
        <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-brand-cream/80">
          Garantie covering architectural
        </p>
      </div>
    </div>
  );
}
