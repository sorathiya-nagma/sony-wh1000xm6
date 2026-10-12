import React, { useState } from 'react';
import { Compass, Sparkles, Layers, CheckCircle2, RotateCw, Volume2 } from 'lucide-react';

export default function SpatialColorwayStudio() {
  const [selectedFinish, setSelectedFinish] = useState('black');
  const [activeAngle, setActiveAngle] = useState(0); // 0 to 360 degrees
  const [activeView, setActiveView] = useState('hero'); // 'hero', 'exploded', 'reassembled'

  const finishes = [
    {
      id: 'black',
      name: 'Obsidian Matte Black',
      subtitle: 'Stealth PVD Finish with 24K Gold Sony Emblem',
      accentColor: '#00D6FF',
      chipColor: '#101014',
      borderClass: 'border-cyan-500/50',
      description: 'Micro-etched matte coating resists fingerprint smudges and specular glare. Deep velvet texture with low light reflectivity.',
    },
    {
      id: 'silver',
      name: 'Platinum Silver',
      subtitle: 'Titanium Anodized Aluminum Accents',
      accentColor: '#E5E7EB',
      chipColor: '#D1D5DB',
      borderClass: 'border-white/50',
      description: 'Bright satin finish treated with ceramic micro-bead blasting. Paired with soft mist-grey synthetic protein leather pads.',
    },
    {
      id: 'navy',
      name: 'Midnight Navy',
      subtitle: 'Subtle Indigo Hue Inspired by Tokyo at Dusk',
      accentColor: '#3B82F6',
      chipColor: '#172554',
      borderClass: 'border-blue-500/50',
      description: 'Deep iridescent blue pigment that subtly shifts hue under direct sunlight, paired with obsidian black hardware.',
    }
  ];

  const views = [
    { id: 'hero', label: 'Beauty Silhouette', src: '/images/hero.png' },
    { id: 'exploded', label: 'Exploded Teardown', src: '/images/exploded.png' },
    { id: 'reassembled', label: 'Gold Engraved Hinge', src: '/images/reassembled.png' },
  ];

  return (
    <section className="relative py-28 md:py-36 bg-void border-t border-white/[0.06] overflow-hidden">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-sony-blue/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-4 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-sony-cyan" />
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/70">
              MATERIALS & BESPOKE FINISHES
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gradient-apple mb-6 leading-tight">
            Designed for touch. Built to endure.
          </h2>

          <p className="text-base sm:text-lg text-white/60 leading-relaxed">
            Crafted from aerospace magnesium alloy and sustainable bio-based polymers. Every curve is sculpted to fit the natural contours of the human skull.
          </p>
        </div>

        {/* Gallery Showcase Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* Main Master Render Display */}
          <div className="lg:col-span-8">
            <div className="glass-card rounded-3xl p-4 md:p-8 border border-white/10 bg-[#09090D] shadow-2xl relative overflow-hidden group">
              <div className="relative aspect-[16/9] w-full flex items-center justify-center overflow-hidden rounded-2xl bg-void">
                <img
                  src={views.find(v => v.id === activeView)?.src}
                  alt="Sony WH-1000XM6 View"
                  className="w-full h-full object-contain filter drop-shadow-[0_20px_60px_rgba(0,80,255,0.2)] transition-all duration-700 group-hover:scale-[1.02]"
                />

                {/* View Switcher Floating Pills */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
                  <div className="flex gap-2 bg-black/60 backdrop-blur-md p-1.5 rounded-2xl border border-white/10">
                    {views.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setActiveView(v.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                          activeView === v.id
                            ? 'bg-white/20 text-white shadow-sm'
                            : 'text-white/50 hover:text-white'
                        }`}
                      >
                        {v.label}
                      </button>
                    ))}
                  </div>

                  <span className="hidden sm:inline-flex px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono text-sony-cyan">
                    NANO-MATTE // 0.05% GLOSS
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Colorway Options & Material Specs */}
          <div className="lg:col-span-4 space-y-4">
            {finishes.map((f) => {
              const isSelected = selectedFinish === f.id;
              return (
                <div
                  key={f.id}
                  onClick={() => setSelectedFinish(f.id)}
                  className={`p-6 rounded-3xl cursor-pointer transition-all duration-300 border ${
                    isSelected
                      ? 'bg-sony-blue/15 border-sony-cyan/50 shadow-xl shadow-sony-blue/15 scale-[1.02]'
                      : 'bg-white/[0.02] border-white/5 hover:border-white/15 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-5 h-5 rounded-full border border-white/20 shadow-inner"
                        style={{ backgroundColor: f.chipColor }}
                      />
                      <h4 className="text-base font-bold text-white tracking-tight">
                        {f.name}
                      </h4>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-sony-cyan" />
                    )}
                  </div>

                  <div className="text-xs font-mono text-sony-cyan/80 mb-2">
                    {f.subtitle}
                  </div>

                  <p className="text-xs text-white/60 leading-relaxed">
                    {f.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
