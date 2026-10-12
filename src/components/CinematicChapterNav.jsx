import React, { useState, useEffect } from 'react';
import { Film, ChevronRight, Play } from 'lucide-react';

export default function CinematicChapterNav() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const chapters = [
    { id: 'hero', index: '01', title: 'Silence', subtitle: 'The Re-engineered Void' },
    { id: 'anc-demo', index: '02', title: 'Sound', subtitle: 'Real-Time DSP Matrix' },
    { id: 'engineering', index: '03', title: 'Engineering', subtitle: 'Floating Component Dossier' },
    { id: 'materials', index: '04', title: 'Comfort', subtitle: 'Materials & Ergo Seal' },
    { id: 'acoustics', index: '05', title: 'Tuning', subtitle: '3D Studio Equalizer' },
    { id: 'comparison', index: '06', title: 'Comparison', subtitle: 'Smart Flagship Matrix' },
    { id: 'specs', index: '07', title: 'Details', subtitle: 'Technical Specifications' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalScroll > 0 ? (currentScroll / totalScroll) * 100 : 0;
      setScrollPercent(Math.min(100, Math.max(0, progress)));

      // Determine active chapter by element positions
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      for (let i = chapters.length - 1; i >= 0; i--) {
        const elem = document.getElementById(chapters[i].id);
        if (elem) {
          const top = elem.offsetTop;
          if (scrollPos >= top) {
            setActiveChapter(i);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToChapter = (id) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Floating Slim Progress Indicator at Top (just beneath navbar) */}
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none h-[2px] bg-white/[0.05]">
        <div 
          className="h-full bg-gradient-to-r from-[#0050FF] via-[#00D6FF] to-[#0050FF] transition-all duration-150 ease-out shadow-[0_0_12px_#00D6FF]"
          style={{ width: `${scrollPercent}%` }}
        />
      </div>

      {/* Cinematic Chapter Dock (Floating Right / Bottom Rail) */}
      <aside 
        aria-label="Cinematic Chapter Navigation"
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 select-none transition-all duration-400"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div className={`liquid-glass rounded-2xl backdrop-blur-2xl shadow-2xl transition-all duration-300 p-2 ${
          isExpanded ? 'w-64 sm:w-72 p-3' : 'w-auto'
        }`}>
          
          {/* Collapsed Compact View */}
          {!isExpanded ? (
            <button
              onClick={() => setIsExpanded(true)}
              className="flex items-center gap-3 px-3.5 py-2 text-left cursor-pointer group"
            >
              <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00D6FF] animate-pulse" />
              <div className="flex flex-col">
                <span className="text-[9px] font-mono tracking-widest uppercase text-cyan-400 font-semibold">
                  CHAPTER {chapters[activeChapter].index}
                </span>
                <span className="text-xs font-bold text-white tracking-tight">
                  {chapters[activeChapter].title}
                </span>
              </div>
              <span className="text-[10px] font-mono text-white/40 ml-2">
                {Math.round(scrollPercent)}%
              </span>
            </button>
          ) : (
            /* Expanded Film Chapter Directory */
            <div className="space-y-1.5 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 px-2 pt-1">
                <div className="flex items-center gap-2">
                  <Film className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-[10px] font-mono tracking-widest uppercase text-white/70 font-semibold">
                    CINEMATIC CHAPTERS
                  </span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 font-bold">
                  {Math.round(scrollPercent)}%
                </span>
              </div>

              {chapters.map((ch, idx) => {
                const isActive = activeChapter === idx;
                return (
                  <button
                    key={ch.id}
                    onClick={() => {
                      scrollToChapter(ch.id);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'liquid-glass-active text-white shadow-[0_0_15px_rgba(0,214,255,0.35)]'
                        : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className={`text-[10px] font-mono shrink-0 ${
                        isActive ? 'text-cyan-300 font-bold' : 'text-white/30'
                      }`}>
                        {ch.index}
                      </span>
                      <div className="truncate">
                        <div className="text-xs font-bold tracking-tight truncate">
                          {ch.title}
                        </div>
                        <div className="text-[9px] text-white/40 truncate">
                          {ch.subtitle}
                        </div>
                      </div>
                    </div>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00D6FF] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          )}

        </div>
      </aside>
    </>
  );
}
