import type { ProductCategory } from '@/types';

interface ProductArtProps {
  category: ProductCategory;
  swatch: string;
  className?: string;
}

/**
 * RIOTWEAR renders products as mono-line tech-pack schematics rather than
 * lifestyle photography — the same drafting language brands use on cut
 * sheets, tinted with the product's colorway. It's the site's signature
 * illustration system, applied consistently across every card and detail
 * view.
 */
export function ProductArt({ category, swatch, className }: ProductArtProps) {
  const stroke = '#0e0e0f';
  const lines: Record<ProductCategory, JSX.Element> = {
    tees: (
      <g stroke={stroke} strokeWidth="2" fill="none" strokeLinejoin="round">
        <path d="M70 60 L100 40 L140 40 L170 60 L200 50 L215 85 L190 100 L180 90 L180 210 L60 210 L60 90 L50 100 L25 85 L55 60Z" />
        <path d="M100 40 C100 55 140 55 140 40" />
      </g>
    ),
    hoodies: (
      <g stroke={stroke} strokeWidth="2" fill="none" strokeLinejoin="round">
        <path d="M65 70 L95 45 C105 30 135 30 145 45 L175 70 L205 60 L220 92 L195 108 L182 98 L182 215 L58 215 L58 98 L45 108 L20 92 L35 60Z" />
        <circle cx="120" cy="60" r="26" />
        <path d="M105 95 L135 95 L135 150 L105 150Z" />
      </g>
    ),
    shorts: (
      <g stroke={stroke} strokeWidth="2" fill="none" strokeLinejoin="round">
        <path d="M55 55 L185 55 L190 95 L150 95 L150 200 L120 200 L118 110 L122 200 L92 200 L90 95 L50 95Z" />
        <path d="M55 55 L50 95 M185 55 L190 95" />
      </g>
    ),
    leggings: (
      <g stroke={stroke} strokeWidth="2" fill="none" strokeLinejoin="round">
        <path d="M75 40 L165 40 L172 100 L150 100 L142 230 L118 230 L120 110 L120 230 L98 230 L90 100 L68 100Z" />
        <path d="M75 40 L68 100 M165 40 L172 100" />
      </g>
    ),
    accessories: (
      <g stroke={stroke} strokeWidth="2" fill="none" strokeLinejoin="round">
        <rect x="45" y="90" width="150" height="50" rx="6" />
        <circle cx="120" cy="115" r="12" />
        <path d="M45 115 L20 115 M195 115 L220 115" />
      </g>
    ),
  };

  return (
    <svg
      viewBox="0 0 240 240"
      className={className}
      role="img"
      aria-label={`${category} schematic illustration`}
    >
      <rect x="0" y="0" width="240" height="240" fill={swatch} opacity="0.16" />
      {lines[category]}
    </svg>
  );
}
