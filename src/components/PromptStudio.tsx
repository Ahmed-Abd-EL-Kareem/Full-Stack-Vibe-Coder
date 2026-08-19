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
  const cardRef = useRef<HTMLDivElement>(null);
  const pulseTweenRef = useRef<gsap.core.Tween | null>(null);

  // GSAP pulse animation while streaming
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isLoading && cardRef.current && !prefersReducedMotion) {
      pulseTweenRef.current = gsap.to(cardRef.current, {
        borderColor: '#C98DB8',
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
    } else {
      if (pulseTweenRef.current) {
        pulseTweenRef.current.kill();
        pulseTweenRef.current = null;
        if (cardRef.current) {
          gsap.set(cardRef.current, { clearProps: 'borderColor' });
        }
      }
    }
    return () => {
      if (pulseTweenRef.current) pulseTweenRef.current.kill();
    };
  }, [isLoading]);

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
    <div className="w-full flex flex-col gap-4">
      <div ref={cardRef} className="prompt-studio-card rounded-3xl border border-[#E5D5CF] dark:border-[#3D2E35] bg-[#FFFFFF] dark:bg-[#241A1F] p-5 sm:p-6 md:p-7 shadow-ballet-card dark:shadow-velvet-card transition-colors">
        {/* Section 1: Connect Services */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 border-b border-[#E5D5CF] dark:border-[#3D2E35] transition-colors">
          <div className="flex items-center gap-2">
            <span className="font-serif text-sm font-bold text-[#2A1525] dark:text-[#F2EDE9] flex items-center gap-2 transition-colors">
              <Cpu className="h-4 w-4 text-[#6B2D5B] dark:text-[#C98DB8]" />
              <span>1. Connect Services</span>
            </span>
            <span className="rounded-full bg-[#F5EBE8] dark:bg-[#3D2E35] px-2.5 py-0.5 font-mono text-[10px] text-[#6B2D5B] dark:text-[#D4A3C8] border border-[#E5D5CF] dark:border-[#3D2E35] font-bold transition-colors">
              {selectedIntegrations.length} Active
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-sans">
            <button
              type="button"
              onClick={handleSelectAll}
              className="text-[#80747B] dark:text-[#A89B9F] hover:text-[#2A1525] dark:hover:text-white transition"
            >
              Select All
            </button>
            <span className="text-[#E5D5CF] dark:text-[#3D2E35]">•</span>
            <button
              type="button"
              onClick={handleClearAll}
              className="text-[#80747B] dark:text-[#A89B9F] hover:text-[#2A1525] dark:hover:text-white transition"
            >
              Clear
            </button>
            <span className="text-[#E5D5CF] dark:text-[#3D2E35]">•</span>
            <button
              type="button"
              onClick={handleResetDefault}
              className="text-[#6B2D5B] dark:text-[#C98DB8] hover:underline transition font-semibold"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Integration Selector Grid - Responsive 3 Columns on Large Screens */}
        <div className="integration-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 py-4">
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
        <div className="pt-4 border-t border-[#E5D5CF] dark:border-[#3D2E35] transition-colors">
          <div className="flex items-center justify-between pb-2 text-xs text-[#80747B] dark:text-[#A89B9F]">
            <label htmlFor="prompt-input" className="font-serif text-sm font-bold text-[#2A1525] dark:text-[#F2EDE9] flex items-center gap-2 transition-colors">
              <Terminal className="h-4 w-4 text-[#6B2D5B] dark:text-[#C98DB8]" />
              <span>2. Application Specification</span>
            </label>
            <span className="font-mono text-[11px] text-[#80747B] dark:text-[#7A6B70]">{prompt.length} chars</span>
          </div>

          <textarea
            id="prompt-input"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={4}
            placeholder="Describe the application you want to build (e.g. Build a SaaS billing portal with Stripe checkout, automated Gmail customer notifications, and real-time sales alerts in Slack)..."
            className="w-full resize-none rounded-2xl border border-[#E5D5CF] dark:border-[#3D2E35] bg-[#FAF7F5] dark:bg-[#1A1216] p-4 text-xs sm:text-sm text-[#1F1518] dark:text-[#F2EDE9] placeholder-[#80747B] dark:placeholder-[#7A6B70] focus:border-[#6B2D5B] dark:focus:border-[#C98DB8] focus:bg-white dark:focus:bg-[#1A1216] focus:outline-none focus:ring-1 focus:ring-[#6B2D5B] dark:focus:ring-[#C98DB8] transition font-sans leading-relaxed shadow-inner"
          />

          {/* Footer Bar */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 text-xs text-[#5A4550] dark:text-[#A89B9F] font-sans transition-colors">
              <span className="h-2 w-2 rounded-full bg-[#4A7A5E] dark:bg-[#7EBF96]" />
              <span className="truncate max-w-[200px] sm:max-w-md">
                {selectedIntegrations.length > 0 ? (
                  <>Injecting <strong className="text-[#2A1525] dark:text-[#F2EDE9] font-semibold">{activeIntegrations.map(i => i.name).join(', ')}</strong></>
                ) : (
                  'Standalone Next.js core application'
                )}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-xs font-mono text-[#80747B] dark:text-[#7A6B70]">
                <kbd className="rounded bg-[#F5EBE8] dark:bg-[#2D2025] px-1.5 py-0.5 text-[#6B2D5B] dark:text-white border border-[#E5D5CF] dark:border-[#3D2E35]">⌘</kbd>+<kbd className="rounded bg-[#F5EBE8] dark:bg-[#2D2025] px-1.5 py-0.5 text-[#6B2D5B] dark:text-white border border-[#E5D5CF] dark:border-[#3D2E35]">↵</kbd>
              </span>

              {isLoading ? (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onCancel}
                    className="flex items-center gap-1.5 rounded-full border border-red-300 dark:border-red-500/40 bg-red-50 dark:bg-red-950/30 px-3.5 py-2 text-xs font-sans font-medium text-red-700 dark:text-red-300 hover:bg-red-100 transition"
                  >
                    <Square className="h-3 w-3 fill-current" />
                    <span>Cancel</span>
                  </button>

                  <button
                    type="button"
                    disabled
                    className="flex items-center gap-2 rounded-full bg-[#6B2D5B] dark:bg-[#6B2D5B] px-5 py-2.5 text-xs sm:text-sm font-sans font-semibold text-white opacity-80 cursor-not-allowed shadow-md"
                  >
                    <Loader2 className="h-4 w-4 animate-spin text-white" />
                    <span>Synthesizing Studio...</span>
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={onSubmit}
                  disabled={!prompt.trim()}
                  className="flex items-center gap-2 rounded-full bg-[#6B2D5B] dark:bg-[#C98DB8] hover:bg-[#2A1525] dark:hover:bg-[#B07AA5] active:scale-[0.98] px-6 py-2.5 text-xs sm:text-sm font-sans font-semibold text-white dark:text-[#1A1216] shadow-md transition disabled:opacity-50 disabled:pointer-events-none"
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
