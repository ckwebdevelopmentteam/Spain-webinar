'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

export interface Testimonial {
  quote: string;
  author: string;
  image: string;
  alt?: string;
}

export interface ScrollReelTestimonialsProps {
  testimonials: Testimonial[];
  charStaggerMs?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

const CELL_SIZE = 120;
const CELL_GAP = 8;
const STEP = 3 * (CELL_SIZE + CELL_GAP); // 384
const TEXT_EXIT_DURATION = 240;
const SCROLL_DURATION = 800;
const EASING = 'cubic-bezier(0.65, 0, 0.35, 1)';

const FEATURED_SHADOW =
  '0 1.008px 0.705px -0.563px rgba(0,0,0,0.18), 0 2.389px 1.672px -1.125px rgba(0,0,0,0.17), 0 4.357px 3.05px -1.688px rgba(0,0,0,0.17), 0 7.244px 5.07px -2.25px rgba(0,0,0,0.16), 0 11.698px 8.188px -2.813px rgba(0,0,0,0.15), 0 19.148px 13.404px -3.375px rgba(0,0,0,0.13), 0 32.972px 23.08px -3.938px rgba(0,0,0,0.09), 0 60px 42px -4.5px rgba(0,0,0,0.02), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(0,0,0,0.6)';

function Cell() {
  return (
    <div
      aria-hidden="true"
      className="shrink-0 rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] blur-[0.5px] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
      style={{ width: CELL_SIZE, height: CELL_SIZE }}
    />
  );
}

function Featured({ src, alt }: { src: string; alt?: string }) {
  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-xl bg-neutral-900 ring-1 ring-white/20"
      style={{ width: CELL_SIZE, height: CELL_SIZE, boxShadow: FEATURED_SHADOW }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt ?? ''}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] bg-white mix-blend-saturation opacity-20"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[3] blur-[6px] mix-blend-overlay"
        style={{
          background:
            'linear-gradient(220.99deg, rgba(108,92,255,0) 32%, rgb(108,92,255) 41%, rgb(173,177,255) 47%, rgba(130,189,237,0.57) 54%, rgba(130,189,237,0) 65%)',
        }}
      />
    </div>
  );
}

function AnimatedChars({
  text,
  startIndex,
  staggerMs,
}: {
  text: string;
  startIndex: number;
  staggerMs: number;
}) {
  let charIndex = startIndex;
  const words = text.split(' ');

  return (
    <>
      {words.map((word, wIdx) => {
        const wordSpan = (
          <span key={wIdx} className="inline-block whitespace-nowrap">
            {Array.from(word).map((char, cIdx) => {
              const delay = charIndex * staggerMs;
              charIndex++;
              return (
                <span
                  key={cIdx}
                  className="scroll-reel-char"
                  style={{ animationDelay: `${delay}ms` }}
                >
                  {char}
                </span>
              );
            })}
          </span>
        );
        if (wIdx < words.length - 1) charIndex++;
        return (
          <React.Fragment key={wIdx}>
            {wordSpan}
            {wIdx < words.length - 1 ? ' ' : null}
          </React.Fragment>
        );
      })}
    </>
  );
}

