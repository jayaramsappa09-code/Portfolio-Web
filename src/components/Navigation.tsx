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
  const [activeId, setActiveId] = useState('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor scroll for header style transition
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
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
          if (entry.isIntersecting) {
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
      {/* 2px Ink Scroll-Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#0d0d0d] z-50 origin-left transition-transform duration-75"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />

      {/* Main Top Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="site-container flex items-center justify-between">
          {/* Left: Initials mark + Full Name */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d0d0d] rounded-full p-1"
            aria-label="Sappa Jayaram Siva Prasad - Scroll to top"
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-semibold tracking-wider transition-all duration-300 group-hover:rotate-[360deg] ${
                scrolled
                  ? 'bg-[#0d0d0d] text-[#ffffff] border border-[#0d0d0d]'
                  : 'bg-transparent text-[#0d0d0d] border border-[#0d0d0d]/30'
              }`}
            >
              JP
            </div>
            <span
              className={`font-semibold tracking-tight text-sm text-[#0d0d0d] whitespace-nowrap transition-opacity duration-300 hidden sm:inline-block ${
                scrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            >
              {PROFILE.name}
            </span>
          </a>

          {/* Desktop Center/Right Nav Pill */}
          <nav
            aria-label="Primary navigation"
            className={`hidden md:flex items-center gap-1 p-1.5 rounded-full transition-all duration-300 relative ${
              scrolled
                ? 'bg-[#ffffff]/85 backdrop-blur-[12px] border border-[#0d0d0d]/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]'
                : 'bg-transparent'
            }`}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative z-10 px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d0d0d] ${
                    isActive ? 'text-[#ffffff]' : 'text-[#77756f] hover:text-[#0d0d0d]'
                  }`}
                >
                  {/* Sliding solid ink active indicator pill */}
                  {isActive && (
                    <span
                      className="absolute inset-0 bg-[#0d0d0d] rounded-full -z-10 transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)] shadow-sm"
                      layout-id="activePill"
                    />
                  )}
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full bg-[#ffffff]/90 border border-[#0d0d0d]/10 text-[#0d0d0d] shadow-sm backdrop-blur-md active:scale-95"
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
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
