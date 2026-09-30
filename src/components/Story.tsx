import { useState } from "react";
import type { KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { invite } from "../config";
import Illustration from "./Illustration";

const slides = invite.story;

const variants = {
  enter: (d: number) => ({ x: d > 0 ? 70 : -70, opacity: 0, rotate: d > 0 ? 2 : -2 }),
  center: { x: 0, opacity: 1, rotate: 0 },
  exit: (d: number) => ({ x: d > 0 ? -70 : 70, opacity: 0, rotate: d > 0 ? -2 : 2 }),
};

export default function Story() {
  const [[i, dir], setState] = useState<[number, number]>([0, 1]);
  const last = i === slides.length - 1;

  const go = (d: number) => {
    const n = i + d;
    if (n < 0 || n >= slides.length) return;
    setState([n, d]);
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  };

  const s = slides[i];

  return (
    <section className="section story" aria-labelledby="story-h">
      <h2 id="story-h" className="script h-script">
        Our Little Story
      </h2>
      <p className="lede">{invite.storyIntro}</p>

      <div className="story-stage" tabIndex={0} onKeyDown={onKey} aria-roledescription="carousel">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.figure
            key={i}
            className="story-card"
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.32, ease: "easeOut" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.5}
            onDragEnd={(_, { offset }) => {
              if (offset.x < -50) go(1);
              else if (offset.x > 50) go(-1);
            }}
            onTap={() => go(1)}
          >
            <Illustration
              src={s.image}
              tone={s.tone}
              alt={s.caption}
              hint={`public/images/story-${i + 1}.jpg`}
            />
            <figcaption>{s.caption}</figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="story-nav">
        <button className="round" onClick={() => go(-1)} disabled={i === 0} aria-label="Previous">
          ←
        </button>
        <span className="story-count">
          {String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
        <span className="story-tip">{last ? "Scroll on for the celebrations" : "Swipe or tap to continue"}</span>
        <button className="round" onClick={() => go(1)} disabled={last} aria-label="Next">
          →
        </button>
      </div>
    </section>
  );
}
