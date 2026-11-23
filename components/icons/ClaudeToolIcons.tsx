'use client';

import React from 'react';

// 1. Claude 3.7 Sonnet - Authentic Anthropic Claude Terracotta Spark Emblem
export const ClaudeSonnetIcon = ({ className = 'w-14 h-14' }: { className?: string }) => (
  <div className={`${className} relative rounded-2xl bg-[#D97757]/10 border border-[#D97757]/30 flex items-center justify-center p-2.5 shadow-[0_0_25px_rgba(217,119,87,0.2)] group-hover:border-[#D97757]/60 group-hover:bg-[#D97757]/20 transition-all duration-300`}>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-full h-full"
      aria-label="Claude 3.7 Sonnet"
    >
      {/* Official Anthropic Claude Spark Icon */}
      <path
        d="M13.5 2.5C13.5 1.67 12.83 1 12 1C11.17 1 10.5 1.67 10.5 2.5V8.5C10.5 9.33 11.17 10 12 10C12.83 10 13.5 9.33 13.5 8.5V2.5Z"
        fill="#D97757"
      />
      <path
        d="M13.5 15.5C13.5 14.67 12.83 14 12 14C11.17 14 10.5 14.67 10.5 15.5V21.5C10.5 22.33 11.17 23 12 23C12.83 23 13.5 22.33 13.5 21.5V15.5Z"
        fill="#D97757"
      />
      <path
        d="M21.5 10.5H15.5C14.67 10.5 14 11.17 14 12C14 12.83 14.67 13.5 15.5 13.5H21.5C22.33 13.5 23 12.83 23 12C23 11.17 22.33 10.5 21.5 10.5Z"
        fill="#D97757"
      />
      <path
        d="M8.5 10.5H2.5C1.67 10.5 1 11.17 1 12C1 12.83 1.67 13.5 2.5 13.5H8.5C9.33 13.5 10 12.83 10 12C10 11.17 9.33 10.5 8.5 10.5Z"
        fill="#D97757"
      />
      <path
        d="M18.72 5.28C18.13 4.69 17.18 4.69 16.59 5.28L12.35 9.52C11.76 10.11 11.76 11.06 12.35 11.65C12.94 12.24 13.89 12.24 14.48 11.65L18.72 7.41C19.31 6.82 19.31 5.87 18.72 5.28Z"
        fill="#D97757"
      />
      <path
        d="M7.41 16.59C6.82 16 5.87 16 5.28 16.59C4.69 17.18 4.69 18.13 5.28 18.72L9.52 22.96C10.11 23.55 11.06 23.55 11.65 22.96C12.24 22.37 12.24 21.42 11.65 20.83L7.41 16.59Z"
        fill="#D97757"
      />
      <path
        d="M5.28 5.28C4.69 5.87 4.69 6.82 5.28 7.41L9.52 11.65C10.11 12.24 11.06 12.24 11.65 11.65C12.24 11.06 12.24 10.11 11.65 9.52L7.41 5.28C6.82 4.69 5.87 4.69 5.28 5.28Z"
        fill="#D97757"
      />
      <path
        d="M16.59 18.72C17.18 19.31 18.13 19.31 18.72 18.72L22.96 14.48C23.55 13.89 23.55 12.94 22.96 12.35C22.37 11.76 21.42 11.76 20.83 12.35L16.59 16.59C16 17.18 16 18.13 16.59 18.72Z"
        fill="#D97757"
      />
      {/* Center core glow */}
      <circle cx="12" cy="12" r="2.5" fill="#F8A07A" />
    </svg>
  </div>
);

