import styles from "./Illustration.module.css";

export type IllustrationKind = "house" | "restaurant" | "belem" | "alfama";

export function Illustration({ kind, className }: { kind: IllustrationKind; className?: string }) {
  return (
    <div className={[styles.wrap, className].filter(Boolean).join(" ")} aria-hidden="true">
      {kind === "house" && <HouseArt />}
      {kind === "restaurant" && <RestaurantArt />}
      {kind === "belem" && <BelemArt />}
      {kind === "alfama" && <AlfamaArt />}
    </div>
  );
}

/** Free time at the house: a warm living room — pendant lamp, sofa, plant. */
function HouseArt() {
  return (
    <svg viewBox="0 0 112 172" preserveAspectRatio="xMidYMid slice">
      <rect width="112" height="172" fill="var(--illus-cream)" />
      <rect x="0" y="0" width="112" height="100" fill="var(--illus-cream-deep)" />
      <rect x="14" y="18" width="30" height="40" rx="4" fill="#FFFFFF" opacity="0.6" />
      <path d="M14 18 L29 8 L44 18 Z" fill="var(--illus-green-soft)" opacity="0.7" />
      <rect x="62" y="14" width="24" height="46" rx="4" fill="var(--illus-pink)" opacity="0.5" />
      <circle cx="74" cy="8" r="3" fill="var(--illus-yellow)" />
      <line x1="40" y1="2" x2="40" y2="30" stroke="var(--illus-terracotta)" strokeWidth="2" />
      <path d="M26 30 Q40 22 54 30 L50 38 Q40 32 30 38 Z" fill="var(--illus-terracotta)" />
      <ellipse cx="40" cy="40" rx="3" ry="4" fill="var(--illus-yellow)" />
      <rect x="10" y="108" width="60" height="38" rx="14" fill="#FFFFFF" />
      <rect x="10" y="108" width="60" height="20" rx="10" fill="var(--illus-pink)" />
      <rect x="14" y="112" width="16" height="12" rx="6" fill="var(--illus-pink-deep)" />
      <rect x="34" y="112" width="16" height="12" rx="6" fill="var(--illus-green-soft)" />
      <rect x="54" y="112" width="12" height="12" rx="6" fill="var(--illus-yellow)" />
      <ellipse cx="40" cy="150" rx="34" ry="8" fill="var(--illus-green-soft)" opacity="0.5" />
      <rect x="20" y="138" width="40" height="16" rx="8" fill="var(--illus-green)" />
      <circle cx="94" cy="140" r="14" fill="var(--illus-green-soft)" opacity="0.6" />
      <rect x="88" y="150" width="4" height="20" fill="var(--illus-green)" />
    </svg>
  );
}

/** Dinner: Taberna da Rua — pink chairs, plants, string lights. */
function RestaurantArt() {
  return (
    <svg viewBox="0 0 112 172" preserveAspectRatio="xMidYMid slice">
      <rect width="112" height="172" fill="var(--illus-cream)" />
      <rect x="0" y="0" width="112" height="60" fill="var(--illus-green)" opacity="0.85" />
      <path d="M0 10 Q28 -4 56 10 T112 10" stroke="var(--illus-yellow)" strokeWidth="1.5" fill="none" opacity="0.8" />
      <circle cx="14" cy="9" r="2" fill="var(--illus-yellow)" />
      <circle cx="42" cy="4" r="2" fill="var(--illus-yellow)" />
      <circle cx="70" cy="7" r="2" fill="var(--illus-yellow)" />
      <circle cx="98" cy="3" r="2" fill="var(--illus-yellow)" />
      <rect x="-4" y="40" width="50" height="60" rx="6" fill="var(--illus-pink-deep)" opacity="0.9" />
      <rect x="66" y="36" width="50" height="64" rx="6" fill="var(--illus-pink-deep)" opacity="0.7" />
      <rect x="18" y="86" width="36" height="24" rx="4" fill="#FFFFFF" />
      <circle cx="26" cy="92" r="3" fill="var(--illus-terracotta)" />
      <circle cx="46" cy="92" r="3" fill="var(--illus-green)" />
      <rect x="14" y="110" width="44" height="30" rx="10" fill="var(--illus-pink)" />
      <rect x="20" y="118" width="32" height="6" rx="3" fill="#FFFFFF" opacity="0.7" />
      <rect x="62" y="104" width="38" height="36" rx="10" fill="var(--illus-green)" />
      <circle cx="90" cy="118" r="16" fill="var(--illus-green-soft)" opacity="0.5" />
      <rect x="86" y="130" width="4" height="24" fill="var(--illus-green)" />
      <rect x="0" y="150" width="112" height="22" fill="var(--illus-cream-deep)" />
    </svg>
  );
}

