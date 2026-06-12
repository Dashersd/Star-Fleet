import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu } from 'lucide-react';

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

export default function VectorsSection() {
  const [activeMissionId, setActiveMissionId] = useState<string>('psyche');
  const activeMission = MISSIONS_DATA.find(m => m.id === activeMissionId) || MISSIONS_DATA[0];

  return (
    <section 
      id="asteroids-command-center" 
      className="relative w-full bg-[#030508] py-24 px-6 sm:px-12 lg:px-16 overflow-hidden border-t border-white/5 select-none font-sans"
    >
      {/* Background Video Loop (Muted & Subtle) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none z-0 opacity-40 mix-blend-screen"
      >
        <source src="https://res.cloudinary.com/dnaqcoofz/video/upload/q_auto/f_auto/v1780721518/Generate_smooth_planet_loop_202606061251_tfaryl.mp4" type="video/mp4" />
      </video>

      {/* Grid wrapper */}
      <div className="max-w-[88rem] mx-auto relative z-10 flex flex-col gap-16 lg:gap-24">
        
        {/* Top Urgency Header */}
        <div className="w-full flex justify-center mt-4">
          <motion.div
            initial={{ opacity: 0, filter: 'blur(8px)', y: -20 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 px-5 py-2 rounded-full bg-black/30 backdrop-blur-xl border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
          >
            <span className="text-cyan-400 font-mono text-[10px] animate-pulse">❖</span>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-300">Live Operations</span>
          </motion.div>
        </div>

        {/* Two Column Main Configuration Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT COLUMN: Narrative description */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
            className="flex flex-col gap-6 text-left"
          >
            <motion.h1 
              variants={{
                hidden: { opacity: 0, x: -40, filter: 'blur(12px)' },
                visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="font-display text-4xl sm:text-5xl lg:text-[52px] font-light tracking-tight text-white leading-[1.1]"
            >
              SPACECRAFT <span className="text-cyan-400 font-medium">VECTORS</span>
            </motion.h1>
            
            <motion.p 
              variants={{
                hidden: { opacity: 0, x: -30, filter: 'blur(10px)' },
                visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="text-sm md:text-base text-neutral-400 leading-[1.8] font-sans font-light tracking-wide max-w-[500px]"
            >
              Track and analyze deep-space spacecraft trajectories, real-time telemetry datasets, and orbital flight vectors as our fleet navigates celestial resource fields and interstellar targets.
            </motion.p>
          </motion.div>

          {/* RIGHT COLUMN: Highly Polished Statistics */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
            }}
            className="flex flex-col sm:flex-row justify-start lg:justify-end gap-6 w-full"
          >
            {/* Stat Box 1 */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 40, filter: 'blur(12px)' },
                visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="flex flex-col gap-2 px-8 py-7 rounded-2xl border border-white/[0.04] bg-white/[0.01] backdrop-blur-xl group hover:border-cyan-400/20 transition-all duration-500 w-full sm:w-[220px]"
            >
              <span className="font-display font-light text-5xl sm:text-6xl text-white tracking-tight group-hover:text-cyan-300 transition-colors duration-500">
                24
              </span>
              <p className="text-xs text-neutral-500 leading-[1.6] font-sans font-light tracking-wide">
                active spacecraft flight vectors
              </p>
            </motion.div>

            {/* Stat Box 2 */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 40, filter: 'blur(12px)' },
                visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="flex flex-col gap-2 px-8 py-7 rounded-2xl border border-white/[0.04] bg-white/[0.01] backdrop-blur-xl group hover:border-white/10 transition-all duration-500 w-full sm:w-[220px]"
            >
              <span className="font-display font-light text-5xl sm:text-6xl text-white tracking-tight">
                102
              </span>
              <p className="text-xs text-neutral-500 leading-[1.6] font-sans font-light tracking-wide">
                deep space resource environments mapped
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Section: Missions Nav & Live Telemetry */}
        <div className="mt-4 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12 w-full pb-8">
          
          {/* Missions Nav */}
          <motion.div
            initial={{ opacity: 0, x: -20, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-5 w-full lg:w-auto"
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-600 font-semibold select-none">
              MISSIONS
            </span>
            <div className="flex items-center gap-6 overflow-x-auto scrollbar-none text-xs sm:text-sm">
              <div className="h-[1px] bg-white/10 w-8 shrink-0" />
              {MISSIONS_DATA.map((mission, index) => (
                <div key={mission.id} className="flex items-center gap-6 shrink-0">
                  <button
                    onClick={() => setActiveMissionId(mission.id)}
                    className={`font-sans tracking-wide whitespace-nowrap transition-all duration-300 ${
                      activeMissionId === mission.id
                        ? 'text-white font-medium drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]'
                        : 'text-neutral-600 hover:text-neutral-400 font-light'
                    }`}
                  >
                    {mission.name}
                  </button>
                  {index < MISSIONS_DATA.length - 1 && (
                    <div className="h-[1px] bg-white/10 w-8 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Live Telemetry Panel */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[420px] p-6 rounded-2xl border border-white/5 bg-black/60 backdrop-blur-xl flex flex-col gap-5 relative overflow-hidden group shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]"
          >
            {/* Ambient inner glow */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#2C5EAD]/20 blur-[50px] pointer-events-none rounded-full transition-all duration-700 group-hover:bg-cyan-500/20" />
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
              <span className="text-[10px] font-mono tracking-[0.15em] text-[#2C5EAD] group-hover:text-cyan-400 uppercase font-medium flex items-center gap-2 transition-colors duration-500">
                <Cpu className="w-3.5 h-3.5" /> LIVE TELEMETRY
              </span>
              <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">{activeMission.status}</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeMission.id}
                initial={{ opacity: 0, x: -10, filter: 'blur(4px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: 10, filter: 'blur(4px)' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="flex flex-col gap-4 relative z-10"
              >
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-500 font-mono tracking-widest text-[10px]">TARGET:</span>
                  <span className="text-white font-sans font-medium tracking-wide">{activeMission.target}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-500 font-mono tracking-widest text-[10px]">ORBIT DISTANCE:</span>
                  <span className="text-cyan-400 font-mono font-medium">{activeMission.telemetry.distance}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-500 font-mono tracking-widest text-[10px]">VELOCITY:</span>
                  <span className="text-neutral-300 font-mono">{activeMission.telemetry.speed}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-500 font-mono tracking-widest text-[10px]">COMPOSITION:</span>
                  <span className="text-neutral-300 font-mono px-2 py-1 rounded bg-white/[0.05] border border-white/10 text-[9px]">{activeMission.telemetry.composition}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
