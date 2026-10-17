/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { PROFILE } from '../../lib/data';
import { useScroll } from '../../lib/scroll';

export const Hero: React.FC = () => {
  const { scrollTo } = useScroll();
  const heroRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [soundEnabled, setSoundEnabled] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(true);
  const [customVideoLoaded, setCustomVideoLoaded] = useState(false);

  // Spoken voiceover function with natural male voice for Jayaram's introduction
  const speakIntro = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const text =
      "Hi, I'm Jayaram. I'm a software engineer, AI engineer, and AI-focused full stack developer. I build responsive web applications, interactive websites, and AI powered platforms.";
    const utterance = new SpeechSynthesisUtterance(text);

    // Prioritize natural male voice in English
    const voices = window.speechSynthesis.getVoices();
    const maleVoice =
      voices.find(
        (v) =>
          v.lang.startsWith('en') &&
          (v.name.toLowerCase().includes('male') ||
            v.name.toLowerCase().includes('david') ||
            v.name.toLowerCase().includes('guy') ||
            v.name.toLowerCase().includes('george') ||
            v.name.toLowerCase().includes('rishi') ||
            v.name.toLowerCase().includes('daniel') ||
            v.name.toLowerCase().includes('alex') ||
            v.name.toLowerCase().includes('natural'))
      ) || voices.find((v) => v.lang.startsWith('en'));

    if (maleVoice) {
      utterance.voice = maleVoice;
    }
    utterance.rate = 1.0;
    utterance.pitch = 0.92; // Warm natural male pitch
    window.speechSynthesis.speak(utterance);
  };

  // Video autoplay and interaction unlocking
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Try playing with sound initially
    video.muted = true;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Play successful muted
        })
        .catch(() => {
          setAutoplayBlocked(true);
        });
    }

    // Unlock sound on first user gesture
    const unlockSound = () => {
      setAutoplayBlocked(false);
      window.removeEventListener('pointerdown', unlockSound);
      window.removeEventListener('keydown', unlockSound);
      window.removeEventListener('touchend', unlockSound);
    };

    window.addEventListener('pointerdown', unlockSound, { once: true });
    window.addEventListener('keydown', unlockSound, { once: true });
    window.addEventListener('touchend', unlockSound, { once: true });

    return () => {
      window.removeEventListener('pointerdown', unlockSound);
      window.removeEventListener('keydown', unlockSound);
      window.removeEventListener('touchend', unlockSound);
    };
  }, []);

  // IntersectionObserver: Pause video & voice when less than 35% visible
  useEffect(() => {
    const heroEl = heroRef.current;
    const video = videoRef.current;
    if (!heroEl || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio < 0.35) {
          video.pause();
          if ('speechSynthesis' in window) {
            window.speechSynthesis.pause();
          }
        } else {
          video.play().catch(() => {});
          if (soundEnabled && 'speechSynthesis' in window) {
            window.speechSynthesis.resume();
          }
        }
      },
      { threshold: [0, 0.35, 0.7, 1.0] }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, [soundEnabled]);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!soundEnabled) {
      video.muted = false;
      setSoundEnabled(true);
      setAutoplayBlocked(false);
      speakIntro();
    } else {
      video.muted = true;
      setSoundEnabled(false);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  };

  // Direct 1:1 original video attachment via drag-and-drop or file selection
  // Preserves 100% of every original video frame untouched with zero re-encoding
  const handleFileChange = (file: File) => {
    if (file && (file.type.startsWith('video/') || file.name.match(/\.(mp4|mov|webm)$/i))) {
      const url = URL.createObjectURL(file);
      if (videoRef.current) {
        videoRef.current.src = url;
        videoRef.current.load();
        videoRef.current.play().catch(() => {});
        setCustomVideoLoaded(true);
      }
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[100svh] flex flex-col justify-between pt-24 pb-12 overflow-hidden bg-[#f4f2ee]"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) handleFileChange(file);
      }}
    >
      {/* Hidden file input for uploading exact original video */}
      <input
        ref={fileInputRef}
        type="file"
        accept="video/mp4,video/quicktime,video/webm"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileChange(file);
        }}
      />

      {/* Giant outlined ghost word behind the person */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="text-[20vw] font-black uppercase tracking-tighter text-transparent leading-none"
          style={{
            WebkitTextStroke: '1.5px rgba(13, 13, 13, 0.08)',
          }}
        >
          {PROFILE.shortName.toUpperCase()}
        </span>
      </div>

      {/* Center Video Container */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div
          className="relative w-full max-w-[768px] aspect-[768/960] h-[62svh] md:h-[min(96svh,1040px)] flex items-center justify-center group pointer-events-auto"
          title="Drag and drop your original intro.mp4 here or click upload to load directly"
        >
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="auto"
            poster="/portrait-bust.webp"
            className="w-full h-full object-contain mix-blend-multiply transition-opacity duration-300"
          >
            <source src="/hero/hero.webm" type="video/webm" />
            <source src="/hero/hero.mp4" type="video/mp4" />
          </video>

          {/* Quick upload badge to load exact original video file */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-full bg-[#0d0d0d]/80 text-white text-[11px] font-mono backdrop-blur-md hover:bg-[#0d0d0d] transition-colors shadow-sm"
              title="Select local intro.mp4 to play 100% untouched original video frames"
            >
              {customVideoLoaded ? 'Original Video Loaded ✓' : 'Load Original Video File'}
            </button>
          </div>
        </div>
      </div>

      {/* Floating Sound Control: 46px solid ink round button */}
      <div className="site-container relative z-20 flex justify-end">
        <div className="relative">
          {autoplayBlocked && (
            <span
              className="absolute -inset-1 rounded-full bg-[#0d0d0d]/15 animate-ping pointer-events-none"
              aria-hidden="true"
            />
          )}
          <button
            onClick={toggleSound}
            className="relative w-[46px] h-[46px] rounded-full bg-[#0d0d0d] text-[#ffffff] flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d0d0d] focus-visible:ring-offset-2 cursor-pointer"
            aria-label={soundEnabled ? 'Mute audio' : 'Unmute audio (male voice dialogue)'}
          >
            {soundEnabled ? (
              // ❚❚ (two pause bars indicating sound is active)
              <span className="flex gap-1 items-center" aria-hidden="true">
                <span className="w-1.5 h-4 bg-white rounded-xs" />
                <span className="w-1.5 h-4 bg-white rounded-xs" />
              </span>
            ) : (
              // ▶ (triangle play symbol)
              <span
                className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-white ml-0.5"
                aria-hidden="true"
              />
            )}
          </button>
        </div>
      </div>

      {/* Hero Bottom Content Overlay: Role heading + CTAs */}
      <div className="site-container relative z-20 mt-auto">
        <div className="max-w-2xl bg-[#f4f2ee]/85 backdrop-blur-[6px] p-6 sm:p-8 rounded-[28px] border border-[#0d0d0d]/5 shadow-[0_12px_40px_rgba(0,0,0,0.03)] rv is-in">
          <div className="font-mono-tag mb-3 flex items-center gap-2">
            <span>00</span>
            <span>—</span>
            <span>AI Engineer & Software Developer · Andhra Pradesh, India</span>
          </div>

          <h1 className="heading-display text-4xl sm:text-5xl md:text-6xl mb-3 text-balance">
            AI Engineer & <br className="hidden sm:inline" />
            <span className="font-serif-italic text-[#77756f]">Full-Stack</span> Software Developer.
          </h1>

          {/* AI Specialization Chips */}
          <div className="flex flex-wrap items-center gap-1.5 mb-4">
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-[#0d0d0d] text-white font-medium">
              AI Engineer
            </span>
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white border border-[#0d0d0d]/10 text-[#3a3a3a]">
              Google GenAI (Gemini)
            </span>
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white border border-[#0d0d0d]/10 text-[#3a3a3a]">
              RAG & Embeddings
            </span>
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white border border-[#0d0d0d]/10 text-[#3a3a3a]">
              Agentic AI
            </span>
          </div>

          <p className="text-[#3a3a3a] text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
            {PROFILE.resumeSummary}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => scrollTo('#work')}
              className="btn-primary"
            >
              Explore work
            </button>

            <button
              onClick={() => scrollTo('#contact')}
              className="btn-secondary"
            >
              Let's talk
            </button>

            <a
              href={PROFILE.resumePdf}
              download="Sappa_Jayaram_Siva_Prasad_Resume.pdf"
              className="btn-secondary group"
            >
              <span>Résumé</span>
              <span className="font-mono group-hover:translate-y-0.5 transition-transform">↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
