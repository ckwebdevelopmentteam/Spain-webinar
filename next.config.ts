import type { NextConfig } from "next";

const securityHeaders = [
  // 1. Clickjacking Protection
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  // 2. MIME type sniffing protection
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // 3. Referrer Information Protection
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // 4. Hardware and Browser Permissions restrictions
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  // 5. Strict Transport Security
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // 6. Content Security Policy with Razorpay & asset support
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://checkout.razorpay.com https://*.razorpay.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob: https:",
      "media-src 'self' data: blob: https:",
      "frame-src 'self' https://api.razorpay.com https://checkout.razorpay.com",
      "connect-src 'self' https://api.razorpay.com https://lumberjack.razorpay.com https://*.razorpay.com",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;

