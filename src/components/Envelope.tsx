import { useState } from "react";
import { Sprig, WaxSeal } from "./Art";

type Props = { monogram: string; onOpen: () => void };

export default function Envelope({ monogram, onOpen }: Props) {
  const [phase, setPhase] = useState<"closed" | "opening" | "gone">("closed");

  const open = () => {
    if (phase !== "closed") return;
    setPhase("opening");
    onOpen();
    window.setTimeout(() => setPhase("gone"), 1500);
  };

  if (phase === "gone") return null;

  return (
    <div className={`env ${phase === "opening" ? "is-open" : ""}`}>
      <div className="flap flap-left">
        <div className="flap-face">
          <Sprig className="sprig sprig-l1" />
          <Sprig className="sprig sprig-l2" />
        </div>
      </div>
      <div className="flap flap-right">
        <div className="flap-face">
          <Sprig className="sprig sprig-r1" />
          <Sprig className="sprig sprig-r2" />
        </div>
      </div>
      <div className="flap flap-bottom">
        <div className="flap-face">
          <Sprig className="sprig sprig-b1" />
          <Sprig className="sprig sprig-b2" />
        </div>
      </div>
      <div className="flap flap-top">
        <div className="flap-face" />
      </div>

      <div className="env-title">
        <span className="script">{monogram}</span>
        <span className="env-sub">Wedding Invitation</span>
      </div>

      <button className="seal" onClick={open} aria-label="Open the invitation">
        <span className="seal-pulse" />
        <WaxSeal />
      </button>
      <p className="env-hint">Tap the seal to open</p>
    </div>
  );
}
