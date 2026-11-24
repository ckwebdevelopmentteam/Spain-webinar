'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ClaudeMarqueeProps {
  className?: string;
}

export function ClaudeMarquee({ className = '' }: ClaudeMarqueeProps) {
  const items = Array.from({ length: 8 });

  const renderMarqueeUnit = (keyPrefix: string) =>
    items.map((_, index) => (
      <div
        key={`${keyPrefix}-${index}`}
        className="flex items-center gap-3 sm:gap-4 shrink-0 group cursor-default"
      >
        {/* Leading Text matching logo optical height */}
        <span className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight text-white group-hover:text-white transition-colors duration-200 whitespace-nowrap font-sans flex items-center leading-none">
          Make Explainer Videos with
        </span>

        {/* Claude Official Logo */}
        <div className="relative flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/claude-logo-white.png"
            alt="Claude"
            className="h-6 sm:h-7 md:h-8 w-auto object-contain drop-shadow-[0_0_12px_rgba(217,119,87,0.35)]"
          />
        </div>

        {/* Glowing Terracotta Spark Divider */}
        <span
          aria-hidden="true"
          className="ml-3 sm:ml-5 text-[#D97757] text-base sm:text-lg font-bold select-none drop-shadow-[0_0_8px_rgba(217,119,87,0.8)] opacity-75"
        >
          ✦
        </span>
      </div>
    ));

  return (
    <section
      aria-label="Make Explainer Videos with Claude"
      className={`w-full relative overflow-hidden py-4 sm:py-5 bg-[#070512]/90 border-y border-white/10 backdrop-blur-md [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] select-none ${className}`}
    >
      <motion.div
        className="flex items-center gap-6 sm:gap-8 md:gap-10 w-max"
        animate={{
          x: ['0%', '-50%'],
        }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 22,
        }}
        whileHover={{ animationPlayState: 'paused' }}
      >
        {renderMarqueeUnit('primary')}
        {renderMarqueeUnit('duplicate')}
      </motion.div>
    </section>
  );
}
