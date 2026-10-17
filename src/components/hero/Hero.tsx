/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { PROFILE } from '../../lib/data';
import { useScroll } from '../../lib/scroll';
import {
  savePersistentVideo,
  getPersistentVideo,
  clearPersistentVideo,
} from '../../lib/videoStorage';

export const Hero: React.FC = () => {
  const { scrollTo } = useScroll();
  const heroRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [soundEnabled, setSoundEnabled] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(true);
  const [customVideoLoaded, setCustomVideoLoaded] = useState(false);
  const [saveToast, setSaveToast] = useState('');

  // Automatically check and load persisted custom video on mount
  useEffect(() => {
    getPersistentVideo().then((blob) => {
      if (blob && videoRef.current) {
        const url = URL.createObjectURL(blob);
        videoRef.current.src = url;
        videoRef.current.load();
        videoRef.current.play().catch(() => {});
        setCustomVideoLoaded(true);
      }
    });
  }, []);

  // Spoken voiceover fallback with natural male voice for Jayaram's introduction
  const speakIntro = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const text =
      "Hi, I'm Jayaram. I'm a software engineer, AI engineer, and AI-focused full stack developer. I build responsive web applications, interactive websites, and AI powered platforms.";
    const utterance = new SpeechSynthesisUtterance(text);

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
    utterance.pitch = 0.92;
    window.speechSynthesis.speak(utterance);
  };

  // Video autoplay and interaction unlocking
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const playVideo = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setAutoplayBlocked(false);
          })
          .catch(() => {
            setAutoplayBlocked(true);
          });
      }
    };

    playVideo();
    video.addEventListener('loadeddata', playVideo);

    const unlockPlayback = () => {
      video.play().catch(() => {});
      setAutoplayBlocked(false);
      window.removeEventListener('pointerdown', unlockPlayback);
      window.removeEventListener('keydown', unlockPlayback);
      window.removeEventListener('touchstart', unlockPlayback);
      window.removeEventListener('scroll', unlockPlayback);
    };

    window.addEventListener('pointerdown', unlockPlayback, { once: true });
    window.addEventListener('keydown', unlockPlayback, { once: true });
    window.addEventListener('touchstart', unlockPlayback, { once: true });
    window.addEventListener('scroll', unlockPlayback, { once: true });

    return () => {
      video.removeEventListener('loadeddata', playVideo);
      window.removeEventListener('pointerdown', unlockPlayback);
      window.removeEventListener('keydown', unlockPlayback);
      window.removeEventListener('touchstart', unlockPlayback);
      window.removeEventListener('scroll', unlockPlayback);
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
  // Persists permanently in IndexedDB across reloads, tab closes, and site updates
  const handleFileChange = async (file: File) => {
    if (file && (file.type.startsWith('video/') || file.name.match(/\.(mp4|mov|webm)$/i))) {
      const url = URL.createObjectURL(file);
      if (videoRef.current) {
        videoRef.current.src = url;
        videoRef.current.load();
        videoRef.current.play().catch(() => {});
        setCustomVideoLoaded(true);
      }
      try {
        await savePersistentVideo(file);
        setSaveToast('Custom video saved permanently ✓');
        setTimeout(() => setSaveToast(''), 3500);
      } catch (err) {
        console.warn('Could not save to IndexedDB:', err);
      }
    }
  };

  const handleResetToDefault = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await clearPersistentVideo();
    setCustomVideoLoaded(false);
    if (videoRef.current) {
      videoRef.current.src = '/hero/hero.mp4';
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
    setSaveToast('Reset to default video ✓');
    setTimeout(() => setSaveToast(''), 3000);
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[100svh] flex flex-col justify-between pt-20 pb-8 sm:pb-12 overflow-hidden bg-[#f4f2ee]"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) handleFileChange(file);
      }}
    >
      {/* Toast Notification when video is permanently saved */}
      {saveToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-[#0d0d0d] text-white text-xs font-mono shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          {saveToast}
        </div>
      )}

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

      {/* 1. Giant Watermark Name: Fully visible, uncropped J A Y A R A M spanning across center */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="text-[11vw] sm:text-[12.5vw] lg:text-[13.5vw] font-black uppercase tracking-[0.08em] sm:tracking-[0.14em] lg:tracking-[0.18em] text-[#0d0d0d]/[0.07] leading-none whitespace-nowrap pl-[0.1em] select-none text-center transform -translate-y-6 sm:-translate-y-12 transition-all duration-300"
          style={{
            letterSpacing: 'clamp(0.06em, 1.8vw, 0.18em)',
          }}
        >
          J A Y A R A M
        </span>
      </div>

      {/* 2. Standing Silhouette Video (Tall, centered/center-right, exactly matching photo) */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none z-10 pt-16 pb-4">
        <div
          className="relative h-[78svh] sm:h-[88svh] w-auto max-w-full flex items-end justify-center group pointer-events-auto"
          title="Playing 3D character video"
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/hero/hero_poster.webp"
            className="h-full w-auto max-w-full object-contain mix-blend-multiply drop-shadow-sm transition-opacity duration-300"
          >
            <source src="/hero/hero.mp4" type="video/mp4" />
            <source src="/hero/hero.webm" type="video/webm" />
          </video>

          {/* Persistent Video Control Badge */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-auto flex items-center gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-full bg-[#0d0d0d]/85 text-white text-[11px] font-mono backdrop-blur-md hover:bg-[#0d0d0d] transition-colors shadow-sm cursor-pointer"
              title="Upload your video to persist permanently in browser"
            >
              {customVideoLoaded ? 'Custom Video (Saved ✓)' : 'Upload Video File'}
            </button>
            {customVideoLoaded && (
              <button
                onClick={handleResetToDefault}
                className="px-2.5 py-1.5 rounded-full bg-white/90 text-[#0d0d0d] text-[11px] font-mono backdrop-blur-md hover:bg-white border border-[#0d0d0d]/10 transition-colors shadow-sm cursor-pointer"
                title="Reset back to default 3D animation"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Spacer pushing content to bottom */}
      <div className="flex-1" />

      {/* 3. Bottom Layer: Bottom-Left Title & Bottom-Right Buttons */}
      <div className="site-container relative z-20 w-full flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
        
        {/* Bottom-Left: Title, Kicker & Subtitle */}
        <div className="max-w-xl">
          {/* Small tracked kicker with AI Engineer first */}
          <div className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#888888] mb-2 font-medium">
            {PROFILE.shortName.toUpperCase()} · AI ENGINEER
          </div>

          {/* Big Bold Main Headline: AI Engineer. (Replacing Full Stack Developer) */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#0d0d0d] leading-[0.98] mb-3">
            AI <br />
            Engineer<span className="text-[#0d0d0d]">.</span>
          </h1>

          {/* Subtitle highlighting AI Engineering & Full-Stack */}
          <p className="text-xs sm:text-sm text-[#666666] font-normal tracking-wide">
            AI Engineer & Full-Stack Developer · Generative AI, RAG & Modern Web Systems
          </p>

          {/* Small bottom-left mark matching 'N' circle in reference */}
          <div className="mt-4 flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-[#0d0d0d]/10 text-[#0d0d0d] flex items-center justify-center font-mono text-[10px] font-semibold">
              JP
            </div>
            <span className="font-mono text-[10px] text-[#888888]">
              Pragati Engineering College (9.30 CGPA) · ServiceNow Intern
            </span>
          </div>
        </div>

        {/* Bottom-Right: Buttons matching reference (Explore work, Let's talk, Resume) */}
        <div className="flex flex-wrap md:flex-col lg:flex-row items-start md:items-end gap-2.5 sm:gap-3">
          <button
            onClick={() => scrollTo('#work')}
            className="px-6 py-2.5 rounded-full bg-[#0d0d0d] text-white text-xs sm:text-sm font-medium hover:bg-[#222222] active:scale-95 transition-all shadow-sm cursor-pointer"
          >
            Explore work
          </button>

          <button
            onClick={() => scrollTo('#contact')}
            className="px-5 py-2.5 rounded-full bg-white/90 border border-[#0d0d0d]/15 text-[#0d0d0d] text-xs sm:text-sm font-medium hover:bg-white hover:border-[#0d0d0d]/30 active:scale-95 transition-all shadow-xs cursor-pointer"
          >
            Let's talk
          </button>

          <a
            href={PROFILE.resumePdf}
            download="Sappa_Jayaram_Siva_Prasad_Resume.pdf"
            className="px-5 py-2.5 rounded-full bg-white/90 border border-[#0d0d0d]/15 text-[#0d0d0d] text-xs sm:text-sm font-medium hover:bg-white hover:border-[#0d0d0d]/30 active:scale-95 transition-all shadow-xs cursor-pointer inline-flex items-center gap-1.5"
          >
            <span>Resume</span>
            <span className="font-mono text-xs">↓</span>
          </a>
        </div>

      </div>
    </section>
  );
};
