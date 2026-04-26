"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const STATS: [string, string][] = [
  ["120+", "Projects"],
  ["8yr",  "Experience"],
  ["40+",  "Clients"],
  ["12",   "Awards"],
];

const TOOLS = [
  "Premiere Pro",
  "DaVinci Resolve",
  "After Effects",
  "Fusion",
  "Audition",
];

export default function About() {
  const sectionRef = useRef(null);
  const textRef    = useRef(null);
  const inView     = useInView(textRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imgY    = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const overlayO = useTransform(scrollYProgress, [0, 0.4, 1], [0.7, 0.45, 0.6]);

  return (
    <section ref={sectionRef} className="about-section" id="about">

      {/* ── LEFT: Photo column ── */}
      <div className="about-visual">
        <div className="av-inner">
          <motion.img
            src="/rabdulwahid/rerey3.png"
            alt="Rerey Abdul Wahid"
            style={{ y: imgY }}
          />

          {/* Red gradient overlay — depth */}
          <motion.div
            className="av-overlay"
            style={{ opacity: overlayO }}
          />

          {/* Bottom label */}
          <div className="av-label">
            <span>Rerey Abdul Wahid</span>
            <span>Video Editor · Colorist</span>
          </div>

          {/* Vertical text — side decoration */}
          <div className="av-vertical-text">BATAM · INDONESIA</div>
        </div>
      </div>

      {/* ── RIGHT: Bio text ── */}
      <motion.div
        ref={textRef}
        className="about-text"
      >
        {/* Section tag */}
        <motion.div
          className="about-eyebrow"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="wh-tag">About</span>
          <div className="eyebrow-line" />
        </motion.div>

        {/* Headline */}
        <motion.h2
          className="about-h2"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Frame-perfect<br />
          storytelling,{" "}
          <span className="red">every<br />single time.</span>
        </motion.h2>

        {/* Bio */}
        <motion.p
          className="about-p"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <strong>Nama saya adalah Rerey</strong>, seorang video editor dan colorist
          berbasis di Batam, Indonesia. Saya memiliki pengalaman lebih dari delapan tahun
          dalam menangani berbagai proyek — mulai dari iklan korporat, film pendek,
          dokumenter, hingga musik video — dengan pendekatan yang mengutamakan
          presisi naratif dan estetika sinematik.
        </motion.p>

        <motion.p
          className="about-p"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.28 }}
        >
          Setiap proyek saya kerjakan dengan keyakinan bahwa{" "}
          <strong>setiap cut memiliki tujuan</strong> dan setiap frame mampu
          menyampaikan cerita. Mulai dari tahap offline editing hingga color grading
          akhir, saya selalu menjaga standar yang konsisten: memberikan hasil terbaik
          di setiap detail.
        </motion.p>

        {/* Stats grid */}
        <motion.div
          className="about-stats"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          {STATS.map(([v, l], idx) => (
            <div key={l} className="as-item">
              <span className="as-val">{v}</span>
              <span className="as-lbl">{l}</span>
            </div>
          ))}
        </motion.div>

        {/* Tools */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          <p className="tools-label">Tools & Software</p>
          <div className="tools-row">
            {TOOLS.map((t, i) => (
              <motion.span
                key={t}
                className="tool"
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.06 }}
              >
                {t}
              </motion.span>
            ))}
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}