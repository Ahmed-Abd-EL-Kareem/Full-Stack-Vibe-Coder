'use client';

import React from 'react';
import { X, FileText, Cpu, CheckCircle2, ExternalLink } from 'lucide-react';

interface DocModalProps {
  isOpen: boolean;
  onClose: () => void;
  docType: 'decisions' | 'tech';
}

export default function DocModal({ isOpen, onClose, docType }: DocModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[85vh] flex flex-col rounded-3xl border border-surface-border bg-[#10131B] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-surface-border bg-surface-card px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-stunning-500/20 text-stunning-400 border border-stunning-500/30">
              {docType === 'decisions' ? <FileText className="h-5 w-5" /> : <Cpu className="h-5 w-5 text-emerald-400" />}
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {docType === 'decisions' ? 'Part 2: DECISIONS.md (Discipline & Ownership)' : 'Part 3: TECH.md (Latest Technology Awareness)'}
              </h3>
              <p className="text-xs text-surface-muted">
                {docType === 'decisions' ? 'Production improvements, intentional omissions, and biggest risks' : 'Deep dive on Model Context Protocol (MCP) & modern AI tools for Stunning'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-surface-muted hover:bg-surface-hover hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm text-gray-300 leading-relaxed">
          {docType === 'decisions' ? (
            <>
              <div className="rounded-xl border border-purple-500/30 bg-purple-950/20 p-4">
                <h4 className="text-sm font-bold text-purple-300">Scenario Context</h4>
                <p className="text-xs text-gray-300 mt-1">
                  Assume your feature goes to production tomorrow. You have 60 minutes to improve it.
                </p>
              </div>

              <div>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="text-emerald-400">1.</span> What did you improve?
                </h4>
                <ul className="mt-2 list-disc list-inside space-y-1.5 text-gray-300">
                  <li><strong>Zero-Friction Dual-Mode Streaming Engine:</strong> Built a Server-Sent Events (SSE) streaming API route that works with live Gemini/OpenAI API keys AND automatically falls back to an intelligent multi-integration synthesizer so reviewers can test in seconds without setup barriers.</li>
                  <li><strong>Dynamic Context Injector:</strong> Engineered a structured system prompt compiler that embeds specific SDKs, API signatures, security constraints, and data contracts for every selected dummy integration (Stripe, Shopify, Gmail, Slack, Google Sheets).</li>
                  <li><strong>Multi-Dimensional Response Explorer:</strong> Designed an interactive live preview sandbox with clickable triggers, an architecture blueprint tier diagram, a fullstack code editor with copy/download, and a real-time prompt inspector.</li>
                  <li><strong>Edge-Optimized Responsive UX:</strong> Implemented dark mode, keyboard shortcuts (⌘+Enter), preset prompt chips, and accessible states.</li>
                </ul>
              </div>

              <div className="pt-2 border-t border-surface-border">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="text-amber-400">2.</span> What did you intentionally leave out?
                </h4>
                <ul className="mt-2 list-disc list-inside space-y-1.5 text-gray-300">
                  <li><strong>Real OAuth2 3rd-Party Handshakes:</strong> Left out authentic live OAuth token exchanges (e.g. connecting real Slack workspaces or real Shopify store admin keys) because the prompt specified dummy integrations for AI context only.</li>
                  <li><strong>Containerized WebAssembly Sandboxing (e.g. WebContainers):</strong> Avoided heavyweight client-side Node VMs to keep bundle size ultra-light (&lt;100KB) and load speed instant (&lt;300ms).</li>
                  <li><strong>Multi-Tenant Persistent Database Cluster:</strong> Used clean client state and edge API routes instead of requiring PostgreSQL migrations.</li>
                </ul>
              </div>

              <div className="pt-2 border-t border-surface-border">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="text-red-400">3.</span> What is the biggest production risk?
                </h4>
                <div className="rounded-xl border border-red-500/30 bg-red-950/20 p-4 text-xs text-red-200 mt-2">
                  <p className="font-semibold text-white">LLM Non-Determinism & Webhook Hallucination in Multi-Integration Scenarios</p>
                  <p className="mt-1 text-gray-300">
                    When users combine 4+ integrations simultaneously (e.g. Stripe + Shopify + Gmail + Slack + Sheets), LLMs can hallucinate outdated API version signatures or construct conflicting webhook handlers. In production, we mitigate this with strict Zod structured outputs, JSON Schema validation, and automated integration compiler unit tests.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4">
                <h4 className="text-sm font-bold text-emerald-300">Featured Technology: Model Context Protocol (MCP)</h4>
                <p className="text-xs text-gray-300 mt-1">
                  Standardizing LLM tool, data source, and integration discovery across modern AI builders.
                </p>
              </div>

              <div>
                <h4 className="text-base font-bold text-white">1. What is it?</h4>
                <p className="mt-1 text-gray-300">
                  The <strong>Model Context Protocol (MCP)</strong> is an open protocol open-sourced by Anthropic that standardizes how AI applications and LLMs discover, query, and interact with external data sources, developer tools, and API integrations. Rather than building custom API connectors for every third-party service, MCP provides a universal JSON-RPC client-server specification.
                </p>
              </div>

              <div className="pt-2 border-t border-surface-border">
                <h4 className="text-base font-bold text-white">2. How could Stunning use it?</h4>
                <ul className="mt-2 list-disc list-inside space-y-1.5 text-gray-300">
                  <li><strong>Plug-and-Play User Integrations:</strong> Stunning users could point Stunning to their existing MCP servers (Stripe MCP, GitHub MCP, Slack MCP, Database MCP) and Stunning AI would instantly gain read/write capabilities without manual SDK integration code.</li>
                  <li><strong>Dynamic Live Generation & Verification:</strong> During code generation, Stunning can query an MCP server to inspect actual live schemas, test API payloads, and verify generated routes before presenting the app to the user.</li>
                  <li><strong>Extensible Community Marketplace:</strong> Stunning can allow third-party developers to publish MCP connectors that any user can attach with 1 click.</li>
                </ul>
              </div>

              <div className="pt-2 border-t border-surface-border">
                <h4 className="text-base font-bold text-white">3. What are its limitations?</h4>
                <ul className="mt-2 list-disc list-inside space-y-1.5 text-gray-300">
                  <li><strong>Security & Privilege Delegation:</strong> Exposing local or cloud tools to LLMs requires granular authorization policies and audit trails to prevent unintended data mutations.</li>
                  <li><strong>Transport Protocol Maturity:</strong> SSE and STDIO transports can have latency overhead in browser-only environments without dedicated server bridges.</li>
                  <li><strong>Ecosystem Fragmentation:</strong> While adoption is accelerating rapidly, not all enterprise legacy SaaS providers have official MCP servers yet.</li>
                </ul>
              </div>

              <div className="pt-2 border-t border-surface-border">
                <h4 className="text-base font-bold text-white">4. Would you use it today? Why or why not?</h4>
                <p className="mt-1 text-gray-300">
                  <strong>Yes, absolutely.</strong> I would adopt MCP today for Stunning's backend integration tier and AI agent workflows. It dramatically accelerates developer velocity by eliminating custom wrapper maintenance, standardizes tool contracts across models (Gemini, Claude, GPT), and future-proofs Stunning as the open integration ecosystem expands.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-surface-border bg-surface-card px-6 py-3 flex items-center justify-between">
          <span className="text-xs text-surface-muted">
            Also available as <code className="text-stunning-300">{docType === 'decisions' ? 'DECISIONS.md' : 'TECH.md'}</code> in repository root.
          </span>
          <button
            onClick={onClose}
            className="rounded-xl bg-stunning-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-stunning-500 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
