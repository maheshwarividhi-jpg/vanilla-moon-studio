"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const videos = [
  { id: 1, src: "/videos/video1.mp4", title: "Project One" },
  { id: 2, src: "/videos/video2.mp4", title: "Project Two" },
  { id: 3, src: "/videos/video3.mp4", title: "Project Three" },
  { id: 4, src: "/videos/video4.mp4", title: "Project Four" },
  { id: 5, src: "/videos/video5.mp4", title: "Project Five" },
  { id: 6, src: "/videos/video6.mp4", title: "Project Six" },
];

export default function VanillaMoon() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if ("clientX" in e) {
        // Desktop Mouse Move
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      } else if (e.touches && e.touches[0]) {
        // Mobile Finger Touch Move
        mouseX.set(e.touches[0].clientX);
        mouseY.set(e.touches[0].clientY);
      }
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove, { passive: false });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
    };
  }, [mouseX, mouseY]);

  return (
    <main className="relative min-h-screen bg-black overflow-hidden cursor-none">
      {/* Moon Cursor */}
      <motion.div
        style={{
          translateX: cursorX,
          translateY: cursorY,
        }}
        className="fixed top-[-50px] left-[-50px] w-[100px] h-[100px] pointer-events-none z-50 mix-blend-screen"
      >
        <img 
          src="/full-moon.webp" 
          alt="Moon" 
          className="w-full h-full object-contain opacity-80"
        />
      </motion.div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8 relative z-10">
        {videos.map((video) => (
          <div key={video.id} className="relative group overflow-hidden rounded-lg bg-zinc-900 aspect-video">
            <video
              src={video.src}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
            />
            <div className="absolute bottom-4 left-4 text-white font-light tracking-widest uppercase text-xs">
              {video.title}
            </div>
          </div>
        ))}
      </div>

      {/* Brand Title */}
      <div className="fixed bottom-10 right-10 z-20 text-right">
        <h1 className="text-white text-4xl font-extralight tracking-tighter opacity-30">
          VANILLA MOON <br /> PRODUCTIONS
        </h1>
      </div>
    </main>
  );
}