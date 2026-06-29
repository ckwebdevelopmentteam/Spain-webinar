import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', showText = true, size = 'md' }) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl',
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Hypnotic Swirl Icon */}
      <div className="relative flex items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${iconSizes[size]} text-obsidian`}
        >
          {/* Main Spiral Path */}
          <path
            d="M52 50C52 47.7909 50.2091 46 48 46C44.6863 46 42 48.6863 42 52C42 56.4183 45.5817 60 50 60C56.6274 60 62 54.6274 62 48C62 39.1634 54.8366 32 46 32C34.9543 32 26 40.9543 26 52C26 65.2548 36.7452 76 50 76C65.464 76 78 63.464 78 48C78 30.3269 63.6731 16 46 16C26.1177 16 10 32.1177 10 52C10 74.0914 27.9086 92 50 92C55.5 92 60.5 91 65 89.2"
            stroke="currentColor"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* Accent dot/leaf at the bottom right */}
          <rect
            x="74"
            y="74"
            width="12"
            height="12"
            rx="3"
            transform="rotate(15 74 74)"
            fill="#7F00FF"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col justify-center leading-none">
          <span className={`font-display font-bold text-obsidian tracking-tight ${textSizes[size]}`}>
            sə.p<span className="text-violet-accent">A</span>in
          </span>
          {size !== 'sm' && (
            <span className="text-[9px] uppercase tracking-[0.15em] text-silver font-sans mt-0.5 opacity-80">
              where human start to evolve..
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;
