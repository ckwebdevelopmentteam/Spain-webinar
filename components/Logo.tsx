import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const heightClasses = {
    sm: 'h-6 sm:h-7',
    md: 'h-7 sm:h-9',
    lg: 'h-8 sm:h-10 md:h-12',
  };

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src="/logo.png"
        alt="Sapain.Edu"
        className={`${heightClasses[size]} w-auto object-contain transition-opacity duration-300 hover:opacity-90`}
      />
    </div>
  );
};

export default Logo;
