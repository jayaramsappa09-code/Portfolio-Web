/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { ACHIEVEMENTS, AchievementItem } from '../../lib/data';
import { TechLogo } from '../ui/TechLogo';

export const Achievements: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Monitor scroll within pinned container
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalScrollable = container.offsetHeight - window.innerHeight;

      if (totalScrollable <= 0) {
        setScrollProgress(0);
        return;
      }

      // Progress goes 0 -> 1 while sticky in view
      const current = -rect.top;
      const p = Math.min(1, Math.max(0, current / totalScrollable));
      setScrollProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute horizontal translation percentage
  const maxTranslate = 70; // percentage to slide track left
  const translateX = scrollProgress * maxTranslate;

  return (
    <section
      id="achievements"
      ref={containerRef}
      className="relative bg-[#f4f2ee] h-[260vh]"
    >
      {/* Sticky Fullscreen Viewport (100svh) */}
      <div className="sticky top-0 h-[100svh] overflow-hidden flex flex-col justify-between py-12">
        
        {/* Top Header & Progress */}
        <div className="site-container w-full">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
            <div>
              <div className="font-mono-tag mb-2">06 — Verified Milestones</div>
              <h2 className="heading-display text-3xl sm:text-4xl md:text-5xl text-balance">
                Proven numbers & <span className="font-serif-italic">honours.</span>
              </h2>
            </div>

            {/* Horizontal progress meter */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[#77756f]">Track Progress</span>
              <div className="w-32 h-[3px] bg-[#0d0d0d]/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0d0d0d] rounded-full transition-transform duration-75 origin-left"
                  style={{ transform: `scaleX(${scrollProgress})` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Carousel Track sliding to the left as you scroll */}
        <div className="w-full overflow-hidden pl-[var(--gutter)] py-6 my-auto">
          <div
            ref={trackRef}
            className="flex items-center gap-6 sm:gap-8 will-change-transform transition-transform duration-75 ease-out"
            style={{
              transform: `translateX(-${translateX}%)`,
            }}
          >
            {ACHIEVEMENTS.map((item, idx) => (
              <AchievementCard
                key={idx}
                item={item}
                scrollProgress={scrollProgress}
                cardIndex={idx}
                totalCards={ACHIEVEMENTS.length}
              />
            ))}

            {/* Track Ending Pill */}
            <div className="shrink-0 flex items-center pr-16">
              <div className="px-8 py-14 rounded-[28px] border-2 border-dashed border-[#0d0d0d]/20 bg-white/40 flex items-center gap-3 text-lg font-mono text-[#0d0d0d] font-semibold whitespace-nowrap">
                <span>and counting</span>
                <span className="text-xl">→</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Hint */}
        <div className="site-container w-full flex items-center justify-between text-xs font-mono text-[#a9a6a0]">
          <span>Horizontal travel locked to vertical scroll</span>
          <span>Scroll down to advance milestones</span>
        </div>

      </div>
    </section>
  );
};

// Sub-component for individual achievement card with counting number animation
const AchievementCard: React.FC<{
  item: AchievementItem;
  scrollProgress: number;
  cardIndex: number;
  totalCards: number;
}> = ({ item, scrollProgress, cardIndex, totalCards }) => {
  const [displayNumber, setDisplayNumber] = useState<number | string>(item.targetValue);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Calculate if this card is nearest the viewport center
  const cardCenterProgress = cardIndex / (totalCards - 1 || 1);
  const distanceToCenter = Math.abs(scrollProgress - cardCenterProgress);
  const isCentered = distanceToCenter < 0.22;

  // Number count-up easeOutQuart over 1.4s
  useEffect(() => {
    if (isCentered && !hasAnimated) {
      setHasAnimated(true);

      if (typeof item.targetValue === 'number' && item.targetValue > 0) {
        const duration = 1400; // ms
        const startTime = performance.now();
        const startVal = 0;
        const endVal = item.targetValue;

        const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4);

        const frame = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(1, elapsed / duration);
          const current = startVal + (endVal - startVal) * easeOutQuart(progress);

          if (item.targetValue % 1 === 0) {
            setDisplayNumber(Math.floor(current));
          } else {
            setDisplayNumber(current.toFixed(2));
          }

          if (progress < 1) {
            requestAnimationFrame(frame);
          } else {
            setDisplayNumber(item.targetValue);
          }
        };

        requestAnimationFrame(frame);
      }
    }
  }, [isCentered, hasAnimated, item.targetValue]);

  return (
    <div
      className={`shrink-0 w-[clamp(340px,40vw,540px)] h-[clamp(260px,36vh,310px)] rounded-[28px] bg-white p-7 sm:p-8 flex flex-col justify-between transition-all duration-500 relative overflow-hidden ${
        isCentered
          ? '-translate-y-3 shadow-[0_30px_60px_-15px_rgba(13,13,13,0.14)]'
          : 'shadow-[0_10px_30px_rgba(0,0,0,0.04)]'
      }`}
      style={{
        border: '1px solid rgba(13, 13, 13, 0.08)',
      }}
    >
      {/* Soft brand-tint glow behind the logo */}
      <div
        className="absolute -top-10 -left-10 w-44 h-44 rounded-full blur-3xl pointer-events-none transition-opacity duration-500"
        style={{
          backgroundColor: item.brandColor,
          opacity: isCentered ? 0.16 : 0.08,
        }}
        aria-hidden="true"
      />

      {/* Top Bar: 72px Logo Tile + Index */}
      <div className="flex items-center justify-between relative z-10">
        <div className="w-[72px] h-[72px] rounded-2xl bg-[#f8f7f5] border border-[#0d0d0d]/5 flex items-center justify-center p-3 shadow-xs">
          <TechLogo name={item.platform} size={48} />
        </div>
        <span className="font-mono text-xs sm:text-sm text-[#a9a6a0] font-semibold tracking-wider">
          {item.index}
        </span>
      </div>

      {/* Bottom Area: Left Specs & Right Giant Count-Up Number */}
      <div className="flex items-end justify-between gap-4 relative z-10">
        {/* Bottom Left: Label, caption, detail */}
        <div className="max-w-[60%]">
          <div className="text-base sm:text-lg font-bold text-[#0d0d0d] tracking-tight leading-snug">
            {item.label}
          </div>
          <div className="text-xs font-mono text-[#77756f] mt-1">
            {item.caption}
          </div>
          <div className="text-[11px] text-[#a9a6a0] mt-1 line-clamp-1">
            {item.detail}
          </div>
        </div>

        {/* Bottom Right: Huge Count-Up Number */}
        <div className="text-right">
          <div className="font-mono text-4xl sm:text-5xl font-black text-[#0d0d0d] tracking-tighter tabular-nums leading-none">
            {item.prefix || ''}
            {displayNumber}
            {item.suffix || ''}
          </div>
        </div>
      </div>
    </div>
  );
};
