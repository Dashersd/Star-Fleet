import { motion } from 'motion/react';

export default function StatsBox() {
  const stats = [
    { value: '14,200', label: 'LIGHT YEARS CHARTED' },
    { value: '99.8%', label: 'HYPERDRIVE STABILITY' },
    { value: '42', label: 'EXPLORER SHIPS ACTIVE' },
  ];

  return (
    <motion.div
      id="stats-morphism-box"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
      whileHover={{ 
        y: -4, 
        borderColor: 'rgba(255, 255, 255, 0.15)',
        boxShadow: '0 20px 50px -12px rgba(0,0,0,0.6)'
      }}
      className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] rounded-xl bg-white/[0.04] backdrop-blur-xl border border-white/10 p-4 sm:p-4.5 md:p-5 shadow-[0_12px_40px_-15px_rgba(0,0,0,0.5)] transition-all duration-300 pointer-events-auto"
    >
      <div className="grid grid-cols-3 items-center divide-x divide-white/10 text-center select-none">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex flex-col items-center justify-center px-1 sm:px-2 md:px-3">
            {/* Number Stat */}
            <span className="font-display font-semibold text-lg sm:text-2xl md:text-[26px] text-white tracking-tight leading-none">
              {stat.value}
            </span>
            {/* Description Label */}
            <span className="mt-1.5 text-[7px] sm:text-[8px] md:text-[8.5px] font-sans font-medium tracking-wider text-neutral-400 uppercase text-center leading-normal max-w-[80px] sm:max-w-[100px] block">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
