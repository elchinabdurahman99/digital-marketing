"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const RING  = 38;
const DOT   = 7;
const SPRING = { stiffness: 140, damping: 18, mass: 0.5 };

export default function Cursor() {
  const [hovered,  setHovered]  = useState(false);
  const [clicking, setClicking] = useState(false);
  const [visible,  setVisible]  = useState(false);

  const rx = useMotionValue(-200);
  const ry = useMotionValue(-200);
  const dx = useMotionValue(-200);
  const dy = useMotionValue(-200);

  const srx = useSpring(rx, SPRING);
  const sry = useSpring(ry, SPRING);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setVisible(true);

    const move = (e: MouseEvent) => {
      dx.set(e.clientX - DOT / 2);
      dy.set(e.clientY - DOT / 2);
      rx.set(e.clientX - RING / 2);
      ry.set(e.clientY - RING / 2);
    };

    const over = (e: MouseEvent) => {
      const el = e.target as Element;
      setHovered(!!el.closest("a,button,[data-hover]"));
    };

    const down = () => setClicking(true);
    const up   = () => setClicking(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup",   up);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup",   up);
    };
  }, [dx, dy, rx, ry]);

  if (!visible) return null;

  return (
    <>
      {/* Outer ring — spring lag */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          x: srx,
          y: sry,
          width:  RING,
          height: RING,
          border: "1.5px solid rgba(200,164,90,0.55)",
        }}
        animate={{
          scale:   hovered  ? 1.6  : clicking ? 0.85 : 1,
          opacity: hovered  ? 0.9  : 0.5,
        }}
        transition={{ duration: 0.22 }}
      />

      {/* Inner dot — no lag */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x:      dx,
          y:      dy,
          width:  DOT,
          height: DOT,
          background: "#C8A45A",
        }}
        animate={{
          scale: hovered  ? 2.2  : clicking ? 0.6 : 1,
          opacity: hovered ? 1 : 0.85,
        }}
        transition={{ duration: 0.16 }}
      />
    </>
  );
}
