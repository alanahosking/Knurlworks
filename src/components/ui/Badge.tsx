import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: ReactNode;
  tone?: 'accent' | 'accent-2' | 'muted';
  className?: string;
}

export function Badge({ children, tone = 'accent', className }: BadgeProps) {
  const toneStyles = {
    accent: 'bg-accent text-[#0e0e0f]',
    'accent-2': 'bg-accent-2 text-[#0e0e0f]',
    muted: 'bg-bg-alt text-muted border border-line',
  };

  return (
    <span
      className={cn(
        'inline-block font-mono text-[0.65rem] font-semibold uppercase tracking-widest2 px-2 py-1',
        toneStyles[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
