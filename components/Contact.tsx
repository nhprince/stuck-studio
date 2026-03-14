'use client';

import { motion, AnimatePresence } from 'motion/react';
import {
  Mail, MessageCircle, MapPin, Send, CheckCircle,
  AlertCircle, Loader2, ChevronRight, Clock, Users, Star, Zap,
} from 'lucide-react';
import { useState } from 'react';

type FormState = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  service: string;
  timeline: string;
  message: string;
  website: string;
}

const services = [
  'Web Development',
  'Video Editing',
  'YouTube Growth',
  'Thumbnail Design',
  'Social Media',
  'Other',
];

const timelines = ['ASAP', '1–2 Weeks', '1 Month', 'Flexible'];

const CONTACT_API_URL = process.env.NEXT_PUBLIC_CONTACT_API_URL || '/contact.php';

const trustItems = [
  { icon: Clock, value: '12h', label: 'avg. response' },
  { icon: Users, value: '50+', label: 'clients served' },
  { icon: Star, value: '4.9', label: 'avg. rating' },
  { icon: Zap, value: '100%', label: 'satisfaction' },
];

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    service: '',
    timeline: '',
    message: '',
    website: '',
  });
  const [formState, setFormState] = useState<FormState>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const setService = (s: string) =>
    setFormData((prev) => ({ ...prev, service: prev.service === s ? '' : s }));

  const setTimeline = (t: string) =>
    setFormData((prev) => ({ ...prev, timeline: prev.timeline === t ? '' : t }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setFormState('error'); setStatusMessage('Please enter your name.'); return;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setFormState('error'); setStatusMessage('Please enter a valid email.'); return;
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setFormState('error'); setStatusMessage('Message must be at least 10 characters.'); return;
    }
    setFormState('loading'); setStatusMessage('');
    try {
      const response = await fetch(CONTACT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) {
        setFormState('success');
        setStatusMessage(result.message || "Thanks! We'll get back to you within 12 hours.");
        setFormData({ name: '', email: '', service: '', timeline: '', message: '', website: '' });
      } else {
        setFormState('error');
        setStatusMessage(result.message || 'Something went wrong.');
      }
    } catch {
      setFormState('error');
      setStatusMessage('Connection error. Please try again.');
    }
  };

  const msgLen = formData.message.length;
  const msgMax = 500;

  return (
    <section id="contact" className="py-16 md:py-24 relative bg-zinc-950 overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-600/4 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">

          {/* ── LEFT ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Label */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[10px] font-bold text-red-600 uppercase tracking-[0.4em] mb-5"
            >
              Get In Touch
            </motion.p>

            {/* Heading */}
            <h2 className="font-display text-4xl md:text-5xl xl:text-6xl font-bold tracking-tighter mb-5 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent leading-[0.9]">
              Let&apos;s build <br />
              <span className="text-red-600">something great.</span>
            </h2>

            <p className="text-zinc-400 text-sm md:text-base mb-8 max-w-sm leading-relaxed font-light tracking-wide italic">
              Ready to elevate your digital presence? Drop us a message and we&apos;ll get back to you fast.
            </p>

            {/* Trust strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3 mb-10">
              {trustItems.map(({ icon: Icon, value, label }) => (
                <motion.div
                  key={label}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="group flex flex-col items-center justify-center gap-1 py-3 px-2 rounded-2xl cursor-default transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.background = 'rgba(220,38,38,0.08)';
                    (e.currentTarget as HTMLDivElement).style.border = '1px solid rgba(220,38,38,0.25)';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px rgba(220,38,38,0.12)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.03)';
                    (e.currentTarget as HTMLDivElement).style.border = '1px solid rgba(255,255,255,0.06)';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                  }}
                >
                  <Icon className="w-4 h-4 text-zinc-600 mb-0.5 transition-colors duration-300 group-hover:text-red-500" />
                  <span className="text-white text-sm font-bold tracking-tight transition-colors duration-300 group-hover:text-red-400">{value}</span>
                  <span className="text-zinc-600 text-[9px] uppercase tracking-[0.18em] font-bold">{label}</span>
                </motion.div>
              ))}
            </div>

            {/* Contact info */}
            <div className="flex flex-col gap-4">
              {[
                { icon: Mail, label: 'Email Us', value: 'info@stuckstudio.com', href: 'mailto:info@stuckstudio.com' },
                { icon: MessageCircle, label: 'WhatsApp', value: '+880 1967 385 336', href: 'https://wa.me/8801967385336' },
                { icon: MapPin, label: 'Our HQ', value: 'Dhaka, Bangladesh', isText: true },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-zinc-500 transition-all duration-300 group-hover:bg-white group-hover:text-red-600 group-hover:scale-105"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    <item.icon className="w-4.5 h-4.5 w-[18px] h-[18px]" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-600 mb-0.5 group-hover:text-red-500 transition-colors">{item.label}</p>
                    {item.isText ? (
                      <p className="text-[13px] text-zinc-300 group-hover:text-white transition-colors">{item.value}</p>
                    ) : (
                      <a href={item.href} className="text-[13px] text-zinc-300 group-hover:text-white transition-colors font-medium">
                        {item.value}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Response time badge */}
            <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Usually replies within 12 hours</span>
            </div>
          </motion.div>

          {/* ── RIGHT — FORM ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
            suppressHydrationWarning
          >
            {/* Glow behind form */}
            <div className="absolute -inset-1 bg-gradient-to-br from-red-600/15 to-transparent blur-2xl opacity-30 pointer-events-none" />

            <div
              className="relative backdrop-blur-2xl rounded-[28px] p-6 md:p-8"
              style={{
                background: 'rgba(24,24,27,0.6)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 32px 64px -16px rgba(0,0,0,0.6)',
              }}
            >
              <AnimatePresence mode="wait">
                {formState === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-12 flex flex-col items-center text-center gap-5"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                      className="w-20 h-20 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}
                    >
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Message Delivered!</h3>
                      <p className="text-zinc-400 text-sm max-w-[260px] leading-relaxed">{statusMessage}</p>
                    </div>
                    <button
                      onClick={() => setFormState('idle')}
                      className="mt-4 px-8 py-3 text-[10px] font-bold uppercase tracking-widest rounded-full text-white transition-all hover:scale-105 active:scale-95"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                    >
                      Send Another
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                    onSubmit={handleSubmit}
                    noValidate
                  >
                    {/* Honeypot */}
                    <input type="text" name="website" value={formData.website} onChange={handleChange} className="hidden" tabIndex={-1} autoComplete="off" />

                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="contact-name" className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Name</label>
                        <input
                          id="contact-name" name="name" type="text" value={formData.name} onChange={handleChange} required
                          className="w-full rounded-2xl px-4 py-3.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none transition-all"
                          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                          onFocus={e => e.currentTarget.style.borderColor = 'rgba(220,38,38,0.6)'}
                          onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
                          placeholder="Your full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="contact-email" className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Email</label>
                        <input
                          id="contact-email" name="email" type="email" value={formData.email} onChange={handleChange} required
                          className="w-full rounded-2xl px-4 py-3.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none transition-all"
                          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                          onFocus={e => e.currentTarget.style.borderColor = 'rgba(220,38,38,0.6)'}
                          onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
                          placeholder="email@example.com"
                        />
                      </div>
                    </div>

                    {/* Service pills */}
                    <div className="space-y-2.5">
                      <label id="service-label" className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Service Interest</label>
                      <div className="flex flex-wrap gap-2" role="group" aria-labelledby="service-label">
                        {services.map((s) => {
                          const active = formData.service === s;
                          return (
                            <button
                              key={s}
                              type="button"
                              onClick={() => setService(s)}
                              className="px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-200 hover:scale-105 active:scale-95"
                              style={{
                                background: active ? '#dc2626' : 'rgba(255,255,255,0.04)',
                                border: active ? '1px solid rgba(220,38,38,0.4)' : '1px solid rgba(255,255,255,0.08)',
                                color: active ? 'white' : 'rgb(161,161,170)',
                                boxShadow: active ? '0 0 20px rgba(220,38,38,0.25)' : 'none',
                              }}
                            >
                              {s}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Timeline pills */}
                    <div className="space-y-2.5">
                      <label id="timeline-label" className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Timeline</label>
                      <div className="grid grid-cols-4 gap-2" role="group" aria-labelledby="timeline-label">
                        {timelines.map((t) => {
                          const active = formData.timeline === t;
                          return (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setTimeline(t)}
                              className="py-2 rounded-xl text-[9px] font-bold uppercase tracking-[0.12em] transition-all duration-200 hover:scale-105 active:scale-95 text-center"
                              style={{
                                background: active ? 'rgba(220,38,38,0.15)' : 'rgba(255,255,255,0.03)',
                                border: active ? '1px solid rgba(220,38,38,0.4)' : '1px solid rgba(255,255,255,0.07)',
                                color: active ? '#f87171' : 'rgb(113,113,122)',
                              }}
                            >
                              {t}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Message + char counter */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between ml-1">
                        <label htmlFor="contact-message" className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">Message</label>
                        <span
                          className="text-[9px] font-bold transition-colors"
                          style={{ color: msgLen > msgMax * 0.9 ? '#f87171' : 'rgb(82,82,91)' }}
                        >
                          {msgLen}/{msgMax}
                        </span>
                      </div>
                      <div className="relative">
                        <textarea
                          id="contact-message"
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          maxLength={msgMax}
                          required
                          className="w-full rounded-2xl px-4 py-3.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none transition-all resize-none"
                          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                          onFocus={e => e.currentTarget.style.borderColor = 'rgba(220,38,38,0.6)'}
                          onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
                          placeholder="Briefly describe your project goals..."
                        />
                        {/* Progress bar at bottom of textarea */}
                        <div
                          className="absolute bottom-0 left-0 h-[2px] rounded-b-2xl transition-all duration-300"
                          style={{
                            width: `${(msgLen / msgMax) * 100}%`,
                            background: msgLen > msgMax * 0.9 ? '#ef4444' : '#dc2626',
                            opacity: msgLen > 0 ? 1 : 0,
                          }}
                        />
                      </div>
                    </div>

                    {/* Error */}
                    <AnimatePresence>
                      {formState === 'error' && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold"
                          style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.2)', color: '#f87171' }}
                        >
                          <AlertCircle className="w-4 h-4 flex-shrink-0" />
                          {statusMessage}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={formState === 'loading'}
                      className="w-full h-14 relative overflow-hidden bg-white text-black rounded-2xl font-bold text-[11px] tracking-[0.2em] uppercase hover:bg-zinc-100 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      {formState === 'loading' ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <span>Send Message</span>
                          <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white">
                            <Send className="w-3.5 h-3.5" />
                          </div>
                        </>
                      )}
                    </button>

                    {/* Bottom note */}
                    <p className="text-center text-[9px] text-zinc-600 uppercase tracking-[0.2em]">
                      No spam — ever. Your info stays private.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}