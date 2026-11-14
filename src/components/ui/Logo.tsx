import logoSrc from '@/assets/knurlworks-logo.png';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

/**
 * Source file is black art on a transparent background. In dark theme
 * it's inverted to white via the `.brand-logo` rule in index.css, keyed
 * off the same [data-theme] attribute the rest of the color system uses.
 *
 * The trademark mark sits beside the artwork as text rather than inside the
 * image, so it follows the theme colour and stays crisp. It is hidden from
 * screen readers so the logo is still announced as just "KnurlWorks".
 */
export function Logo({ className }: LogoProps) {
  return (
    <span className="inline-flex items-start">
      <img
        src={logoSrc}
        alt="KnurlWorks"
        className={cn('brand-logo w-auto', className)}
      />
      <span aria-hidden="true" className="-ml-1 mt-[14px] font-body text-xs font-medium leading-none text-fg">
        ™
      </span>
    </span>
  );
}
