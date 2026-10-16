/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CERTIFICATIONS } from '../../lib/data';
import { useInView } from '../../lib/hooks';

export const Certifications: React.FC = () => {
  const [sectionRef, inView] = useInView({ threshold: 0.1 });

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="site-section bg-white border-y border-[#0d0d0d]/10 relative"
    >
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 items-start">
          
          {/* Left Sticky Heading */}
          <div className="lg:sticky lg:top-28">
            <div className="font-mono-tag mb-3">04 — Certifications</div>
            <h2 className="heading-display text-4xl sm:text-5xl md:text-6xl text-balance mb-4">
              Always <span className="font-serif-italic">learning.</span>
            </h2>
            <p className="text-sm text-[#77756f] max-w-sm">
              Continuous professional upskilling across cloud platforms, generative AI, enterprise workflows, and full-stack software development.
            </p>
            <div className="font-mono text-xs text-[#a9a6a0] mt-6">
              Total Validated Credentials: 0{CERTIFICATIONS.length}
            </div>
          </div>

          {/* Right Numbered Ink-Flood Rows */}
          <div className="divide-y divide-[#0d0d0d]/10 border-t border-b border-[#0d0d0d]/10">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.id}
                tabIndex={0}
                className="group relative overflow-hidden py-6 px-4 sm:px-6 flex items-center justify-between cursor-default transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d0d0d]"
              >
                {/* Ink Flood Underlay (scaleX from 0 to 1 on hover) */}
                <span
                  className="absolute inset-0 bg-[#0d0d0d] origin-left scale-x-0 group-hover:scale-x-100 group-focus:scale-x-100 transition-transform duration-400 ease-[cubic-bezier(.16,1,.3,1)] z-0 pointer-events-none"
                  aria-hidden="true"
                />

                {/* Left content: Index + Title */}
                <div className="relative z-10 flex items-center gap-4 sm:gap-8">
                  <span className="font-mono text-xs sm:text-sm text-[#a9a6a0] group-hover:text-white/60 group-focus:text-white/60 transition-colors">
                    {cert.index}
                  </span>
                  <div>
                    <h3 className="text-base sm:text-xl font-bold text-[#0d0d0d] group-hover:text-white group-focus:text-white transition-colors">
                      {cert.title}
                    </h3>
                    <div className="text-xs font-mono text-[#77756f] group-hover:text-white/80 group-focus:text-white/80 transition-colors mt-0.5">
                      Issuer: {cert.issuer}
                    </div>
                  </div>
                </div>

                {/* Right Arrow (slides in on hover) */}
                <div className="relative z-10 font-mono text-lg text-[#0d0d0d] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-white group-focus:opacity-100 group-focus:translate-x-0 group-focus:text-white transition-all duration-300">
                  ↗
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
