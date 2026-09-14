'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react';

interface VideoTestimonial {
  type: 'video';
  id: string;
  name: string;
  role: string;
  thumbnail: string;
  videoSrc: string;
}

interface QuoteTestimonial {
  type: 'quote';
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
}

type TestimonialItem = VideoTestimonial | QuoteTestimonial;

const TESTIMONIAL_ITEMS: TestimonialItem[] = [
  {
    type: 'video',
    id: 't-vid-1',
    name: 'Michael Harris',
    role: 'Frontend Development Student',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    videoSrc: '/sapain testimonial .mp4'
  },
  {
    type: 'quote',
    id: 't-quote-1',
    name: 'Michael Harris',
    role: 'Frontend Development Student',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
    quote:
      'I enrolled to improve my fundamentals, but the structured lessons and real examples helped me understand concepts much faster than I expected. This approach made learning both engaging and effective.'
  },
  {
    type: 'video',
    id: 't-vid-2',
    name: 'Ethan Walker',
    role: 'Software Development Student',
    thumbnail: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
    videoSrc: '/sapain testimonial 2.mp4'
  },
  {
    type: 'quote',
    id: 't-quote-2',
    name: 'Olivia Vance',
    role: 'M.Sc. Creative Technologies Student',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200&auto=format&fit=crop',
    quote:
      'The instructors explain complex generative AI concepts and scene consistency in a very approachable way. Being able to build production-ready storyboards and videos transformed my workflow completely.'
  },
  {
    type: 'video',
    id: 't-vid-3',
    name: 'Sophia Chen',
    role: 'AI Video Directing Student',
    thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    videoSrc: '/sapain testimonial .mp4'
  },
  {
    type: 'quote',
    id: 't-quote-3',
    name: 'David Miller',
    role: 'Digital Content Creator',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
    quote:
      'From prompt structuring to final camera motion and upscaling, the pipelines shared here saved me weeks of trial and error. The live demonstrations alone were worth every minute.'
  },
  {
    type: 'video',
    id: 't-vid-4',
    name: 'Arjun Patel',
    role: 'Visual Effects Artist',
    thumbnail: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop',
    videoSrc: '/sapain testimonial 2.mp4'
  },
  {
    type: 'quote',
    id: 't-quote-4',
    name: 'Ananya Roy',
    role: 'Advertising Art Director',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    quote:
      'I was able to apply these AI directing workflows straight into client presentations the following week. It gave our agency a massive edge in creative ideation speed.'
  }
];

