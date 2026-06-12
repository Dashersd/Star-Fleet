import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Rocket } from 'lucide-react';
import Header from './components/Header';
import StatsBox from './components/StatsBox';
import VectorsSection from './components/VectorsSection';
import AllianceSection from './components/AllianceSection';
import AboutSection from './components/AboutSection';

export default function App() {
  return (
    <div 
      id="app-root-container" 
      className="min-h-screen bg-transparent text-white relative font-sans flex flex-col overflow-x-hidden min-w-[320px] isolate"
    >
      {/* 1. Main Landing Section Container with dynamic relative background video */}
      <div id="hero-layout" className="relative w-full flex flex-col justify-between min-h-screen py-2 bg-transparent select-none overflow-hidden">
        {/* Background Video (Covers entire Hero grid dynamically) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <video
            className="w-full h-full object-cover opacity-100"
            src="https://res.cloudinary.com/dnaqcoofz/video/upload/q_auto/f_auto/v1780709832/Spaceship_travel_left_to_right_202606060936_f2aets.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          {/* Transparent layout to blend on the video background */}
          <div className="absolute inset-0 bg-black/15 pointer-events-none" />
        </div>
        
        {/* Navigation Header */}
        <Header />

        {/* Main Grid Layout matching original layout */}
        <div 
          id="main-hero-grid" 
          className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center px-6 md:px-12 lg:px-16 pt-24 pb-8 lg:pt-32 lg:pb-12 grow max-w-[88rem] mx-auto"
        >
          
          {/* Left Column: Headline & Copy */}
          <div id="hero-left-column" className="lg:col-span-6 flex flex-col justify-center items-start gap-6 text-left relative z-10 -translate-y-2 sm:-translate-y-4 lg:-translate-y-8">
            
            {/* Ambient Label Tag */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-300">Spacecraft Command</span>
            </motion.div>
 
            {/* Title Heading */}
            <div className="flex flex-col gap-3">
              <motion.h1
                id="hero-heading"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.15,
                      delayChildren: 0.2
                    }
                  }
                }}
                className="font-display font-medium text-4xl sm:text-5xl md:text-[64px] leading-[1.1] text-white tracking-[-0.02em]"
              >
                <motion.span 
                  className="block"
                  variants={{
                    hidden: { opacity: 0, y: 30, filter: 'blur(12px)' },
                    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
                  }}
                >
                  Launching
                </motion.span>
                <motion.span 
                  className="block"
                  variants={{
                    hidden: { opacity: 0, y: 30, filter: 'blur(12px)' },
                    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
                  }}
                >
                  the Next Era of
                </motion.span>
                <motion.span 
                  className="block font-sans italic font-light text-white tracking-normal mt-1"
                  variants={{
                    hidden: { opacity: 0, y: 30, filter: 'blur(12px)' },
                    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
                  }}
                >
                  Spacecraft
                </motion.span>
              </motion.h1>
            </div>
 
            {/* Description Paragraph */}
            <motion.p
              id="hero-subtitle"
              initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
              className="text-neutral-300 text-sm md:text-base leading-[1.7] max-w-md tracking-wide font-light"
            >
              Experience next-generation orbital trajectory planning, hyperdrive optimization, and real-time telemetry systems for modern galactic explorers.
            </motion.p>
 
            {/* CTA action buttons */}
            <motion.div
              id="hero-ctas"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
              className="flex flex-wrap items-center gap-5 mt-4"
            >
              {/* Primary Button */}
              <motion.button
                id="cta-get-started"
                whileHover="hover"
                whileTap="tap"
                variants={{
                  hover: { scale: 1.05, boxShadow: '0 0 40px rgba(6, 182, 212, 0.6)' },
                  tap: { scale: 0.96 }
                }}
                className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-700 to-cyan-500 text-white font-medium text-sm transition-all duration-300 pointer-events-auto cursor-pointer overflow-hidden border border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
              >
                {/* Animated Shimmer Sweep */}
                <motion.div 
                  className="absolute top-0 bottom-0 left-0 w-[150%] bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]"
                  variants={{
                    hover: { 
                      x: ['-100%', '150%'],
                      transition: { duration: 1.2, repeat: Infinity, ease: "linear" } 
                    }
                  }}
                  initial={{ x: '-100%' }}
                />
                <Rocket className="w-4 h-4 text-white relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                <span className="relative z-10 tracking-wide">Start The Fleet</span>
              </motion.button>
 
              {/* Secondary Button */}
              <motion.button
                id="cta-learn-more"
                whileHover="hover"
                whileTap="tap"
                variants={{
                  hover: { 
                    scale: 1.05, 
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    borderColor: 'rgba(255, 255, 255, 0.25)',
                    boxShadow: '0 0 20px rgba(255, 255, 255, 0.05)'
                  },
                  tap: { scale: 0.96 }
                }}
                className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white/[0.03] backdrop-blur-md border border-white/10 text-neutral-300 font-medium text-sm transition-all duration-300 pointer-events-auto cursor-pointer overflow-hidden"
              >
                {/* Subtle Glass Reflection Sweep */}
                <motion.div 
                  className="absolute top-0 bottom-0 left-0 w-[150%] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg]"
                  variants={{
                    hover: { 
                      x: ['-100%', '150%'],
                      transition: { duration: 1.5, repeat: Infinity, ease: "linear" } 
                    }
                  }}
                  initial={{ x: '-100%' }}
                />
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Learn More</span>
              </motion.button>
            </motion.div>
          </div>
 
          {/* Right Column: Contains the Glassmorphic Stats Box and spacing */}
          <div id="hero-right-column" className="lg:col-span-6 flex flex-col justify-end items-end w-full relative lg:h-full lg:pl-12 lg:pt-16 min-h-[300px]">
            {/* Glassmorphic Stats Box aligned to the corner bottom right */}
            <div className="w-full flex justify-end mt-auto translate-y-4 sm:translate-y-6 lg:translate-y-10">
              <StatsBox />
            </div>
          </div>
        </div>
      </div>

      {/* 2. New Spacecraft Asteroids Section */}
      <VectorsSection />

      {/* 3. New Meet The Minds Section (exact referenced layout mirror) */}
      <AllianceSection />

      {/* 4. Elegant Exploration Guide Section */}
      <AboutSection />

      {/* Global Landing Page Footer */}
      <footer id="landing-footer" className="w-full py-6 text-center text-[10px] sm:text-[11px] font-mono text-neutral-500 border-t border-white/5 bg-black">
        STARFLEET COMMAND • EST. 2026 • INTERSTELLAR TELEMETRY & SPACECRAFT SYSTEMS
      </footer>
    </div>
  );
}
