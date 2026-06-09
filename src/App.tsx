import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Rocket } from 'lucide-react';
import Header from './components/Header';
import StatsBox from './components/StatsBox';
import AsteroidsSection from './components/AsteroidsSection';
import MindsSection from './components/MindsSection';
import ExplorationGuideSection from './components/ExplorationGuideSection';

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
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
                className="font-display font-medium text-4xl sm:text-5xl md:text-[54px] leading-[1.1] text-white tracking-tight"
              >
                Launching <br />
                the Next Era of <br />
                <span className="font-sans italic font-light text-white tracking-normal">Spacecraft</span>
              </motion.h1>
            </div>
 
            {/* Description Paragraph */}
            <motion.p
              id="hero-subtitle"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
              className="text-neutral-400 text-xs sm:text-sm md:text-base leading-relaxed max-w-sm tracking-wide"
            >
              Experience next-generation orbital trajectory planning, hyperdrive optimization, and real-time telemetry systems for modern galactic explorers.
            </motion.p>
 
            {/* CTA action buttons */}
            <motion.div
              id="hero-ctas"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap items-center gap-4 mt-2"
            >
              {/* Get Started Button */}
              <motion.button
                id="cta-get-started"
                whileHover={{ scale: 1.04, boxShadow: '0 12px 30px -10px rgba(44, 94, 173, 0.6)' }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-[#2C5EAD] text-white font-semibold text-xs sm:text-sm transition-all duration-300 pointer-events-auto cursor-pointer"
              >
                <Rocket className="w-4 h-4 text-white hover:animate-pulse" />
                <span>Start The Fleet</span>
              </motion.button>
 
              {/* Learn More link transformed to a glassmorphic button */}
              <motion.button
                id="cta-learn-more"
                whileHover={{ scale: 1.04, backgroundColor: 'rgba(255, 255, 255, 0.12)' }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 text-white font-semibold text-xs sm:text-sm hover:border-white/20 hover:shadow-lg hover:shadow-black/10 transition-all duration-300 pointer-events-auto cursor-pointer"
              >
                <span>Learn More</span>
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
      <AsteroidsSection />

      {/* 3. New Meet The Minds Section (exact referenced layout mirror) */}
      <MindsSection />

      {/* 4. Elegant Exploration Guide Section */}
      <ExplorationGuideSection />

      {/* Global Landing Page Footer */}
      <footer id="landing-footer" className="w-full py-6 text-center text-[10px] sm:text-[11px] font-mono text-neutral-500 border-t border-white/5 bg-black">
        STARFLEET COMMAND • EST. 2026 • INTERSTELLAR TELEMETRY & SPACECRAFT SYSTEMS
      </footer>
    </div>
  );
}
