import { useLayoutEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";

type Props = { label: string; value: string; onReveal?: () => void };

const BRUSH = 30;

export default function ScratchCard({ label, value, onReveal }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const last = useRef<{ x: number; y: number } | null>(null);
  const strokes = useRef(0);
  const [done, setDone] = useState(false);

  // Paint the lavender scratch surface once the card has a size.
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);

    const g = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    g.addColorStop(0, "#c9b3df");
    g.addColorStop(0.5, "#b79fd3");
    g.addColorStop(1, "#c6afdd");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // fine speckle so it reads as a scratch-off foil
    ctx.fillStyle = "rgba(255,255,255,.16)";
    for (let i = 0; i < 90; i++) {
      ctx.fillRect(Math.random() * rect.width, Math.random() * rect.height, 1.5, 1.5);
    }

    ctx.fillStyle = "rgba(255,255,255,.95)";
    ctx.textAlign = "center";
    ctx.font = "500 15px 'Cormorant Garamond', serif";
    ctx.fillText(label, rect.width / 2, rect.height / 2 - 4);
    ctx.font = "italic 400 13px 'Cormorant Garamond', serif";
    ctx.fillStyle = "rgba(255,255,255,.85)";
    ctx.fillText("✦ scratch", rect.width / 2, rect.height / 2 + 16);
  }, [label]);

  const reveal = () => {
    if (done) return;
    setDone(true);
    onReveal?.();
  };

  const coverage = () => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let cleared = 0;
    const step = 4 * 6; // sample every 6th pixel
    let total = 0;
    for (let i = 3; i < data.length; i += step) {
      total++;
      if (data[i] < 128) cleared++;
    }
    return cleared / total;
  };

  const scratchTo = (e: PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ctx = canvas.getContext("2d")!;
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = "round";
    ctx.lineWidth = BRUSH;
    ctx.beginPath();
    const from = last.current ?? { x, y };
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(x, y);
    ctx.stroke();
    last.current = { x, y };

    strokes.current += 1;
    if (strokes.current % 5 === 0 && coverage() > 0.45) reveal();
  };

  const down = (e: PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    last.current = null;
    scratchTo(e);
  };
  const move = (e: PointerEvent<HTMLCanvasElement>) => {
    if (e.buttons === 0 && e.pointerType === "mouse") return;
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
    scratchTo(e);
  };
  const up = () => {
    last.current = null;
  };
  const key = (e: KeyboardEvent<HTMLCanvasElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      reveal();
    }
  };

  return (
    <div className="scratch">
      <div className="scratch-under">
        <span className="scratch-label">{label}</span>
        <span className="scratch-value">{value}</span>
      </div>
      <canvas
        ref={canvasRef}
        className={`scratch-canvas ${done ? "is-done" : ""}`}
        role="button"
        tabIndex={done ? -1 : 0}
        aria-label={`Scratch to reveal the ${label.toLowerCase()}. Press Enter to reveal.`}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        onKeyDown={key}
      />
    </div>
  );
}
