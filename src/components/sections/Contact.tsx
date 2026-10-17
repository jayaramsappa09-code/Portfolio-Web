/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PROFILE } from '../../lib/data';
import { useScroll } from '../../lib/scroll';
import { useInView } from '../../lib/hooks';

export const Contact: React.FC = () => {
  const [sectionRef, inView] = useInView({ threshold: 0.1 });
  const { scrollTo } = useScroll();
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    });
  };

  const line1 = "Let's build";
  const line2 = "something together.";

  return (
    <section id="contact" ref={sectionRef} className="site-section bg-white border-t border-[#0d0d0d]/10 relative">
      <div className="site-container">
        
        {/* Top Tag */}
        <div className="font-mono-tag mb-6 flex items-center justify-between">
          <span>07 — Get In Touch</span>
          <span>Andhra Pradesh, India (IST)</span>
        </div>

        {/* Huge Heading: Each letter hops when hovered */}
        <div className="mb-14 select-none">
          <h2 className="heading-display text-5xl sm:text-7xl md:text-8xl tracking-tight text-[#0d0d0d]">
            <div className="block overflow-hidden">
              {line1.split('').map((char, idx) => (
                <span
                  key={idx}
                  className="inline-block transition-transform duration-200 hover:-translate-y-3 cursor-default"
                  style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                >
                  {char}
                </span>
              ))}
            </div>
            <div className="block overflow-hidden mt-1 text-[#77756f]">
              {line2.split('').map((char, idx) => (
                <span
                  key={idx}
                  className="inline-block transition-transform duration-200 hover:-translate-y-3 cursor-default font-serif-italic"
                  style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                >
                  {char}
                </span>
              ))}
            </div>
          </h2>
        </div>

        {/* Contact Strip: Email, Copy Chip, Phone, Socials & Rotating Badge */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-center pb-20 border-b border-[#0d0d0d]/10">
          
          <div className="space-y-8">
            {/* Main Email with Copy chip */}
            <div>
              <div className="font-mono text-xs uppercase text-[#a9a6a0] mb-2 tracking-wider">
                Direct Email & Professional Network
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#0d0d0d] underline underline-offset-8 decoration-1 hover:decoration-2 transition-all"
                >
                  {PROFILE.email}
                </a>

                {/* Copy Chip */}
                <button
                  onClick={copyEmail}
                  className={`px-3.5 py-1.5 text-xs font-mono rounded-full border transition-all duration-200 cursor-pointer ${
                    copied
                      ? 'bg-[#0d0d0d] text-white border-[#0d0d0d]'
                      : 'bg-[#f4f2ee] text-[#0d0d0d] border-[#0d0d0d]/10 hover:border-[#0d0d0d]'
                  }`}
                  aria-label="Copy email address"
                >
                  <span aria-live="polite">
                    {copied ? 'Copied ✓' : 'Copy email'}
                  </span>
                </button>

                {/* Connect on LinkedIn Button */}
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a66c2] text-white hover:bg-[#004182] text-xs font-mono font-medium shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer ml-auto sm:ml-0"
                  aria-label="Connect on LinkedIn with Sappa Jayaram Siva Prasad"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                  <span>Connect on LinkedIn</span>
                  <span>↗</span>
                </a>
              </div>
            </div>

            {/* Direct Phone & Social Links from Resume */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 font-mono text-xs text-[#3a3a3a]">
              <div>
                <span className="text-[#a9a6a0] block uppercase mb-1">Phone (Call / WhatsApp)</span>
                <a href={PROFILE.phoneHref} className="font-semibold text-sm hover:underline">
                  {PROFILE.phone}
                </a>
              </div>

              <div>
                <span className="text-[#a9a6a0] block uppercase mb-1">GitHub Profile</span>
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-sm hover:underline"
                >
                  github.com/{PROFILE.githubHandle} ↗
                </a>
              </div>

              <div>
                <span className="text-[#a9a6a0] block uppercase mb-1">LinkedIn Profile</span>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-sm hover:underline text-[#0a66c2] inline-flex items-center gap-1"
                >
                  <span>linkedin.com/in/{PROFILE.linkedinHandle}</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Circular "Say Hello" badge spinning slowly */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-36 h-36 flex items-center justify-center">
              {/* Spinning circular text */}
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full animate-[spin_18s_linear_infinite]"
                aria-hidden="true"
              >
                <path
                  id="textCircle"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="none"
                />
                <text className="font-mono text-[9px] tracking-[0.22em] uppercase fill-[#0d0d0d]">
                  <textPath href="#textCircle" startOffset="0%">
                    · SAY HELLO · SAPPA JAYARAM · GET IN TOUCH
                  </textPath>
                </text>
              </svg>

              {/* Center arrow */}
              <div className="absolute w-12 h-12 rounded-full bg-[#0d0d0d] text-white flex items-center justify-center font-mono text-sm">
                ↓
              </div>
            </div>
          </div>

        </div>

        {/* Clean Minimalist Footer */}
        <footer className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#77756f]">
          <div>
            © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => scrollTo('#hero')}
              className="hover:text-[#0d0d0d] underline underline-offset-4 cursor-pointer"
            >
              Back to top ↑
            </button>
            <span className="text-[#a9a6a0]">·</span>
            <span>Production Portfolio</span>
          </div>
        </footer>

      </div>
    </section>
  );
};
