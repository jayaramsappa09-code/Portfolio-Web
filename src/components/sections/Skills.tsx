/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import {
  SKILLS,
  SKILL_FAMILIES,
  SKILL_CATEGORIES,
  SkillCategory,
  SkillElement,
  getSkillCategories,
} from '../../lib/data';
import { TechLogo, isBrand } from '../ui/TechLogo';
import { useInView } from '../../lib/hooks';

export const Skills: React.FC = () => {
  const [sectionRef, inView] = useInView({ threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('All');
  const [activeFamily, setActiveFamily] = useState<string>('All');
  const [selectedSkill, setSelectedSkill] = useState<SkillElement>(SKILLS[0]);
  const [hoveredSkillId, setHoveredSkillId] = useState<number | null>(null);

  // Category counts
  const categoryCounts = useMemo(() => {
    return {
      All: SKILLS.length,
      AI: SKILLS.filter((s) => getSkillCategories(s).includes('AI')).length,
      'Full-Stack': SKILLS.filter((s) => getSkillCategories(s).includes('Full-Stack')).length,
      General: SKILLS.filter((s) => getSkillCategories(s).includes('General')).length,
    };
  }, []);

  // Filter skills based on active category and secondary family
  const filteredSkills = useMemo(() => {
    return SKILLS.filter((skill) => {
      const matchesCategory =
        activeCategory === 'All' || getSkillCategories(skill).includes(activeCategory);
      const matchesFamily = activeFamily === 'All' || skill.family === activeFamily;
      return matchesCategory && matchesFamily;
    });
  }, [activeCategory, activeFamily]);

  // If currently selected skill is filtered out, select first available matching skill
  useEffect(() => {
    if (filteredSkills.length > 0 && !filteredSkills.some((s) => s.number === selectedSkill.number)) {
      setSelectedSkill(filteredSkills[0]);
    }
  }, [filteredSkills, selectedSkill]);

  const getFamilyBadgeColor = (family: string) => {
    switch (family) {
      case 'Languages':
        return 'bg-[#3776AB]/10 text-[#2b5d87] border-[#3776AB]/20';
      case 'Frontend':
        return 'bg-[#007acc]/10 text-[#0062a3] border-[#007acc]/20';
      case 'Backend':
        return 'bg-[#339933]/10 text-[#287928] border-[#339933]/20';
      case 'AI & ML':
        return 'bg-[#8B5CF6]/10 text-[#6D28D9] border-[#8B5CF6]/20';
      case 'Tools & Core':
        return 'bg-[#EA580C]/10 text-[#C2410C] border-[#EA580C]/20';
      default:
        return 'bg-[#0d0d0d]/5 text-[#3a3a3a] border-[#0d0d0d]/10';
    }
  };

  return (
    <section id="skills" ref={sectionRef} className="site-section bg-[#f4f2ee] relative">
      <div className="site-container">
        {/* Section Tag & Heading */}
        <div className={`mb-10 rv ${inView ? 'is-in' : ''}`}>
          <div className="font-mono-tag mb-3">02 — Technical Skills</div>
          <h2 className="heading-display text-4xl sm:text-5xl md:text-6xl text-balance">
            The periodic table of my <span className="font-serif-italic">stack.</span>
          </h2>
          <p className="text-sm text-[#77756f] mt-3 max-w-xl">
            Interactive element matrix categorized by domain. Filter by high-level focus (AI, Full-Stack, General) or inspect individual elements to view vectors, concepts, and project associations.
          </p>
        </div>

        {/* Primary Interactive Category Filter ('AI', 'Full-Stack', 'General', 'All') */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#0d0d0d]/10">
          <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Skill category filter">
            <span className="font-mono text-xs uppercase tracking-wider text-[#77756f] mr-1 hidden sm:inline-block">
              Filter:
            </span>
            {SKILL_CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              const count = categoryCounts[category];

              return (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setActiveFamily('All'); // Reset secondary family filter when switching category
                  }}
                  className={`px-4 py-2 text-xs font-mono font-medium rounded-full transition-all duration-200 border cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#0d0d0d] text-white border-[#0d0d0d] shadow-md scale-[1.02]'
                      : 'bg-white text-[#555555] border-[#0d0d0d]/10 hover:border-[#0d0d0d]/30 hover:text-[#0d0d0d]'
                  }`}
                  role="tab"
                  aria-selected={isActive}
                >
                  {category === 'AI' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-pulse" />
                  )}
                  {category === 'Full-Stack' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                  )}
                  {category === 'General' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]" />
                  )}
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

          {/* Results Summary Counter */}
          <div className="font-mono text-xs text-[#77756f] flex items-center gap-2">
            <span>
              Showing <strong className="text-[#0d0d0d]">{filteredSkills.length}</strong> of {SKILLS.length} skills
            </span>
            {activeCategory !== 'All' && (
              <span className="px-2 py-0.5 rounded bg-[#0d0d0d]/5 text-[#0d0d0d] text-[10px] font-semibold">
                {activeCategory} Focus
              </span>
            )}
          </div>
        </div>

        {/* Secondary Domain Sub-Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5 mb-10" role="tablist" aria-label="Sub-family categories">
          <span className="font-mono text-[11px] text-[#a9a6a0] mr-2">Domain:</span>
          {SKILL_FAMILIES.map((family) => {
            const isActive = activeFamily === family;
            return (
              <button
                key={family}
                onClick={() => setActiveFamily(family)}
                className={`px-3 py-1 text-[11px] font-mono rounded-full transition-all duration-150 border cursor-pointer ${
                  isActive
                    ? 'bg-[#222222] text-white border-[#222222]'
                    : 'bg-white/80 text-[#77756f] border-[#0d0d0d]/10 hover:border-[#0d0d0d]/30 hover:text-[#0d0d0d]'
                }`}
                role="tab"
                aria-selected={isActive}
              >
                {family}
              </button>
            );
          })}
          {activeFamily !== 'All' && (
            <button
              onClick={() => setActiveFamily('All')}
              className="text-[11px] font-mono text-[#a9a6a0] hover:text-[#0d0d0d] underline ml-2 cursor-pointer"
            >
              Reset domain
            </button>
          )}
        </div>

        {/* Main Layout: Filtered Periodic Grid (left) + Sticky Inspector (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">
          
          {/* Periodic Elements Grid (8 cols desktop, 4 cols tablet, 2 cols mobile) */}
          {filteredSkills.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {filteredSkills.map((skill, index) => {
                const delay = (index % 8) * 30;
                const isSelected = selectedSkill.number === skill.number;
                const isHovered = hoveredSkillId === skill.number;
                const skillCategories = getSkillCategories(skill);

                return (
                  <div key={skill.number} className="relative group">
                    <button
                      onClick={() => {
                        setSelectedSkill(skill);
                      }}
                      onMouseEnter={() => {
                        setSelectedSkill(skill);
                        setHoveredSkillId(skill.number);
                      }}
                      onMouseLeave={() => setHoveredSkillId(null)}
                      onFocus={() => {
                        setSelectedSkill(skill);
                        setHoveredSkillId(skill.number);
                      }}
                      onBlur={() => setHoveredSkillId(null)}
                      style={{
                        transitionDelay: inView ? `${delay}ms` : '0ms',
                      }}
                      className={`relative w-full p-2.5 sm:p-3 rounded-2xl flex flex-col justify-between aspect-square text-left transition-all duration-300 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d0d0d] cursor-pointer ${
                        isSelected
                          ? 'bg-[#ffffff] border-[#0d0d0d] shadow-xl scale-[1.04] z-10 ring-1 ring-[#0d0d0d]'
                          : 'bg-[#ffffff] border-[#0d0d0d]/10 hover:border-[#0d0d0d]/40 hover:scale-[1.03] hover:shadow-md'
                      }`}
                      aria-label={`${skill.name} (${skill.symbol}) - ${skill.family}`}
                    >
                      {/* Top row: Atomic Number + Family Pill Indicator */}
                      <div className="flex justify-between items-start w-full">
                        <span className="font-mono text-[10px] sm:text-[11px] text-[#a9a6a0] font-semibold">
                          {skill.number < 10 ? `0${skill.number}` : skill.number}
                        </span>
                        <span className="font-mono text-[8px] uppercase tracking-wider px-1 py-0.5 rounded bg-[#f4f2ee] text-[#77756f] border border-[#0d0d0d]/5">
                          {skill.family === 'Languages'
                            ? 'LANG'
                            : skill.family === 'Frontend'
                            ? 'FRONT'
                            : skill.family === 'Backend'
                            ? 'BACK'
                            : skill.family === 'AI & ML'
                            ? 'AI/ML'
                            : 'CORE'}
                        </span>
                      </div>

                      {/* Middle: 2-letter Symbol */}
                      <div className="my-auto text-center py-1">
                        <div className="font-mono text-xl sm:text-2xl font-bold text-[#0d0d0d] tracking-tight group-hover:scale-110 transition-transform duration-200">
                          {skill.symbol}
                        </div>
                      </div>

                      {/* Bottom: Name & Family */}
                      <div className="w-full">
                        <div className="text-[10px] sm:text-[11px] font-semibold text-[#0d0d0d] truncate">
                          {skill.name}
                        </div>
                        <div className="text-[9px] font-mono text-[#a9a6a0] truncate mt-0.5">
                          {skill.family}
                        </div>
                      </div>
                    </button>

                    {/* Micro Pop Animation Card (springing on direct hover/focus) */}
                    {isHovered && (
                      <div
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 rounded-2xl bg-[#0d0d0d] text-white shadow-2xl z-30 pointer-events-none animate-in fade-in zoom-in-95 duration-200 hidden md:block"
                        style={{
                          animation: 'popIn 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                        }}
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center p-1">
                            <TechLogo name={skill.name} size={16} />
                          </div>
                          <div className="truncate">
                            <div className="text-xs font-bold leading-tight truncate">{skill.name}</div>
                            <div className="text-[9px] font-mono text-white/60">{skill.family}</div>
                          </div>
                        </div>
                        <div className="text-[10px] text-white/80 line-clamp-2 leading-tight mb-1">
                          {skill.projects.join(' · ')}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {skillCategories.map((cat) => (
                            <span key={cat} className="text-[8px] font-mono px-1 py-0.2 rounded bg-white/15 text-white/90">
                              {cat}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-[#0d0d0d]/10">
              <p className="font-mono text-sm text-[#77756f] mb-3">
                No skills found matching "{activeCategory}" category and "{activeFamily}" domain.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('All');
                  setActiveFamily('All');
                }}
                className="btn-secondary text-xs"
              >
                Reset all filters
              </button>
            </div>
          )}

          {/* Sticky Inspector Panel (340px wide) with Pop Animation */}
          <div className="sticky top-24 w-full">
            <div
              key={selectedSkill.number}
              className="card-premium p-6 sm:p-8 flex flex-col items-center text-center relative overflow-hidden bg-white shadow-xl transition-all duration-300 animate-in fade-in zoom-in-95"
            >
              {/* Soft brand glow background */}
              {selectedSkill.isBrand && (
                <div
                  className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-500"
                  style={{
                    backgroundColor: '#0d0d0d',
                  }}
                  aria-hidden="true"
                />
              )}

              {/* Element Header Badge: Atomic Number & Full Family */}
              <div className="w-full flex justify-between items-center text-xs font-mono text-[#a9a6a0] pb-4 border-b border-[#0d0d0d]/10 mb-6">
                <span>ELEMENT #{selectedSkill.number}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getFamilyBadgeColor(selectedSkill.family)}`}>
                  {selectedSkill.family}
                </span>
              </div>

              {/* 150px Brand or Custom Concept Line Icon with Pop Animation */}
              <div className="w-40 h-40 flex items-center justify-center p-4 my-2 transition-transform duration-300 transform hover:scale-105 group">
                <TechLogo
                  name={selectedSkill.name}
                  size={150}
                  className="transition-all duration-300 drop-shadow-sm filter contrast-105"
                />
              </div>

              {/* Title & 2-Letter Symbol */}
              <div className="mt-4 mb-2">
                <div className="font-mono text-3xl font-extrabold text-[#0d0d0d] tracking-tight">
                  {selectedSkill.symbol}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0d0d0d] mt-1 tracking-tight">
                  {selectedSkill.name}
                </h3>
                <div className="text-xs font-mono text-[#77756f] mt-0.5">
                  Family: {selectedSkill.family} {isBrand(selectedSkill.name) ? '(Official Vector)' : '(Concept Glyphs)'}
                </div>
              </div>

              {/* Category Tags in Inspector */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 my-2">
                {getSkillCategories(selectedSkill).map((cat) => (
                  <span
                    key={cat}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#f4f2ee] text-[#0d0d0d] border border-[#0d0d0d]/10 font-semibold"
                  >
                    {cat}
                  </span>
                ))}
              </div>

              {/* Description from Resume / Domain */}
              <p className="text-xs text-[#555555] leading-relaxed mb-6 max-w-xs">
                {selectedSkill.description}
              </p>

              {/* Projects Associated with this Skill */}
              <div className="w-full pt-4 border-t border-[#0d0d0d]/10 text-left">
                <div className="font-mono text-[10px] uppercase text-[#a9a6a0] mb-2 tracking-wider flex items-center justify-between">
                  <span>Associated Resume Projects</span>
                  <span className="text-[#0d0d0d] font-semibold">{selectedSkill.projects.length}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedSkill.projects.map((proj, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-mono px-2.5 py-1 bg-[#f4f2ee] text-[#0d0d0d] rounded-md border border-[#0d0d0d]/5 font-medium"
                    >
                      {proj}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
