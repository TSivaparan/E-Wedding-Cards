import { useState } from "react";

type Props = { onSubmit: (name: string) => void; onSkip: () => void };

export default function GuestPrompt({ onSubmit, onSkip }: Props) {
  const [name, setName] = useState("");

  const submit = () => {
    const trimmed = name.trim().slice(0, 40);
    if (trimmed) onSubmit(trimmed);
    else onSkip();
  };

  return (
    <div className="guest-prompt" role="dialog" aria-label="Enter your name">
      <div className="guest-prompt-card">
        <p className="guest-prompt-label">Who's opening this invitation?</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Your name"
          autoFocus
        />
        <div className="guest-prompt-actions">
          <button className="guest-prompt-skip" onClick={onSkip}>
            Skip
          </button>
          <button className="guest-prompt-go" onClick={submit}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}