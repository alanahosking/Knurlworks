import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

/**
 * KNURLWORKS wordmark: the "W" is rendered as three overlapping chevrons
 * whose inner edges cross twice, echoing the diamond cross-hatch of a
 * knurled grip. Sized in em units so it scales with the surrounding text.
 */
export function Logo({ className }: LogoProps) {
  return (
    <span
      role="img"
      aria-label="KNURLWORKS"
      className={cn('inline-flex items-center gap-[0.05em] font-body font-extrabold uppercase tracking-tight text-fg', className)}
    >
      <span aria-hidden="true">KNURL</span>
      <svg viewBox="0 0 180 130" className="h-[0.72em] w-auto shrink-0" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 10 L47.5 120 L90 10" />
          <path d="M47.5 10 L90 120 L132.5 10" />
          <path d="M90 10 L132.5 120 L175 10" />
        </g>
      </svg>
      <span aria-hidden="true">ORKS</span>
    </span>
  );
}
