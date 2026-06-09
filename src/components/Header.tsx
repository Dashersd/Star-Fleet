import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Rocket } from 'lucide-react';
import { NavLink } from '../types';

const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '#' },
  { label: 'Vectors', href: '#asteroids-command-center' },
  { label: 'Alliance', href: '#about-minds-section' },
  { label: 'About', href: '#exploration-guide-section' },
];

const smoothScrollTo = (targetSelector: string, duration = 1500) => {
  const target = targetSelector === '#' ? document.documentElement : document.querySelector(targetSelector);
  if (!target) return;
  
  const targetPosition = targetSelector === '#' ? 0 : (target as HTMLElement).getBoundingClientRect().top + window.scrollY;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  let startTime: number | null = null;
  
  const easeInOutCubic = (t: number, b: number, c: number, d: number) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t * t + b;
    t -= 2;
    return (c / 2) * (t * t * t + 2) + b;
  };
  
  const animation = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    } else {
      window.scrollTo(0, targetPosition);
    }
  };
  
  requestAnimationFrame(animation);
};

export default function Header() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    smoothScrollTo(href);
  };

  return (
    <motion.header
      id="aivision-header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 w-full flex items-center justify-between px-6 md:px-12 transition-all duration-300 select-none ${
        scrolled 
          ? 'py-4 bg-[#030303]/80 backdrop-blur-lg border-b border-white/[0.05] shadow-[0_10px_30px_rgba(0,0,0,0.8)]' 
          : 'py-6 bg-transparent border-b border-transparent'
      }`}
    >
      {/* Brand Logo */}
      <motion.a
        href="#"
        onClick={(e) => handleNavClick(e, '#')}
        id="header-logo"
        className="flex items-center gap-3 group"
        whileHover={{ scale: 1.02 }}
      >
        <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-[#2C5EAD] to-cyan-400 overflow-hidden shadow-lg shadow-cyan-500/10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-cyan-600 to-black"
          />
          <Rocket className="w-4 h-4 text-white relative z-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
        </div>
        <span className="font-display font-semibold text-xl tracking-tight text-white flex items-center gap-1">
          Star<span className="text-cyan-400 font-normal">Fleet</span>
        </span>
      </motion.a>

      {/* Nav Menu */}
      <nav id="header-nav-menu" className="hidden md:flex items-center gap-1 bg-white/[0.03] backdrop-blur-md px-1.5 py-1.5 rounded-full border border-white/10">
        {NAV_LINKS.map((link, idx) => (
          <a
            key={link.label}
            id={`nav-link-${link.label.toLowerCase()}`}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            className="relative px-5 py-1.5 text-sm font-medium tracking-wide text-neutral-400 hover:text-white transition-colors duration-200"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {hoveredIndex === idx && (
              <motion.span
                layoutId="nav-hover-pill"
                className="absolute inset-0 bg-white/5 rounded-full -z-10"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            {link.label}
          </a>
        ))}
      </nav>

      {/* Auth & CTA */}
      <div id="header-actions" className="flex items-center gap-6">
        <a
          id="btn-signup"
          href="#signup"
          className="text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-200 hidden sm:inline-block"
        >
          Sign up
        </a>
        <motion.a
          id="btn-contact"
          href="#contact"
          whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(139, 92, 246, 0.2)' }}
          whileTap={{ scale: 0.98 }}
          className="relative px-6 py-2.5 rounded-full text-sm font-medium text-white border border-white/20 overflow-hidden group transition-all duration-300 hover:border-violet-500/50"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-violet-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative z-10">Contact</span>
        </motion.a>
      </div>
    </motion.header>
  );
}
