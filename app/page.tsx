'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock, MapPin, Sparkles, Palette, Film,
  GraduationCap, Briefcase, Share2, Terminal, ArrowRight, ChevronDown,
  Check, Play, Pause, Volume2, VolumeX, Users,
  Globe, CheckCircle2, BookOpen, Video
} from 'lucide-react';
import { Logo } from '../components/Logo';
import { RegistrationModal } from '../components/RegistrationModal';
import { webinarData } from '../data/webinarData';
import { FoundersCarousel } from '@/components/sections/FoundersCarousel';
import {
  HeroLogosBanner,
  ChatGptLogo,
  HiggsfieldLogo,
  SeedanceLogo,
  MinimaxLogo,
  OmniFlashLogo,
  MagnificLogo
} from '@/components/sections/HeroLogosBanner';

// Helper to return the official AI tool logo
const getToolIcon = (name: string, sizeClass = 'w-14 h-14 sm:w-16 sm:h-16') => {
  if (name.includes('ChatGPT Image')) {
    return <ChatGptLogo className={`${sizeClass} text-white shrink-0`} />;
  }
  if (name.includes('ChatGPT')) {
    return <ChatGptLogo className={`${sizeClass} text-white shrink-0`} />;
  }
  if (name.includes('Higgsfield')) {
    return <HiggsfieldLogo className={`${sizeClass} shrink-0`} />;
  }
  if (name.includes('Seedance')) {
    return <SeedanceLogo className={`${sizeClass} shrink-0`} />;
  }
  if (name.includes('Minimax')) {
    return <MinimaxLogo className={`${sizeClass} shrink-0`} />;
  }
  if (name.includes('Omni Flash')) {
    return <OmniFlashLogo className={`${sizeClass} shrink-0`} />;
  }
  if (name.includes('Magnific')) {
    return <MagnificLogo className={`${sizeClass} shrink-0`} />;
  }
  return (
    <div className={`${sizeClass} flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform duration-300`}>
      <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-neutral-300" />
    </div>
  );
};

// Custom LinkedIn Icon SVG
const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Custom Instagram Icon SVG
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

// Custom YouTube Icon SVG
const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
  </svg>
);