export function LearnerTestimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState<VideoTestimonial | null>(null);

  // Update active index on scroll
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft } = scrollRef.current;
    const cardWidth = 340;
    const index = Math.round(scrollLeft / cardWidth);
    setCurrentIndex(Math.min(Math.max(index, 0), TESTIMONIAL_ITEMS.length - 1));
  };

  const scrollToIndex = (idx: number) => {
    if (!scrollRef.current) return;
    const cardWidth = 340;
    scrollRef.current.scrollTo({
      left: idx * cardWidth,
      behavior: 'smooth'
    });
    setCurrentIndex(idx);
  };

  const handlePrev = () => {
    scrollToIndex(Math.max(currentIndex - 1, 0));
  };

  const handleNext = () => {
    scrollToIndex(Math.min(currentIndex + 1, TESTIMONIAL_ITEMS.length - 1));
  };

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-[#050505] border-y border-white/10 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header (Matches 21st reference) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3 text-left">
            <span className="text-xs uppercase tracking-widest font-semibold text-neutral-400 block">
              TESTIMONIAL
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white leading-tight">
              What Our Learners Say About Their Experience
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed pt-1">
              Real feedback from students who&apos;ve learned new skills and grown with our courses. Their success stories inspire others to join and thrive.
            </p>

            <a
              href="#faqs"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/15 border border-white/15 text-white font-medium text-xs sm:text-sm transition-all shadow-md mt-4 cursor-pointer group"
            >
              <span>View all testimonials</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Navigation Arrows */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-white transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= TESTIMONIAL_ITEMS.length - 1}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-white transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Track */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-5 sm:gap-6 overflow-x-auto scrollbar-none pb-6 pt-2 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {TESTIMONIAL_ITEMS.map((item) => {
            if (item.type === 'video') {
              return (
                <div
                  key={item.id}
                  className="w-[280px] sm:w-[320px] md:w-[340px] h-[400px] sm:h-[440px] shrink-0 rounded-3xl overflow-hidden relative shadow-2xl border border-white/15 group snap-start bg-neutral-900"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

                  {/* Info & Play Button */}
                  <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between z-10 text-left">
                    <div className="space-y-0.5 max-w-[70%]">
                      <h4 className="text-base font-semibold text-white tracking-tight">
                        {item.name}
                      </h4>
                      <p className="text-xs text-neutral-300 font-normal truncate">
                        {item.role}
                      </p>
                    </div>

                    {/* Circular Play Button matching reference */}
                    <button
                      type="button"
                      onClick={() => setActiveVideo(item)}
                      aria-label={`Play video testimonial from ${item.name}`}
                      className="w-11 h-11 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-md border border-white/40 flex items-center justify-center text-white transition-all shadow-xl hover:scale-110 cursor-pointer"
                    >
                      <Play className="w-5 h-5 fill-white stroke-none translate-x-0.5" />
                    </button>
                  </div>
                </div>
              );
            }

            // Quote Testimonial Card
            return (
              <div
                key={item.id}
                className="w-[280px] sm:w-[320px] md:w-[340px] h-[400px] sm:h-[440px] shrink-0 rounded-3xl p-7 flex flex-col justify-between shadow-2xl border border-white/15 bg-white/[0.04] backdrop-blur-md group hover:border-white/25 transition-all snap-start text-left"
              >
                {/* Large Quote Icon matching reference */}
                <div>
                  <svg
                    className="w-9 h-9 text-neutral-400 fill-current opacity-80"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M4.58 17.32C3.55 16.23 3 15 3 13.01c0-3.5 2.46-6.64 6.03-8.19l.9 1.38c-3.34 1.8-4 4.15-4.25 5.62.54-.28 1.24-.38 1.93-.31 1.8.17 3.23 1.65 3.23 3.49a3.5 3.5 0 0 1-3.5 3.5c-1.07 0-2.1-.49-2.75-1.18zm10 0C13.55 16.23 13 15 13 13.01c0-3.5 2.46-6.64 6.03-8.19l.9 1.38c-3.34 1.8-4 4.15-4.25 5.62.54-.28 1.24-.38 1.93-.31 1.8.17 3.23 1.65 3.23 3.49a3.5 3.5 0 0 1-3.5 3.5c-1.07 0-2.1-.49-2.75-1.18z" />
                  </svg>
                </div>

                {/* Quote Body */}
                <p className="text-sm sm:text-[15px] leading-relaxed text-neutral-200 font-normal my-auto pt-2">
                  &ldquo;{item.quote}&rdquo;
                </p>

                {/* Author Row */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover border border-white/20 shadow-md"
                  />
                  <div className="leading-tight">
                    <h4 className="text-sm font-semibold text-white tracking-tight">
                      {item.name}
                    </h4>
                    <span className="text-xs text-neutral-400 block mt-0.5">
                      {item.role}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination Dots matching reference */}
        <div className="flex justify-center items-center gap-2 pt-6">
          {TESTIMONIAL_ITEMS.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === currentIndex
                  ? 'w-7 bg-white'
                  : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

      </div>

      {/* Video Lightbox Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideo(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-neutral-950 rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[9/16] sm:aspect-video w-full bg-black">
                <video
                  src={activeVideo.videoSrc}
                  autoPlay
                  controls
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-5 border-t border-white/10 flex items-center justify-between text-left">
                <div>
                  <h4 className="text-base font-semibold text-white">{activeVideo.name}</h4>
                  <p className="text-xs text-neutral-400">{activeVideo.role}</p>
                </div>
                <span className="text-xs font-mono text-neutral-400 bg-white/10 px-2.5 py-1 rounded-full border border-white/10">
                  Student Story
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
