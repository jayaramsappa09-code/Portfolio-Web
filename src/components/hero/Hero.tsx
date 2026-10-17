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

    video.muted = true;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        setAutoplayBlocked(true);
      });
    }

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

  // Listen for global sound toggle from Navigation header
  useEffect(() => {
    const handleGlobalToggle = () => {
      toggleSound();
    };
    window.addEventListener('toggle-sound-event', handleGlobalToggle);
    return () => window.removeEventListener('toggle-sound-event', handleGlobalToggle);
  }, [soundEnabled]);

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
      video.volume = 1.0;
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setSoundEnabled(true);
            setAutoplayBlocked(false);
          })
          .catch(() => {
            setSoundEnabled(true);
            setAutoplayBlocked(false);
            speakIntro();
          });
      } else {
        setSoundEnabled(true);
        setAutoplayBlocked(false);
      }
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

      {/* Giant watermark name spanning horizontally across the canvas behind avatar */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="text-[14vw] lg:text-[16vw] font-black uppercase tracking-[0.22em] sm:tracking-[0.3em] text-[#0d0d0d]/[0.045] leading-none whitespace-nowrap pl-[0.25em]"
        >
          J A Y A R A M
        </span>
      </div>

      {/* Main Hero Viewport Composition: Left Copy + Center-Right 3D Character */}
      <div className="site-container relative z-10 my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[calc(100svh-8rem)]">
        
        {/* Left Side: Editorial Typography & Actions */}
        <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1 pt-4 lg:pt-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffffff] border border-[#0d0d0d]/10 w-fit mb-5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-wider font-semibold text-[#0d0d0d]">
              HEY, I AM JAYARAM
            </span>
          </div>

          <h1 className="heading-display text-4xl sm:text-5xl lg:text-6xl text-[#0d0d0d] mb-4 text-balance">
            AI Engineer & <br className="hidden sm:inline" />
            <span className="font-serif-italic text-[#77756f]">Full-Stack</span> Software Developer.
          </h1>

          {/* Core Credentials & Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-[#0d0d0d] text-white font-medium shadow-xs">
              AI Engineer
            </span>
            <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-[#ffffff] border border-[#0d0d0d]/10 text-[#222222] font-medium shadow-xs">
              Pragati Engg College · 9.30 CGPA
            </span>
            <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-[#ffffff] border border-[#0d0d0d]/10 text-[#222222] font-medium shadow-xs">
              ServiceNow Intern
            </span>
            <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-[#ffffff] border border-[#0d0d0d]/10 text-[#222222] font-medium shadow-xs">
              150+ LeetCode Solved
            </span>
          </div>

          <p className="text-[#3a3a3a] text-sm sm:text-base leading-relaxed mb-7 max-w-xl">
            {PROFILE.resumeSummary}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => scrollTo('#work')}
              className="btn-primary cursor-pointer"
            >
              Explore work
            </button>

            <a
              href={PROFILE.resumePdf}
              download="Sappa_Jayaram_Siva_Prasad_Resume.pdf"
              className="btn-secondary group cursor-pointer inline-flex items-center gap-2"
            >
              <span>Download Résumé</span>
              <span className="font-mono group-hover:translate-y-0.5 transition-transform">↓</span>
            </a>

            <button
              onClick={() => scrollTo('#contact')}
              className="btn-secondary cursor-pointer"
            >
              Let's talk
            </button>

            {/* In-Hero Sound Toggle matching reference */}
            <button
              onClick={toggleSound}
              className="w-10 h-10 rounded-full bg-[#0d0d0d] text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-sm cursor-pointer ml-auto sm:ml-0"
              aria-label={soundEnabled ? 'Mute audio' : 'Unmute male dialogue introduction'}
              title={soundEnabled ? 'Mute voice' : 'Play male voice introduction'}
            >
              {soundEnabled ? (
                <span className="flex gap-1 items-center" aria-hidden="true">
                  <span className="w-1 h-3.5 bg-white rounded-xs" />
                  <span className="w-1 h-3.5 bg-white rounded-xs" />
                </span>
              ) : (
                <span
                  className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-white ml-0.5"
                  aria-hidden="true"
                />
              )}
            </button>
          </div>
        </div>

        {/* Right Side / Center: Grounded 3D Avatar Video */}
        <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2 relative">
          <div
            className="relative w-full max-w-[420px] sm:max-w-[480px] lg:max-w-[520px] aspect-[768/960] flex items-center justify-center group"
            title="Untouched original video frames"
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

            {/* Quick upload badge to load exact original video file if needed */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-2.5 py-1 rounded-full bg-[#0d0d0d]/80 text-white text-[10px] font-mono backdrop-blur-md hover:bg-[#0d0d0d] transition-colors shadow-sm cursor-pointer"
                title="Select local intro video file"
              >
                {customVideoLoaded ? 'Original Loaded ✓' : 'File Input'}
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
