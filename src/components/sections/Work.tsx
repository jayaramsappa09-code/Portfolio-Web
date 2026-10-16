/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PROJECTS, ProjectItem } from '../../lib/data';
import { TechLogo } from '../ui/TechLogo';
import { useInView } from '../../lib/hooks';

export const Work: React.FC = () => {
  const [sectionRef, inView] = useInView({ threshold: 0.1 });
  const [activeProjectId, setActiveProjectId] = useState<string>(PROJECTS[0].id);

  return (
    <section id="work" ref={sectionRef} className="site-section bg-[#f4f2ee] relative">
      <div className="site-container">
        {/* Section Tag & Heading */}
        <div className={`mb-12 rv ${inView ? 'is-in' : ''}`}>
          <div className="font-mono-tag mb-3">03 — Selected Work</div>
          <h2 className="heading-display text-4xl sm:text-5xl md:text-6xl text-balance">
            Things I've <span className="font-serif-italic">built.</span>
          </h2>
          <p className="text-sm text-[#77756f] mt-3 max-w-xl">
            Showcasing full-stack and AI engineering architectures. Hover, focus, or tap any panel to inspect the AI workflows, key features, stack vectors, and illustrative interface prototypes.
          </p>
        </div>

        {/* Desktop Side-by-Side Expanding Accordion Gallery (height: min(78svh, 600px)) */}
        <div className="hidden lg:flex gap-3.5 h-[min(78svh,600px)] w-full items-stretch">
          {PROJECTS.map((project) => {
            const isOpen = activeProjectId === project.id;
            const isAIProject = project.tech.some(t => t.toLowerCase().includes('ai') || t.toLowerCase().includes('nlp') || t.toLowerCase().includes('genai'));

            return (
              <div
                key={project.id}
                onMouseEnter={() => setActiveProjectId(project.id)}
                onFocus={() => setActiveProjectId(project.id)}
                onClick={() => setActiveProjectId(project.id)}
                tabIndex={0}
                className={`card-premium group relative transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] overflow-hidden cursor-pointer flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d0d0d] ${
                  isOpen
                    ? 'flex-[8] bg-white border-[#0d0d0d]/25 shadow-2xl z-10'
                    : 'flex-[1] bg-[#f8f7f5] hover:bg-white border-[#0d0d0d]/10 hover:border-[#0d0d0d]/25'
                }`}
                role="region"
                aria-label={`Project: ${project.title}`}
              >
                {/* Closed Slim Spine View */}
                {!isOpen ? (
                  <div className="w-full h-full py-8 px-2 flex flex-col justify-between items-center select-none">
                    {/* Project Number */}
                    <span className="font-mono text-xs font-semibold text-[#a9a6a0] group-hover:text-[#0d0d0d] transition-colors">
                      {project.index}
                    </span>

                    {/* Vertical Title */}
                    <div className="writing-vertical [writing-mode:vertical-rl] rotate-180 font-bold text-sm tracking-tight text-[#0d0d0d] whitespace-nowrap">
                      {project.title}
                    </div>

                    {/* Rotating Plus Button */}
                    <div className="w-8 h-8 rounded-full border border-[#0d0d0d]/20 flex items-center justify-center text-sm font-light text-[#0d0d0d] group-hover:rotate-90 group-hover:bg-[#0d0d0d] group-hover:text-white transition-all duration-300">
                      +
                    </div>
                  </div>
                ) : (
                  /* Expanded Panel (Left Content + Right Illustrative UI) */
                  <div className="w-full h-full p-8 sm:p-10 grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-8 items-center overflow-y-auto animate-in fade-in duration-300">
                    
                    {/* Left: Project Information */}
                    <div className="flex flex-col justify-between h-full pr-2">
                      <div>
                        {/* Number + Kicker + AI badge */}
                        <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[#77756f] uppercase mb-2">
                          <span className="font-bold text-[#0d0d0d]">{project.index}</span>
                          <span>—</span>
                          <span className="tracking-wider">{project.kicker}</span>
                          {isAIProject && (
                            <span className="ml-auto px-2 py-0.5 rounded-full bg-[#0d0d0d] text-white text-[10px] font-semibold tracking-wide">
                              AI ENGINEERING
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="heading-display text-3xl sm:text-4xl text-[#0d0d0d] mb-3">
                          {project.title}
                        </h3>

                        {/* Description (from resume) */}
                        <p className="text-[#3a3a3a] text-sm leading-relaxed mb-6 font-normal">
                          {project.description}
                        </p>

                        {/* 2-Column Feature List */}
                        <div className="mb-6">
                          <div className="text-[10px] font-mono text-[#a9a6a0] uppercase tracking-wider mb-2.5">
                            Key Capabilities & Architecture
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {project.features.map((feat, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-xs text-[#444] leading-snug">
                                <span className="text-[#0d0d0d] font-bold select-none">✓</span>
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Tech Chips with Small Logos */}
                        <div className="mb-6">
                          <div className="text-[10px] font-mono text-[#a9a6a0] uppercase tracking-wider mb-2">
                            Technologies
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((t, idx) => (
                              <div
                                key={idx}
                                className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#f4f2ee] rounded-full text-xs font-mono text-[#0d0d0d] border border-[#0d0d0d]/5 font-medium hover:bg-white hover:border-[#0d0d0d]/20 transition-colors"
                              >
                                <TechLogo name={t} size={15} />
                                <span>{t}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons: View on GitHub + Live Demo */}
                      <div className="pt-4 border-t border-[#0d0d0d]/10 flex flex-wrap items-center gap-3">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span>View on GitHub</span>
                            <span className="font-mono text-xs">↗</span>
                          </a>
                        )}

                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span>Live Product</span>
                            <span className="font-mono text-xs">↗</span>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Right: Illustrative Mini-UI built in pure CSS/JSX */}
                    <div className="h-full min-h-[300px] flex flex-col justify-center">
                      <IllustrativeUI projectId={project.id} title={project.title} />
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Vertical Accordion */}
        <div className="flex flex-col gap-4 lg:hidden">
          {PROJECTS.map((project) => {
            const isOpen = activeProjectId === project.id;

            return (
              <div
                key={project.id}
                className="card-premium overflow-hidden bg-white border-[#0d0d0d]/15 shadow-sm"
              >
                <button
                  onClick={() => setActiveProjectId(isOpen ? '' : project.id)}
                  className="w-full p-6 text-left flex items-center justify-between"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[#a9a6a0] font-semibold">{project.index}</span>
                    <span className="font-bold text-lg text-[#0d0d0d]">{project.title}</span>
                  </div>
                  <span className={`w-7 h-7 rounded-full border border-[#0d0d0d]/15 flex items-center justify-center font-mono text-sm transition-transform duration-300 ${isOpen ? 'rotate-45 bg-[#0d0d0d] text-white' : ''}`}>
                    +
                  </span>
                </button>

                {isOpen && (
                  <div className="p-6 pt-0 border-t border-[#0d0d0d]/5">
                    <div className="font-mono text-xs text-[#77756f] uppercase mb-2">
                      {project.kicker}
                    </div>
                    <p className="text-sm text-[#3a3a3a] leading-relaxed mb-4">
                      {project.description}
                    </p>

                    <div className="space-y-1.5 mb-5">
                      {project.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-[#444]">
                          <span className="text-[#0d0d0d] font-bold">✓</span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tech.map((t, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 bg-[#f4f2ee] rounded-full text-[#0d0d0d]">
                          <TechLogo name={t} size={12} />
                          <span>{t}</span>
                        </span>
                      ))}
                    </div>

                    <div className="mb-6">
                      <IllustrativeUI projectId={project.id} title={project.title} />
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary text-xs"
                        >
                          View on GitHub ↗
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary text-xs"
                        >
                          Live Product ↗
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

// Grayscale Illustrative UI Components in Pure CSS/JSX
const IllustrativeUI: React.FC<{ projectId: string; title: string }> = ({ projectId, title }) => {
  return (
    <div
      className="w-full h-full min-h-[280px] max-h-[380px] rounded-2xl border border-[#0d0d0d]/15 bg-[#f9f8f6] p-4 sm:p-5 flex flex-col justify-between relative shadow-inner overflow-hidden select-none"
      style={{
        clipPath: 'inset(0 0 0 0 round 16px)',
      }}
    >
      {/* Top Header of simulated app window */}
      <div className="flex items-center justify-between pb-3 border-b border-[#0d0d0d]/10 text-[10px] font-mono text-[#a9a6a0]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0d0d0d]/20" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#0d0d0d]/20" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#0d0d0d]/20" />
        </div>
        <span className="uppercase tracking-wider font-semibold text-[#0d0d0d]/70">
          Illustrative UI
        </span>
      </div>

      {/* Dynamic Mini-UI Content depending on the project */}
      <div className="my-auto py-2">
        {projectId === 'engiprephub' ? (
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-mono text-[#0d0d0d]">
              <span className="font-semibold">Curriculum: Data Structures & Algorithms</span>
              <span className="text-[10px] bg-white px-2.5 py-0.5 rounded-full border border-[#0d0d0d]/10 font-bold">
                AI Assistant Active
              </span>
            </div>

            {/* Simulated Progress bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-mono text-[#77756f]">
                <span>Preparation Mastery</span>
                <span>78%</span>
              </div>
              <div className="h-2 w-full bg-[#0d0d0d]/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#0d0d0d] w-[78%] rounded-full" />
              </div>
            </div>

            {/* Document parser and AI chat card */}
            <div className="bg-white p-3.5 rounded-xl border border-[#0d0d0d]/10 text-xs text-[#555] space-y-2 shadow-xs">
              <div className="flex items-center justify-between font-mono text-[10px] text-[#77756f] pb-1 border-b border-dashed">
                <span>PDF Document Extractor</span>
                <span className="text-[#0d0d0d] font-bold">SUPABASE DB</span>
              </div>
              <div className="h-2.5 bg-[#0d0d0d]/15 rounded w-5/6" />
              <div className="h-2.5 bg-[#0d0d0d]/10 rounded w-2/3" />
              <div className="h-2.5 bg-[#0d0d0d]/5 rounded w-4/5" />
            </div>
          </div>
        ) : projectId === 'tracexmail' ? (
          <div className="space-y-3">
            {/* Phishing & Threat Triage Box */}
            <div className="bg-white p-3.5 rounded-xl border border-[#0d0d0d]/10 text-xs font-mono shadow-xs">
              <div className="flex justify-between items-center text-[#3a3a3a] mb-2 pb-1.5 border-b border-dashed">
                <span className="font-bold text-[#0d0d0d]">SPF / DKIM / DMARC</span>
                <span className="text-[10px] px-2 py-0.5 bg-[#0d0d0d] text-white rounded-full">
                  VERIFIED
                </span>
              </div>
              <div className="flex justify-between text-[#77756f] text-[11px]">
                <span>Phishing Risk Score</span>
                <span className="font-bold text-[#0d0d0d]">0.02 (CLEAN)</span>
              </div>
            </div>

            {/* 3 Metric Intelligence badges */}
            <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
              <div className="p-2 bg-white rounded-lg border border-[#0d0d0d]/10 shadow-xs font-semibold">
                IP Check: PASS
              </div>
              <div className="p-2 bg-white rounded-lg border border-[#0d0d0d]/10 shadow-xs font-semibold">
                URL Intel: SAFE
              </div>
              <div className="p-2 bg-white rounded-lg border border-[#0d0d0d]/10 shadow-xs font-semibold">
                Sender: AUTH
              </div>
            </div>
          </div>
        ) : projectId === 'verimedia' ? (
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="font-semibold text-[#0d0d0d]">SHA-256 Media Forensics</span>
              <span className="bg-white px-2.5 py-0.5 rounded-full border border-[#0d0d0d]/15 text-[10px] font-bold">
                IBM Hackathon Finale
              </span>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-[#0d0d0d]/10 flex items-center gap-3.5 shadow-xs">
              <div className="w-12 h-12 rounded-lg bg-[#0d0d0d]/5 border border-[#0d0d0d]/10 flex flex-col items-center justify-center font-mono text-[10px]">
                <span className="font-bold text-[#0d0d0d]">AUDIO</span>
                <span className="text-[8px] text-[#77756f]">WAV</span>
              </div>
              <div className="flex-1 space-y-1.5">
                <div className="flex justify-between text-[10px] font-mono">
                  <span>Manipulation Detection</span>
                  <span className="font-bold text-[#0d0d0d]">NO SPLICING</span>
                </div>
                <div className="h-2 bg-[#0d0d0d]/15 rounded w-4/5" />
                <div className="h-2 bg-[#0d0d0d]/10 rounded w-3/5" />
              </div>
            </div>

            <div className="text-[10px] font-mono text-[#77756f] text-center">
              SQLite Indexing · Deepfake & Misuse Investigation
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="bg-white p-3.5 rounded-xl border border-[#0d0d0d]/10 text-xs shadow-xs">
              <div className="font-bold text-[#0d0d0d] mb-2 font-mono">
                Interactive Quiz · JS Engine Scope
              </div>
              <div className="space-y-1.5">
                <div className="p-2 bg-[#f4f2ee] rounded-lg text-[11px] font-mono font-medium flex items-center justify-between">
                  <span>● Lexical environment binding</span>
                  <span className="text-[9px] font-bold text-[#0d0d0d]">CORRECT ✓</span>
                </div>
                <div className="p-2 rounded-lg text-[11px] font-mono text-[#77756f] border border-dashed border-[#0d0d0d]/10">
                  ○ Global execution context only
                </div>
              </div>
            </div>

            <div className="flex justify-between text-[10px] font-mono text-[#77756f]">
              <span>Score: 100% Calculated</span>
              <span>Immediate Feedback: ON</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom disclaimer badge */}
      <div className="text-[9px] font-mono text-[#77756f] text-center uppercase tracking-widest pt-2.5 border-t border-[#0d0d0d]/10">
        Illustrative UI · Pure CSS/JSX Grayscale Simulation
      </div>
    </div>
  );
};
