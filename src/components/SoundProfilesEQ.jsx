import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';

export default function SoundProfilesEQ() {
  const presets = {
    signature: {
      name: 'Sony Signature',
      desc: 'Bespoke tuning with articulate clear bass, velvet mids, and sparkling air extension.',
      bands: [4, 1, 0, 2, 5],
      clearBass: 6
    },
    reference: {
      name: 'Audiophile Reference',
      desc: 'Surgically flat response curve tuned to Tokyo mastering room standards.',
      bands: [0, 0, 0, 0, 0],
      clearBass: 0
    },
    vocal: {
      name: 'Vocal Immersion',
      desc: 'Elevated 1kHz - 3kHz presence band for intimate, lifelike human vocals.',
      bands: [-2, 0, 4, 3, 1],
      clearBass: 1
    },
    club: {
      name: 'Sub-Bass Drive',
      desc: 'Explosive low-end slam without spilling into muddy low-mid frequencies.',
      bands: [7, 4, -1, 1, 3],
      clearBass: 9
    }
  };

  const [activePreset, setActivePreset] = useState('signature');
  const [bands, setBands] = useState(presets.signature.bands);
  const [clearBass, setClearBass] = useState(presets.signature.clearBass);

  const handlePresetSelect = (key) => {
    setActivePreset(key);
    setBands([...presets[key].bands]);
    setClearBass(presets[key].clearBass);
  };

  const handleBandChange = (index, val) => {
    const next = [...bands];
    next[index] = Number(val);
    setBands(next);
  };

  const frequencies = ['400 Hz', '1 kHz', '2.5 kHz', '6.3 kHz', '16 kHz'];

  // SVG dimensions
  const svgW = 860;
  const svgH = 220;

  // Node positions
  const nodePoints = bands.map((val, idx) => {
    const x = 70 + idx * 180;
    const y = 110 - val * 7.5;
    return { x, y, val };
  });

  // Generate smooth cubic bezier SVG path
  const generatePath = () => {
    if (nodePoints.length === 0) return '';
    let d = `M ${nodePoints[0].x},${nodePoints[0].y}`;
    for (let i = 0; i < nodePoints.length - 1; i++) {
      const p0 = nodePoints[i];
      const p1 = nodePoints[i + 1];
      const cx1 = p0.x + (p1.x - p0.x) * 0.5;
      const cy1 = p0.y;
      const cx2 = p0.x + (p1.x - p0.x) * 0.5;
      const cy2 = p1.y;
      d += ` C ${cx1},${cy1} ${cx2},${cy2} ${p1.x},${p1.y}`;
    }
    return d;
  };

  const curvePath = generatePath();

  return (
    <section id="acoustics" className="relative py-28 md:py-36 bg-[#040711] border-t border-cyan-500/10 overflow-hidden select-none">
      
      {/* Background Blueprint Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 214, 255, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 214, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at 50% 50%, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, black 40%, transparent 80%)'
        }}
      />

      {/* Ambient Lighting */}
      <div className="absolute top-1/3 left-1/3 w-[600px] h-[500px] bg-[#0050FF]/12 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[450px] bg-[#00D6FF]/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Floating Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        <span className="absolute top-1/4 right-20 text-cyan-300/40 text-xs">✦</span>
        <span className="absolute bottom-1/4 left-16 text-cyan-200/50 text-[10px]">·</span>
        <span className="absolute top-2/3 right-12 text-white/30 text-xs">✦</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top Control Bar matching reference image */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            
            {/* Left Presets */}
            <div>
              <div className="text-[11px] font-mono text-[#00D6FF] uppercase tracking-[0.25em] font-semibold mb-2.5">
                PRESET PROFILES
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                {Object.entries(presets).map(([key, p]) => {
                  const isActive = activePreset === key;
                  return (
                    <button
                      key={key}
                      onClick={() => handlePresetSelect(key)}
                      className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'bg-[#0050FF] text-white border border-cyan-400 shadow-[0_0_22px_rgba(0,102,255,0.85)] scale-105'
                          : 'bg-[#0B1020]/80 text-white/70 border border-white/10 hover:border-cyan-400/40 hover:text-white'
                      }`}
                    >
                      {p.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Reset Curve Button */}
            <button
              onClick={() => handlePresetSelect('reference')}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-mono font-medium text-cyan-200 bg-[#00D6FF]/10 border border-[#00D6FF]/60 shadow-[0_0_15px_rgba(0,214,255,0.25)] hover:shadow-[0_0_25px_rgba(0,214,255,0.5)] transition-all cursor-pointer self-start md:self-end"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Curve</span>
            </button>
          </div>

          {/* Active Preset Description Quote */}
          <p className="text-xs sm:text-sm text-white/80 italic font-sans pl-1">
            "{presets[activePreset]?.desc}"
          </p>
        </div>

        {/* Holographic 3D Wireframe Curve Display Console */}
        <div className="liquid-glass relative rounded-2xl p-4 sm:p-6 mb-8 shadow-2xl overflow-hidden">
          
          {/* High-tech tick marks and telemetry markers on sides */}
          <div className="absolute top-3 left-4 text-[9px] font-mono text-white/20 select-none">
            +12 dB ──
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 left-4 text-[9px] font-mono text-white/20 select-none">
            0 dB ──
          </div>
          <div className="absolute bottom-3 left-4 text-[9px] font-mono text-white/20 select-none">
            -12 dB ──
          </div>

          <div className="absolute top-3 right-4 text-[9px] font-mono text-white/20 select-none">
            ── 59.08
          </div>
          <div className="absolute bottom-3 right-4 text-[9px] font-mono text-white/20 select-none">
            ── 38.08
          </div>

          {/* Background Grid Lines inside oscilloscope */}
          <div className="absolute inset-0 grid grid-rows-4 grid-cols-6 opacity-10 pointer-events-none">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="border-r border-b border-cyan-400" />
            ))}
          </div>

          {/* The Holographic Curve with 3D Wireframe Mesh */}
          <div className="relative h-44 sm:h-52 w-full flex items-center justify-center">
            <svg viewBox="0 0 860 220" className="w-full h-full overflow-visible">
              <defs>
                {/* Glowing neon stroke gradient */}
                <linearGradient id="curveBeam" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00D6FF" />
                  <stop offset="50%" stopColor="#00E5FF" />
                  <stop offset="100%" stopColor="#00D6FF" />
                </linearGradient>

                {/* 3D Wireframe Mesh pattern */}
                <pattern id="wireframePattern" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0, 214, 255, 0.25)" strokeWidth="1" />
                </pattern>

                <linearGradient id="meshGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(0, 214, 255, 0.45)" />
                  <stop offset="100%" stopColor="rgba(0, 80, 255, 0.0)" />
                </linearGradient>
              </defs>

              {/* 3D Wireframe Mesh Columns hanging beneath the curve */}
              {nodePoints.map((pt, i) => {
                const nextPt = nodePoints[i + 1] || pt;
                return (
                  <g key={`wire-${i}`}>
                    {/* Vertical perspective guide wires */}
                    <line
                      x1={pt.x}
                      y1={pt.y}
                      x2={pt.x}
                      y2={180}
                      stroke="rgba(0, 214, 255, 0.4)"
                      strokeWidth="1.5"
                      strokeDasharray="2,2"
                    />
                  </g>
                );
              })}

              {/* 3D Mesh Area Fill under curve */}
              <path
                d={`${curvePath} L ${nodePoints[nodePoints.length - 1].x},180 L ${nodePoints[0].x},180 Z`}
                fill="url(#meshGradient)"
              />

              {/* Grid overlay lines under curve */}
              {Array.from({ length: 9 }).map((_, lineIdx) => {
                const yLevel = 80 + lineIdx * 12;
                return (
                  <line
                    key={lineIdx}
                    x1={70}
                    y1={yLevel}
                    x2={790}
                    y2={yLevel}
                    stroke="rgba(0, 214, 255, 0.12)"
                    strokeWidth="1"
                  />
                );
              })}

              {/* The Glowing Neon Curve Line */}
              <path
                d={curvePath}
                fill="none"
                stroke="url(#curveBeam)"
                strokeWidth="4"
                strokeLinecap="round"
                className="filter drop-shadow-[0_0_10px_#00D6FF]"
              />

              {/* Circular Glowing Nodes */}
              {nodePoints.map((pt, i) => (
                <g key={`node-${i}`}>
                  {/* Outer Pulsing Halo */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="10"
                    fill="rgba(0, 214, 255, 0.2)"
                    className="animate-ping"
                    style={{ animationDuration: '3s' }}
                  />
                  {/* Outer Rim */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="6.5"
                    fill="#040711"
                    stroke="#00D6FF"
                    strokeWidth="2.5"
                    className="filter drop-shadow-[0_0_6px_#00D6FF]"
                  />
                  {/* Glowing Core */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="3"
                    fill="#00E5FF"
                  />
                </g>
              ))}
            </svg>
          </div>

        </div>

        {/* 6 Futuristic Fader Modules (Sliders) matching reference image */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          
          {/* Sliders 1 to 5: 400Hz, 1kHz, 2.5kHz, 6.3kHz, 16kHz */}
          {frequencies.map((freq, idx) => (
            <div
              key={freq}
              className="liquid-glass rounded-3xl p-5 hover:border-cyan-400/40 shadow-xl flex flex-col items-center justify-between min-h-[260px] relative transition-all group"
            >
              {/* Notched side indentations */}
              <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-6 bg-[#040711] rounded-r-full border-r border-white/10" />
              <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-6 bg-[#040711] rounded-l-full border-l border-white/10" />

              {/* Value Header */}
              <div className="text-sm font-mono font-bold text-white tracking-tight pt-1">
                {bands[idx] > 0 ? `+${bands[idx]}` : bands[idx]} dB
              </div>

              {/* Vertical Fader Track */}
              <div className="relative h-32 flex items-center justify-center my-auto">
                <input
                  type="range"
                  min="-10"
                  max="10"
                  step="1"
                  value={bands[idx]}
                  onChange={(e) => handleBandChange(idx, e.target.value)}
                  className="w-28 -rotate-90 appearance-none bg-gradient-to-r from-cyan-500/20 via-cyan-400 to-cyan-500/20 h-1.5 rounded-full accent-[#00D6FF] cursor-pointer"
                />
              </div>

              {/* Frequency Label */}
              <div className="text-[11px] font-mono text-cyan-400/80 font-semibold tracking-wider pb-1">
                {freq}
              </div>
            </div>
          ))}

          {/* Module 6: CLEAR BASS™ (Active Engaged State matching screenshot) */}
          <div className="liquid-glass-active rounded-3xl p-5 shadow-[0_0_30px_rgba(0,102,255,0.7)] flex flex-col items-center justify-between min-h-[260px] relative scale-[1.02] transition-all">
            
            {/* Notched side indentations */}
            <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-6 bg-[#040711] rounded-r-full border-r border-cyan-400/50" />
            <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-6 bg-[#040711] rounded-l-full border-l border-cyan-400/50" />

            {/* Value Header */}
            <div className="text-sm font-mono font-bold text-cyan-200 tracking-tight pt-1">
              +{clearBass} BASS
            </div>

            {/* Vertical Fader Track */}
            <div className="relative h-32 flex items-center justify-center my-auto">
              <input
                type="range"
                min="0"
                max="10"
                step="1"
                value={clearBass}
                onChange={(e) => setClearBass(Number(e.target.value))}
                className="w-28 -rotate-90 appearance-none bg-gradient-to-r from-cyan-400 via-white to-cyan-400 h-2 rounded-full accent-[#00D6FF] cursor-pointer shadow-[0_0_12px_#00D6FF]"
              />
            </div>

            {/* CLEAR BASS Label with Sparkle */}
            <div className="text-[11px] font-mono text-cyan-300 font-bold tracking-wider pb-1 flex items-center gap-1.5">
              <span>CLEAR BASS™</span>
              <span className="text-white/40 text-xs">✦</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
