/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { TIMELINE } from '../../lib/data';
import { useInView, useElementScrollProgress } from '../../lib/hooks';

export const Experience: React.FC = () => {
  const [sectionRef, inView] = useInView({ threshold: 0.1 });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollProgress = useElementScrollProgress(containerRef);

  return (
    <section id="experience" ref={sectionRef} className="site-section bg-[#f4f2ee] relative">
      <div className="site-container">
        {/* Section Tag & Heading */}
        <div className={`mb-16 rv ${inView ? 'is-in' : ''}`}>
          <div className="font-mono-tag mb-3">05 — Career & Education</div>
          <h2 className="heading-display text-4xl sm:text-5xl md:text-6xl text-balance">
            One continuous <span className="font-serif-italic">path.</span>
          </h2>
        </div>

        {/* Vertical Timeline Container */}
        <div ref={containerRef} className="relative max-w-3xl mx-auto pl-8 sm:pl-12">
          
          {/* Background Timeline Spine (Gray) */}
          <div
            className="absolute left-3 sm:left-4 top-2 bottom-12 w-[2px] bg-[#0d0d0d]/10 origin-top"
            aria-hidden="true"
          />

          {/* Active Animated Timeline Spine (Solid Ink) scaled by scrollProgress */}
          <div
            className="absolute left-3 sm:left-4 top-2 bottom-12 w-[2px] bg-[#0d0d0d] origin-top transition-transform duration-100 ease-out"
            style={{
              transform: `scaleY(${Math.min(1, Math.max(0, scrollProgress * 1.25))})`,
            }}
            aria-hidden="true"
          />

          {/* Timeline Nodes */}
          <div className="space-y-12">
            {TIMELINE.map((item, idx) => {
              // Calculate threshold for lighting up
              const itemProgress = (idx + 0.3) / (TIMELINE.length + 0.5);
              const isLit = scrollProgress >= itemProgress || inView;

              return (
                <div
                  key={idx}
                  className="relative group rv"
                  style={{ '--i': idx + 1 } as React.CSSProperties}
                >
                  {/* Timeline Stop Marker Node */}
                  <div
                    className={`absolute -left-[30px] sm:-left-[40px] top-1.5 w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                      isLit
                        ? 'border-[#0d0d0d] bg-white shadow-md'
                        : 'border-[#a9a6a0] bg-[#f4f2ee]'
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full transition-transform duration-300 ${
                        isLit ? 'bg-[#0d0d0d] scale-100' : 'bg-transparent scale-0'
                      }`}
                    />
                  </div>

                  {/* Card Content */}
                  <div
                    className={`card-premium p-6 sm:p-8 transition-all duration-300 ${
                      isLit ? 'bg-white shadow-md border-[#0d0d0d]/15' : 'bg-[#faf9f7] border-[#0d0d0d]/5'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2 font-mono text-xs">
                      <span className="text-[#0d0d0d] font-semibold px-2.5 py-0.5 bg-[#f4f2ee] rounded-full">
                        {item.period}
                      </span>
                      <span className="text-[#a9a6a0] uppercase tracking-wider">
                        {item.type === 'education' ? 'Academic' : 'Internship & Industry'}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-[#0d0d0d] mb-1">
                      {item.title}
                    </h3>

                    <div className="text-sm font-medium text-[#77756f] mb-4">
                      {item.organization}
                    </div>

                    <ul className="space-y-2 text-xs sm:text-sm text-[#3a3a3a] mb-4 leading-relaxed">
                      {item.details.map((d, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2">
                          <span className="text-[#0d0d0d] font-mono select-none">→</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>

                    {item.highlights && (
                      <div className="pt-3 border-t border-[#0d0d0d]/10 text-xs font-mono text-[#0d0d0d] font-medium">
                        Focus: {item.highlights}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Ending Dashed Card: Next - Your team? */}
            <div className="relative group">
              <div className="absolute -left-[30px] sm:-left-[40px] top-1.5 w-5 h-5 rounded-full border-2 border-dashed border-[#0d0d0d] bg-white flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0d0d0d]" />
              </div>

              <div className="p-6 sm:p-8 rounded-[24px] border-2 border-dashed border-[#0d0d0d]/25 bg-[#ffffff]/60 text-center hover:bg-white hover:border-[#0d0d0d] transition-all">
                <div className="font-mono text-xs text-[#77756f] uppercase mb-1">
                  Future Horizon
                </div>
                <div className="text-xl font-bold text-[#0d0d0d] mb-2">
                  Next — Your team?
                </div>
                <p className="text-xs text-[#555] max-w-md mx-auto">
                  Available for software engineering roles, high-impact AI full-stack development, and challenging technical internships.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
