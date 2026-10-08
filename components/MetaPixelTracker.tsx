'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

/**
 * MetaPixelTracker
 * Listens for client-side route changes in Next.js App Router and fires
 * fbq('track', 'PageView') on each navigation without duplicating the initial load event.
 */
export function MetaPixelTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip firing on the very first mount because layout.tsx base script already tracked initial PageView
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (
      typeof window !== 'undefined' &&
      typeof (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq === 'function'
    ) {
      (window as unknown as { fbq: (...args: unknown[]) => void }).fbq('track', 'PageView');
    }
  }, [pathname, searchParams]);

  return null;
}
