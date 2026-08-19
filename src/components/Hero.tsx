'use client';

import React from 'react';
import { ArrowRight, Sparkles, Layers, ShieldCheck, Zap } from 'lucide-react';
import { PRESET_PROMPTS } from '@/lib/integrations';

interface HeroProps {
  onSelectPreset: (preset: (typeof PRESET_PROMPTS)[0]) => void;
}

export default function Hero({ onSelectPreset }: HeroProps) {
  return (
    <section className="hero-section pt-7 pb-5 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-5 border-b border-[#E8D5CE] dark:border-[#262A36] transition-colors">
        {/* Title & Elevator */}
        <div className="hero-content">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#FFE9E2] dark:bg-[#1A1D24] px-3.5 py-1 text-xs text-[#4A2545] dark:text-amber-400 border border-[#E8D5CE] dark:border-[#262A36] mb-2 font-medium transition-colors">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4A2545] dark:bg-amber-400" />
            <span>Digital Choreography</span>
            <span className="text-[#D9A5A0] dark:text-[#383E4F]">•</span>
            <span className="font-semibold">Next.js 15 App Router</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#32102F] dark:text-white leading-tight transition-colors">
            Describe it. <span className="italic font-normal text-[#7E5450] dark:text-amber-400">We'll build it.</span>
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#4E444B] dark:text-[#94A3B8] max-w-xl font-sans leading-relaxed transition-colors">
            Select connected services, describe your product, and watch Stunning synthesize the architectural prompt, full-stack route handlers, and an interactive prototype in harmony.
          </p>
        </div>

        {/* Preset Inspiration Pills */}
        <div className="hero-presets flex flex-col sm:flex-row sm:items-center gap-2">
          <span className="text-xs font-medium text-[#80747B] dark:text-[#64748B] shrink-0">Try a preset:</span>
          <div className="flex flex-wrap items-center gap-1.5">
            {PRESET_PROMPTS.map((preset, index) => (
              <button
                key={index}
                onClick={() => onSelectPreset(preset)}
                className="preset-pill flex items-center gap-2 rounded-full border border-[#E8D5CE] dark:border-[#262A36] bg-[#FFFFFF] dark:bg-[#14161B] px-3 py-1 text-xs text-[#4E444B] dark:text-[#94A3B8] hover:border-[#D9A5A0] dark:hover:border-amber-500/50 hover:bg-[#FFE9E2] dark:hover:bg-[#1A1D24] hover:text-[#32102F] dark:hover:text-white transition shadow-sm"
              >
                <span>{preset.title}</span>
                <span className="rounded-full bg-[#FFE9E2] dark:bg-[#222630] px-1.5 py-0.2 text-[10px] font-mono font-bold text-[#4A2545] dark:text-amber-300">
                  {preset.integrations.length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
