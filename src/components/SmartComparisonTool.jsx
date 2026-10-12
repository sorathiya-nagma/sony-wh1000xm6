import React, { useState } from 'react';
import { Check, X, Sparkles, Scale, Battery, Cpu, Radio, Zap, ArrowRight } from 'lucide-react';

export default function SmartComparisonTool({ onOpenPreOrder }) {
  const [selectedCompetitor, setSelectedCompetitor] = useState('airpods');
  const [activeCategory, setActiveCategory] = useState('all');

  const competitors = {
    airpods: {
      name: 'Apple AirPods Max',
      brand: 'Apple',
      price: '$549',
      image: '🎧',
      battery: 20,
      batteryLabel: '20 Hours',
      weight: 384,
      weightLabel: '384 grams',
      quickCharge: '5 min = 1.5 hours',
      mics: '8 microphones (Dual H1)',
      codecs: 'AAC, SBC (256 kbps max)',
      bluetooth: 'Bluetooth 5.0',
      driver: '40 mm Apple Dynamic Driver',
      ancRating: 'High (Single Tier)',
      advantagesOfXM6: [
        '+22 Hours Longer Battery Life with ANC',
        '138g Lighter (36% less clamping fatigue)',
        'True Hi-Res Audio (LDAC 990 kbps vs AAC 256 kbps)',
        'Fast charge 3.3x faster (3 min = 5 hours vs 5 min = 1.5h)',
        '3nm Dual Processors (QN2 + V2) with 12 microphones'
      ]
    },
    xm5: {
      name: 'Sony WH-1000XM5',
      brand: 'Sony (Previous Gen)',
      price: '$399',
      image: '🎧',
      battery: 30,
      batteryLabel: '30 Hours',
      weight: 250,
      weightLabel: '250 grams',
      quickCharge: '3 min = 3 hours',
      mics: '8 microphones (QN1 + V1)',
      codecs: 'LDAC, AAC, SBC',
      bluetooth: 'Bluetooth 5.2',
      driver: '30 mm Carbon Fiber',
      ancRating: 'Flagship Tier 1',
      advantagesOfXM6: [
        '+12 Hours Extended Playtime (42h vs 30h)',
        'New 40mm Bespoke Driver (33% larger soundstage)',
        'Next-Gen QN2 Silicon (700,000 anti-phase ops/sec)',
        '12 Mics vs 8 Mics (50% more spatial wind-cancellation)',
        'Bluetooth 5.4 with Auracast broadcast support'
      ]
    },
    bose: {
      name: 'Bose QC Ultra',
      brand: 'Bose',
      price: '$429',
      image: '🎧',
      battery: 24,
      batteryLabel: '24 Hours',
      weight: 252,
      weightLabel: '252 grams',
      quickCharge: '15 min = 2.5 hours',
      mics: '10 microphones',
      codecs: 'aptX Adaptive, AAC, SBC',
      bluetooth: 'Bluetooth 5.3',
      driver: '35 mm Bio-Cellulose',
      ancRating: 'Flagship Tier 1',
      advantagesOfXM6: [
        '+18 Hours Extended Battery Life',
        'Bit-perfect LDAC 990 kbps audiophile playback',
        'Sub-millisecond QN2 custom 3nm anti-phase engine',
        'Fastest charging in category (3 min = 5 hours)',
        'Bespoke 40mm carbon-composite diaphragms'
      ]
    },
    sennheiser: {
      name: 'Sennheiser Momentum 4',
      brand: 'Sennheiser',
      price: '$379',
      image: '🎧',
      battery: 60,
      batteryLabel: '60 Hours',
      weight: 293,
      weightLabel: '293 grams',
      quickCharge: '5 min = 4 hours',
      mics: '4 beamforming microphones',
      codecs: 'aptX Adaptive, AAC, SBC',
      bluetooth: 'Bluetooth 5.2',
      driver: '42 mm Transducer',
      ancRating: 'Moderate Adaptive',
      advantagesOfXM6: [
        'Industry-Leading QN2 ANC Isolation (-42 dB attenuation)',
        '12 Beamforming Mics vs 4 Mics (superior call & wind clarity)',
        '47g Lighter chassis (246g vs 293g)',
        '360 Reality Audio with dynamic head tracking',
        'Stepless silent magnesium folding hinge'
      ]
    }
  };

  const comp = competitors[selectedCompetitor];

  const categories = [
    { id: 'all', label: 'All Specifications' },
    { id: 'battery', label: 'Battery & Power' },
    { id: 'sound', label: 'Acoustics & Codecs' },
    { id: 'design', label: 'Weight & Ergonomics' },
  ];

  return (
    <section id="comparison" className="relative py-28 md:py-36 bg-[#040711] border-t border-cyan-500/10 overflow-hidden select-none">
      
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
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[500px] bg-[#0050FF]/15 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[450px] bg-[#00D6FF]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 mb-4 backdrop-blur-md">
            <Scale className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-200">
              SMART BENCHMARK MATRIX
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
            See how XM6 redefines the flagship standard.
          </h2>

          <p className="text-base sm:text-lg text-white/60 leading-relaxed">
            Compare verified technical specifications against the world's most recognized wireless headphones. Clear, unbiased engineering data.
          </p>
        </div>

        {/* Competitor Selector Bar */}
        <div className="flex flex-wrap items-center gap-3 mb-10 pb-6 border-b border-white/10">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider mr-2 hidden md:inline">
            COMPARE AGAINST:
          </span>
          {Object.entries(competitors).map(([key, item]) => {
            const isSelected = selectedCompetitor === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedCompetitor(key)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#0050FF] to-[#0066FF] text-white border border-cyan-400 shadow-[0_0_20px_rgba(0,102,255,0.7)] scale-105'
                    : 'bg-[#0B1020]/80 text-white/60 border border-white/10 hover:border-cyan-400/40 hover:text-white'
                }`}
              >
                <span>{item.name}</span>
                <span className="text-[10px] opacity-60">({item.price})</span>
              </button>
            );
          })}
        </div>

        {/* Two-Column Master Head-to-Head Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          
          {/* Left Column: SONY WH-1000XM6 (Hero Winner Deck - Liquid Glass Active) */}
          <div className="lg:col-span-6 rounded-3xl p-6 sm:p-8 md:p-10 liquid-glass-active shadow-[0_0_40px_rgba(0,102,255,0.65)] flex flex-col justify-between relative overflow-hidden">
            
            {/* Top Badge */}
            <div className="flex items-center justify-between mb-6">
              <span className="px-3.5 py-1 rounded-full bg-cyan-400/20 border border-cyan-400 text-cyan-200 text-xs font-mono font-bold uppercase tracking-wider shadow-[0_0_12px_rgba(0,214,255,0.4)]">
                FLAGSHIP BENCHMARK
              </span>
              <span className="text-sm font-mono font-bold text-white tracking-tight">$449 USD</span>
            </div>

            <div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
                Sony WH-1000XM6
              </h3>
              <p className="text-xs sm:text-sm text-cyan-200/80 mb-8 font-medium">
                Dual 3nm Silicon Architecture · 40mm Carbon Diaphragms · 246g
              </p>

              {/* Spec Bars */}
              <div className="space-y-5">
                {/* Battery Bar */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-white/70">BATTERY LIFE (ANC ON)</span>
                    <span className="text-cyan-300 font-bold">42 Hours</span>
                  </div>
                  <div className="w-full h-2.5 bg-black/50 rounded-full overflow-hidden p-0.5 border border-white/10">
                    <div className="h-full bg-gradient-to-r from-[#0050FF] to-cyan-400 rounded-full shadow-[0_0_10px_#00D6FF]" style={{ width: '85%' }} />
                  </div>
                </div>

                {/* Weight Bar (Lower is Better) */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-white/70">CHASSIS WEIGHT</span>
                    <span className="text-cyan-300 font-bold">246g (Ultra-Light)</span>
                  </div>
                  <div className="w-full h-2.5 bg-black/50 rounded-full overflow-hidden p-0.5 border border-white/10">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full shadow-[0_0_10px_#10B981]" style={{ width: '64%' }} />
                  </div>
                </div>

                {/* Quick Charging */}
                <div className="p-3.5 rounded-2xl bg-cyan-950/30 border border-cyan-400/30 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Zap className="w-4 h-4 text-cyan-300" />
                    <span className="text-xs font-medium text-white/90">Ultra-Fast Charge</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-cyan-300">3 min = 5 hours</span>
                </div>

                {/* Processing Silicon */}
                <div className="p-3.5 rounded-2xl bg-cyan-950/30 border border-cyan-400/30 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Cpu className="w-4 h-4 text-cyan-300" />
                    <span className="text-xs font-medium text-white/90">ANC Microphones & Chip</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-cyan-300">QN2 + V2 · 12 Mics</span>
                </div>

                {/* Codecs */}
                <div className="p-3.5 rounded-2xl bg-cyan-950/30 border border-cyan-400/30 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Radio className="w-4 h-4 text-cyan-300" />
                    <span className="text-xs font-medium text-white/90">Hi-Res Audio Codecs</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-cyan-300">LDAC (990 kbps)</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-8 mt-8 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-200">FIRST EDITION BATCH #01</span>
              <button
                onClick={onOpenPreOrder}
                className="btn-sony-primary px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2 cursor-pointer shadow-lg shadow-[#0050FF]/40"
              >
                <span>Experience XM6</span>
                <ArrowRight className="w-3.5 h-3.5 text-cyan-300" />
              </button>
            </div>
          </div>

          {/* Right Column: Selected Competitor Head-to-Head Card (Liquid Glass) */}
          <div className="lg:col-span-6 rounded-3xl p-6 sm:p-8 md:p-10 liquid-glass shadow-2xl flex flex-col justify-between">
            
            {/* Top Badge */}
            <div className="flex items-center justify-between mb-6">
              <span className="px-3.5 py-1 rounded-full bg-white/5 border border-white/15 text-white/60 text-xs font-mono uppercase tracking-wider">
                COMPETING FLAGSHIP
              </span>
              <span className="text-sm font-mono font-bold text-white/60 tracking-tight">{comp.price} USD</span>
            </div>

            <div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
                {comp.name}
              </h3>
              <p className="text-xs sm:text-sm text-white/40 mb-8 font-medium">
                {comp.driver} · {comp.weightLabel}
              </p>

              {/* Spec Bars */}
              <div className="space-y-5">
                {/* Battery Bar */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-white/50">BATTERY LIFE (ANC ON)</span>
                    <span className="text-white/80 font-bold">{comp.batteryLabel}</span>
                  </div>
                  <div className="w-full h-2.5 bg-black/50 rounded-full overflow-hidden p-0.5 border border-white/5">
                    <div 
                      className="h-full bg-white/30 rounded-full" 
                      style={{ width: `${Math.min(100, (comp.battery / 60) * 100)}%` }} 
                    />
                  </div>
                </div>

                {/* Weight Bar */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-white/50">CHASSIS WEIGHT</span>
                    <span className="text-white/80 font-bold">{comp.weightLabel}</span>
                  </div>
                  <div className="w-full h-2.5 bg-black/50 rounded-full overflow-hidden p-0.5 border border-white/5">
                    <div 
                      className="h-full bg-white/30 rounded-full" 
                      style={{ width: `${Math.min(100, (comp.weight / 400) * 100)}%` }} 
                    />
                  </div>
                </div>

                {/* Quick Charging */}
                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Zap className="w-4 h-4 text-white/40" />
                    <span className="text-xs font-medium text-white/60">Quick Charge Speed</span>
                  </div>
                  <span className="text-xs font-mono text-white/80">{comp.quickCharge}</span>
                </div>

                {/* Processing Silicon */}
                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Cpu className="w-4 h-4 text-white/40" />
                    <span className="text-xs font-medium text-white/60">ANC Architecture</span>
                  </div>
                  <span className="text-xs font-mono text-white/80">{comp.mics}</span>
                </div>

                {/* Codecs */}
                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Radio className="w-4 h-4 text-white/40" />
                    <span className="text-xs font-medium text-white/60">Audio Codecs</span>
                  </div>
                  <span className="text-xs font-mono text-white/80">{comp.codecs}</span>
                </div>
              </div>
            </div>

            {/* Delta Advantages Breakdown */}
            <div className="pt-6 mt-6 border-t border-white/10">
              <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-semibold mb-3">
                WHY WH-1000XM6 LEADS:
              </div>
              <ul className="space-y-2">
                {comp.advantagesOfXM6.map((adv, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-white/80">
                    <Check className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
