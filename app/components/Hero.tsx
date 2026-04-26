"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const secRef  = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const tagRef  = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: secRef,
    offset: ["start start", "end start"],
  });

  const bgY     = useTransform(scrollYProgress, [0, 1], ["0%", "38%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const photoY  = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const fade    = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  useEffect(() => {
    const m = { x: 0, y: 0 };
    const l = { x: 0, y: 0 };

    const onM = (e: MouseEvent) => {
      m.x = (e.clientX / window.innerWidth  - 0.5) * 20;
      m.y = (e.clientY / window.innerHeight - 0.5) * 20;
    };
    window.addEventListener("mousemove", onM, { passive: true });

    let raf: number;
    const tick = () => {
      l.x += (m.x - l.x) * 0.055;
      l.y += (m.y - l.y) * 0.055;
      if (nameRef.current)
        nameRef.current.style.transform = `translate(${l.x * 0.5}px,${l.y * 0.5}px)`;
      if (tagRef.current)
        tagRef.current.style.transform  = `translate(${l.x * -0.3}px,${l.y * -0.3}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onM);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={secRef} className="hero" style={{ position: "relative" }}>
      {/* Gradient background */}
      <motion.div className="hero-bg" style={{ scale: bgScale, y: bgY }}>
        <div className="hero-grain" />
        <div className="hero-vig" />
      </motion.div>

      {/* Portrait photo — behind the text */}
      <motion.div className="hero-photo-wrap" style={{ y: photoY, opacity: fade }}>
        <img src="/rerey.png" alt="Rerey" className="hero-photo" />
        <div className="hero-photo-fade-bottom" />
      </motion.div>

      <motion.div className="hero-inner" style={{ opacity: fade }}>
        {/* Floating label */}
        <div ref={tagRef} className="hero-tag-wrap">
          <motion.span
            className="hero-tag"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Video Editor &amp; Freelance — Batam, ID
          </motion.span>
        </div>

        {/* Big name */}
        <div ref={nameRef} className="hero-name-wrap">
          <motion.h1
            className="hero-name"
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="hero-first">REREY</span>
            <span className="hero-last">ABDUL<br />WAHID</span>
          </motion.h1>
        </div>

        {/* Bottom row */}
        <motion.div
          className="hero-foot"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
        >
          <span className="hero-year">© 2025</span>
          <button className="hero-cta">View Selected Work ↓</button>
          <span className="hero-count">08 Projects</span>
        </motion.div>
      </motion.div>

      {/* Spinning badge */}
      <motion.div
        className="spin-badge"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.3, duration: 0.6, type: "spring" }}
      >
        <svg viewBox="0 0 100 100" className="spin-svg">
          <defs>
            <path
              id="circle"
              d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
            />
          </defs>
          <text fontSize="11.5" fill="currentColor" letterSpacing="3.5">
            <textPath href="#circle">SHOWREEL 2025 · REREY ABDUL WAHID · </textPath>
          </text>
        </svg>
        <div className="spin-play">▶</div>
      </motion.div>
    </section>
  );
}