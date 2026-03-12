'use client';

import { motion } from 'motion/react';
import { Mail, MessageCircle, MapPin, Send, CheckCircle, AlertCircle, Loader2, ChevronRight } from 'lucide-react';
import { useState } from 'react';

type FormState = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  service: string;
  message: string;
  website: string; // honeypot
}

const services = [
  'Web Development',
  'Video Editing',
  'YouTube Growth & Management',
  'Thumbnail Design',
  'Social Media Content',
  'Other',
];

const CONTACT_API_URL = process.env.NEXT_PUBLIC_CONTACT_API_URL || '/backend/contact.php';

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    service: '',
    message: '',
    website: '', // honeypot
  });
  const [formState, setFormState] = useState<FormState>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setFormState('error');
      setStatusMessage('Please enter your name.');
      return;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setFormState('error');
      setStatusMessage('Please enter a valid email.');
      return;
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setFormState('error');
      setStatusMessage('Message must be at least 10 characters.');
      return;
    }

    setFormState('loading');
    setStatusMessage('');

    try {
      const response = await fetch(CONTACT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setFormState('success');
        setStatusMessage(result.message || "Thanks! We'll get back to you soon.");
        setFormData({ name: '', email: '', service: '', message: '', website: '' });
      } else {
        setFormState('error');
        setStatusMessage(result.message || 'Something went wrong.');
      }
    } catch {
      setFormState('error');
      setStatusMessage('Connection error. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 relative bg-zinc-950 overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/5 blur-[120px] rounded-full animate-pulse -z-10" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-600/5 blur-[100px] rounded-full -z-10" style={{ animationDelay: '1s' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Left Side — Branding & Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[10px] font-display font-bold text-red-600 uppercase tracking-[0.4em] mb-6"
            >
              Get In Touch
            </motion.p>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent leading-[0.9]">
              Let&apos;s build <br />
              <span className="text-red-600">something great.</span>
            </h2>
            <p className="text-zinc-400 text-base md:text-lg mb-10 max-w-sm leading-relaxed font-light tracking-wide italic">
              Ready to elevate your digital presence? We typically respond within 12 hours.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
              {[
                { icon: Mail, label: 'Email Us', value: 'info@stuckstudio.com', href: 'mailto:info@stuckstudio.com' },
                { icon: MessageCircle, label: 'WhatsApp', value: '+880 1967 385 336', href: 'https://wa.me/8801967385336' },
                { icon: MapPin, label: 'Our HQ', value: 'Dhaka, Bangladesh', isText: true }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-zinc-400 group-hover:bg-white group-hover:text-red-600 group-hover:scale-110 transition-all duration-500 shadow-lg">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-display font-bold uppercase tracking-[0.3em] text-zinc-500 mb-0.5 group-hover:text-red-500 transition-colors">{item.label}</h4>
                    {item.isText ? (
                      <p className="text-sm text-zinc-300 group-hover:text-white transition-colors">{item.value}</p>
                    ) : (
                      <a href={item.href} className="text-sm text-zinc-300 group-hover:text-white transition-colors font-medium">
                        {item.value}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side — Premium Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
            suppressHydrationWarning
          >
            {/* Form Glow Effect behind */}
            <div className="absolute -inset-1 bg-gradient-to-br from-red-600/20 to-transparent blur-2xl opacity-20" />

            <div className="relative bg-zinc-900/40 backdrop-blur-2xl border border-white/10 rounded-[28px] p-6 md:p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)]">
              {formState === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center text-center gap-6"
                >
                  <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-display font-bold text-white mb-2">Message Delivered</h3>
                    <p className="text-zinc-400 max-w-[280px] leading-relaxed">{statusMessage}</p>
                  </div>
                  <button
                    onClick={() => setFormState('idle')}
                    className="mt-6 px-10 py-4 text-xs font-bold uppercase tracking-widest rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
                  >
                    Start New Inquiry
                  </button>
                </motion.div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                  {/* Honeypot */}
                  <input type="text" name="website" value={formData.website} onChange={handleChange} className="hidden" tabIndex={-1} autoComplete="off" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Name</label>
                      <input
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-600 focus:bg-white/[0.05] transition-all"
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Email</label>
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-600 focus:bg-white/[0.05] transition-all"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Service Interest</label>
                    <div className="relative">
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-red-600 focus:bg-white/[0.05] transition-all appearance-none cursor-pointer"
                      >
                        <option value="" disabled className="bg-zinc-900">Choose a service</option>
                        {services.map((s) => (
                          <option key={s} value={s} className="bg-zinc-900">{s}</option>
                        ))}
                      </select>
                      <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 pointer-events-none rotate-90" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-display font-bold uppercase tracking-[0.2em] text-zinc-500 ml-1">Your Message</label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-600 focus:bg-white/[0.05] transition-all resize-none"
                      placeholder="Briefly describe your project goals..."
                    />
                  </div>

                  {formState === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-red-600/10 border border-red-600/20 text-red-500 text-xs font-bold"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      {statusMessage}
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={formState === 'loading'}
                    className="group-submit w-full h-[56px] relative overflow-hidden bg-white text-black rounded-xl font-display font-bold text-[11px] tracking-[0.2em] uppercase hover:bg-zinc-200 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {formState === 'loading' ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span>Send Message</span>
                        <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white shadow-lg">
                          <Send className="w-3.5 h-3.5" />
                        </div>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
