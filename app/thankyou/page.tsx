'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight,
  Printer,
  Home,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface StoredTicketData {
  ticketId?: string;
  name?: string;
  email?: string;
  phone?: string;
  language?: string;
  amount?: number;
  timestamp?: string;
  whatsappGroup?: {
    title: string;
    buttonText: string;
    url: string;
  };
}

const BATCH_DATES: Record<string, string> = {
  malayalam: '15 October',
  english: '19 October',
  hindi: '22 October',
};

export default function ThankYouPage() {
  const [data, setData] = useState<StoredTicketData | null>(null);

  useEffect(() => {
    // 1. Trigger celebration confetti
    try {
      confetti({
        particleCount: 160,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#FFFFFF', '#A6A6A6', '#25D366', '#000000'],
      });
    } catch {
      // Ignore if confetti fails
    }

    // 2. Read stored registration data from sessionStorage
    try {
      const stored = sessionStorage.getItem('sapain_ticket_data');
      if (stored) {
        setData(JSON.parse(stored));
      }
    } catch {
      // Fallback
    }

    // 3. Track Meta Pixel PageView and Purchase event on /thankyou
    if (
      typeof window !== 'undefined' &&
      typeof (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq === 'function'
    ) {
      const fb = (window as unknown as { fbq: (...args: unknown[]) => void }).fbq;
      fb('track', 'PageView');
      fb('track', 'Purchase', {
        value: 299,
        currency: 'INR',
        content_name: 'AI Masterclass Registration',
      });
    }
  }, []);

  const language = data?.language || 'English';
  const languageKey = language.toLowerCase().trim();
  const ticketId = data?.ticketId || 'SA-CONFIRMED';
  const batchDate = BATCH_DATES[languageKey] || '19 October';

  const defaultWhatsappUrls: Record<string, string> = {
    malayalam: 'https://chat.whatsapp.com/invite',
    english: 'https://chat.whatsapp.com/invite',
    hindi: 'https://chat.whatsapp.com/invite',
  };

  const whatsappUrl =
    data?.whatsappGroup?.url ||
    defaultWhatsappUrls[languageKey] ||
    'https://chat.whatsapp.com/invite';

  const whatsappTitle =
    data?.whatsappGroup?.title || `Join ${language} Batch WhatsApp Group`;
  const whatsappButtonText =
    data?.whatsappGroup?.buttonText || `Join ${language} WhatsApp Group`;

  return (
    <main className="min-h-screen bg-[#000000] text-[#F2F2F2] flex flex-col items-center justify-between px-4 py-8 md:py-16 selection:bg-white/20 selection:text-white">
      {/* Background radial glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-green-500/10 blur-[130px] rounded-full" />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-white/5 blur-[120px] rounded-full" />
      </div>

      {/* Header Bar */}
      <header className="relative z-10 w-full max-w-xl flex items-center justify-between pb-6 border-b border-white/10 mb-8">
        <Link
          href="/"
          className="font-semibold text-lg text-white hover:opacity-90 transition-opacity flex items-center gap-1.5"
        >
          <span>sə.p</span>
          <span className="text-white">A</span>
          <span>in</span>
          <span className="text-xs text-neutral-400 font-normal">.Edu</span>
        </Link>
        <Link
          href="/"
          className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 transition-colors px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/25 bg-white/5"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
      </header>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-xl text-center space-y-6">
        {/* Success Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 shadow-lg shadow-green-500/10 animate-fade-in">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-medium text-white mb-1">
            <Sparkles className="w-3.5 h-3.5 text-green-400" />
            <span>Booking Verified & Confirmed</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
            Registration Successful!
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto">
            Your seat has been successfully reserved. A formal confirmation receipt has been sent to your email.
          </p>
        </div>

        {/* Digital Ticket Pass Card */}
        <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-white/15 bg-neutral-950/80 text-left shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-green-400 via-white to-neutral-500" />

          <div className="p-6 space-y-5">
            {/* Ticket Header */}
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <div>
                <div className="font-semibold text-sm text-white">
                  sə.p<span>A</span>in<span className="text-[10px] text-neutral-400 font-normal">.Edu</span>
                </div>
                <div className="text-[10px] text-neutral-400">Official Access Pass</div>
              </div>
              <span className="text-xs font-mono text-neutral-200 uppercase bg-white/10 px-2.5 py-1 rounded-md border border-white/15">
                {ticketId}
              </span>
            </div>

            {/* Event Title */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">Masterclass Pass</span>
                <span className="text-[11px] font-medium text-white bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15">
                  {language} Batch
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-medium text-white leading-snug">
                Advanced AI Image & Cinematic Video Generation Masterclass
              </h2>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-3 bg-white/5 p-3.5 rounded-xl border border-white/10">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold block">Date</span>
                <div className="flex items-center gap-1.5 text-xs text-[#F2F2F2] font-medium mt-1">
                  <Calendar className="w-3.5 h-3.5 text-white" />
                  <span>{batchDate}</span>
                </div>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold block">Timing</span>
                <div className="flex items-center gap-1.5 text-xs text-[#F2F2F2] font-medium mt-1">
                  <Clock className="w-3.5 h-3.5 text-white" />
                  <span>6:00 PM - 9:00 PM IST</span>
                </div>
              </div>
            </div>

            {/* Access Mode */}
            <div className="pt-3 border-t border-dashed border-white/10 space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium block">Access Mode</span>
              <div className="text-xs text-white font-medium flex items-center justify-between">
                <span>Online Live via Zoom</span>
                <span className="text-green-400 font-semibold text-[11px]">Seat Confirmed</span>
              </div>
              <p className="text-[10px] text-neutral-400">Direct joining credentials will also be dispatched via WhatsApp & Email.</p>
            </div>

            {/* Attendee Details if Available */}
            {data?.name && (
              <div className="pt-3 border-t border-dashed border-white/10 flex justify-between items-center text-[11px]">
                <span className="text-neutral-400">Attendee:</span>
                <span className="font-medium text-white">{data.name}</span>
              </div>
            )}

            {/* Booking Confirmed Timestamp */}
            <div className="pt-3 border-t border-dashed border-white/10 flex items-center justify-between text-[10px]">
              <span className="text-neutral-400 flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-neutral-400" />
                Confirmed At
              </span>
              <span className="font-mono text-neutral-300 font-medium text-[11px]">
                {data?.timestamp
                  ? new Date(data.timestamp).toLocaleString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })
                  : new Date().toLocaleString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })}
              </span>
            </div>
          </div>
        </div>

        {/* WhatsApp Group Invite Card */}
        <div className="max-w-md mx-auto p-4 sm:p-5 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 text-left space-y-4 shadow-xl">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#25D366] text-black flex items-center justify-center shrink-0 shadow-md">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">
                {whatsappTitle}
              </h3>
              <p className="text-xs text-neutral-300 leading-normal mt-0.5">
                Join the official WhatsApp group to receive your live class link, study materials, and direct updates.
              </p>
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-black font-semibold text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer text-center group"
          >
            <span>{whatsappButtonText}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Action Buttons */}
        <div className="max-w-md mx-auto space-y-2.5 pt-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="w-full py-3 bg-white/10 hover:bg-white/15 text-white font-medium text-xs sm:text-sm rounded-xl border border-white/15 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <Printer className="w-4 h-4 text-neutral-300" />
            <span>Download Ticket Pass (PDF)</span>
          </button>

          <Link
            href="/"
            className="w-full py-3 bg-[#F2F2F2] hover:bg-white text-black font-semibold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-400 pt-2">
          <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
          <span>Payment secured & processed via Razorpay Gateway</span>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-xl text-center pt-8 border-t border-white/5 mt-8 text-xs text-neutral-400">
        <p>© {new Date().getFullYear()} SapAin Media & Tech. All rights reserved.</p>
      </footer>
    </main>
  );
}
