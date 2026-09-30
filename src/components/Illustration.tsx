import type { Tone } from "../config";
import { CoupleSilhouette } from "./Art";

type Props = { src?: string; alt: string; tone: Tone; hint?: string };

/**
 * Shows the real illustration/photo if `src` is set.
 * Otherwise renders a tinted placeholder so the layout is easy to judge.
 */
export default function Illustration({ src, alt, tone, hint }: Props) {
  if (src) {
    return <img className="illus-img" src={src} alt={alt} loading="lazy" draggable={false} />;
  }
  return (
    <div className={`illus illus-${tone}`} role="img" aria-label={alt}>
      {tone === "night" && <span className="stars" />}
      <span className="illus-sun" />
      <span className="illus-hill h1" />
      <span className="illus-hill h2" />
      <CoupleSilhouette className="illus-couple" />
      {hint && <span className="illus-hint">{hint}</span>}
    </div>
  );
}
