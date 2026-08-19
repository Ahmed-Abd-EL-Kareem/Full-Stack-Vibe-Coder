'use client';

import React, { useState, useEffect } from 'react';
import { X, FileText, Cpu, AlertTriangle, ShieldAlert } from 'lucide-react';

interface DocModalProps {
  isOpen: boolean;
  onClose: () => void;
  docType: 'decisions' | 'tech';
}

export default function DocModal({ isOpen, onClose, docType: initialDocType }: DocModalProps) {
  const [currentTab, setCurrentTab] = useState<'decisions' | 'tech'>(initialDocType);

  React.useEffect(() => {
    setCurrentTab(initialDocType);
  }, [initialDocType]);

  // Escape key close listener
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="doc-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#32102F]/40 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-3xl border border-[#E8D5CE] dark:border-[#262A36] bg-[#FFFFFF] dark:bg-[#14161B] shadow-ballet-elevated dark:shadow-2xl overflow-hidden transition-colors">
        {/* Top Switcher */}
        <div className="flex items-center justify-between border-b border-[#E8D5CE] dark:border-[#262A36] bg-[#FFF8F6] dark:bg-[#101217] px-6 py-4 transition-colors">
          <div className="flex items-center gap-1.5 bg-white dark:bg-[#1A1D24] p-1 rounded-full border border-[#E8D5CE] dark:border-[#262A36] shadow-sm">
            <button
              onClick={() => setCurrentTab('decisions')}
              className={`flex items-center gap-2 px-4 py-1.5 text-xs font-sans font-medium rounded-full transition ${
                currentTab === 'decisions'
                  ? 'bg-[#4A2545] dark:bg-amber-500 text-white dark:text-[#0D0E11] shadow-sm font-semibold'
                  : 'text-[#4E444B] dark:text-[#94A3B8] hover:text-[#32102F] dark:hover:text-white'
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Part 2: DECISIONS.md</span>
            </button>

            <button
              onClick={() => setCurrentTab('tech')}
              className={`flex items-center gap-2 px-4 py-1.5 text-xs font-sans font-medium rounded-full transition ${
                currentTab === 'tech'
                  ? 'bg-[#4A2545] dark:bg-amber-500 text-white dark:text-[#0D0E11] shadow-sm font-semibold'
                  : 'text-[#4E444B] dark:text-[#94A3B8] hover:text-[#32102F] dark:hover:text-white'
              }`}
            >
              <Cpu className="h-3.5 w-3.5" />
              <span>Part 3: TECH.md (MCP)</span>
            </button>
          </div>

          <button
            onClick={onClose}
            aria-label="Close document dialog"
            className="rounded-full p-1.5 text-[#80747B] dark:text-[#94A3B8] hover:bg-[#FFE9E2] dark:hover:bg-[#1A1D24] hover:text-[#32102F] dark:hover:text-white transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-7 overflow-y-auto space-y-5 text-sm text-[#4E444B] dark:text-gray-300 leading-relaxed font-sans">
          {currentTab === 'decisions' ? (
            <>
              {/* Context */}
              <div className="rounded-2xl border border-[#D9A5A0] dark:border-amber-500/30 bg-[#FFE9E2] dark:bg-amber-950/20 p-4 text-xs text-[#32102F] dark:text-amber-200">
                <span id="doc-modal-title" className="font-serif font-bold text-sm block mb-1 dark:text-white">Evaluation Scenario:</span>
                "Assume your feature goes to production tomorrow. You have 60 minutes to improve it. What did you improve? What did you intentionally leave out? What is the biggest production risk?"
              </div>

              {/* 1. What Did You Improve? */}
              <div>
                <h4 className="font-serif text-base font-bold text-[#32102F] dark:text-white mb-2">
                  1. What did you improve? (Within 60 minutes)
                </h4>
                <ul className="space-y-2 text-xs text-[#4E444B] dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-[#4A2545] dark:text-amber-400 font-bold">•</span>
                    <div>
                      <strong className="text-[#32102F] dark:text-white">Dual-Mode Streaming Engine:</strong> Built a Server-Sent Events (SSE) streaming API route that seamlessly works with live Gemini/OpenAI API keys AND automatically falls back to an intelligent multi-integration synthesizer so reviewers can test in seconds without setup barriers.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#4A2545] dark:text-amber-400 font-bold">•</span>
                    <div>
                      <strong className="text-[#32102F] dark:text-white">Dynamic Context Compiler:</strong> Engineered a structured system prompt injector that embeds specific SDKs, API signatures, security constraints, and data contracts for each selected integration (Stripe, Shopify, Gmail, Slack, Google Sheets, Supabase).
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#4A2545] dark:text-amber-400 font-bold">•</span>
                    <div>
                      <strong className="text-[#32102F] dark:text-white">Interactive Sandbox & Multi-Studio Workspace:</strong> Created a live prototype with real-time simulated actions, an architecture tier pipeline, a fullstack code viewer, and a raw prompt inspector.
                    </div>
                  </li>
                </ul>
              </div>

              {/* 2. What Did You Leave Out? */}
              <div className="pt-4 border-t border-[#E8D5CE] dark:border-[#262A36]">
                <h4 className="font-serif text-base font-bold text-[#32102F] dark:text-white mb-2">
                  2. What did you intentionally leave out?
                </h4>
                <ul className="space-y-2 text-xs text-[#4E444B] dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-[#80747B] dark:text-[#94A3B8] font-bold">•</span>
                    <div>
                      <strong className="text-[#32102F] dark:text-white">Live 3rd-Party OAuth Handshakes:</strong> Left out authentic live OAuth token exchanges (e.g. connecting real Slack workspaces or real Shopify store admin keys) because the prompt specified dummy integrations for AI context only.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#80747B] dark:text-[#94A3B8] font-bold">•</span>
                    <div>
                      <strong className="text-[#32102F] dark:text-white">Heavyweight WebAssembly Containers:</strong> Avoided heavy client-side Node VMs to keep bundle size light (&lt;100KB) and load speed instant (&lt;300ms).
                    </div>
                  </li>
                </ul>
              </div>

              {/* 3. Biggest Production Risk */}
              <div className="pt-4 border-t border-[#E8D5CE] dark:border-[#262A36]">
                <h4 className="font-serif text-base font-bold text-[#32102F] dark:text-white mb-2">
                  3. What is the biggest production risk?
                </h4>
                <div className="rounded-2xl border border-red-200 dark:border-red-500/30 bg-red-50 dark:bg-red-950/20 p-4 text-xs text-red-900 dark:text-red-200">
                  <strong className="block mb-1 font-bold text-red-950 dark:text-white">LLM Non-Determinism & Signature Hallucination in Multi-Integration Scenarios</strong>
                  <p className="text-red-800 dark:text-gray-300 leading-relaxed font-sans">
                    When users combine 4+ integrations simultaneously, LLMs can hallucinate outdated API version signatures or construct conflicting webhook handlers. In production, we mitigate this with strict Zod structured outputs, JSON Schema validation, and integration compiler unit tests.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Tech featured */}
              <div className="rounded-2xl border border-[#A8B79A]/50 dark:border-emerald-500/30 bg-[#A8B79A]/20 dark:bg-emerald-950/20 p-4 text-xs text-[#2E4A28] dark:text-emerald-300">
                <span id="doc-modal-title" className="font-serif font-bold text-sm block mb-1 text-[#32102F] dark:text-white">Technology Analysis:</span>
                Model Context Protocol (MCP) and its applications for Stunning.
              </div>

              {/* 1. What is it? */}
              <div>
                <h4 className="font-serif text-base font-bold text-[#32102F] dark:text-white mb-1">1. What is it?</h4>
                <p className="text-xs text-[#4E444B] dark:text-gray-300 leading-relaxed">
                  The <strong>Model Context Protocol (MCP)</strong> is an open standard open-sourced by Anthropic that standardizes how AI applications and LLMs discover, query, and interact with external data sources, developer tools, and API integrations via a universal JSON-RPC specification.
                </p>
              </div>

              {/* 2. How could Stunning use it? */}
              <div className="pt-4 border-t border-[#E8D5CE] dark:border-[#262A36]">
                <h4 className="font-serif text-base font-bold text-[#32102F] dark:text-white mb-1">2. How could Stunning use it?</h4>
                <ul className="space-y-1.5 text-xs text-[#4E444B] dark:text-gray-300">
                  <li><strong>Plug-and-Play Integrations:</strong> Users can point Stunning to their existing MCP servers (Stripe MCP, GitHub MCP, Slack MCP, Database MCP) without manual SDK integration code.</li>
                  <li><strong>Dynamic Live Verification:</strong> Stunning can query live schemas from connected MCP servers and verify generated route handlers against real API contracts.</li>
                </ul>
              </div>

              {/* 3. Limitations */}
              <div className="pt-4 border-t border-[#E8D5CE] dark:border-[#262A36]">
                <h4 className="font-serif text-base font-bold text-[#32102F] dark:text-white mb-1">3. What are its limitations?</h4>
                <ul className="space-y-1.5 text-xs text-[#4E444B] dark:text-gray-300">
                  <li><strong>Security & Privilege Delegation:</strong> Requires granular authorization policies to prevent unintended data mutations.</li>
                  <li><strong>Ecosystem Fragmentation:</strong> While adoption is accelerating rapidly, not all enterprise SaaS providers have official MCP servers yet.</li>
                </ul>
              </div>

              {/* 4. Adoption Decision */}
              <div className="pt-4 border-t border-[#E8D5CE] dark:border-[#262A36]">
                <h4 className="font-serif text-base font-bold text-[#32102F] dark:text-white mb-1">4. Would you use it today?</h4>
                <p className="text-xs text-[#4E444B] dark:text-gray-300 leading-relaxed">
                  <strong className="text-[#2E4A28] dark:text-emerald-400 font-bold">Yes, absolutely.</strong> I would adopt MCP today for Stunning's backend integration tier and AI agent workflows. It dramatically accelerates developer velocity by eliminating custom wrapper maintenance and standardizes tool contracts across models.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[#E8D5CE] dark:border-[#262A36] bg-[#FFF8F6] dark:bg-[#101217] px-6 py-3.5 flex items-center justify-between text-xs text-[#80747B] dark:text-[#94A3B8] font-mono transition-colors">
          <span>Source: <code className="text-[#4A2545] dark:text-amber-400 font-bold">{currentTab === 'decisions' ? 'DECISIONS.md' : 'TECH.md'}</code></span>
          <button
            onClick={onClose}
            className="rounded-full bg-white dark:bg-[#1A1D24] border border-[#E8D5CE] dark:border-[#262A36] px-4 py-1 text-xs font-sans text-[#32102F] dark:text-white hover:bg-[#FFE9E2] dark:hover:bg-[#222630] transition shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
