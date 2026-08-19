'use client';

import React from 'react';
import { Sparkles, Layers, Zap, Bot, ArrowRight } from 'lucide-react';
import { PRESET_PROMPTS } from '@/lib/integrations';

interface HeroProps {
  onSelectPreset: (preset: (typeof PRESET_PROMPTS)[0]) => void;
}

export default function Hero({ onSelectPreset }: HeroProps) {
  return (
    <section className="relative pt-10 pb-8 text-center sm:pt-14 sm:pb-10">
      {/* Top Banner Tag */}
      <div className="inline-flex items-center gap-2 rounded-full border border-stunning-500/30 bg-stunning-500/10 px-3.5 py-1 text-xs font-medium text-stunning-300 shadow-inner">
        <Sparkles className="h-3.5 w-3.5 text-stunning-400 animate-spin" style={{ animationDuration: '6s' }} />
        <span>Full-Stack AI App Generator with System Prompt Context Injection</span>
      </div>

      {/* Main Headline */}
      <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl max-w-4xl mx-auto leading-tight sm:leading-tight">
        Build Full-Stack Apps with{' '}
        <span className="bg-gradient-to-r from-stunning-400 via-indigo-400 to-purple-300 bg-clip-text text-transparent">
          Native Integrations
        </span>
      </h1>

      {/* Subheading */}
      <p className="mt-4 max-w-2xl mx-auto text-base text-gray-400 sm:text-lg">
        Describe what you want to build, select your dummy integrations (Stripe, Shopify, Slack, Gmail, Google Sheets), and let Stunning AI synthesize the architecture, system prompt, and live interactive prototype.
      </p>

      {/* Presets Chips */}
      <div className="mt-8 flex flex-col items-center justify-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-surface-muted">
          ⚡ Try Inspiration Presets:
        </span>
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl px-4">
          {PRESET_PROMPTS.map((preset, index) => (
            <button
              key={index}
              onClick={() => onSelectPreset(preset)}
              className="group flex items-center gap-1.5 rounded-full border border-surface-border bg-surface-card/90 px-3.5 py-1.5 text-xs text-gray-300 hover:border-stunning-500/50 hover:bg-surface-hover hover:text-white transition-all shadow-sm"
            >
              <span>{preset.title}</span>
              <ArrowRight className="h-3 w-3 text-surface-muted group-hover:text-stunning-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
