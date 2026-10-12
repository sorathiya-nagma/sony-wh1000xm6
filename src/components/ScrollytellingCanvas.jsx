import React, { useRef, useEffect, useState, useCallback } from 'react';
import { 
  ArrowDown, 
  ChevronRight, 
  Cpu, 
  Mic2, 
  Sparkles, 
  Sliders, 
  ShieldCheck, 
  Layers,
  Activity,
  Zap,
  Volume2,
  Battery
} from 'lucide-react';

const TOTAL_FRAMES = 120;

export default function ScrollytellingCanvas({ onOpenPreOrder }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedRatio, setLoadedRatio] = useState(0);

  // References for animation loop
  const imagesRef = useRef([]);
  const fallbackRef = useRef(null);
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const animationFrameIdRef = useRef(null);

  // Canvas drawing function
  const renderFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.width;
    const height = canvas.height;

    // Fill pure void background
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, width, height);

    const clampedIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.floor(frameIndex)));
    let img = imagesRef.current[clampedIndex];

    // Fallback hierarchy: target frame -> frame 0 -> master hero image
    if (!img || !img.complete || img.naturalWidth === 0) {
      img = imagesRef.current[0];
    }
    if (!img || !img.complete || img.naturalWidth === 0) {
      img = fallbackRef.current;
    }

    if (img && img.complete && img.naturalWidth > 0) {
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const canvasAspect = width / height;

      let drawW, drawH, drawX, drawY;

      if (canvasAspect > imgAspect) {
        drawH = height * 0.94;
        drawW = drawH * imgAspect;
        drawX = (width - drawW) / 2;
        drawY = (height - drawH) / 2;
      } else {
        drawW = width * 0.96;
        drawH = drawW / imgAspect;
        drawX = (width - drawW) / 2;
        drawY = (height - drawH) / 2;
      }

      ctx.drawImage(img, drawX, drawY, drawW, drawH);

      // Subtle edge feathering for 100% seamless blending into void
      const grad = ctx.createRadialGradient(
        width / 2, height / 2, Math.min(drawW, drawH) * 0.35,
        width / 2, height / 2, Math.max(width, height) * 0.55
      );
      grad.addColorStop(0, 'rgba(5, 5, 5, 0)');
      grad.addColorStop(0.7, 'rgba(5, 5, 5, 0.05)');
      grad.addColorStop(1, 'rgba(5, 5, 5, 0.85)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    }
  }, []);

  // Preload frames
  useEffect(() => {
    let loaded = 0;
    const images = [];

    // Master Hero Fallback Image
    const fallback = new Image();
    fallback.src = '/images/hero.png';
    fallback.onload = () => {
      fallbackRef.current = fallback;
      setImagesLoaded(true);
      renderFrame(0);
    };
    fallbackRef.current = fallback;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const num = String(i).padStart(3, '0');
      img.src = `/frames/frame_${num}.jpg`;

      img.onload = () => {
        loaded++;
        const ratio = Math.floor((loaded / TOTAL_FRAMES) * 100);
        setLoadedRatio(ratio);
        if (i === 0 || loaded >= 1) {
          setImagesLoaded(true);
          renderFrame(currentFrameRef.current);
        }
      };

      img.onerror = () => {
        loaded++;
        setImagesLoaded(true);
      };

      images.push(img);
    }

    imagesRef.current = images;

    // Safety timeout: ensure visible within 500ms
    const timer = setTimeout(() => {
      setImagesLoaded(true);
      renderFrame(0);
    }, 500);

    return () => {
      clearTimeout(timer);
      if (Array.isArray(imagesRef.current)) {
        imagesRef.current.forEach((img) => {
          img.onload = null;
          img.onerror = null;
        });
      }
    };
  }, [renderFrame]);

  // Resize listener
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      renderFrame(currentFrameRef.current);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [renderFrame]);

  // RequestAnimationFrame lerp render loop
  useEffect(() => {
    let isRunning = true;

    const animate = () => {
      if (!isRunning) return;

      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.01) {
        currentFrameRef.current += diff * 0.12;
        renderFrame(currentFrameRef.current);
      }

      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    animationFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      isRunning = false;
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [renderFrame]);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / totalScrollable));
      setScrollProgress(progress);

      const frameIdx = progress * (TOTAL_FRAMES - 1);
      targetFrameRef.current = frameIdx;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Narrative Beat Visibility Checkers
  const getBeatOpacity = (start, peakStart, peakEnd, end) => {
    if (scrollProgress < start || scrollProgress > end) return 0;
    if (scrollProgress >= peakStart && scrollProgress <= peakEnd) return 1;
    if (scrollProgress < peakStart) {
      return (scrollProgress - start) / (peakStart - start);
    }
    return 1 - (scrollProgress - peakEnd) / (end - peakEnd);
  };

  const beat1Opacity = getBeatOpacity(-0.05, 0.0, 0.12, 0.17);
  const beat2Opacity = getBeatOpacity(0.17, 0.23, 0.36, 0.42);
  const beat3Opacity = getBeatOpacity(0.42, 0.48, 0.62, 0.68);
  const beat4Opacity = getBeatOpacity(0.68, 0.72, 0.82, 0.86);
  const beat5Opacity = getBeatOpacity(0.86, 0.90, 1.0, 1.05);

  return (
    <section 
      id="hero"
      ref={containerRef} 
      className="relative w-full h-[460vh] bg-void"
      style={{ willChange: 'transform' }}
    >
      {/* Sticky Canvas Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-void select-none">
        
        {/* Soft Amber Glow (Upper Left) & Electric Blue Glow (Right) matching image */}
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
          style={{
            background: 'radial-gradient(circle at 20% 25%, rgba(245, 158, 11, 0.12) 0%, transparent 45%), radial-gradient(circle at 80% 50%, rgba(0, 102, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(5, 8, 21, 0.05) 0%, #050505 80%)',
            opacity: 0.95
          }}
        />

        {/* Ambient Hologram Concentric Rings & Sound Wave Radiations */}
        <div 
          className="absolute inset-0 pointer-events-none flex items-center justify-center transition-opacity duration-700"
          style={{ opacity: beat1Opacity }}
        >
          {/* Outer Ring with Golden & Cyan Gradient Rim */}
          <div className="absolute w-[620px] sm:w-[760px] md:w-[860px] h-[620px] sm:h-[760px] md:h-[860px] rounded-full border border-white/[0.07] opacity-60 pointer-events-none">
            <div className="absolute inset-0 rounded-full border border-dashed border-amber-400/20 [clip-path:polygon(0_0,50%_0,50%_100%,0_100%)]" />
            <div className="absolute inset-0 rounded-full border border-dashed border-cyan-400/20 [clip-path:polygon(50%_0,100%_0,100%_100%,50%_100%)]" />
          </div>

          {/* Inner Golden Halo Ring */}
          <div className="absolute w-[440px] sm:w-[540px] md:w-[620px] h-[440px] sm:h-[540px] md:h-[620px] rounded-full border border-amber-500/15 opacity-80" />

          {/* Horizontal Sound Waves Radiating in Background */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-44 flex items-center justify-between opacity-25 px-4 overflow-hidden pointer-events-none">
            {Array.from({ length: 64 }).map((_, i) => {
              const distFromCenter = Math.abs(i - 32);
              const height = distFromCenter < 12 ? 4 : Math.min(80, Math.sin(i * 0.4) * 40 + (distFromCenter * 1.5));
              return (
                <div 
                  key={i} 
                  className={`w-[1px] md:w-[1.5px] rounded-full ${i < 32 ? 'bg-amber-300/60' : 'bg-cyan-300/60'}`}
                  style={{ height: `${height}px` }}
                />
              );
            })}
          </div>

          {/* Golden Particle Stars */}
          <span className="absolute top-[32%] left-[24%] text-amber-300/70 text-xs animate-pulse">✦</span>
          <span className="absolute top-[48%] left-[21%] text-amber-200/50 text-[10px]">·</span>
          <span className="absolute top-[68%] left-[27%] text-amber-300/60 text-xs">✦</span>
          <span className="absolute top-[30%] right-[25%] text-cyan-300/60 text-xs animate-pulse" style={{ animationDelay: '300ms' }}>✦</span>
          <span className="absolute top-[65%] right-[22%] text-cyan-200/50 text-[10px]">·</span>
        </div>

        {/* The Core HTML5 Canvas (Hardware-accelerated 120-frame sequence) */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain pointer-events-none z-10"
          style={{ width: '100%', height: '100%' }}
        />

        {/* HERO UI OVERLAY MATCHING TARGET IMAGE (BEAT 1: 0 - 17%) */}
        <div 
          className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-6 md:p-10 lg:p-14 transition-all duration-500 ease-out"
          style={{
            opacity: beat1Opacity,
            transform: `translateY(${(1 - beat1Opacity) * 15}px)`
          }}
        >
          {/* Top-Left: Golden Badge Pill with Liquid Glass */}
          <div className="pt-20 md:pt-24 self-start pointer-events-auto">
            <div className="liquid-glass-pill inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-amber-400/40 shadow-[0_0_25px_rgba(245,158,11,0.3)]">
              <span className="text-amber-400 text-xs">✦</span>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-amber-200/95 font-semibold">
                THE NEXT REVOLUTION IN SILENCE
              </span>
            </div>
          </div>

          {/* Middle Row: Left HUD Card + Center Title + Right HUD Card */}
          <div className="w-full flex items-center justify-between my-auto relative">
            
            {/* Left HUD Card: 30H BATTERY LIFE (Liquid Glass) */}
            <div className="hidden sm:flex liquid-glass rounded-2xl p-4 md:p-5 flex-col gap-1 w-36 md:w-44 pointer-events-auto transition-transform hover:scale-105">
              <div className="flex items-center justify-between">
                <span className="text-2xl md:text-3xl font-extrabold text-white font-mono tracking-tight">30H</span>
                <Battery className="w-5 h-5 text-white/80" />
              </div>
              <span className="text-[10px] md:text-[11px] font-mono tracking-wider text-white/50 uppercase font-medium">
                BATTERY LIFE
              </span>
            </div>

            {/* Center Typography (Editorial Headline & Subtitle directly over headphones) */}
            <div className="text-center max-w-2xl mx-auto pointer-events-auto px-4 z-30">
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white mb-3 leading-[0.92] drop-shadow-[0_8px_30px_rgba(0,0,0,0.95)]">
                Sony WH-<br />1000XM6
              </h1>
              <p className="text-lg sm:text-2xl md:text-3xl font-bold tracking-tight text-white mb-2 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                Silence, perfected. <span className="text-white/60 font-medium">Hear only what matters.</span>
              </p>
              <p className="text-xs sm:text-sm md:text-base text-white/70 max-w-lg mx-auto leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                Flagship wireless noise cancelling, re-engineered for a world that never stops.
              </p>
            </div>

            {/* Right HUD Card: ACTIVE NOISE CANCELLING V2 (Liquid Glass) */}
            <div className="hidden sm:flex liquid-glass rounded-2xl p-4 md:p-5 flex-col gap-2 w-44 md:w-52 pointer-events-auto transition-transform hover:scale-105">
              {/* Dynamic waveform bars icon */}
              <div className="flex items-end gap-1.5 h-5 text-white/90">
                <span className="w-1 bg-white/90 rounded-full h-3 animate-pulse"></span>
                <span className="w-1 bg-white/90 rounded-full h-5 animate-pulse" style={{ animationDelay: '150ms' }}></span>
                <span className="w-1 bg-white/90 rounded-full h-2 animate-pulse" style={{ animationDelay: '300ms' }}></span>
                <span className="w-1 bg-white/90 rounded-full h-4 animate-pulse" style={{ animationDelay: '450ms' }}></span>
                <span className="w-1 bg-white/90 rounded-full h-3 animate-pulse" style={{ animationDelay: '200ms' }}></span>
              </div>
              <span className="text-[10px] md:text-[11px] font-mono font-bold tracking-wider text-white/90 uppercase leading-snug">
                ACTIVE NOISE CANCELLING V2
              </span>
            </div>

          </div>

          {/* Bottom Row: Order Now (Left) · SCROLL TO DECONSTRUCT ↓ (Center) · Explore Sound Demo ▶ (Right) */}
          <div className="w-full flex items-center justify-between pb-2 pointer-events-auto">
            
            {/* Bottom-Left: Order Now Pill with Liquid Glass */}
            <button
              onClick={onOpenPreOrder}
              className="liquid-glass-pill px-6 py-2.5 rounded-full text-white text-xs font-semibold tracking-wide transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
            >
              Order Now
            </button>

            {/* Bottom-Center: SCROLL TO DECONSTRUCT */}
            <div className="flex flex-col items-center gap-1 select-none">
              <div className="flex items-center gap-2 text-xs font-mono text-white/60 uppercase tracking-[0.25em]">
                <span>SCROLL TO DECONSTRUCT</span>
                <span className="text-cyan-400">↓</span>
              </div>
              <div className="flex flex-col items-center -space-y-1 opacity-70">
                <span className="text-cyan-400 text-xs animate-bounce">⌄</span>
              </div>
            </div>

            {/* Bottom-Right: Explore Sound Demo ▶ + Sparkle */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  const elem = document.getElementById('anc-demo');
                  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs md:text-sm font-medium text-white/70 hover:text-white flex items-center gap-2 transition-colors cursor-pointer group"
              >
                <span>Explore Sound Demo</span>
                <span className="text-[10px] text-white/40 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all">▶</span>
              </button>
              <span className="text-white/40 text-xl select-none hidden sm:inline">✦</span>
            </div>

          </div>

        </div>

        {/* SUBSEQUENT SCROLL NARRATIVE BEATS (ENGINEERING, ANC, ACOUSTICS, CTA) */}
        <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-6 md:p-14 lg:p-20">

          {/* Top Progress / Scrubbing HUD for Scrolly Beats */}
          {scrollProgress >= 0.17 && (
            <div className="w-full flex items-center justify-between text-xs font-mono text-white/40 tracking-wider pt-16 md:pt-14 animate-in fade-in duration-300">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sony-cyan/80"></span>
                <span className="hidden sm:inline">STATE:</span>
                <span className="text-white/80 font-medium">
                  {scrollProgress >= 0.17 && scrollProgress < 0.42 && "DISASSEMBLY // ACOUSTIC CHAMBERS"}
                  {scrollProgress >= 0.42 && scrollProgress < 0.68 && "EXPLODED // 12-MIC ARRAY & QN2"}
                  {scrollProgress >= 0.68 && scrollProgress < 0.86 && "HARMONIC ALIGNMENT // 40MM DRIVER"}
                  {scrollProgress >= 0.86 && "SYNTHESIS // DUAL PRECISION LOCK"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden md:inline text-[11px] text-white/30">FRAME {String(Math.floor(currentFrameRef.current)).padStart(3, '0')} / 119</span>
                <div className="w-16 md:w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-sony-cyan/70 transition-all duration-150"
                    style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                  />
                </div>
                <span className="text-sony-cyan font-semibold text-[11px]">
                  {Math.round(scrollProgress * 100)}%
                </span>
              </div>
            </div>
          )}

          {/* STORY BEAT 2: ENGINEERING REVEAL (17 - 42%) */}
          <div 
            className="my-auto max-w-xl self-start text-left transition-all duration-500 ease-out"
            style={{
              opacity: beat2Opacity,
              transform: `translateX(${(1 - beat2Opacity) * -30}px)`,
              pointerEvents: beat2Opacity > 0.5 ? 'auto' : 'none'
            }}
          >
            <div className="glass-card p-6 md:p-8 rounded-3xl border border-white/10 backdrop-blur-2xl bg-black/60 shadow-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-sony-cyan uppercase tracking-widest mb-3">
                <Layers className="w-3.5 h-3.5" />
                <span>ACOUSTIC ARCHITECTURE</span>
              </div>

              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gradient-apple mb-4 leading-tight">
                Precision-engineered for silence.
              </h2>

              <p className="text-sm md:text-base text-white/70 leading-relaxed mb-4">
                Custom drivers, sealed acoustic chambers, and optimized airflow deliver studio-grade clarity.
              </p>

              <p className="text-xs md:text-sm text-white/50 leading-relaxed mb-6">
                Every component is tuned for balance, power, and comfort—hour after hour.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-[11px] font-mono text-sony-cyan mb-1">CHAMBER DAMPING</div>
                  <div className="text-xs text-white/80 font-medium">Hydrodynamic Venting</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-[11px] font-mono text-sony-cyan mb-1">MEMBRANE</div>
                  <div className="text-xs text-white/80 font-medium">Liquid Crystal Polymer</div>
                </div>
              </div>
            </div>
          </div>

          {/* STORY BEAT 3: NOISE CANCELLING & MICROPHONES (42 - 68%) */}
          <div 
            className="my-auto max-w-xl self-end text-left transition-all duration-500 ease-out"
            style={{
              opacity: beat3Opacity,
              transform: `translateX(${(1 - beat3Opacity) * 30}px)`,
              pointerEvents: beat3Opacity > 0.5 ? 'auto' : 'none'
            }}
          >
            <div className="glass-card p-6 md:p-8 rounded-3xl border border-white/10 backdrop-blur-2xl bg-black/60 shadow-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-sony-cyan uppercase tracking-widest mb-3">
                <Mic2 className="w-3.5 h-3.5" />
                <span>INTELLIGENT ISOLATION</span>
              </div>

              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gradient-apple mb-4 leading-tight">
                Adaptive noise cancelling, redefined.
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-sony-cyan mt-2 shrink-0"></span>
                  <p className="text-xs md:text-sm text-white/80">
                    <strong className="text-white">Multi-microphone array</strong> listens in every direction with spatial precision.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-sony-cyan mt-2 shrink-0"></span>
                  <p className="text-xs md:text-sm text-white/80">
                    <strong className="text-white">Real-time noise analysis</strong> dynamically adjusts to your shifting environment.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-sony-cyan mt-2 shrink-0"></span>
                  <p className="text-xs md:text-sm text-white/80">
                    <strong className="text-white">Your music stays pure</strong>—turbulent jet cabins, subways, and crowded cafés completely vanish.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-sony-blue/10 border border-sony-blue/30">
                <div className="flex items-center gap-3">
                  <Cpu className="w-5 h-5 text-sony-cyan" />
                  <div>
                    <div className="text-xs font-bold text-white tracking-wide">HD PROCESSOR QN2</div>
                    <div className="text-[10px] font-mono text-white/50">700,000 CALCULATIONS / SEC</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono font-bold text-sony-cyan">-42 dB</div>
                  <div className="text-[10px] text-white/40 font-mono">ATTENUATION</div>
                </div>
              </div>
            </div>
          </div>

          {/* STORY BEAT 4: SOUND & UPSCALING (68 - 86%) */}
          <div 
            className="my-auto max-w-xl self-start text-left transition-all duration-500 ease-out"
            style={{
              opacity: beat4Opacity,
              transform: `translateY(${(1 - beat4Opacity) * 25}px)`,
              pointerEvents: beat4Opacity > 0.5 ? 'auto' : 'none'
            }}
          >
            <div className="glass-card p-6 md:p-8 rounded-3xl border border-white/10 backdrop-blur-2xl bg-black/60 shadow-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-sony-cyan uppercase tracking-widest mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SONY ACOUSTIC HERITAGE</span>
              </div>

              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gradient-apple mb-4 leading-tight">
                Immersive, lifelike sound.
              </h2>

              <p className="text-sm md:text-base text-white/80 leading-relaxed mb-4">
                High-performance 40mm bespoke drivers unlock microscopic detail, visceral depth, and studio presence in every track.
              </p>

              <p className="text-xs md:text-sm text-white/50 leading-relaxed mb-6">
                Edge-AI enhanced DSEE Ultimate upscaling continuously restores high-frequency harmonics lost in compressed audio streams.
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-white/70">
                  Hi-Res Audio Wireless
                </span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-sony-cyan">
                  LDAC 990 kbps
                </span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-white/70">
                  360 Reality Audio
                </span>
              </div>
            </div>
          </div>

          {/* STORY BEAT 5: REASSEMBLY & FINAL CTA (86 - 100%) */}
          <div 
            className="my-auto mx-auto max-w-2xl text-center transition-all duration-500 ease-out"
            style={{
              opacity: beat5Opacity,
              transform: `translateY(${(1 - beat5Opacity) * 20}px)`,
              pointerEvents: beat5Opacity > 0.5 ? 'auto' : 'none'
            }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sony-blue/20 border border-sony-cyan/30 mb-6 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-sony-cyan animate-pulse"></span>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-sony-cyan">
                PRECISION CRAFTSMANSHIP
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-gradient-apple mb-4 leading-none">
              Hear everything.<br />Feel nothing else.
            </h2>

            <p className="text-lg sm:text-xl md:text-2xl font-medium tracking-tight text-white/80 mb-2">
              WH-1000XM6. Designed for focus, crafted for comfort.
            </p>

            <p className="text-xs sm:text-sm text-white/40 max-w-md mx-auto mb-8 font-mono">
              Engineered for airports, offices, and everything in between.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onOpenPreOrder}
                className="btn-sony-primary w-full sm:w-auto px-8 py-4 rounded-full text-sm md:text-base font-semibold text-white tracking-wide flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-sony-blue/40 pointer-events-auto"
              >
                <span>Experience WH-1000XM6</span>
                <ChevronRight className="w-4 h-4 text-sony-cyan" />
              </button>

              <button
                onClick={() => {
                  const elem = document.getElementById('specs');
                  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-sony-secondary w-full sm:w-auto px-8 py-4 rounded-full text-sm md:text-base font-medium text-white/80 hover:text-white cursor-pointer pointer-events-auto"
              >
                See full specs
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
