"use client";

import { useMemo, useState } from "react";

type MoodKey = "energized" | "curious" | "calm";

const moodCopy: Record<
  MoodKey,
  {
    label: string;
    prompt: string;
    color: string;
  }
> = {
  energized: {
    label: "Energized",
    prompt: "Let's channel that momentum into something awesome today.",
    color: "var(--token-accent-energized)",
  },
  curious: {
    label: "Curious",
    prompt: "Curiosity fuels the best ideas—let's explore a new concept.",
    color: "var(--token-accent-curious)",
  },
  calm: {
    label: "Calm",
    prompt: "Steady progress is powerful—take a deep breath and create.",
    color: "var(--token-accent-calm)",
  },
};

const microActions: Array<{ title: string; body: string }> = [
  {
    title: "Sketch a tiny idea",
    body: "Grab a minute to doodle a concept—no polish, just raw spark.",
  },
  {
    title: "Ship a sentence",
    body: "Write a single line that moves your project forward.",
  },
  {
    title: "Celebrate progress",
    body: "Pause and note one win you’re proud of today.",
  },
];

const inspirationPool = [
  "Momentum beats motivation. Tiny steps compound quickly.",
  "Your ideas deserve daylight—share one with someone you trust.",
  "Done > perfect. Iterate in public and refine as you go.",
  "Great products start with a curious 'what if?'—follow it.",
  "Stay playful—experiments often spark the biggest breakthroughs.",
];

const quickLinks = [
  {
    title: "Capture a note",
    href: "https://app.fireflies.ai/",
    description: "Voice thoughts effortlessly to unblock the next task.",
  },
  {
    title: "Design inspiration",
    href: "https://dribbble.com/shots/popular",
    description: "Refresh your visual palette in seconds.",
  },
  {
    title: "Focus soundtrack",
    href: "https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO",
    description: "Slip into flow with calm lofi electronics.",
  },
];

const getGreeting = (name: string) => {
  const safeName = name.trim();
  if (!safeName) {
    return "Hey there";
  }

  if (safeName.length <= 12) {
    return `Hey ${safeName}`;
  }

  return "Hey creator";
};

const pickInspiration = (seed: string) =>
  inspirationPool[
    Math.abs(seed.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)) %
      inspirationPool.length
  ];

export const GreetingExperience = () => {
  const [name, setName] = useState("");
  const [mood, setMood] = useState<MoodKey>("curious");

  const greeting = useMemo(() => getGreeting(name), [name]);

  const inspiration = useMemo(() => pickInspiration(`${name}|${mood}`), [name, mood]);

  return (
    <section className="greeting-card" aria-labelledby="greeting-card-heading">
      <div className="greeting-card__header">
        <span className="greeting-card__eyebrow">Live pulse</span>
        <h2 id="greeting-card-heading">{greeting}</h2>
        <p className="greeting-card__subtitle">{moodCopy[mood].prompt}</p>
      </div>
      <div className="greeting-card__content">
        <label className="greeting-card__field">
          <span>Who am I greeting?</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Add your name or team"
            aria-label="Name"
          />
        </label>
        <fieldset className="greeting-card__mood-fieldset">
          <legend>Mood check</legend>
          <div className="greeting-card__mood-grid">
            {(Object.keys(moodCopy) as MoodKey[]).map((key) => {
              const { label, color } = moodCopy[key];
              const isActive = key === mood;

              return (
                <button
                  key={key}
                  type="button"
                  className={`greeting-card__mood ${isActive ? "is-active" : ""}`}
                  style={
                    isActive
                      ? {
                          boxShadow: `0 0 0 2px ${color}`,
                        }
                      : undefined
                  }
                  onClick={() => setMood(key)}
                >
                  <span className="greeting-card__mood-bullet" style={{ background: color }} />
                  {label}
                </button>
              );
            })}
          </div>
        </fieldset>
        <div className="greeting-card__microactions">
          {microActions.map((item) => (
            <article key={item.title} className="greeting-card__microaction">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
      <footer className="greeting-card__footer">
        <div className="greeting-card__inspiration">
          <span className="greeting-card__footer-label">Signal</span>
          <p>{inspiration}</p>
        </div>
        <div className="greeting-card__links">
          {quickLinks.map((link) => (
            <a key={link.title} href={link.href} target="_blank" rel="noreferrer">
              <span>{link.title}</span>
              <p>{link.description}</p>
            </a>
          ))}
        </div>
      </footer>
    </section>
  );
};
