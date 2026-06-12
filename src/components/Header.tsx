import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Rocket, Menu, X } from 'lucide-react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false); // Close mobile menu if it's open
    smoothScrollTo(href);
  };

  return (
    <motion.header
      id="aivision-header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 select-none ${
        scrolled || isMobileMenuOpen
          ? 'bg-[#030303]/80 backdrop-blur-lg border-b border-white/[0.05] shadow-[0_10px_30px_rgba(0,0,0,0.8)]' 
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className={`flex items-center justify-between px-6 md:px-12 w-full transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'}`}>
        {/* Brand Logo */}
        <motion.a
          href="#"
          onClick={(e) => handleNavClick(e, '#')}
          id="header-logo"
          className="flex items-center gap-3 group relative z-50"
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

        {/* Desktop Nav Menu */}
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

        {/* Auth, CTA, & Mobile Hamburger */}
        <div id="header-actions" className="flex items-center gap-4 sm:gap-6 relative z-50">
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
            className="relative px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium text-white border border-white/20 overflow-hidden group transition-all duration-300 hover:border-violet-500/50"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-violet-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10">Contact</span>
          </motion.a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 -mr-2 text-neutral-300 hover:text-white transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden absolute top-full left-0 w-full bg-[#030508]/95 backdrop-blur-2xl border-t border-white/[0.05] overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col px-8 py-10 gap-6">
              {NAV_LINKS.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: idx * 0.1, duration: 0.4, ease: 'easeOut' }}
                  className="text-3xl font-display font-light text-white tracking-wide border-b border-white/[0.05] pb-4"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
