"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import type { Project } from "../data/project";

interface CardProps {
  p: Project;
  i: number;
}

function getVideoType(url: string): "youtube" | "mp4" | "vimeo" {
  if (url.startsWith("yt:")) return "youtube";
  if (url.includes(".mp4") || url.includes("pexels.com/video-files")) return "mp4";
  return "vimeo";
}

function buildYouTubeSrc(videoField: string): string {
  const id = videoField.replace("yt:", "").trim();
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    loop: "1",
    playlist: id,
    controls: "0",
    modestbranding: "1",
    playsinline: "1",
    rel: "0",
    disablekb: "1",
    iv_load_policy: "3",
    enablejsapi: "0",
  });
  return `https://www.youtube.com/embed/${id}?${params.toString()}`;
}

function buildVimeoSrc(url: string): string {
  try {
    const u = new URL(url);
    u.searchParams.set("autoplay", "1");
    u.searchParams.set("muted", "1");
    u.searchParams.set("loop", "1");
    u.searchParams.set("background", "1");
    u.searchParams.set("dnt", "1");
    return u.toString();
  } catch {
    return url;
  }
}

export default function Card({ p, i }: CardProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: false, margin: "-40px" });

  // Track whether card has ever been in view — persists across re-renders
  const hasBeenSeen = useRef(false);
  if (inView) hasBeenSeen.current = true;

  // ✅ FIX: useRef sebagai "permanent latch" — tidak pernah reset ke false
  // meski komponen re-render. useState hanya dipakai untuk trigger repaint.
  const videoReadyLatch = useRef(false);
  const [videoReady, setVideoReady] = useState(false);

  // Idempotent: hanya trigger setState sekali, selanjutnya no-op
  const markVideoReady = useCallback(() => {
    if (videoReadyLatch.current) return;
    videoReadyLatch.current = true;
    setVideoReady(true);
  }, []);

  const videoType = getVideoType(p.video);

  return (
    <motion.article
      ref={ref}
      className="card"
      data-index={String(i + 1).padStart(2, "0")}
      initial={{ opacity: 0, y: 24 }}
      animate={hasBeenSeen.current ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="card-media">

        {/*
          Thumbnail — selalu ada di DOM.
          Fade out setelah video benar-benar siap.
          videoReadyLatch.current dipakai langsung untuk initial style
          supaya saat re-render setelah ready, thumbnail langsung transparan
          tanpa perlu tunggu setState cycle berikutnya.
        */}
        <img
          src={p.thumbnail}
          alt={p.title}
          loading="lazy"
          className="card-thumb"
          style={{
            opacity: videoReadyLatch.current ? 0 : 1,
            transition: "opacity 0.6s ease",
            pointerEvents: videoReadyLatch.current ? "none" : "auto",
          }}
        />

        {/* Video hanya di-mount saat card pernah masuk viewport */}
        {hasBeenSeen.current && (
          <div className="card-video-wrap">

            {videoType === "mp4" && (
              <video
                src={p.video}
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                className="card-video"
                onCanPlay={markVideoReady}
                style={{
                  opacity: videoReady ? 1 : 0,
                  transition: "opacity 0.6s ease",
                }}
              />
            )}

            {videoType === "youtube" && (
              <iframe
                src={buildYouTubeSrc(p.video)}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                onLoad={() => setTimeout(markVideoReady, 1800)}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%) scale(1.5)",
                  width: "100%",
                  height: "100%",
                  border: "none",
                  pointerEvents: "none",
                  filter: "saturate(0.6) brightness(0.65)",
                  opacity: videoReady ? 1 : 0,
                  transition: "opacity 0.6s ease",
                }}
              />
            )}

            {videoType === "vimeo" && (
              <iframe
                src={buildVimeoSrc(p.video)}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="card-video"
                onLoad={() => setTimeout(markVideoReady, 800)}
                style={{
                  opacity: videoReady ? 1 : 0,
                  transition: "opacity 0.6s ease",
                }}
              />
            )}
          </div>
        )}

        <div className="card-scrim" />
        <span className="card-cat">{p.category}</span>
        <span className="card-idx">{String(i + 1).padStart(2, "0")}</span>
      </div>

      <div className="card-body">
        <div className="card-body-top">
          <h3 className="card-title">{p.title}</h3>
          <span className="card-year">{p.year}</span>
        </div>
        <p className="card-sub">{p.sub}</p>
        <p className="card-client">{p.client}</p>

        <div className="card-arrow">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M1 7h12M7 1l6 6-6 6"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="card-line" />
    </motion.article>
  );
}