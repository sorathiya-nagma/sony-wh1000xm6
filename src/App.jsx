import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import ScrollytellingCanvas from './components/ScrollytellingCanvas.jsx';
import InteractiveAudioDemo from './components/InteractiveAudioDemo.jsx';
import EngineeringDeepDive from './components/EngineeringDeepDive.jsx';
import SpatialColorwayStudio from './components/SpatialColorwayStudio.jsx';
import SoundProfilesEQ from './components/SoundProfilesEQ.jsx';
import TechnicalSpecs from './components/TechnicalSpecs.jsx';
import PreOrderDrawer from './components/PreOrderDrawer.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [preOrderOpen, setPreOrderOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-void text-white selection:bg-sony-blue selection:text-white">
      {/* Apple-style Translucent Navbar */}
      <Navbar onOpenPreOrder={() => setPreOrderOpen(true)} />

      {/* Core Scrollytelling Canvas Section (Pinned 460vh, 120 frames) */}
      <ScrollytellingCanvas onOpenPreOrder={() => setPreOrderOpen(true)} />

      {/* Interactive Anti-Noise Acoustic DSP Demonstration with Web Audio Synthesizer */}
      <InteractiveAudioDemo />

      {/* Exploded Hardware Architecture Deep Dive */}
      <EngineeringDeepDive />

      {/* Materials & Bespoke Finishes Studio */}
      <SpatialColorwayStudio />

      {/* Studio Parametric Equalizer */}
      <SoundProfilesEQ />

      {/* High-Contrast Technical Specifications */}
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
