'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X, CheckCircle2, ShieldCheck, CreditCard, QrCode, Sparkles, Calendar, ArrowRight, Loader2, User, Mail, Phone } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  fee: number;
  originalFee: number;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose, fee, originalFee }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setIsProcessing(false);
      reset();
    }
  }, [isOpen, reset]);

  if (!isOpen) return null;

  const onSubmitDetails = () => {
    setStep(2);
  };

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      // Generate a mock ticket ID
      const randomId = 'SA-' + Math.floor(100000 + Math.random() * 900000);
      setTicketId(randomId);
      setStep(3);
      
      // Burst confetti!
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#7F00FF', '#0A0A0A', '#A6A6A6']
      });
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={step === 3 ? onClose : undefined}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A]/90 p-6 shadow-2xl md:p-8 z-10 text-[#F2F2F2] backdrop-blur-xl">
        
        {/* Close Button */}
        {step !== 3 && (
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 text-neutral-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Header (except for success screen) */}
        {step !== 3 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 text-white mb-1.5">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider font-display">Secure Registration</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold font-display text-[#F2F2F2]">
              {step === 1 ? 'Enter Your Details' : 'Complete Payment'}
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              {step === 1 ? 'Provide your contact information to receive the Zoom link.' : 'Choose your preferred payment method.'}
            </p>
          </div>
        )}

        {/* Step 1: Registration Form */}
        {step === 1 && (
          <form onSubmit={handleSubmit(onSubmitDetails)} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="text"
                  placeholder="Aarav Sharma"
                  className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-neutral-500 focus:border-violet-accent focus:bg-white/10 focus:ring-1 focus:ring-violet-accent/50 focus:outline-none transition-colors"
                  {...register('name', { required: 'Name is required' })}
                />
              </div>
              {errors.name && <span className="text-xs text-red-500 mt-1 block">{errors.name.message}</span>}
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="email"
                  placeholder="aarav@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-neutral-500 focus:border-violet-accent focus:bg-white/10 focus:ring-1 focus:ring-violet-accent/50 focus:outline-none transition-colors"
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

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">Phone Number (WhatsApp)</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-neutral-500 focus:border-violet-accent focus:bg-white/10 focus:ring-1 focus:ring-violet-accent/50 focus:outline-none transition-colors"
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

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs text-neutral-400 block font-medium">Registration Fee</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-[#F2F2F2]">₹{fee}</span>
                  <span className="text-xs text-neutral-500 line-through">₹{originalFee}</span>
                </div>
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#F2F2F2] hover:bg-white text-[#000000] font-bold text-sm rounded-lg flex items-center gap-2 shadow-lg hover:shadow-violet-accent/25 transition-all cursor-pointer"
              >
                Proceed to Pay <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Payment Simulation */}
        {step === 2 && (
          <div className="space-y-5">
            {/* Payment Summary */}
            <div className="bg-white/5 p-4 rounded-lg border border-white/10 flex justify-between items-center">
              <div>
                <span className="text-xs text-neutral-400 block font-medium">Total Amount Due</span>
                <span className="text-lg font-bold text-[#F2F2F2]">₹{fee}.00</span>
              </div>
              <span className="text-[10px] uppercase tracking-wider bg-white/10 text-white px-2 py-1 rounded font-semibold border border-white/20">
                83% Discount Applied
              </span>
            </div>

            {/* Payment Method Selector */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all cursor-pointer ${
                  paymentMethod === 'upi'
                    ? 'border-violet-accent bg-violet-accent/5 text-white'
                    : 'border-white/10 bg-white/5 text-neutral-400 hover:border-white/20 hover:text-white'
                }`}
              >
                <QrCode className="w-6 h-6" />
                <span className="text-xs font-semibold font-display">UPI / QR Code</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'border-violet-accent bg-violet-accent/5 text-white'
                    : 'border-white/10 bg-white/5 text-neutral-400 hover:border-white/20 hover:text-white'
                }`}
              >
                <CreditCard className="w-6 h-6" />
                <span className="text-xs font-semibold font-display">Card Payment</span>
              </button>
            </div>

            {/* UPI Option Details */}
            {paymentMethod === 'upi' && (
              <div className="space-y-3.5 bg-white/5 p-4 rounded-lg border border-white/10">
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Scan the generated QR code or enter your UPI ID. We support all major UPI apps (Google Pay, PhonePe, Paytm).
                </p>
                <div className="flex justify-center py-2">
                  <div className="bg-[#F2F2F2] p-2.5 rounded-xl inline-block shadow-md border border-white/10">
                    {/* SVG Mock QR Code */}
                    <svg viewBox="0 0 100 100" className="w-28 h-28">
                      <rect x="0" y="0" width="25" height="25" fill="black" />
                      <rect x="4" y="4" width="17" height="17" fill="white" />
                      <rect x="8" y="8" width="9" height="9" fill="black" />
                      
                      <rect x="75" y="0" width="25" height="25" fill="black" />
                      <rect x="79" y="4" width="17" height="17" fill="white" />
                      <rect x="83" y="8" width="9" height="9" fill="black" />
                      
                      <rect x="0" y="75" width="25" height="25" fill="black" />
                      <rect x="4" y="79" width="17" height="17" fill="white" />
                      <rect x="8" y="83" width="9" height="9" fill="black" />
                      
                      <rect x="35" y="10" width="8" height="15" fill="black" />
                      <rect x="48" y="5" width="15" height="8" fill="black" />
                      <rect x="40" y="35" width="20" height="20" fill="black" />
                      <rect x="10" y="40" width="15" height="8" fill="black" />
                      <rect x="20" y="52" width="8" height="12" fill="black" />
                      <rect x="68" y="40" width="20" height="8" fill="black" />
                      <rect x="80" y="52" width="8" height="15" fill="black" />
                      <rect x="35" y="70" width="15" height="15" fill="black" />
                      <rect x="60" y="75" width="15" height="8" fill="black" />
                      <rect x="48" y="88" width="25" height="8" fill="black" />
                    </svg>
                  </div>
                </div>
                <div className="text-center">
                  <span className="text-[10px] text-neutral-400 font-mono">UPI ID: sapain@okaxis</span>
                </div>
              </div>
            )}

            {/* Card Option Details */}
            {paymentMethod === 'card' && (
              <div className="space-y-3 bg-white/5 p-4 rounded-lg border border-white/10">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-neutral-300 mb-1 font-semibold">Card Number</label>
                  <input
                    type="text"
                    placeholder="4111 2222 3333 4444"
                    maxLength={19}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:border-violet-accent focus:ring-1 focus:ring-violet-accent/50 focus:outline-none transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-neutral-300 mb-1 font-semibold">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      maxLength={5}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:border-violet-accent focus:ring-1 focus:ring-violet-accent/50 focus:outline-none transition-colors text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-neutral-300 mb-1 font-semibold">CVV</label>
                    <input
                      type="password"
                      placeholder="***"
                      maxLength={3}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:border-violet-accent focus:ring-1 focus:ring-violet-accent/50 focus:outline-none transition-colors text-center"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Payment Actions */}
            <div className="space-y-3 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full py-3 bg-[#F2F2F2] hover:bg-white disabled:bg-[#F2F2F2]/50 text-[#000000] font-bold rounded-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-violet-accent/25 transition-all cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5" />
                    Pay ₹{fee} Securely
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={() => setStep(1)}
                disabled={isProcessing}
                className="w-full py-2.5 bg-transparent hover:bg-white/5 text-neutral-400 hover:text-white font-medium text-xs rounded-lg transition-colors cursor-pointer"
              >
                Back to Details
              </button>
            </div>

            {/* Security Disclaimer */}
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-400">
              <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
              <span>SSL Encrypted 256-bit Payment Simulation</span>
            </div>
          </div>
        )}

        {/* Step 3: Registration Successful / Ticket */}
        {step === 3 && (
          <div className="text-center py-2 animate-fade-in">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500/20 text-green-400 mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            
            <h3 className="text-2xl font-bold font-display text-[#F2F2F2] mb-1">Registration Successful!</h3>
            <p className="text-xs text-neutral-400 mb-6">Your seat is secured. A confirmation email has been sent.</p>

            {/* Premium Digital Ticket */}
            <div className="relative mx-auto max-w-sm overflow-hidden rounded-xl border border-white/10 bg-white/5 text-left shadow-2xl backdrop-blur-xl">
              {/* Ticket Top Jagged Edge Effect */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-white to-neutral-500" />
              
              <div className="p-5 space-y-4">
                {/* Brand & Ticket ID */}
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <div className="font-display font-bold text-sm text-white">
                    sə.p<span>A</span>in<span className="text-[10px] text-neutral-400 font-normal">.Edu</span>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-300 uppercase bg-white/5 px-2 py-0.5 rounded border border-white/10">
                    {ticketId}
                  </span>
                </div>

                {/* Event Title */}
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-semibold block">Event Pass</span>
                  <h4 className="text-sm font-bold text-white font-display mt-0.5 leading-snug">
                    Master the Art of AI Image & Video Generation
                  </h4>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-4 bg-white/5 p-3 rounded-lg border border-white/10">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-semibold block">Date</span>
                    <div className="flex items-center gap-1 text-xs text-[#F2F2F2] font-medium mt-1">
                      <Calendar className="w-3.5 h-3.5 text-white" />
                      <span>Upcoming Sat-Sun</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-semibold block">Time</span>
                    <span className="text-xs text-[#F2F2F2] font-medium mt-1 block">
                      6:00 PM - 8:00 PM IST
                    </span>
                  </div>
                </div>

                {/* Bottom Ticket Section with QR Code */}
                <div className="flex items-center justify-between pt-2 border-t border-dashed border-white/10">
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-semibold block">Access Mode</span>
                    <span className="text-xs text-white font-semibold block">Online via Zoom</span>
                    <span className="text-[9px] text-[#F2F2F2]/85 block mt-0.5 font-medium">Link sent to WhatsApp/Email</span>
                  </div>
                  
                  {/* Mock QR Code */}
                  <div className="bg-[#F2F2F2] p-1.5 rounded-lg border border-white/10 shadow-sm">
                    <svg viewBox="0 0 100 100" className="w-14 h-14">
                      <rect x="0" y="0" width="25" height="25" fill="black" />
                      <rect x="4" y="4" width="17" height="17" fill="white" />
                      <rect x="8" y="8" width="9" height="9" fill="black" />
                      <rect x="75" y="0" width="25" height="25" fill="black" />
                      <rect x="79" y="4" width="17" height="17" fill="white" />
                      <rect x="83" y="8" width="9" height="9" fill="black" />
                      <rect x="0" y="75" width="25" height="25" fill="black" />
                      <rect x="4" y="79" width="17" height="17" fill="white" />
                      <rect x="8" y="83" width="9" height="9" fill="black" />
                      <rect x="40" y="15" width="10" height="10" fill="black" />
                      <rect x="45" y="45" width="15" height="15" fill="black" />
                      <rect x="15" y="45" width="15" height="5" fill="black" />
                      <rect x="68" y="40" width="15" height="10" fill="black" />
                      <rect x="80" y="65" width="10" height="10" fill="black" />
                      <rect x="35" y="75" width="15" height="15" fill="black" />
                      <rect x="60" y="80" width="15" height="10" fill="black" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 space-y-2 max-w-sm mx-auto">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 bg-[#F2F2F2] hover:bg-white text-[#000000] font-bold text-sm rounded-lg transition-colors cursor-pointer"
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
