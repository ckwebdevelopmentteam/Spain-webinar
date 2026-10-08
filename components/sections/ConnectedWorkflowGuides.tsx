'use client';

import React, { useState } from 'react';
import { BookOpen, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { webinarData } from '@/data/webinarData';

interface ConnectedWorkflowGuidesProps {
  onClaimSeat: () => void;
}

export function ConnectedWorkflowGuides({ onClaimSeat }: ConnectedWorkflowGuidesProps) {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const guides = webinarData.workflowGuides;
  const row1 = guides.slice(0, 5); // Steps 1 to 5
  const row2 = guides.slice(5, 10); // Steps 6 to 10

  return (
    <section id="guides" className="py-20 md:py-28 bg-[#050505] border-t border-white/10 relative overflow-hidden">
      {/* Background ambient workflow glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-white/[0.02] blur-[150px] rounded-full" />
        <div className="absolute top-1/3 left-1/4 w-[350px] h-[250px] bg-emerald-500/[0.02] blur-[120px] rounded-full" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-18">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-medium tracking-wider text-neutral-300 uppercase">
              Here&apos;s Something Extra
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white mb-4">
            10 Free Creative Workflow Guides
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Included free with every workshop registration to accelerate your storytelling and directing workflow.
          </p>
        </div>

        {/* ======================================================== */}
        {/* DESKTOP CONNECTED PIPELINE (lg screens: 5 columns x 2 rows with gaps) */}
        {/* ======================================================== */}
        <div className="hidden lg:block max-w-6xl mx-auto mb-16 relative">

          {/* ROW 1: Steps 01 to 05 */}
          <div className="relative">
            <div className="grid grid-cols-5 gap-4 lg:gap-5 items-stretch">
              {row1.map((guide, idx) => {
                const isHovered = activeStep === guide.number;
                const isConnected = activeStep !== null && (activeStep === guide.number || activeStep === guide.number - 1);
                const isLastInRow = idx === row1.length - 1;

                return (
                  <div key={guide.number} className="relative flex items-center">
                    {/* The Guide Card */}
                    <div
                      onMouseEnter={() => setActiveStep(guide.number)}
                      onMouseLeave={() => setActiveStep(null)}
                      className={`relative z-10 w-full min-h-[154px] p-5 rounded-2xl flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                        isHovered
                          ? 'bg-neutral-900/90 border border-white/40 shadow-[0_0_28px_rgba(255,255,255,0.12)] -translate-y-1'
                          : 'bg-white/[0.03] border border-white/10 hover:border-white/25 hover:bg-white/[0.05]'
                      }`}
                    >
                      {/* Left Node Dot (Input port) */}
                      {idx > 0 && (
                        <div
                          className={`absolute -left-[5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border transition-all duration-300 z-20 ${
                            isHovered || isConnected
                              ? 'bg-white border-white shadow-[0_0_8px_#ffffff]'
                              : 'bg-neutral-800 border-white/40'
                          }`}
                        />
                      )}

                      {/* Right Node Dot (Output port) */}
                      <div
                        className={`absolute -right-[5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border transition-all duration-300 z-20 ${
                          isHovered || (activeStep === guide.number)
                            ? 'bg-white border-white shadow-[0_0_8px_#ffffff]'
                            : 'bg-neutral-800 border-white/40'
                        }`}
                      />

                      {/* Card Header: Step number & Icon */}
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-medium text-xs transition-all ${
                            isHovered
                              ? 'bg-white text-black font-semibold'
                              : 'bg-white/10 text-white'
                          }`}
                        >
                          {guide.number < 10 ? `0${guide.number}` : guide.number}
                        </span>
                        <BookOpen
                          className={`w-4 h-4 transition-colors ${
                            isHovered ? 'text-white' : 'text-neutral-400'
                          }`}
                        />
                      </div>

                      {/* Card Title */}
                      <h4
                        className={`text-xs sm:text-sm font-semibold leading-snug transition-colors ${
                          isHovered ? 'text-white' : 'text-neutral-200'
                        }`}
                      >
                        {guide.title}
                      </h4>
                    </div>

                    {/* Horizontal Connector Bridge across the gap */}
                    {!isLastInRow && (
                      <div className="absolute -right-4 lg:-right-5 top-1/2 -translate-y-1/2 w-4 lg:w-5 flex items-center justify-center pointer-events-none z-10">
                        {/* Connecting Line Wire */}
                        <div
                          className={`w-full h-[2px] transition-all duration-300 ${
                            isConnected
                              ? 'bg-white shadow-[0_0_8px_#ffffff]'
                              : 'bg-gradient-to-r from-white/30 via-white/20 to-white/30'
                          }`}
                        />
                        {/* Center pulse dot */}
                        <div
                          className={`absolute w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            isConnected
                              ? 'bg-white shadow-[0_0_6px_#ffffff] scale-125'
                              : 'bg-white/40'
                          }`}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Curving Connector Bridge between Row 1 and Row 2 */}
          <div className="relative h-14 w-full my-3 flex items-center justify-between px-6 pointer-events-none">
            {/* Left flow guidance */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-neutral-400 font-mono tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-ping" />
              <span>PHASE 1: FOUNDATION</span>
            </div>

            {/* Connecting track across rows */}
            <div className="flex-1 mx-8 relative flex items-center">
              <div className="w-full h-[1px] bg-gradient-to-r from-white/10 via-white/20 to-white/10 border-t border-dashed border-white/20" />
            </div>

            {/* Right flow guidance to Phase 2 */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-[11px] text-neutral-300 font-mono tracking-wider">
              <span>PHASE 2: DIRECTING & PRODUCTION</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </div>
          </div>

          {/* ROW 2: Steps 06 to 10 */}
          <div className="relative">
            <div className="grid grid-cols-5 gap-4 lg:gap-5 items-stretch">
              {row2.map((guide, idx) => {
                const isHovered = activeStep === guide.number;
                const isConnected = activeStep !== null && (activeStep === guide.number || activeStep === guide.number - 1);
                const isLastInRow = idx === row2.length - 1;

                return (
                  <div key={guide.number} className="relative flex items-center">
                    {/* The Guide Card */}
                    <div
                      onMouseEnter={() => setActiveStep(guide.number)}
                      onMouseLeave={() => setActiveStep(null)}
                      className={`relative z-10 w-full min-h-[154px] p-5 rounded-2xl flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                        isHovered
                          ? 'bg-neutral-900/90 border border-white/40 shadow-[0_0_28px_rgba(255,255,255,0.12)] -translate-y-1'
                          : 'bg-white/[0.03] border border-white/10 hover:border-white/25 hover:bg-white/[0.05]'
                      }`}
                    >
                      {/* Left Node Dot (Input port) */}
                      <div
                        className={`absolute -left-[5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border transition-all duration-300 z-20 ${
                          isHovered || isConnected
                            ? 'bg-white border-white shadow-[0_0_8px_#ffffff]'
                            : 'bg-neutral-800 border-white/40'
                        }`}
                      />

                      {/* Right Node Dot (Output port) */}
                      {!isLastInRow ? (
                        <div
                          className={`absolute -right-[5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border transition-all duration-300 z-20 ${
                            isHovered || (activeStep === guide.number)
                              ? 'bg-white border-white shadow-[0_0_8px_#ffffff]'
                              : 'bg-neutral-800 border-white/40'
                          }`}
                        />
                      ) : (
                        /* Complete Finish Node on Step 10 */
                        <div className="absolute -right-[6px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-emerald-400 border border-white shadow-[0_0_12px_#34d399] z-20" />
                      )}

                      {/* Card Header: Step number & Icon */}
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-medium text-xs transition-all ${
                            isHovered
                              ? 'bg-white text-black font-semibold'
                              : 'bg-white/10 text-white'
                          }`}
                        >
                          {guide.number < 10 ? `0${guide.number}` : guide.number}
                        </span>
                        <BookOpen
                          className={`w-4 h-4 transition-colors ${
                            isHovered ? 'text-white' : 'text-neutral-400'
                          }`}
                        />
                      </div>

                      {/* Card Title */}
                      <h4
                        className={`text-xs sm:text-sm font-semibold leading-snug transition-colors ${
                          isHovered ? 'text-white' : 'text-neutral-200'
                        }`}
                      >
                        {guide.title}
                      </h4>
                    </div>

                    {/* Horizontal Connector Bridge across the gap */}
                    {!isLastInRow && (
                      <div className="absolute -right-4 lg:-right-5 top-1/2 -translate-y-1/2 w-4 lg:w-5 flex items-center justify-center pointer-events-none z-10">
                        {/* Connecting Line Wire */}
                        <div
                          className={`w-full h-[2px] transition-all duration-300 ${
                            isConnected
                              ? 'bg-white shadow-[0_0_8px_#ffffff]'
                              : 'bg-gradient-to-r from-white/30 via-white/20 to-white/30'
                          }`}
                        />
                        {/* Center pulse dot */}
                        <div
                          className={`absolute w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            isConnected
                              ? 'bg-white shadow-[0_0_6px_#ffffff] scale-125'
                              : 'bg-white/40'
                          }`}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* ======================================================== */}
        {/* TABLET & MOBILE CONNECTED TIMELINE (Continuous Spine)     */}
        {/* ======================================================== */}
        <div className="block lg:hidden max-w-2xl mx-auto mb-16 relative">
          {/* Vertical continuous central spine */}
          <div className="absolute left-6 sm:left-8 top-6 bottom-6 w-[2px] bg-gradient-to-b from-white/20 via-white/10 to-emerald-400/40" />

          <div className="space-y-4 sm:space-y-5">
            {guides.map((guide) => {
              const isHovered = activeStep === guide.number;
              const isCompleted = guide.number === 10;

              return (
                <div
                  key={guide.number}
                  onMouseEnter={() => setActiveStep(guide.number)}
                  onMouseLeave={() => setActiveStep(null)}
                  className="relative pl-14 sm:pl-18"
                >
                  {/* Connected Spine Node Dot */}
                  <div className="absolute left-6 sm:left-8 -translate-x-1/2 top-6 z-20 flex items-center justify-center">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                        isCompleted
                          ? 'bg-emerald-500 border-white shadow-[0_0_12px_#10b981]'
                          : isHovered
                          ? 'bg-white border-white shadow-[0_0_12px_#ffffff]'
                          : 'bg-[#0A0A0A] border-white/30'
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          isCompleted ? 'bg-white' : isHovered ? 'bg-black' : 'bg-white/60'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Guide Card */}
                  <div
                    className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                      isHovered
                        ? 'bg-neutral-900/90 border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.08)]'
                        : 'bg-white/[0.03] border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center font-mono font-medium text-xs text-white">
                          {guide.number < 10 ? `0${guide.number}` : guide.number}
                        </span>
                        <span className="text-[11px] text-neutral-400 font-mono uppercase tracking-wider">
                          Step {guide.number} of 10
                        </span>
                      </div>
                      <BookOpen className="w-4 h-4 text-neutral-400" />
                    </div>
                    <h4 className="text-sm font-semibold text-white leading-snug">
                      {guide.title}
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Banner with glowing border */}
        <div className="glass-premium p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto relative overflow-hidden border border-white/20">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-300">
                Bonus Bundle Included
              </span>
            </div>
            <h4 className="text-lg sm:text-xl font-medium text-white">
              Unlock all 10 Workflow Guides with your seat
            </h4>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Instant delivery to your email upon workshop enrollment.
            </p>
          </div>
          <button
            onClick={onClaimSeat}
            className="relative z-10 px-6 py-3.5 bg-[#F2F2F2] hover:bg-white text-black font-semibold text-xs tracking-normal rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.35)] shrink-0 cursor-pointer flex items-center gap-2"
          >
            <span>Claim Seat & Guides</span>
            <CheckCircle2 className="w-4 h-4 text-black" />
          </button>
        </div>

      </div>
    </section>
  );
}
