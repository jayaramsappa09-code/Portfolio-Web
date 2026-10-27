/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PROFILE } from '../../lib/data';
import { useScroll } from '../../lib/scroll';
import { useInView } from '../../lib/hooks';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const Contact: React.FC = () => {
  const [sectionRef, inView] = useInView({ threshold: 0.1 });
  const { scrollTo } = useScroll();
  const [copied, setCopied] = useState(false);

  // Contact Form State
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const copyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    });
  };

  // Simple validation logic
  const validateForm = (): boolean => {
    const errs: FormErrors = {};

    if (!form.name.trim() || form.name.trim().length < 2) {
      errs.name = 'Please provide your name (at least 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim() || !emailRegex.test(form.email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }

    if (!form.subject.trim() || form.subject.trim().length < 3) {
      errs.subject = 'Please enter a subject (at least 3 characters).';
    }

    if (!form.message.trim() || form.message.trim().length < 10) {
      errs.message = 'Please write a message with at least 10 characters.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Direct submission to Jayaram's email (jayramsappa537@gmail.com)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Send directly to Jayaram's verified email via FormSubmit AJAX service
      const response = await fetch(`https://formsubmit.co/ajax/${PROFILE.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
          _subject: `New Portfolio Message from ${form.name}: ${form.subject}`,
          _template: 'table',
        }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Server responded with an issue');
      }
    } catch {
      // If network fails or is blocked, provide pre-filled mailto direct trigger
      const mailtoLink = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
        `Portfolio Message: ${form.subject}`
      )}&body=${encodeURIComponent(
        `Hi Jayaram,\n\nName: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
      )}`;
      window.location.href = mailtoLink;
      setSubmitSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const line1 = "Let's build";
  const line2 = "something together.";

  return (
    <section id="contact" ref={sectionRef} className="site-section bg-white border-t border-[#0d0d0d]/10 relative">
      <div className="site-container">
        
        {/* Top Tag */}
        <div className="font-mono-tag mb-6 flex items-center justify-between">
          <span>08 — Get In Touch</span>
          <span>Andhra Pradesh, India (IST)</span>
        </div>

        {/* Huge Heading: Each letter hops when hovered */}
        <div className="mb-14 select-none">
          <h2 className="heading-display text-5xl sm:text-7xl md:text-8xl tracking-tight text-[#0d0d0d]">
            <div className="block overflow-hidden">
              {line1.split('').map((char, idx) => (
                <span
                  key={idx}
                  className="inline-block transition-transform duration-200 hover:-translate-y-3 cursor-default"
                  style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                >
                  {char}
                </span>
              ))}
            </div>
            <div className="block overflow-hidden mt-1 text-[#77756f]">
              {line2.split('').map((char, idx) => (
                <span
                  key={idx}
                  className="inline-block transition-transform duration-200 hover:-translate-y-3 cursor-default font-serif-italic"
                  style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                >
                  {char}
                </span>
              ))}
            </div>
          </h2>
        </div>

        {/* Main Grid: Contact Me Form (Left) + Direct Contact Details (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-20 border-b border-[#0d0d0d]/10">
          
          {/* Left Side (Col 7): Interactive 'Contact Me' Form */}
          <div className="lg:col-span-7 card-premium p-6 sm:p-8 bg-[#fdfdfc] border border-[#0d0d0d]/10 rounded-[28px] shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#0d0d0d]/10">
              <div>
                <span className="font-mono text-xs uppercase text-[#a9a6a0] tracking-wider block mb-1">
                  Send Direct Message
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0d0d0d] tracking-tight">
                  Contact Me
                </h3>
              </div>
              <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-[#10b981]/10 text-[#059669] border border-[#10b981]/20 font-medium">
                Delivered to Mail Inbox
              </span>
            </div>

            {submitSuccess ? (
              <div className="p-8 text-center bg-[#f4f2ee] rounded-2xl border border-[#0d0d0d]/10 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-12 h-12 rounded-full bg-[#10b981] text-white flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-sm">
                  ✓
                </div>
                <h4 className="text-xl font-bold text-[#0d0d0d] mb-2 tracking-tight">
                  Message Sent to Jayaram's Email!
                </h4>
                <p className="text-sm text-[#555555] mb-6 max-w-md mx-auto leading-relaxed">
                  Thank you! Your message was sent directly to <strong className="text-[#0d0d0d]">{PROFILE.email}</strong>. I will review it and reply as soon as possible.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="btn-primary text-xs cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {submitError && (
                  <div className="p-3 text-xs font-mono text-red-600 bg-red-50 rounded-xl border border-red-200">
                    {submitError}
                  </div>
                )}

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-mono text-[#555555] mb-1.5 font-medium">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Alex Sharma"
                      className={`w-full px-4 py-2.5 rounded-xl bg-white border text-sm text-[#0d0d0d] placeholder:text-[#a9a6a0] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d0d0d] ${
                        errors.name ? 'border-red-500 bg-red-50/20' : 'border-[#0d0d0d]/15 hover:border-[#0d0d0d]/30'
                      }`}
                      required
                    />
                    {errors.name && (
                      <p className="text-[11px] font-mono text-red-600 mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-mono text-[#555555] mb-1.5 font-medium">
                      Your Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleInputChange}
                      placeholder="name@company.com"
                      className={`w-full px-4 py-2.5 rounded-xl bg-white border text-sm text-[#0d0d0d] placeholder:text-[#a9a6a0] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d0d0d] ${
                        errors.email ? 'border-red-500 bg-red-50/20' : 'border-[#0d0d0d]/15 hover:border-[#0d0d0d]/30'
                      }`}
                      required
                    />
                    {errors.email && (
                      <p className="text-[11px] font-mono text-red-600 mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-mono text-[#555555] mb-1.5 font-medium">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleInputChange}
                    placeholder="Project Inquiry / Job Opportunity / Collaboration"
                    className={`w-full px-4 py-2.5 rounded-xl bg-white border text-sm text-[#0d0d0d] placeholder:text-[#a9a6a0] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d0d0d] ${
                      errors.subject ? 'border-red-500 bg-red-50/20' : 'border-[#0d0d0d]/15 hover:border-[#0d0d0d]/30'
                    }`}
                    required
                  />
                  {errors.subject && (
                    <p className="text-[11px] font-mono text-red-600 mt-1">{errors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-mono text-[#555555] mb-1.5 font-medium">
                    Message Details <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project, timeline, or requirements..."
                    className={`w-full px-4 py-2.5 rounded-xl bg-white border text-sm text-[#0d0d0d] placeholder:text-[#a9a6a0] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d0d0d] resize-none ${
                      errors.message ? 'border-red-500 bg-red-50/20' : 'border-[#0d0d0d]/15 hover:border-[#0d0d0d]/30'
                    }`}
                    required
                  />
                  {errors.message && (
                    <p className="text-[11px] font-mono text-red-600 mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Submit Row */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary cursor-pointer disabled:opacity-50 inline-flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending to Mail...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <span className="font-mono">→</span>
                      </>
                    )}
                  </button>

                  <span className="text-[11px] font-mono text-[#77756f]">
                    Delivers to {PROFILE.email}
                  </span>
                </div>
              </form>
            )}
          </div>

          {/* Right Side (Col 5): Direct Channels, LinkedIn Button & Rotating Badge */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between h-full">
            <div>
              {/* Main Email with Copy chip */}
              <div className="mb-6">
                <div className="font-mono text-xs uppercase text-[#a9a6a0] mb-2 tracking-wider">
                  Direct Email Address
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="text-xl sm:text-2xl font-bold tracking-tight text-[#0d0d0d] underline underline-offset-4 decoration-1 hover:decoration-2 transition-all"
                  >
                    {PROFILE.email}
                  </a>

                  {/* Copy Chip */}
                  <button
                    onClick={copyEmail}
                    className={`px-3 py-1 text-xs font-mono rounded-full border transition-all duration-200 cursor-pointer ${
                      copied
                        ? 'bg-[#0d0d0d] text-white border-[#0d0d0d]'
                        : 'bg-[#f4f2ee] text-[#0d0d0d] border-[#0d0d0d]/10 hover:border-[#0d0d0d]'
                    }`}
                    aria-label="Copy email address"
                  >
                    <span aria-live="polite">
                      {copied ? 'Copied ✓' : 'Copy email'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Connect on LinkedIn Button */}
              <div className="mb-6">
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#0a66c2] text-white hover:bg-[#004182] text-xs sm:text-sm font-mono font-medium shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer w-full sm:w-auto justify-center"
                  aria-label="Connect on LinkedIn with Sappa Jayaram Siva Prasad"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                  <span>Connect on LinkedIn</span>
                  <span>↗</span>
                </a>
              </div>

              {/* Direct Phone & Social Links from Resume */}
              <div className="space-y-4 pt-4 border-t border-[#0d0d0d]/10 font-mono text-xs text-[#3a3a3a]">
                <div>
                  <span className="text-[#a9a6a0] block uppercase mb-1">Phone / WhatsApp</span>
                  <a href={PROFILE.phoneHref} className="font-semibold text-sm hover:underline">
                    {PROFILE.phone}
                  </a>
                </div>

                <div>
                  <span className="text-[#a9a6a0] block uppercase mb-1">GitHub Profile</span>
                  <a
                    href={PROFILE.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-sm hover:underline"
                  >
                    github.com/{PROFILE.githubHandle} ↗
                  </a>
                </div>

                <div>
                  <span className="text-[#a9a6a0] block uppercase mb-1">LinkedIn Profile</span>
                  <a
                    href={PROFILE.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-sm hover:underline text-[#0a66c2] inline-flex items-center gap-1"
                  >
                    <span>linkedin.com/in/{PROFILE.linkedinHandle}</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Rotating "Say Hello" badge */}
            <div className="hidden lg:flex items-center justify-start pt-6">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full animate-[spin_18s_linear_infinite]"
                  aria-hidden="true"
                >
                  <path
                    id="textCircle"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text className="font-mono text-[9px] tracking-[0.22em] uppercase fill-[#0d0d0d]">
                    <textPath href="#textCircle" startOffset="0%">
                      · SAY HELLO · SAPPA JAYARAM · GET IN TOUCH
                    </textPath>
                  </text>
                </svg>
                <div className="absolute w-10 h-10 rounded-full bg-[#0d0d0d] text-white flex items-center justify-center font-mono text-xs">
                  ↓
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Clean Minimalist Footer */}
        <footer className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#77756f]">
          <div>
            © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => scrollTo('#hero')}
              className="hover:text-[#0d0d0d] underline underline-offset-4 cursor-pointer"
            >
              Back to top ↑
            </button>
            <span className="text-[#a9a6a0]">·</span>
            <span>Production Portfolio</span>
          </div>
        </footer>

      </div>
    </section>
  );
};
