"use client";

const ITEMS = [
  "Color Grade",
  "VFX",
  "Motion Graphics",
  "Narrative Editing",
  "Sound Design",
  "Compositing",
  "Slow Motion",
  "3D Tracking",
];

export default function Ticker() {
  return (
    <div className="ticker-wrap">
      <div className="ticker-track">
        {[...ITEMS, ...ITEMS].map((t, i) => (
          <span key={i} className="ticker-item">
            {t}<span className="ticker-dot">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}