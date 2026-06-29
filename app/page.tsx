'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, Clock, MapPin, Sparkles, Palette, Film, Megaphone,
  GraduationCap, Briefcase, Share2, Terminal, GitBranch, FolderOpen,
  MessageSquareText, Award, ArrowRight, ChevronDown, Star, Check,
  Lock, Play, Pause, Volume2, VolumeX
} from 'lucide-react';
import { Logo } from '../components/Logo';
import { RegistrationModal } from '../components/RegistrationModal';
import { webinarData } from '../data/webinarData';

// Custom LinkedIn Icon SVG to prevent version compatibility issues
const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
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

const achievementsWithImages = [
  {
    title: "Generate Professional AI Images",
    description: "Master the art of visual prompting. Create high-fidelity cinematic, product, and architectural images with perfect composition and lighting control.",
    image: "/sapain_ai_art.png"
  },
  {
    title: "Create Cinematic AI Videos",
    description: "Translate your static visuals into fluid, motion-prompted video sequences. Learn camera movement control and transitions for studio-grade output.",
    image: "/sapain_cinematic_motion.png"
  },
  {
    title: "Design Highly Specific Prompts",
    description: "Structure powerful prompts using professional frameworks. Learn to communicate with AI models to get the exact style, angle, and detail you want.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop"
  },
  {
    title: "Build Studio-Grade Advertisements",
    description: "Produce commercial-ready advertisement creatives and marketing assets on a budget, bypassing expensive production pipelines.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop"
  },
  {
    title: "Save Hours of Manual Design Work",
    description: "Automate and accelerate your creative workflow. Save hours of manual editing, brainstorming, and asset creation daily.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop"
  },
  {
    title: "Create High-Performing Content",
    description: "Build visual content optimized for engagement and conversion across social media, websites, and digital campaigns.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=600&auto=format&fit=crop"
  },
  {
    title: "Maintain Consistent Characters",
    description: "Solve the hardest problem in AI art. Generate consistent characters across multiple scenes, angles, and stories.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop"
  },
  {
    title: "Produce Commercial-Ready Visuals",
    description: "Deliver high-end, client-ready visual assets that meet the quality standards of global brands and advertising agencies.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop"
  }
];

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
  const [activeDeckDay, setActiveDeckDay] = useState(1);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [seatsLeft, setSeatsLeft] = useState(14);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Custom Video Player & Tab States
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'reviews'>('info');
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle video progress and metadata
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration) {
        setVideoCurrentTime(video.currentTime);
        setVideoProgress((video.currentTime / video.duration) * 100);
      }
    };

    const handleLoadedMetadata = () => {
      setVideoDuration(video.duration);
    };

    const handleVideoEnded = () => {
      setIsVideoPlaying(false);
      setVideoProgress(0);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleVideoEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleVideoEnded);
    };
  }, []);

  // Slideshow States for Day 1 Curriculum
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const day1Images = [
    '/sapain_ai_art.png',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=600&auto=format&fit=crop'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Auto-cycle the 3D Card Deck active day every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDeckDay((prev) => (prev === 1 ? 2 : 1));
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Testimonials States & Effects
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isTestimonialMuted, setIsTestimonialMuted] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-cycle the Testimonials active card every 5 seconds
  useEffect(() => {
    if (!isTestimonialMuted) return; // Pause auto-slider if unmuted
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 5);
    }, 5000);
    return () => clearInterval(interval);
  }, [isTestimonialMuted]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isVideoPlaying) {
      video.pause();
      setIsVideoPlaying(false);
    } else {
      video.play().catch(err => console.log("Video play interrupted:", err));
      setIsVideoPlaying(true);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const newTime = (parseFloat(e.target.value) / 100) * video.duration;
    video.currentTime = newTime;
    setVideoProgress(parseFloat(e.target.value));
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };


  // Countdown timer to next Saturday at 6:00 PM IST
  useEffect(() => {
    const getNextSaturday = () => {
      const now = new Date();
      const nextSat = new Date();
      nextSat.setDate(now.getDate() + ((6 + 7 - now.getDay()) % 7));
      nextSat.setHours(18, 0, 0, 0);

      // If it's Saturday after 6 PM, set to next Saturday
      if (nextSat.getTime() <= now.getTime()) {
        nextSat.setDate(nextSat.getDate() + 7);
      }
      return nextSat.getTime();
    };

    const targetTime = getNextSaturday();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        clearInterval(timerInterval);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  // Simulate seats ticking down slowly over time
  useEffect(() => {
    const seatsInterval = setInterval(() => {
      setSeatsLeft((prev) => {
        if (prev <= 4) {
          // Reset to 12 occasionally to keep the simulation going for demo purposes
          return 12;
        }
        // Randomly decrement
        return Math.random() > 0.7 ? prev - 1 : prev;
      });
    }, 12000);

    return () => clearInterval(seatsInterval);
  }, []);

  // Handle scroll to show/hide sticky bottom bar
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const heroHeight = heroRef.current.offsetHeight;
      const scrollPosition = window.scrollY;

      // Show sticky bar after scrolling past the hero section
      setShowStickyBar(scrollPosition > heroHeight - 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper to map icon string name to Lucide Component
  const getIconComponent = (iconName: string) => {
    const iconProps = { className: "w-5 h-5 text-[#F2F2F2]" };
    switch (iconName) {
      case 'Sparkles': return <Sparkles {...iconProps} />;
      case 'Palette': return <Palette {...iconProps} />;
      case 'Film': return <Film {...iconProps} />;
      case 'Megaphone': return <Megaphone {...iconProps} />;
      case 'GraduationCap': return <GraduationCap {...iconProps} />;
      case 'Briefcase': return <Briefcase {...iconProps} />;
      case 'Share2': return <Share2 {...iconProps} />;
      case 'Terminal': return <Terminal {...iconProps} />;
      case 'GitBranch': return <GitBranch {...iconProps} />;
      case 'FolderOpen': return <FolderOpen {...iconProps} />;
      case 'MessageSquareText': return <MessageSquareText {...iconProps} />;
      case 'Award': return <Award {...iconProps} />;
      default: return <Sparkles {...iconProps} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#000000] font-sans text-[#F2F2F2] overflow-x-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-radial-glow-top -z-10 pointer-events-none" />
      <div className="absolute top-[1200px] left-[-200px] w-[600px] h-[600px] bg-radial-glow -z-10 pointer-events-none opacity-45" />
      <div className="absolute top-[2800px] right-[-200px] w-[600px] h-[600px] bg-radial-glow -z-10 pointer-events-none opacity-45" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern -z-20 pointer-events-none opacity-60" />

      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#000000]/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Logo size="md" />

          {/* Nav Links - Desktop */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#curriculum" className="hover:text-white transition-colors">Curriculum</a>
            <a href="#audience" className="hover:text-white transition-colors">Who It&apos;s For</a>
            <a href="#bonuses" className="hover:text-white transition-colors">Bonuses</a>
            <a href="#faqs" className="hover:text-white transition-colors">FAQs</a>
          </nav>

          {/* CTA Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="glow-button px-5 py-2.5 bg-[#F2F2F2] text-[#000000] hover:bg-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-lg hover:shadow-violet-accent/25 cursor-pointer"
          >
            <span>Register Now</span>
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section ref={heroRef} className="relative pt-8 pb-16 md:pt-16 md:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Column: Content */}
            <div className="lg:col-span-7 text-left space-y-6">

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5"
              >
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-accent"></span>
                </span>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#F2F2F2]">
                  {webinarData.tagline}
                </span>
              </motion.div>

              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold font-display tracking-tight text-[#F2F2F2] leading-[1.05]"
              >
                {webinarData.title}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-base sm:text-lg md:text-xl text-neutral-400 leading-relaxed font-sans"
              >
                {webinarData.subtitle}
              </motion.p>

              {/* Quick Info Badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="flex flex-wrap justify-start items-center gap-3"
              >
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl shadow-sm backdrop-blur-md">
                  <Calendar className="w-4 h-4 text-[#F2F2F2]" />
                  <span className="text-sm font-medium text-[#F2F2F2]">{webinarData.dates}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl shadow-sm backdrop-blur-md">
                  <Clock className="w-4 h-4 text-[#F2F2F2]" />
                  <span className="text-sm font-medium text-[#F2F2F2]">{webinarData.time}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl shadow-sm backdrop-blur-md">
                  <MapPin className="w-4 h-4 text-[#F2F2F2]" />
                  <span className="text-sm font-medium text-[#F2F2F2]">{webinarData.mode}</span>
                </div>
              </motion.div>

            </div>

            {/* Right Column: Image */}
            <div className="lg:col-span-5 relative flex justify-center w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative p-2 w-full max-w-md lg:max-w-none overflow-hidden glass-premium"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/Firefly (85) (1).jpg.jpeg"
                  alt="Sapain AI Masterclass Key Visual"
                  className="rounded-[22px] w-full h-auto object-cover aspect-[4/5] shadow-2xl"
                />
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* COURSE OVERVIEW & DETAILS SECTION (MATCHING USER DEMO IMAGE LAYOUT) */}
      <section id="course-overview" className="py-12 md:py-20 border-b border-white/10 bg-[#000000] relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

            {/* Left Content Area: Video & Tab Info */}
            <div className="lg:col-span-2 space-y-8">

              {/* Interactive Custom Video Player */}
              <div className="relative group rounded-2xl overflow-hidden border border-white/15 bg-black aspect-video shadow-2xl">
                <video
                  ref={videoRef}
                  src="https://assets.mixkit.co/videos/preview/mixkit-wireframe-globe-spinning-in-digital-space-41617-large.mp4"
                  className="w-full h-full object-cover"
                  playsInline
                />

                {/* Custom Video Controls Overlay (Fade in on hover or when paused) */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/35 flex flex-col justify-between p-4 transition-opacity duration-300 ${isVideoPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}>

                  {/* Top Bar: Title / Badge */}
                  <div className="flex justify-between items-center">
                    <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold bg-black/60 backdrop-blur-md border border-white/10 text-white">
                      Course Preview
                    </span>
                    <span className="text-xs font-mono text-white/95 bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
                      {formatTime(videoCurrentTime)} / {formatTime(videoDuration || 336)}
                    </span>
                  </div>

                  {/* Center Play Button (Big and Glowing) */}
                  <div className="flex justify-center items-center">
                    <button
                      onClick={togglePlay}
                      className="w-16 h-16 rounded-full glass-premium flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all shadow-lg hover:shadow-white/20 cursor-pointer"
                    >
                      {isVideoPlaying ? (
                        <Pause className="w-6 h-6 fill-white stroke-none" />
                      ) : (
                        <Play className="w-6 h-6 fill-white stroke-none translate-x-0.5" />
                      )}
                    </button>
                  </div>

                  {/* Bottom Controls Bar */}
                  <div className="space-y-3">
                    {/* Progress Slider */}
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={videoProgress}
                        onChange={handleProgressChange}
                        className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-violet-accent hover:h-1.5 transition-all"
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center text-white">
                      <div className="flex items-center gap-4">
                        <button onClick={togglePlay} className="hover:text-white/85 transition-colors cursor-pointer">
                          {isVideoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                        </button>
                        <button onClick={toggleMute} className="hover:text-white/85 transition-colors cursor-pointer">
                          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </button>
                      </div>
                      <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-white/70">
                        <span>SapAin Education</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Tabs Navigation */}
              <div className="border-b border-white/10 flex gap-6 text-sm font-display font-bold">
                <button
                  onClick={() => setActiveTab('info')}
                  className={`pb-4 transition-all border-b-2 cursor-pointer ${activeTab === 'info'
                    ? 'border-violet-accent text-white'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                    }`}
                >
                  Course Info
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-4 transition-all border-b-2 cursor-pointer ${activeTab === 'reviews'
                    ? 'border-violet-accent text-white'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                    }`}
                >
                  Reviews
                </button>
              </div>

              {/* Tab Content */}
              <div className="min-h-[200px]">
                {activeTab === 'info' ? (
                  <div className="space-y-6">
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-[#F2F2F2]">About Course</h3>
                    <div className="text-sm sm:text-base text-neutral-400 leading-relaxed space-y-4 font-sans">
                      <p>
                        If you lack skills beyond academic learning in the present era, you may struggle to progress in life. Because no matter how much we advance in the digital world, our skills are valued more than our certificates. Therefore, think about which skills you can use to build your career. If you can teach others those skills, they too can achieve something on their own and eradicate the curse of unemployment.
                      </p>

                      <AnimatePresence>
                        {isAboutExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4 pt-2 border-t border-white/5"
                          >
                            <p className="italic text-[#F2F2F2]/90">
                              Welcome to the SapAin AI Image & Video Masterclass.
                            </p>
                            <p>
                              This intensive 2-day live program is designed specifically for modern content creators, visual artists, and designers who want to integrate cutting-edge Generative AI workflows into their commercial pipelines. We skip the basic definitions and jump straight into advanced prompt frameworks, cinematic composition, character consistency, and high-fidelity video production.
                            </p>
                            <p>
                              By the end of this course, you will not just be using AI; you will be directing it like a professional creative director, producing studio-grade visuals in minutes instead of days.
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <button
                        onClick={() => setIsAboutExpanded(!isAboutExpanded)}
                        className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white hover:text-neutral-300 transition-colors mt-2 flex items-center gap-1 cursor-pointer font-display"
                      >
                        {isAboutExpanded ? 'Show Less' : 'Show More'}
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isAboutExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-[#F2F2F2]">Student Reviews</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {webinarData.testimonials.slice(0, 2).map((review, i) => (
                        <div key={i} className="glass-panel p-5 rounded-xl space-y-3">
                          <div className="flex items-center gap-1 text-amber-500">
                            {[...Array(5)].map((_, idx) => (
                              <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                            ))}
                          </div>
                          <p className="text-xs sm:text-sm italic text-neutral-300">
                            &ldquo;{review.review}&rdquo;
                          </p>
                          <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={review.image} alt={review.name} className="w-8 h-8 rounded-full object-cover" />
                            <div>
                              <h5 className="text-xs font-bold text-white">{review.name}</h5>
                              <span className="text-[10px] text-neutral-500 block">{review.role}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Right Sticky Sidebar */}
            <div className="lg:sticky lg:top-24 space-y-6">

              {/* Card 1: Pricing & Info */}
              <div className="glass-premium p-6 space-y-6">

                {/* Pricing info */}
                <div className="space-y-1.5">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-extrabold text-white">₹{webinarData.fee}.00</span>
                    <span className="text-sm text-neutral-500 line-through">₹{webinarData.originalFee}.00</span>
                  </div>
                  <span className="text-xs text-neutral-400 block font-semibold">
                    Enrollment validity: Lifetime Access
                  </span>
                </div>

                {/* Enroll Button */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-3.5 bg-[#F2F2F2] hover:bg-white text-[#000000] font-bold text-sm rounded-xl transition-all shadow-lg hover:shadow-violet-accent/25 hover:scale-[1.01] cursor-pointer text-center uppercase tracking-wider block"
                >
                  Enroll Now
                </button>

                {/* Course Quick Details List */}
                <div className="space-y-4 pt-6 border-t border-white/10 text-xs sm:text-sm text-neutral-300">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-white" />
                    <span>All Levels Welcome</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-white" />
                    <span>4 Hours Live Sessions (2 Days)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-white" />
                    <span>Upcoming Saturday & Sunday</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="w-4 h-4 text-white" />
                    <span>Verified Certificate of Completion</span>
                  </div>
                </div>

              </div>

              {/* Card 2: Instructor */}
              <div className="glass-panel p-5 rounded-2xl space-y-4">
                <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold block">
                  A course by
                </span>
                <div className="flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={webinarData.instructors[0].image}
                    alt={webinarData.instructors[0].name}
                    className="w-12 h-12 rounded-full object-cover border border-white/10 shadow-md"
                  />
                  <div className="leading-tight">
                    <h4 className="text-sm font-bold text-white">{webinarData.instructors[0].name}</h4>
                    <span className="text-[10px] text-neutral-500">{webinarData.instructors[0].role}</span>
                  </div>
                </div>
              </div>

              {/* Card 3: Material Includes */}
              <div className="glass-panel p-5 rounded-2xl space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white font-display">
                  Material Includes
                </h4>
                <ul className="space-y-3 text-xs sm:text-sm text-neutral-300">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <span>4+ hours of live interactive lessons.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <span>Session-based resources & guides.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <span>2 comprehensive masterclass modules.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <span>5 complete commercial-ready projects.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <span>Lifetime updates to recordings.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <span>All resource drive files and templates.</span>
                  </li>
                </ul>
              </div>

            </div>

          </div>
        </div>
      </section>



      {/* ACHIEVEMENTS / WHAT YOU'LL LEARN */}
      <section id="about" className="py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#F2F2F2]">Elevate Your Capabilities</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight text-[#F2F2F2] mt-3 mb-4">
              What You Will Achieve in 2 Days
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              We skip the basic definitions and jump straight into commercial-ready pipelines used by professional visual artists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">

            {/* Card 1: Generate Professional AI Images (2 Cols) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="md:col-span-2 h-[320px] glass-premium glass-premium-hover rounded-3xl overflow-hidden relative group"
            >
              <div className="grid grid-cols-1 sm:grid-cols-12 h-full">
                <div className="sm:col-span-7 p-6 sm:p-8 flex flex-col justify-between h-full z-10">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-white">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase tracking-wider">Capability 01</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-white leading-tight">
                      {achievementsWithImages[0].title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
                      {achievementsWithImages[0].description}
                    </p>
                  </div>
                </div>
                <div className="sm:col-span-5 relative h-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={achievementsWithImages[0].image}
                    alt={achievementsWithImages[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </motion.div>

            {/* Card 2: Create Cinematic AI Videos (1 Col) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="md:col-span-1 h-[320px] glass-premium glass-premium-hover rounded-3xl overflow-hidden flex flex-col justify-between relative group"
            >
              <div className="p-6 space-y-3 z-10">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-white">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase tracking-wider">Capability 02</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-display text-white leading-tight">
                  {achievementsWithImages[1].title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                  {achievementsWithImages[1].description}
                </p>
              </div>
              <div className="relative h-32 w-full overflow-hidden mt-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={achievementsWithImages[1].image}
                  alt={achievementsWithImages[1].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>

            {/* Card 3: Design Highly Specific Prompts (1 Col) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="md:col-span-1 h-[320px] glass-premium glass-premium-hover rounded-3xl overflow-hidden flex flex-col justify-between relative group"
            >
              <div className="p-6 space-y-3 z-10">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-white">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase tracking-wider">Capability 03</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-display text-white leading-tight">
                  {achievementsWithImages[2].title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                  {achievementsWithImages[2].description}
                </p>
              </div>
              <div className="relative h-32 w-full overflow-hidden mt-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={achievementsWithImages[2].image}
                  alt={achievementsWithImages[2].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>

            {/* Card 4: Build Studio-Grade Advertisements (2 Cols) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:col-span-2 h-[320px] glass-premium glass-premium-hover rounded-3xl overflow-hidden relative group"
            >
              <div className="grid grid-cols-1 sm:grid-cols-12 h-full">
                <div className="sm:col-span-7 p-6 sm:p-8 flex flex-col justify-between h-full z-10">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-white">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase tracking-wider">Capability 04</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-white leading-tight">
                      {achievementsWithImages[3].title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
                      {achievementsWithImages[3].description}
                    </p>
                  </div>
                </div>
                <div className="sm:col-span-5 relative h-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={achievementsWithImages[3].image}
                    alt={achievementsWithImages[3].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </motion.div>

            {/* Card 5: Save Hours of Manual Design Work (1 Col) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="md:col-span-1 h-[320px] glass-premium glass-premium-hover rounded-3xl overflow-hidden flex flex-col justify-between relative group"
            >
              <div className="p-6 space-y-3 z-10">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-white">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase tracking-wider">Capability 05</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-display text-white leading-tight">
                  {achievementsWithImages[4].title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                  {achievementsWithImages[4].description}
                </p>
              </div>
              <div className="relative h-32 w-full overflow-hidden mt-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={achievementsWithImages[4].image}
                  alt={achievementsWithImages[4].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>

            {/* Card 6: Create High-Performing Content (1 Col) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="md:col-span-1 h-[320px] glass-premium glass-premium-hover rounded-3xl overflow-hidden flex flex-col justify-between relative group"
            >
              <div className="p-6 space-y-3 z-10">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-white">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase tracking-wider">Capability 06</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-display text-white leading-tight">
                  {achievementsWithImages[5].title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                  {achievementsWithImages[5].description}
                </p>
              </div>
              <div className="relative h-32 w-full overflow-hidden mt-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={achievementsWithImages[5].image}
                  alt={achievementsWithImages[5].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>

            {/* Card 7: Maintain Consistent Characters (1 Col) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="md:col-span-1 h-[320px] glass-premium glass-premium-hover rounded-3xl overflow-hidden flex flex-col justify-between relative group"
            >
              <div className="p-6 space-y-3 z-10">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-white">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase tracking-wider">Capability 07</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-display text-white leading-tight">
                  {achievementsWithImages[6].title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                  {achievementsWithImages[6].description}
                </p>
              </div>
              <div className="relative h-32 w-full overflow-hidden mt-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={achievementsWithImages[6].image}
                  alt={achievementsWithImages[6].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>

            {/* Card 8: Produce Commercial-Ready Visuals (3 Cols) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="md:col-span-3 h-[220px] glass-premium glass-premium-hover rounded-3xl overflow-hidden relative group"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 h-full">
                <div className="md:col-span-8 p-6 sm:p-8 flex flex-col justify-between h-full z-10">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-white">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase tracking-wider">Capability 08</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-white leading-tight">
                      {achievementsWithImages[7].title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
                      {achievementsWithImages[7].description}
                    </p>
                  </div>
                </div>
                <div className="md:col-span-4 relative h-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={achievementsWithImages[7].image}
                    alt={achievementsWithImages[7].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* CURRICULUM SECTION */}
      <section id="curriculum" className="py-20 bg-[#000000] border-y border-white/10 relative overflow-hidden">
        {/* Background ambient light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#F2F2F2] bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              Comprehensive Learning
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold font-display tracking-tight text-[#F2F2F2] mt-6 mb-4">
              The 2-Day Curriculum
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              Two intense, hands-on masterclasses covering image composition and advanced video production pipelines.
            </p>
          </div>

          {/* --- DESKTOP: 3D OVERLAPPING CARD DECK --- */}
          <div className="hidden lg:block relative w-full max-w-5xl mx-auto h-[660px] mb-12">

            {/* Day 1 Card */}
            <motion.div
              onClick={() => activeDeckDay === 2 && setActiveDeckDay(1)}
              animate={{
                x: activeDeckDay === 1 ? '0%' : '-8%',
                scale: activeDeckDay === 1 ? 1 : 0.92,
                opacity: activeDeckDay === 1 ? 1 : 0.4,
                zIndex: activeDeckDay === 1 ? 20 : 10,
              }}
              transition={{ type: 'spring', stiffness: 70, damping: 16, mass: 0.8 }}
              className={`absolute inset-y-0 left-0 w-[90%] glass-premium p-8 rounded-[24px] border border-white/10 flex flex-col justify-between select-none ${activeDeckDay === 2 ? 'cursor-pointer hover:border-white/20 hover:opacity-60' : 'pointer-events-auto'
                }`}
            >
              {/* Card Watermark */}
              <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none select-none">
                <span className="text-[120px] font-extrabold font-display text-white leading-none">01</span>
              </div>

              {/* Day Card Header */}
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs uppercase tracking-widest text-violet-accent font-bold">
                    Saturday • Masterclass Day 01
                  </span>
                  <h3 className="text-2xl font-bold font-display text-[#F2F2F2] mt-1">
                    {webinarData.curriculum[0].title}
                  </h3>
                </div>
                <span className="text-[10px] uppercase font-mono tracking-widest px-2.5 py-1 rounded border bg-white/5 text-neutral-400 border-white/10">
                  Image Generation
                </span>
              </div>

              {/* Day Card Content (2 Cols) */}
              <div className="grid grid-cols-12 gap-8 my-6 items-center">
                {/* Left: Key Topics (7 Cols) */}
                <div className="col-span-7 space-y-4">
                  <span className="text-xs uppercase tracking-wider text-neutral-400 font-bold block">
                    Key Topics Covered
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    {webinarData.curriculum[0].topics.map((topic, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3.5 rounded-xl glass-premium glass-premium-hover transition-all duration-300 group/item"
                      >
                        <div className="w-5 h-5 rounded bg-violet-accent/10 text-violet-accent border border-violet-accent/20 flex items-center justify-center shrink-0 group-hover/item:bg-violet-accent group-hover/item:text-black transition-colors duration-300">
                          <Check className="w-3 h-3" />
                        </div>
                        <span className="text-[11px] text-neutral-300 font-medium leading-tight group-hover/item:text-white transition-colors">
                          {topic}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Media Showcase (5 Cols) */}
                <div className="col-span-5 flex flex-col justify-center">
                  <div className="relative w-full h-[280px] rounded-2xl overflow-hidden border border-white/10 bg-black group/theater shadow-2xl">
                    <div className="w-full h-full relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={day1Images[currentImgIndex]}
                        alt="Day 1 Project Preview"
                        className="w-full h-full object-cover transition-all duration-700"
                      />
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/5">
                        {day1Images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (activeDeckDay === 1) setCurrentImgIndex(idx);
                            }}
                            className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${currentImgIndex === idx ? 'bg-violet-accent w-3.5' : 'bg-white/35 hover:bg-white/60'
                              }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Day Card Capstone */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-accent/10 to-transparent border border-violet-accent/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1 max-w-md">
                  <span className="text-[9px] uppercase tracking-widest font-bold text-violet-accent">Capstone Project</span>
                  <h4 className="text-sm font-bold text-white font-display">
                    Consistent Multi-Scene Character Storyboard
                  </h4>
                  <p className="text-xs text-neutral-400 font-sans">
                    Create a 6-frame storyboard maintaining the exact same character.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-6">
                  <div className="text-left font-mono space-y-1 text-[10px] text-neutral-400">
                    <div className="flex items-center gap-1.5 text-white">
                      <Calendar className="w-3.5 h-3.5 text-violet-accent" />
                      <span>Saturday, July 4</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-violet-accent" />
                      <span>6:00 PM IST</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsModalOpen(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-violet-accent text-black font-bold text-xs hover:shadow-[0_0_25px_rgba(127,0,255,0.5)] hover:scale-[1.02] transition-all duration-300 shrink-0 cursor-pointer"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Day 2 Card */}
            <motion.div
              onClick={() => activeDeckDay === 1 && setActiveDeckDay(2)}
              animate={{
                x: activeDeckDay === 2 ? '10%' : '18%',
                scale: activeDeckDay === 2 ? 1 : 0.92,
                opacity: activeDeckDay === 2 ? 1 : 0.4,
                zIndex: activeDeckDay === 2 ? 20 : 10,
              }}
              transition={{ type: 'spring', stiffness: 70, damping: 16, mass: 0.8 }}
              className={`absolute inset-y-0 left-0 w-[90%] glass-premium p-8 rounded-[24px] border border-white/10 flex flex-col justify-between select-none ${activeDeckDay === 1 ? 'cursor-pointer hover:border-white/20 hover:opacity-60' : 'pointer-events-auto'
                }`}
            >
              {/* Card Watermark */}
              <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none select-none">
                <span className="text-[120px] font-extrabold font-display text-white leading-none">02</span>
              </div>

              {/* Day Card Header */}
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs uppercase tracking-widest text-violet-accent font-bold">
                    Sunday • Masterclass Day 02
                  </span>
                  <h3 className="text-2xl font-bold font-display text-[#F2F2F2] mt-1">
                    {webinarData.curriculum[1].title}
                  </h3>
                </div>
                <span className="text-[10px] uppercase font-mono tracking-widest px-2.5 py-1 rounded border bg-white/5 text-neutral-400 border-white/10">
                  Video Production
                </span>
              </div>

              {/* Day Card Content (2 Cols) */}
              <div className="grid grid-cols-12 gap-8 my-6 items-center">
                {/* Left: Key Topics (7 Cols) */}
                <div className="col-span-7 space-y-4">
                  <span className="text-xs uppercase tracking-wider text-neutral-400 font-bold block">
                    Key Topics Covered
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    {webinarData.curriculum[1].topics.map((topic, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3.5 rounded-xl glass-premium glass-premium-hover transition-all duration-300 group/item"
                      >
                        <div className="w-5 h-5 rounded bg-violet-accent/10 text-violet-accent border border-violet-accent/20 flex items-center justify-center shrink-0 group-hover/item:bg-violet-accent group-hover/item:text-black transition-colors duration-300">
                          <Check className="w-3 h-3" />
                        </div>
                        <span className="text-[11px] text-neutral-300 font-medium leading-tight group-hover/item:text-white transition-colors">
                          {topic}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Media Showcase (5 Cols) */}
                <div className="col-span-5 flex flex-col justify-center">
                  <div className="relative w-full h-[280px] rounded-2xl overflow-hidden border border-white/10 bg-black group/theater shadow-2xl">
                    {activeDeckDay === 2 ? (
                      <video
                        src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c022f73b44100b54d76b9e583b3ecdc6&profile_id=139&oauth2_token_id=57447761"
                        muted
                        loop
                        autoPlay
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-neutral-950 flex items-center justify-center">
                        <span className="text-[10px] text-neutral-500 font-mono">Video Paused</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Day Card Capstone */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-accent/10 to-transparent border border-violet-accent/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1 max-w-md">
                  <span className="text-[9px] uppercase tracking-widest font-bold text-violet-accent">Capstone Project</span>
                  <h4 className="text-sm font-bold text-white font-display">
                    Commercial Video Ad Campaign Visual
                  </h4>
                  <p className="text-xs text-neutral-400 font-sans">
                    Assemble, animate, and color grade a 15-second high-fidelity video ad.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-6">
                  <div className="text-left font-mono space-y-1 text-[10px] text-neutral-400">
                    <div className="flex items-center gap-1.5 text-white">
                      <Calendar className="w-3.5 h-3.5 text-violet-accent" />
                      <span>Sunday, July 5</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-violet-accent" />
                      <span>6:00 PM IST</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsModalOpen(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-violet-accent text-black font-bold text-xs hover:shadow-[0_0_25px_rgba(127,0,255,0.5)] hover:scale-[1.02] transition-all duration-300 shrink-0 cursor-pointer"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </motion.div>

          </div>

          {/* --- MOBILE/TABLET: STACKED LAYOUT --- */}
          <div className="lg:hidden block space-y-8 max-w-2xl mx-auto">
            {webinarData.curriculum.map((dayData) => (
              <div
                key={dayData.day}
                className="glass-premium p-6 sm:p-8 rounded-[24px] border border-white/10 flex flex-col gap-6"
              >
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-violet-accent font-bold">
                      Day 0{dayData.day} • {dayData.day === 1 ? 'Saturday' : 'Sunday'}
                    </span>
                    <h3 className="text-xl font-bold font-display text-[#F2F2F2] mt-1">
                      {dayData.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-neutral-400 leading-relaxed font-sans">
                  {dayData.subtitle}
                </p>

                {/* Visual Presenter */}
                <div className="relative w-full h-[200px] sm:h-[260px] rounded-2xl overflow-hidden border border-white/10 bg-black">
                  {dayData.day === 1 ? (
                    <div className="w-full h-full relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={day1Images[currentImgIndex]}
                        alt="Day 1 Project Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                        {day1Images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImgIndex(idx)}
                            className={`w-1.5 h-1.5 rounded-full transition-all ${currentImgIndex === idx ? 'bg-violet-accent w-3.5' : 'bg-white/35'
                              }`}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <video
                      src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c022f73b44100b54d76b9e583b3ecdc6&profile_id=139&oauth2_token_id=57447761"
                      muted
                      loop
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Topics Grid */}
                <div className="space-y-3">
                  <span className="text-xs uppercase tracking-wider text-neutral-400 font-bold block">
                    Key Topics Covered
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {dayData.topics.map((topic, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3.5 rounded-xl glass-premium"
                      >
                        <div className="w-5 h-5 rounded bg-violet-accent/10 text-violet-accent border border-violet-accent/20 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3" />
                        </div>
                        <span className="text-xs text-neutral-300 font-medium leading-tight">
                          {topic}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Capstone */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-accent/10 to-transparent border border-violet-accent/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase tracking-widest font-bold text-violet-accent block">Capstone Project</span>
                    <h4 className="text-sm font-bold text-white font-display">
                      {dayData.day === 1 ? 'Consistent Multi-Scene Character Storyboard' : 'Commercial Video Ad Campaign Visual'}
                    </h4>
                    <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                      {dayData.day === 1
                        ? 'Create a 6-frame storyboard maintaining the exact same character.'
                        : 'Assemble, animate, and color grade a 15-second high-fidelity video ad.'}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5 sm:pt-0 sm:border-t-0">
                    <div className="text-left font-mono space-y-1 text-[10px] text-neutral-400">
                      <div className="flex items-center gap-1.5 text-white">
                        <Calendar className="w-3.5 h-3.5 text-violet-accent" />
                        <span>{dayData.day === 1 ? 'Saturday, July 4' : 'Sunday, July 5'}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-violet-accent" />
                        <span>6:00 PM IST</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="px-4 py-2 rounded-xl bg-violet-accent text-black font-bold text-xs hover:shadow-[0_0_25px_rgba(127,0,255,0.5)] hover:scale-[1.02] transition-all duration-300 shrink-0 cursor-pointer w-full sm:w-auto text-center"
                    >
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SUCCESS STORIES (3D VIDEO TESTIMONIALS DECK) */}
      <section id="testimonials" className="py-20 bg-[#000000] border-t border-white/10 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#F2F2F2] bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              Student Results
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight text-[#F2F2F2] mt-6 mb-4">
              Success Stories
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              See what our students are creating and how this masterclass transformed their creative workflow.
            </p>
          </div>

          {/* 3D Overlapping Card Deck */}
          <div className="relative w-full max-w-5xl mx-auto h-[480px] sm:h-[620px] flex items-center justify-center overflow-hidden">
            {testimonials.map((t, i) => {
              // Calculate offset in a loop of 5
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
                      setIsTestimonialMuted(true); // Reset to muted on switch
                    }
                  }}
                  animate={{
                    x: isMobile ? `${offset * 15}%` : `${offset * 32}%`,
                    scale: isActive ? 1 : 0.82,
                    opacity: isActive ? 1 : 0.45,
                    zIndex: isActive ? 30 : 20 - Math.abs(offset),
                    rotateY: isActive ? 0 : offset * 12,
                  }}
                  transition={{ type: 'spring', stiffness: 70, damping: 16, mass: 0.8 }}
                  className={`absolute w-[260px] sm:w-[380px] md:w-[440px] glass-premium rounded-[24px] p-2.5 select-none transition-all duration-300 ${
                    isActive 
                      ? 'cursor-default shadow-[0_20px_50px_rgba(127,0,255,0.15)] border-white/20' 
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
                        key={t.src} // force re-render when active to ensure autoplay works
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

                    {/* Mute Button (Only on Active Card) */}
                    {isActive && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsTestimonialMuted(!isTestimonialMuted);
                        }}
                        className="absolute bottom-3 right-3 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 border border-white/15 hover:border-violet-accent/50 flex items-center justify-center text-white backdrop-blur-md transition-all duration-300 shadow-lg hover:scale-105 cursor-pointer"
                        title={isTestimonialMuted ? "Unmute" : "Mute"}
                      >
                        {isTestimonialMuted ? (
                          <VolumeX className="w-4 h-4 text-violet-accent" />
                        ) : (
                          <Volume2 className="w-4 h-4 text-violet-accent" />
                        )}
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TARGET AUDIENCE ("WHO IS THIS FOR?") */}
      <section id="audience" className="py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#F2F2F2]">Designed for Creators</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight text-[#F2F2F2] mt-3 mb-4">
              Who is this Masterclass for?
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              Whether you are looking to scale content production, prototype visual assets, or storyboard cinematic films.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-6xl mx-auto">
            {/* Card 1: Content Creators (4 Cols) */}
            <div className="md:col-span-4 h-[340px] glass-premium glass-premium-hover rounded-[24px] group relative overflow-hidden flex flex-col justify-between">
              <div className="p-6 z-10">
                <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/20 flex items-center justify-center mb-5 text-white shadow-[0_0_15px_rgba(255,255,255,0.15)] group-hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] group-hover:border-white/80 group-hover:bg-white group-hover:text-black transition-all duration-300">
                  {getIconComponent(webinarData.audience[0].icon)}
                </div>
                <h4 className="text-lg font-bold text-[#F2F2F2] font-display mb-2 group-hover:text-white transition-colors">
                  {webinarData.audience[0].title}
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors font-sans">
                  {webinarData.audience[0].description}
                </p>
              </div>
              <div className="relative h-36 w-full overflow-hidden mt-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop"
                  alt={webinarData.audience[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Card 2: Designers (4 Cols) */}
            <div className="md:col-span-4 h-[340px] glass-premium glass-premium-hover rounded-[24px] group relative overflow-hidden flex flex-col justify-between">
              <div className="p-6 z-10">
                <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/20 flex items-center justify-center mb-5 text-white shadow-[0_0_15px_rgba(255,255,255,0.15)] group-hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] group-hover:border-white/80 group-hover:bg-white group-hover:text-black transition-all duration-300">
                  {getIconComponent(webinarData.audience[1].icon)}
                </div>
                <h4 className="text-lg font-bold text-[#F2F2F2] font-display mb-2 group-hover:text-white transition-colors">
                  {webinarData.audience[1].title}
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors font-sans">
                  {webinarData.audience[1].description}
                </p>
              </div>
              <div className="relative h-36 w-full overflow-hidden mt-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop"
                  alt={webinarData.audience[1].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Card 3: Filmmakers (4 Cols) */}
            <div className="md:col-span-4 h-[340px] glass-premium glass-premium-hover rounded-[24px] group relative overflow-hidden flex flex-col justify-between">
              <div className="p-6 z-10">
                <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/20 flex items-center justify-center mb-5 text-white shadow-[0_0_15px_rgba(255,255,255,0.15)] group-hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] group-hover:border-white/80 group-hover:bg-white group-hover:text-black transition-all duration-300">
                  {getIconComponent(webinarData.audience[2].icon)}
                </div>
                <h4 className="text-lg font-bold text-[#F2F2F2] font-display mb-2 group-hover:text-white transition-colors">
                  {webinarData.audience[2].title}
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors font-sans">
                  {webinarData.audience[2].description}
                </p>
              </div>
              <div className="relative h-36 w-full overflow-hidden mt-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=600&auto=format&fit=crop"
                  alt={webinarData.audience[2].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Card 4: Marketing Professionals (6 Cols) */}
            <div className="md:col-span-6 h-[220px] glass-premium glass-premium-hover rounded-[24px] group relative overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-12 h-full">
                <div className="sm:col-span-7 p-6 flex flex-col justify-between h-full z-10">
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/20 flex items-center justify-center mb-4 text-white shadow-[0_0_15px_rgba(255,255,255,0.15)] group-hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] group-hover:border-white/80 group-hover:bg-white group-hover:text-black transition-all duration-300">
                      {getIconComponent(webinarData.audience[3].icon)}
                    </div>
                    <h4 className="text-lg font-bold text-[#F2F2F2] font-display mb-1.5 group-hover:text-white transition-colors">
                      {webinarData.audience[3].title}
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors font-sans">
                      {webinarData.audience[3].description}
                    </p>
                  </div>
                </div>
                <div className="sm:col-span-5 relative h-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop"
                    alt={webinarData.audience[3].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

            {/* Card 5: Students (6 Cols) */}
            <div className="md:col-span-6 h-[220px] glass-premium glass-premium-hover rounded-[24px] group relative overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-12 h-full">
                <div className="sm:col-span-7 p-6 flex flex-col justify-between h-full z-10">
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/20 flex items-center justify-center mb-4 text-white shadow-[0_0_15px_rgba(255,255,255,0.15)] group-hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] group-hover:border-white/80 group-hover:bg-white group-hover:text-black transition-all duration-300">
                      {getIconComponent(webinarData.audience[4].icon)}
                    </div>
                    <h4 className="text-lg font-bold text-[#F2F2F2] font-display mb-1.5 group-hover:text-white transition-colors">
                      {webinarData.audience[4].title}
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors font-sans">
                      {webinarData.audience[4].description}
                    </p>
                  </div>
                </div>
                <div className="sm:col-span-5 relative h-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop"
                    alt={webinarData.audience[4].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

            {/* Card 6: Entrepreneurs (6 Cols) */}
            <div className="md:col-span-6 h-[220px] glass-premium glass-premium-hover rounded-[24px] group relative overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-12 h-full">
                <div className="sm:col-span-7 p-6 flex flex-col justify-between h-full z-10">
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/20 flex items-center justify-center mb-4 text-white shadow-[0_0_15px_rgba(255,255,255,0.15)] group-hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] group-hover:border-white/80 group-hover:bg-white group-hover:text-black transition-all duration-300">
                      {getIconComponent(webinarData.audience[5].icon)}
                    </div>
                    <h4 className="text-lg font-bold text-[#F2F2F2] font-display mb-1.5 group-hover:text-white transition-colors">
                      {webinarData.audience[5].title}
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors font-sans">
                      {webinarData.audience[5].description}
                    </p>
                  </div>
                </div>
                <div className="sm:col-span-5 relative h-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop"
                    alt={webinarData.audience[5].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

            {/* Card 7: Social Media Creators (6 Cols) */}
            <div className="md:col-span-6 h-[220px] glass-premium glass-premium-hover rounded-[24px] group relative overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-12 h-full">
                <div className="sm:col-span-7 p-6 flex flex-col justify-between h-full z-10">
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/20 flex items-center justify-center mb-4 text-white shadow-[0_0_15px_rgba(255,255,255,0.15)] group-hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] group-hover:border-white/80 group-hover:bg-white group-hover:text-black transition-all duration-300">
                      {getIconComponent(webinarData.audience[6].icon)}
                    </div>
                    <h4 className="text-lg font-bold text-[#F2F2F2] font-display mb-1.5 group-hover:text-white transition-colors">
                      {webinarData.audience[6].title}
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors font-sans">
                      {webinarData.audience[6].description}
                    </p>
                  </div>
                </div>
                <div className="sm:col-span-5 relative h-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=600&auto=format&fit=crop"
                    alt={webinarData.audience[6].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* EXCLUSIVE BONUSES */}
      <section id="bonuses" className="py-20 bg-white/5 border-y border-white/10 relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#F2F2F2]">Extra Value Included</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight text-[#F2F2F2] mt-3 mb-4">
              Exclusive Bonuses Free with Registration
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              Get instant access to tools, templates, and certificates valued at over ₹5,000.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {webinarData.bonuses.map((bonus, index) => (
              <div
                key={index}
                className="glass-panel glass-panel-hover p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between border-l-2 border-l-[#F2F2F2]"
              >
                <div>
                  <div className="flex justify-between items-start mb-5">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                      {getIconComponent(bonus.icon)}
                    </div>
                    <span className="text-xs font-mono font-bold text-[#F2F2F2] bg-white/10 border border-white/20 px-2.5 py-0.5 rounded-full">
                      Value: {bonus.value}
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-[#F2F2F2] font-display mb-2">
                    {bonus.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {bonus.description}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-white/10 flex items-center gap-1.5 text-xs text-neutral-400 font-semibold">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Free with registration</span>
                </div>
              </div>
            ))}
          </div>

          {/* Total Value Summary CTA */}
          <div className="glass-premium p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-lg sm:text-xl font-bold font-display text-[#F2F2F2]">Ready to claim your bonuses?</h4>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
                Register for the 2-day live masterclass at just ₹{webinarData.fee} and unlock all five bonuses immediately upon completion.
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-[#F2F2F2] hover:bg-white text-[#000000] font-bold rounded-lg shadow-lg shadow-white/10 shrink-0 flex items-center gap-2 hover:scale-[1.02] transition-all cursor-pointer text-xs sm:text-sm uppercase tracking-wider"
            >
              Claim Bonuses Now <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* INSTRUCTORS SECTION */}
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#F2F2F2]">Learn from the Experts</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight text-[#F2F2F2] mt-3 mb-4">
              Your Instructors
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              Learn directly from active creators and industry practitioners who build AI workflows for top brands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {webinarData.instructors.map((instructor, index) => (
              <div
                key={index}
                className="glass-panel p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-6"
              >
                {/* Profile Image with Ring */}
                <div className="relative shrink-0">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-white/5 blur-sm opacity-40" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={instructor.image}
                    alt={instructor.name}
                    className="relative w-20 h-20 rounded-full object-cover border-2 border-white/20 shadow-md"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-bold text-[#F2F2F2] font-display">{instructor.name}</h4>
                    {instructor.linkedin && (
                      <a
                        href={instructor.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="text-neutral-400 hover:text-white transition-colors"
                      >
                        <Linkedin className="w-4 h-4 text-[#F2F2F2]" />
                      </a>
                    )}
                  </div>
                  <span className="text-xs font-semibold text-white uppercase tracking-wider block">
                    {instructor.role}
                  </span>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {instructor.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>



      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#000000]/60 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-white/10 pb-8 mb-8">

            <Logo size="lg" />

            <div className="flex flex-wrap justify-center gap-8 text-xs sm:text-sm text-neutral-400">
              <a href="#about" className="hover:text-white transition-colors">About</a>
              <a href="#curriculum" className="hover:text-white transition-colors">Curriculum</a>
              <a href="#audience" className="hover:text-white transition-colors">Who It&apos;s For</a>
              <a href="#bonuses" className="hover:text-white transition-colors">Bonuses</a>
              <a href="#faqs" className="hover:text-white transition-colors">FAQs</a>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-xs text-neutral-400">
            <p>&copy; {new Date().getFullYear()} SapAin. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-neutral-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-neutral-400 hover:text-white transition-colors">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* STICKY BOTTOM REGISTRATION BAR */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-black/90 backdrop-blur-md py-3.5 shadow-2xl"
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">

              {/* Left Details */}
              <div className="flex items-center gap-4">
                <div className="hidden sm:block leading-tight">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-1.5 w-1.5 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-accent opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-violet-accent"></span>
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-[#F2F2F2] font-bold">Live Masterclass</span>
                  </div>
                  <h4 className="text-xs font-bold text-[#F2F2F2] font-display">AI Image & Video Generation</h4>
                </div>

                <div className="flex items-baseline gap-1.5">
                  <span className="text-base font-extrabold text-[#F2F2F2]">₹{webinarData.fee}</span>
                  <span className="text-[10px] text-neutral-500 line-through">₹{webinarData.originalFee}</span>
                </div>

                <div className="hidden md:flex items-center gap-1.5 text-[10px] text-red-500 font-semibold bg-red-500/10 px-2.5 py-0.5 rounded border border-red-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                  <span>Only {seatsLeft} seats left!</span>
                </div>
              </div>

              {/* Right Action */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-5 py-2 bg-[#F2F2F2] hover:bg-white text-[#000000] font-bold text-xs uppercase tracking-wider rounded-lg shadow-lg hover:shadow-violet-accent/25 hover:scale-[1.02] transition-all cursor-pointer"
              >
                Register Seat
              </button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* REGISTRATION MODAL */}
      <RegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        fee={webinarData.fee}
        originalFee={webinarData.originalFee}
      />
    </div>
  );
}
