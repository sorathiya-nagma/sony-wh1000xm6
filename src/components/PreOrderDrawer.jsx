import React, { useState } from 'react';
import { X, Check, ShieldCheck, Truck, RefreshCw, Sparkles, ChevronRight, ArrowRight } from 'lucide-react';

export default function PreOrderDrawer({ isOpen, onClose }) {
  const [selectedColor, setSelectedColor] = useState('black');
  const [engravingText, setEngravingText] = useState('');
  const [isOrdered, setIsOrdered] = useState(false);

  if (!isOpen) return null;

  const colors = [
    { id: 'black', name: 'Obsidian Matte Black', hex: '#111113', border: 'border-white/20' },
    { id: 'silver', name: 'Platinum Silver', hex: '#D1D5DB', border: 'border-white/40' },
    { id: 'navy', name: 'Midnight Navy', hex: '#101B2E', border: 'border-sony-blue/50' },
  ];

  const handleOrder = (e) => {
    e.preventDefault();
    setIsOrdered(true);
    setTimeout(() => {
      // Keep confirmation visible
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
      
      {/* Modal Surface */}
      <div 
        className="liquid-glass relative w-full max-w-2xl rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="liquid-glass-pill absolute top-6 right-6 p-2 rounded-full text-white/60 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isOrdered ? (
          <div>
            {/* Modal Header */}
            <div className="mb-8">
              <span className="text-xs font-mono text-sony-cyan tracking-widest uppercase block mb-1">
                LIMITED FIRST EDITION
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Experience Sony WH-1000XM6
              </h3>
              <p className="text-sm text-white/50 mt-1">
                Ships worldwide with complimentary express air freight.
              </p>
            </div>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 pb-6 mb-6 border-b border-white/10">
              <span className="text-4xl font-extrabold text-white font-mono tracking-tight">$449</span>
              <span className="text-sm text-white/40 font-mono">USD / MSRP</span>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30 ml-auto">
                IN STOCK // FIRST WAVE
              </span>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <label className="text-xs font-mono text-white/60 uppercase tracking-wider block mb-3">
                FINISH: <strong className="text-white">{colors.find(c => c.id === selectedColor)?.name}</strong>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {colors.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedColor(c.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col gap-2 ${
                      selectedColor === c.id
                        ? 'liquid-glass-active !border-cyan-400'
                        : 'liquid-glass hover:border-white/30'
                    }`}
                  >
                    <div 
                      className={`w-6 h-6 rounded-full border ${c.border}`}
                      style={{ backgroundColor: c.hex }}
                    />
                    <span className="text-xs font-medium text-white/90">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Laser Engraving */}
            <div className="mb-8">
              <label className="text-xs font-mono text-white/60 uppercase tracking-wider block mb-2">
                COMPLIMENTARY LASER ENGRAVING (OPTIONAL)
              </label>
              <input
                type="text"
                maxLength={18}
                value={engravingText}
                onChange={(e) => setEngravingText(e.target.value)}
                placeholder="E.g. STUDIO ONE or YOUR NAME"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-sony-cyan font-mono"
              />
              <span className="text-[11px] font-mono text-white/30 mt-1 block">
                Precision laser-etched onto the left magnesium hinge (Max 18 characters).
              </span>
            </div>

            {/* Included in Box */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 mb-8">
              <div className="text-[11px] font-mono text-sony-cyan tracking-wider uppercase mb-2">
                WHAT'S IN THE BOX
              </div>
              <ul className="grid grid-cols-2 gap-2 text-xs text-white/70">
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-sony-cyan shrink-0" />
                  <span>Magnetic Hard Case</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-sony-cyan shrink-0" />
                  <span>1.2m OFC 3.5mm Cable</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-sony-cyan shrink-0" />
                  <span>Airplane Audio Adapter</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-sony-cyan shrink-0" />
                  <span>USB-C Fast Charge Cable</span>
                </li>
              </ul>
            </div>

            {/* Guarantees */}
            <div className="flex items-center justify-between text-xs font-mono text-white/40 mb-8 border-t border-white/5 pt-4">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-sony-cyan" />
                <span>Free 2-Day Air</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RefreshCw className="w-4 h-4 text-sony-cyan" />
                <span>30-Day Risk-Free Trial</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-sony-cyan" />
                <span>2-Year Sony Warranty</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleOrder}
              className="btn-sony-primary w-full py-4 rounded-2xl text-base font-bold text-white flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-sony-blue/40"
            >
              <span>Reserve WH-1000XM6</span>
              <ArrowRight className="w-4 h-4 text-sony-cyan" />
            </button>
          </div>
        ) : (
          /* Confirmation State */
          <div className="py-12 text-center animate-in zoom-in-95 duration-400">
            <div className="w-16 h-16 rounded-full bg-sony-blue/20 border border-sony-cyan text-sony-cyan flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              Reservation Confirmed.
            </h3>

            <p className="text-sm text-white/70 max-w-md mx-auto mb-6 leading-relaxed">
              Welcome to the next era of personal acoustic silence. Your custom WH-1000XM6 in <strong className="text-white">{colors.find(c => c.id === selectedColor)?.name}</strong> has been allocated from production batch #01.
            </p>

            {engravingText && (
              <div className="inline-block p-3 rounded-xl bg-white/5 border border-white/10 font-mono text-xs text-sony-cyan mb-8">
                ENGRAVING: "{engravingText.toUpperCase()}"
              </div>
            )}

            <button
              onClick={() => {
                setIsOrdered(false);
                onClose();
              }}
              className="btn-sony-primary px-8 py-3 rounded-full text-sm font-semibold text-white"
            >
              Return to Experience
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
