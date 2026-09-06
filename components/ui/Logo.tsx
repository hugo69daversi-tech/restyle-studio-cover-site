import Image from 'next/image';

export function Logo({ size = 48 }: { size?: number }) {
  return (
    <Image
      src="/logo-badge.png"
      alt="ReStyle Studio Cover"
      width={size}
      height={size}
      className="rounded-full"
      priority
    />
  );
}
