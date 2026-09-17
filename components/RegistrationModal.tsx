'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  X, CheckCircle2, ShieldCheck, Sparkles, Calendar,
  ArrowRight, User, Mail, Phone, Loader2, AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  fee: number;
  originalFee: number;
  defaultLanguage?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
}

interface RazorpayInstance {
  open: () => void;
  on: (event: string, callback: (response: { error?: { description?: string } }) => void) => void;
}

const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve(false);
    if ((window as { Razorpay?: unknown }).Razorpay) return resolve(true);

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

interface WhatsAppGroupData {
  title: string;
  buttonText: string;
  url: string;
}

const BATCH_DATES: Record<string, string> = {
  malayalam: '15 October',
  english: '19 October',
  hindi: '22 October',
};

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  fee,
  originalFee,
  defaultLanguage = 'English'
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [ticketId, setTicketId] = useState('');
  const [language, setLanguage] = useState(defaultLanguage);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [whatsappGroup, setWhatsappGroup] = useState<WhatsAppGroupData | null>(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setLanguage(defaultLanguage);
      setErrorMessage(null);
      setLoading(false);
      setWhatsappGroup(null);
      reset();
      loadRazorpayScript().catch(() => {});
    }
  }, [isOpen, defaultLanguage, reset]);

  if (!isOpen) return null;

  const handlePayDirectly = async (values: FormData) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      // 1. Save initial registration in database with pending status
      fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
          amount: fee,
          language: language,
          status: 'pending',
        }),
      }).catch((err) => console.error('Error saving initial registration:', err));

      // 2. Ensure Razorpay SDK is loaded
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        throw new Error('Razorpay SDK failed to load. Please check your internet connection.');
      }

      // 3. Create order via backend endpoint
      const amountInPaise = Math.max(100, Math.round(fee * 100));

      // Track Meta Pixel InitiateCheckout
      if (typeof window !== 'undefined' && typeof (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq === 'function') {
        (window as unknown as { fbq: (...args: unknown[]) => void }).fbq('track', 'InitiateCheckout', {
          value: fee,
          currency: 'INR',
          content_name: `${language} Batch Masterclass`,
        });
      }

      const orderRes = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: 'INR',
          receipt: `receipt_${Date.now()}`,
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) {
        throw new Error(orderData.error || 'Failed to initialize payment order. Please try again.');
      }

      const keyId = orderData.key_id || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_Tbv2mu6iL1NrHX';

      // 4. Directly launch the official Razorpay Checkout popup
      const options = {
        key: keyId,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'SapAin Edu',
        description: `${language} Batch - Advanced AI Image & Cinematic Video Masterclass`,
        order_id: orderData.order_id || orderData.id,
        prefill: {
          name: values.name,
          email: values.email,
          contact: values.phone,
        },
        theme: {
          color: '#0A0A0A',
        },
        handler: async function (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) {
          try {
            // 5. Verify payment signature on backend
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                userDetails: {
                  name: values.name,
                  email: values.email,
                  contact: values.phone,
                  language: language,
                },
                amount: fee,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyRes.ok && verifyData.success) {
              const assignedTicketId = verifyData.ticket_id || 'SA-' + Math.floor(100000 + Math.random() * 900000);
              setTicketId(assignedTicketId);
              if (verifyData.whatsappGroup) {
                setWhatsappGroup(verifyData.whatsappGroup);
              }
              setStep(2); // Direct to Ticket Confirmation

              // Confetti burst
              confetti({
                particleCount: 150,
                spread: 80,
                origin: { y: 0.6 },
                colors: ['#FFFFFF', '#A6A6A6', '#000000'],
              });

              // Track Meta Pixel Purchase event
              if (typeof window !== 'undefined' && typeof (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq === 'function') {
                (window as unknown as { fbq: (...args: unknown[]) => void }).fbq('track', 'Purchase', {
                  value: fee,
                  currency: 'INR',
                  content_name: `${language} Batch Masterclass`,
                });
              }
            } else {
              setErrorMessage(verifyData.error || 'Payment signature verification failed.');
            }
          } catch (err: unknown) {
            setErrorMessage((err as { message?: string }).message || 'Error verifying payment signature.');
          } finally {
            setLoading(false);
          }
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const razorpayConstructor = (
        window as unknown as { Razorpay: new (opts: typeof options) => RazorpayInstance }
      ).Razorpay;
      const rzp = new razorpayConstructor(options);

      rzp.on('payment.failed', function (resp: { error?: { description?: string } }) {
        setLoading(false);
        setErrorMessage(resp.error?.description || 'Payment failed. Please try again.');
      });

      rzp.open();
    } catch (err: unknown) {
      setLoading(false);
      setErrorMessage((err as { message?: string }).message || 'An unexpected error occurred.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={step === 2 ? onClose : undefined}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-2xl border border-white/15 bg-[#0e0e12] p-6 shadow-2xl md:p-8 z-10 text-[#F2F2F2] backdrop-blur-xl">

        {/* Close Button */}
        {step !== 2 && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-neutral-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/5 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Header */}
        {step === 1 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 text-white mb-1.5">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-medium uppercase tracking-wider">Fast Secure Checkout</span>
            </div>
            <h3 className="text-xl md:text-2xl font-medium text-[#F2F2F2]">
              Reserve Your Seat
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              Enter your details below to proceed directly to secure Razorpay checkout.
            </p>
          </div>
        )}

        {/* Step 1: Registration Form with Direct Razorpay Checkout */}
        {step === 1 && (
          <form onSubmit={handleSubmit(handlePayDirectly)} className="space-y-4">
            {/* Language Selector */}
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">Selected Language</label>
              <div className="grid grid-cols-3 gap-2">
                {['English', 'Malayalam', 'Hindi'].map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setLanguage(lang)}
                    className={`py-2 px-3 rounded-lg text-xs transition-all border text-center cursor-pointer ${
                      language.toLowerCase() === lang.toLowerCase()
                        ? 'bg-[#F2F2F2] text-black border-[#F2F2F2] shadow-sm font-medium'
                        : 'bg-white/5 text-neutral-400 border-white/10 hover:border-white/20 hover:text-white font-normal'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="text"
                  placeholder="Aarav Sharma"
                  className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-base sm:text-sm text-white placeholder:text-neutral-500 focus:border-white focus:bg-white/10 focus:ring-1 focus:ring-white/50 focus:outline-none transition-colors"
                  {...register('name', { required: 'Name is required' })}
                />
              </div>
              {errors.name && <span className="text-xs text-red-500 mt-1 block">{errors.name.message}</span>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="email"
                  placeholder="aarav@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-base sm:text-sm text-white placeholder:text-neutral-500 focus:border-white focus:bg-white/10 focus:ring-1 focus:ring-white/50 focus:outline-none transition-colors"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: 'Invalid email address'
                    }
                  })}
                />
              </div>
              {errors.email && <span className="text-xs text-red-500 mt-1 block">{errors.email.message}</span>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">Phone Number (WhatsApp)</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-base sm:text-sm text-white placeholder:text-neutral-500 focus:border-white focus:bg-white/10 focus:ring-1 focus:ring-white/50 focus:outline-none transition-colors"
                  {...register('phone', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^\+?[0-9\s-]{10,15}$/,
                      message: 'Invalid phone number'
                    }
                  })}
                />
              </div>
              {errors.phone && <span className="text-xs text-red-500 mt-1 block">{errors.phone.message}</span>}
            </div>

            {/* Error Banner if any */}
            {errorMessage && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Bottom Actions: Direct Pay via Razorpay */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="w-full sm:w-auto">
                <span className="text-[11px] text-neutral-400 block font-normal">Total Amount Due</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-semibold text-[#F2F2F2]">₹{fee}</span>
                  <span className="text-xs text-neutral-500 line-through">₹{originalFee}</span>
                  <span className="text-[10px] text-white bg-white/10 border border-white/20 px-1.5 py-0.5 rounded font-normal">
                    90% Off
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-7 py-3 bg-[#F2F2F2] hover:bg-white text-[#000000] font-medium text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-white/20 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Opening Razorpay...</span>
                  </>
                ) : (
                  <>
                    <span>Pay ₹{fee} via Razorpay</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
              <span>Direct Razorpay Gateway • Supports UPI, Cards, Netbanking</span>
            </div>
          </form>
        )}

        {/* Step 2: Registration Successful & Digital Pass */}
        {step === 2 && (
          <div className="text-center py-2 animate-fade-in">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500/20 text-green-400 mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-medium text-[#F2F2F2] mb-1">Registration Successful!</h3>
            <p className="text-xs text-neutral-400 mb-6">Your seat is secured. A confirmation email has been sent.</p>

            {/* Premium Digital Ticket Pass */}
            <div className="relative mx-auto max-w-sm overflow-hidden rounded-xl border border-white/10 bg-white/5 text-left shadow-2xl backdrop-blur-xl">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-white to-neutral-500" />

              <div className="p-5 space-y-4">
                {/* Brand & Ticket ID */}
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <div className="font-semibold text-sm text-white">
                    sə.p<span>A</span>in<span className="text-[10px] text-neutral-400 font-normal">.Edu</span>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-300 uppercase bg-white/5 px-2 py-0.5 rounded border border-white/10">
                    {ticketId}
                  </span>
                </div>

                {/* Event Title */}
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-medium block">Event Pass</span>
                    <span className="text-[10px] font-medium text-white bg-white/10 px-2 py-0.5 rounded border border-white/15">
                      {language} Batch
                    </span>
                  </div>
                  <h4 className="text-sm font-medium text-white mt-0.5 leading-snug">
                    Advanced AI Image & Cinematic Video Generation Masterclass
                  </h4>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-4 bg-white/5 p-3 rounded-lg border border-white/10">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-semibold block">Date</span>
                    <div className="flex items-center gap-1 text-xs text-[#F2F2F2] font-medium mt-1">
                      <Calendar className="w-3.5 h-3.5 text-white" />
                      <span>{BATCH_DATES[language.toLowerCase().trim()] || '19 October'}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-medium block">Timing</span>
                    <span className="text-xs text-[#F2F2F2] font-medium mt-1 block">
                      6:00 PM - 9:00 PM IST
                    </span>
                  </div>
                </div>

                {/* Access Mode */}
                <div className="pt-2 border-t border-dashed border-white/10">
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-medium block">Access Mode</span>
                    <span className="text-xs text-white font-medium block">Online via Zoom</span>
                    <span className="text-[9px] text-[#F2F2F2]/85 block mt-0.5 font-normal">Link sent to WhatsApp/Email</span>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp Group Invite Card - securely provided only after payment verification */}
            {whatsappGroup && (
              <div className="mt-6 max-w-sm mx-auto p-4 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 text-left space-y-3 shadow-lg">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#25D366] text-black flex items-center justify-center shrink-0 shadow-md">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      {whatsappGroup.title}
                    </h4>
                    <p className="text-[11px] text-neutral-300 leading-normal mt-0.5">
                      Join the official WhatsApp group to receive your live class link, study materials, and direct updates.
                    </p>
                  </div>
                </div>

                <a
                  href={whatsappGroup.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-black font-semibold text-sm rounded-lg flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer text-center group"
                >
                  <span>{whatsappGroup.buttonText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-8 space-y-2 max-w-sm mx-auto">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 bg-[#F2F2F2] hover:bg-white text-[#000000] font-medium text-sm rounded-lg transition-colors cursor-pointer"
              >
                Done & Close
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="w-full py-2 bg-transparent hover:bg-white/5 text-neutral-400 hover:text-white font-medium text-xs rounded-lg transition-colors cursor-pointer"
              >
                Download Ticket Pass (PDF)
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default RegistrationModal;
