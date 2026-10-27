/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FAQS, FAQItem } from '../../lib/data';
import { useScroll } from '../../lib/scroll';
import { useInView } from '../../lib/hooks';

const FAQ_CATEGORIES = [
  'All',
  'Services & Scope',
  'AI & Architecture',
  'Collaboration',
  'Delivery',
] as const;

export const FAQ: React.FC = () => {
  const [sectionRef, inView] = useInView({ threshold: 0.1 });
  const { scrollTo } = useScroll();

  // Active category filter
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Track expanded item IDs (allow multiple or single toggle)
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    services: true, // First item open by default for immediate engagement
  });

  const toggleItem = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleExpandAll = () => {
    const allExpanded = filteredFaqs.every((item) => expandedIds[item.id]);
    if (allExpanded) {
      setExpandedIds({});
    } else {
      const next: Record<string, boolean> = {};
      filteredFaqs.forEach((item) => {
        next[item.id] = true;
      });
      setExpandedIds(next);
    }
  };

  const filteredFaqs = FAQS.filter(
    (faq) => activeCategory === 'All' || faq.category === activeCategory
  );

  const areAllExpanded =
    filteredFaqs.length > 0 && filteredFaqs.every((item) => expandedIds[item.id]);

  return (
    <section id="faq" ref={sectionRef} className="site-section bg-[#f4f2ee] relative">
      <div className="site-container">
        
        {/* Section Header */}
        <div className={`mb-12 rv ${inView ? 'is-in' : ''}`}>
          <div className="font-mono-tag mb-3 flex items-center justify-between">
            <span>07 — Frequently Asked Questions</span>
            <span className="hidden sm:inline">Client & Project Clarity</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="heading-display text-4xl sm:text-5xl md:text-6xl text-balance">
                Clarity before <span className="font-serif-italic">collaboration.</span>
              </h2>
              <p className="text-sm text-[#77756f] mt-3 max-w-xl">
                Common questions regarding project scoping, generative AI integration, agile delivery schedules, and client handoffs.
              </p>
            </div>

            {/* Expand / Collapse All Button */}
            <button
              onClick={handleExpandAll}
              className="px-4 py-2 text-xs font-mono rounded-full bg-white border border-[#0d0d0d]/10 text-[#0d0d0d] hover:border-[#0d0d0d]/30 transition-all shadow-xs cursor-pointer self-start md:self-end"
            >
              {areAllExpanded ? 'Collapse All −' : 'Expand All +'}
            </button>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 mb-10" role="tablist" aria-label="FAQ categories">
          {FAQ_CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            const count =
              category === 'All'
                ? FAQS.length
                : FAQS.filter((f) => f.category === category).length;

            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-1.5 text-xs font-mono rounded-full transition-all duration-200 border cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#0d0d0d] text-white border-[#0d0d0d] shadow-sm'
                    : 'bg-white text-[#77756f] border-[#0d0d0d]/10 hover:border-[#0d0d0d]/30 hover:text-[#0d0d0d]'
                }`}
                role="tab"
                aria-selected={isActive}
              >
                <span>{category}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#f4f2ee] text-[#77756f]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Collapsible Accordion List */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {filteredFaqs.map((faq, idx) => {
            const isExpanded = !!expandedIds[faq.id];

            return (
              <div
                key={faq.id}
                className={`card-premium transition-all duration-300 overflow-hidden bg-white ${
                  isExpanded
                    ? 'shadow-lg border-[#0d0d0d]/25 ring-1 ring-[#0d0d0d]/10'
                    : 'hover:border-[#0d0d0d]/20 hover:shadow-sm'
                }`}
                style={{
                  transitionDelay: inView ? `${idx * 40}ms` : '0ms',
                }}
              >
                {/* Accordion Trigger Header */}
                <button
                  type="button"
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={isExpanded}
                  aria-controls={`faq-answer-${faq.id}`}
                  className="w-full p-6 sm:p-7 text-left flex items-start justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d0d0d] focus-visible:ring-offset-2 rounded-2xl"
                >
                  <div className="flex items-start gap-4 sm:gap-6">
                    {/* Index Number */}
                    <span className="font-mono text-xs sm:text-sm text-[#a9a6a0] font-semibold mt-1 select-none">
                      {faq.index}
                    </span>

                    {/* Question & Category Pill */}
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#f4f2ee] text-[#77756f] border border-[#0d0d0d]/5">
                          {faq.category}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-[#0d0d0d] leading-snug">
                        {faq.question}
                      </h3>
                    </div>
                  </div>

                  {/* Plus / Minus Action Indicator */}
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                      isExpanded
                        ? 'bg-[#0d0d0d] text-white border-[#0d0d0d] rotate-45'
                        : 'bg-[#f4f2ee] text-[#0d0d0d] border-[#0d0d0d]/10 group-hover:border-[#0d0d0d]/30'
                    }`}
                    aria-hidden="true"
                  >
                    <span className="font-mono text-base font-medium leading-none">
                      +
                    </span>
                  </div>
                </button>

                {/* Collapsible Answer Body */}
                <div
                  id={`faq-answer-${faq.id}`}
                  role="region"
                  aria-labelledby={faq.id}
                  className={`grid transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-1 pl-14 sm:pl-19 border-t border-[#0d0d0d]/5 text-[#444444] text-sm sm:text-base leading-relaxed">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Card: Direct inquiry prompt */}
        <div className="mt-14 max-w-4xl mx-auto p-8 rounded-[24px] bg-white border border-[#0d0d0d]/10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[#a9a6a0] block mb-1">
              Have a custom requirement?
            </span>
            <h4 className="text-lg sm:text-xl font-bold text-[#0d0d0d] tracking-tight">
              Looking for something specific? Let's discuss your roadmap.
            </h4>
          </div>

          <button
            onClick={() => scrollTo('#contact')}
            className="btn-primary shrink-0 cursor-pointer text-xs sm:text-sm"
          >
            Ask Jayaram directly →
          </button>
        </div>

      </div>
    </section>
  );
};
