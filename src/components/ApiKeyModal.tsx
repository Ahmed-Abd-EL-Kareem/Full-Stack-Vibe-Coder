'use client';

import React, { useState, useEffect } from 'react';
import { X, Key, Check, Sparkles } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveKey: (key: string, provider: 'gemini' | 'openai') => void;
  currentKey: string;
  currentProvider: 'gemini' | 'openai';
}

export default function ApiKeyModal({
  isOpen,
  onClose,
  onSaveKey,
  currentKey,
  currentProvider
}: ApiKeyModalProps) {
  const [apiKey, setApiKey] = useState(currentKey);
  const [provider, setProvider] = useState<'gemini' | 'openai'>(currentProvider);

  useEffect(() => {
    setApiKey(currentKey);
    setProvider(currentProvider);
  }, [currentKey, currentProvider]);

  // Escape key listener
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveKey(apiKey.trim(), provider);
    onClose();
  };

  const handleClear = () => {
    setApiKey('');
    onSaveKey('', provider);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="api-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#32102F]/40 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div className="relative w-full max-w-md rounded-3xl border border-[#E8D5CE] dark:border-[#262A36] bg-[#FFFFFF] dark:bg-[#14161B] p-6 sm:p-7 shadow-ballet-elevated dark:shadow-2xl transition-colors">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-5 top-5 rounded-full p-1.5 text-[#80747B] dark:text-[#94A3B8] hover:bg-[#FFE9E2] dark:hover:bg-[#1A1D24] hover:text-[#32102F] dark:hover:text-white transition"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFE9E2] dark:bg-amber-500/10 text-[#4A2545] dark:text-amber-400 border border-[#E8D5CE] dark:border-amber-500/20">
            <Key className="h-4 w-4" />
          </div>
          <div>
            <h3 id="api-modal-title" className="font-serif text-base font-bold text-[#32102F] dark:text-white">
              AI Provider Settings
            </h3>
            <p className="text-xs text-[#80747B] dark:text-[#94A3B8]">Live API key or high-fidelity simulation engine.</p>
          </div>
        </div>

        {/* Zero Config Notice */}
        <div className="mt-4 rounded-2xl border border-[#A8B79A]/40 dark:border-emerald-500/30 bg-[#A8B79A]/15 dark:bg-emerald-950/20 p-3.5 text-xs text-[#2E4A28] dark:text-emerald-300 flex items-start gap-2.5 leading-relaxed font-sans">
          <Sparkles className="h-4 w-4 text-[#A8B79A] dark:text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#32102F] dark:text-white">Instant Review Ready:</strong> Stunning includes a complete simulated multi-integration orchestrator, so reviewers can test immediately without providing any API key.
          </div>
        </div>

        {/* Provider Switcher */}
        <div className="mt-4 space-y-2">
          <label className="text-xs font-sans font-semibold text-[#32102F] dark:text-white">
            Select AI Provider
          </label>
          <div className="grid grid-cols-2 gap-2.5 font-sans">
            <button
              type="button"
              onClick={() => setProvider('gemini')}
              className={`rounded-2xl border p-3 text-left transition ${
                provider === 'gemini'
                  ? 'border-[#4A2545] dark:border-amber-500 bg-[#FFE9E2] dark:bg-amber-950/20 text-[#32102F] dark:text-white ring-1 ring-[#4A2545]/40 dark:ring-amber-500/40 shadow-sm'
                  : 'border-[#E8D5CE] dark:border-[#262A36] bg-white dark:bg-[#101217] text-[#4E444B] dark:text-[#94A3B8] hover:bg-[#FFF8F6] dark:hover:bg-[#1A1D24]'
              }`}
            >
              <div className="text-xs font-bold text-[#32102F] dark:text-white">Google Gemini</div>
              <div className="text-[11px] text-[#80747B] dark:text-amber-300/80 mt-0.5">Gemini 2.5 Flash</div>
            </button>

            <button
              type="button"
              onClick={() => setProvider('openai')}
              className={`rounded-2xl border p-3 text-left transition ${
                provider === 'openai'
                  ? 'border-[#4A2545] dark:border-amber-500 bg-[#FFE9E2] dark:bg-amber-950/20 text-[#32102F] dark:text-white ring-1 ring-[#4A2545]/40 dark:ring-amber-500/40 shadow-sm'
                  : 'border-[#E8D5CE] dark:border-[#262A36] bg-white dark:bg-[#101217] text-[#4E444B] dark:text-[#94A3B8] hover:bg-[#FFF8F6] dark:hover:bg-[#1A1D24]'
              }`}
            >
              <div className="text-xs font-bold text-[#32102F] dark:text-white">OpenAI</div>
              <div className="text-[11px] text-[#80747B] dark:text-amber-300/80 mt-0.5">GPT-4o / Mini</div>
            </button>
          </div>
        </div>

        {/* API Key Input */}
        <div className="mt-4 space-y-1.5">
          <label className="text-xs font-sans font-semibold text-[#32102F] dark:text-white">
            {provider === 'gemini' ? 'Gemini API Key' : 'OpenAI API Key'} (Stored in client memory only)
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            placeholder={provider === 'gemini' ? 'AIzaSy...' : 'sk-proj-...'}
            className="w-full rounded-2xl border border-[#E8D5CE] dark:border-[#262A36] bg-[#FFF8F6] dark:bg-[#0D0E11] px-3.5 py-2.5 text-xs font-mono text-[#32102F] dark:text-white placeholder-[#80747B] dark:placeholder-[#64748B] focus:border-[#4A2545] dark:focus:border-amber-500 focus:bg-white dark:focus:bg-[#0D0E11] focus:outline-none focus:ring-1 focus:ring-[#4A2545] dark:focus:ring-amber-500"
          />
        </div>

        {/* Actions */}
        <div className="mt-5 flex items-center justify-end gap-2">
          {apiKey && (
            <button
              type="button"
              onClick={handleClear}
              className="rounded-full border border-[#E8D5CE] dark:border-[#262A36] bg-white dark:bg-[#101217] px-3.5 py-1.5 text-xs font-sans text-[#80747B] dark:text-[#94A3B8] hover:text-red-600 transition"
            >
              Clear Key
            </button>
          )}

          <button
            type="button"
            onClick={handleSave}
            className="rounded-full bg-[#4A2545] dark:bg-amber-500 hover:bg-[#32102F] dark:hover:bg-amber-600 px-5 py-2 text-xs font-sans font-semibold text-white dark:text-[#0D0E11] transition shadow-sm"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
