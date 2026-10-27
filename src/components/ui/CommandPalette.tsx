/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { useScroll } from '../../lib/scroll';
import { PROFILE, NAV_ITEMS } from '../../lib/data';

interface CommandItem {
  id: string;
  category: 'Sections' | 'Quick Actions';
  title: string;
  description: string;
  keywords: string[];
  badge?: string;
  onSelect: () => void;
}

export const CommandPalette: React.FC = () => {
  const { scrollTo } = useScroll();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  // Command items catalog
  const commands: CommandItem[] = [
    // Sections
    {
      id: 'section-hero',
      category: 'Sections',
      title: 'Hero / Introduction',
      description: 'AI Engineer headline, 3D avatar & audio welcome',
      keywords: ['hero', 'home', 'intro', 'avatar', 'audio', 'ai engineer', 'top', 'start'],
      badge: '00',
      onSelect: () => scrollTo('#hero'),
    },
    {
      id: 'section-about',
      category: 'Sections',
      title: 'About the Engineer',
      description: 'Background overview, summary & 3D lanyard ID card',
      keywords: ['about', 'bio', 'identity', 'id', 'card', 'lanyard', 'pragati', 'college', 'degree'],
      badge: '01',
      onSelect: () => scrollTo('#about'),
    },
    {
      id: 'section-skills',
      category: 'Sections',
      title: 'Skills & Tech Stack',
      description: 'Periodic Table of Tech: React, TypeScript, Python, Gemini, RAG',
      keywords: ['skills', 'tech', 'stack', 'languages', 'react', 'typescript', 'python', 'node', 'gemini', 'rag', 'supabase', 'postgres'],
      badge: '02',
      onSelect: () => scrollTo('#skills'),
    },
    {
      id: 'section-work',
      category: 'Sections',
      title: 'Featured Work & Projects',
      description: 'Verimedia AI, CuraMind AI & production applications',
      keywords: ['work', 'projects', 'portfolio', 'verimedia', 'curamind', 'case studies', 'apps', 'code'],
      badge: '03',
      onSelect: () => scrollTo('#work'),
    },
    {
      id: 'section-certifications',
      category: 'Sections',
      title: 'Certifications & Credentials',
      description: 'IBM SkillsBuild, ServiceNow, Google GenAI certificates',
      keywords: ['certifications', 'certificates', 'ibm', 'servicenow', 'google', 'credentials', 'licenses'],
      badge: '04',
      onSelect: () => scrollTo('#certifications'),
    },
    {
      id: 'section-experience',
      category: 'Sections',
      title: 'Career & Education Timeline',
      description: 'ServiceNow intern, Pragati Engg (9.30 CGPA), coursework',
      keywords: ['experience', 'career', 'education', 'internship', 'timeline', 'servicenow', 'pragati', 'cgpa'],
      badge: '05',
      onSelect: () => scrollTo('#experience'),
    },
    {
      id: 'section-achievements',
      category: 'Sections',
      title: 'Verified Achievements',
      description: '150+ LeetCode solved, IBM Hackathon Regional finalist',
      keywords: ['achievements', 'leetcode', 'hackathon', 'ibm', 'milestones', 'numbers', 'honours'],
      badge: '06',
      onSelect: () => scrollTo('#achievements'),
    },
    {
      id: 'section-faq',
      category: 'Sections',
      title: 'Frequently Asked Questions',
      description: 'Client process, AI hallucination prevention, delivery timelines',
      keywords: ['faq', 'questions', 'answers', 'pricing', 'timeline', 'clients', 'process', 'reliability'],
      badge: '07',
      onSelect: () => scrollTo('#faq'),
    },
    {
      id: 'section-contact',
      category: 'Sections',
      title: 'Contact Me & Direct Message',
      description: 'Send direct email, copy address, or phone connection',
      keywords: ['contact', 'email', 'message', 'form', 'hire', 'phone', 'reach', 'talk'],
      badge: '08',
      onSelect: () => scrollTo('#contact'),
    },

    // Quick Actions
    {
      id: 'action-resume',
      category: 'Quick Actions',
      title: 'Download Résumé (PDF)',
      description: 'Official verified curriculum vitae of Sappa Jayaram Siva Prasad',
      keywords: ['resume', 'cv', 'download', 'pdf', 'curriculum vitae'],
      badge: 'PDF',
      onSelect: () => {
        const link = document.createElement('a');
        link.href = PROFILE.resumePdf;
        link.download = 'Sappa_Jayaram_Siva_Prasad_Resume.pdf';
        link.click();
      },
    },
    {
      id: 'action-linkedin',
      category: 'Quick Actions',
      title: 'Connect on LinkedIn',
      description: `Open linkedin.com/in/${PROFILE.linkedinHandle} in a new tab`,
      keywords: ['linkedin', 'social', 'network', 'connect', 'profile'],
      badge: '↗',
      onSelect: () => window.open(PROFILE.linkedin, '_blank', 'noopener,noreferrer'),
    },
    {
      id: 'action-github',
      category: 'Quick Actions',
      title: 'View GitHub Profile',
      description: `Open github.com/${PROFILE.githubHandle} in a new tab`,
      keywords: ['github', 'git', 'repos', 'code', 'open source'],
      badge: '↗',
      onSelect: () => window.open(PROFILE.github, '_blank', 'noopener,noreferrer'),
    },
    {
      id: 'action-copy-email',
      category: 'Quick Actions',
      title: 'Copy Email Address',
      description: `Copy ${PROFILE.email} to system clipboard`,
      keywords: ['copy', 'email', 'clipboard', 'address'],
      badge: 'Copy',
      onSelect: () => {
        navigator.clipboard.writeText(PROFILE.email);
      },
    },
    {
      id: 'action-sound',
      category: 'Quick Actions',
      title: 'Toggle Audio Introduction',
      description: 'Play / Mute the spoken voice introduction in the Hero section',
      keywords: ['audio', 'sound', 'voice', 'mute', 'play', 'dialogue', 'speech'],
      badge: 'Sound',
      onSelect: () => window.dispatchEvent(new CustomEvent('toggle-sound-event')),
    },
  ];

  // Filter commands by search query
  const filteredCommands = commands.filter((cmd) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase().trim();
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.description.toLowerCase().includes(q) ||
      cmd.keywords.some((kw) => kw.toLowerCase().includes(q))
    );
  });

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => setIsOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleCustomOpen);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleCustomOpen);
    };
  }, [isOpen]);

  // Focus input whenever opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation within list
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredCommands.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredCommands.length - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].onSelect();
        setIsOpen(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-[#0d0d0d]/45 backdrop-blur-[6px] animate-in fade-in duration-200"
      onClick={() => setIsOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Command search palette"
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-[24px] border border-[#0d0d0d]/15 shadow-[0_24px_60px_-15px_rgba(13,13,13,0.3)] overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#0d0d0d]/10 bg-[#fdfdfc]">
          <svg
            className="w-5 h-5 text-[#888888] shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Type a section name, skill, project, or action..."
            className="w-full text-sm sm:text-base text-[#0d0d0d] placeholder:text-[#a9a6a0] bg-transparent outline-none focus:outline-none"
            aria-autocomplete="list"
          />

          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-[#77756f] bg-[#f4f2ee] rounded border border-[#0d0d0d]/10">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div
          ref={listRef}
          className="overflow-y-auto p-3 space-y-1 divide-y divide-transparent max-h-[60vh] scrollbar-thin"
          role="listbox"
        >
          {filteredCommands.length === 0 ? (
            <div className="py-12 text-center text-sm text-[#77756f] font-mono">
              No matching sections or actions for <span className="font-semibold text-[#0d0d0d]">"{query}"</span>
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;

              return (
                <div
                  key={cmd.id}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    cmd.onSelect();
                    setIsOpen(false);
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between gap-4 px-4 py-3 rounded-xl cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-[#0d0d0d] text-white shadow-sm'
                      : 'text-[#0d0d0d] hover:bg-[#f4f2ee]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Category Icon or Indicator */}
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 font-mono text-xs font-semibold ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-[#f4f2ee] text-[#555555]'
                      }`}
                    >
                      {cmd.category === 'Sections' ? '#' : '⚡'}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm truncate">
                          {cmd.title}
                        </span>
                        <span
                          className={`text-[10px] font-mono uppercase px-1.5 py-0.5 rounded ${
                            isSelected
                              ? 'bg-white/15 text-white/90'
                              : 'bg-[#f4f2ee] text-[#77756f]'
                          }`}
                        >
                          {cmd.category}
                        </span>
                      </div>
                      <p
                        className={`text-xs truncate mt-0.5 ${
                          isSelected ? 'text-white/80' : 'text-[#666666]'
                        }`}
                      >
                        {cmd.description}
                      </p>
                    </div>
                  </div>

                  {/* Badge or Jump Indicator */}
                  {cmd.badge && (
                    <span
                      className={`text-xs font-mono shrink-0 px-2.5 py-1 rounded-md ${
                        isSelected
                          ? 'bg-white text-[#0d0d0d] font-bold'
                          : 'bg-[#f4f2ee] text-[#555555] border border-[#0d0d0d]/10'
                      }`}
                    >
                      {cmd.badge}
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer Navigation Hints */}
        <div className="px-5 py-3 border-t border-[#0d0d0d]/10 bg-[#fbfbfa] flex items-center justify-between text-[11px] font-mono text-[#77756f]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 bg-white rounded border border-[#0d0d0d]/10 shadow-2xs">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-white rounded border border-[#0d0d0d]/10 shadow-2xs">↓</kbd>
              <span>to navigate</span>
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 bg-white rounded border border-[#0d0d0d]/10 shadow-2xs">↵</kbd>
              <span>to jump</span>
            </span>
          </div>

          <span className="hidden sm:inline text-[#a9a6a0]">
            Press <kbd className="px-1 py-0.5 bg-white rounded border border-[#0d0d0d]/10">Ctrl+K</kbd> anywhere
          </span>
        </div>
      </div>
    </div>
  );
};
