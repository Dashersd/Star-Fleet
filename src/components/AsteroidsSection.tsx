import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Orbit, Compass, Globe, CheckCircle2, Cpu } from 'lucide-react';

interface MissionDetails {
  id: string;
  name: string;
  agency: string;
  launchDate: string;
  status: string;
  target: string;
  description: string;
  telemetry: {
    distance: string;
    speed: string;
    composition: string;
  };
}

const MISSIONS_DATA: MissionDetails[] = [
  {
    id: 'psyche',
    name: 'NASA Psyche',
    agency: 'NASA',
    launchDate: 'Oct 2023',
    status: 'En Route',
    target: '16 Psyche (Metal Asteroid)',
    description: 'Exploring a unique metal-rich asteroid, which may contain a pristine solar system planetary core.',
    telemetry: {
      distance: '2.4 AU',
      speed: '22.4 km/s',
      composition: 'Iron-Nickel Core'
    }
  },
  {
    id: 'hera',
    name: 'ESA Hera',
    agency: 'ESA',
    launchDate: 'Oct 2024',
    status: 'En Route',
    target: 'Dimorphos (Binary System)',
    description: 'Conducting a detailed post-impact survey of the asteroid Dimorphos, validating kinetic deflection parameters.',
    telemetry: {
      distance: '1.8 AU',
      speed: '18.1 km/s',
      composition: 'S-type Silicate'
    }
  },
  {
    id: 'hayabusa',
    name: 'AXA Hayabusa2',
    agency: 'JAXA',
    launchDate: 'Dec 2014',
    status: 'Completed (Extended)',
    target: '162173 Ryugu',
    description: 'Returned pristine carbonaceous sample capsules from Ryugu asteroid, now undertaking secondary flybys.',
    telemetry: {
      distance: '3.1 AU',
      speed: '14.9 km/s',
      composition: 'C-type Carbon'
    }
  }
];