// 2. Claude Code - CLI Developer Agent & Terminal
export const ClaudeCodeIcon = ({ className = 'w-14 h-14' }: { className?: string }) => (
  <div className={`${className} relative rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center p-2.5 shadow-[0_0_25px_rgba(16,185,129,0.2)] group-hover:border-emerald-500/60 group-hover:bg-emerald-500/20 transition-all duration-300`}>
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className="w-full h-full"
      aria-label="Claude Code"
    >
      {/* Terminal window frame */}
      <rect x="4" y="6" width="40" height="36" rx="8" fill="#0D1117" stroke="#10B981" strokeWidth="2" />
      {/* Terminal header line */}
      <line x1="4" y1="16" x2="44" y2="16" stroke="#10B981" strokeOpacity="0.3" strokeWidth="1.5" />
      {/* Window dots */}
      <circle cx="10" cy="11" r="2" fill="#EF4444" />
      <circle cx="16" cy="11" r="2" fill="#F59E0B" />
      <circle cx="22" cy="11" r="2" fill="#10B981" />
      {/* Command Prompt >_ */}
      <path d="M12 24L19 29L12 34" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="23" y1="34" x2="33" y2="34" stroke="#D97757" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  </div>
);

// 3. Claude Desktop - Application Window Setup
export const ClaudeDesktopIcon = ({ className = 'w-14 h-14' }: { className?: string }) => (
  <div className={`${className} relative rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center p-2.5 shadow-[0_0_25px_rgba(245,158,11,0.2)] group-hover:border-amber-500/60 group-hover:bg-amber-500/20 transition-all duration-300`}>
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className="w-full h-full"
      aria-label="Claude Desktop"
    >
      {/* Desktop App Window */}
      <rect x="5" y="5" width="38" height="38" rx="10" fill="#16151D" stroke="#F59E0B" strokeWidth="2" />
      {/* App Header */}
      <path d="M5 15C5 9.477 9.477 5 15 5H33C38.523 5 43 9.477 43 15V16H5V15Z" fill="#252433" />
      {/* Header Dots */}
      <circle cx="12" cy="11" r="2" fill="#D97757" />
      <circle cx="18" cy="11" r="2" fill="#F59E0B" />
      <circle cx="24" cy="11" r="2" fill="#10B981" />
      {/* Claude Mini Spark inside */}
      <g transform="translate(14, 20) scale(0.85)">
        <path d="M12 2v6M12 16v6M2 12h6M16 12h6M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M4.93 19.07l4.24-4.24M14.83 9.17l4.24-4.24" stroke="#D97757" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="12" cy="12" r="2" fill="#F8A07A" />
      </g>
    </svg>
  </div>
);

// 4. Remotion Engine - Official Triangle Play Delta in Cyan/Electric Blue
export const RemotionEngineIcon = ({ className = 'w-14 h-14' }: { className?: string }) => (
  <div className={`${className} relative rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center p-2.5 shadow-[0_0_25px_rgba(11,132,243,0.25)] group-hover:border-blue-400/60 group-hover:bg-blue-500/20 transition-all duration-300`}>
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className="w-full h-full"
      aria-label="Remotion Engine"
    >
      <defs>
        <linearGradient id="remotion-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0B84F3" />
          <stop offset="50%" stopColor="#00C8D2" />
          <stop offset="100%" stopColor="#00E5FF" />
        </linearGradient>
      </defs>
      {/* Remotion Triangle Delta Shape */}
      <path
        d="M13 9.6c0-2.3 2.5-3.8 4.6-2.6l23 13.2c2 1.2 2 4.1 0 5.3l-23 13.2c-2 1.2-4.6-.3-4.6-2.6V9.6z"
        fill="url(#remotion-grad)"
      />
      {/* Video timeline cut inside */}
      <path
        d="M20 18L32 24L20 30V18Z"
        fill="#FFFFFF"
        fillOpacity="0.9"
      />
    </svg>
  </div>
);