/** Pastéis de Belém: a pastel de nata on a cafe plate. */
function BelemArt() {
  return (
    <svg viewBox="0 0 112 172" preserveAspectRatio="xMidYMid slice">
      <rect width="112" height="172" fill="var(--illus-cream)" />
      <rect x="0" y="0" width="112" height="90" fill="var(--illus-cream-deep)" />
      <ellipse cx="56" cy="110" rx="38" ry="10" fill="#FFFFFF" />
      <path
        d="M30 100 Q30 68 56 64 Q82 68 82 100 Z"
        fill="var(--illus-terracotta)"
      />
      <path
        d="M36 98 Q38 76 56 72 Q74 76 76 98 Z"
        fill="var(--illus-yellow)"
      />
      <path d="M40 78 L46 92 M56 74 L56 92 M72 78 L66 92" stroke="var(--illus-terracotta)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="20" cy="36" r="14" fill="var(--illus-pink)" opacity="0.6" />
      <circle cx="90" cy="30" r="10" fill="var(--illus-green-soft)" opacity="0.6" />
      <rect x="0" y="150" width="112" height="22" fill="var(--illus-cream-deep)" />
    </svg>
  );
}

/** Alfama walk: tiled hillside houses and a tram line. */
function AlfamaArt() {
  return (
    <svg viewBox="0 0 112 172" preserveAspectRatio="xMidYMid slice">
      <rect width="112" height="172" fill="var(--illus-blue-soft)" opacity="0.5" />
      <rect x="-6" y="60" width="50" height="60" fill="var(--illus-pink)" />
      <rect x="40" y="40" width="44" height="80" fill="var(--illus-cream-deep)" />
      <rect x="78" y="70" width="40" height="50" fill="var(--illus-green-soft)" opacity="0.8" />
      <path d="M40 40 L62 24 L84 40 Z" fill="var(--illus-terracotta)" />
      <path d="M-6 60 L19 46 L44 60 Z" fill="var(--illus-terracotta)" />
      <rect x="50" y="56" width="10" height="12" fill="#FFFFFF" opacity="0.8" />
      <rect x="66" y="56" width="10" height="12" fill="#FFFFFF" opacity="0.8" />
      <rect x="50" y="78" width="10" height="12" fill="#FFFFFF" opacity="0.8" />
      <rect x="66" y="78" width="10" height="12" fill="#FFFFFF" opacity="0.8" />
      <rect x="0" y="140" width="112" height="6" fill="var(--illus-green)" />
      <rect x="16" y="128" width="26" height="14" rx="3" fill="var(--illus-yellow)" />
      <rect x="16" y="128" width="26" height="6" fill="#FFFFFF" opacity="0.5" />
      <circle cx="22" cy="144" r="3" fill="#1A1A1A" opacity="0.6" />
      <circle cx="36" cy="144" r="3" fill="#1A1A1A" opacity="0.6" />
      <rect x="0" y="150" width="112" height="22" fill="var(--illus-cream)" />
    </svg>
  );
}
