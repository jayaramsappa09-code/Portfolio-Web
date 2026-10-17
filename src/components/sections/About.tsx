/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { PROFILE } from '../../lib/data';
import { useInView } from '../../lib/hooks';
import { useSectionReadingTime } from '../../lib/readingTime';

export const About: React.FC = () => {
  const [sectionRef, inView] = useInView({ threshold: 0.1 });
  const [isFlipped, setIsFlipped] = useState(false);
  const [swingAngle, setSwingAngle] = useState(0);

  const cardRef = useRef<HTMLDivElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const angleRef = useRef(0);
  const velocityRef = useRef(0);
  const lastMouseXRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());

  // Dynamic reading time calculation based on section word count
  const readingTime = useSectionReadingTime(sectionRef, PROFILE.resumeSummary);

  // Interactive pendulum spring damping + subtle idle sway
  useEffect(() => {
    let idleTime = 0;

    const tick = (now: number) => {
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = now;

      // Spring physics towards 0 (or subtle idle sway)
      idleTime += dt;
      const targetAngle = Math.sin(idleTime * 1.5) * 1.2; // subtle idle sway (degrees)
      const springK = 28;
      const damping = 4.2;

      const force = -springK * (angleRef.current - targetAngle);
      velocityRef.current += force * dt;
      velocityRef.current *= Math.exp(-damping * dt);
      angleRef.current += velocityRef.current * dt;

      setSwingAngle(angleRef.current);
      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);

    const handleMouseMove = (e: MouseEvent) => {
      if (lastMouseXRef.current !== null) {
        const deltaX = e.clientX - lastMouseXRef.current;
        // Inject velocity based on horizontal mouse movement
        velocityRef.current += deltaX * 0.15;
      }
      lastMouseXRef.current = e.clientX;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleCardKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <section id="about" ref={sectionRef} className="site-section bg-[#f4f2ee] relative">
      <div className="site-container">
        {/* Section Tag & Heading + Reading Time Badge */}
        <div className={`mb-16 rv ${inView ? 'is-in' : ''}`}>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="font-mono-tag">01 — About the Engineer</div>
            
            {/* Estimated Reading Time Display */}
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#0d0d0d]/10 text-xs font-mono text-[#555555] shadow-xs"
              title={`Estimated at standard ~200 words per minute (${readingTime.wordCount} words)`}
            >
              <svg
                className="w-3.5 h-3.5 text-[#0d0d0d]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="font-semibold text-[#0d0d0d]">{readingTime.displayText}</span>
              <span className="text-[#a9a6a0]">·</span>
              <span className="text-[#77756f]">{readingTime.wordCount} words</span>
            </div>
          </div>

          <h2 className="heading-display text-4xl sm:text-5xl md:text-6xl text-balance">
            Human identity, <span className="font-serif-italic">verified.</span>
          </h2>
        </div>

        {/* 3-Column Equal Height Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px_minmax(0,1fr)] gap-8 items-stretch">
          
          {/* Left Column: Summary & Bio */}
          <div className={`card-premium p-8 flex flex-col justify-between rv ${inView ? 'is-in' : ''}`} style={{ '--i': 1 } as React.CSSProperties}>
            <div>
              <div className="text-xs font-mono text-[#a9a6a0] uppercase mb-4 tracking-wider">
                Overview & Background
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0d0d0d] mb-4">
                Hi, I'm {PROFILE.shortName}.
              </h3>
              <p className="text-[#3a3a3a] leading-relaxed text-sm sm:text-base mb-4 font-medium">
                AI Engineer & Full-Stack Software Developer.
              </p>
              <p className="text-[#3a3a3a] leading-relaxed text-sm mb-4">
                {PROFILE.resumeSummary}
              </p>
              <p className="text-[#77756f] text-sm leading-relaxed">
                Specialized in AI Engineering: building generative AI pipelines with Google GenAI API (Gemini), vector embeddings, RAG architectures, and autonomous agent workflows seamlessly integrated into production-ready web platforms.
              </p>
            </div>

            <div className="pt-8 border-t border-[#0d0d0d]/10 mt-8 flex flex-wrap gap-3">
              <a
                href={PROFILE.resumePdf}
                download="Sappa_Jayaram_Siva_Prasad_Resume.pdf"
                className="btn-primary"
              >
                <span>Résumé</span>
                <span className="font-mono text-xs">↓</span>
              </a>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                GitHub ↗
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>

          {/* Center Column: Hanging Lanyard ID Card */}
          <div className="flex flex-col items-center justify-center relative min-h-[480px] rv" style={{ '--i': 2 } as React.CSSProperties}>
            {/* Lanyard Top Attachment */}
            <div className="absolute top-0 flex flex-col items-center z-20 pointer-events-none">
              {/* Lanyard Strap (30x56px with scrolling text) */}
              <div className="w-[30px] h-[56px] bg-[#0d0d0d] text-[#ffffff] overflow-hidden relative shadow-md flex items-center justify-center">
                <div className="text-[7px] font-mono tracking-widest uppercase rotate-90 whitespace-nowrap text-white/80">
                  {PROFILE.shortName} · {PROFILE.role.slice(0, 15)}
                </div>
              </div>
              {/* Metal Clip */}
              <div className="w-4 h-5 bg-[#c8c6c1] border border-[#a9a6a0] rounded-xs shadow-inner -mt-1 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-[#555] rounded-full" />
              </div>
            </div>

            {/* Pendulum Swinging & 3D Flippable Card */}
            <div
              className="mt-14 w-[300px] h-[404px] [perspective:1000px] cursor-pointer focus:outline-none"
              style={{
                transform: `rotate(${swingAngle}deg)`,
                transformOrigin: 'top center',
                transition: 'transform 0.05s linear',
              }}
              onClick={() => setIsFlipped(!isFlipped)}
              onKeyDown={handleCardKeyDown}
              tabIndex={0}
              role="button"
              aria-label="Developer ID badge. Click or press Enter to flip card."
            >
              <div
                ref={cardRef}
                className="relative w-full h-full rounded-[20px] transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] [transform-style:preserve-3d] shadow-[0_20px_50px_rgba(13,13,13,0.12)] border border-[#0d0d0d]/10 bg-white"
                style={{
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                {/* Front of ID Card */}
                <div className="absolute inset-0 w-full h-full rounded-[20px] bg-white p-5 flex flex-col justify-between [backface-visibility:hidden]">
                  {/* Top Black Header Band */}
                  <div className="bg-[#0d0d0d] text-white py-1.5 px-3 rounded-lg flex items-center justify-between font-mono text-[10px] tracking-widest uppercase">
                    <span>DEVELOPER ID</span>
                    <span className="text-white/60">PRAGATI #2029</span>
                  </div>

                  {/* Centered Portrait with Halo Ring */}
                  <div className="flex flex-col items-center my-auto">
                    <div className="relative group w-[128px] h-[156px] rounded-2xl p-1 bg-gradient-to-b from-[#e9e6e0] to-[#ffffff] border border-[#0d0d0d]/15 shadow-inner overflow-hidden">
                      <img
                        src="/portrait-bust.webp"
                        alt="Sappa Jayaram Siva Prasad"
                        className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="text-center mt-3">
                      <h4 className="font-bold text-base text-[#0d0d0d] tracking-tight">
                        {PROFILE.name}
                      </h4>
                      <p className="text-[11px] text-[#0d0d0d] font-semibold leading-tight mt-0.5">
                        AI Engineer & Software Engineer
                      </p>
                    </div>
                  </div>

                  {/* Meta Specs: ID, Dept, Valid Till */}
                  <div className="space-y-1.5 py-2 border-t border-b border-[#0d0d0d]/10 text-[10.5px] font-mono">
                    <div className="flex justify-between text-[#77756f]">
                      <span>ID NO.</span>
                      <span className="text-[#0d0d0d] font-semibold">{PROFILE.idNumber}</span>
                    </div>
                    <div className="flex justify-between text-[#77756f]">
                      <span>DEPT.</span>
                      <span className="text-[#0d0d0d] font-semibold">CSE (AI / Full-Stack)</span>
                    </div>
                    <div className="flex justify-between text-[#77756f]">
                      <span>VALID TILL</span>
                      <span className="text-[#0d0d0d] font-semibold">{PROFILE.validTill}</span>
                    </div>
                  </div>

                  {/* Bottom Barcode & Hologram */}
                  <div className="flex items-center justify-between pt-1">
                    {/* Simulated Barcode */}
                    <div className="flex items-end gap-[1.5px] h-6" aria-hidden="true">
                      {[3, 1, 4, 1, 5, 2, 6, 2, 5, 1, 3, 2, 4, 1, 2, 5, 1, 3, 4, 2].map((w, idx) => (
                        <span
                          key={idx}
                          className="bg-[#0d0d0d]"
                          style={{
                            width: `${w * 0.9}px`,
                            height: '100%',
                          }}
                        />
                      ))}
                    </div>

                    {/* Holographic Sticker */}
                    <div className="w-8 h-8 rounded-full border border-[#0d0d0d]/20 bg-gradient-to-tr from-[#d5d2cc] via-[#ffffff] to-[#d5d2cc] flex items-center justify-center shadow-xs">
                      <span className="font-mono text-[7px] text-[#77756f] font-bold">SEC</span>
                    </div>
                  </div>
                </div>

                {/* Back of ID Card */}
                <div
                  className="absolute inset-0 w-full h-full rounded-[20px] bg-[#0d0d0d] text-white p-6 flex flex-col justify-between [transform:rotateY(180deg)] [backface-visibility:hidden]"
                >
                  <div>
                    <div className="font-mono text-[10px] text-white/50 tracking-widest uppercase mb-4">
                      WHAT I AM
                    </div>

                    <div className="space-y-3 text-xs leading-relaxed text-white/90">
                      <div className="flex items-start gap-2">
                        <span className="text-white/40 font-mono">01.</span>
                        <span><strong className="text-white">AI Engineer</strong> & Full-Stack Software Developer.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-white/40 font-mono">02.</span>
                        <span>Generative AI workflows: Google GenAI (Gemini), RAG, Vector Embeddings.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-white/40 font-mono">03.</span>
                        <span>B.Tech in CSE at Pragati Engineering College (9.30/10 CGPA).</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-white/40 font-mono">04.</span>
                        <span>150+ LeetCode problems solved across Data Structures & Algorithms.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-white/40 font-mono">05.</span>
                        <span>Creator of EngiPrepHub, TraceXMail & Verimedia AI (IBM Hackathon Finale).</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/15 space-y-3">
                    <div className="font-serif-italic text-sm text-white/80">
                      Sappa Jayaram Siva Prasad
                    </div>
                    <div className="text-[10px] font-mono text-white/50 flex justify-between">
                      <span>If found, say hello:</span>
                      <span className="text-white/80 underline">{PROFILE.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-3 text-[11px] font-mono text-[#a9a6a0] flex items-center gap-1.5">
              <span>(Click to flip badge)</span>
            </div>
          </div>

          {/* Right Column: Quick Facts & Verbatim Quote */}
          <div className={`card-premium p-8 flex flex-col justify-between rv ${inView ? 'is-in' : ''}`} style={{ '--i': 2 } as React.CSSProperties}>
            <div>
              <div className="text-xs font-mono text-[#a9a6a0] uppercase mb-4 tracking-wider">
                Quick Facts
              </div>

              <div className="space-y-4 text-sm divide-y divide-[#0d0d0d]/5">
                <div className="pt-2">
                  <div className="text-xs font-mono text-[#77756f]">AI FOCUS & DOMAIN</div>
                  <div className="font-medium text-[#0d0d0d] mt-0.5">AI Engineer & Full-Stack</div>
                  <div className="text-xs text-[#77756f]">GenAI API, RAG, Embeddings, Agents</div>
                </div>

                <div className="pt-3">
                  <div className="text-xs font-mono text-[#77756f]">LOCATION</div>
                  <div className="font-medium text-[#0d0d0d] mt-0.5">{PROFILE.location}</div>
                </div>

                <div className="pt-3">
                  <div className="text-xs font-mono text-[#77756f]">EDUCATION</div>
                  <div className="font-medium text-[#0d0d0d] mt-0.5">B.Tech CSE (2025–2029)</div>
                  <div className="text-xs text-[#77756f]">Pragati Engineering College (CGPA: 9.30)</div>
                </div>

                <div className="pt-3">
                  <div className="text-xs font-mono text-[#77756f]">RECENT EXPERIENCE</div>
                  <div className="font-medium text-[#0d0d0d] mt-0.5">ServiceNow Virtual Intern</div>
                  <div className="text-xs text-[#77756f]">Administration, Flows & Introductory Agentic AI</div>
                </div>

                <div className="pt-3">
                  <div className="text-xs font-mono text-[#77756f]">CONTACT</div>
                  <div className="font-medium text-[#0d0d0d] mt-0.5 truncate">{PROFILE.email}</div>
                  <div className="text-xs text-[#77756f]">{PROFILE.phone}</div>
                </div>
              </div>
            </div>

            {/* Paraphrased Quote from Resume */}
            <div className="pt-6 border-t border-[#0d0d0d]/10 mt-6">
              <blockquote className="text-xs text-[#3a3a3a] italic leading-relaxed">
                "Focused on engineering practical web applications with modern frameworks and integrating generative AI APIs into real-world software workflows."
              </blockquote>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
