"use client";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [activeTab, setActiveTab] = useState("home");
  const [isMobile, setIsMobile] = useState(false);

  const springConfig = { stiffness: 250, damping: 30 };
  const sX = useSpring(mouseX, springConfig);
  const sY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("resize", checkMobile);
    };
  }, [mouseX, mouseY]);

  const projects = [
    { title: "Audio Stories", category: "Podcast Production", desc: "Immersive 3D audio fiction & narrative series.", video: "/P1.mp4" },
    { title: "Brand Films", category: "Video Production", desc: "Cinematic storytelling from concept to reality.", video: "/P2.mp4" },
    { title: "AI Experiments", category: "The Lab", desc: "Pushing boundaries with AI-driven visual narratives.", video: "/P3.mp4" },
    { title: "Sonic Identity", category: "Voiceover & Sound", desc: "Strategic sound design and premium VO casting.", video: "/P4.mp4" },
    { title: "Micro Dramas", category: "Short Form", desc: "High-fidelity vertical content for modern audiences.", video: "/P5.mp4" },
    { title: "Brand Stories", category: "Creative Strategy", desc: "Integrated campaigns that build lasting loyalty.", video: "/P6.mp4" },
  ];

  return (
    <main className="relative min-h-screen bg-[#050508] text-white flex flex-col items-center justify-center overflow-hidden md:cursor-none font-sans">
      
      {/* 1. BACKGROUND WAVES */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-5%] left-[-5%] w-[85%] h-[85%] bg-blue-900/10 rounded-full blur-[140px]" />
        <svg className="absolute inset-0 w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="neon-metallic-sheen" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="25%" stopColor="rgba(0, 242, 255, 0.4)" />
              <stop offset="50%" stopColor="rgba(255, 255, 255, 1)" /> 
              <stop offset="75%" stopColor="rgba(255, 0, 255, 0.4)" />
              <stop offset="90%" stopColor="rgba(0, 255, 136, 0.3)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>
          {[...Array(6)].map((_, i) => (
            <motion.path
              key={`neon-wave-${i}`}
              animate={{ d: [
                `M-100 ${100 + i * 6} Q 450 ${300 + i * 3} 850 ${100 + i * 6} T 1900 ${100 + i * 6}`,
                `M-100 ${150 + i * 6} Q 650 ${0 + i * 3} 950 ${150 + i * 6} T 1900 ${150 + i * 6}`,
                `M-100 ${100 + i * 6} Q 450 ${300 + i * 3} 850 ${100 + i * 6} T 1900 ${100 + i * 6}`
              ]}}
              transition={{ duration: 18 + i, repeat: Infinity, ease: "easeInOut" }}
              fill="none"
              stroke="url(#neon-metallic-sheen)"
              strokeWidth={i === 0 ? "0.9" : "0.5"}
              opacity={0.7 - i * 0.1}
            />
          ))}
        </svg>
      </div>

      {/* 2. DESKTOP MOUSE GLOW */}
      {!isMobile && (
        <motion.div 
          style={{ left: sX, top: sY, transform: "translate(-50%, -50%)" }}
          className="absolute rounded-full blur-[110px] pointer-events-none z-10 w-[550px] h-[550px] bg-white/[0.12]"
        />
      )}

      {/* 3. CENTER CONTENT SECTION */}
      <div className="relative z-20 text-center flex flex-col items-center w-full py-10 px-6 max-w-6xl overflow-y-auto max-h-[85vh] no-scrollbar">
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="flex flex-col items-center">
              <div className="relative inline-block">
                
                {/* LOGO TEXT */}
                <h1 className="relative z-30 text-[12vw] font-[1000] tracking-tighter leading-[0.8] uppercase italic">
                  VANILLA<br/>
                  <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>MOON</span>
                </h1>

                {/* MOBILE MOON WITH NEW GLOW */}
                {isMobile && (
                  <div className="absolute top-[-26%] right-[-7%] w-[15vw] h-[15vw] pointer-events-none z-20">
                    {/* The Glow (Matching Desktop Style) */}
                    <motion.div 
                      animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.2, 1] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-[-50%] rounded-full blur-[40px] bg-white/[0.15] z-10"
                    />
                    
                    {/* The Moon */}
                    <motion.img 
                      src="/full-moon.webp" 
                      alt="Moon"
                      className="relative w-full h-full object-cover mix-blend-screen moon-mask no-box z-20"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                )}
              </div>
              
              <p className="text-[11px] tracking-[0.5em] uppercase text-blue-400 mt-6 font-bold">ARCHITECTS OF IMAGINATION</p>
              <div className="mt-20">
                <span className="text-[12px] tracking-[0.6em] uppercase text-white/40 block">Two Decades of Strategy • One Imaginative Studio</span>
              </div>
            </motion.div>
          )}

          {activeTab === "projects" && (
            <motion.div key="projects" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="w-full flex flex-col items-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
                {projects.map((p, i) => (
                  <div key={i} className="group relative overflow-hidden p-8 border border-white/10 text-left flex flex-col justify-between h-[300px] bg-black">
                    <div className="absolute inset-0 z-0 grayscale-[0.4] opacity-40 group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-1000">
                      <video src={p.video} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                    </div>
                    <div className="relative z-10">
                      <span className="text-[8px] tracking-[0.4em] uppercase text-blue-400 font-black mb-4 block">{p.category}</span>
                      <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-2">{p.title}</h3>
                      <p className="text-xs text-white/70 leading-relaxed font-light">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => setActiveTab("home")} className="text-[9px] tracking-[0.4em] uppercase border border-white/20 px-8 py-4 hover:bg-white hover:text-black transition-all font-bold">Return Home</button>
            </motion.div>
          )}

          {activeTab === "about" && (
            <motion.div key="about" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-center">
              <h3 className="text-blue-400 text-[10px] tracking-[0.5em] uppercase font-black mb-6">Who We Are</h3>
              <p className="text-sm text-gray-400 max-w-xl mx-auto mb-12">Vanilla Moon is a creative strategy and content lab built on two decades of leadership.</p>
              <button onClick={() => setActiveTab("home")} className="text-[9px] tracking-[0.4em] uppercase border border-white/20 px-8 py-4 hover:bg-white hover:text-black transition-all font-bold">Return Home</button>
            </motion.div>
          )}

          {activeTab === "contact" && (
            <motion.div key="contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
              <h2 className="text-4xl font-black italic uppercase tracking-tighter">Get in Touch</h2>
              <p className="mt-12 text-3xl font-light hover:text-blue-400 transition-colors cursor-pointer">hello@vanillamoon.in</p>
              <button onClick={() => setActiveTab("home")} className="mt-16 text-[10px] tracking-widest uppercase border border-white/20 px-8 py-4 hover:bg-white hover:text-black transition-all font-bold">Return Home</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. THE 3D MOON CURSOR (Desktop Only) */}
      {!isMobile && (
        <motion.div 
          style={{ left: sX, top: sY, transform: "translate(-50%, -50%)" }}
          className="fixed w-10 h-10 z-[100] pointer-events-none flex items-center justify-center rounded-full overflow-hidden"
        >
          <motion.img 
            src="/full-moon.webp" 
            alt="Moon"
            className="w-[110%] h-[110%] object-cover mix-blend-screen" 
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      )}

      {/* 5. NAVIGATION TABS */}
      <div className="absolute bottom-12 w-full flex justify-center gap-10 md:gap-16 text-[10px] uppercase tracking-[0.5em] text-white/30 font-black px-4">
        <span onClick={() => setActiveTab("projects")} className={`cursor-pointer transition-all ${activeTab === 'projects' ? 'text-white border-b border-white' : 'hover:text-white'}`}>Projects</span>
        <span onClick={() => setActiveTab("about")} className={`cursor-pointer transition-all ${activeTab === 'about' ? 'text-white border-b border-white' : 'hover:text-white'}`}>About Us</span>
        <span onClick={() => setActiveTab("contact")} className={`cursor-pointer transition-all ${activeTab === 'contact' ? 'text-white border-b border-white' : 'hover:text-white'}`}>Contact</span>
      </div>
    </main>
  );
}