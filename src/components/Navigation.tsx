/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PROFILE, NAV_ITEMS } from '../lib/data';
import { useScroll } from '../lib/scroll';
import { useScrollProgress } from '../lib/hooks';

export const Navigation: React.FC = () => {
  const { scrollTo } = useScroll();
  const scrollProgress = useScrollProgress();
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor scroll for header style transition and reset activeId at top
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 40;
      setScrolled(isScrolled);
      if (window.scrollY < 260) {
        setActiveId('');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section with rootMargin: -45% 0px -50% 0px
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && window.scrollY >= 260) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );

    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean);
    sections.forEach((sec) => sec && observer.observe(sec));

    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu is open & handle Esc key
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMobileMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollTo(href);
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Main Top Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="site-container flex items-center justify-between">
          {/* Left: Clean plain text Name (matching reference exactly) */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="text-xs sm:text-sm font-medium tracking-tight text-[#0d0d0d] hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0d0d0d] rounded-sm py-1"
            aria-label="Sappa Jayaram Siva Prasad - Scroll to top"
          >
            {PROFILE.name}
          </a>

          {/* Right: Clean Text Links + Circular Sound Button */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <nav aria-label="Primary navigation" className="flex items-center gap-6 lg:gap-8">
              {NAV_ITEMS.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`text-xs font-normal transition-colors hover:text-[#0d0d0d] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0d0d0d] ${
                      isActive ? 'text-[#0d0d0d] font-semibold' : 'text-[#666666]'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            {/* Command Palette Trigger Button (Ctrl+K) */}
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
              className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 border border-[#0d0d0d]/10 text-xs font-mono text-[#555] hover:text-[#0d0d0d] hover:border-[#0d0d0d]/30 transition-all shadow-xs cursor-pointer ml-1"
              title="Search sections and actions (Ctrl+K)"
              aria-label="Search sections and actions (Ctrl+K)"
            >
              <svg className="w-3 h-3 text-[#777]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span>Search</span>
              <kbd className="text-[9px] px-1.5 py-0.2 rounded bg-[#f4f2ee] border border-[#0d0d0d]/10 text-[#777]">⌘K</kbd>
            </button>

            {/* Circular Sound Toggle (matching top-right blue/black circle on laptop screen) */}
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('toggle-sound-event'))}
              className="w-8 h-8 rounded-full bg-[#1e293b] text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d0d0d] cursor-pointer ml-1"
              aria-label="Toggle audio introduction"
              title="Toggle audio introduction"
            >
              <span className="flex items-center justify-center" aria-hidden="true">
                <span className="flex gap-1 items-center">
                  <span className="w-1 h-3 bg-white rounded-xs" />
                  <span className="w-1 h-3 bg-white rounded-xs" />
                </span>
              </span>
            </button>
          </div>

          {/* Mobile Right: Search + Sound + Menu */}
          <div className="flex items-center gap-2.5 md:hidden">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
              className="w-8 h-8 rounded-full bg-white/90 border border-[#0d0d0d]/10 text-[#0d0d0d] flex items-center justify-center active:scale-95 transition-all shadow-xs"
              aria-label="Open search command palette"
              title="Search (Ctrl+K)"
            >
              <svg className="w-3.5 h-3.5 text-[#555]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            <button
              onClick={() => window.dispatchEvent(new CustomEvent('toggle-sound-event'))}
              className="w-8 h-8 rounded-full bg-[#1e293b] text-white flex items-center justify-center active:scale-95 transition-all shadow-sm"
              aria-label="Toggle audio"
              title="Toggle audio"
            >
              <span className="flex gap-1 items-center" aria-hidden="true">
                <span className="w-1 h-2.5 bg-white rounded-xs" />
                <span className="w-1 h-2.5 bg-white rounded-xs" />
              </span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="px-3.5 py-1.5 text-xs font-medium rounded-full bg-white/80 border border-[#0d0d0d]/10 text-[#0d0d0d]"
              aria-label="Open menu"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Paper Overlay with clip-path */}
      <div
        className={`fixed inset-0 z-50 bg-[#f4f2ee] flex flex-col justify-between p-8 md:hidden transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto [clip-path:circle(150%_at_top_right)]'
            : 'opacity-0 pointer-events-none [clip-path:circle(0%_at_top_right)]'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        {/* Top bar inside mobile overlay */}
        <div className="flex items-center justify-between pt-2">
          <div className="font-mono text-xs tracking-wider text-[#77756f] uppercase">
            Menu Navigation
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="w-10 h-10 rounded-full border border-[#0d0d0d]/15 flex items-center justify-center text-[#0d0d0d] text-lg font-light hover:bg-[#0d0d0d] hover:text-[#ffffff] transition-colors"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Links list with big typography and indices */}
        <nav className="flex flex-col gap-5 my-auto">
          {NAV_ITEMS.map((item, idx) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              style={{ transitionDelay: `${idx * 40}ms` }}
              className={`flex items-baseline gap-4 text-3xl font-bold tracking-tight text-[#0d0d0d] hover:translate-x-2 transition-transform duration-200 ${
                activeId === item.id ? 'text-[#0d0d0d]' : 'text-[#77756f]'
              }`}
            >
              <span className="font-mono text-xs font-normal text-[#a9a6a0]">
                {item.index}
              </span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Mobile footer with direct links */}
        <div className="pt-6 border-t border-[#0d0d0d]/10 flex flex-col gap-2 text-xs text-[#77756f]">
          <div className="flex items-center gap-4 font-mono">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0d0d0d] underline underline-offset-4"
            >
              GitHub ↗
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0d0d0d] underline underline-offset-4"
            >
              LinkedIn ↗
            </a>
            <a
              href={PROFILE.resumePdf}
              download="Sappa_Jayaram_Siva_Prasad_Resume.pdf"
              className="hover:text-[#0d0d0d] underline underline-offset-4"
            >
              Resume PDF ↓
            </a>
          </div>
          <div className="text-[11px] text-[#a9a6a0] mt-1">
            {PROFILE.email}
          </div>
        </div>
      </div>
    </>
  );
};
