import logoSrc from '@/assets/knurlworks-logo.png';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

/**
 * Source file is black art on a transparent background. In dark theme
 * it's inverted to white via the `.brand-logo` rule in index.css, keyed
 * off the same [data-theme] attribute the rest of the color system uses.
 */
export function Logo({ className }: LogoProps) {
  return (
    <img
      src={logoSrc}
      alt="KnurlWorks"
      className={cn('brand-logo w-auto', className)}
    />
  );
}
