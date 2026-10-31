import Image from 'next/image';

/**
 * Le badge (logo-badge.webp) est recadre et centre sur son anneau, fond
 * transparent. Les logotypes ont encore leur fond brun : ils sont fondus sur
 * les bords. A simplifier quand on aura des PNG/SVG a fond transparent.
 */
export function Logo({ size = 48 }: { size?: number }) {
  return (
    <Image
      src="/logo-badge.webp"
      alt="ReStyle Studio"
      width={size}
      height={size}
      className="rounded-full"
      priority
    />
  );
}

export function Wordmark({ className = 'h-9 w-auto' }: { className?: string }) {
  return (
    <Image
      src="/logo-wordmark.png"
      alt="ReStyle Studio"
      width={1210}
      height={380}
      className={`${className} [mask-image:radial-gradient(ellipse_70%_75%_at_center,black_55%,transparent_100%)]`}
      priority
    />
  );
}

/** Logo complet avec la signature "Covering & rénovation intérieure" (grand format). */
export function FullLogo({ className = 'w-full h-auto' }: { className?: string }) {
  return (
    <Image
      src="/logo-full.webp"
      alt="ReStyle Studio — Covering & rénovation intérieure"
      width={1320}
      height={471}
      className={`${className} [mask-image:radial-gradient(ellipse_65%_70%_at_center,black_60%,transparent_100%)]`}
    />
  );
}

export function BrandMark() {
  return (
    <span className="flex items-center gap-2.5">
      <Logo size={40} />
      <Wordmark className="h-8 w-auto sm:h-9" />
    </span>
  );
}