// 5. SVG Motion Design - Bezier Path Pen Tool
export const SvgMotionIcon = ({ className = 'w-14 h-14' }: { className?: string }) => (
  <div className={`${className} relative rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center p-2.5 shadow-[0_0_25px_rgba(168,85,247,0.25)] group-hover:border-purple-400/60 group-hover:bg-purple-500/20 transition-all duration-300`}>
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className="w-full h-full"
      aria-label="SVG Motion Design"
    >
      <defs>
        <linearGradient id="svg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C084FC" />
          <stop offset="100%" stopColor="#818CF8" />
        </linearGradient>
      </defs>
      {/* Smooth Bezier Spline */}
      <path
        d="M8 36C14 16 34 32 40 12"
        stroke="url(#svg-grad)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Control Nodes */}
      <circle cx="8" cy="36" r="4" fill="#818CF8" stroke="#FFFFFF" strokeWidth="1.5" />
      <circle cx="40" cy="12" r="4" fill="#C084FC" stroke="#FFFFFF" strokeWidth="1.5" />
      {/* Pen Tool / Vector Nib */}
      <path
        d="M24 14L32 22L21 33L15 35L17 29L28 18"
        fill="#FFFFFF"
        fillOpacity="0.15"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="23" cy="27" r="1.5" fill="#C084FC" />
    </svg>
  </div>
);

// 6. Script & Narration - Audio Waveform & Speech Voice
export const ScriptNarrationIcon = ({ className = 'w-14 h-14' }: { className?: string }) => (
  <div className={`${className} relative rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center p-2.5 shadow-[0_0_25px_rgba(244,63,94,0.25)] group-hover:border-rose-400/60 group-hover:bg-rose-500/20 transition-all duration-300`}>
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className="w-full h-full"
      aria-label="Script & Narration"
    >
      <defs>
        <linearGradient id="audio-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FB7185" />
          <stop offset="50%" stopColor="#F43F5E" />
          <stop offset="100%" stopColor="#E11D48" />
        </linearGradient>
      </defs>
      {/* Waveform Equalizer Bars */}
      <rect x="6" y="20" width="3.5" height="8" rx="1.75" fill="url(#audio-grad)" />
      <rect x="13" y="14" width="3.5" height="20" rx="1.75" fill="url(#audio-grad)" />
      <rect x="20" y="8" width="3.5" height="32" rx="1.75" fill="url(#audio-grad)" />
      <rect x="27" y="12" width="3.5" height="24" rx="1.75" fill="url(#audio-grad)" />
      <rect x="34" y="17" width="3.5" height="14" rx="1.75" fill="url(#audio-grad)" />
      <rect x="41" y="22" width="3.5" height="4" rx="1.75" fill="url(#audio-grad)" />
    </svg>
  </div>
);

// 7. + Reusable Prompts - Structured Prompt Templates & Sparkles
export const ReusablePromptsIcon = ({ className = 'w-14 h-14' }: { className?: string }) => (
  <div className={`${className} relative rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center p-2.5 shadow-[0_0_25px_rgba(16,185,129,0.25)] group-hover:border-emerald-400/60 group-hover:bg-emerald-500/20 transition-all duration-300`}>
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className="w-full h-full"
      aria-label="Reusable Prompts"
    >
      <defs>
        <linearGradient id="prompts-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
      {/* Back Prompt Sheet */}
      <rect x="13" y="6" width="26" height="32" rx="6" fill="#1F2937" stroke="#34D399" strokeWidth="1.5" strokeOpacity="0.4" />
      {/* Front Prompt Sheet */}
      <rect x="8" y="12" width="26" height="30" rx="6" fill="#0D1117" stroke="url(#prompts-grad)" strokeWidth="2" />
      {/* Prompt Lines */}
      <line x1="14" y1="20" x2="28" y2="20" stroke="#34D399" strokeWidth="2" strokeLinecap="round" />
      <line x1="14" y1="26" x2="24" y2="26" stroke="#FFFFFF" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" />
      <line x1="14" y1="32" x2="20" y2="32" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" />
      {/* Magic Sparkle on top right */}
      <path
        d="M36 24L37.5 28.5L42 30L37.5 31.5L36 36L34.5 31.5L30 30L34.5 28.5L36 24Z"
        fill="#34D399"
      />
    </svg>
  </div>
);
