import { motion } from 'motion/react';
import { TabItem } from '../types';

interface SidebarTabsProps {
  tabs: TabItem[];
  activeTab: TabItem;
  onTabSelect: (tab: TabItem) => void;
}

export default function SidebarTabs({ tabs, activeTab, onTabSelect }: SidebarTabsProps) {
  return (
    <div id="sidebar-tabs-container" className="flex flex-col justify-between h-full w-full max-w-sm md:max-w-md select-none gap-8 font-sans">
      {/* 1. Sidebar Accordion Navigation List */}
      <div className="flex flex-col gap-4">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab.id;

          return (
            <div
              key={tab.id}
              id={`sidebar-tab-${tab.id}`}
              onClick={() => onTabSelect(tab)}
              className="cursor-pointer group relative transition-all duration-300"
            >
              <div
                className={`rounded-2xl transition-all duration-300 backdrop-blur-md border ${
                  isActive
                    ? 'p-6 bg-white/[0.04] border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]'
                    : 'p-4 bg-transparent border-transparent hover:bg-white/[0.02] hover:border-white/5 text-neutral-400'
                }`}
                style={isActive ? {
                  borderLeft: `4px solid ${tab.colors.accent}`,
                } : undefined}
              >
                {/* Tab Title */}
                <div className="flex items-center justify-between">
                  <span
                    className={`font-sans font-semibold tracking-wide transition-all duration-300 ${
                      isActive ? 'text-white text-[17px]' : 'text-neutral-400 group-hover:text-neutral-200 text-base'
                    }`}
                  >
                    {tab.title}
                  </span>

                  {/* Active Indicator dot with accent glow */}
                  {isActive && (
                    <motion.div
                      layoutId="active-dot-indicator"
                      className="w-2 h-2 rounded-full"
                      style={{ 
                        backgroundColor: tab.colors.accent,
                        boxShadow: `0 0 12px 2px ${tab.colors.accent}`
                      }}
                    />
                  )}
                </div>

                {/* Collapsible active description text */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="overflow-hidden mt-2.5"
                  >
                    <p className="text-sm font-sans text-neutral-300 leading-relaxed tracking-wide">
                       {tab.description}
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
