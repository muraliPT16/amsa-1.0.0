import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  radius: number;
  color: string;
  connections: number[];
}

interface Pulse {
  from: number;
  to: number;
  progress: number;
  speed: number;
}

export default function BackgroundEffect() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let pulses: Pulse[] = [];

    const isMobile = window.innerWidth < 768;
    const numParticles = isMobile ? 35 : 70;
    const maxPulses = isMobile ? 8 : 16;
    const maxDist = isMobile ? 115 : 145;
    const mouseRadius = isMobile ? 140 : 200;

    const mouse = { x: -1000, y: -1000, active: false };

    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let animationFrameId: number;
    let isVisible = true;

    function resizeCanvas() {
      if (!canvas || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.resetTransform();
      ctx.scale(dpr, dpr);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    function initParticles() {
      particles = [];
      pulses = [];
      const colors = [
        'rgba(71, 85, 105, 0.55)',   // Slate-600
        'rgba(212, 175, 55, 0.75)',  // Academic Gold
        'rgba(13, 148, 136, 0.60)',  // Teal
        'rgba(232, 80, 31, 0.55)',   // AMSA Vermilion
      ];

      for (let i = 0; i < numParticles; i++) {
        const baseVx = (Math.random() - 0.5) * 0.3;
        const baseVy = (Math.random() - 0.5) * 0.3;
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: baseVx,
          vy: baseVy,
          baseVx,
          baseVy,
          radius: Math.random() * 1.6 + 1.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          connections: [],
        });
      }
    }

    initParticles();

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        mouse.active = true;
      }
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY;
      scrollVelocity += Math.abs(diff) * 0.12;

      particles.forEach((p) => {
        p.y -= diff * 0.15;
        if (p.y < -15) p.y = window.innerHeight + 15;
        if (p.y > window.innerHeight + 15) p.y = -15;
      });

      lastScrollY = currentScrollY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });

    function updatePulses() {
      if (pulses.length < maxPulses && particles.length > 0 && Math.random() < 0.08) {
        const randomIndex = Math.floor(Math.random() * particles.length);
        const p = particles[randomIndex];

        if (p.connections.length > 0) {
          const targetIndex = p.connections[Math.floor(Math.random() * p.connections.length)];
          pulses.push({
            from: randomIndex,
            to: targetIndex,
            progress: 0,
            speed: Math.random() * 0.014 + 0.009,
          });
        }
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i];
        pulse.progress += pulse.speed * (1 + scrollVelocity * 0.15);

        if (pulse.progress >= 1) {
          pulses.splice(i, 1);
          continue;
        }

        const pFrom = particles[pulse.from];
        const pTo = particles[pulse.to];

        if (pFrom && pTo) {
          const x = pFrom.x + (pTo.x - pFrom.x) * pulse.progress;
          const y = pFrom.y + (pTo.y - pFrom.y) * pulse.progress;

          // Pulse glow point
          ctx.fillStyle = 'rgba(212, 175, 55, 0.9)';
          ctx.beginPath();
          ctx.arc(x, y, 2.5, 0, Math.PI * 2);
          ctx.fill();

          // Subtle halo
          ctx.strokeStyle = 'rgba(212, 175, 55, 0.35)';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(x, y, 5.5, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    }

    function animate() {
      if (!canvas || !ctx || !isVisible) return;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      scrollVelocity *= 0.94;
      if (scrollVelocity < 0.01) scrollVelocity = 0;

      // Update and draw particles
      particles.forEach((p) => {
        if (scrollVelocity > 0.02) {
          const angle = Math.random() * Math.PI * 2;
          const force = scrollVelocity * 0.05;
          p.vx += Math.cos(angle) * force;
          p.vy += Math.sin(angle) * force;
        }

        // Mouse gravitational attraction & tether
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouseRadius) {
            const pull = (1 - dist / mouseRadius) * 0.06;
            p.vx += (dx / dist) * pull;
            p.vy += (dy / dist) * pull;

            const lineAlpha = (1 - dist / mouseRadius) * 0.35;
            ctx.strokeStyle = `rgba(212, 175, 55, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
          }
        }

        p.vx += (p.baseVx - p.vx) * 0.04;
        p.vy += (p.baseVy - p.vy) * 0.04;

        const speed = Math.hypot(p.vx, p.vy);
        const maxSpeed = 1.3 + scrollVelocity * 0.15;
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -15) p.x = window.innerWidth + 15;
        if (p.x > window.innerWidth + 15) p.x = -15;
        if (p.y < -15) p.y = window.innerHeight + 15;
        if (p.y > window.innerHeight + 15) p.y = -15;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        p.connections = [];
      });

      // Neural mesh interconnecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          if (dist < maxDist) {
            p1.connections.push(j);
            p2.connections.push(i);

            const alpha = (1 - dist / maxDist) * 0.16;
            ctx.strokeStyle = `rgba(100, 116, 139, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      updatePulses();

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        animate();
      } else {
        cancelAnimationFrame(animationFrameId);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-40"
    />
  );
}
