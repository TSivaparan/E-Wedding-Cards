import { useState } from "react";
import { motion } from "framer-motion";
import { invite } from "../config";
import { useCountdown } from "../hooks/useCountdown";
import ScratchCard from "./ScratchCard";

const pad = (n: number) => String(n).padStart(2, "0");

export default function SaveTheDate() {
  const { days, hours, mins, secs } = useCountdown(invite.weddingDateTime);
  const [revealed, setRevealed] = useState(0);

  return (
    <section className="section date" aria-labelledby="std">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7 }}
      >
        <p className="eyebrow">The Date</p>
        <h2 id="std" className="script h-script">
          Save the Date
        </h2>
        <p className="lede">
          {revealed === 3 ? "Our wedding date, with love." : "Scratch below to reveal our wedding date"}
        </p>

        <div className="scratch-row">
          <ScratchCard label="Month" value={invite.scratch.month} onReveal={() => setRevealed((r) => r + 1)} />
          <ScratchCard label="Day" value={invite.scratch.day} onReveal={() => setRevealed((r) => r + 1)} />
          <ScratchCard label="Year" value={invite.scratch.year} onReveal={() => setRevealed((r) => r + 1)} />
        </div>

        <p className="tagline">{invite.tagline}</p>
        {/* <p className="dateline">{invite.dateLine}</p> */}

        <div className="countdown" role="timer" aria-label="Time until the wedding">
          <div>
            <b>{days}</b>
            <span>Days</span>
          </div>
          <i aria-hidden="true">·</i>
          <div>
            <b>{pad(hours)}</b>
            <span>Hours</span>
          </div>
          <div>
            <b>{pad(mins)}</b>
            <span>Mins</span>
          </div>
          <div>
            <b>{pad(secs)}</b>
            <span>Secs</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
