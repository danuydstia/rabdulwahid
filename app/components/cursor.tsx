"use client";

import { useRef, useEffect } from "react";

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const p = { x: -100, y: -100 };
    const l = { x: -100, y: -100 };

    const onMove = (e: MouseEvent) => {
      p.x = e.clientX;
      p.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let raf: number;
    const tick = () => {
      l.x += (p.x - l.x) * 0.1;
      l.y += (p.y - l.y) * 0.1;
      dotRef.current!.style.transform  = `translate(${p.x - 4}px,${p.y - 4}px)`;
      ringRef.current!.style.transform = `translate(${l.x - 16}px,${l.y - 16}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cur-dot"  />
      <div ref={ringRef} className="cur-ring" />
    </>
  );
}