/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, RefObject } from 'react';

export interface ReadingTimeResult {
  minutes: number;
  wordCount: number;
  displayText: string;
}

/**
 * Standard adult reading speed: ~200-220 words per minute.
 */
export function calculateReadingTime(text: string, wpm: number = 200): ReadingTimeResult {
  if (!text || typeof text !== 'string') {
    return { minutes: 1, wordCount: 0, displayText: '1 min read' };
  }

  const words = text
    .trim()
    .replace(/[^\w\s-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 0);

  const wordCount = words.length;
  const minutes = Math.max(1, Math.ceil(wordCount / wpm));
  const displayText = `${minutes} min read`;

  return { minutes, wordCount, displayText };
}

/**
 * Hook to dynamically calculate reading time from a DOM element ref
 * with optional static fallback.
 */
export function useSectionReadingTime(
  elementRef: RefObject<HTMLElement | null>,
  fallbackText: string = ''
): ReadingTimeResult {
  const [result, setResult] = useState<ReadingTimeResult>(() =>
    calculateReadingTime(fallbackText)
  );

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Read rendered innerText
    const text = el.innerText || fallbackText;
    const computed = calculateReadingTime(text);
    setResult(computed);
  }, [elementRef, fallbackText]);

  return result;
}
