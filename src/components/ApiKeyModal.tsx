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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2A1525]/40 dark:bg-black/85 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div className="relative w-full max-w-md rounded-3xl border border-[#E5D5CF] dark:border-[#3D2E35] bg-[#FFFFFF] dark:bg-[#241A1F] p-6 sm:p-7 shadow-ballet-elevated dark:shadow-velvet-elevated transition-colors">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-5 top-5 rounded-full p-1.5 text-[#80747B] dark:text-[#A89B9F] hover:bg-[#F5EBE8] dark:hover:bg-[#2D2025] hover:text-[#2A1525] dark:hover:text-[#F2EDE9] transition"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F5EBE8] dark:bg-[#6B2D5B]/20 text-[#6B2D5B] dark:text-[#C98DB8] border border-[#E5D5CF] dark:border-[#C98DB8]/20">
            <Key className="h-4 w-4" />
          </div>
          <div>
            <h3 id="api-modal-title" className="font-serif text-base font-bold text-[#2A1525] dark:text-[#F2EDE9]">
              AI Provider Settings
            </h3>
            <p className="text-xs text-[#80747B] dark:text-[#A89B9F]">Live API key or high-fidelity simulation engine.</p>
          </div>
        </div>

        {/* Zero Config Notice */}
        <div className="mt-4 rounded-2xl border border-[#4A7A5E]/40 dark:border-[#7EBF96]/30 bg-[#4A7A5E]/15 dark:bg-[#4A7A5E]/20 p-3.5 text-xs text-[#2E4A28] dark:text-[#96CCAA] flex items-start gap-2.5 leading-relaxed font-sans">
          <Sparkles className="h-4 w-4 text-[#4A7A5E] dark:text-[#7EBF96] shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#2A1525] dark:text-[#F2EDE9]">Instant Review Ready:</strong> Stunning includes a complete simulated multi-integration orchestrator, so reviewers can test immediately without providing any API key.
          </div>
        </div>

        {/* Provider Switcher */}
        <div className="mt-4 space-y-2">
          <label className="text-xs font-sans font-semibold text-[#2A1525] dark:text-[#F2EDE9]">
            Select AI Provider
          </label>
          <div className="grid grid-cols-2 gap-2.5 font-sans">
            <button
              type="button"
              onClick={() => setProvider('gemini')}
              className={`rounded-2xl border p-3 text-left transition ${
                provider === 'gemini'
                  ? 'border-[#6B2D5B] dark:border-[#C98DB8] bg-[#F5EBE8] dark:bg-[#6B2D5B]/20 text-[#2A1525] dark:text-[#F2EDE9] ring-1 ring-[#6B2D5B]/40 dark:ring-[#C98DB8]/40 shadow-sm'
                  : 'border-[#E5D5CF] dark:border-[#3D2E35] bg-white dark:bg-[#1F161B] text-[#5A4550] dark:text-[#A89B9F] hover:bg-[#FAF7F5] dark:hover:bg-[#2D2025]'
              }`}
            >
              <div className="text-xs font-bold text-[#2A1525] dark:text-[#F2EDE9]">Google Gemini</div>
              <div className="text-[11px] text-[#80747B] dark:text-[#D4A3C8]/80 mt-0.5">Gemini 2.5 Flash</div>
            </button>

            <button
              type="button"
              onClick={() => setProvider('openai')}
              className={`rounded-2xl border p-3 text-left transition ${
                provider === 'openai'
                  ? 'border-[#6B2D5B] dark:border-[#C98DB8] bg-[#F5EBE8] dark:bg-[#6B2D5B]/20 text-[#2A1525] dark:text-[#F2EDE9] ring-1 ring-[#6B2D5B]/40 dark:ring-[#C98DB8]/40 shadow-sm'
                  : 'border-[#E5D5CF] dark:border-[#3D2E35] bg-white dark:bg-[#1F161B] text-[#5A4550] dark:text-[#A89B9F] hover:bg-[#FAF7F5] dark:hover:bg-[#2D2025]'
              }`}
            >
              <div className="text-xs font-bold text-[#2A1525] dark:text-[#F2EDE9]">OpenAI</div>
              <div className="text-[11px] text-[#80747B] dark:text-[#D4A3C8]/80 mt-0.5">GPT-4o / Mini</div>
            </button>
          </div>
        </div>

        {/* API Key Input */}
        <div className="mt-4 space-y-1.5">
          <label className="text-xs font-sans font-semibold text-[#2A1525] dark:text-[#F2EDE9]">
            {provider === 'gemini' ? 'Gemini API Key' : 'OpenAI API Key'} (Stored in client memory only)
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            placeholder={provider === 'gemini' ? 'AIzaSy...' : 'sk-proj-...'}
            className="w-full rounded-2xl border border-[#E5D5CF] dark:border-[#3D2E35] bg-[#FAF7F5] dark:bg-[#1A1216] px-3.5 py-2.5 text-xs font-mono text-[#2A1525] dark:text-[#F2EDE9] placeholder-[#80747B] dark:placeholder-[#7A6B70] focus:border-[#6B2D5B] dark:focus:border-[#C98DB8] focus:bg-white dark:focus:bg-[#1A1216] focus:outline-none focus:ring-1 focus:ring-[#6B2D5B] dark:focus:ring-[#C98DB8]"
          />
        </div>

        {/* Actions */}
        <div className="mt-5 flex items-center justify-end gap-2">
          {apiKey && (
            <button
              type="button"
              onClick={handleClear}
              className="rounded-full border border-[#E5D5CF] dark:border-[#3D2E35] bg-white dark:bg-[#1F161B] px-3.5 py-1.5 text-xs font-sans text-[#80747B] dark:text-[#A89B9F] hover:text-red-600 dark:hover:text-red-400 transition"
            >
              Clear Key
            </button>
          )}

          <button
            type="button"
            onClick={handleSave}
            className="rounded-full bg-[#6B2D5B] dark:bg-[#C98DB8] hover:bg-[#2A1525] dark:hover:bg-[#B07AA5] px-5 py-2 text-xs font-sans font-semibold text-white dark:text-[#1A1216] transition shadow-sm"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
