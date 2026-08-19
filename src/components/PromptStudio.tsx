'use client';

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Loader2,
  CheckCheck,
  RotateCcw,
  SlidersHorizontal,
  Info,
  ShieldCheck,
  Terminal
} from 'lucide-react';
import { AVAILABLE_INTEGRATIONS, Integration } from '@/lib/integrations';
import IntegrationPill from './IntegrationPill';

interface PromptStudioProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  selectedIntegrations: string[];
  setSelectedIntegrations: (ids: string[] | ((prev: string[]) => string[])) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export default function PromptStudio({
  prompt,
  setPrompt,
  selectedIntegrations,
  setSelectedIntegrations,
  onSubmit,
  isLoading,
}: PromptStudioProps) {
  const [showDetails, setShowDetails] = useState(false);

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

  // Allow Cmd+Enter or Ctrl+Enter to submit
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
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
      <div className="relative rounded-3xl border border-surface-border/90 bg-surface-card/95 p-5 sm:p-7 shadow-2xl backdrop-blur-2xl transition-all">
        {/* Glow ambient background behind the card */}
        <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-stunning-500/20 via-transparent to-transparent opacity-50 pointer-events-none" />

        {/* Integration Selection Dock Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-stunning-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-gray-300">
              Select Dummy Integrations
            </span>
            <span className="inline-flex items-center rounded-full bg-stunning-500/20 px-2 py-0.5 text-[11px] font-semibold text-stunning-300 border border-stunning-500/30">
              {selectedIntegrations.length} Active
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={handleSelectAll}
              className="text-surface-muted hover:text-white transition"
            >
              Select All
            </button>
            <span className="text-surface-border">•</span>
            <button
              type="button"
              onClick={handleClearAll}
              className="text-surface-muted hover:text-white transition"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Integration Selector Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pb-6">
          {AVAILABLE_INTEGRATIONS.map(integration => (
            <IntegrationPill
              key={integration.id}
              integration={integration}
              isSelected={selectedIntegrations.includes(integration.id)}
              onToggle={toggleIntegration}
            />
          ))}
        </div>

        {/* Prompt Input Area */}
        <div className="relative">
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={4}
            placeholder="Describe the application you want to build (e.g. 'Build an automated digital checkout flow with Stripe subscriptions, customer notifications in Gmail, and real-time sales logging in Google Sheets')..."
            className="w-full resize-none rounded-2xl border border-surface-border bg-[#0E1017] p-4 text-sm sm:text-base text-gray-100 placeholder-gray-500 focus:border-stunning-500 focus:outline-none focus:ring-2 focus:ring-stunning-500/30 transition shadow-inner font-normal"
          />

          {/* Prompt Bottom Status Bar */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            {/* System Prompt Injection Indicator */}
            <div className="flex items-center gap-2 text-xs text-surface-muted">
              <Terminal className="h-3.5 w-3.5 text-stunning-400" />
              <span>
                {selectedIntegrations.length > 0 ? (
                  <>
                    Injecting <span className="font-semibold text-stunning-300">{selectedIntegrations.length} integration schemas</span> into system prompt
                  </>
                ) : (
                  'No integrations attached (standalone app)'
                )}
              </span>
            </div>

            {/* Submit Button */}
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-[11px] text-surface-muted">
                Press <kbd className="rounded bg-surface-border px-1.5 py-0.5 text-[10px] text-gray-300">⌘</kbd> + <kbd className="rounded bg-surface-border px-1.5 py-0.5 text-[10px] text-gray-300">Enter</kbd>
              </span>

              <button
                type="button"
                onClick={onSubmit}
                disabled={isLoading || !prompt.trim()}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-stunning-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-stunning-600/30 hover:from-stunning-500 hover:to-indigo-500 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-white" />
                    <span>Synthesizing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 text-stunning-200" />
                    <span>Generate App</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
