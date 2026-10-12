import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar({ onOpenPreOrder }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Overview', id: 'hero' },
    { name: 'Engineering', id: 'engineering' },
    { name: 'Noise Cancelling', id: 'anc-demo' },
    { name: 'Acoustics', id: 'acoustics' },
    { name: 'Specs', id: 'specs' },
  ];

  const handleLinkClick = (name, id) => {
    setActiveTab(name);
    setMobileMenuOpen(false);
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out py-5 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: Classic SONY · WH-1000XM6 */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <span className="font-serif font-black text-lg md:text-xl tracking-[0.18em] uppercase text-white/95 group-hover:text-white transition-colors">
            SONY
          </span>
          <span className="text-white/40 font-mono text-sm">·</span>
          <span className="font-sans font-medium text-xs md:text-sm tracking-tight text-white/70 group-hover:text-white transition-colors">
            WH-1000XM6
          </span>
        </div>

        {/* Center: Frosted Capsule Pill Navigation */}
        <nav className="hidden md:flex items-center bg-white/[0.08] backdrop-blur-2xl border border-white/10 rounded-full p-1 shadow-2xl shadow-black/60">
          {navLinks.map((link) => {
            const isActive = activeTab === link.name;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.name, link.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-normal transition-all duration-300 ${
                  isActive
                    ? 'bg-white/20 text-white shadow-inner font-semibold'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {link.name}
              </button>
            );
          })}
        </nav>

        {/* Right: Glowing Electric Blue Capsule Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenPreOrder}
            className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase text-white cursor-pointer transition-all duration-300 bg-gradient-to-r from-[#0050FF] via-[#0066FF] to-[#0050FF] border border-cyan-400/50 shadow-[0_0_22px_rgba(0,102,255,0.7)] hover:shadow-[0_0_32px_rgba(0,214,255,0.9)] hover:scale-105 active:scale-95"
          >
            <span>EXPERIENCE XM6</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-cyan-200" />
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-nav border border-white/10 rounded-3xl p-6 mt-4 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300 shadow-2xl bg-black/90">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.name, link.id)}
              className="block w-full text-left py-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              {link.name}
            </button>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPreOrder();
              }}
              className="w-full py-3 rounded-full text-center text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#0050FF] to-[#0066FF] shadow-[0_0_20px_rgba(0,102,255,0.6)] flex items-center justify-center gap-2"
            >
              <span>EXPERIENCE XM6</span>
              <ArrowUpRight className="w-4 h-4 text-cyan-200" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
