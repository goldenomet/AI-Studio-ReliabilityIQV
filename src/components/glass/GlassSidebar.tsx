import React from 'react';
import { motion } from 'motion/react';
import { ChevronUp, LucideIcon } from 'lucide-react';

export interface GlassSidebarItem {
  id: string;
  label: string;
  icon: LucideIcon;
  meta?: string;
  active?: boolean;
  onClick: () => void;
}

export interface GlassSidebarProps {
  title?: string;
  items: GlassSidebarItem[];
  footer?: React.ReactNode;
  className?: string;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const GlassSidebar: React.FC<GlassSidebarProps> = ({
  title = 'News Room',
  items,
  footer,
  className = '',
  collapsed = false,
  onToggleCollapse,
}) => {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      aria-label={title}
      className={`relative overflow-hidden champagne-glass-sidebar rounded-[24px] p-4 sm:p-5 text-white flex flex-col justify-between ${className}`}
    >
      <div aria-hidden="true" className="absolute inset-0 champagne-glass-specular" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/65 to-transparent"
      />

      <div className="relative z-10 flex flex-col gap-1.5">
        <button
          type="button"
          onClick={onToggleCollapse}
          disabled={!onToggleCollapse}
          className={`min-h-[44px] w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium tracking-wide text-[#F5ECE2]/90 border-b border-white/15 mb-2 ${
            onToggleCollapse ? 'cursor-pointer hover:text-white' : 'cursor-default'
          }`}
        >
          <span>{title}</span>
          {onToggleCollapse && (
            <ChevronUp
              size={14}
              strokeWidth={1.6}
              className={`transition-transform duration-200 ${collapsed ? 'rotate-180' : ''}`}
            />
          )}
        </button>

        {!collapsed && (
          <nav className="flex flex-col gap-1">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={item.onClick}
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                  className={`min-h-[46px] w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-2xl text-left transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    item.active
                      ? 'bg-white/22 border border-white/35 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]'
                      : 'border border-transparent text-[#F7EFE6]/90 hover:bg-white/12 hover:text-white'
                  }`}
                >
                  <span className="inline-flex items-center gap-3.5 min-w-0">
                    <Icon size={19} strokeWidth={1.65} className="shrink-0 text-[#FAF5EE]" />
                    <span className="text-[14.5px] font-medium tracking-tight truncate">
                      {item.label}
                    </span>
                  </span>
                  {item.meta && (
                    <span className="text-xs font-mono text-[#E7D8C8] tabular-nums shrink-0">
                      {item.meta}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </nav>
        )}
      </div>

      {!collapsed && footer && (
        <div className="relative z-10 mt-6 pt-4 border-t border-white/15">{footer}</div>
      )}
    </motion.aside>
  );
};
