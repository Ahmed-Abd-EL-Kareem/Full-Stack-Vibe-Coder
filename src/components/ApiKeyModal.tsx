'use client';

import React, { useState, useEffect } from 'react';
import { X, Key, ShieldCheck, Check, Sparkles, AlertCircle } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl border border-surface-border bg-surface-card p-6 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-lg p-1.5 text-surface-muted hover:bg-surface-hover hover:text-white transition"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stunning-500/20 text-stunning-400 border border-stunning-500/30">
            <Key className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">AI Provider & API Configuration</h3>
            <p className="text-xs text-surface-muted">Optional: Connect live AI model or use instant simulation.</p>
          </div>
        </div>

        {/* Zero-Config Notice */}
        <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-3 text-xs text-emerald-300 flex items-start gap-2">
          <Sparkles className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold">Instant Out-Of-The-Box Mode:</span> You do NOT need an API key to evaluate this project. The app has a high-fidelity streaming synthesizer that demonstrates all functionality seamlessly.
          </div>
        </div>

        {/* Provider Switcher */}
        <div className="mt-5 space-y-3">
          <label className="text-xs font-semibold text-gray-300">Choose AI Provider</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setProvider('gemini')}
              className={`rounded-xl border p-3 text-left transition ${
                provider === 'gemini'
                  ? 'border-stunning-500 bg-stunning-950/60 text-white ring-1 ring-stunning-500/50'
                  : 'border-surface-border bg-surface text-surface-muted hover:text-white'
              }`}
            >
              <div className="text-xs font-bold">Google Gemini</div>
              <div className="text-[10px] text-surface-muted">Gemini 2.5 Flash / 2.0 Flash</div>
            </button>

            <button
              type="button"
              onClick={() => setProvider('openai')}
              className={`rounded-xl border p-3 text-left transition ${
                provider === 'openai'
                  ? 'border-stunning-500 bg-stunning-950/60 text-white ring-1 ring-stunning-500/50'
                  : 'border-surface-border bg-surface text-surface-muted hover:text-white'
              }`}
            >
              <div className="text-xs font-bold">OpenAI</div>
              <div className="text-[10px] text-surface-muted">GPT-4o / GPT-4o-mini</div>
            </button>
          </div>
        </div>

        {/* API Key Input */}
        <div className="mt-4 space-y-2">
          <label className="text-xs font-semibold text-gray-300">
            {provider === 'gemini' ? 'Gemini API Key' : 'OpenAI API Key'} (Stored in browser memory only)
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            placeholder={provider === 'gemini' ? 'AIzaSy...' : 'sk-proj-...'}
            className="w-full rounded-xl border border-surface-border bg-[#0E1017] px-3.5 py-2.5 text-xs text-white placeholder-gray-600 focus:border-stunning-500 focus:outline-none focus:ring-1 focus:ring-stunning-500"
          />
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-end gap-2">
          {apiKey && (
            <button
              type="button"
              onClick={handleClear}
              className="rounded-xl border border-surface-border bg-surface px-4 py-2 text-xs font-medium text-surface-muted hover:text-white transition"
            >
              Clear Key
            </button>
          )}

          <button
            type="button"
            onClick={handleSave}
            className="rounded-xl bg-stunning-600 px-5 py-2 text-xs font-semibold text-white hover:bg-stunning-500 transition shadow-lg shadow-stunning-600/20"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
}
