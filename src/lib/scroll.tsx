/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface ScrollContextType {
  scrollTo: (target: string | HTMLElement, options?: { offset?: number; duration?: number }) => void;
  lenis: Lenis | null;
}

const ScrollContext = createContext<ScrollContextType>({
  scrollTo: () => {},
  lenis: null,
});

let globalLenisInstance: Lenis | null = null;

/**
 * Standalone scrollToTarget utility function
 */
export function scrollToTarget(
  target: string | HTMLElement,
  options?: { offset?: number; duration?: number }
) {
  if (globalLenisInstance) {
    globalLenisInstance.scrollTo(target, {
      offset: options?.offset ?? -30,
      duration: options?.duration ?? 1.2,
    });
  } else if (typeof window !== 'undefined') {
    if (typeof target === 'string') {
      const el = document.querySelector(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

/**
 * React hook to access Lenis instance and scrollTo function
 */
export const useScroll = () => useContext(ScrollContext);

/**
 * ScrollProvider component to wrap the application and initialize Lenis
 */
export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if user prefers reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    lenisRef.current = lenis;
    globalLenisInstance = lenis;

    let animId: number;
    function raf(time: number) {
      lenis.raf(time);
      animId = requestAnimationFrame(raf);
    }

    animId = requestAnimationFrame(raf);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      lenis.destroy();
      lenisRef.current = null;
      globalLenisInstance = null;
    };
  }, []);

  const scrollTo = (target: string | HTMLElement, options?: { offset?: number; duration?: number }) => {
    scrollToTarget(target, options);
  };

  return (
    <ScrollContext.Provider value={{ scrollTo, lenis: lenisRef.current }}>
      {children}
    </ScrollContext.Provider>
  );
};
