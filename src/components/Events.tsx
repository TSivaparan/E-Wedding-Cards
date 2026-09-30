import { motion } from "framer-motion";
import { invite } from "../config";
import type { EventInfo } from "../config";
import Illustration from "./Illustration";

function EventCard({ ev }: { ev: EventInfo }) {
  return (
    <motion.article
      className={`event event-${ev.tone}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
    >
      <div className="event-art">
        <Illustration
          src={ev.image}
          tone={ev.tone}
          alt={`${ev.title} illustration`}
          hint={`public/images/${ev.key}.jpg`}
        />
        {/* <div className="event-plate">
          <span className="script plate-title">{ev.subtitle}</span>
          <span className="plate-date">
            {ev.weekday.slice(0, 3)} <i>|</i> {ev.day} <i>|</i> {ev.month}
          </span>
          <span className="plate-year">{ev.year}</span>
          <span className="plate-time">{ev.time}</span>
        </div> */}
      </div>

      <div className="event-body">
        <p className="eyebrow">
          {ev.weekday} · {ev.day} {ev.month} {ev.year}
        </p>
        <h3 className="script">{ev.title}</h3>
        <p className="event-time">{ev.timeLine}</p>
        <p className="event-venue">
          {ev.venue}
          <br />
          {ev.city}
        </p>
        <a className="btn" href={ev.mapUrl} target="_blank" rel="noreferrer">
          <span aria-hidden="true">✦</span> View on map
        </a>

        {/* <ul className="schedule">
          {ev.schedule.map((s) => (
            <li key={s.time}>
              <span>{s.time}</span>
              <span>{s.label}</span>
            </li>
          ))}
        </ul> */}
      </div>
    </motion.article>
  );
}

export default function Events() {
  return (
    <section className="section events" aria-labelledby="events-h">
      <p className="eyebrow">The Celebrations</p>
      <h2 id="events-h" className="script h-script">
        Sacred Ceremonies
      </h2>
      {invite.events.map((ev) => (
        <EventCard key={ev.key} ev={ev} />
      ))}
    </section>
  );
}
