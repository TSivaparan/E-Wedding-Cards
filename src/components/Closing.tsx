import { motion } from "framer-motion";
import { invite } from "../config";

export default function Closing({ guest }: { guest: string | null }) {
  // const msg = `Hello! ${guest ? `This is ${guest}. ` : ""}We're happy to confirm our presence at ${invite.groom.shortName} & ${invite.bride.shortName}'s wedding.`;
  // const href = `https://wa.me/${invite.rsvpWhatsApp}?text=${encodeURIComponent(msg)}`;
  const href = `https://wa.me/${invite.rsvpWhatsApp}?text=${encodeURIComponent(
  invite.rsvpMessage(guest)
)}`;

  return (
    <footer className="section closing">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7 }}
      >
        <p className="symbol" aria-hidden="true">
          {invite.closing.symbol}
        </p>
        <p className="lede">{invite.closing.text}</p>
        <a className="btn" href={href} target="_blank" rel="noreferrer">
          <span aria-hidden="true">✦</span> RSVP on WhatsApp
        </a>
        {/* <p className="signoff script">
          {invite.groom.shortName} &amp; {invite.bride.shortName}
        </p> */}
      </motion.div>
    </footer>
  );
}
