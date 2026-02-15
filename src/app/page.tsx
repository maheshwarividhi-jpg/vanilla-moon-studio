"use client";
import React, { useEffect, useRef, useState } from 'react';

export default function MonumentArt() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  const [rotation, setRotation] = useState(0);
  const velocity = useRef(0);
  const lastTouchX = useRef(0);
  const isDragging = useRef(false);

  const assets = [
    { id: 's1', z: 180, y: '-140px' },
    { id: 's2', z: 120, y: '-70px' },
    { id: 's3', z: 60, y: '0px' },
    { id: 's4', z: 120, y: '70px' },
    { id: 's5', z: 180, y: '140px' },
  ];

  useEffect(() => {
    setIsMounted(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: any[] = [];
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const addStardust = (x: number, y: number, speed: number) => {
      for (let i = 0; i < Math.min(speed, 8); i++) {
        particles.push({
          x, y,
          vx: (Math.random() - 0.5) * (speed * 0.25),
          vy: (Math.random() - 0.5) * (speed * 0.25),
          life: 1.0,
          color: Math.random() > 0.5 ? '#00f2ff' : '#bd00ff'
        });
      }
    };

    const handleStart = (x: number) => {
      isDragging.current = true;
      lastTouchX.current = x;
    };

    const handleMove = (x: number, y: number) => {
      if (!isDragging.current) return;
      const deltaX = x - lastTouchX.current;
      velocity.current = deltaX * 0.12; 
      lastTouchX.current = x;
      addStardust(x, y, Math.abs(deltaX));
    };

    const handleEnd = () => { isDragging.current = false; };

    window.addEventListener('mousedown', (e) => handleStart(e.clientX));
    window.addEventListener('mousemove', (e) => handleMove(e.clientX, e.clientY));
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchstart', (e) => handleStart(e.touches[0].clientX));
    window.addEventListener('touchmove', (e) => {
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
      if (e.cancelable) e.preventDefault();
    }, { passive: false });
    window.addEventListener('touchend', handleEnd);

    const animate = () => {
      time += 0.01;
      if (!isDragging.current) velocity.current *= 0.96; 
      setRotation(prev => prev + velocity.current);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // METALLIC RIBBONS
      ctx.lineWidth = 1;
      for (let i = 0; i < 6; i++) {
        ctx.strokeStyle = `rgba(200, 200, 255, ${0.08 - i * 0.01})`;
        ctx.beginPath();
        for (let y = 0; y < canvas.height; y += 20) {
          const xOffset = Math.sin(y * 0.005 + time + i) * (30 + Math.abs(velocity.current * 8));
          const x = (canvas.width * 0.2) + (i * 100) + xOffset;
          if (y === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // STARDUST
      particles = particles.filter(p => p.life > 0);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.life -= 0.015;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.1, p.life * 4), 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize(); animate();
    return () => window.removeEventListener('resize', resize);
  }, []);

  if (!isMounted) return <div style={{ background: 'black', minHeight: '100vh' }} />;

  return (
    <main style={{ backgroundColor: 'black', width: '100vw', height: '100vh', overflow: 'hidden', touchAction: 'none' }}>
      <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 1 }} />
      
      {/* THE GLOW (MOON AURA) */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(189,0,255,0.15) 0%, rgba(0,242,255,0.05) 50%, transparent 70%)',
        filter: 'blur(40px)',
        zIndex: 5,
        animation: 'pulseGlow 8s ease-in-out infinite alternate'
      }} />

      <div style={{ 
        position: 'absolute', inset: 0, zIndex: 10, 
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        perspective: '1200px', pointerEvents: 'none'
      }}>
        <div style={{ 
          position: 'relative', width: '280px', height: '400px',
          transformStyle: 'preserve-3d',
          transform: `rotateY(${rotation}deg)`,
          transition: isDragging.current ? 'none' : 'transform 0.6s cubic-bezier(0.15, 0.85, 0.35, 1)'
        }}>
          {assets.map((s, i) => (
            <video 
              key={s.id}
              src={`/videos/${s.id}.mp4`} 
              autoPlay loop muted playsInline 
              style={{ 
                position: 'absolute', width: '100%', top: '50%', left: '50%',
                marginTop: s.y, marginLeft: '-50%',
                mixBlendMode: 'screen', opacity: 0.85,
                transform: `translateZ(${s.z}px)`,
              }} 
            />
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulseGlow {
          from { opacity: 0.4; transform: translate(-50%, -50%) scale(1); }
          to { opacity: 0.8; transform: translate(-50%, -50%) scale(1.2); }
        }
      `}} />

      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', opacity: 0.05, background: "url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Static_Noise.gif')" }} />
    </main>
  );
}