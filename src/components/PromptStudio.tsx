'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import {
  Sparkles,
  Loader2,
  SlidersHorizontal,
  Terminal,
  RotateCcw,
  Layers,
  ArrowRight,
  Square,
  Cpu
} from 'lucide-react';
import { AVAILABLE_INTEGRATIONS } from '@/lib/integrations';
import IntegrationPill from './IntegrationPill';

interface PromptStudioProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  selectedIntegrations: string[];
  setSelectedIntegrations: (ids: string[] | ((prev: string[]) => string[])) => void;
  onSubmit: () => void;
  onCancel?: () => void;
  isLoading: boolean;
}

export default function PromptStudio({
  prompt,
  setPrompt,
  selectedIntegrations,
  setSelectedIntegrations,
  onSubmit,
  onCancel,
  isLoading,
}: PromptStudioProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleIntegration = (id: string) => {
    setSelectedIntegrations(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedIntegrations(AVAILABLE_INTEGRATIONS.map(i => i.id));
  };

  const handleClearAll = () => {
    setSelectedIntegrations([]);
  };

  const handleResetDefault = () => {
    setPrompt('Build a SaaS billing and subscription portal with Stripe checkout, automated customer emails via Gmail, and real-time sales alert notifications in Slack.');
    setSelectedIntegrations(['stripe', 'gmail', 'slack']);
  };

  // Keyboard shortcut (⌘+Enter / Ctrl+Enter)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      if (!isLoading && prompt.trim()) {
        onSubmit();
      }
    }
  };

  const activeIntegrations = AVAILABLE_INTEGRATIONS.filter(i =>
    selectedIntegrations.includes(i.id)
  );

  return (
    <div ref={containerRef} className="w-full flex flex-col gap-4">
      <div className="prompt-studio-card rounded-3xl border border-[#E8D5CE] dark:border-[#262A36] bg-[#FFFFFF] dark:bg-[#14161B] p-5 sm:p-6 shadow-ballet-card dark:shadow-solaris-card transition-colors">
        {/* Section 1: Connect Services */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 border-b border-[#E8D5CE] dark:border-[#262A36] transition-colors">
          <div className="flex items-center gap-2">
            <span className="font-serif text-sm font-bold text-[#32102F] dark:text-white flex items-center gap-2 transition-colors">
              <Cpu className="h-4 w-4 text-[#4A2545] dark:text-amber-400" />
              <span>1. Connect Services</span>
            </span>
            <span className="rounded-full bg-[#FFE9E2] dark:bg-[#222630] px-2.5 py-0.5 font-mono text-[10px] text-[#4A2545] dark:text-amber-300 border border-[#E8D5CE] dark:border-[#262A36] font-bold transition-colors">
              {selectedIntegrations.length} Active
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-sans">
            <button
              type="button"
              onClick={handleSelectAll}
              className="text-[#80747B] dark:text-[#94A3B8] hover:text-[#32102F] dark:hover:text-white transition"
            >
              Select All
            </button>
            <span className="text-[#E8D5CE] dark:text-[#262A36]">•</span>
            <button
              type="button"
              onClick={handleClearAll}
              className="text-[#80747B] dark:text-[#94A3B8] hover:text-[#32102F] dark:hover:text-white transition"
            >
              Clear
            </button>
            <span className="text-[#E8D5CE] dark:text-[#262A36]">•</span>
            <button
              type="button"
              onClick={handleResetDefault}
              className="text-[#4A2545] dark:text-amber-400 hover:underline transition font-semibold"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Integration Selector Grid */}
        <div className="integration-grid grid grid-cols-1 sm:grid-cols-2 gap-2.5 py-4">
          {AVAILABLE_INTEGRATIONS.map(integration => (
            <IntegrationPill
              key={integration.id}
              integration={integration}
              isSelected={selectedIntegrations.includes(integration.id)}
              onToggle={toggleIntegration}
            />
          ))}
        </div>

        {/* Section 2: Prompt Specification */}
        <div className="pt-4 border-t border-[#E8D5CE] dark:border-[#262A36] transition-colors">
          <div className="flex items-center justify-between pb-2 text-xs text-[#80747B] dark:text-[#94A3B8]">
            <label htmlFor="prompt-input" className="font-serif text-sm font-bold text-[#32102F] dark:text-white flex items-center gap-2 transition-colors">
              <Terminal className="h-4 w-4 text-[#4A2545] dark:text-amber-400" />
              <span>2. Application Specification</span>
            </label>
            <span className="font-mono text-[11px] text-[#80747B] dark:text-[#64748B]">{prompt.length} chars</span>
          </div>

          <textarea
            id="prompt-input"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={4}
            placeholder="Describe the application you want to build..."
            className="w-full resize-none rounded-2xl border border-[#E8D5CE] dark:border-[#262A36] bg-[#FFF8F6] dark:bg-[#0D0E11] p-3.5 text-xs sm:text-sm text-[#241915] dark:text-[#F8FAFC] placeholder-[#80747B] dark:placeholder-[#64748B] focus:border-[#4A2545] dark:focus:border-amber-500 focus:bg-white dark:focus:bg-[#0D0E11] focus:outline-none focus:ring-1 focus:ring-[#4A2545] dark:focus:ring-amber-500 transition font-sans leading-relaxed shadow-inner"
          />

          {/* Footer Bar */}
          <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 text-xs text-[#4E444B] dark:text-[#94A3B8] font-sans transition-colors">
              <span className="h-2 w-2 rounded-full bg-[#A8B79A] dark:bg-emerald-400" />
              <span className="truncate max-w-[200px] sm:max-w-xs">
                {selectedIntegrations.length > 0 ? (
                  <>Injecting <strong className="text-[#32102F] dark:text-white font-semibold">{activeIntegrations.map(i => i.name).join(', ')}</strong></>
                ) : (
                  'Standalone Next.js core application'
                )}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <span className="hidden xl:inline text-xs font-mono text-[#80747B] dark:text-[#64748B]">
                <kbd className="rounded bg-[#FFE9E2] dark:bg-[#1A1D24] px-1.5 py-0.5 text-[#4A2545] dark:text-white border border-[#E8D5CE] dark:border-[#262A36]">⌘</kbd>+<kbd className="rounded bg-[#FFE9E2] dark:bg-[#1A1D24] px-1.5 py-0.5 text-[#4A2545] dark:text-white border border-[#E8D5CE] dark:border-[#262A36]">↵</kbd>
              </span>

              {isLoading ? (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onCancel}
                    className="flex items-center gap-1.5 rounded-full border border-red-300 dark:border-red-500/40 bg-red-50 dark:bg-red-950/30 px-3 py-2 text-xs font-sans font-medium text-red-700 dark:text-red-300 hover:bg-red-100 transition"
                  >
                    <Square className="h-3 w-3 fill-current" />
                    <span>Cancel</span>
                  </button>

                  <button
                    type="button"
                    disabled
                    className="flex items-center gap-2 rounded-full bg-[#4A2545] dark:bg-amber-600 px-4 py-2 text-xs sm:text-sm font-sans font-semibold text-white opacity-80 cursor-not-allowed shadow-md"
                  >
                    <Loader2 className="h-4 w-4 animate-spin text-white" />
                    <span>Synthesizing...</span>
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={onSubmit}
                  disabled={!prompt.trim()}
                  className="flex items-center gap-2 rounded-full bg-[#4A2545] dark:bg-amber-500 hover:bg-[#32102F] dark:hover:bg-amber-600 active:scale-[0.98] px-5 py-2.5 text-xs sm:text-sm font-sans font-semibold text-white dark:text-[#0D0E11] shadow-md transition disabled:opacity-50 disabled:pointer-events-none"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Synthesize App</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
