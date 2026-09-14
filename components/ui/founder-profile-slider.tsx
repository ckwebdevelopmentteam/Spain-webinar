'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface FounderItem {
  name: string;
  role: string;
  bio: string;
  image: string;
  githubUrl?: string;
  twitterUrl?: string;
  youtubeUrl?: string;
  linkedinUrl?: string;
}

export interface FounderProfileSliderProps {
  founders: FounderItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

// 4 Exact Social Icons matching the screenshot
const GithubIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const TwitterIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);

const YoutubeIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const LinkedinIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

export function FounderProfileSlider({
  founders,
  autoPlay = true,
  autoPlayInterval = 5000,
  className = '',
}: FounderProfileSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const count = founders?.length || 0;

  const handleNext = useCallback(() => {
    if (count <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % count);
  }, [count]);

  const handlePrev = useCallback(() => {
    if (count <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + count) % count);
  }, [count]);

  // Auto carousel cycling
  useEffect(() => {
    if (!autoPlay || isHovered || count <= 1) return;
    const timer = setInterval(() => {
      handleNext();
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlay, autoPlayInterval, isHovered, count, handleNext]);

  if (!founders || founders.length === 0) {
    return null;
  }

  const current = founders[currentIndex] || founders[0];

  const socialLinks = [
    { icon: GithubIcon, url: current.githubUrl || 'https://github.com', label: 'GitHub' },
    { icon: TwitterIcon, url: current.twitterUrl || 'https://twitter.com', label: 'Twitter' },
    { icon: YoutubeIcon, url: current.youtubeUrl || 'https://youtube.com', label: 'YouTube' },
    { icon: LinkedinIcon, url: current.linkedinUrl || 'https://linkedin.com', label: 'LinkedIn' },
  ];

  return (
    <div
      className={`w-full max-w-5xl mx-auto px-4 select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* DESKTOP VIEW: Overlapping layout exactly like screenshot */}
      <div className="hidden md:flex relative items-center justify-center min-h-[460px]">
        {/* Left Side: Large Portrait Image Card */}
        <div className="w-[380px] h-[380px] lg:w-[430px] lg:h-[430px] rounded-[32px] overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl shrink-0 flex items-center justify-center relative">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={current.image}
              alt={current.name}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="w-full h-full object-cover object-top"
              draggable={false}
            />
          </AnimatePresence>
        </div>

        {/* Right Side: Floating Profile Info Card with White Background */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="bg-white rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.18)] p-8 lg:p-10 -ml-16 lg:-ml-24 z-10 max-w-md lg:max-w-lg shrink-0 flex flex-col justify-center"
          >
            {/* Founder Name */}
            <h3 className="text-2xl lg:text-[26px] font-bold text-[#0F172A] tracking-tight mb-1">
              {current.name}
            </h3>

            {/* Role / Subtitle */}
            <p className="text-xs sm:text-sm font-semibold text-slate-500 mb-4">
              {current.role}
            </p>

            {/* Testimonial / Bio Description */}
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
              {current.bio}
            </p>

            {/* Row of 4 Circular Social Icon Buttons */}
            <div className="flex items-center space-x-3">
              {socialLinks.map(({ icon: Icon, url, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-md"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* MOBILE VIEW: Clean stacked card */}
      <div className="md:hidden max-w-sm mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            {/* Portrait Image */}
            <div className="w-full aspect-square bg-neutral-900 border border-white/10 rounded-[24px] overflow-hidden mb-4 shadow-xl flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={current.image}
                alt={current.name}
                className="w-full h-full object-cover object-top"
                draggable={false}
              />
            </div>

            {/* Info Card */}
            <div className="w-full bg-white rounded-[24px] p-6 text-left shadow-xl">
              <h3 className="text-xl font-bold text-[#0F172A] mb-1">
                {current.name}
              </h3>
              <p className="text-xs font-semibold text-slate-500 mb-3">
                {current.role}
              </p>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5">
                {current.bio}
              </p>
              <div className="flex items-center space-x-2.5">
                {socialLinks.map(({ icon: Icon, url, label }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-full flex items-center justify-center transition-all shadow-sm"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* BOTTOM CONTROLS: Arrow Left, Dots, Arrow Right */}
      <div className="mt-8 sm:mt-10 flex items-center justify-center gap-4">
        {/* Prev Arrow */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous profile"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-slate-50 border border-slate-200/80 shadow-sm flex items-center justify-center text-slate-700 transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
        </button>

        {/* Pagination Dots */}
        <div className="flex items-center gap-2 px-1">
          {founders.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx
                  ? 'w-2.5 h-2.5 bg-[#0F172A]'
                  : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

        {/* Next Arrow */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next profile"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-slate-50 border border-slate-200/80 shadow-sm flex items-center justify-center text-slate-700 transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
        </button>
      </div>
    </div>
  );
}
