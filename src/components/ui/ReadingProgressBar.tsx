/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';

/**
 * Thin, fixed reading progress bar at the top of the viewport.
 * Tracks current scroll depth relative to total document scrollable height.
 */
export const ReadingProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const calculateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const totalScrollable = scrollHeight - clientHeight;

      if (totalScrollable <= 0) {
        setProgress(0);
        return;
      }

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const currentProgress = Math.min(1, Math.max(0, scrollTop / totalScrollable));
      setProgress(currentProgress);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(calculateProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    calculateProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const percentage = Math.round(progress * 100);

  return (
    <aside
      role="progressbar"
      aria-label="Page reading progress"
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-[#0d0d0d]/5 z-[100] pointer-events-none select-none"
    >
      <div
        className="h-full bg-[#0d0d0d] origin-left will-change-transform transition-transform duration-75 ease-out shadow-[0_1px_2px_rgba(13,13,13,0.1)]"
        style={{
          transform: `scaleX(${progress})`,
        }}
      />
    </aside>
  );
};
