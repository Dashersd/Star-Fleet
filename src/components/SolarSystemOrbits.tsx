import React, { useState } from 'react';
import { motion } from 'motion/react';

export default function SolarSystemOrbits() {
  const [selectedPlanet, setSelectedPlanet] = useState<string>('Earth');
  const planets = [
    { name: 'Sun', color: 'from-amber-400 to-yellow-500 shadow-[0_0_24px_rgba(234,179,8,0.7)]', size: 'w-7 h-7 sm:w-9 sm:h-9', pixelSize: 28, radius: 0, duration: 0, info: 'SOLAR CORE • Type G2V Star • 1.39M km diameter' },
    { name: 'Mercury', color: 'from-gray-400 to-amber-600 shadow-[0_0_8px_rgba(245,158,11,0.5)]', size: 'w-2 h-2', pixelSize: 8, radius: 40, duration: 5, info: 'MERCURY • 57.9M km from Sun • 47.4 km/s velocity' },
    { name: 'Venus', color: 'from-orange-300 to-yellow-600 shadow-[0_0_9px_rgba(234,179,8,0.5)]', size: 'w-3 h-3', pixelSize: 12, radius: 65, duration: 9, info: 'VENUS • 108.2M km from Sun • 35.0 km/s velocity' },
    { name: 'Earth', color: 'from-blue-400 to-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.8)]', size: 'w-3.5 h-3.5', pixelSize: 14, radius: 90, duration: 15, info: 'EARTH • 149.6M km from Sun • 29.8 km/s velocity • Known biosphere' },
    { name: 'Mars', color: 'from-rose-500 to-red-700 shadow-[0_0_10px_rgba(239,68,68,0.6)]', size: 'w-2.5 h-2.5', pixelSize: 10, radius: 115, duration: 24, info: 'MARS • 227.9M km from Sun • 24.1 km/s velocity' },
    { name: 'Jupiter', color: 'from-amber-500 to-orange-800 shadow-[0_0_14px_rgba(245,158,11,0.5)]', size: 'w-5 h-5', pixelSize: 20, radius: 145, duration: 45, info: 'JUPITER • 778.5M km from Sun • 13.1 km/s velocity' },
    { name: 'Saturn', color: 'from-yellow-200 to-amber-500 shadow-[0_0_14px_rgba(253,224,71,0.5)]', size: 'w-4.5 h-4.5', pixelSize: 18, radius: 180, duration: 60, info: 'SATURN • 1.43B km from Sun • 9.7 km/s velocity • Elegant ring system', hasRing: true },
    { name: 'Uranus', color: 'from-teal-300 to-cyan-600 shadow-[0_0_10px_rgba(20,184,166,0.5)]', size: 'w-3.5 h-3.5', pixelSize: 14, radius: 215, duration: 80, info: 'URANUS • 2.87B km from Sun • 6.8 km/s velocity • Giant tilted on side' },
    { name: 'Neptune', color: 'from-blue-600 to-indigo-900 shadow-[0_0_10px_rgba(37,99,235,0.5)]', size: 'w-3.5 h-3.5', pixelSize: 14, radius: 250, duration: 110, info: 'NEPTUNE • 4.50B km from Sun • 5.4 km/s velocity • Deep blue windiest world' }
  ];

  const currentPlanet = planets.find(p => p.name === selectedPlanet) || planets[0];

  return (
    <>
      <div className="relative flex-grow flex items-center justify-center my-4 overflow-hidden min-h-[160px]">
        
        {/* Concentric Orbit Circles */}
        {planets.map((planet) => {
          if (planet.radius === 0) return null;
          const isCurrent = selectedPlanet === planet.name;
          return (
            <div 
              key={`orbit-${planet.name}`}
              onClick={() => setSelectedPlanet(planet.name)}
              style={{ 
                width: `${planet.radius}px`, 
                height: `${planet.radius}px` 
              }}
              className={`absolute rounded-full border transition-all duration-350 cursor-pointer ${
                isCurrent 
                  ? 'border-cyan-400/40 bg-cyan-500/[0.02] scale-[1.01]' 
                  : 'border-white/[0.04] hover:border-white/10'
              }`}
            />
          );
        })}

        {/* Glowing Sun Center */}
        <div 
          onClick={() => setSelectedPlanet('Sun')}
          className={`absolute rounded-full z-20 cursor-pointer bg-gradient-to-tr ${planets[0].color} animate-pulse hover:scale-110 transition-transform duration-300 flex items-center justify-center ${planets[0].size}`}
        />

        {/* Moving Orbit Container for each Planet */}
        {planets.map((planet) => {
          if (planet.radius === 0) return null;
          const isCurrent = selectedPlanet === planet.name;

          return (
            <motion.div
              key={`container-${planet.name}`}
              animate={{ rotate: 360 }}
              transition={{ 
                repeat: Infinity, 
                duration: planet.duration, 
                ease: 'linear' 
              }}
              style={{ 
                width: `${planet.radius}px`, 
                height: `${planet.radius}px` 
              }}
              className="absolute pointer-events-none z-10"
            >
              <div 
                role="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPlanet(planet.name);
                }}
                style={{ 
                  top: `-${planet.pixelSize / 2}px`,
                  left: '50%',
                  transform: 'translateX(-50%)' 
                }}
                className={`absolute pointer-events-auto cursor-pointer rounded-full bg-gradient-to-tr ${planet.color} ${planet.size} ${
                  isCurrent ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-125' : 'hover:scale-125'
                } transition-all duration-300 flex items-center justify-center`}
              >
                {/* RINGS FOR SATURN */}
                {planet.hasRing && (
                  <span className="absolute w-[24px] h-[6px] border border-amber-300/60 rounded-full rotate-[15deg] pointer-events-none" />
                )}
              </div>
            </motion.div>
          );
        })}

        {/* Selected Planet HUD Overlay Card */}
        <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-md rounded-xl p-3 border border-white/10 max-w-[150px] sm:max-w-[200px] text-left pointer-events-none z-30">
          <p className="text-[10px] font-mono text-cyan-400 uppercase font-semibold leading-none">{selectedPlanet}</p>
          <p className="text-[9px] text-neutral-400 font-sans mt-1.5 leading-tight">{currentPlanet.info}</p>
        </div>

        {/* Click invitation badge */}
        <div className="absolute bottom-2 right-2 bg-neutral-900/90 border border-white/5 rounded-lg px-2 py-1 text-[8px] font-mono text-neutral-400 pointer-events-none z-30">
          CLICK PLANETS OR ORBITS TO INSPECT
        </div>
      </div>

      {/* HUD Footer details which update dynamically! */}
      <div className="flex justify-between items-end z-10 w-full font-mono text-[9px] text-neutral-400">
        <div className="flex flex-col gap-1">
          <span className="text-neutral-500 uppercase">TELEMETRY CORE</span>
          <span className="text-cyan-400/80 font-semibold">{currentPlanet.name === 'Sun' ? 'CENTRAL GRAVITY EMBED' : `ORBITAL DISTANCE: ${currentPlanet.radius * 1.49}M KM`}</span>
        </div>
        <div className="flex flex-col gap-1 text-right">
          <span className="text-neutral-500 uppercase">SYS STABILITY</span>
          <span className="text-white font-medium">{currentPlanet.name === 'Sun' ? '100% ECLIPTIC' : `PERIOD: ${currentPlanet.duration * 24.3} DAYS`}</span>
        </div>
      </div>
    </>
  );
}
