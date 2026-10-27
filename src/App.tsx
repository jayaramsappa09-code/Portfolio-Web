/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ScrollProvider } from './lib/scroll';
import { RevealObserver } from './lib/RevealObserver';
import { ReadingProgressBar } from './components/ui/ReadingProgressBar';
import { CommandPalette } from './components/ui/CommandPalette';
import { Navigation } from './components/Navigation';
import { Hero } from './components/hero/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Work } from './components/sections/Work';
import { Certifications } from './components/sections/Certifications';
import { Experience } from './components/sections/Experience';
import { Achievements } from './components/sections/Achievements';
import { FAQ } from './components/sections/FAQ';
import { Contact } from './components/sections/Contact';

export default function App() {
  return (
    <ScrollProvider>
      <RevealObserver />
      <div className="relative min-h-screen bg-[#f4f2ee] text-[#0d0d0d] font-sans selection:bg-[#0d0d0d] selection:text-[#f4f2ee]">
        {/* Thin, Fixed Reading Progress Bar at the top of the viewport */}
        <ReadingProgressBar />

        {/* Global Command Palette (Ctrl+K / Cmd+K) */}
        <CommandPalette />

        {/* Persistent Navigation */}
        <Navigation />

        {/* Continuous Page Sections in Strict Ordered Sequence */}
        <main>
          <Hero />
          <About />
          <Skills />
          <Work />
          <Certifications />
          <Experience />
          <Achievements />
          <FAQ />
          <Contact />
        </main>
      </div>
    </ScrollProvider>
  );
}