// Custom WhatsApp Icon SVG
const WhatsappIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const testimonials = [
  {
    src: "/sapain testimonial .mp4",
    thumbnail: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop"
  },
  {
    src: "/sapain testimonial 2.mp4",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"
  },
  {
    src: "/sapain testimonial .mp4",
    thumbnail: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600&auto=format&fit=crop"
  },
  {
    src: "/sapain testimonial 2.mp4",
    thumbnail: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop"
  },
  {
    src: "/sapain testimonial .mp4",
    thumbnail: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop"
  }
];

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [isHeroMuted, setIsHeroMuted] = useState(true);

  const toggleHeroMute = () => {
    if (heroVideoRef.current) {
      heroVideoRef.current.muted = !isHeroMuted;
      setIsHeroMuted(!isHeroMuted);
    }
  };

  // Tab States for About Section
  const [activeTab, setActiveTab] = useState<'info' | 'curriculum'>('info');
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);

  // Testimonials Slider State
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isTestimonialMuted, setIsTestimonialMuted] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-cycle the Video Testimonials active card every 6 seconds
  useEffect(() => {
    if (!isTestimonialMuted) return;
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isTestimonialMuted]);

  const openEnrollModal = (lang = 'English') => {
    setSelectedLanguage(lang);
    setIsModalOpen(true);
  };

  const getAudienceIcon = (iconName: string) => {
    const iconProps = { className: "w-5 h-5 text-[#F2F2F2]" };
    switch (iconName) {
      case 'Sparkles': return <Sparkles {...iconProps} />;
      case 'Terminal': return <Terminal {...iconProps} />;
      case 'Share2': return <Share2 {...iconProps} />;
      case 'Briefcase': return <Briefcase {...iconProps} />;
      case 'GraduationCap': return <GraduationCap {...iconProps} />;
      case 'Film': return <Film {...iconProps} />;
      case 'Palette': return <Palette {...iconProps} />;
      default: return <Sparkles {...iconProps} />;
    }
  };



  return (
    <div className="relative min-h-screen bg-[#000000] font-sans text-[#F2F2F2] overflow-x-hidden selection:bg-white selection:text-black">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-radial-glow-top -z-10 pointer-events-none" />
      <div className="absolute top-[1200px] left-[-200px] w-[600px] h-[600px] bg-radial-glow -z-10 pointer-events-none opacity-40" />
      <div className="absolute top-[2800px] right-[-200px] w-[600px] h-[600px] bg-radial-glow -z-10 pointer-events-none opacity-40" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern -z-20 pointer-events-none opacity-30" />

      {/* HEADER / NAVIGATION - Fixed throughout the website */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-white/10 bg-[#000000]/85 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Logo size="md" />

          {/* CTA Button */}
          <button
            onClick={() => openEnrollModal('English')}
            className="glow-button px-5 py-2.5 bg-[#F2F2F2] text-[#000000] hover:bg-white font-medium text-xs rounded-xl transition-all shadow-lg hover:shadow-white/20 cursor-pointer"
          >
            <span>Reserve Seat • ₹{webinarData.fee}</span>
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section ref={heroRef} className="relative pt-24 pb-8 md:pt-32 md:pb-12 overflow-hidden bg-[#0c071e]">
        {/* Ambient atmospheric lighting behind doodle */}
        <div className="absolute top-1/4 left-1/4 w-[550px] h-[550px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-violet-900/25 via-transparent to-black/80 pointer-events-none" />

        {/* Dedicated Hero Doodle Pattern (Rectangle-5165) */}
        <div
          className="absolute inset-0 bg-repeat bg-top pointer-events-none opacity-30"
          style={{
            backgroundImage: "url('/Rectangle-5165.png')",
            backgroundSize: "auto 320px",
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 65%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 65%, transparent 100%)"
          }}
        />

        {/* Bottom smooth edge blend into next section */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#000000] to-transparent pointer-events-none" />

        <div className="mx-auto max-w-[1680px] px-4 sm:px-6 lg:px-10 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">

            {/* Content Column (First on desktop, Second on mobile) */}
            <div className="order-2 lg:order-1 lg:col-span-5 w-full text-left space-y-6">

              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-medium tracking-tight text-[#F2F2F2] leading-[1.12]"
              >
                {webinarData.title}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-sm sm:text-base md:text-lg text-neutral-300 leading-relaxed font-normal"
              >
                {webinarData.subtitle}
              </motion.p>

              {/* Quick Info Badges (Hidden on small screens) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="hidden sm:flex flex-wrap items-center gap-3 pt-1"
              >
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl text-xs font-normal text-[#F2F2F2]">
                  <Clock className="w-4 h-4 text-white" />
                  <span>3-Hour Practical Workshop</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl text-xs font-normal text-[#F2F2F2]">
                  <Video className="w-4 h-4 text-white" />
                  <span>Live Online on Zoom</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl text-xs font-normal text-[#F2F2F2]">
                  <MapPin className="w-4 h-4 text-white" />
                  <span>Join from Anywhere</span>
                </div>
              </motion.div>

              {/* Pricing & CTA Button (Side-by-side on mobile and desktop) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="pt-2 flex flex-row items-center justify-between sm:justify-start gap-3 sm:gap-6 flex-wrap"
              >
                {/* Highlighted Pricing Container */}
                <div className="shrink-0 px-4 py-2.5 rounded-2xl bg-white/[0.08] border border-white/20 backdrop-blur-md shadow-[0_0_30px_rgba(139,92,246,0.3)] flex flex-col justify-center">
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-300 font-medium block">
                    Join for just
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                      ₹{webinarData.fee}
                    </span>
                    <span className="text-xs sm:text-sm text-neutral-400 line-through decoration-neutral-500">
                      ₹{webinarData.originalFee}
                    </span>
                    <span className="text-[10px] sm:text-xs font-bold text-black bg-gradient-to-r from-emerald-400 to-green-300 px-2 py-0.5 rounded-md shadow-sm uppercase tracking-wide">
                      90% Off
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => openEnrollModal('English')}
                  className="px-5 sm:px-8 py-3 sm:py-3.5 bg-[#F2F2F2] hover:bg-white text-[#000000] font-medium text-xs sm:text-sm rounded-xl shadow-xl hover:shadow-white/20 hover:scale-[1.01] transition-all flex items-center gap-2 cursor-pointer tracking-normal shrink-0 whitespace-nowrap"
                >
                  <span>Reserve Your Seat</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </motion.div>

              {/* Social Proof Quote */}
              <div className="flex items-center gap-2.5 text-xs text-neutral-400 pt-2">
                <Users className="w-4 h-4 text-white" />
                <span>{webinarData.learnersCount}</span>
              </div>

            </div>

            {/* Video Column (Second on desktop, First on mobile, Large Size preserved) */}
            <div className="order-1 lg:order-2 lg:col-span-7 w-full relative flex flex-col items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl group shadow-2xl border border-white/10"
              >
                <video
                  ref={heroVideoRef}
                  src="https://res.cloudinary.com/jzw4lrot/video/upload/v1789378441/SAPAIN-_LANDING_PAGE_VIDEO_cmp.mp4"
                  autoPlay
                  loop
                  muted={isHeroMuted}
                  playsInline
                  className="w-full h-auto object-cover aspect-video rounded-2xl sm:rounded-3xl"
                />

                {/* Mute / Unmute Floating Toggle */}
                <button
                  type="button"
                  onClick={toggleHeroMute}
                  aria-label={isHeroMuted ? "Unmute video" : "Mute video"}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-black/65 hover:bg-black/85 backdrop-blur-md border border-white/20 text-white transition-all hover:scale-105 cursor-pointer z-10"
                >
                  {isHeroMuted ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
              </motion.div>
            </div>

          </div>
        </div>

        {/* FULL VIEWPORT WIDTH AI LOGOS CAROUSEL */}
        <div className="mt-2 sm:mt-4 w-full">
          <HeroLogosBanner />
        </div>
      </section>

      {/* COURSE OVERVIEW & DETAILS SECTION */}
      <section id="about" className="py-14 md:py-24 border-b border-white/10 bg-[#000000] relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

            {/* Left Content Area: Video & Tab Info */}
            <div className="lg:col-span-2 space-y-8">

              {/* Workshop Cover Image (Static Preview, No Video, No Redirect) */}
              <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black aspect-video shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/youtube_cover.jpg"
                  alt="Sapain AI Masterclass"
                  className="w-full h-full object-cover select-none pointer-events-none"
                />
              </div>

              {/* Tabs Navigation */}
              <div className="border-b border-white/10 flex gap-6 text-sm font-medium">
                <button
                  onClick={() => setActiveTab('info')}
                  className={`pb-4 transition-all border-b-2 cursor-pointer ${
                    activeTab === 'info'
                      ? 'border-white text-white'
                      : 'border-transparent text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  About Course
                </button>
                <button
                  onClick={() => setActiveTab('curriculum')}
                  className={`pb-4 transition-all border-b-2 cursor-pointer ${
                    activeTab === 'curriculum'
                      ? 'border-white text-white'
                      : 'border-transparent text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  What&apos;s Included
                </button>
              </div>

              {/* Tab Content: About Course Verbatim from PDF Page 1 & 2 */}
              <div className="min-h-[220px]">
                {activeTab === 'info' ? (
                  <div className="space-y-5 text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
                    <h3 className="text-xl sm:text-2xl font-medium text-white">
                      Sapain Advanced AI Image & Cinematic Video Generation Masterclass
                    </h3>

                    <p className="text-neutral-300 border-l-2 border-white pl-4 italic bg-white/5 py-3 pr-3 rounded-r-xl">
                      &ldquo;{webinarData.aboutCourse.lead}&rdquo;
                    </p>

                    <p>{webinarData.aboutCourse.description}</p>
                    <p>{webinarData.aboutCourse.audienceSummary}</p>

                    <AnimatePresence>
                      {isAboutExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-4 pt-2 border-t border-white/10"
                        >
                          <p>{webinarData.aboutCourse.toolHighlight}</p>
                          <p className="font-semibold text-white">
                            {webinarData.aboutCourse.outcomeSummary}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button
                      onClick={() => setIsAboutExpanded(!isAboutExpanded)}
                      className="text-xs sm:text-sm font-medium tracking-normal text-white hover:text-neutral-300 transition-colors flex items-center gap-1.5 cursor-pointer pt-1"
                    >
                      <span>{isAboutExpanded ? 'Show Less' : 'Read Full Overview'}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isAboutExpanded ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <h3 className="text-xl sm:text-2xl font-medium text-white">
                      What&apos;s Included in This 3-Hour Workshop
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {webinarData.whatsIncluded.map((item, idx) => (
                        <div key={idx} className="glass-panel p-4 rounded-xl flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-white">
                            <Check className="w-4 h-4" />
                          </div>
                          <span className="text-sm text-neutral-200 font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Right Sticky Sidebar */}
            <div className="lg:sticky lg:top-24 space-y-6">

              {/* Pricing Card */}
              <div className="glass-premium p-6 rounded-3xl space-y-6">
                <div className="space-y-1.5">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-semibold text-white">₹{webinarData.fee}.00</span>
                    <span className="text-sm text-neutral-500 line-through">₹{webinarData.originalFee}.00</span>
                  </div>
                  <span className="text-xs text-neutral-400 block font-semibold">
                    Enrollment validity: Full Lifetime Access
                  </span>
                </div>

                <button
                  onClick={() => openEnrollModal('English')}
                  className="w-full py-3.5 bg-[#F2F2F2] hover:bg-white text-[#000000] font-medium text-sm rounded-xl transition-all shadow-lg hover:shadow-white/20 hover:scale-[1.01] cursor-pointer text-center tracking-normal block"
                >
                  Enroll Now • ₹{webinarData.fee}
                </button>

                <div className="space-y-3 pt-6 border-t border-white/10 text-xs sm:text-sm text-neutral-300">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-white" />
                    <span>3 Hours Live Hands-on Training</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-white" />
                    <span>Beginner to Advanced Directing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Video className="w-4 h-4 text-white" />
                    <span>Live Interactive Zoom Workshop</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-4 h-4 text-white" />
                    <span>10 Free Workflow Guides Included</span>
                  </div>
                </div>
              </div>

              {/* Mentor Highlight Card */}
              <div className="glass-panel p-5 rounded-2xl space-y-4">
                <span className="text-[10px] tracking-normal text-neutral-400 font-medium block">
                  Workshop Mentor
                </span>
                <div className="flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={webinarData.mentor.image}
                    alt={webinarData.mentor.name}
                    className="w-12 h-12 rounded-full object-cover border border-white/20 shadow-md"
                  />
                  <div className="leading-tight">
                    <h4 className="text-sm font-medium text-white">{webinarData.mentor.name}</h4>
                    <span className="text-[11px] text-neutral-400">{webinarData.mentor.role}</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* LANGUAGE PREFERENCES GRID (PAGES 2 & 3) */}
      <section id="languages" className="py-20 md:py-28 bg-[#050505] border-b border-white/10 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-medium tracking-wider text-[#F2F2F2] bg-white/5 px-3.5 py-1 rounded-full border border-white/10">
              Language Preferences Grid
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#F2F2F2] mt-4 mb-3">
              Choose Your Language
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              Select your preferred language batch to learn comfortably, engage in live Q&A, and direct AI like a pro.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {webinarData.languages.map((lang) => (
              <motion.div
                key={lang.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className={`glass-premium rounded-3xl p-7 flex flex-col justify-between relative overflow-hidden border ${
                  lang.isPopular ? 'border-white/30 shadow-[0_0_30px_rgba(255,255,255,0.08)]' : 'border-white/10'
                }`}
              >
                {lang.isPopular && (
                  <div className="absolute top-0 right-0 bg-white text-black font-medium text-[10px] tracking-normal py-1 px-3 rounded-bl-xl">
                    Popular Batch
                  </div>
                )}

                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-medium text-white">{lang.name}</h3>
                      <span className="text-xs text-neutral-400">Live Online Workshop</span>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                    {lang.description}
                  </p>

                  <div className="text-2xl font-semibold text-white">
                    ₹{lang.fee}/-
                  </div>

                  {/* Batch Details list */}
                  <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs text-neutral-300">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-400">Date:</span>
                      <span className="font-medium text-white">{lang.dates}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-400">Time:</span>
                      <span className="font-medium text-white">{lang.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-400">Platform:</span>
                      <span className="font-medium text-white">{lang.platform}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-400">Duration:</span>
                      <span className="font-medium text-white">{lang.duration}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  <button
                    onClick={() => openEnrollModal(lang.name)}
                    className="w-full py-3 bg-[#F2F2F2] hover:bg-white text-black font-medium text-xs tracking-normal rounded-xl transition-all shadow-md hover:scale-[1.02] cursor-pointer"
                  >
                    Enroll Now
                  </button>

                  <a
                    href="#pillars"
                    className="block text-center py-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
                  >
                    View More Details
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* WHAT YOU'LL ACHIEVE IN THIS 3-HOUR WORKSHOP (PAGE 3) */}
      <section id="pillars" className="py-20 md:py-32 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-medium tracking-wider text-[#F2F2F2]">
              Workshop Curriculum
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#F2F2F2] mt-3 mb-4">
              What You&apos;ll Achieve in This 3-Hour Workshop
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              From an idea to a cinematic AI video — using advanced tools and production workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {webinarData.pillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-premium glass-premium-hover rounded-3xl overflow-hidden flex flex-col justify-between relative group border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                {pillar.image && (
                  <div className="relative w-full aspect-[16/9] overflow-hidden bg-neutral-900 border-b border-white/10">
                    <img
                      src={pillar.image}
                      alt={pillar.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e12]/85 via-transparent to-black/10" />
                  </div>
                )}

                <div className="p-7 sm:p-8 flex flex-col justify-between flex-1">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                        {pillar.icon === 'Sparkles' && <Sparkles className="w-5 h-5" />}
                        {pillar.icon === 'Film' && <Film className="w-5 h-5" />}
                        {pillar.icon === 'Palette' && <Palette className="w-5 h-5" />}
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400 font-medium tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                        Core Pillar 0{idx + 1}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-medium text-white tracking-tight">
                      {pillar.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-5 border-t border-white/10 flex items-center gap-2 text-xs font-medium text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                    <span>Hands-on practice included</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* TOOLS YOU'LL EXPLORE & WHAT'S INCLUDED (PAGE 3 & 4) */}
      <section id="tools" className="py-20 bg-[#050505] border-y border-white/10 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left: Tools Grid */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-medium tracking-wider text-[#F2F2F2]">
                  Modern Generative Suite
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white mt-2">
                  Tools You&apos;ll Explore
                </h2>
                <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mt-2">
                  Explore advanced AI tools and learn how to connect them into a practical creative workflow.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-x-8 sm:gap-x-12 gap-y-8 sm:gap-y-10 pt-6">
                {webinarData.tools.map((tool, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 sm:gap-5 group cursor-default transition-all"
                  >
                    <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {getToolIcon(tool.name, "w-14 h-14 sm:w-16 sm:h-16")}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-lg sm:text-xl md:text-2xl font-medium text-white group-hover:text-white/90 transition-colors tracking-tight leading-snug">
                        {tool.name}
                      </span>
                      {tool.badge && (
                        <span className="text-xs sm:text-sm font-mono text-neutral-400 tracking-wider uppercase mt-1">
                          {tool.badge}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: What's Included Box */}
            <div className="lg:col-span-5">
              <div className="glass-premium p-8 rounded-3xl space-y-6 border border-white/15">
                <div>
                  <span className="text-xs font-medium tracking-normal text-neutral-400">
                    Session Package
                  </span>
                  <h3 className="text-2xl font-medium text-white mt-1">
                    What&apos;s Included
                  </h3>
                </div>

                <ul className="space-y-4 text-sm text-neutral-200">
                  {webinarData.whatsIncluded.map((included, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="leading-tight font-medium">{included}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-white/10">
                  <button
                    onClick={() => openEnrollModal('English')}
                    className="w-full py-3.5 bg-[#F2F2F2] hover:bg-white text-[#000000] font-medium text-xs tracking-normal rounded-xl transition-all shadow-md hover:scale-[1.01] cursor-pointer"
                  >
                    Get Full Access for ₹{webinarData.fee}
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* TARGET AUDIENCE & POST-WORKSHOP ABILITIES (PAGE 4) */}
      <section id="audience" className="py-20 md:py-32 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Section 1: Who is this workshop for? */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-medium tracking-wider text-[#F2F2F2]">
              Ideal Candidates
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white mt-3 mb-4">
              Who is this workshop for?
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              Open to anyone eager to master high-end AI visual directing and storytelling.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto mb-20">
            {webinarData.targetAudience.map((item, idx) => (
              <div
                key={idx}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-sm sm:max-w-none glass-panel rounded-2xl overflow-hidden flex flex-col border border-white/10 hover:border-white/25 transition-all duration-300 group hover:-translate-y-1 shadow-lg hover:shadow-white/5"
              >
                {item.image && (
                  <div className="relative w-full aspect-[16/9] overflow-hidden bg-neutral-900 border-b border-white/10">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e12]/80 via-transparent to-black/10" />
                  </div>
                )}
                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2.5">
                      <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-white shrink-0 group-hover:bg-white/20 transition-colors">
                        {getAudienceIcon(item.icon)}
                      </div>
                      <h4 className="text-lg font-semibold text-white tracking-tight leading-snug group-hover:text-white">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed pl-12">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Section 2: What you'll be able to do after the workshop */}
          <div className="glass-premium p-8 sm:p-12 rounded-3xl max-w-6xl mx-auto border border-white/15">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-medium tracking-normal text-neutral-400">
                Actionable Outcomes
              </span>
              <h3 className="text-2xl sm:text-3xl font-medium text-white mt-1">
                What you&apos;ll be able to do after the workshop
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {webinarData.postWorkshopSkills.map((skill, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-neutral-200 leading-tight">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* MEET THE FOUNDERS SECTION (Testimonials Carousel Style, No 'View all' Button) */}
      <FoundersCarousel />

      {/* MEET YOUR MENTOR (PAGE 5 & 6) */}
      <section id="mentor" className="py-20 md:py-32 relative">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

          <div className="glass-premium p-8 sm:p-12 rounded-3xl border border-white/15 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

              {/* Mentor Avatar & Quick Badges */}
              <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={webinarData.mentor.image}
                    alt={webinarData.mentor.name}
                    className="w-40 h-40 sm:w-48 sm:h-48 rounded-3xl object-cover border-2 border-white/20 shadow-2xl"
                  />
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white text-black text-[10px] font-medium tracking-normal shadow-lg whitespace-nowrap">
                    {webinarData.mentor.experienceYears}+ Years in AI
                  </div>
                </div>

                <div className="pt-2">
                  <h3 className="text-2xl font-medium text-white">{webinarData.mentor.name}</h3>
                  <p className="text-xs text-neutral-400 font-medium">{webinarData.mentor.role}</p>
                </div>
              </div>

              {/* Mentor Message & Bio Verbatim */}
              <div className="lg:col-span-8 space-y-4 text-left">
                <span className="text-xs font-medium tracking-wider text-[#F2F2F2]">
                  Meet Your Mentor
                </span>
                <h4 className="text-2xl sm:text-3xl font-medium text-white">
                  Learn directly from India&apos;s leading AI video creator brand
                </h4>

                <div className="space-y-3 text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                  <p className="italic text-white">
                    &ldquo;{webinarData.mentor.bio}&rdquo;
                  </p>
                  <p className="text-neutral-400">
                    That experience is what we&apos;re bringing into this workshop — giving you access to the tools, techniques, and creative workflows we&apos;ve learned through years of working with AI.
                  </p>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => openEnrollModal('English')}
                    className="px-6 py-3 bg-[#F2F2F2] hover:bg-white text-black font-medium text-xs tracking-normal rounded-xl transition-all shadow-md hover:scale-[1.02] cursor-pointer"
                  >
                    Learn with Vinayak • ₹{webinarData.fee}
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* TRUSTED BY LEADING BRANDS (PAGE 6) */}
      <section className="py-10 sm:py-14 bg-[#050505] border-y border-white/10 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">

          <span className="text-xs font-medium tracking-wider text-[#F2F2F2] block mb-2">
            Industry Credibility
          </span>
          <h3 className="text-2xl sm:text-3xl font-medium text-white mb-6 sm:mb-8">
            Trusted by Leading Brands
          </h3>

          <div className="max-w-5xl mx-auto flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brands-grid.png"
              alt="Brands that trust Sapain"
              className="w-full h-auto object-contain rounded-xl shadow-2xl transition-all"
            />
          </div>

        </div>
      </section>

      {/* 3D VIDEO TESTIMONIALS DECK */}
      <section id="testimonials" className="py-20 md:py-28 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-medium tracking-wider text-[#F2F2F2] bg-white/5 px-3 py-1 rounded-full border border-white/10">
              Student Results
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white mt-4 mb-3">
              Success Stories
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              See what our students are creating and how this masterclass transformed their creative workflow.
            </p>
          </div>

          <div className="relative w-full max-w-5xl mx-auto h-[480px] sm:h-[580px] flex items-center justify-center overflow-hidden">
            {testimonials.map((t, i) => {
              let offset = i - activeTestimonial;
              if (offset < -2) offset += 5;
              if (offset > 2) offset -= 5;

              const isActive = offset === 0;

              return (
                <motion.div
                  key={i}
                  onClick={() => {
                    if (!isActive) {
                      setActiveTestimonial(i);
                      setIsTestimonialMuted(true);
                    }
                  }}
                  animate={{
                    x: isMobile ? `${offset * 16}%` : `${offset * 32}%`,
                    scale: isActive ? 1 : 0.82,
                    opacity: isActive ? 1 : 0.45,
                    zIndex: isActive ? 30 : 20 - Math.abs(offset),
                    rotateY: isActive ? 0 : offset * 12,
                  }}
                  transition={{ type: 'spring', stiffness: 70, damping: 16, mass: 0.8 }}
                  className={`absolute w-[260px] sm:w-[360px] md:w-[420px] glass-premium rounded-[24px] p-2.5 select-none transition-all duration-300 ${
                    isActive
                      ? 'cursor-default shadow-[0_20px_50px_rgba(255,255,255,0.08)] border-white/30'
                      : 'cursor-pointer hover:border-white/20 hover:opacity-70 border-white/5'
                  }`}
                  style={{
                    perspective: 1000,
                    transformStyle: "preserve-3d"
                  }}
                >
                  <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-950">
                    {isActive ? (
                      <video
                        key={t.src}
                        src={t.src}
                        loop
                        muted={isTestimonialMuted}
                        playsInline
                        autoPlay
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={t.thumbnail}
                        alt="Testimonial Preview"
                        className="w-full h-full object-cover"
                      />
                    )}

                    {isActive && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsTestimonialMuted(!isTestimonialMuted);
                        }}
                        className="absolute bottom-3 right-3 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 flex items-center justify-center text-white backdrop-blur-md transition-all shadow-lg hover:scale-105 cursor-pointer"
                        title={isTestimonialMuted ? "Unmute" : "Mute"}
                      >
                        {isTestimonialMuted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10 FREE WORKFLOW GUIDES (PAGE 6) */}
      <section id="guides" className="py-20 bg-[#050505] border-t border-white/10 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-medium tracking-wider text-[#F2F2F2]">
              Here&apos;s Something Extra
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white mt-3 mb-4">
              10 Free Creative Workflow Guides
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              Included free with every workshop registration to accelerate your storytelling and directing workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto mb-12">
            {webinarData.workflowGuides.map((guide) => (
              <div
                key={guide.number}
                className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-white/25 flex flex-col justify-between transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center font-mono font-medium text-xs text-white">
                    {guide.number < 10 ? `0${guide.number}` : guide.number}
                  </span>
                  <BookOpen className="w-4 h-4 text-neutral-400" />
                </div>
                <h4 className="text-xs sm:text-sm font-semibold text-white leading-snug">
                  {guide.title}
                </h4>
              </div>
            ))}
          </div>

          {/* CTA Banner */}
          <div className="glass-premium p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
            <div>
              <h4 className="text-lg font-medium text-white">
                Unlock all 10 Guides with your seat
              </h4>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Instant delivery to your email upon workshop enrollment.
              </p>
            </div>
            <button
              onClick={() => openEnrollModal('English')}
              className="px-6 py-3 bg-[#F2F2F2] hover:bg-white text-black font-medium text-xs tracking-normal rounded-xl transition-all shadow-md shrink-0 cursor-pointer"
            >
              Claim Seat & Guides
            </button>
          </div>

        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS (PAGE 6) */}
      <section id="faqs" className="py-20 md:py-32 relative">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-medium tracking-wider text-[#F2F2F2]">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white mt-3 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              Everything you need to know about the 3-hour live masterclass.
            </p>
          </div>

          <div className="space-y-4">
            {webinarData.faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="glass-panel rounded-2xl border border-white/10 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-medium text-white leading-snug">
                      {index + 1}. {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-neutral-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-white' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="px-5 sm:px-6 pb-5 pt-0 text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans border-t border-white/5"
                      >
                        <p className="pt-3">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* JOIN A GROWING AI COMMUNITY & SOCIAL MEDIA (PAGE 7) */}
      <section id="community" className="py-20 bg-gradient-to-b from-[#050505] to-[#0A0A0A] border-t border-white/10 relative">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">

          <div className="glass-premium p-8 sm:p-14 rounded-3xl border border-white/15 space-y-8">
            <div className="space-y-3 max-w-2xl mx-auto">
              <span className="text-xs font-medium tracking-wider text-[#F2F2F2]">
                Ecosystem
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white">
                Join a Growing AI Community
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                Creators, professionals, and AI enthusiasts are already exploring new ways to create, work, and grow with AI. Now it&apos;s your turn.
              </p>
            </div>

            <div className="border-t border-white/10 pt-8 max-w-2xl mx-auto space-y-3">
              <h3 className="text-xl sm:text-2xl font-medium text-white">
                Be the First to Know What&apos;s Next
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Stay updated on the latest AI trends in the creative industry, emerging tools and technologies, and upcoming workshops, classes, and courses from Sapain. Follow us on social media to stay updated.
              </p>
            </div>

            {/* Social Media & Community Links Grid */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-xs font-medium text-white transition-all hover:scale-105"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>Instagram</span>
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-xs font-medium text-white transition-all hover:scale-105"
              >
                <YoutubeIcon className="w-4 h-4" />
                <span>YouTube</span>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-xs font-medium text-white transition-all hover:scale-105"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>

              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/10 border border-white/10 hover:border-white/30 text-xs font-medium text-white transition-all hover:scale-105"
              >
                <WhatsappIcon className="w-4 h-4" />
                <span>WhatsApp Community</span>
              </a>
            </div>

            <div className="pt-4">
              <button
                onClick={() => openEnrollModal('English')}
                className="px-8 py-4 bg-[#F2F2F2] hover:bg-white text-black font-medium text-sm tracking-normal rounded-xl shadow-xl hover:shadow-white/20 hover:scale-[1.02] transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>Enroll in Masterclass for ₹{webinarData.fee}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#000000]/70 py-12 pb-36 sm:pb-44">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-white/10 pb-8 mb-8">
            <Logo size="lg" />

            <div className="flex flex-wrap justify-center gap-6 text-xs sm:text-sm text-neutral-400">
              <a href="#about" className="hover:text-white transition-colors">About</a>
              <a href="#languages" className="hover:text-white transition-colors">Languages</a>
              <a href="#pillars" className="hover:text-white transition-colors">Curriculum</a>
              <a href="#founders" className="hover:text-white transition-colors">Founders</a>
              <a href="#mentor" className="hover:text-white transition-colors">Mentor</a>
              <a href="#guides" className="hover:text-white transition-colors">Free Guides</a>
              <a href="#faqs" className="hover:text-white transition-colors">FAQs</a>
              <a href="#community" className="hover:text-white transition-colors">Community</a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] sm:text-xs text-neutral-400">
            <p>&copy; {new Date().getFullYear()} Sapain AI. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* FIXED BOTTOM ACTION BAR - Visible throughout the website */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/15 bg-black/95 backdrop-blur-2xl py-5 sm:py-6 shadow-[0_-12px_40px_rgba(0,0,0,0.95)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 sm:gap-6 min-h-[64px] sm:min-h-[72px]">
          {/* Fee & Workshop Info */}
          <div className="flex items-center gap-5 sm:gap-8">
            <div className="hidden md:block leading-tight">
              <div className="flex items-center gap-2 mb-1">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs tracking-wide text-neutral-300 font-medium">Live Masterclass</span>
              </div>
              <h4 className="text-sm sm:text-base font-semibold text-white">
                AI Image & Cinematic Video Generation
              </h4>
            </div>

            <div className="flex flex-col">
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium hidden sm:block mb-0.5">Workshop Fee</span>
              <div className="flex items-baseline gap-2.5">
                <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">₹{webinarData.fee}</span>
                <span className="text-sm sm:text-base text-neutral-500 line-through">₹{webinarData.originalFee}</span>
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                  90% OFF
                </span>
              </div>
            </div>
          </div>

          {/* Action CTA Button */}
          <button
            onClick={() => openEnrollModal('English')}
            className="glow-button px-6 py-3.5 sm:px-9 sm:py-4 bg-[#F2F2F2] hover:bg-white text-black font-semibold text-sm sm:text-base rounded-2xl shadow-xl hover:shadow-white/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2.5 shrink-0"
          >
            <span>Reserve Your Seat</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* REGISTRATION MODAL */}
      <RegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        fee={webinarData.fee}
        originalFee={webinarData.originalFee}
        defaultLanguage={selectedLanguage}
      />
    </div>
  );
}
