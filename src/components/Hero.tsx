'use client';

import React from 'react';
import { ArrowRight, Sparkles, Layers, ShieldCheck, Zap } from 'lucide-react';
import { PRESET_PROMPTS } from '@/lib/integrations';

interface HeroProps {
  onSelectPreset: (preset: (typeof PRESET_PROMPTS)[0]) => void;
}

export default function Hero({ onSelectPreset }: HeroProps) {
  return (
    <section className="pt-8 pb-5 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-5 border-b border-[#E8D5CE]">
        {/* Title & Elevator */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#FFE9E2] px-3.5 py-1 text-xs text-[#4A2545] border border-[#E8D5CE] mb-2 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4A2545]" />
            <span>Digital Choreography</span>
            <span className="text-[#D9A5A0]">•</span>
            <span className="font-semibold">Next.js 15 App Router</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#32102F] leading-tight">
            Describe it. <span className="italic font-normal text-[#7E5450]">We'll build it.</span>
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#4E444B] max-w-xl font-sans leading-relaxed">
            Select connected services, describe your product, and watch Stunning synthesize the architectural prompt, full-stack route handlers, and an interactive prototype in harmony.
          </p>
        </div>

        {/* Preset Inspiration Pills */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <span className="text-xs font-medium text-[#80747B] shrink-0">Try a preset:</span>
          <div className="flex flex-wrap items-center gap-1.5">
            {PRESET_PROMPTS.map((preset, index) => (
              <button
                key={index}
                onClick={() => onSelectPreset(preset)}
                className="flex items-center gap-2 rounded-full border border-[#E8D5CE] bg-[#FFFFFF] px-3 py-1 text-xs text-[#4E444B] hover:border-[#D9A5A0] hover:bg-[#FFE9E2] hover:text-[#32102F] transition shadow-sm"
              >
                <span>{preset.title}</span>
                <span className="rounded-full bg-[#FFE9E2] px-1.5 py-0.2 text-[10px] font-mono font-bold text-[#4A2545]">
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
