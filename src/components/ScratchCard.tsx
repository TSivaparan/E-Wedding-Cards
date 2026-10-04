import { useState } from "react";

type Props = { label: string; value: string; onReveal?: () => void };

export default function ScratchCard({ label, value, onReveal }: Props) {
  const [revealed, setRevealed] = useState(false);

  const reveal = () => {
    if (revealed) return;
    setRevealed(true);
    onReveal?.();
  };

  return (
    <button
      type="button"
      className={`scratch ${revealed ? "is-done" : ""}`}
      onClick={reveal}
      aria-pressed={revealed}
      aria-label={`${label}: tap to reveal`}
    >
      <span className="scratch-under">
        <span className="scratch-label">{label}</span>
        <span className="scratch-value">{value}</span>
      </span>
      <span className="scratch-cover" aria-hidden="true">
        <span className="scratch-label">{label}</span>
        <span className="scratch-tap">✦ tap</span>
      </span>
    </button>
  );
}