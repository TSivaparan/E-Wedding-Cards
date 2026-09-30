type Props = { playing: boolean; onToggle: () => void };

export default function MusicToggle({ playing, onToggle }: Props) {
  return (
    <button className="music" onClick={onToggle} aria-pressed={playing}>
      <span className={`music-ico ${playing ? "on" : ""}`} aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      Music {playing ? "on" : "off"}
    </button>
  );
}
