'use client';

import React from 'react';
import { motion } from 'framer-motion';

// 1. ChatGPT Astra (OpenAI emblem)
export const ChatGptLogo = ({ className = 'w-10 h-10' }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-label="ChatGPT"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.205 8.658v-2.26c0-.19.072-.333.238-.428l4.543-2.616c.619-.357 1.356-.523 2.117-.523 2.854 0 4.662 2.212 4.662 4.566 0 .167 0 .357-.024.547l-4.71-2.759a.797.797 0 00-.856 0l-5.97 3.473zm10.609 8.8V12.06c0-.333-.143-.57-.429-.737l-5.97-3.473 1.95-1.118a.433.433 0 01.476 0l4.543 2.617c1.309.76 2.189 2.378 2.189 3.948 0 1.808-1.07 3.473-2.76 4.163zM7.802 12.703l-1.95-1.142c-.167-.095-.239-.238-.239-.428V5.899c0-2.545 1.95-4.472 4.591-4.472 1 0 1.927.333 2.712.928L8.23 5.067c-.285.166-.428.404-.428.737v6.898zM12 15.128l-2.795-1.57v-3.33L12 8.658l2.795 1.57v3.33L12 15.128zm1.796 7.23c-1 0-1.927-.332-2.712-.927l4.686-2.712c.285-.166.428-.404.428-.737v-6.898l1.974 1.142c.167.095.238.238.238.428v5.233c0 2.545-1.974 4.472-4.614 4.472zm-5.637-5.303l-4.544-2.617c-1.308-.761-2.188-2.378-2.188-3.948A4.482 4.482 0 014.21 6.327v5.423c0 .333.143.571.428.738l5.947 3.449-1.95 1.118a.432.432 0 01-.476 0zm-.262 3.9c-2.688 0-4.662-2.021-4.662-4.519 0-.19.024-.38.047-.57l4.686 2.71c.286.167.571.167.856 0l5.97-3.448v2.26c0 .19-.07.333-.237.428l-4.543 2.616c-.619.357-1.356.523-2.117.523zm5.899 2.83a5.947 5.947 0 005.827-4.756C22.287 18.339 24 15.84 24 13.296c0-1.665-.713-3.282-1.998-4.448.119-.5.19-.999.19-1.498 0-3.401-2.759-5.947-5.946-5.947-.642 0-1.26.095-1.88.31A5.962 5.962 0 0010.205 0a5.947 5.947 0 00-5.827 4.757C1.713 5.447 0 7.945 0 10.49c0 1.666.713 3.283 1.998 4.448-.119.5-.19 1-.19 1.499 0 3.401 2.759 5.946 5.946 5.946.642 0 1.26-.095 1.88-.309a5.96 5.96 0 004.162 1.713z"
    />
  </svg>
);

// 2. Higgsfield (Official Higgsfield emblem)
export const HiggsfieldLogo = ({ className = 'w-10 h-10' }: { className?: string }) => (
  <svg
    viewBox="0 0 512 512"
    className={className}
    aria-label="Higgsfield"
  >
    <rect width="512" height="512" rx="110" fill="#D1FE17" />
    <path
      d="M419.055 253.911L418.753 250.505C415.893 217.823 395.28 156.334 338.099 156.334C295.668 156.334 263.614 199.548 235.326 237.647C212.754 268.158 193.196 294.333 171.676 294.333C165.956 293.715 158.585 290.771 154.073 284.112C150.009 278.069 148.957 270.326 151.062 261.032C154.37 246.318 173.332 232.688 193.343 218.129C204.325 210.386 215.613 202.176 223.438 194.278C246.011 171.82 257.446 155.557 257.446 129.383C257.446 103.21 243.453 90.1964 231.716 84.6198C208.242 73.471 173.785 79.9756 151.817 99.4937C148.508 102.593 145.195 105.532 142.185 108.32C120.065 128.611 105.17 142.397 71.0117 131.861V174.298C116.304 194.899 154.375 155.557 168.821 137.437C179.954 125.512 191.691 118.541 200.421 118.541H200.874C204.787 118.696 208.095 120.246 210.506 123.034C214.419 127.683 215.924 133.104 215.169 139.142C213.513 151.845 200.723 166.71 177.249 182.974C149.712 202.025 103.669 233.931 100.055 274.046C97.3457 302.857 111.792 331.664 134.364 342.813C187.028 368.523 219.082 324.227 253.085 277.452C279.117 241.364 303.795 207.136 338.103 207.136C368.949 207.136 380.385 233.465 380.385 250.039V253.294L377.375 253.911C302.591 267.542 261.812 339.718 261.812 373.016C261.812 406.317 289.198 434.817 322.903 434.817C362.328 434.817 411.079 400.122 418.905 302.546L419.207 298.986H450.354V253.915L419.055 253.911ZM378.276 303.936C372.259 362.326 343.215 389.588 325.611 389.588C317.636 389.588 306.504 382.771 306.504 370.073C306.504 355.826 327.117 312.612 373.462 299.758L378.879 298.364L378.276 303.936Z"
      fill="#000000"
    />
  </svg>
);

