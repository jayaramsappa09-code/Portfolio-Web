/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface TechLogoProps {
  name: string;
  className?: string;
  size?: number;
}

export function isBrand(name: string): boolean {
  const brandNames = [
    'Python', 'C++', 'JavaScript', 'TypeScript', 'Java', 'C', 'SQL',
    'React', 'HTML5', 'CSS3', 'Tailwind CSS', 'Vite',
    'Node.js', 'Express.js', 'Supabase', 'SQLite',
    'Google GenAI API', 'Git', 'GitHub', 'VS Code', 'ServiceNow',
    'LeetCode', 'IBM', 'HackerRank', 'GeeksforGeeks'
  ];
  return brandNames.some(b => b.toLowerCase() === name.toLowerCase());
}

export const TechLogo: React.FC<TechLogoProps> = ({ name, className = '', size = 24 }) => {
  const norm = name.toLowerCase().trim();

  // Python
  if (norm === 'python' || norm === 'py') {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className} fill="none">
        <path d="M63.7 2C32.7 2 34.6 15.4 34.6 15.4l.04 13.9h29.6v4.2H23.5S2 31.1 2 62.4c0 31.4 18.7 30.2 18.7 30.2h11.2V76.8s-.6-18.7 18.4-18.7h29.2s17.7.3 17.7-17.1V19.2S98.9 2 63.7 2zm-16 9.4c3.4 0 6.2 2.8 6.2 6.2s-2.8 6.2-6.2 6.2-6.2-2.8-6.2-6.2 2.8-6.2 6.2-6.2z" fill="#3776AB"/>
        <path d="M64.3 126c31 0 29.1-13.4 29.1-13.4l-.04-13.9H63.8v-4.2h40.7s21.5 2.4 21.5-28.9c0-31.4-18.7-30.2-18.7-30.2H116v15.8s.6 18.7-18.4 18.7H68.4s-17.7-.3-17.7 17.1v21.8s-1.7 17.2 33.6 17.2zm16-9.4c-3.4 0-6.2-2.8-6.2-6.2s2.8-6.2 6.2-6.2 6.2 2.8 6.2 6.2-2.8 6.2-6.2 6.2z" fill="#FFD43B"/>
      </svg>
    );
  }

  // TypeScript
  if (norm === 'typescript' || norm === 'ts') {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
        <rect width="128" height="128" rx="16" fill="#3178C6" />
        <text x="64" y="86" fontSize="62" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fill="#FFFFFF" textAnchor="middle">
          TS
        </text>
      </svg>
    );
  }

  // JavaScript
  if (norm === 'javascript' || norm === 'js') {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
        <rect width="128" height="128" rx="16" fill="#F7DF1E" />
        <text x="64" y="86" fontSize="62" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fill="#000000" textAnchor="middle">
          JS
        </text>
      </svg>
    );
  }

  // React
  if (norm === 'react' || norm === 're') {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
        <ellipse cx="64" cy="64" rx="14" ry="14" fill="#61DAFB"/>
        <g stroke="#61DAFB" strokeWidth="6" fill="none">
          <ellipse cx="64" cy="64" rx="54" ry="20"/>
          <ellipse cx="64" cy="64" rx="54" ry="20" transform="rotate(60 64 64)"/>
          <ellipse cx="64" cy="64" rx="54" ry="20" transform="rotate(120 64 64)"/>
        </g>
      </svg>
    );
  }

  // C++
  if (norm === 'c++' || norm === 'cp') {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
        <path d="M64 4L12 34v60l52 30 52-30V34L64 4z" fill="#00599C"/>
        <path d="M64 15.5L22 39.8v48.4L64 112.5l42-24.3V39.8L64 15.5z" fill="#004482"/>
        <path d="M68 46.5c-11 0-19.8 8.8-19.8 19.8s8.8 19.8 19.8 19.8c6.4 0 12.1-3 15.8-7.7l-7.7-4.8c-2.1 2.8-5 4.5-8.1 4.5-6.6 0-11.8-5.3-11.8-11.8s5.3-11.8 11.8-11.8c3.1 0 6 1.7 8.1 4.5l7.7-4.8c-3.7-4.7-9.4-7.7-15.8-7.7zm28 13.5v7h-7v4h7v7h4v-7h7v-4h-7v-7h-4zm18 0v7h-7v4h7v7h4v-7h7v-4h-7v-7h-4z" fill="#FFFFFF"/>
      </svg>
    );
  }

  // Node.js
  if (norm.includes('node')) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
        <path d="M64 8l54 31.2v62.4L64 122.8 10 99.6V39.2L64 8z" fill="#339933"/>
        <path d="M64 36c-15.5 0-28 8.5-28 21 0 9.8 7.6 17.5 19 20l7.5 1.6c7.5 1.6 11.5 4.4 11.5 8.4 0 5-5.5 8.5-13 8.5-8.5 0-14-3.5-16.5-9.5l-8.5 5c4 8.5 13 14 25 14 17.5 0 29.5-9 29.5-22 0-10.5-8-18-20-20.5l-7.5-1.5c-7-1.5-10.5-4-10.5-7.5 0-4.5 5-7.5 12-7.5 7.5 0 12.5 3 15 7.5l8.5-5C85 41 76.5 36 64 36z" fill="#FFFFFF"/>
      </svg>
    );
  }

  // Express.js
  if (norm.includes('express')) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
        <rect width="128" height="128" rx="16" fill="#000000" />
        <text x="64" y="76" fontSize="36" fontFamily="sans-serif" fontWeight="900" fill="#FFFFFF" textAnchor="middle">
          ex
        </text>
      </svg>
    );
  }

  // Supabase
  if (norm.includes('supabase')) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
        <path d="M72.2 124.6c-3.1 3.8-9.4 1.7-9.5-3.3L61.6 74H109c6.6 0 10.3 7.7 6.2 12.9L72.2 124.6z" fill="#3ECF8E"/>
        <path d="M55.8 3.4c3.1-3.8 9.4-1.7 9.5 3.3L66.4 54H19c-6.6 0-10.3-7.7-6.2-12.9L55.8 3.4z" fill="#249361"/>
      </svg>
    );
  }

  // Tailwind CSS
  if (norm.includes('tailwind')) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
        <path d="M64 36c-18 0-27 9-27 27 0 13.5 9 20.2 27 20.2 18 0 27-6.7 27-20.2 0-18-9-27-27-27zm38 27c-18 0-27 9-27 27 0 13.5 9 20.2 27 20.2 18 0 27-6.7 27-20.2 0-18-9-27-27-27z" fill="#06B6D4"/>
      </svg>
    );
  }

  // Vite
  if (norm.includes('vite')) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
        <path d="M120.4 17.5L67.1 118.8c-1.2 2.3-4.5 2.3-5.7 0L8.2 18.5c-1.4-2.6.7-5.7 3.6-5.4l52.5 5.5 52.4-5.5c2.9-.3 5.1 2.7 3.7 4.4z" fill="#BD34FE"/>
        <path d="M83.6 13.4L64.1 50.7l13.5 1.5-22.3 46.2 3.8-31.5-12.4-1.4 36.9-52.1z" fill="#FFD427"/>
      </svg>
    );
  }

  // Google GenAI / Gemini
  if (norm.includes('genai') || norm.includes('gemini') || norm.includes('google')) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
        <defs>
          <linearGradient id="g-gemini" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1A73E8"/>
            <stop offset="50%" stopColor="#8AB4F8"/>
            <stop offset="100%" stopColor="#EA4335"/>
          </linearGradient>
        </defs>
        <path d="M64 4C64 37.1 37.1 64 4 64c33.1 0 60 26.9 60 60 0-33.1 26.9-60 60-60-33.1 0-60-26.9-60-60z" fill="url(#g-gemini)"/>
      </svg>
    );
  }

  // ServiceNow
  if (norm.includes('servicenow')) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
        <circle cx="64" cy="64" r="56" fill="#81B5A1" />
        <circle cx="64" cy="64" r="34" fill="#032D42" />
        <circle cx="64" cy="64" r="14" fill="#81B5A1" />
      </svg>
    );
  }

  // LeetCode
  if (norm.includes('leetcode')) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
        <path d="M78 30l-30 30 30 30" stroke="#FFA116" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M52 64h48" stroke="#B3B3B3" strokeWidth="12" strokeLinecap="round" fill="none"/>
      </svg>
    );
  }

  // HackerRank
  if (norm.includes('hackerrank')) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
        <rect width="128" height="128" rx="16" fill="#00EA64" />
        <path d="M42 34v60h14V68h16v26h14V34H72v22H56V34H42z" fill="#000000"/>
      </svg>
    );
  }

  // IBM
  if (norm.includes('ibm')) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
        <rect width="128" height="128" rx="16" fill="#0530AD" />
        <path d="M30 40h68v6H30zm0 12h68v6H30zm0 12h68v6H30zm0 12h68v6H30zm0 12h68v6H30z" fill="#FFFFFF"/>
      </svg>
    );
  }

  // SQLite
  if (norm.includes('sqlite')) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
        <rect width="128" height="128" rx="16" fill="#003B57" />
        <text x="64" y="78" fontSize="32" fontFamily="sans-serif" fontWeight="bold" fill="#00ADEF" textAnchor="middle">
          SQL
        </text>
      </svg>
    );
  }

  // Git / GitHub
  if (norm.includes('github')) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className} fill="#0d0d0d">
        <path fillRule="evenodd" clipRule="evenodd" d="M64 5.3C29.7 5.3 2 33 2 67.2c0 27.4 17.8 50.6 42.4 58.8 3.1.6 4.2-1.3 4.2-3 0-1.5-.1-6.5-.1-11.7-17.2 3.7-20.9-7.3-20.9-7.3-2.8-7.2-6.9-9.1-6.9-9.1-5.6-3.8.4-3.8.4-3.8 6.2.4 9.5 6.4 9.5 6.4 5.5 9.5 14.5 6.7 18 5.2.6-4 2.2-6.7 4-8.3-13.8-1.6-28.2-6.9-28.2-30.7 0-6.8 2.4-12.3 6.4-16.7-.6-1.6-2.8-7.9.6-16.5 0 0 5.2-1.7 17.1 6.4 5-1.4 10.3-2.1 15.6-2.1 5.3 0 10.6.7 15.6 2.1 11.9-8.1 17.1-6.4 17.1-6.4 3.4 8.6 1.3 14.9.6 16.5 4 4.4 6.4 9.9 6.4 16.7 0 23.9-14.5 29.1-28.3 30.6 2.2 1.9 4.3 5.8 4.3 11.7 0 8.5-.1 15.3-.1 17.4 0 1.7 1.1 3.7 4.3 3 24.6-8.2 42.4-31.4 42.4-58.8 0-34.2-27.7-61.9-62-61.9z" />
      </svg>
    );
  }

  if (norm.includes('git')) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
        <path d="M123.6 57.6L70.4 4.4c-3.2-3.2-8.4-3.2-11.6 0L46.2 17l16.1 16.1c3.5-1.2 7.6-.4 10.3 2.3 2.7 2.7 3.5 6.8 2.3 10.3l15.5 15.5c3.5-1.2 7.6-.4 10.3 2.3 3.9 3.9 3.9 10.1 0 14-3.9 3.9-10.1 3.9-14 0-2.8-2.8-3.5-7-2.2-10.5L63.5 52v33.4c1 .6 2 1.4 2.7 2.2 3.9 3.9 3.9 10.1 0 14-3.9 3.9-10.1 3.9-14 0-3.9-3.9-3.9-10.1 0-14 .9-.9 2-1.7 3.2-2.3V50.6c-1.2-.6-2.3-1.4-3.2-2.3-2.8-2.8-3.5-7-2.2-10.5L34.1 22.1 4.4 51.8c-3.2 3.2-3.2 8.4 0 11.6l53.2 53.2c3.2 3.2 8.4 3.2 11.6 0l54.4-54.4c3.2-3.2 3.2-8.4 0-11.6z" fill="#F05032"/>
      </svg>
    );
  }

  // VS Code
  if (norm.includes('code') || norm.includes('vs')) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
        <path d="M94.6 123.6c3.2 1.6 7.1.6 9.1-2.4l20.8-23.7c2.4-2.7 3.5-6.3 3.1-9.9V40.4c.4-3.6-.7-7.2-3.1-9.9L103.7 6.8c-2-3-5.9-4-9.1-2.4-1.6.8-2.9 2-3.8 3.5L47.2 46.2 24.3 28.7c-2.4-1.8-5.8-1.6-8 .5L2.8 41.7c-2.4 2.3-2.4 6.2 0 8.5l20.4 19-20.4 19c-2.4 2.3-2.4 6.2 0 8.5l13.5 12.5c2.2 2.1 5.6 2.3 8 .5l22.9-17.5 43.6 38.3c1 .9 2.2 1.8 3.8 2.6z" fill="#007ACC"/>
      </svg>
    );
  }

  // HTML5
  if (norm.includes('html')) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
        <path d="M19 114L8 0h112l-11 114-45 14-45-14z" fill="#E44D26"/>
        <path d="M64 117l36-11 9-94H64v105z" fill="#F16529"/>
        <path d="M64 48H44l-2-21h44l2-21H20l6 63h38V48zm0 46l-20-6-1-14H22l3 34 39 12V94z" fill="#EBEBEB"/>
        <path d="M64 48v21h19l-2 21-17 4v22l36-10 4-48H64z" fill="#FFFFFF"/>
      </svg>
    );
  }

  // CSS3
  if (norm.includes('css')) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
        <path d="M19 114L8 0h112l-11 114-45 14-45-14z" fill="#1572B6"/>
        <path d="M64 117l36-11 9-94H64v105z" fill="#33A9DC"/>
        <path d="M64 48H44l-2-21h44l2-21H20l6 63h38V48zm0 46l-20-6-1-14H22l3 34 39 12V94z" fill="#EBEBEB"/>
        <path d="M64 48v21h19l-2 21-17 4v22l36-10 4-48H64z" fill="#FFFFFF"/>
      </svg>
    );
  }

  // Java
  if (norm === 'java' || norm === 'jv') {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
        <path d="M48 98c15 3 32-2 42-6s-18-5-28-5c-15 0-25 7-14 11zm-5-18c22 4 45-2 58-8s-25-6-39-6c-20 0-33 9-19 14zm35-42c6 7 1 14-3 20-5 6-7 12-4 17 3 5 10 7 14 3-5 5-13 6-18 1-6-5-7-14-3-20 5-6 6-12 3-17-3-4-7-5-9-4z" fill="#E76F00"/>
        <path d="M52 24c4 5 1 11-2 15-4 5-5 9-3 13 2 4 7 5 11 3-4 4-10 5-14 1-5-4-5-11-2-15 4-5 5-9 2-13-2-3-5-4-7-3z" fill="#5382A1"/>
      </svg>
    );
  }

  // Concept / Architectural Line Icons (Clean, quiet, hairline)
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {norm.includes('dsa') || norm.includes('data structures') ? (
        <>
          <circle cx="12" cy="5" r="3" />
          <circle cx="5" cy="19" r="3" />
          <circle cx="19" cy="19" r="3" />
          <path d="M12 8v4M7 17l3.5-3.5M17 17l-3.5-3.5" />
        </>
      ) : norm.includes('oop') ? (
        <>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="8.5" y="14" width="7" height="7" rx="1.5" />
          <path d="M6.5 10v2a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2" />
        </>
      ) : norm.includes('rag') || norm.includes('retrieval') ? (
        <>
          <path d="M4 6h16M4 12h10M4 18h16" />
          <circle cx="18" cy="12" r="3" />
          <path d="M20 14l2 2" />
        </>
      ) : norm.includes('agent') ? (
        <>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v4l3 3" />
          <circle cx="12" cy="4" r="1.5" />
          <circle cx="20" cy="12" r="1.5" />
          <circle cx="4" cy="12" r="1.5" />
        </>
      ) : norm.includes('embedding') ? (
        <>
          <circle cx="6" cy="6" r="2" />
          <circle cx="18" cy="8" r="2" />
          <circle cx="14" cy="18" r="2" />
          <circle cx="8" cy="16" r="2" />
          <path d="M8 7l8 1M7 8l1 7M16 10l-2 6" strokeDasharray="2 2" />
        </>
      ) : norm.includes('auth') ? (
        <>
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          <circle cx="12" cy="16" r="1" />
        </>
      ) : norm.includes('document') ? (
        <>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </>
      ) : norm.includes('rest') || norm.includes('api') ? (
        <>
          <rect x="2" y="6" width="20" height="12" rx="3" />
          <path d="M6 12h2M11 12h2M16 12h2" />
        </>
      ) : (
        <>
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </>
      )}
    </svg>
  );
};
