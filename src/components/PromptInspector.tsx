'use client';

import React, { useState } from 'react';
import {
  Terminal,
  Copy,
  Check,
  ShieldCheck,
  Zap,
  Info,
  CheckCircle2,
  Code
} from 'lucide-react';
import { AVAILABLE_INTEGRATIONS } from '@/lib/integrations';

interface PromptInspectorProps {
  systemPrompt: string;
  userPrompt: string;
  selectedIntegrationIds: string[];
  injectedMetadata?: {
    endpoints: string[];
    sdks: string[];
    securityRules: string[];
  };
}

export default function PromptInspector({
  systemPrompt,
  userPrompt,
  selectedIntegrationIds,
  injectedMetadata
}: PromptInspectorProps) {
  const [copied, setCopied] = useState(false);
  const [activeView, setActiveView] = useState<'system' | 'metadata' | 'user'>('system');

  const handleCopy = () => {
    navigator.clipboard.writeText(systemPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeIntegrations = AVAILABLE_INTEGRATIONS.filter(i =>
    selectedIntegrationIds.includes(i.id)
  );

  return (
    <div className="space-y-5">
      {/* Overview Banner */}
      <div className="rounded-2xl border border-stunning-500/30 bg-stunning-950/40 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stunning-600/20 text-stunning-400 border border-stunning-500/30">
            <Terminal className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">System Prompt Dynamic Injection Inspector</h3>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-300 border border-emerald-500/20">
                Verified
              </span>
            </div>
            <p className="text-xs text-stunning-300 mt-0.5">
              Live proof of dynamic context injection: {selectedIntegrationIds.length} dummy integration schemas embedded.
            </p>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
            copied
              ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
              : 'border-surface-border bg-surface text-gray-300 hover:text-white hover:border-gray-600'
          }`}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span>Copied Raw Prompt</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 text-stunning-400" />
              <span>Copy Raw System Prompt</span>
            </>
          )}
        </button>
      </div>

      {/* Sub-Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveView('system')}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
            activeView === 'system'
              ? 'bg-stunning-500/20 text-stunning-300 border border-stunning-500/30'
              : 'text-surface-muted hover:text-white'
          }`}
        >
          Raw Injected System Prompt ({systemPrompt.length} chars)
        </button>
        <button
          onClick={() => setActiveView('metadata')}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
            activeView === 'metadata'
              ? 'bg-stunning-500/20 text-stunning-300 border border-stunning-500/30'
              : 'text-surface-muted hover:text-white'
          }`}
        >
          Injected Schemas & Rules ({activeIntegrations.length})
        </button>
        <button
          onClick={() => setActiveView('user')}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
            activeView === 'user'
              ? 'bg-stunning-500/20 text-stunning-300 border border-stunning-500/30'
              : 'text-surface-muted hover:text-white'
          }`}
        >
          User Prompt Payload
        </button>
      </div>

      {/* Content View */}
      {activeView === 'system' && (
        <div className="overflow-hidden rounded-2xl border border-surface-border bg-[#0A0C11]">
          <div className="border-b border-surface-border bg-[#10131B] px-4 py-2 text-xs font-mono text-surface-muted flex items-center justify-between">
            <span>SYSTEM_INSTRUCTION (Delivered to AI Model)</span>
            <span className="text-emerald-400 font-bold">● Active In Context</span>
          </div>
          <pre className="p-4 text-xs font-mono text-gray-300 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-[500px]">
            {systemPrompt || '// No prompt generated yet. Type a prompt above and click Generate App.'}
          </pre>
        </div>
      )}

      {activeView === 'metadata' && (
        <div className="space-y-4">
          {activeIntegrations.length === 0 ? (
            <div className="rounded-xl border border-surface-border bg-surface-card p-6 text-center text-xs text-surface-muted">
              No integrations selected. Select Stripe, Shopify, Gmail, Slack, or Google Sheets to inspect their injected context.
            </div>
          ) : (
            activeIntegrations.map(integration => (
              <div key={integration.id} className="rounded-2xl border border-surface-border bg-surface-card p-5">
                <div className="flex items-center justify-between pb-3 border-b border-surface-border">
                  <div className="flex items-center gap-2">
                    <div
                      className="flex h-6 w-6 items-center justify-center rounded-lg text-xs"
                      style={{ backgroundColor: `${integration.brandColor}22`, color: integration.brandColor }}
                    >
                      ●
                    </div>
                    <h4 className="text-sm font-bold text-white">{integration.name} System Context</h4>
                  </div>
                  <span className="text-xs text-emerald-400 font-mono">Injected</span>
                </div>

                <div className="mt-3 space-y-3 text-xs">
                  <div>
                    <span className="font-semibold text-gray-300">Architecture Pattern:</span>
                    <p className="text-surface-muted mt-0.5">{integration.systemContext.architecturePattern}</p>
                  </div>

                  <div>
                    <span className="font-semibold text-gray-300">Target Endpoints:</span>
                    <ul className="list-disc list-inside text-surface-muted mt-0.5 font-mono text-[11px]">
                      {integration.systemContext.apiEndpoints.map((ep, i) => (
                        <li key={i}>{ep}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="font-semibold text-gray-300">Security Guidelines:</span>
                    <ul className="list-disc list-inside text-emerald-400/90 mt-0.5 text-[11px]">
                      {integration.systemContext.securityGuidelines.map((rule, i) => (
                        <li key={i}>{rule}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeView === 'user' && (
        <div className="overflow-hidden rounded-2xl border border-surface-border bg-[#0A0C11] p-5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-surface-muted mb-2">User Prompt Input</h4>
          <p className="text-sm text-gray-200 leading-relaxed font-sans">{userPrompt || 'N/A'}</p>
        </div>
      )}
    </div>
  );
}
