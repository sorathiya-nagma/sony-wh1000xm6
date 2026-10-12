import React, { useState } from 'react';
import { Layers, Cpu, Mic2, Compass, Check } from 'lucide-react';

export default function EngineeringDeepDive() {
  const [activeComponent, setActiveComponent] = useState(0);

  const components = [
    {
      id: 'driver',
      name: '40mm Bespoke Carbon-Fiber Diaphragm',
      tag: 'TRANSDUCER ACOUSTICS',
      modNum: '01',
      icon: Layers,
      iconType: 'carbon',
      highlight: 'Ultra-light carbon fiber composite dome coupled with a soft TPU edge.',
      description: 'Delivers instantaneous transient response from 4Hz deep sub-bass to 40,000Hz ultra-high extension with virtually zero harmonic distortion. Voiced by mastering engineers at Sony Music Studios Tokyo.',
      specs: [
        { num: '01', label: 'Frequency Range', val: '4 Hz - 40,000 Hz' },
        { num: '02', label: 'Magnet Type', val: 'Neodymium N52 Dual-Ring', highlight: true },
        { num: '03', label: 'Voice Coil', val: 'OFC Copper-Clad Aluminum' },
        { num: '04', label: 'Impedance', val: '48 Ω (Passive) / 16 Ω (Active)' }
      ]
    },
    {
      id: 'processor',
      name: 'Dual Processor Architecture (QN2 + V2)',
      tag: 'SILICON & DSP',
      modNum: '02',
      icon: Cpu,
      iconType: 'chip',
      highlight: 'Dedicated silicon engineered specifically for high-speed acoustic inversion.',
      description: 'The QN2 HD Processor handles algorithmic noise reduction at 700,000 instructions per second, while the integrated V2 processor oversees Bluetooth 5.4 LE audio decoding, 32-bit DAC conversion, and real-time DSEE Ultimate upscaling.',
      specs: [
        { num: '01', label: 'Silicon Node', val: 'Custom 3nm Architecture' },
        { num: '02', label: 'Clock Speed', val: 'Quad-Core Low-Power DSP', highlight: true },
        { num: '03', label: 'Noise Reduction Rate', val: 'Sub-millisecond Anti-Phase' },
        { num: '04', label: 'DAC Resolution', val: '32-bit / 192 kHz Floating Point' }
      ]
    },
    {
      id: 'mics',
      name: '12-Microphone Beamforming Matrix',
      tag: 'SPATIAL TELEMETRY',
      modNum: '03',
      icon: Mic2,
      iconType: 'mic',
      highlight: '6 microphones per ear cup for absolute hemispheric acoustic tracking.',
      description: 'Multi-point feedforward and feedback sensors map external wind and rumble while simultaneously monitoring inside the acoustic chamber to eliminate residual resonances before they reach the ear canal.',
      specs: [
        { num: '01', label: 'Total Microphones', val: '12 Beamforming Transducers' },
        { num: '02', label: 'Wind Noise Filter', val: 'Hydrodynamic Mesh Cavity', highlight: true },
        { num: '03', label: 'Voice Isolation', val: 'AI Deep Neural Network (DNN)' },
        { num: '04', label: 'Spatial Tracking', val: '360° Real-Time Binaural' }
      ]
    },
    {
      id: 'cushions',
      name: 'Pressure-Relieving Soft-Fit Leatherette',
      tag: 'ERGONOMICS & SEAL',
      modNum: '04',
      icon: Compass,
      iconType: 'cushion',
      highlight: 'Zero-clamping fatigue with engineered passive acoustic seal.',
      description: 'Specially synthesized polyurethane memory foam conforms perfectly to the temple and jawline. Spreads clamping pressure evenly across 30% more surface area, guaranteeing fatigue-free listening on 14-hour transpacific flights.',
      specs: [
        { num: '01', label: 'Contact Surface', val: '+30% Area Distribution' },
        { num: '02', label: 'Material', val: 'Sustainable Synthetic Protein Leather', highlight: true },
        { num: '03', label: 'Passive Attenuation', val: '-18 dB Isolation Seal' },
        { num: '04', label: 'Weight Balance', val: '50/50 Crown Distribution' }
      ]
    }
  ];

  const currentComp = components[activeComponent];

  return (
    <section id="engineering" className="relative py-28 md:py-36 bg-[#040711] border-t border-cyan-500/10 overflow-hidden select-none">
      
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

      {/* Ambient Lighting: Warm Amber on Left, Electric Blue on Right */}
      <div className="absolute top-1/3 left-0 w-[550px] h-[550px] bg-amber-500/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-[#0050FF]/15 rounded-full blur-[180px] pointer-events-none" />

      {/* Floating Star Dust Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <span className="absolute bottom-1/4 left-10 text-amber-400/40 text-xs">✦</span>
        <span className="absolute top-1/4 left-24 text-amber-200/50 text-[10px]">·</span>
        <span className="absolute top-1/2 right-20 text-cyan-300/40 text-xs">✦</span>
        <span className="absolute bottom-1/3 right-12 text-white/30 text-[8px]">·</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Master Exploded Render Showcase Deck */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#09090D] mb-16 group shadow-2xl">
          <div className="relative aspect-[16/9] w-full max-h-[580px] flex items-center justify-center overflow-hidden bg-void">
            <img 
              src="/images/exploded.png" 
              alt="Sony WH-1000XM6 Exploded Engineering Diagram"
              className="w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(0,80,255,0.15)] transition-transform duration-700 group-hover:scale-[1.02]"
            />
            {/* Top Badge: HIGH-RESOLUTION PHOTOGRAMMETRIC RENDER */}
            <div className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[11px] font-mono text-white/90">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>HIGH-RESOLUTION PHOTOGRAMMETRIC RENDER // 8K RESOLUTION</span>
            </div>
          </div>
        </div>

        {/* The Two-Column Dossier Terminal Grid matching screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: 4 Module Selector Cards */}
          <div className="lg:col-span-5 space-y-4">
            {components.map((comp, idx) => {
              const isActive = activeComponent === idx;
              const Icon = comp.icon;

              return (
                <div
                  key={comp.id}
                  onClick={() => setActiveComponent(idx)}
                  className={`rounded-3xl p-5 md:p-6 cursor-pointer transition-all duration-300 relative overflow-hidden flex items-center gap-4 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#0050FF] via-[#0040D0] to-[#002B99] border-2 border-cyan-400 shadow-[0_0_30px_rgba(0,102,255,0.7),_inset_0_1px_2px_rgba(255,255,255,0.4)] scale-[1.02]'
                      : 'bg-[#0B1020]/75 border border-white/10 hover:border-cyan-400/50 hover:bg-[#0F162B] shadow-[0_10px_25px_rgba(0,0,0,0.6)]'
                  }`}
                >
                  {/* Left Icon Graphic Container */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border transition-all ${
                    isActive
                      ? 'bg-cyan-950/40 border-cyan-300 shadow-[0_0_15px_rgba(0,214,255,0.7)] text-cyan-200'
                      : 'bg-white/5 border-white/10 text-white/60'
                  }`}>
                    {comp.iconType === 'carbon' && (
                      <div className="relative w-8 h-8 flex items-center justify-center">
                        <Layers className="w-6 h-6 stroke-[2]" />
                        <span className="absolute inset-0 bg-cyan-400/20 blur-sm rounded-full"></span>
                      </div>
                    )}
                    {comp.iconType === 'chip' && (
                      <div className="relative w-8 h-8 flex items-center justify-center">
                        <Cpu className="w-6 h-6 stroke-[2]" />
                      </div>
                    )}
                    {comp.iconType === 'mic' && (
                      <div className="relative w-8 h-8 flex items-center justify-center">
                        <Mic2 className="w-6 h-6 stroke-[2]" />
                      </div>
                    )}
                    {comp.iconType === 'cushion' && (
                      <div className="relative w-8 h-8 flex items-center justify-center">
                        <Compass className="w-6 h-6 stroke-[2]" />
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[10px] font-mono tracking-wider uppercase font-semibold ${
                        isActive ? 'text-cyan-200' : 'text-cyan-400'
                      }`}>
                        {comp.tag}
                      </span>
                      <span className="text-[10px] font-mono text-white/40">
                        MOD {comp.modNum}
                      </span>
                    </div>
                    <h4 className="text-sm md:text-base font-bold text-white tracking-tight leading-snug truncate">
                      {comp.name}
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Futuristic Sci-Fi Dossier Terminal */}
          <div className="lg:col-span-7">
            <div className="relative rounded-[28px] p-6 sm:p-8 md:p-10 bg-[#070C18]/90 border-2 border-cyan-400 shadow-[0_0_35px_rgba(0,214,255,0.25),_inset_0_1px_2px_rgba(255,255,255,0.2)] backdrop-blur-2xl">
              
              {/* Terminal Corner Tech Tick Marks */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-300 rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-300 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-300 rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-300 rounded-br-lg" />

              {/* Header Row: Label, Title & Glowing Checkmark Badge */}
              <div className="flex items-start justify-between gap-4 pb-6 mb-6 border-b border-white/10">
                <div>
                  <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest font-semibold mb-1">
                    ENGINEERING SPECIFICATION DOSSIER
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                    {currentComp.name}
                  </h3>
                </div>

                {/* Glowing Neon Circular Checkmark */}
                <div className="w-11 h-11 rounded-full border-2 border-cyan-400 bg-cyan-950/50 shadow-[0_0_20px_rgba(0,214,255,0.7)] flex items-center justify-center text-cyan-300 shrink-0">
                  <Check className="w-6 h-6 stroke-[2.5]" />
                </div>
              </div>

              {/* Highlight Quote Box with Bracket Borders */}
              <div className="relative rounded-2xl p-5 mb-6 bg-cyan-950/20 border border-cyan-400/40 shadow-[0_0_20px_rgba(0,214,255,0.12)]">
                <span className="absolute top-2 left-2 text-cyan-400/40 font-mono text-xs select-none">┌</span>
                <span className="absolute bottom-2 right-2 text-cyan-400/40 font-mono text-xs select-none">┘</span>
                <p className="text-sm md:text-base font-medium text-cyan-100 leading-relaxed italic">
                  "{currentComp.highlight}"
                </p>
              </div>

              {/* Description Paragraph */}
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-8">
                {currentComp.description}
              </p>

              {/* 4 Technical Spec Cards (2x2 Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentComp.specs.map((spec) => (
                  <div
                    key={spec.num}
                    className={`rounded-2xl p-4 relative transition-all duration-300 ${
                      spec.highlight
                        ? 'bg-[#0B1020]/90 border border-amber-400/60 shadow-[0_0_20px_rgba(245,158,11,0.25)]'
                        : 'bg-[#0B1020]/80 border border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
                        {spec.label}
                      </span>
                      <span className="text-[10px] font-mono text-white/40 font-bold">
                        {spec.num}
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white font-mono tracking-tight flex items-center justify-between">
                      <span>{spec.val}</span>
                      {spec.num === '04' && (
                        <span className="text-white/40 text-xs select-none">✦</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
