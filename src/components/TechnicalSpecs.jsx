import React from 'react';
import { BatteryCharging, Cpu, Radio, Shield, Sparkles, Volume2, Award, Zap } from 'lucide-react';

export default function TechnicalSpecs() {
  const specCategories = [
    {
      title: 'Acoustic Architecture',
      icon: Volume2,
      specs: [
        { label: 'Driver Unit', val: '40 mm bespoke carbon-fiber composite dome with TPU edge' },
        { label: 'Frequency Response', val: '4 Hz – 40,000 Hz (JEITA Standard)' },
        { label: 'Impedance', val: '48 Ω (1 kHz, when powered ON) / 16 Ω (powered OFF)' },
        { label: 'Total Harmonic Distortion', val: '< 0.05% at 1 kHz (94 dB SPL)' },
        { label: 'Sound Optimization', val: 'DSEE Ultimate™ with real-time Edge-AI harmonic prediction' },
        { label: 'Spatial Audio', val: '360 Reality Audio Certified with Head Tracking' }
      ]
    },
    {
      title: 'Noise Cancelling & DSP',
      icon: Shield,
      specs: [
        { label: 'Processors', val: 'Dual Silicon: HD Processor QN2 + Integrated Processor V2' },
        { label: 'Microphone Cluster', val: '12 Beamforming Transducers (6 per ear cup)' },
        { label: 'Anti-Noise Calculation', val: '700,000 algorithmic cycles per second' },
        { label: 'Atmospheric Optimization', val: 'Built-in barometric pressure sensor for high-altitude cabins' },
        { label: 'Transparency Mode', val: '20-level Ambient Sound Control with Voice Accentuation' }
      ]
    },
    {
      title: 'Connectivity & Codecs',
      icon: Radio,
      specs: [
        { label: 'Bluetooth Version', val: 'Bluetooth® 5.4 Class 1 (Up to 15m range)' },
        { label: 'Supported Codecs', val: 'LDAC (990 kbps), LC3, AAC, SBC' },
        { label: 'Multipoint Connection', val: 'Simultaneous pairing with up to 3 host devices' },
        { label: 'Broadcast Audio', val: 'Auracast™ Broadcast receiver ready' },
        { label: 'Wired Connection', val: '3.5 mm gold-plated stereo mini jack (1.2m OFC cable included)' }
      ]
    },
    {
      title: 'Battery & Power',
      icon: BatteryCharging,
      specs: [
        { label: 'Battery Life (ANC ON)', val: 'Up to 42 hours continuous audio playback' },
        { label: 'Battery Life (ANC OFF)', val: 'Up to 60 hours continuous audio playback' },
        { label: 'Ultra-Fast Charging', val: '3-minute charge delivers 5 hours of playback' },
        { label: 'Full Charge Time', val: 'Approx. 2.5 hours via USB-C Power Delivery' },
        { label: 'Charge Port', val: 'USB Type-C® with pass-through digital audio support' }
      ]
    },
    {
      title: 'Design & Ergonomics',
      icon: Sparkles,
      specs: [
        { label: 'Chassis Weight', val: '246 grams (Ultra-lightweight magnesium alloy core)' },
        { label: 'Earpad Material', val: 'Soft-fit pressure-relieving synthetic protein leatherette' },
        { label: 'Hinge Mechanism', val: 'Silent stepless magnesium swivel with 90° flat fold' },
        { label: 'Finish', val: 'Anti-fingerprint nano-matte coating in Obsidian Black' },
        { label: 'Environmental Pledge', val: '100% plastic-free packaging, recycled ocean plastics in housing' }
      ]
    }
  ];

  return (
    <section id="specs" className="relative py-28 md:py-36 bg-void border-t border-white/[0.06] overflow-hidden">
      
      {/* Background Soft Blue Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-sony-blue/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-4 backdrop-blur-md">
            <Cpu className="w-3.5 h-3.5 text-sony-cyan" />
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/70">
              TECHNICAL SPECIFICATIONS
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gradient-apple mb-6 leading-tight">
            Flagship standards. No compromises.
          </h2>

          <p className="text-base sm:text-lg text-white/60 leading-relaxed">
            Every specification represents an uncompromising pursuit of perfection. Built for critical audiophiles, world travelers, and discerning creators.
          </p>
        </div>

        {/* Specs Table Matrix */}
        <div className="space-y-12">
          {specCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div 
                key={cat.title} 
                className="liquid-glass rounded-3xl p-6 md:p-10 shadow-xl"
              >
                <div className="flex items-center gap-3 pb-6 mb-6 border-b border-white/10">
                  <div className="p-2.5 rounded-xl bg-sony-blue/20 text-sony-cyan border border-sony-cyan/30">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                    {cat.title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
                  {cat.specs.map((spec, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-4 border-b border-white/[0.04]">
                      <span className="text-xs font-mono text-white/40 uppercase tracking-wider shrink-0 sm:w-48">
                        {spec.label}
                      </span>
                      <span className="text-sm font-medium text-white/90 sm:text-right">
                        {spec.val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
