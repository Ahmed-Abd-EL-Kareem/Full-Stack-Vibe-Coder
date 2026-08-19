'use client';

import React from 'react';
import { Sparkles, ArrowRight, Wand2 } from 'lucide-react';
import { PRESET_PROMPTS } from '@/lib/integrations';

interface HeroProps {
  onSelectPreset: (preset: (typeof PRESET_PROMPTS)[0]) => void;
}

export default function Hero({ onSelectPreset }: HeroProps) {
  return (
    <section className="hero-section pt-6 pb-2 max-w-5xl mx-auto transition-all">
      <div className="flex flex-col gap-5 pb-5 border-b border-[#E5D5CF] dark:border-[#3D2E35] transition-colors">
        {/* Top Eyebrow Badge */}
        <div className="flex items-center">
          <div className="hero-badge inline-flex items-center gap-2 rounded-full bg-[#F5EBE8] dark:bg-[#2D2025] px-3.5 py-1 text-xs text-[#6B2D5B] dark:text-[#C98DB8] border border-[#E5D5CF] dark:border-[#3D2E35] font-medium transition-colors shadow-sm dark:shadow-velvet-card">
            <span className="h-1.5 w-1.5 rounded-full bg-[#6B2D5B] dark:bg-[#C98DB8] animate-pulse" />
            <span className="font-semibold tracking-wide">Digital Choreography</span>
            <span className="text-[#D4764E] dark:text-[#5A4550]">•</span>
            <span>Next.js 15 App Router</span>
          </div>
        </div>

        {/* Editorial Headline & Subtitle */}
        <div className="space-y-2">
          <h1 className="hero-title font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2A1525] dark:text-[#F2EDE9] leading-[1.15] transition-colors">
            Describe it. <span className="italic font-normal text-[#D4764E] dark:text-[#C98DB8]">We'll build it.</span>
          </h1>
          <p className="hero-subtitle text-sm sm:text-base text-[#5A4550] dark:text-[#A89B9F] max-w-2xl font-sans leading-relaxed transition-colors">
            Select connected services, describe your product, and watch Stunning synthesize the architectural prompt, full-stack route handlers, and an interactive prototype in harmony.
          </p>
        </div>

        {/* Preset Inspiration Pills - Horizontal Flow Row */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 pt-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#80747B] dark:text-[#A89B9F] shrink-0 font-sans">
            <Wand2 className="h-3.5 w-3.5 text-[#D4764E] dark:text-[#C98DB8]" />
            <span>Try a preset:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {PRESET_PROMPTS.map((preset, index) => (
              <button
                key={index}
                onClick={() => onSelectPreset(preset)}
                className="hero-preset-item group flex items-center gap-2 rounded-full border border-[#E5D5CF] dark:border-[#3D2E35] bg-[#FFFFFF] dark:bg-[#241A1F] px-3.5 py-1.5 text-xs text-[#5A4550] dark:text-[#A89B9F] hover:border-[#D4764E] dark:hover:border-[#C98DB8]/50 hover:bg-[#F5EBE8] dark:hover:bg-[#2D2025] hover:text-[#2A1525] dark:hover:text-[#F2EDE9] transition shadow-sm dark:shadow-velvet-card active:scale-[0.98]"
              >
                <span className="font-medium font-sans">{preset.title}</span>
                <span className="rounded-full bg-[#F5EBE8] dark:bg-[#3D2E35] group-hover:bg-[#6B2D5B] dark:group-hover:bg-[#C98DB8] group-hover:text-white dark:group-hover:text-[#1A1216] px-1.5 py-0.5 text-[10px] font-mono font-bold text-[#6B2D5B] dark:text-[#D4A3C8] transition-colors">
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
