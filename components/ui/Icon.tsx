const paths: Record<string, string> = {
  sparkles: 'M12 2l1.8 5.4L19 9l-5.2 1.6L12 16l-1.8-5.4L5 9l5.2-1.6L12 2zM19 15l.9 2.6L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.4L19 15z',
  hammer: 'M9 4l3 3-8 8 2 2 8-8 3 3 3-3-8-8-3 3zM3 21l6-6-2-2-6 6 2 2z',
  shield: 'M12 2l8 4v6c0 5-3.4 8.7-8 10-4.6-1.3-8-5-8-10V6l8-4z',
  palette: 'M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.3 0-1.1.9-2 2-2h2.4c3.1 0 5.6-2.5 5.6-5.6C22.9 5.2 18 2 12 2zM7 13a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm3-4a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm3 4a1.5 1.5 0 110-3 1.5 1.5 0 010 3z',
  phone: 'M6.6 10.8c1.4 2.7 3.7 5 6.4 6.4l2.1-2.1c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.1 21 3 13.9 3 5c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.3 0 .7-.2 1l-2.1 2.1z',
  chevron: 'M6 9l6 6 6-6',
};

export function Icon({ name, className = 'h-6 w-6' }: { name: string; className?: string }) {
  const d = paths[name] || paths.sparkles;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path d={d} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
