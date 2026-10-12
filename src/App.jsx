import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import ScrollytellingCanvas from './components/ScrollytellingCanvas.jsx';
import InteractiveAudioDemo from './components/InteractiveAudioDemo.jsx';
import EngineeringDeepDive from './components/EngineeringDeepDive.jsx';
import SpatialColorwayStudio from './components/SpatialColorwayStudio.jsx';
import SoundProfilesEQ from './components/SoundProfilesEQ.jsx';
import SmartComparisonTool from './components/SmartComparisonTool.jsx';
import TechnicalSpecs from './components/TechnicalSpecs.jsx';
import PreOrderDrawer from './components/PreOrderDrawer.jsx';
import Footer from './components/Footer.jsx';
import CinematicChapterNav from './components/CinematicChapterNav.jsx';

export default function App() {
  const [preOrderOpen, setPreOrderOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#070B14] text-white selection:bg-sony-blue selection:text-white overflow-x-hidden">
      {/* Dynamic Ambient Background Illumination Layers */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 left-1/4 w-[750px] h-[750px] bg-cyan-500/10 rounded-full blur-[180px]" />
        <div className="absolute top-1/3 -right-40 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[200px]" />
        <div className="absolute top-2/3 -left-40 w-[700px] h-[700px] bg-indigo-500/08 rounded-full blur-[190px]" />
        <div className="absolute -bottom-40 right-1/4 w-[900px] h-[900px] bg-cyan-400/08 rounded-full blur-[220px]" />
      </div>

      {/* Apple-style Translucent Navbar */}
      <Navbar onOpenPreOrder={() => setPreOrderOpen(true)} />

      {/* Cinematic Chapter Navigation Timeline & Floating Rail */}
      <CinematicChapterNav />

      {/* Chapter 01: Core Scrollytelling Canvas Section (Pinned 460vh, 120 frames) */}
      <ScrollytellingCanvas onOpenPreOrder={() => setPreOrderOpen(true)} />

      {/* Chapter 02: Interactive Anti-Noise Acoustic DSP Demonstration with Web Audio Synthesizer */}
      <InteractiveAudioDemo />

      {/* Chapter 03: Exploded Hardware Architecture Deep Dive Dossier */}
      <EngineeringDeepDive />

      {/* Chapter 04: Materials, Comfort & Bespoke Finishes Studio */}
      <SpatialColorwayStudio />

      {/* Chapter 05: Studio Parametric Equalizer with 3D Wireframe Holograph */}
      <SoundProfilesEQ />

      {/* Chapter 06: Smart Comparison Tool vs Competitors */}
      <SmartComparisonTool onOpenPreOrder={() => setPreOrderOpen(true)} />

      {/* Chapter 07: High-Contrast Technical Specifications Dossier */}
      <TechnicalSpecs />

      {/* Corporate Luxury Footer */}
      <Footer />

      {/* Pre-Order Modal / Configuration Drawer */}
      <PreOrderDrawer 
        isOpen={preOrderOpen} 
        onClose={() => setPreOrderOpen(false)} 
      />
    </div>
  );
}
