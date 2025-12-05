import React, { useEffect, useRef } from "react";

export default function MatrixCanvas({ opacity = 0.12 }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const w = (canvas.width = window.innerWidth);
    const h = (canvas.height = window.innerHeight);
    const cols = Math.floor(w / 14) + 1;
    const ypos = Array(cols).fill(0);
    const draw = () => {
      ctx.fillStyle = `rgba(0,0,0,${opacity})`;
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#00FF41";
      ctx.font = "14px monospace";
      for (let i = 0; i < ypos.length; i++) {
        const text = String.fromCharCode(0x30a0 + Math.random() * 96);
        ctx.fillText(text, i * 14, ypos[i] * 14);
        if (ypos[i] * 14 > h && Math.random() > 0.975) ypos[i] = 0;
        ypos[i]++;
      }
    };
    const id = setInterval(draw, 45);
    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => {
      clearInterval(id);
      window.removeEventListener("resize", onResize);
    };
  }, [opacity]);
  return (
    <canvas
      ref={ref}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
}