// 3. Seedance 2.5 (ByteDance Seedance logo)
export const SeedanceLogo = ({ className = 'w-10 h-10' }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    aria-label="Seedance 2.5"
  >
    <path
      d="M14.944 18.587l-1.704-.445V10.01l1.824-.462c1-.254 1.84-.461 1.88-.453.032 0 .056 2.235.056 4.972v4.973l-.176-.008c-.104 0-.952-.207-1.88-.446z"
      fill="#00C8D2"
      fillRule="nonzero"
    />
    <path
      d="M7 16.542c0-2.736.024-4.98.064-4.98.032-.008.872.2 1.88.454l1.816.461-.016 4.05-.024 4.049-1.632.422c-.896.23-1.736.445-1.856.469L7 21.523v-4.98z"
      fill="#3C8CFF"
      fillRule="nonzero"
    />
    <path
      d="M19.24 12.477c0-9.03.008-9.515.144-9.475.072.024.784.207 1.576.406.792.207 1.576.405 1.744.445l.296.08-.016 8.56-.024 8.568-1.624.414c-.888.23-1.728.437-1.856.47l-.24.055v-9.523z"
      fill="#78E6DC"
      fillRule="nonzero"
    />
    <path
      d="M1 12.509c0-4.678.024-8.505.064-8.505.032 0 .872.207 1.872.454l1.824.461v7.582c0 4.16-.016 7.574-.032 7.574-.024 0-.872.215-1.88.47L1 21.013v-8.505z"
      fill="#325AB4"
    />
  </svg>
);

// 4. MiniMax H3 (MiniMax official gradient logo)
export const MinimaxLogo = ({ className = 'w-10 h-10' }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    aria-label="MiniMax H3"
  >
    <defs>
      <linearGradient id="minimax-grad-clean" x1="0%" x2="100%" y1="50%" y2="50%">
        <stop offset="0%" stopColor="#E2167E" />
        <stop offset="100%" stopColor="#FE603C" />
      </linearGradient>
    </defs>
    <path
      d="M16.278 2c1.156 0 2.093.927 2.093 2.07v12.501a.74.74 0 00.744.709.74.74 0 00.743-.709V9.099a2.06 2.06 0 012.071-2.049A2.06 2.06 0 0124 9.1v6.561a.649.649 0 01-.652.645.649.649 0 01-.653-.645V9.1a.762.762 0 00-.766-.758.762.762 0 00-.766.758v7.472a2.037 2.037 0 01-2.048 2.026 2.037 2.037 0 01-2.048-2.026v-12.5a.785.785 0 00-.788-.753.785.785 0 00-.789.752l-.001 15.904A2.037 2.037 0 0113.441 22a2.037 2.037 0 01-2.048-2.026V18.04c0-.356.292-.645.652-.645.36 0 .652.289.652.645v1.934c0 .263.142.506.372.638.23.131.514.131.744 0a.734.734 0 00.372-.638V4.07c0-1.143.937-2.07 2.093-2.07zm-5.674 0c1.156 0 2.093.927 2.093 2.07v11.523a.648.648 0 01-.652.645.648.648 0 01-.652-.645V4.07a.785.785 0 00-.789-.78.785.785 0 00-.789.78v14.013a2.06 2.06 0 01-2.07 2.048 2.06 2.06 0 01-2.071-2.048V9.1a.762.762 0 00-.766-.758.762.762 0 00-.766.758v3.8a2.06 2.06 0 01-2.071 2.049A2.06 2.06 0 010 12.9v-1.378c0-.357.292-.646.652-.646.36 0 .653.29.653.646V12.9c0 .418.343.757.766.757s.766-.339.766-.757V9.099a2.06 2.06 0 012.07-2.048 2.06 2.06 0 012.071 2.048v8.984c0 .419.343.758.767.758.423 0 .766-.339.766-.758V4.07c0-1.143.937-2.07 2.093-2.07z"
      fill="url(#minimax-grad-clean)"
      fillRule="nonzero"
    />
  </svg>
);

