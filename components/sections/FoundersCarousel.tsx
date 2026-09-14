'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { webinarData } from '@/data/webinarData';

// Social Icon SVGs
const LinkedinIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const TwitterIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);

const GithubIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

interface FounderCardItem {
  type: 'photo' | 'quote';
  id: string;
  name: string;
  role: string;
  image: string;
  bio?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  githubUrl?: string;
}

export function FoundersCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Generate alternating Photo and Quote/Bio cards for each founder
  const cards: FounderCardItem[] = [];
  webinarData.founders.forEach((founder, idx) => {
    // 1. Photo Card
    cards.push({
      type: 'photo',
      id: `founder-photo-${idx}`,
      name: founder.name,
      role: founder.role,
      image: founder.image,
      linkedinUrl: 'https://linkedin.com',
    });

    // 2. Quote / Bio Card
    cards.push({
      type: 'quote',
      id: `founder-bio-${idx}`,
      name: founder.name,
      role: founder.role,
      image: founder.image,
      bio: founder.bio,
      linkedinUrl: 'https://linkedin.com',
      twitterUrl: 'https://twitter.com',
      githubUrl: 'https://github.com',
    });
  });

  const getCardWidth = useCallback(() => {
    if (!scrollRef.current || !scrollRef.current.firstElementChild) return 320;
    const firstCard = scrollRef.current.firstElementChild as HTMLElement;
    return firstCard.offsetWidth + 24; // width + gap-6 (24px)
  }, []);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft } = scrollRef.current;
    const cardWidth = getCardWidth();
    const index = Math.round(scrollLeft / cardWidth);
    setCurrentIndex(Math.min(Math.max(index, 0), cards.length - 1));
  };

  const scrollToIndex = (idx: number) => {
    if (!scrollRef.current) return;
    const cardWidth = getCardWidth();
    scrollRef.current.scrollTo({
      left: idx * cardWidth,
      behavior: 'smooth'
    });
    setCurrentIndex(idx);
  };

  const handlePrev = () => {
    if (!scrollRef.current) return;
    const cardWidth = getCardWidth();
    scrollRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  };

  const handleNext = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const cardWidth = getCardWidth();

    // If reached end, smoothly loop back to start
    if (scrollLeft + clientWidth >= scrollWidth - 20) {
      scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      setCurrentIndex(0);
    } else {
      scrollRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  }, [getCardWidth]);

  // Automatic Carousel Autoplay (cycles every 3.5s, pauses on hover)
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      handleNext();
    }, 3500);

    return () => clearInterval(interval);
  }, [isHovered, handleNext]);

  return (
    <section
      id="founders"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="py-20 md:py-28 bg-[#050505] border-t border-white/10 relative overflow-hidden select-none"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-12">

        {/* Section Header (Matches 21st reference, View all testimonials button removed) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3 text-left">
            <span className="text-xs uppercase tracking-widest font-semibold text-neutral-400 block">
              LEADERSHIP &amp; VISION
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white leading-tight">
              Meet the Founders
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed pt-1">
              The creative entrepreneurs, business leaders, and educators steering Sapain&apos;s pioneering AI journey.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <button
              onClick={handlePrev}
              aria-label="Previous founder"
              className="w-10 h-10 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 disabled:opacity-30 flex items-center justify-center text-white transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next founder"
              className="w-10 h-10 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 disabled:opacity-30 flex items-center justify-center text-white transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Track */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-3 sm:gap-5 lg:gap-6 overflow-x-auto scrollbar-none pb-6 pt-2 snap-x snap-mandatory -mx-3 px-3 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {cards.map((item) => {
            if (item.type === 'photo') {
              return (
                <div
                  key={item.id}
                  className="w-[calc(50%-6px)] sm:w-[calc(50%-10px)] lg:w-[calc(25%-18px)] shrink-0 h-[340px] sm:h-[400px] lg:h-[430px] rounded-2xl sm:rounded-3xl overflow-hidden relative shadow-2xl border border-white/15 group snap-start bg-neutral-900"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent pointer-events-none" />

                  {/* Info & LinkedIn Button */}
                  <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5 flex items-end justify-between z-10 text-left">
                    <div className="space-y-0.5 max-w-[72%]">
                      <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-white tracking-tight leading-tight">
                        {item.name}
                      </h4>
                      <p className="text-[10px] sm:text-xs text-neutral-300 font-normal truncate">
                        {item.role}
                      </p>
                    </div>

                    {/* Circular Frosted Glass LinkedIn Button */}
                    <a
                      href={item.linkedinUrl || 'https://linkedin.com'}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${item.name} LinkedIn`}
                      className="w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-md border border-white/40 flex items-center justify-center text-white transition-all shadow-xl hover:scale-110 cursor-pointer shrink-0"
                    >
                      <LinkedinIcon className="w-4 h-4 text-white" />
                    </a>
                  </div>
                </div>
              );
            }

            // Quote / Bio Testimonial-Style Card
            return (
              <div
                key={item.id}
                className="w-[calc(50%-6px)] sm:w-[calc(50%-10px)] lg:w-[calc(25%-18px)] shrink-0 h-[340px] sm:h-[400px] lg:h-[430px] rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 lg:p-7 flex flex-col justify-between shadow-2xl border border-white/15 bg-white/[0.04] backdrop-blur-md group hover:border-white/25 transition-all snap-start text-left"
              >
                {/* Large Quote Icon matching reference */}
                <div className="flex items-center justify-between">
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 lg:w-9 lg:h-9 text-neutral-400 fill-current opacity-80"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M4.58 17.32C3.55 16.23 3 15 3 13.01c0-3.5 2.46-6.64 6.03-8.19l.9 1.38c-3.34 1.8-4 4.15-4.25 5.62.54-.28 1.24-.38 1.93-.31 1.8.17 3.23 1.65 3.23 3.49a3.5 3.5 0 0 1-3.5 3.5c-1.07 0-2.1-.49-2.75-1.18zm10 0C13.55 16.23 13 15 13 13.01c0-3.5 2.46-6.64 6.03-8.19l.9 1.38c-3.34 1.8-4 4.15-4.25 5.62.54-.28 1.24-.38 1.93-.31 1.8.17 3.23 1.65 3.23 3.49a3.5 3.5 0 0 1-3.5 3.5c-1.07 0-2.1-.49-2.75-1.18z" />
                  </svg>

                  {/* Social Buttons */}
                  <div className="flex items-center gap-1 sm:gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                    <a
                      href={item.linkedinUrl || 'https://linkedin.com'}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
                    >
                      <LinkedinIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </a>
                    <a
                      href={item.twitterUrl || 'https://twitter.com'}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Twitter"
                      className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
                    >
                      <TwitterIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </a>
                    <a
                      href={item.githubUrl || 'https://github.com'}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
                    >
                      <GithubIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Bio Quote Body */}
                <p className="text-[11px] sm:text-xs lg:text-[13.5px] leading-relaxed text-neutral-200 font-normal my-auto pt-1.5 overflow-y-auto max-h-[160px] sm:max-h-[200px] scrollbar-none">
                  &ldquo;{item.bio}&rdquo;
                </p>

                {/* Author Row */}
                <div className="flex items-center gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-7 h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full object-cover object-top border border-white/20 shadow-md shrink-0"
                  />
                  <div className="leading-tight truncate">
                    <h4 className="text-xs sm:text-sm font-semibold text-white tracking-tight truncate">
                      {item.name}
                    </h4>
                    <span className="text-[10px] sm:text-xs text-neutral-400 block mt-0.5 truncate">
                      {item.role}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-2 pt-6">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === currentIndex
                  ? 'w-7 bg-white'
                  : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default FoundersCarousel;
