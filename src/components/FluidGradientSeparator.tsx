import React from 'react';

export interface FluidGradientSeparatorProps {
  variant?: 'aurora' | 'prism' | 'horizon';
  intensity?: 'subtle' | 'medium';
  flipped?: boolean;
  className?: string;
}

const VARIANT_PALETTES = {
  aurora: {
    ribbonA:
      'from-transparent via-sky-400/30 via-45% to-transparent dark:via-sky-400/22',
    ribbonB:
      'from-transparent via-blue-500/25 via-55% to-transparent dark:via-blue-500/24',
    caustic:
      'bg-gradient-to-r from-cyan-300/25 via-blue-500/30 to-sky-300/20 dark:from-cyan-400/18 dark:via-blue-500/24 dark:to-indigo-400/16',
    strokeA: 'rgba(56, 189, 248, 0.36)',
    strokeB: 'rgba(37, 99, 235, 0.24)',
    ridge:
      'from-sky-300/75 via-blue-500/85 to-cyan-300/75 dark:from-cyan-300/60 dark:via-sky-400/80 dark:to-blue-400/60',
  },
  prism: {
    ribbonA:
      'from-transparent via-blue-400/28 via-45% to-transparent dark:via-indigo-400/24',
    ribbonB:
      'from-transparent via-cyan-400/26 via-55% to-transparent dark:via-cyan-400/20',
    caustic:
      'bg-gradient-to-r from-blue-400/22 via-indigo-400/26 to-cyan-300/24 dark:from-blue-500/20 dark:via-indigo-400/22 dark:to-cyan-400/18',
    strokeA: 'rgba(99, 102, 241, 0.28)',
    strokeB: 'rgba(14, 165, 233, 0.32)',
    ridge:
      'from-indigo-400/70 via-blue-500/85 to-cyan-300/75 dark:from-indigo-300/60 dark:via-sky-400/80 dark:to-cyan-300/60',
  },
  horizon: {
    ribbonA:
      'from-transparent via-white/65 via-50% to-transparent dark:via-sky-300/18',
    ribbonB:
      'from-transparent via-sky-300/30 via-50% to-transparent dark:via-blue-400/20',
    caustic:
      'bg-gradient-to-r from-white/50 via-sky-200/35 to-blue-300/25 dark:from-sky-400/14 dark:via-blue-500/20 dark:to-cyan-300/14',
    strokeA: 'rgba(255, 255, 255, 0.55)',
    strokeB: 'rgba(56, 189, 248, 0.28)',
    ridge:
      'from-white/90 via-sky-400/80 to-white/90 dark:from-sky-200/50 dark:via-cyan-300/75 dark:to-sky-200/50',
  },
} as const;

export const FluidGradientSeparator: React.FC<FluidGradientSeparatorProps> = ({
  variant = 'aurora',
  intensity = 'subtle',
  flipped = false,
  className = '',
}) => {
  const palette = VARIANT_PALETTES[variant];
  const opacityScale = intensity === 'medium' ? 'opacity-100' : 'opacity-85';

  return (
    <div
      aria-hidden="true"
      className={`relative w-full py-6 sm:py-8 overflow-hidden pointer-events-none select-none z-10 ${opacityScale} ${className}`}
    >
      {/* Feathered Atmospheric Fluid Ribbons */}
      <div
        className={`absolute inset-0 flex items-center justify-center ${
          flipped ? '-scale-x-100' : ''
        }`}
        style={{
          maskImage:
            'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.85) 20%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.85) 80%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.85) 20%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.85) 80%, transparent 100%)',
        }}
      >
        {/* Slow-drifting outer liquid gradient mist */}
        <div
          className={`fluid-sep-drift-a absolute w-[130%] max-w-[1440px] h-16 sm:h-20 rounded-full bg-gradient-to-r ${palette.ribbonA} blur-2xl`}
        />
        {/* Counter-drifting deeper azure core ribbon */}
        <div
          className={`fluid-sep-drift-b absolute w-[92%] max-w-[1040px] h-9 sm:h-12 rounded-full bg-gradient-to-r ${palette.ribbonB} blur-xl`}
        />
        {/* Subtle caustic refraction pocket */}
        <div
          className={`fluid-sep-caustic absolute w-[55%] max-w-[680px] h-7 rounded-full ${palette.caustic} blur-xl`}
        />

        {/* Delicate Flowing SVG Horizon Contours */}
        <svg
          className="absolute inset-x-0 w-full h-14 sm:h-16 opacity-65 dark:opacity-55"
          viewBox="0 0 1440 64"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0 34 C 260 12, 520 54, 720 32 C 920 10, 1180 50, 1440 28"
            stroke={palette.strokeA}
            strokeWidth="1.2"
          />
          <path
            d="M0 28 C 320 50, 580 14, 720 32 C 880 50, 1140 16, 1440 36"
            stroke={palette.strokeB}
            strokeWidth="1"
            strokeDasharray="6 6"
          />
        </svg>
      </div>

      {/* Optical Frosted Horizon Hairline + Travelling Specular Shimmer */}
      <div className="max-w-7xl mx-auto px-6 relative flex items-center justify-center">
        {/* Crisp 1px gradient glass seam */}
        <div className="relative w-full h-[1px] overflow-hidden rounded-full bg-gradient-to-r from-transparent via-white/90 to-transparent dark:via-sky-300/35 shadow-[0_1px_12px_rgba(56,189,248,0.22)]">
          <div className="fluid-sep-glint absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white dark:via-cyan-200/80 to-transparent" />
        </div>

        {/* Central Optical Liquid Lens Ridge */}
        <div className="absolute flex items-center justify-center">
          <div
            className={`h-[3px] w-24 sm:w-36 rounded-full bg-gradient-to-r ${palette.ridge} shadow-[0_0_18px_rgba(56,189,248,0.45),inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-md`}
          />
        </div>
      </div>
    </div>
  );
};