export function ScrollReelTestimonials({
  testimonials,
  charStaggerMs = 5,
  autoPlay = true,
  autoPlayInterval = 5000,
  className = '',
}: ScrollReelTestimonialsProps) {
  const [targetIndex, setTargetIndex] = useState(0);
  const [activeTextIndex, setActiveTextIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isTransitioningRef = useRef(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const count = testimonials.length;

  // Initialize transition capability after initial frame
  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsReady(true));
    });
    return () => {
      cancelAnimationFrame(handle);
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  const goToIndex = useCallback(
    (newIndex: number) => {
      if (isTransitioningRef.current || count === 0) return;
      isTransitioningRef.current = true;

      setTargetIndex(newIndex);
      setIsExiting(true);

      const t1 = setTimeout(() => {
        setActiveTextIndex(newIndex);
        setIsExiting(false);
      }, TEXT_EXIT_DURATION);

      const t2 = setTimeout(() => {
        isTransitioningRef.current = false;
      }, SCROLL_DURATION);

      timeoutsRef.current.push(t1, t2);
    },
    [count]
  );

  const handleStep = useCallback(
    (delta: number) => {
      if (isTransitioningRef.current || count === 0) return;
      const next = (targetIndex + delta + count) % count;
      goToIndex(next);
    },
    [targetIndex, count, goToIndex]
  );

  // Auto carousel timer
  useEffect(() => {
    if (!autoPlay || isHovered || count <= 1) return;

    const timer = setInterval(() => {
      handleStep(1);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [autoPlay, autoPlayInterval, isHovered, count, handleStep]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleStep(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handleStep(-1);
    }
  };

  // Build the middle reel sequence
  const middleReel = useMemo(() => {
    const items: Array<{ type: 'cell' } | { type: 'featured'; index: number }> = [];
    for (let i = 0; i < 3; i++) items.push({ type: 'cell' });
    testimonials.forEach((_, idx) => {
      items.push({ type: 'featured', index: idx });
      if (idx < count - 1) {
        items.push({ type: 'cell' }, { type: 'cell' });
      }
    });
    for (let i = 0; i < 3; i++) items.push({ type: 'cell' });
    return items;
  }, [testimonials, count]);

  const outerReelCount = 4 + 2 * count;
  const middleOffset = ((count - 1) / 2 - targetIndex) * STEP;
  const outerOffset = -middleOffset;

  const columnStyle = (offset: number) => ({
    transform: `translateY(${offset}px)`,
    transition: isReady ? `transform ${SCROLL_DURATION}ms ${EASING}` : 'none',
  });

  const current = testimonials[activeTextIndex] || testimonials[0];

  return (
    <>
      <style jsx global>{`
        @keyframes scroll-reel-char-rise {
          from {
            opacity: 0;
            transform: translateY(0.35em);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scroll-reel-exit {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-14px);
          }
        }
        .scroll-reel-char {
          opacity: 0;
          animation: 0.38s cubic-bezier(0.2, 0.8, 0.2, 1) both scroll-reel-char-rise;
          display: inline-block;
          transform: translateY(0.35em);
        }
        .scroll-reel-exit {
          animation: 0.22s ease-out forwards scroll-reel-exit;
        }
        .scroll-reel-exit .scroll-reel-char {
          animation: none;
        }
      `}</style>

      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Testimonials"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative flex w-full flex-col items-stretch gap-4 overflow-hidden rounded-3xl border border-white/10 bg-[#0c081e]/85 backdrop-blur-2xl shadow-[0_20px_70px_rgba(0,0,0,0.8)] outline-none focus-visible:ring-2 focus-visible:ring-white/30 md:min-h-[350px] lg:min-h-[370px] md:flex-row ${className}`}
      >
        {/* REEL VISUAL CONTAINER */}
        <div
          aria-hidden="true"
          className="relative h-56 sm:h-64 w-full shrink-0 self-stretch overflow-hidden md:h-auto md:w-[380px] lg:w-[410px]"
          style={{
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
            maskImage:
              'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
            WebkitMaskComposite: 'source-in',
            maskComposite: 'intersect',
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center gap-2">
            {/* Left Column (Outer Reel) */}
            <div
              className="flex shrink-0 flex-col gap-2 will-change-transform"
              style={columnStyle(outerOffset)}
            >
              {Array.from({ length: outerReelCount }).map((_, i) => (
                <Cell key={i} />
              ))}
            </div>

            {/* Middle Column (Center Featured Reel) */}
            <div
              className="flex shrink-0 flex-col gap-2 will-change-transform"
              style={columnStyle(middleOffset)}
            >
              {middleReel.map((item, i) =>
                item.type === 'featured' ? (
                  <Featured
                    key={i}
                    src={testimonials[item.index]?.image}
                    alt={testimonials[item.index]?.alt}
                  />
                ) : (
                  <Cell key={i} />
                )
              )}
            </div>

            {/* Right Column (Outer Reel) */}
            <div
              className="flex shrink-0 flex-col gap-2 will-change-transform"
              style={columnStyle(outerOffset)}
            >
              {Array.from({ length: outerReelCount }).map((_, i) => (
                <Cell key={i} />
              ))}
            </div>
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="flex min-w-0 flex-1 flex-col justify-between self-stretch px-6 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-8">
          <div className="flex flex-col gap-3">
            {/* Quote SVG Icon */}
            <svg
              className="block h-9 w-9 text-white/30"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M4.58 17.32C3.55 16.23 3 15 3 13.01c0-3.5 2.46-6.64 6.03-8.19l.9 1.38c-3.34 1.8-4 4.15-4.25 5.62.54-.28 1.24-.38 1.93-.31 1.8.17 3.23 1.65 3.23 3.49a3.5 3.5 0 0 1-3.5 3.5c-1.07 0-2.1-.49-2.75-1.18zm10 0C13.55 16.23 13 15 13 13.01c0-3.5 2.46-6.64 6.03-8.19l.9 1.38c-3.34 1.8-4 4.15-4.25 5.62.54-.28 1.24-.38 1.93-.31 1.8.17 3.23 1.65 3.23 3.49a3.5 3.5 0 0 1-3.5 3.5c-1.07 0-2.1-.49-2.75-1.18z" />
            </svg>

            {/* Testimonial Text with Character Rise Animation */}
            <div className="relative w-full max-w-3xl lg:max-w-4xl overflow-hidden" aria-live="polite">
              {/* Invisible layout placeholder to prevent height jump */}
              <div
                aria-hidden="true"
                className="invisible flex min-h-[95px] sm:min-h-[110px] flex-col gap-3 select-none"
              >
                <p className="m-0 text-base sm:text-lg lg:text-xl font-medium leading-[1.38] tracking-[-0.01em]">
                  {current?.quote}
                </p>
                <p className="m-0 text-xs sm:text-sm font-semibold text-neutral-300">
                  {current?.author}
                </p>
              </div>

              {/* Animated Text Block */}
              <div
                key={activeTextIndex}
                className={`absolute inset-x-0 top-0 flex flex-col gap-3 will-change-[transform,opacity] ${
                  isExiting ? 'scroll-reel-exit' : ''
                }`}
              >
                <p className="m-0 text-base sm:text-lg lg:text-xl font-medium leading-[1.38] tracking-[-0.01em] text-white">
                  <AnimatedChars
                    text={current?.quote ?? ''}
                    startIndex={0}
                    staggerMs={charStaggerMs}
                  />
                </p>
                <p className="m-0 text-xs sm:text-sm font-semibold text-neutral-300">
                  <AnimatedChars
                    text={current?.author ?? ''}
                    startIndex={(current?.quote?.length ?? 0) + 6}
                    staggerMs={charStaggerMs}
                  />
                </p>
              </div>
            </div>
          </div>

          {/* CONTROLS (Prev / Next & Dots) */}
          <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/10">
            {/* Pagination Dots */}
            <div className="flex items-center gap-1.5">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goToIndex(idx)}
                  aria-label={`Go to item ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    targetIndex === idx
                      ? 'w-7 bg-white shadow-[0_0_10px_rgba(255,255,255,0.6)]'
                      : 'w-1.5 bg-white/25 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleStep(-1)}
                aria-label="Previous item"
                className="grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-white/15 bg-white/5 p-0 text-white transition-[opacity,transform,background-color] duration-200 hover:bg-white/15 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <svg
                  className="h-3.5 w-3.5 opacity-80"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7.5 2.5 3.5 6l4 3.5" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => handleStep(1)}
                aria-label="Next item"
                className="grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-white/15 bg-white/5 p-0 text-white transition-[opacity,transform,background-color] duration-200 hover:bg-white/15 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <svg
                  className="h-3.5 w-3.5 opacity-80"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m4.5 2.5 4 3.5-4 3.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
