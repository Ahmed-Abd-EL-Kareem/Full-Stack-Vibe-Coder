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
    <header className="sticky top-0 z-50 w-full border-b border-[#E5D5CF] dark:border-[#3D2E35] bg-[#FAF7F5]/95 dark:bg-[#1A1216]/95 backdrop-blur-md transition-colors duration-200">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#6B2D5B] dark:bg-[#C98DB8] text-white dark:text-[#1A1216] font-serif font-bold shadow-sm transition-colors">
            <span className="font-serif text-sm italic">S</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-serif text-base font-bold text-[#2A1525] dark:text-[#F2EDE9] tracking-tight transition-colors">
              Stunning
            </span>
            <span className="rounded-full bg-[#F5EBE8] dark:bg-[#2D2025] px-2.5 py-0.5 font-sans text-xs font-medium text-[#6B2D5B] dark:text-[#C98DB8] border border-[#E5D5CF] dark:border-[#3D2E35] transition-colors">
              Builder
            </span>
          </div>
        </div>

        {/* Center Quick Nav / Docs */}
        <nav className="hidden md:flex items-center gap-1.5 bg-[#FFFFFF] dark:bg-[#241A1F] px-2 py-1 rounded-full border border-[#E5D5CF] dark:border-[#3D2E35] shadow-sm dark:shadow-velvet-card transition-colors">
          <button
            onClick={() => onViewDoc('decisions')}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-[#5A4550] dark:text-[#A89B9F] hover:text-[#2A1525] dark:hover:text-[#F2EDE9] rounded-full hover:bg-[#F5EBE8] dark:hover:bg-[#2D2025] transition"
          >
            <FileText className="h-3.5 w-3.5 text-[#6B2D5B] dark:text-[#C98DB8]" />
            <span>DECISIONS.md</span>
          </button>

          <button
            onClick={() => onViewDoc('tech')}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-[#5A4550] dark:text-[#A89B9F] hover:text-[#2A1525] dark:hover:text-[#F2EDE9] rounded-full hover:bg-[#F5EBE8] dark:hover:bg-[#2D2025] transition"
          >
            <Cpu className="h-3.5 w-3.5 text-[#4A7A5E] dark:text-[#7EBF96]" />
            <span>TECH.md (MCP)</span>
          </button>
        </nav>

        {/* Right Actions: Theme Toggle & API Mode */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E5D5CF] dark:border-[#3D2E35] bg-[#FFFFFF] dark:bg-[#241A1F] text-[#5A4550] dark:text-[#A89B9F] hover:text-[#2A1525] dark:hover:text-[#F2EDE9] hover:border-[#D4764E] dark:hover:border-[#5A4550] transition shadow-sm dark:shadow-velvet-card"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-[#C98DB8] transition-transform duration-300 hover:rotate-45" />
            ) : (
              <Moon className="h-4 w-4 text-[#6B2D5B] transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>

          {/* API Status */}
          <button
            onClick={onOpenApiKeyModal}
            className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium transition duration-150 ${
              apiKeySet
                ? 'border-[#4A7A5E] dark:border-[#7EBF96]/40 bg-[#4A7A5E]/15 dark:bg-[#4A7A5E]/20 text-[#2E4A28] dark:text-[#96CCAA]'
                : 'border-[#E5D5CF] dark:border-[#3D2E35] bg-[#FFFFFF] dark:bg-[#241A1F] text-[#5A4550] dark:text-[#A89B9F] hover:text-[#2A1525] dark:hover:text-white shadow-sm dark:shadow-velvet-card'
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                apiKeySet ? 'bg-[#4A7A5E] dark:bg-[#7EBF96] animate-pulse' : 'bg-[#D4764E] dark:bg-[#E8996E]'
              }`}
            />
            <span>{apiKeySet ? 'Live Key' : 'Simulation'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
