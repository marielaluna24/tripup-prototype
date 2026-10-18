/** Trip cover art: Lisbon skyline at dusk, standing in for a real destination
 * photo (STYLE.md § Imagery). Composition mirrors the hi-fi reference: warm
 * gradient sky, a dome and tiled rooftops along the Tagus, fading to --bg. */
export function TripCoverLisbon() {
  return (
    <svg viewBox="0 0 390 240" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" aria-hidden="true">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--cover-sky-top)" />
          <stop offset="55%" stopColor="var(--cover-sky-mid)" />
          <stop offset="100%" stopColor="var(--cover-sky-warm)" />
        </linearGradient>
        <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--bg)" stopOpacity="0" />
          <stop offset="100%" stopColor="var(--bg)" stopOpacity="1" />
        </linearGradient>
      </defs>
      <rect width="390" height="240" fill="url(#sky)" />
      <circle cx="300" cy="70" r="30" fill="#FBE7C6" opacity="0.55" />
      <rect x="0" y="168" width="390" height="30" fill="var(--cover-water)" opacity="0.55" />
      {/* distant rooftops */}
      <g opacity="0.85">
        <rect x="-10" y="140" width="60" height="40" fill="var(--cover-wall)" />
        <path d="M-10 140 L20 124 L50 140 Z" fill="var(--cover-roof)" />
        <rect x="46" y="150" width="50" height="30" fill="var(--cover-wall)" opacity="0.9" />
        <path d="M46 150 L71 136 L96 150 Z" fill="var(--cover-roof)" opacity="0.9" />
        <rect x="150" y="146" width="56" height="34" fill="var(--cover-wall)" />
        <path d="M150 146 L178 130 L206 146 Z" fill="var(--cover-roof)" />
        <rect x="260" y="148" width="60" height="32" fill="var(--cover-wall)" opacity="0.9" />
        <path d="M260 148 L290 132 L320 148 Z" fill="var(--cover-roof)" opacity="0.9" />
        <rect x="330" y="142" width="60" height="38" fill="var(--cover-wall)" />
        <path d="M330 142 L360 126 L390 142 Z" fill="var(--cover-roof)" />
      </g>
      {/* dome landmark, centered like the hi-fi reference */}
      <g opacity="0.92">
        <rect x="95" y="118" width="16" height="44" fill="var(--cover-wall)" />
        <circle cx="103" cy="112" r="13" fill="var(--cover-wall)" />
        <rect x="100" y="94" width="6" height="18" fill="var(--cover-wall)" />
        <circle cx="103" cy="92" r="2.5" fill="var(--cover-wall)" />
      </g>
      <g opacity="0.7">
        <rect x="210" y="128" width="12" height="34" fill="var(--cover-wall)" />
        <path d="M206 128 L216 116 L226 128 Z" fill="var(--cover-roof)" />
      </g>
      <rect x="0" y="100" width="390" height="140" fill="url(#fade)" />
    </svg>
  );
}