export default function AsteroidsSection() {
  const [activeMissionId, setActiveMissionId] = useState<string>('psyche');
  const activeMission = MISSIONS_DATA.find(m => m.id === activeMissionId) || MISSIONS_DATA[0];

  return (
    <section 
      id="asteroids-command-center" 
      style={{ fontFamily: '"DM Sans", sans-serif' }}
      className="relative w-full bg-transparent py-20 px-6 sm:px-12 lg:px-16 overflow-hidden border-t border-white/5 select-none font-sans"
    >
      {/* Background Video Loop (Muted & Subtle) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none z-0 opacity-25 mix-blend-screen"
      >
        <source src="https://res.cloudinary.com/dnaqcoofz/video/upload/q_auto/f_auto/v1780721518/Generate_smooth_planet_loop_202606061251_tfaryl.mp4" type="video/mp4" />
      </video>

      {/* Grid wrapper */}
      <div className="max-w-[88rem] mx-auto relative z-10 flex flex-col gap-12">
        
        {/* Top Urgency Header */}
        <div className="w-full flex flex-col items-center justify-center gap-2 mb-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/40 border border-white/5"
          >
            <span className="text-cyan-400 font-mono animate-pulse">❖</span>
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-400">Live Operations</span>
          </motion.div>
        </div>

        {/* Two Column Main Configuration Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start animate-fade-in">
          
          {/* LEFT COLUMN: Narrative description & Interactive Missions */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-8 text-left"
          >
            <div className="flex flex-col gap-4">
              <h1 className="font-display text-4xl sm:text-5xl font-extralight tracking-tight text-white leading-none">
                SPACECRAFT <span className="font-normal text-cyan-400">VECTORS</span>
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans font-light tracking-wide max-w-lg mt-1">
                Track and analyze deep-space spacecraft trajectories, real-time telemetry datasets, and orbital flight vectors as our fleet navigates celestial resource fields and interstellar targets.
              </p>
            </div>

            {/* Live Telemetry Display Component moved to RIGHT COLUMN */}
          </motion.div>

          {/* RIGHT COLUMN: Highly Polished Statistics & Values */}
          <div className="flex flex-col justify-start gap-8 lg:items-end">
            
            {/* Stats Row */}
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 w-full justify-start lg:justify-end items-stretch text-left -mt-4 lg:-mt-8">
              {/* Stat Box 1 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-2.5 text-left px-5 py-4 rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-md group items-start shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] hover:border-cyan-400/30 transition-all duration-300 flex-1 sm:flex-initial"
              >
                <div className="flex items-baseline gap-1">
                  <span className="font-display font-light text-4xl sm:text-5xl text-white tracking-tight group-hover:text-cyan-400 transition-colors duration-300">
                    24
                  </span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans font-light tracking-wide max-w-[160px]">
                  active spacecraft flight vectors
                </p>
              </motion.div>

              {/* Stat Box 2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-2.5 text-left px-5 py-4 rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-md group items-start shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] hover:border-[#2C5EAD]/40 transition-all duration-300 flex-1 sm:flex-initial"
              >
                <div className="flex items-baseline gap-1">
                  <span className="font-display font-light text-4xl sm:text-5xl text-white tracking-tight group-hover:text-blue-400 transition-colors duration-300">
                    102
                  </span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans font-light tracking-wide max-w-[160px]">
                  deep space resource environments mapped
                </p>
              </motion.div>
            </div>
          </div>

        </div>

        {/* Bottom Section: Left-aligned Missions & Right-aligned Live Telemetry */}
        <div className="mt-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 w-full pt-2">
          
          {/* Missions Timeline Selector (Left-aligned, compressed layout) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-3.5 flex-grow"
          >
            {/* Header Row: MISSIONS */}
            <div className="flex items-center gap-3 w-full">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 font-semibold select-none">
                MISSIONS
              </span>
            </div>
            
            {/* Timeline Row: Left-aligned and compressed ── Item ── Item ── Item */}
            <div className="flex items-center justify-start w-full overflow-x-auto scrollbar-none select-none text-[11px] sm:text-xs">
              <div className="h-[1px] bg-white/[0.04] w-4 shrink-0" />
              {MISSIONS_DATA.map((mission, index) => [
                <button
                  key={`${mission.id}-btn`}
                  onClick={() => setActiveMissionId(mission.id)}
                  className={`px-1.5 sm:px-3 py-1 font-sans font-semibold tracking-wide whitespace-nowrap transition-all duration-200 relative shrink-0 ${
                    activeMissionId === mission.id
                      ? 'text-white scale-[1.03]'
                      : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  {mission.name}
                </button>,
                index < MISSIONS_DATA.length - 1 ? (
                  <div 
                    key={`${mission.id}-line`} 
                    className="h-[1px] bg-white/[0.04] shrink-0 w-4 sm:w-8" 
                  />
                ) : null
              ])}
            </div>
          </motion.div>

          {/* Live Telemetry Display Component (Moved to Bottom Right Corner) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="p-4 rounded-xl border border-white/5 bg-neutral-950/40 backdrop-blur-md flex flex-col gap-3.5 relative overflow-hidden group w-full lg:w-96 max-w-sm text-left lg:self-auto shrink-0 self-start"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cyan-500/10 to-transparent blur-xl" />
            
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-[10px] font-mono tracking-widest text-[#2C5EAD] uppercase font-bold flex items-center gap-1.5">
                <Cpu className="w-3 h-3 text-cyan-400 animate-spin" /> Live Telemetry
              </span>
              <span className="text-[9px] font-mono text-neutral-500 uppercase">{activeMission.status}</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeMission.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-2"
              >
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-500 font-mono">TARGET:</span>
                  <span className="text-neutral-300 font-semibold">{activeMission.target}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-500 font-mono">ORBIT DISTANCE:</span>
                  <span className="text-cyan-300 font-mono">{activeMission.telemetry.distance}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-500 font-mono">VELOCITY:</span>
                  <span className="text-neutral-300 font-mono">{activeMission.telemetry.speed}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-500 font-mono">COMPOSITION:</span>
                  <span className="text-white font-mono px-1.5 py-0.5 rounded bg-white/5 text-[10px]">{activeMission.telemetry.composition}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
