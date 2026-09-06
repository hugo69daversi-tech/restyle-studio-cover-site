export function Logo({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="rs-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff3d7f" />
          <stop offset="100%" stopColor="#ff8a3d" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="29" stroke="url(#rs-gradient)" strokeWidth="3" />
      <text
        x="32"
        y="41"
        textAnchor="middle"
        fontSize="24"
        fontWeight="700"
        fill="url(#rs-gradient)"
        fontFamily="var(--font-inter), sans-serif"
      >
        RS
      </text>
    </svg>
  );
}
