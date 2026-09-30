import type { CSSProperties } from "react";

/* ---------- Floral sprig (used for the embossed envelope) ---------- */

const P0 = [30, 240];
const P1 = [20, 120];
const P2 = [100, 20];

function bez(t: number) {
  const u = 1 - t;
  return [
    u * u * P0[0] + 2 * u * t * P1[0] + t * t * P2[0],
    u * u * P0[1] + 2 * u * t * P1[1] + t * t * P2[1],
  ];
}
function tangentDeg(t: number) {
  const dx = 2 * (1 - t) * (P1[0] - P0[0]) + 2 * t * (P2[0] - P1[0]);
  const dy = 2 * (1 - t) * (P1[1] - P0[1]) + 2 * t * (P2[1] - P1[1]);
  return (Math.atan2(dy, dx) * 180) / Math.PI;
}

export function Sprig({ className, style }: { className?: string; style?: CSSProperties }) {
  const leaves = [0.12, 0.24, 0.36, 0.48, 0.6, 0.72, 0.84].map((t, i) => {
    const [x, y] = bez(t);
    const a = tangentDeg(t) + (i % 2 === 0 ? -48 : 48);
    return { x, y, a, s: 1 - t * 0.35 };
  });
  const [fx, fy] = bez(1);

  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 140 260"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d={`M${P0[0]} ${P0[1]} Q${P1[0]} ${P1[1]} ${P2[0]} ${P2[1]}`} />
      {leaves.map((l, i) => (
        <ellipse
          key={i}
          cx={15 * l.s}
          cy="0"
          rx={15 * l.s}
          ry={5.5 * l.s}
          transform={`translate(${l.x} ${l.y}) rotate(${l.a})`}
        />
      ))}
      <g transform={`translate(${fx} ${fy})`}>
        {[0, 60, 120, 180, 240, 300].map((r) => (
          <ellipse key={r} cx="0" cy="-11" rx="6" ry="11" transform={`rotate(${r})`} />
        ))}
        <circle r="3.2" />
      </g>
    </svg>
  );
}

/* ---------- Butterfly ---------- */

function Wing() {
  return (
    <g className="wing">
      <path
        d="M100 80 C 72 18, 8 6, 6 52 C 4 88, 62 98, 100 82 Z"
        fill="url(#wingUp)"
        stroke="#b99a63"
        strokeWidth="1.2"
      />
      <path
        d="M100 84 C 70 100, 26 128, 50 148 C 76 162, 98 122, 100 84 Z"
        fill="url(#wingLow)"
        stroke="#b99a63"
        strokeWidth="1.2"
      />
      <path d="M100 80 C 70 52, 40 40, 20 46" stroke="#c9ad78" strokeWidth=".8" fill="none" />
      <path d="M100 84 C 72 88, 46 92, 20 62" stroke="#c9ad78" strokeWidth=".8" fill="none" />
      <path d="M100 86 C 82 108, 66 124, 54 140" stroke="#c9ad78" strokeWidth=".8" fill="none" />
    </g>
  );
}

export function Butterfly({ className }: { className?: string }) {
  return (
    <svg className={`butterfly ${className ?? ""}`} viewBox="0 0 200 170" aria-hidden="true">
      <defs>
        <linearGradient id="wingUp" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fffaf0" />
          <stop offset=".7" stopColor="#f3e6cf" />
          <stop offset="1" stopColor="#e2c99b" />
        </linearGradient>
        <linearGradient id="wingLow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f6ead4" />
          <stop offset="1" stopColor="#d9bb85" />
        </linearGradient>
      </defs>
      <Wing />
      <g transform="translate(200 0) scale(-1 1)">
        <Wing />
      </g>
      <ellipse cx="100" cy="86" rx="3.4" ry="26" fill="#8a6a3a" />
      <path d="M98 62 C 92 40, 84 32, 78 28" stroke="#8a6a3a" strokeWidth="1.2" fill="none" />
      <path d="M102 62 C 108 40, 116 32, 122 28" stroke="#8a6a3a" strokeWidth="1.2" fill="none" />
    </svg>
  );
}

/* ---------- Wax seal ---------- */

export function WaxSeal() {
  return (
    <svg className="seal-svg" viewBox="0 0 120 120" aria-hidden="true">
      <defs>
        <radialGradient id="wax" cx=".35" cy=".3" r=".9">
          <stop offset="0" stopColor="#e6d3f2" />
          <stop offset=".55" stopColor="#c4a6dd" />
          <stop offset="1" stopColor="#9f7fc0" />
        </radialGradient>
        <filter id="rough" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency=".06" numOctaves="2" seed="4" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="6" />
        </filter>
      </defs>
      <circle cx="60" cy="60" r="50" fill="url(#wax)" filter="url(#rough)" />
      <circle cx="60" cy="60" r="38" fill="none" stroke="#f3e8fb" strokeOpacity=".7" strokeWidth="1.6" />
      <circle cx="60" cy="60" r="34" fill="none" stroke="#8f6fb3" strokeOpacity=".35" strokeWidth="1" />
      <g transform="translate(60 60) scale(.3) translate(-100 -85)" fill="#f3e8fb" fillOpacity=".9" stroke="#8f6fb3" strokeOpacity=".5" strokeWidth="2">
        <path d="M100 80 C 72 18, 8 6, 6 52 C 4 88, 62 98, 100 82 Z" />
        <path d="M100 84 C 70 100, 26 128, 50 148 C 76 162, 98 122, 100 84 Z" />
        <g transform="translate(200 0) scale(-1 1)">
          <path d="M100 80 C 72 18, 8 6, 6 52 C 4 88, 62 98, 100 82 Z" />
          <path d="M100 84 C 70 100, 26 128, 50 148 C 76 162, 98 122, 100 84 Z" />
        </g>
      </g>
    </svg>
  );
}

/* ---------- Couple silhouette used by illustration placeholders ---------- */

export function CoupleSilhouette({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 160 200" aria-hidden="true">
      {/* groom */}
      <circle cx="58" cy="38" r="14" fill="currentColor" />
      <path d="M36 200 L40 78 C 40 62, 76 62, 76 78 L80 200 Z" fill="currentColor" />
      {/* bride */}
      <circle cx="104" cy="44" r="13" fill="currentColor" opacity=".85" />
      <path d="M78 200 L88 88 C 90 70, 120 70, 122 88 L142 200 Z" fill="currentColor" opacity=".85" />
    </svg>
  );
}
