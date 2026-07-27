import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

/**
 * KNURLWORKS wordmark: the "W" is rendered as two overlapping triangle
 * outlines whose inner edges cross, echoing the diamond cross-hatch of a
 * knurled grip. Sized in em units so it scales with the surrounding text.
 */
export function Logo({ className }: LogoProps) {
  return (
    <span
      role="img"
      aria-label="KNURLWORKS"
      className={cn('inline-flex items-center gap-[0.06em] font-body font-extrabold uppercase tracking-tight text-fg', className)}
    >
      <span aria-hidden="true">KNURL</span>
      <svg viewBox="0 0 100 70" className="h-[0.7em] w-auto shrink-0" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 8 L56 8 L31 64 Z" />
          <path d="M44 8 L90 8 L69 64 Z" />
        </g>
      </svg>
      <span aria-hidden="true">ORKS</span>
    </span>
  );
}
