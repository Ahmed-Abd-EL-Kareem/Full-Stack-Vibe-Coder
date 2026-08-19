'use client';

import React from 'react';
import { Sparkles, Key, FileText, Cpu, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenApiKeyModal: () => void;
  apiKeySet: boolean;
  onViewDoc: (doc: 'decisions' | 'tech') => void;
}

export default function Navbar({ onOpenApiKeyModal, apiKeySet, onViewDoc }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E8D5CE] bg-[#FFF8F6]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4A2545] text-white font-serif font-bold shadow-sm">
            <span className="font-serif text-sm italic">S</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-serif text-base font-bold text-[#32102F] tracking-tight">
              Stunning
            </span>
            <span className="rounded-full bg-[#FFE9E2] px-2.5 py-0.5 font-sans text-xs font-medium text-[#4A2545] border border-[#E8D5CE]">
              Builder
            </span>
          </div>
        </div>

        {/* Center Quick Nav / Docs */}
        <nav className="hidden md:flex items-center gap-1.5 bg-[#FFFFFF] px-2 py-1 rounded-full border border-[#E8D5CE] shadow-sm">
          <button
            onClick={() => onViewDoc('decisions')}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-[#4E444B] hover:text-[#32102F] rounded-full hover:bg-[#FFE9E2] transition"
          >
            <FileText className="h-3.5 w-3.5 text-[#4A2545]" />
            <span>DECISIONS.md</span>
          </button>

          <button
            onClick={() => onViewDoc('tech')}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-[#4E444B] hover:text-[#32102F] rounded-full hover:bg-[#FFE9E2] transition"
          >
            <Cpu className="h-3.5 w-3.5 text-[#A8B79A]" />
            <span>TECH.md (MCP)</span>
          </button>
        </nav>

        {/* Right Action: API Mode / Key */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenApiKeyModal}
            className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium transition duration-150 ${
              apiKeySet
                ? 'border-[#A8B79A] bg-[#A8B79A]/15 text-[#2E4A28] hover:bg-[#A8B79A]/25'
                : 'border-[#E8D5CE] bg-[#FFFFFF] text-[#4E444B] hover:text-[#32102F] hover:border-[#D9A5A0] shadow-sm'
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                apiKeySet ? 'bg-[#A8B79A]' : 'bg-[#D9A5A0]'
              }`}
            />
            <span>{apiKeySet ? 'Live Key Active' : 'Simulation Mode'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
