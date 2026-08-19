'use client';

import React from 'react';
import { Sparkles, Key, FileText, CheckCircle2, Cpu } from 'lucide-react';

interface NavbarProps {
  onOpenApiKeyModal: () => void;
  apiKeySet: boolean;
  onViewDoc: (doc: 'decisions' | 'tech') => void;
}

export default function Navbar({ onOpenApiKeyModal, apiKeySet, onViewDoc }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-surface-border/80 bg-surface/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-stunning-700 via-stunning-500 to-indigo-400 shadow-lg shadow-stunning-500/20">
            <Sparkles className="h-5 w-5 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-white">Stunning</span>
              <span className="rounded-full bg-stunning-500/10 px-2 py-0.5 text-xs font-semibold text-stunning-300 border border-stunning-500/20">
                Vibe Coder
              </span>
            </div>
          </div>
        </div>

        {/* Navigation & Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Docs Modals */}
          <button
            onClick={() => onViewDoc('decisions')}
            className="hidden sm:flex items-center gap-1.5 rounded-lg border border-surface-border bg-surface-card px-3 py-1.5 text-xs font-medium text-gray-300 hover:text-white hover:border-gray-600 transition"
          >
            <FileText className="h-3.5 w-3.5 text-stunning-400" />
            <span>DECISIONS.md</span>
          </button>

          <button
            onClick={() => onViewDoc('tech')}
            className="hidden sm:flex items-center gap-1.5 rounded-lg border border-surface-border bg-surface-card px-3 py-1.5 text-xs font-medium text-gray-300 hover:text-white hover:border-gray-600 transition"
          >
            <Cpu className="h-3.5 w-3.5 text-emerald-400" />
            <span>TECH.md</span>
          </button>

          {/* API Key / Provider Config */}
          <button
            onClick={onOpenApiKeyModal}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
              apiKeySet
                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20'
                : 'border-surface-border bg-surface-card text-gray-300 hover:text-white hover:border-surface-muted'
            }`}
          >
            {apiKeySet ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                <span className="hidden xs:inline">Live AI Key Active</span>
                <span className="xs:hidden">Live Key</span>
              </>
            ) : (
              <>
                <Key className="h-3.5 w-3.5 text-stunning-400" />
                <span>Simulation / API Key</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
