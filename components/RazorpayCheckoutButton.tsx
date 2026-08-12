'use client';

import React, { useState } from 'react';
import { Loader2, ShieldCheck, AlertCircle } from 'lucide-react';

interface RazorpayCheckoutButtonProps {
  amount: number; // in INR or paise
  isPaise?: boolean;
  currency?: string;
  name?: string;
  description?: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  onSuccess?: (data: {
    order_id: string;
    payment_id: string;
    signature: string;
  }) => void;
  onError?: (error: string) => void;
  onCancel?: () => void;
  className?: string;
  buttonText?: string;
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

export const RazorpayCheckoutButton: React.FC<RazorpayCheckoutButtonProps> = ({
  amount,
  isPaise = false,
  currency = 'INR',
  name = 'SapAin Edu',
  description = 'Masterclass Registration Fee',
  prefill,
  onSuccess,
  onError,
  onCancel,
  className,
  buttonText,
}) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCheckout = async () => {
    setLoading(true);
    setErrorMessage(null);

    try {
      // 1. Ensure Razorpay Checkout script is loaded
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        throw new Error('Razorpay SDK failed to load. Please check your internet connection.');
      }

      // Convert amount to paise if specified in INR (minimum 100 paise)
      const amountInPaise = Math.max(100, Math.round(isPaise ? amount : amount * 100));

      // 2. Call backend endpoint to create order (STEP 1)
      const orderRes = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amountInPaise,
          currency,
          receipt: `receipt_${Date.now()}`,
        }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        throw new Error(orderData.error || 'Failed to create order. Please try again.');
      }

      const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_TOmZFfDI3s5f8E';

      // 3. Open Razorpay Checkout Modal (STEP 2)
      const options = {
        key: keyId,
        amount: orderData.amount,
        currency: orderData.currency || currency,
        name: name,
        description: description,
        order_id: orderData.order_id || orderData.id,
        prefill: prefill || {},
        theme: {
          color: '#7F00FF',
        },
        handler: async function (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) {
          try {
            // 4. Verify payment signature on backend (STEP 3)
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyRes.ok && verifyData.success) {
              if (onSuccess) {
                onSuccess({
                  order_id: response.razorpay_order_id,
                  payment_id: response.razorpay_payment_id,
                  signature: response.razorpay_signature,
                });
              }
            } else {
              const err = verifyData.error || 'Payment signature verification failed.';
              setErrorMessage(err);
              if (onError) onError(err);
            }
          } catch (err: unknown) {
            const msg = (err as { message?: string }).message || 'Error verifying payment signature.';
            setErrorMessage(msg);
            if (onError) onError(msg);
          } finally {
            setLoading(false);
          }
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            setErrorMessage('Payment cancelled by user.');
            if (onCancel) onCancel();
          },
        },
      };

      const razorpayConstructor = (window as unknown as { Razorpay: new (opts: typeof options) => RazorpayInstance }).Razorpay;
      const rzp = new razorpayConstructor(options);
      rzp.on('payment.failed', function (response: { error?: { description?: string } }) {
        setLoading(false);
        const failMsg = response.error?.description || 'Payment failed. Please try again.';
        setErrorMessage(failMsg);
        if (onError) onError(failMsg);
      });

      rzp.open();
    } catch (err: unknown) {
      setLoading(false);
      const msg = (err as { message?: string }).message || 'An unexpected error occurred.';
      setErrorMessage(msg);
      if (onError) onError(msg);
    }
  };

  return (
    <div className="w-full space-y-2">
      <button
        type="button"
        onClick={handleCheckout}
        disabled={loading}
        className={
          className ||
          'w-full py-3 bg-[#F2F2F2] hover:bg-white disabled:bg-[#F2F2F2]/50 text-[#000000] font-bold rounded-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-violet-accent/25 transition-all cursor-pointer'
        }
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Processing Payment...
          </>
        ) : (
          <>
            <ShieldCheck className="w-5 h-5" />
            {buttonText || `Pay ₹${amount} Securely`}
          </>
        )}
      </button>

      {errorMessage && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};

export default RazorpayCheckoutButton;
