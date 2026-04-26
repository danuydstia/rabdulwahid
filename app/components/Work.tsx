"use client";

import { motion } from "framer-motion";
import { projects } from "../data/project";
import Card from "../components/card";

export default function Work() {
  return (
    <section className="work-section" id="work">
      <div className="work-head">
        <motion.span
          className="wh-tag"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Selected Works
        </motion.span>
        <motion.h2
          className="wh-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.08 }}
        >
          The <em>Reel</em>
        </motion.h2>
      </div>

      <div className="bento">
        {projects.map((p, i) => (
          <Card key={p.id} p={p} i={i} />
        ))}
      </div>
    </section>
  );
}