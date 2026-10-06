import { motion } from "framer-motion";
import { invite } from "../config";
import { useCountdown } from "../hooks/useCountdown";

const pad = (n: number) => String(n).padStart(2, "0");

function DateCard({ label, value, delay }: { label: string; value: string; delay: number }) {
  return (
    <motion.div
      className="scratch-flip"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay }}
    >
      <motion.div
        className="scratch-inner"
        initial={{ rotateY: 180 }}
        whileInView={{ rotateY: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.9, delay: delay + 0.15, ease: "easeInOut" }}
      >
        <div className="scratch-face scratch-front">
          <span className="scratch-label">{label}</span>
          <span className="scratch-value">{value}</span>
        </div>
        <div className="scratch-face scratch-back" />
      </motion.div>
    </motion.div>
  );
}

export default function SaveTheDate() {
  const { days, hours, mins, secs } = useCountdown(invite.weddingDateTime);

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
        <p className="lede">Our wedding date, with love.</p>

        <div className="scratch-row">
          <DateCard label="" value={invite.scratch.month} delay={0} />
          <DateCard label="" value={invite.scratch.day} delay={0.15} />
          <DateCard label="" value={invite.scratch.year} delay={0.3} />
        </div>

        <p className="tagline">{invite.tagline}</p>

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