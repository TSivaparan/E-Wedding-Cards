import { useEffect, useMemo, useRef, useState } from "react";
import { MotionConfig } from "framer-motion";
import { invite } from "./config";
import Envelope from "./components/Envelope";
import Hero from "./components/Hero";
import SaveTheDate from "./components/SaveTheDate";
// import Story from "./components/Story";
import Events from "./components/Events";
import Closing from "./components/Closing";
import MusicToggle from "./components/MusicToggle";
import GuestPrompt from "./components/GuestPrompt";

const GUEST_KEY = "invite:guestName";

export default function App() {
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [hasMusic, setHasMusic] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  const urlGuest = useMemo(() => {
    const g = new URLSearchParams(window.location.search).get("guest");
    return g ? g.trim().slice(0, 40) : null;
  }, []);

  const [guest, setGuest] = useState<string | null>(() => {
    if (urlGuest) return urlGuest;
    try {
      localStorage.removeItem(GUEST_KEY); // clears any name saved by the older version
    return sessionStorage.getItem(GUEST_KEY);
    } catch {
      return null;
    }
  });

  // Only ask if the link had no ?guest= AND we haven't asked before.
  const [showPrompt, setShowPrompt] = useState(!urlGuest && !guest);

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    if (!opened) window.scrollTo(0, 0);
  }, [opened]);

  const savedGuest = (name: string) => {
    setGuest(name);
    setShowPrompt(false);
  try {
  sessionStorage.setItem(GUEST_KEY, name); // was localStorage
} catch {
  /* private mode, ignore */
}
  };

  const handleOpen = () => {
    setOpened(true);
    audioRef.current
      ?.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  };

  const toggleMusic = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    else {
      a.pause();
      setPlaying(false);
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="page">
        <Hero active={opened} guest={guest} />
        <SaveTheDate />
        {/* <Story /> */}
        <Events />
        <Closing guest={guest} />
      </div>

      {showPrompt && (
        <GuestPrompt onSubmit={savedGuest} onSkip={() => setShowPrompt(false)} />
      )}

      <Envelope monogram={`${invite.groom.name[0]} & ${invite.bride.name[0]}`} onOpen={handleOpen} />

      <audio
        ref={audioRef}
        src={invite.music}
        loop
        preload="none"
        onError={() => {
          setHasMusic(false);
          setPlaying(false);
        }}
      />
      {opened && hasMusic && <MusicToggle playing={playing} onToggle={toggleMusic} />}
    </MotionConfig>
  );
}