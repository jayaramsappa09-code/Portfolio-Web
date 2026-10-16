/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';

/**
 * Global RevealObserver:
 * Attaches an IntersectionObserver to all .rv and .rv-mask elements across the page.
 * Adds .is-in once an element scrolls into view (with stagger via --i).
 * Unobserves each element after reveal (animates once only).
 * Respects prefers-reduced-motion by immediately revealing all elements.
 */
export const RevealObserver: React.FC = () => {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elements = document.querySelectorAll('.rv, .rv-mask');

    if (prefersReduced) {
      elements.forEach((el) => el.classList.add('is-in'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.12,
      }
    );

    elements.forEach((el) => observer.observe(el));

    // Also handle dynamically added elements or tab changes
    const mutationObserver = new MutationObserver(() => {
      const currentElements = document.querySelectorAll('.rv:not(.is-in), .rv-mask:not(.is-in)');
      currentElements.forEach((el) => observer.observe(el));
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
};
