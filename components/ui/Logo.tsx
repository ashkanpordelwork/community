export function Logo({ size = 40, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth={5.5} strokeLinecap="round">
        <circle cx="50" cy="50" r="45" />
        <circle cx="50" cy="50" r="33.5" />
        <circle cx="50" cy="50" r="22" />
      </g>
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <circle cx="50" cy="30" r="6.5" fill="currentColor" stroke="none" />
        <line x1="50" y1="37" x2="50" y2="57" strokeWidth={10} />
        <line x1="50" y1="56" x2="42" y2="73" strokeWidth={7} />
        <line x1="50" y1="56" x2="58" y2="73" strokeWidth={7} />
        <polyline points="45,41 33,37 29,24" strokeWidth={6.5} />
        <polyline points="55,41 67,37 71,24" strokeWidth={6.5} />
      </g>
    </svg>
  );
}
