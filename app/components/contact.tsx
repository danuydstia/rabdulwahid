"use client";

import { motion } from "framer-motion";

const SOCIALS = ["Instagram", "YouTube", "LinkedIn"];

export default function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-bg" />
      <motion.div
        className="contact-inner"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.88 }}
      >
        <span className="wh-tag">Get In Touch</span>
        <h2 className="contact-h2">
          Punya project?<br />
          <span className="red">Let's talk.</span>
        </h2>
        <a href="mailto:rerey@editor.id" className="contact-link">
          rerey@editor.id <span className="arr">→</span>
        </a>
        <div className="soc-row">
          {SOCIALS.map((s) => (
            <span key={s} className="soc">{s}</span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}