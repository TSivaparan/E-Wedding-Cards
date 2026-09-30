import { motion } from "framer-motion";
import { invite } from "../config";
// import { Butterfly } from "./Art";

function Letters({ text, start = 0, step = 0.06 }: { text: string; start?: number; step?: number }) {
  return (
    <>
      {text.split("").map((c, i) => (
        <span
          key={i}
          className="ch"
          style={{ animationDelay: `${start + i * step}s` }}
          aria-hidden="true"
        >
          {c === " " ? "\u00A0" : c}
        </span>
      ))}
      <span className="sr-only">{text}</span>
    </>
  );
}

export default function Hero({ active, guest }: { active: boolean; guest: string | null }) {
  const { groom, bride } = invite;
  const monogram = `${groom.name[0]} & ${bride.name[0]}`;

  return (
    <>
      <header className={`hero ${active ? "is-active" : ""}`}>
        <p className="hero-mono script">{monogram}</p>
        <p className="hero-sub">Wedding Invitation</p>
        {/* <Butterfly className="hero-butterfly" /> */}
        <img src="/images/Vinayakar.png" alt="Lord Ganesha" className="hero-butterfly" />
        
        <h1 className="hero-title">
          {guest && <p className="hero-guest">Dear {guest},</p>}
        <span className="scroll-cue" aria-hidden="true" />
          <span className="hero-small">
            <Letters text="YOU'RE" start={0.9} />
          </span>
          <span className="hero-big">
            <Letters text="CORDIALLY" start={1.2} step={0.07} />
          </span>
          <span className="hero-small">
            <Letters text="INVITED" start={2.0} />
          </span>
        </h1>
        
      </header>

      <section className="section families">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="lede">
            With the blessings of the Almighty and our beloved families, we joyfully invite you to
            the wedding of
          </p>
          <div className="names">
            <span className="script">{groom.name}</span>
            <span className="amp">&amp;</span>
            <span className="script">{bride.name}</span>
          </div>
          <div className="parents">
            <p>{groom.parents}</p>
            <p>{bride.parents}</p>
          </div>
        </motion.div>
      </section>
    </>
  );
}