// 5. Omni Flash (Google Gemini Flash 4-point star)
export const OmniFlashLogo = ({ className = 'w-10 h-10' }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    aria-label="Omni Flash"
  >
    <defs>
      <linearGradient id="omni-grad-clean-0" x1="7" x2="11" y1="15.5" y2="12" gradientUnits="userSpaceOnUse">
        <stop stopColor="#08B962" />
        <stop offset="1" stopColor="#08B962" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="omni-grad-clean-1" x1="8" x2="11.5" y1="5.5" y2="11" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F94543" />
        <stop offset="1" stopColor="#F94543" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="omni-grad-clean-2" x1="3.5" x2="17.5" y1="13.5" y2="12" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FABC12" />
        <stop offset=".46" stopColor="#FABC12" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path
      d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z"
      fill="#3186FF"
    />
    <path
      d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z"
      fill="url(#omni-grad-clean-0)"
    />
    <path
      d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z"
      fill="url(#omni-grad-clean-1)"
    />
    <path
      d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z"
      fill="url(#omni-grad-clean-2)"
    />
  </svg>
);

// 6. Magnific AI Logo (Official emblem)
export const MagnificLogo = ({ className = 'w-10 h-10' }: { className?: string }) => (
  <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src="/logos/magnific.png"
      alt="Magnific AI"
      className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.25)]"
    />
  </div>
);

const LOGO_ITEMS = [
  { id: 'chatgpt', Icon: ChatGptLogo, name: 'ChatGPT Astra' },
  { id: 'higgsfield', Icon: HiggsfieldLogo, name: 'Higgsfield' },
  { id: 'seedance', Icon: SeedanceLogo, name: 'Seedance 2.5' },
  { id: 'minimax', Icon: MinimaxLogo, name: 'MiniMax H3' },
  { id: 'omni', Icon: OmniFlashLogo, name: 'Omni Flash' },
];

export function HeroLogosBanner({ className = '' }: { className?: string }) {
  // Multiply list 4x to guarantee a seamless infinite loop across all resolutions
  const repeatedLogos = [...LOGO_ITEMS, ...LOGO_ITEMS, ...LOGO_ITEMS, ...LOGO_ITEMS];

  return (
    <div
      className={`w-full relative overflow-hidden py-2 sm:py-3 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] select-none ${className}`}
    >
      <motion.div
        className="flex items-center gap-12 sm:gap-16 md:gap-20 w-max"
        animate={{
          x: ['0%', '-25%'],
        }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 20,
        }}
        whileHover={{ animationPlayState: 'paused' }}
      >
        {repeatedLogos.map(({ id, Icon, name }, index) => (
          <div
            key={`${id}-${index}`}
            className="group flex flex-col items-center justify-center gap-2.5 shrink-0 cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95"
          >
            {/* Clean Logo without box/border */}
            <div className="text-white/85 group-hover:text-white transition-all duration-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] group-hover:drop-shadow-[0_0_18px_rgba(255,255,255,0.45)]">
              <Icon className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12" />
            </div>

            {/* Model Name Mentioned Below */}
            <span className="text-xs sm:text-sm font-medium tracking-tight text-neutral-400 group-hover:text-white transition-colors duration-200 whitespace-nowrap">
              {name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
