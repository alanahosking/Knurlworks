import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode, Ref } from 'react';
import { Link, type LinkProps as RouterLinkProps } from 'react-router-dom';
import { cn } from '@/lib/utils';

const baseStyles =
  'inline-flex items-center justify-center gap-2 font-mono text-xs font-medium uppercase tracking-widest2 transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none';

const variants = {
  primary: 'bg-accent text-[#0e0e0f] hover:bg-fg px-7 py-4',
  secondary: 'border border-fg text-fg hover:bg-fg hover:text-bg px-7 py-4',
  ghost: 'text-fg hover:text-accent px-2 py-2',
  outline: 'border border-line text-fg hover:border-accent hover:text-accent px-6 py-3',
};

type Variant = keyof typeof variants;

interface CommonProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

/** Internal, client-side-routed navigation (SPA — no full page reload). */
type InternalLinkProps = CommonProps & Omit<RouterLinkProps, 'className'> & { as: 'link' };
/** External or non-routed anchor (full navigation, e.g. #anchors or off-site). */
type ExternalLinkProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a' };
/** Native button for in-page actions. */
type NativeButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' };

type ButtonProps = InternalLinkProps | ExternalLinkProps | NativeButtonProps;

/** Strips the shared visual props so only the element-native attributes get spread. */
function nativeProps<T extends CommonProps & { as?: string }>(props: T): Omit<T, keyof CommonProps | 'as'> {
  const rest = { ...props };
  delete (rest as Partial<T>).variant;
  delete (rest as Partial<T>).className;
  delete (rest as Partial<T>).children;
  delete (rest as Partial<T>).as;
  return rest;
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>((props, ref) => {
  const { variant = 'primary', className, children, as = 'button' } = props;
  const classes = cn(baseStyles, variants[variant], className);

  if (as === 'link') {
    const linkProps = nativeProps(props as InternalLinkProps);
    return (
      <Link ref={ref as Ref<HTMLAnchorElement>} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  if (as === 'a') {
    const anchorProps = nativeProps(props as ExternalLinkProps);
    return (
      <a ref={ref as Ref<HTMLAnchorElement>} className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const buttonProps = nativeProps(props as NativeButtonProps);
  return (
    <button ref={ref as Ref<HTMLButtonElement>} className={classes} {...buttonProps}>
      {children}
    </button>
  );
});

Button.displayName = 'Button';
