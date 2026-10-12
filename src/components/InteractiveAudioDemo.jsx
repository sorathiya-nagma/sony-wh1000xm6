import React, { useState, useEffect, useRef } from 'react';
import { Shield, Radio, Sparkles, Play, Pause } from 'lucide-react';

export default function InteractiveAudioDemo() {
  const [activeMode, setActiveMode] = useState('hires'); // default to 'hires' to match the reference image perfectly!
  const [environment, setEnvironment] = useState('airplane'); // 'airplane', 'subway', 'office'
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const filterNodeRef = useRef(null);
  const noiseSourceRef = useRef(null);
  const synthOscRef = useRef(null);
  const synthGainRef = useRef(null);

  // Environmental presets matching image
  const environments = {
    airplane: { name: 'Intercontinental Flight', ambientDb: 84, icon: '✈', filterFreq: 320, noiseVol: 0.28 },
    subway: { name: 'Tokyo Metro Express', ambientDb: 80, icon: '🚇', filterFreq: 450, noiseVol: 0.24 },
    office: { name: 'Metropolitan Open Office', ambientDb: 64, icon: '🏢', filterFreq: 600, noiseVol: 0.12 },
  };

  const getAttenuatedDb = () => {
    const raw = environments[environment].ambientDb;
    if (activeMode === 'anc') return Math.max(18, raw - 42); // 42 dB
    if (activeMode === 'ambient') return Math.round(raw * 0.72); // ~60 dB
    return Math.max(22, raw - 38); // 46 dB (matches 46 dB SPL in screenshot!)
  };

  // Web Audio Synthesizer Engine
  const startAudio = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Generate brown/pink noise for authentic ambient rumble
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      // Filter Node
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';

      // Gain Node
      const gain = ctx.createGain();

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(0);
      noiseSourceRef.current = noise;
      filterNodeRef.current = filter;
      gainNodeRef.current = gain;

      // Hi-Res Harmonic Synth Chord
      const osc = ctx.createOscillator();
      const sGain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      sGain.gain.setValueAtTime(0.001, ctx.currentTime);
      osc.connect(sGain);
      sGain.connect(ctx.destination);
      osc.start();
      synthOscRef.current = osc;
      synthGainRef.current = sGain;

      setIsPlayingAudio(true);
      applyAudioSettings(activeMode, environment, ctx, filter, gain, sGain);
    } catch (e) {
      console.warn('Web Audio error:', e);
      setIsPlayingAudio(false);
    }
  };

  const stopAudio = () => {
    if (noiseSourceRef.current) {
      try { noiseSourceRef.current.stop(); } catch(e) {}
    }
    if (synthOscRef.current) {
      try { synthOscRef.current.stop(); } catch(e) {}
    }
    setIsPlayingAudio(false);
  };

  const applyAudioSettings = (mode, env, ctxParam, filterParam, gainParam, sGainParam) => {
    const ctx = ctxParam || audioCtxRef.current;
    const filter = filterParam || filterNodeRef.current;
    const gain = gainParam || gainNodeRef.current;
    const sGain = sGainParam || synthGainRef.current;

    if (!ctx || !filter || !gain) return;

    const envData = environments[env];
    const now = ctx.currentTime;

    if (mode === 'anc') {
      filter.frequency.setTargetAtTime(70, now, 0.15);
      gain.gain.setTargetAtTime(envData.noiseVol * 0.08, now, 0.15);
      if (sGain) sGain.gain.setTargetAtTime(0.001, now, 0.15);
    } else if (mode === 'ambient') {
      filter.frequency.setTargetAtTime(2400, now, 0.15);
      gain.gain.setTargetAtTime(envData.noiseVol * 0.7, now, 0.15);
      if (sGain) sGain.gain.setTargetAtTime(0.001, now, 0.15);
    } else if (mode === 'hires') {
      filter.frequency.setTargetAtTime(90, now, 0.15);
      gain.gain.setTargetAtTime(envData.noiseVol * 0.05, now, 0.15);
      if (sGain) sGain.gain.setTargetAtTime(0.08, now, 0.15);
    }
  };

  const handleModeChange = (mode) => {
    setActiveMode(mode);
    if (isPlayingAudio) {
      applyAudioSettings(mode, environment);
    }
  };

  const handleEnvironmentChange = (env) => {
    setEnvironment(env);
    if (isPlayingAudio) {
      applyAudioSettings(activeMode, env);
    }
  };

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  return (
    <section id="anc-demo" className="relative py-28 md:py-36 bg-[#040711] border-t border-cyan-500/10 overflow-hidden select-none">
      
      {/* Blueprint Perspective Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 214, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 214, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at 50% 50%, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, black 40%, transparent 80%)'
        }}
      />

      {/* Ambient Blue & Cyan Glows */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[450px] bg-[#0050FF]/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[400px] bg-[#00D6FF]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Floating Tiny Star Dust Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <span className="absolute top-1/4 left-12 text-cyan-300/40 text-[10px]">✦</span>
        <span className="absolute top-1/3 right-16 text-cyan-200/50 text-xs">✦</span>
        <span className="absolute bottom-1/4 left-1/3 text-white/30 text-[8px]">·</span>
        <span className="absolute top-2/3 right-1/4 text-cyan-400/30 text-[10px]">✦</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Bar matching reference image */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-14">
          
          {/* Left Title: ACOUSTIC SIMULATION MATRIX + Simulated Anti-Noise DSP Engine */}
          <div>
            <div className="text-[11px] font-mono text-[#00D6FF] uppercase tracking-[0.25em] font-semibold mb-2">
              ACOUSTIC SIMULATION MATRIX
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.08]">
              Simulated Anti-Noise<br />
              DSP Engine
            </h2>
          </div>

          {/* Right Controls: START AUDIO PREVIEW pill + Environment selector bar */}
          <div className="flex flex-col sm:flex-row sm:items-center lg:items-end flex-wrap gap-4">
            
            {/* START AUDIO PREVIEW Button */}
            <button
              onClick={isPlayingAudio ? stopAudio : startAudio}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                isPlayingAudio
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-400 shadow-[0_0_25px_rgba(244,63,94,0.6)] animate-pulse'
                  : 'bg-[#00D6FF]/10 text-cyan-200 border border-[#00D6FF] shadow-[0_0_24px_rgba(0,214,255,0.45)] hover:shadow-[0_0_35px_rgba(0,214,255,0.7)] hover:bg-[#00D6FF]/20 hover:scale-105 active:scale-95'
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>PAUSE AUDIO PREVIEW</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current text-cyan-300" />
                  <span>START AUDIO PREVIEW</span>
                </>
              )}
            </button>

            {/* Environmental selector capsule matching reference */}
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#0B1020]/80 border border-white/10 backdrop-blur-xl shadow-xl">
              {Object.entries(environments).map(([key, env]) => {
                const isActive = environment === key;
                return (
                  <button
                    key={key}
                    onClick={() => handleEnvironmentChange(key)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                      isActive
                        ? 'bg-white/10 text-white border border-[#00D6FF]/70 shadow-[0_0_15px_rgba(0,214,255,0.3)] font-semibold'
                        : 'text-white/50 hover:text-white'
                    }`}
                  >
                    <span className="text-xs">{env.icon}</span>
                    <span className="hidden sm:inline">{env.name}</span>
                  </button>
                );
              })}
            </div>

          </div>

        </div>

        {/* The 3 3D Glassmorphism Mode Cards matching screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Card 1: Flagship Active NC */}
          <div
            onClick={() => handleModeChange('anc')}
            className={`rounded-3xl p-7 md:p-8 cursor-pointer transition-all duration-400 relative overflow-hidden backdrop-blur-2xl flex flex-col justify-between min-h-[290px] ${
              activeMode === 'anc'
                ? 'bg-gradient-to-b from-[#0038A8]/60 via-[#002060]/70 to-[#040814]/90 border-2 border-cyan-400 shadow-[0_20px_50px_rgba(0,0,0,0.9),_0_0_35px_rgba(0,214,255,0.5),_inset_0_1px_2px_rgba(255,255,255,0.4)] scale-[1.02]'
                : 'bg-[#0B1020]/75 border border-cyan-500/30 hover:border-cyan-400/60 shadow-[0_15px_35px_rgba(0,0,0,0.8),_0_0_20px_rgba(0,214,255,0.12)] hover:-translate-y-1'
            }`}
          >
            {/* Top row: Icon + Engaged badge if active */}
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl border border-cyan-400/80 bg-cyan-950/40 shadow-[0_0_18px_rgba(0,214,255,0.6)] flex items-center justify-center text-cyan-300">
                <Shield className="w-6 h-6 stroke-[2.2]" />
              </div>
              {activeMode === 'anc' && (
                <span className="px-3 py-1 rounded-full border border-cyan-400/80 bg-cyan-500/20 text-cyan-200 text-[10px] font-mono uppercase font-bold tracking-wider shadow-[0_0_12px_rgba(0,214,255,0.4)]">
                  ENGAGED
                </span>
              )}
            </div>

            {/* Middle Content */}
            <div className="my-auto pt-6 pb-4">
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-2">
                Flagship Active NC
              </h3>
              <p className="text-xs md:text-sm text-white/60 leading-relaxed">
                Real-time inverted anti-phase wave cancels low engine rumble and mid-frequency chatter.
              </p>
            </div>

            {/* Bottom Metric */}
            <div className="pt-3 border-t border-white/[0.06]">
              <span className="text-xs md:text-sm font-mono font-bold text-[#00D6FF] tracking-wide">
                -42 dB Total Isolation
              </span>
            </div>
          </div>

          {/* Card 2: Ambient Transparency */}
          <div
            onClick={() => handleModeChange('ambient')}
            className={`rounded-3xl p-7 md:p-8 cursor-pointer transition-all duration-400 relative overflow-hidden backdrop-blur-2xl flex flex-col justify-between min-h-[290px] ${
              activeMode === 'ambient'
                ? 'bg-gradient-to-b from-[#78350f]/50 via-[#451a03]/60 to-[#040814]/90 border-2 border-amber-400 shadow-[0_20px_50px_rgba(0,0,0,0.9),_0_0_35px_rgba(245,158,11,0.5),_inset_0_1px_2px_rgba(255,255,255,0.4)] scale-[1.02]'
                : 'bg-[#0B1020]/75 border border-white/10 hover:border-amber-400/40 shadow-[0_15px_35px_rgba(0,0,0,0.8)] hover:-translate-y-1'
            }`}
          >
            {/* Top row: Icon + Engaged badge if active */}
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl border border-amber-400/70 bg-amber-950/30 shadow-[0_0_18px_rgba(245,158,11,0.5)] flex items-center justify-center text-amber-300">
                <Radio className="w-6 h-6 stroke-[2.2]" />
              </div>
              {activeMode === 'ambient' && (
                <span className="px-3 py-1 rounded-full border border-amber-400/80 bg-amber-500/20 text-amber-200 text-[10px] font-mono uppercase font-bold tracking-wider shadow-[0_0_12px_rgba(245,158,11,0.4)]">
                  ENGAGED
                </span>
              )}
            </div>

            {/* Middle Content */}
            <div className="my-auto pt-6 pb-4">
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-2">
                Ambient Transparency
              </h3>
              <p className="text-xs md:text-sm text-white/60 leading-relaxed">
                12-mic cluster isolates flight announcements while keeping background roar dampened.
              </p>
            </div>

            {/* Bottom Metric */}
            <div className="pt-3 border-t border-white/[0.06]">
              <span className="text-xs md:text-sm font-mono font-bold text-[#00D6FF] tracking-wide">
                Binaural Voice Focus
              </span>
            </div>
          </div>

          {/* Card 3: Hi-Res Audio LDAC (Engaged State in reference image) */}
          <div
            onClick={() => handleModeChange('hires')}
            className={`rounded-3xl p-7 md:p-8 cursor-pointer transition-all duration-400 relative overflow-hidden backdrop-blur-2xl flex flex-col justify-between min-h-[290px] ${
              activeMode === 'hires'
                ? 'bg-gradient-to-b from-[#0038A8]/60 via-[#002060]/70 to-[#040814]/90 border-2 border-cyan-400 shadow-[0_20px_50px_rgba(0,0,0,0.9),_0_0_35px_rgba(0,102,255,0.7),_inset_0_1px_2px_rgba(255,255,255,0.4)] scale-[1.02]'
                : 'bg-[#0B1020]/75 border border-cyan-500/30 hover:border-cyan-400/60 shadow-[0_15px_35px_rgba(0,0,0,0.8),_0_0_20px_rgba(0,214,255,0.12)] hover:-translate-y-1'
            }`}
          >
            {/* Top row: Icon + Engaged badge */}
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl border border-cyan-300 bg-cyan-400/20 text-cyan-200 shadow-[0_0_20px_rgba(0,214,255,0.7)] flex items-center justify-center">
                <Sparkles className="w-6 h-6 stroke-[2.2]" />
              </div>
              <span className="px-3 py-1 rounded-full border border-cyan-400/80 bg-cyan-500/20 text-cyan-200 text-[10px] font-mono uppercase font-bold tracking-wider shadow-[0_0_12px_rgba(0,214,255,0.4)]">
                ENGAGED
              </span>
            </div>

            {/* Middle Content */}
            <div className="my-auto pt-6 pb-4">
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-2">
                Hi-Res Audio LDAC
              </h3>
              <p className="text-xs md:text-sm text-white/70 leading-relaxed">
                990 kbps bit-perfect transmission with zero-jitter 32-bit floating point DAC.
              </p>
            </div>

            {/* Bottom Metric */}
            <div className="pt-3 border-t border-white/[0.06]">
              <span className="text-xs md:text-sm font-mono font-bold text-[#00D6FF] tracking-wide">
                24-bit / 96 kHz Audiophile
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Futuristic HUD Audio Waveform Deck matching reference image */}
        <div className="rounded-2xl p-4 sm:p-6 border border-white/10 bg-[#070B16]/85 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
          
          {/* High-tech corner telemetry marks */}
          <span className="absolute top-2 left-3 text-[9px] font-mono text-white/20 select-none">┌ 33.98</span>
          <span className="absolute top-2 right-4 text-[9px] font-mono text-white/20 select-none">59.08 (S) ┐</span>
          <span className="absolute bottom-2 left-3 text-[9px] font-mono text-white/20 select-none">└ 33.98</span>
          <span className="absolute bottom-2 right-4 text-[9px] font-mono text-white/20 select-none">38.08 ┘</span>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 py-2 px-1 sm:px-4">
            
            {/* The Symmetrical Mirrored Waveform Visualizer */}
            <div className="w-full flex-1 h-20 flex items-center justify-center gap-1 sm:gap-1.5 px-2 overflow-hidden">
              {Array.from({ length: 54 }).map((_, i) => {
                // Symmetrical wave calculation mirroring the screenshot
                const centerDist = Math.abs(i - 27);
                let baseHeight = Math.max(8, Math.sin(i * 0.45) * 55 + (28 - centerDist) * 1.5);
                
                if (activeMode === 'anc') {
                  baseHeight = centerDist < 10 ? 12 : baseHeight * 0.4;
                } else if (activeMode === 'ambient') {
                  baseHeight = (i > 15 && i < 38) ? baseHeight * 0.9 : baseHeight * 0.5;
                }

                const barHeight = Math.min(68, Math.max(6, baseHeight));

                // Color gradient transition from purple-cyan (left) to electric cyan (center) to neon blue (right)
                let gradientClass = 'bg-gradient-to-b from-[#00D6FF] via-[#0088FF] to-[#00D6FF]';
                if (i < 18) {
                  gradientClass = 'bg-gradient-to-b from-[#A855F7] via-[#00D6FF] to-[#A855F7]';
                } else if (i > 36) {
                  gradientClass = 'bg-gradient-to-b from-[#00D6FF] via-[#3B82F6] to-[#00D6FF]';
                }

                return (
                  <div key={i} className="flex-1 flex flex-col items-center justify-center h-full">
                    <div 
                      className={`w-full max-w-[4px] rounded-full transition-all duration-300 ${gradientClass}`}
                      style={{ 
                        height: `${barHeight}px`,
                        opacity: isPlayingAudio ? 0.95 : 0.8
                      }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Right Telemetry Box matching screenshot */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="bg-black/60 border border-white/10 rounded-xl px-5 py-3 flex items-center gap-6 shadow-inner">
                {/* MEASURED IN-EAR SPL */}
                <div>
                  <div className="text-[9px] font-mono text-white/40 tracking-wider uppercase mb-0.5">
                    MEASURED IN-EAR SPL
                  </div>
                  <div className="text-base sm:text-lg font-mono font-bold text-[#00D6FF] tracking-tight">
                    {getAttenuatedDb()} dB SPL
                  </div>
                </div>

                {/* Vertical Divider */}
                <div className="w-[1px] h-7 bg-white/10" />

                {/* RAW NOISE LEVEL */}
                <div>
                  <div className="text-[9px] font-mono text-white/40 tracking-wider uppercase mb-0.5">
                    RAW NOISE LEVEL
                  </div>
                  <div className="text-base sm:text-lg font-mono font-bold text-white/40 tracking-tight">
                    {environments[environment].ambientDb} dB
                  </div>
                </div>
              </div>

              {/* Floating Star Sparkle */}
              <span className="text-white/40 text-xl select-none hidden sm:inline">✦</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
