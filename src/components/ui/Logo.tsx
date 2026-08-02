import logoSrc from '@/assets/knurlworks-logo.png';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

/**
 * The source file is black stencil art on an opaque white background.
 * `invert` flips it to white-on-black, then `mix-blend-mode: screen`
 * makes the (now-black) background optically disappear against the
 * page's dark background, leaving just the white artwork visible.
 */
export function Logo({ className }: LogoProps) {
  return (
    <img
      src={logoSrc}
      alt="KnurlWorks"
      className={cn('w-auto invert mix-blend-screen', className)}
    />
  );
}
