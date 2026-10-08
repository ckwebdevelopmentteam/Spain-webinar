'use client';

import React from 'react';
import { Award, CheckCircle2, ShieldCheck, Share2, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface CourseCertificateSectionProps {
  onEnroll: () => void;
}

export function CourseCertificateSection({ onEnroll }: CourseCertificateSectionProps) {
  return (
    <section id="certificate" className="py-20 md:py-28 bg-[#030303] border-t border-white/10 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-white/[0.03] blur-[140px] rounded-full" />
        <div className="absolute bottom-10 right-1/4 w-[350px] h-[250px] bg-emerald-500/[0.02] blur-[120px] rounded-full" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/10 bg-white/5 mb-3.5">
            <Award className="w-3.5 h-3.5 text-white" />
            <span className="text-xs font-medium tracking-wider text-neutral-300 uppercase font-mono">
              Official Credential
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white mb-4">
            Earn Your Certificate of Completion
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            You will receive this official certificate directly after successfully completing the masterclass — validating your hands-on mastery in modern AI image and cinematic video creation.
          </p>
        </div>

        {/* Main Certificate Showcase Card */}
        <div className="max-w-6xl mx-auto glass-premium rounded-3xl p-6 sm:p-10 lg:p-12 border border-white/15 relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left: Certificate Image Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 relative group"
            >
              {/* Outer decorative glow frame */}
              <div className="relative rounded-2xl overflow-hidden border border-white/20 bg-neutral-950 shadow-[0_0_50px_rgba(255,255,255,0.08)] group-hover:border-white/35 group-hover:shadow-[0_0_60px_rgba(255,255,255,0.15)] transition-all duration-500">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/sapain-completion-certificate.png"
                  alt="Sapain AI Masterclass Completion Certificate"
                  className="w-full h-auto object-contain rounded-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />

                {/* Subtle glass reflection overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] via-transparent to-white/[0.05] pointer-events-none" />
              </div>

              {/* Floating verified badge */}
              <div className="absolute -bottom-3 -right-3 sm:bottom-4 sm:right-4 bg-neutral-900/95 border border-white/20 px-3.5 py-1.5 rounded-full shadow-xl flex items-center gap-2 backdrop-blur-md">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-[11px] font-mono text-white font-medium">Verified Sapain Credential</span>
              </div>
            </motion.div>

            {/* Right: Key Certificate Benefits & Highlights */}
            <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-2">
                  Recognized Achievement
                </span>
                <h3 className="text-2xl sm:text-3xl font-medium text-white tracking-tight leading-snug">
                  Showcase Your AI Directing Skills
                </h3>
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mt-3">
                  This certificate proves that you have mastered end-to-end prompting, image upscaling, visual storytelling, and cinematic video workflows with cutting-edge tools.
                </p>
              </div>

              {/* Feature Highlights */}
              <div className="space-y-3.5 pt-2">
                <div className="flex items-start gap-3 bg-white/[0.03] p-3.5 rounded-xl border border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Issued After Course Completion</h4>
                    <p className="text-xs text-neutral-400 mt-0.5">Delivered directly to your registered email once you finish the live workshop.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/[0.03] p-3.5 rounded-xl border border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white shrink-0 mt-0.5">
                    <Share2 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">LinkedIn & Portfolio Ready</h4>
                    <p className="text-xs text-neutral-400 mt-0.5">Easily shareable on your professional resume, LinkedIn certifications, and portfolio.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/[0.03] p-3.5 rounded-xl border border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Includes Unique Learner ID</h4>
                    <p className="text-xs text-neutral-400 mt-0.5">Authorized by Sapain studio mentors with verifiable student credentials.</p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={onEnroll}
                  className="w-full py-3.5 bg-[#F2F2F2] hover:bg-white text-black font-semibold text-xs tracking-normal rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.18)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Enroll Now to Earn Certificate</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
