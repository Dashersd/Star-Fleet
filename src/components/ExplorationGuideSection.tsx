import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import spaceSuitImage from '../assets/images/regenerated_image_1780979161779.png';

interface GuideItem {
  id: string;
  number: string;
  tagline: string;
  title: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
}

export default function ExplorationGuideSection() {
  const guideItems: GuideItem[] = [
    {
      id: 'guide-01',
      number: '01',
      tagline: 'GET STARTED',
      title: 'What level of celestial tracker are you?',
      description: 'Determining your flight navigation clearance is the first step in plotting interplanetary courses. Our tiered standard classifications help commanders plan expeditions safely, matching your experience against galactic turbulence scales and multi-layered celestial cartography.',
      imageUrl: spaceSuitImage
    },
    {
      id: 'guide-02',
      number: '02',
      tagline: 'COMMAND ESSENTIALS',
      title: 'Picking the right Command Gear!',
      description: "Next-generation space travel doesn't require built-in commercial space stations. You can begin monitoring orbits with consumer-grade optical receivers, atmospheric field sensors, and desktop telemetry decoders. Learn how to isolate signals from interstellar microwave background noise.",
      imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800&h=1000'
    },
    {
      id: 'guide-03',
      number: '03',
      tagline: 'WHERE TO LOOK IS THE KEY',
      title: 'Understand Your Charts & Timing',
      description: 'Launch preparation requires printing offline vector trajectory backups. Even in completely simulated or real expeditions, precise navigation timing is your absolute life-support fail-safe. Discover how to orientation-lock your star trackers and decode quadrant anomalies.',
      imageUrl: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&q=80&w=800&h=1000'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const textBlockVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const imageBlockVariants = {
    hidden: { opacity: 0, scale: 0.97, y: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section 
      id="exploration-guide-section"
      className="relative w-full bg-black py-28 md:py-36 px-6 sm:px-12 lg:px-20 overflow-hidden text-white border-t border-white/[0.04] select-none"
    >
      {/* Background radial highlight or atmospheric touches */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none" />
      <div className="absolute -left-48 top-1/4 w-96 h-96 rounded-full bg-cyan-950/10 blur-[120px] pointer-events-none" />
      <div className="absolute -right-48 bottom-1/4 w-96 h-96 rounded-full bg-amber-950/10 blur-[120px] pointer-events-none" />

      <div className="max-w-[76rem] mx-auto relative z-10 flex flex-col gap-24 md:gap-32 lg:gap-36">
        
        {/* About Section Main Intro Heading */}
        <div className="text-left max-w-3xl">
          <div className="flex items-center gap-3 text-[10px] sm:text-xs font-mono font-semibold tracking-[0.25em] text-[#FCD34D] uppercase">
            <span className="w-12 h-[1px] bg-[#FCD34D]" />
            <span>ABOUT OUR FLEET COMMAND</span>
          </div>
          <h2 className="font-serif font-light text-4xl sm:text-5xl md:text-6xl text-white tracking-wide mt-4 leading-[1.1]">
            Charting the Frontiers of <br />
            <span className="italic font-normal text-neutral-300">Interstellar Innovation</span>
          </h2>
          <p className="text-neutral-400 font-sans font-light tracking-wide text-xs sm:text-sm md:text-base leading-relaxed mt-6 max-w-2xl">
            At Spacecraft Command, our mission is to explore, catalog, and secure the deep unknown. Through high-frequency telemetry tracking, tactical stellar orbital analyses, and real-time navigation grids, we empower galactic missions with sovereign safety and extreme technological foresight.
          </p>
        </div>

        {/* Separator Line */}
        <div className="w-full h-[1px] bg-white/[0.04]" />

        {guideItems.map((item, index) => {
          const isEven = index % 2 === 1;

          return (
            <motion.div
              key={item.id}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-120px' }}
              className={`grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 lg:gap-24 items-center`}
            >
              
              {/* Text column - column assignment changes based on even/odd index */}
              <motion.div
                variants={textBlockVariants}
                className={`relative md:col-span-6 flex flex-col justify-center ${
                  isEven ? 'order-1 md:order-2 md:pl-6' : 'order-1 md:pr-6'
                }`}
              >
                {/* Massive low-opacity number behind title header */}
                <div 
                  className={`absolute -top-16 sm:-top-20 md:-top-24 select-none font-serif font-bold text-[130px] sm:text-[180px] md:text-[220px] text-white/[0.04] pointer-events-none tracking-tighter leading-none ${
                    isEven ? 'left-0 sm:left-4' : 'left-0'
                  }`}
                >
                  {item.number}
                </div>

                <div className="relative z-10 flex flex-col">
                  {/* Category gold subheader with visual line accent */}
                  <div className="flex items-center gap-3 text-[10px] sm:text-xs font-mono font-semibold tracking-[0.25em] text-[#FCD34D] uppercase">
                    <span className="w-12 h-[1px] bg-[#FCD34D]" />
                    <span>{item.tagline}</span>
                  </div>

                  {/* Title header in striking serif */}
                  <h3 className="font-serif font-light text-3xl sm:text-4xl md:text-[40px] lg:text-[44px] text-white tracking-wide mt-4 leading-[1.12]">
                    {item.title}
                  </h3>

                  {/* Subtitle / Description text in clean modern sans-serif */}
                  <p className="text-neutral-400 font-sans font-light tracking-wide text-xs sm:text-sm leading-relaxed mt-6">
                    {item.description}
                  </p>

                  {/* Interactive read more golden link with hover offset translation */}
                  <div className="mt-8 self-start">
                    <a 
                      href="#contact"
                      className="group/link inline-flex items-center gap-2 text-[#FCD34D] font-mono hover:text-white transition-colors duration-300 tracking-[0.18em] text-[10px] sm:text-xs font-semibold uppercase relative cursor-pointer py-1"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#FCD34D] h-auto group-hover/link:translate-x-1.5 group-hover/link:text-white transition-all duration-300" />
                    </a>
                  </div>
                </div>

              </motion.div>

              {/* Vertical Image card column */}
              <motion.div
                variants={imageBlockVariants}
                className={`md:col-span-6 ${
                  isEven ? 'order-2 md:order-1' : 'order-2'
                } flex justify-center`}
              >
                <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)] border border-white/[0.08] hover:border-white/[0.16] duration-500 bg-black group">
                  
                  {/* Aesthetic scale overlay backdrops */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none z-10" />
                  
                  {/* Embedded high-contrast master photograph or loop video */}
                  {item.videoUrl ? (
                    <video
                      src={item.videoUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-[900ms] ease-out pointer-events-none"
                    />
                  ) : (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className={`w-full h-full grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[900ms] ease-out pointer-events-none ${
                        item.imageUrl?.toLowerCase().endsWith('.png') || item.imageUrl?.includes('SpaceSuit')
                          ? 'object-contain p-4'
                          : 'object-cover'
                      }`}
                    />
                  )}

                  {/* Corner aesthetic highlights inside image card */}
                  <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/20 pointer-events-none group-hover:border-white/50 transition-all duration-500" />
                  <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/20 pointer-events-none group-hover:border-white/50 transition-all duration-500" />
                </div>
              </motion.div>

            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
