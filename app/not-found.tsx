'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import {
  ChevronRight,
  Code2,
  Terminal as TerminalIcon,
  Command,
  Home,
  RotateCcw,
  BugOff,
  GitBranch
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white flex flex-col relative overflow-hidden">
      {/* Matrix-style digital "scan" glows */}
      <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-red-600/20 to-transparent -z-10 animate-[scan_4s_linear_infinite]" />
      <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-red-600/20 to-transparent -z-10 animate-[scan_6s_linear_infinite]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/5 blur-[120px] rounded-full -z-10 animate-pulse" />

      <Navbar />

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-24 md:py-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl w-full"
        >
          {/* Main Terminal Window */}
          <div className="relative bg-zinc-900/40 backdrop-blur-3xl border border-white/10 rounded-[32px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)]">

            {/* Terminal Header */}
            <div className="bg-white/5 border-b border-white/5 px-6 py-4 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-orange-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="flex items-center gap-2 text-zinc-500 text-xs font-mono">
                <TerminalIcon size={12} />
                <span>stuck_studio_server — bash</span>
              </div>
              <div className="w-12" /> {/* alignment spacer */}
            </div>

            {/* Terminal Body */}
            <div className="p-8 md:p-12 font-mono text-sm">
              <div className="space-y-4 mb-10">
                <div className="flex gap-3">
                  <span className="text-red-500">➜</span>
                  <span className="text-zinc-300">curl <span className="text-zinc-500">https://stuckstudio.com</span><span className="text-red-400">/lost-route</span></span>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-2 text-[13px]"
                >
                  <div className="flex gap-4">
                    <span className="text-zinc-600">[info]</span>
                    <span className="text-zinc-400">Initializing cluster...</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-zinc-600">[info]</span>
                    <span className="text-zinc-400">Requesting resources...</span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <span className="text-red-500/80 bg-red-500/10 px-1 rounded">[error]</span>
                    <span className="text-red-400 font-bold">FATAL: 404 Route Not Found</span>
                  </div>
                </motion.div>
              </div>

              {/* Code Snippet Error Visualization */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-black/40 rounded-2xl p-6 border border-white/5 mb-10 overflow-hidden relative"
              >
                <div className="absolute top-2 right-4 text-[10px] text-zinc-700">NotFoundHandler.ts</div>
                <pre className="text-zinc-500 leading-relaxed overflow-x-auto">
                  <code>
                    <span className="text-purple-400">export default async function</span> <span className="text-blue-400">handleRequest</span>(req) &#123;{'\n'}
                    {'  '}<span className="text-purple-400">const</span> route = <span className="text-blue-400">getRoute</span>(req);{'\n'}
                    {'\n'}
                    {'  '}<span className="text-purple-400">if</span> (!route) &#123;{'\n'}
                    <span className="inline-block w-full bg-red-500/10 -ml-6 pl-6 text-red-400 font-bold">
                      {'    '}<span className="text-purple-400">throw new</span> <span className="text-orange-400">Error</span>(<span className="text-green-400">&apos;404: The page you seek doesn\&apos;t exist&apos;</span>);
                    </span>
                    {'  '}&#125;{'\n'}
                    &#125;
                  </code>
                </pre>
              </motion.div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <Link
                  href="/"
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-black rounded-full font-display font-bold text-xs tracking-[0.2em] uppercase hover:bg-zinc-200 hover:scale-105 active:scale-95 transition-all shadow-[0_10px_30px_rgba(255,255,255,0.1)]"
                >
                  <div className="flex items-center gap-2">
                    <GitBranch size={14} className="text-red-600" />
                    <span>git checkout home</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white">
                    <Home size={16} />
                  </div>
                </Link>

                <button
                  onClick={() => window.location.reload()}
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold text-xs hover:bg-white/10 transition-all uppercase tracking-widest"
                >
                  <div className="flex items-center gap-2 text-zinc-400 group-hover:text-red-500 transition-colors">
                    <Command size={14} />
                    <span>--force retry</span>
                  </div>
                  <RotateCcw size={16} className="group-hover:rotate-180 transition-transform duration-500" />
                </button>
              </div>
            </div>

            {/* Terminal Footer */}
            <div className="bg-black/20 border-t border-white/5 px-8 py-4 flex items-center justify-between text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5"><BugOff size={10} /> 1 Error</span>
                <span className="flex items-center gap-1.5"><Code2 size={10} /> UTF-8</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>Status: Debugging</span>
              </div>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1.5 }}
            className="mt-12 text-center text-zinc-500 text-xs font-mono uppercase tracking-[0.3em]"
          >
            Stuck Studio Digital Engine // v1.5.4
          </motion.p>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
