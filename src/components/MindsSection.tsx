import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Users, 
  Linkedin, 
  Twitter, 
  Compass, 
  CheckCircle2, 
  Cpu, 
  Shield, 
  Activity, 
  ArrowUpRight, 
  Sparkles, 
  Rocket, 
  Layers,
  ChevronRight
} from 'lucide-react';
import SpaceBattle from './SpaceBattle';
import SolarSystemOrbits from './SolarSystemOrbits';

export default function MindsSection() {
  const [activeTab, setActiveTab] = useState<'system'|'alliance'>('system');
  const [hudMode, setHudMode] = useState<'orbits' | 'battle'>('orbits');
  const [isCtaHovered, setIsCtaHovered] = useState(false);

  // Creative tech partner badges for Card 1
  const partners = [
    { name: 'ASTRO', icon: Rocket },
    { name: 'SHIELD', icon: Shield },
    { name: 'KEPLER', icon: Globe },
    { name: 'VECTR', icon: Compass },
    { name: 'CORE', icon: Cpu },
    { name: 'FLOW', icon: Activity }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      }
    }
  };

  const scaleUpVariants = {
    hidden: { opacity: 0, scale: 0.96, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      }
    }
  };

  return (
    <section 
      id="about-minds-section" 
      style={{ fontFamily: '"DM Sans", sans-serif' }}
      className="relative w-full bg-black py-24 px-6 sm:px-12 lg:px-16 overflow-hidden border-t border-white/[0.04] text-white select-none font-sans"
    >
      {/* Background Star Glow and Grid lines */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(44,94,173,0.12)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_70%)] pointer-events-none" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-[88rem] mx-auto relative z-10 flex flex-col gap-16"
      >
        
        {/* Main Grid: Left Column (Title & HUD/Vector Map) and Right Column (Description & Bento Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Section Badge, Heading & HUD Schematic */}
          <div className="flex flex-col gap-8 text-left h-full justify-between">
            <div className="flex flex-col gap-5">
              {/* Badge element corresponding to the "• Why choose us" */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-2 self-start"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-neutral-400 font-medium">Why choose us</span>
              </motion.div>

              {/* Exact Dual-Line Title: "Meet The Minds Behind The Work" adapted of course to Spacecraft Vectors/Missions */}
              <motion.h2
                id="minds-heading"
                variants={itemVariants}
                className="font-sans text-4xl sm:text-5xl lg:text-[56px] font-extralight tracking-tight text-white leading-[1.05]"
              >
                Meet The Minds <br />
                <span className="font-normal text-neutral-400">Behind The Fleet</span>
              </motion.h2>
            </div>

            {/* INTERACTIVE HUD VECTOR SCHEMATIC converted to a high-fidelity Solar System or Space Battle Sim */}
            <motion.div
              variants={scaleUpVariants}
              className={`relative w-full ${hudMode === 'orbits' ? 'aspect-[4/3] sm:aspect-[4.2/3.5]' : 'min-h-[460px]'} rounded-3xl overflow-hidden border border-white/[0.08] bg-gradient-to-br from-neutral-900/60 to-black/90 p-6 flex flex-col justify-between mt-8 shadow-2xl transition-all duration-300 group`}
            >
              {/* Grid backdrop */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
              <div className="absolute inset-0 bg-radial-gradient(center,rgba(6,182,212,0.05),transparent_80%) pointer-events-none" />

              {/* Glowing Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-xl pointer-events-none group-hover:border-cyan-400 group-hover:scale-105 transition-all duration-300" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500/30 rounded-tr-xl pointer-events-none group-hover:border-cyan-400 group-hover:scale-105 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500/30 rounded-bl-xl pointer-events-none group-hover:border-cyan-400 group-hover:scale-105 transition-all duration-300" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/30 rounded-br-xl pointer-events-none group-hover:border-cyan-400 group-hover:scale-105 transition-all duration-300" />

              {/* HUD Header Bar with Toggle Switchers */}
              <div className="flex items-center justify-between z-10 w-full mb-3">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${hudMode === 'orbits' ? 'bg-yellow-500' : 'bg-red-500'} animate-ping`} />
                  <span className="text-[10px] font-mono tracking-widest text-cyan-400 font-semibold uppercase">
                    {hudMode === 'orbits' ? 'solar orbit analyzer v4.0' : 'VECTR COMBAT BLUEPRINT'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/[0.03] border border-white/10 rounded-lg p-0.5 z-20">
                  <button 
                    onClick={() => setHudMode('orbits')}
                    type="button"
                    className={`px-2 py-0.5 rounded text-[8.5px] font-mono uppercase transition-all duration-200 cursor-pointer ${
                      hudMode === 'orbits' ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Orbits
                  </button>
                  <button 
                    onClick={() => setHudMode('battle')}
                    type="button"
                    className={`px-2 py-0.5 rounded text-[8.5px] font-mono uppercase transition-all duration-200 cursor-pointer ${
                      hudMode === 'battle' ? 'bg-red-500/20 text-red-300 font-semibold border border-red-500/30' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Combat Sim
                  </button>
                </div>
              </div>

              {hudMode === 'orbits' ? (
                <SolarSystemOrbits />
              ) : (
                <SpaceBattle />
              )}
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Social, Description paragraphs, Globe-Counts, Avatars, Bento Grid Cards */}
          <div className="flex flex-col gap-10">
            
            {/* Top Row: Social Icons to look super clean (X, Circle-D, LinkedIn) */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center justify-end gap-3.5 border-b border-white/[0.04] pb-5"
            >
              <motion.a 
                href="#" 
                whileHover={{ scale: 1.1, color: '#ffffff' }}
                className="text-neutral-500 hover:text-white transition-colors duration-200 text-sm font-mono tracking-wider px-2 py-1"
              >
                𝕏
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ scale: 1.1 }}
                className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center bg-white/[0.03] text-xs font-semibold text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
              >
                🌐
              </motion.a>
              <motion.a 
                href="#"
                whileHover={{ scale: 1.1, color: '#0077b5' }}
                className="text-neutral-500 hover:text-white transition-colors duration-200 text-sm font-mono tracking-wider px-2 py-1 flex items-center gap-1"
              >
                in
              </motion.a>
            </motion.div>

            {/* Starfleet Command description mirroring the Exact Fluxora text block layout */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col gap-6 text-left"
            >
              <p className="text-lg sm:text-xl text-neutral-300 leading-relaxed font-sans font-light tracking-normal">
                At <span className="text-white font-medium">Spacecraft Command</span>, we bring together deep-space navigators, <span className="text-white font-mono font-medium relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-cyan-400/80">vector strategists</span>, and spacecraft systems architects to chart bold, thoughtful, galactic vectors engineered with care and extreme curiosity.
              </p>
            </motion.div>

            {/* Minor details Row: Globe/Alliance stats */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-row flex-wrap items-center justify-between gap-6 bg-white/[0.01] border border-white/[0.03] rounded-2xl p-4.5"
            >
              {/* Globe Alliance Info */}
              <div className="flex items-center gap-3.5 text-left">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/40 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                  <Globe className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <p className="text-xs font-mono tracking-wide text-neutral-300 font-medium">Over 180 Fields Mapped</p>
                  <p className="text-[10px] text-neutral-500 font-mono tracking-widest uppercase">12 Cosmic Alliances Over World</p>
                </div>
              </div>
            </motion.div>

            {/* DUAL CARD BENTO GRID (Columns Side-by-Side as in reference picture) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-stretch text-left">
              
              {/* CARD 1: DARK GLASS CONTAINER */}
              <motion.div
                variants={scaleUpVariants}
                className="flex flex-col justify-between gap-6 p-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl relative overflow-hidden flex-1 group hover:border-white/[0.15] transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
              >
                <div>
                  {/* Title / stats value */}
                  <h3 className="font-sans font-light text-4xl sm:text-[44px] text-white tracking-tight">
                    400+
                  </h3>
                  <p className="text-xs text-neutral-400 font-sans font-light tracking-wide mt-1">
                    Trusted Fleet Partners
                  </p>
                </div>

                {/* Sub-grid of 6 modern system provider badges */}
                <div className="grid grid-cols-3 gap-2 py-1 my-1">
                  {partners.map((p, i) => (
                    <div 
                      key={p.name}
                      className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-cyan-950/20 border border-cyan-500/20 text-center"
                    >
                      <p.icon className="w-3.5 h-3.5 text-cyan-400 drop-shadow-[0_0_4px_rgba(34,211,238,0.8)]" />
                      <span className="text-[8px] font-mono tracking-widest text-cyan-300 font-semibold drop-shadow-[0_0_2px_rgba(34,211,238,0.5)]">{p.name}</span>
                    </div>
                  ))}
                </div>

                {/* Book a Call Button - Beautiful Warm Orange from the reference image */}
                <motion.button
                  id="minds-cta-button"
                  onMouseEnter={() => setIsCtaHovered(true)}
                  onMouseLeave={() => setIsCtaHovered(false)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#EB3D00] text-white font-medium text-xs tracking-wider transition-all duration-300 hover:bg-[#FF4D0F] shadow-[0_4px_15px_rgba(235,61,0,0.25)] hover:shadow-[0_4px_25px_rgba(235,61,0,0.4)] cursor-pointer"
                >
                  <span className="font-mono uppercase font-semibold">Book a call</span>
                  <ArrowUpRight className={`w-3.5 h-3.5 transition-transform duration-300 ${isCtaHovered ? 'translate-x-0.5 -translate-y-0.5' : ''}`} />
                </motion.button>
              </motion.div>

              {/* CARD 2: GLOWING CYBER-RED GLASS CONTAINER */}
              <motion.div
                variants={scaleUpVariants}
                className="flex flex-col justify-between gap-10 p-6 rounded-2xl border border-red-500/25 bg-red-950/15 backdrop-blur-xl relative overflow-hidden flex-1 group hover:border-red-500/40 transition-all duration-300 shadow-[0_8px_32px_rgba(122,6,0,0.25)]"
              >
                {/* Tech scan lines background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4px_4px] pointer-events-none opacity-20" />
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-red-500/20 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

                {/* Top card metadata info */}
                <div className="flex items-center justify-between border-b border-white/10 pb-2 z-10 font-mono text-[9px] text-red-300">
                  <span>LAUNCH SAFETY FACT</span>
                  <span className="text-white/60">2026</span>
                </div>

                {/* Major Stat Section */}
                <div className="flex flex-col gap-4 z-10">
                  <h4 className="font-sans font-light text-5xl text-white tracking-tight">
                    230+
                  </h4>
                  <p className="text-xs text-red-200 font-sans font-light leading-relaxed tracking-normal max-w-[200px]">
                    Stellar spacecraft flight trajectories successfully optimized and integrated galaxy-wide.
                  </p>
                </div>

                {/* Minor custom neon meter bar */}
                <div className="w-full flex flex-col gap-1.5 z-10 mt-auto pt-1 font-mono text-[8px] text-red-300/80">
                  <div className="flex justify-between uppercase">
                    <span>Target Precision Rate</span>
                    <span className="text-white">99.98%</span>
                  </div>
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '99.98%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full bg-red-400 rounded-full shadow-[0_0_8px_#fca5a5]"
                    />
                  </div>
                </div>
              </motion.div>

            </div>

          </div>

        </div>

      </motion.div>
    </section>
  );
}
