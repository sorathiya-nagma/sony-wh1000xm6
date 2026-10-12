import React from 'react';
import { ArrowUp, Globe } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#05070E] text-white/60 border-t border-cyan-500/10 pt-20 pb-16 text-xs font-sans overflow-hidden select-none">
      
      {/* Ambient Lighting matching screenshot */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#0050FF]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[450px] bg-amber-500/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-[600px] h-[300px] bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top Footnote Section with Cyan Numbers matching screenshot */}
        <div className="space-y-3 pb-14 mb-14 border-b border-white/[0.08] text-[11px] sm:text-xs leading-relaxed text-white/50">
          <p className="flex items-start gap-2.5">
            <span className="font-bold text-[#00D6FF] shrink-0 font-mono">1.</span>
            <span>As of October 2026. Measured using JEITA-compliant guidelines in headband style wireless noise cancelling headphones market.</span>
          </p>
          <p className="flex items-start gap-2.5">
            <span className="font-bold text-[#00D6FF] shrink-0 font-mono">2.</span>
            <span>High-Resolution Audio requires compatible playback source supporting LDAC™ at 990 kbps. DSEE Ultimate™ upscaling operates continuously during playback of compressed formats.</span>
          </p>
          <p className="flex items-start gap-2.5">
            <span className="font-bold text-[#00D6FF] shrink-0 font-mono">3.</span>
            <span>Battery performance measured with continuous Bluetooth audio playback, AAC codec, and Active Noise Cancellation engaged. 3-minute charging requires USB-PD 30W+ charger (sold separately).</span>
          </p>
        </div>

        {/* 5 Navigation Columns matching screenshot */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
          
          {/* Column 1: PRODUCT */}
          <div className="space-y-3.5">
            <div className="font-black text-white text-xs tracking-wider uppercase font-sans">
              PRODUCT
            </div>
            <ul className="space-y-2.5 text-xs text-white/60">
              <li><a href="#hero" className="hover:text-white transition-colors">Overview</a></li>
              <li><a href="#engineering" className="hover:text-white transition-colors">Engineering & Teardown</a></li>
              <li><a href="#anc-demo" className="hover:text-white transition-colors">Noise Cancelling Lab</a></li>
              <li><a href="#acoustics" className="hover:text-white transition-colors">Acoustic EQ Studio</a></li>
              <li><a href="#specs" className="hover:text-white transition-colors">Technical Specifications</a></li>
            </ul>
          </div>

          {/* Column 2: TECHNOLOGY */}
          <div className="space-y-3.5">
            <div className="font-black text-white text-xs tracking-wider uppercase font-sans">
              TECHNOLOGY
            </div>
            <ul className="space-y-2.5 text-xs text-white/60">
              <li><span className="hover:text-white transition-colors cursor-pointer">HD Processor QN2</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Integrated Processor V2</span></li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00D6FF] shrink-0"></span>
                <span className="hover:text-white transition-colors cursor-pointer">360 Reality Audio</span>
              </li>
              <li><span className="hover:text-white transition-colors cursor-pointer">DSEE Ultimate AI Engine</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">LDAC Hi-Res Audio</span></li>
            </ul>
          </div>

          {/* Column 3: HERITAGE */}
          <div className="space-y-3.5">
            <div className="font-black text-white text-xs tracking-wider uppercase font-sans">
              HERITAGE
            </div>
            <ul className="space-y-2.5 text-xs text-white/60">
              <li><span className="hover:text-white transition-colors cursor-pointer">Sony Music Studios Tokyo</span></li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00D6FF] shrink-0"></span>
                <span className="hover:text-white transition-colors cursor-pointer">Acoustic Engineering History</span>
              </li>
              <li><span className="hover:text-white transition-colors cursor-pointer">MDR-R10 Legacy</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Sound Master Interviews</span></li>
            </ul>
          </div>

          {/* Column 4: SUSTAINABILITY */}
          <div className="space-y-3.5">
            <div className="font-black text-white text-xs tracking-wider uppercase font-sans">
              SUSTAINABILITY
            </div>
            <ul className="space-y-2.5 text-xs text-white/60">
              <li><span className="hover:text-white transition-colors cursor-pointer">Road to Zero 2030</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">100% Recycled Packaging</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Recovered Ocean Plastics</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Energy Star Certified</span></li>
            </ul>
          </div>

          {/* Column 5: GLOBAL PRESENCE & BACK TO TOP */}
          <div className="col-span-2 lg:col-span-1 space-y-4">
            <div className="font-black text-white text-xs tracking-wider uppercase font-sans mb-3">
              GLOBAL PRESENCE
            </div>

            {/* Language/Country Pill Capsule */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#0E1528]/80 border border-cyan-400/50 shadow-[0_0_16px_rgba(0,214,255,0.2)] text-white text-xs font-medium cursor-pointer hover:border-cyan-300 transition-all">
              <Globe className="w-4 h-4 text-[#00D6FF]" />
              <span>United States (English)</span>
            </div>

            {/* Glowing Back to Top Capsule Button matching screenshot */}
            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="w-full sm:w-auto px-7 py-3 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#0038A8]/60 via-[#002060]/70 to-[#040814]/90 border-2 border-cyan-400 shadow-[0_0_25px_rgba(0,102,255,0.7),_inset_0_1px_2px_rgba(255,255,255,0.3)] hover:shadow-[0_0_35px_rgba(0,214,255,0.9)] hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <ArrowUp className="w-4 h-4 text-[#00D6FF]" />
                <span>Back to Top</span>
              </button>
            </div>
          </div>

        </div>

        {/* Horizontal Divider Bar with Diamond Sparkle at Right */}
        <div className="relative border-t border-white/[0.08] my-8 flex items-center justify-end">
          <span className="absolute -top-3.5 right-4 text-white/40 text-2xl select-none">✦</span>
        </div>

        {/* Bottom Copyright & Sony Logo Row matching screenshot */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-2">
          
          {/* Left: Classic SONY Wordmark + Copyright */}
          <div className="flex items-center gap-4 select-none">
            <span className="font-serif font-black text-lg md:text-xl tracking-[0.2em] uppercase text-white">
              SONY
            </span>
            <span className="text-white/20 font-mono">|</span>
            <span className="text-[11px] text-white/50 font-sans">
              © 2026 Sony Electronics Inc. All rights reserved.
            </span>
          </div>

          {/* Right: Legal Links */}
          <div className="flex flex-wrap items-center gap-6 text-[11px] text-white/50">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Use</span>
            <span className="hover:text-white transition-colors cursor-pointer">Sales & Refunds</span>
            <span className="hover:text-white transition-colors cursor-pointer">Legal Notice</span>
          </div>

        </div>

      </div>
    </footer>
  );
}
