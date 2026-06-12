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

export default function AllianceSection() {
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
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(12px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const scaleUpVariants = {
    hidden: { opacity: 0, scale: 0.96, y: 30, filter: 'blur(12px)' },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section 
      id="about-minds-section" 
      className="relative w-full bg-[#030508] py-24 px-6 sm:px-12 lg:px-16 overflow-hidden border-t border-white/[0.04] text-white select-none font-sans"
    >
      {/* Background Star Glow and Grid lines */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(44,94,173,0.08)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_70%)] pointer-events-none" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-[88rem] mx-auto relative z-10 flex flex-col gap-12 lg:gap-16"
      >
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* LEFT COLUMN: Section Badge, Heading & HUD Schematic */}
          <div className="flex flex-col gap-8 text-left h-full justify-between">
            <div className="flex flex-col gap-6">
              {/* Badge */}
              <motion.div variants={itemVariants} className="flex items-center gap-2 self-start">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-400 font-medium">Why choose us</span>
              </motion.div>

              {/* Title */}
              <motion.h2
                id="minds-heading"
                variants={itemVariants}
                className="font-display text-4xl sm:text-5xl lg:text-[52px] font-light tracking-tight text-white leading-[1.1]"
              >
                Meet The Minds <br />
                <span className="font-light text-neutral-400">Behind The Fleet</span>
              </motion.h2>
            </div>

            {/* INTERACTIVE HUD */}
            <motion.div
              variants={scaleUpVariants}
              className={`relative w-full ${hudMode === 'orbits' ? 'aspect-[4/3] sm:aspect-[4.2/3.5]' : 'min-h-[460px]'} rounded-[2rem] overflow-hidden border border-white/[0.06] bg-black p-6 flex flex-col justify-between shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] transition-all duration-300 group`}
            >
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05),transparent_80%)] pointer-events-none" />

              <div className="flex items-center justify-between z-10 w-full mb-3">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${hudMode === 'orbits' ? 'bg-yellow-500' : 'bg-red-500'} animate-ping`} />
                  <span className="text-[10px] font-mono tracking-[0.15em] text-cyan-400 font-medium uppercase">
                    {hudMode === 'orbits' ? 'solar orbit analyzer v4.0' : 'VECTR COMBAT BLUEPRINT'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/[0.02] border border-white/5 rounded p-0.5 z-20">
                  <button 
                    onClick={() => setHudMode('orbits')}
                    type="button"
                    className={`px-2 py-0.5 rounded-sm text-[9px] font-mono uppercase transition-all duration-200 cursor-pointer ${
                      hudMode === 'orbits' ? 'bg-cyan-500/20 text-cyan-300 font-medium border border-cyan-500/20' : 'text-neutral-500 hover:text-white'
                    }`}
                  >
                    Orbits
                  </button>
                  <button 
                    onClick={() => setHudMode('battle')}
                    type="button"
                    className={`px-2 py-0.5 rounded-sm text-[9px] font-mono uppercase transition-all duration-200 cursor-pointer ${
                      hudMode === 'battle' ? 'bg-red-500/20 text-red-300 font-medium border border-red-500/20' : 'text-neutral-500 hover:text-white'
                    }`}
                  >
                    Combat Sim
                  </button>
                </div>
              </div>

              {hudMode === 'orbits' ? <SolarSystemOrbits /> : <SpaceBattle />}
            </motion.div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-10">
            
            {/* Top Row: Social Icons */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center justify-end gap-5 border-b border-white/[0.04] pb-6"
            >
              <a href="#" className="text-neutral-500 hover:text-white transition-colors duration-300 text-xs font-mono px-2 py-1">𝕏</a>
              <a href="#" className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] text-[10px] text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-900/30 transition-all duration-300 shadow-[0_0_10px_rgba(6,182,212,0.1)]">🌐</a>
              <a href="#" className="text-neutral-500 hover:text-[#0077b5] transition-colors duration-300 text-xs font-mono px-2 py-1 flex items-center gap-1">in</a>
            </motion.div>

            {/* Description */}
            <motion.div variants={itemVariants} className="flex flex-col gap-6 text-left">
              <p className="text-lg sm:text-xl text-neutral-400 leading-[1.8] font-sans font-light tracking-wide">
                At <span className="text-white font-medium border-b border-cyan-500/50 pb-0.5">Spacecraft Command</span>, we bring together deep-space navigators, <span className="text-white font-mono font-medium tracking-wide border-b border-cyan-500/50 pb-0.5">vector strategists</span>, and spacecraft systems architects to chart bold, thoughtful, galactic vectors engineered with care and extreme curiosity.
              </p>
            </motion.div>

            {/* Globe Stats Card */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-row flex-wrap items-center justify-between gap-6 bg-white/[0.01] border border-white/[0.04] rounded-2xl p-5 backdrop-blur-md"
            >
              <div className="flex items-center gap-4 text-left">
                <div className="w-10 h-10 rounded-full bg-cyan-900/30 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Globe className="w-4 h-4 animate-pulse" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <p className="text-[13px] font-mono tracking-wide text-neutral-200 font-medium">Over 180 Fields Mapped</p>
                  <p className="text-[9px] text-neutral-500 font-mono tracking-[0.15em] uppercase">12 Cosmic Alliances Over World</p>
                </div>
              </div>
            </motion.div>

            {/* DUAL CARD BENTO GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-stretch text-left">
              
              {/* CARD 1: DARK GLASS CONTAINER */}
              <motion.div
                variants={scaleUpVariants}
                className="flex flex-col justify-between gap-6 p-7 rounded-[1.5rem] border border-white/[0.05] bg-[#0A0D14] relative overflow-hidden flex-1 group hover:border-white/[0.1] transition-all duration-500 shadow-xl"
              >
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-display font-light text-5xl sm:text-6xl text-white tracking-tight">400+</h3>
                  <p className="text-xs text-neutral-500 font-sans font-light tracking-wide">Trusted Fleet Partners</p>
                </div>

                {/* 6 Badges */}
                <div className="grid grid-cols-3 gap-2 py-2">
                  {partners.map((p) => (
                    <div key={p.name} className="flex flex-col items-center gap-2 p-2.5 rounded-lg bg-cyan-950/20 border border-cyan-500/10 text-center transition-colors duration-300 hover:bg-cyan-900/40 hover:border-cyan-400/30">
                      <p.icon className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="text-[8px] font-mono tracking-widest text-cyan-300 font-medium">{p.name}</span>
                    </div>
                  ))}
                </div>

                {/* Book a Call Button */}
                <motion.button
                  id="minds-cta-button"
                  onMouseEnter={() => setIsCtaHovered(true)}
                  onMouseLeave={() => setIsCtaHovered(false)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#EB3D00] text-white font-medium text-xs tracking-wider transition-all duration-300 hover:bg-[#FF4D0F] shadow-[0_10px_30px_-5px_rgba(235,61,0,0.5)] hover:shadow-[0_15px_40px_-5px_rgba(235,61,0,0.7)] cursor-pointer"
                >
                  <span className="font-mono uppercase font-medium">Book a call</span>
                  <ArrowUpRight className={`w-3.5 h-3.5 transition-transform duration-300 ${isCtaHovered ? 'translate-x-0.5 -translate-y-0.5' : ''}`} />
                </motion.button>
              </motion.div>

              {/* CARD 2: GLOWING CYBER-RED GLASS CONTAINER */}
              <motion.div
                variants={scaleUpVariants}
                className="flex flex-col justify-between gap-10 p-7 rounded-[1.5rem] border border-red-500/20 bg-[#0A0D14] relative overflow-hidden flex-1 group hover:border-red-500/40 transition-all duration-500 shadow-[0_10px_40px_-10px_rgba(180,0,0,0.2)]"
              >
                {/* Tech background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4px_4px] pointer-events-none opacity-20" />
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-red-600/10 rounded-full blur-[50px] pointer-events-none group-hover:scale-125 group-hover:bg-red-500/20 transition-all duration-700" />

                <div className="flex items-center justify-between border-b border-white/[0.05] pb-3 z-10 font-mono text-[9px] text-red-300 tracking-[0.1em]">
                  <span>LAUNCH SAFETY FACT</span>
                  <span className="text-white/40">2026</span>
                </div>

                <div className="flex flex-col gap-4 z-10">
                  <h4 className="font-display font-light text-5xl sm:text-6xl text-white tracking-tight">230+</h4>
                  <p className="text-xs text-red-200/80 font-sans font-light leading-[1.7] tracking-wide max-w-[180px]">
                    Stellar spacecraft flight trajectories successfully optimized and integrated galaxy-wide.
                  </p>
                </div>

                {/* Progress bar */}
                <div className="w-full flex flex-col gap-2 z-10 mt-auto pt-2 font-mono text-[9px] text-red-300/80 tracking-widest">
                  <div className="flex justify-between uppercase">
                    <span>Target Precision Rate</span>
                    <span className="text-white font-medium">99.98%</span>
                  </div>
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '99.98%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                      className="h-full bg-red-500 rounded-full shadow-[0_0_10px_#ef4444]"
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
