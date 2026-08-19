'use client';

import React from 'react';
import { Sparkles, Key, FileText, Cpu, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  onOpenApiKeyModal: () => void;
  apiKeySet: boolean;
  onViewDoc: (doc: 'decisions' | 'tech') => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export default function Navbar({
  onOpenApiKeyModal,
  apiKeySet,
  onViewDoc,
  theme,
  onToggleTheme
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E8D5CE] dark:border-[#262A36] bg-[#FFF8F6]/95 dark:bg-[#0D0E11]/95 backdrop-blur-md transition-colors duration-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4A2545] dark:bg-amber-500 text-white dark:text-[#0D0E11] font-serif font-bold shadow-sm transition-colors">
            <span className="font-serif text-sm italic">S</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-serif text-base font-bold text-[#32102F] dark:text-white tracking-tight transition-colors">
              Stunning
            </span>
            <span className="rounded-full bg-[#FFE9E2] dark:bg-[#1A1D24] px-2.5 py-0.5 font-sans text-xs font-medium text-[#4A2545] dark:text-amber-400 border border-[#E8D5CE] dark:border-[#262A36] transition-colors">
              Builder
            </span>
          </div>
        </div>

        {/* Center Quick Nav / Docs */}
        <nav className="hidden md:flex items-center gap-1.5 bg-[#FFFFFF] dark:bg-[#14161B] px-2 py-1 rounded-full border border-[#E8D5CE] dark:border-[#262A36] shadow-sm transition-colors">
          <button
            onClick={() => onViewDoc('decisions')}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-[#4E444B] dark:text-[#94A3B8] hover:text-[#32102F] dark:hover:text-white rounded-full hover:bg-[#FFE9E2] dark:hover:bg-[#1A1D24] transition"
          >
            <FileText className="h-3.5 w-3.5 text-[#4A2545] dark:text-amber-400" />
            <span>DECISIONS.md</span>
          </button>

          <button
            onClick={() => onViewDoc('tech')}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-[#4E444B] dark:text-[#94A3B8] hover:text-[#32102F] dark:hover:text-white rounded-full hover:bg-[#FFE9E2] dark:hover:bg-[#1A1D24] transition"
          >
            <Cpu className="h-3.5 w-3.5 text-[#A8B79A] dark:text-emerald-400" />
            <span>TECH.md (MCP)</span>
          </button>
        </nav>

        {/* Right Actions: Theme Toggle & API Mode */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E8D5CE] dark:border-[#262A36] bg-[#FFFFFF] dark:bg-[#14161B] text-[#4E444B] dark:text-[#94A3B8] hover:text-[#32102F] dark:hover:text-white hover:border-[#D9A5A0] dark:hover:border-[#383E4F] transition shadow-sm"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-amber-400 transition-transform duration-300 hover:rotate-45" />
            ) : (
              <Moon className="h-4 w-4 text-[#4A2545] transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>

          {/* API Status */}
          <button
            onClick={onOpenApiKeyModal}
            className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium transition duration-150 ${
              apiKeySet
                ? 'border-[#A8B79A] dark:border-emerald-500/40 bg-[#A8B79A]/15 dark:bg-emerald-950/20 text-[#2E4A28] dark:text-emerald-300'
                : 'border-[#E8D5CE] dark:border-[#262A36] bg-[#FFFFFF] dark:bg-[#14161B] text-[#4E444B] dark:text-[#94A3B8] hover:text-[#32102F] dark:hover:text-white shadow-sm'
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                apiKeySet ? 'bg-[#A8B79A] dark:bg-emerald-400 animate-pulse' : 'bg-[#D9A5A0] dark:bg-amber-400'
              }`}
            />
            <span>{apiKeySet ? 'Live Key' : 'Simulation'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
