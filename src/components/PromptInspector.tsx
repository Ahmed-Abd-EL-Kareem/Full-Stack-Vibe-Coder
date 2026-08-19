'use client';

import React, { useState } from 'react';
import {
  Terminal,
  Copy,
  Check,
  ShieldCheck,
  Zap,
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
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="rounded-2xl border border-[#E8D5CE] dark:border-[#262A36] bg-white dark:bg-[#14161B] p-4 flex flex-wrap items-center justify-between gap-3 shadow-sm transition-colors">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-sm font-bold text-[#32102F] dark:text-white">
              Dynamic Prompt Compiler
            </h3>
            <span className="rounded-full bg-[#A8B79A]/20 dark:bg-emerald-950/40 text-[#2E4A28] dark:text-emerald-400 border border-[#A8B79A]/30 dark:border-emerald-500/30 px-2 py-0.5 font-sans text-[10px] font-bold">
              Live Injected
            </span>
          </div>
          <p className="text-xs text-[#4E444B] dark:text-[#94A3B8] mt-0.5 font-sans">
            {selectedIntegrationIds.length} SaaS integration schemas compiled into the system context
          </p>
        </div>

        <button
          onClick={handleCopy}
          className={`flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-sans font-medium transition shadow-sm ${
            copied
              ? 'border-[#A8B79A] dark:border-emerald-500/40 bg-[#A8B79A]/20 dark:bg-emerald-950/30 text-[#2E4A28] dark:text-emerald-300'
              : 'border-[#E8D5CE] dark:border-[#262A36] bg-[#FFF8F6] dark:bg-[#1A1D24] text-[#4E444B] dark:text-[#94A3B8] hover:text-[#32102F] dark:hover:text-white hover:bg-[#FFE9E2]'
          }`}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-[#2E4A28] dark:text-emerald-400" />
              <span>Copied Prompt</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 text-[#4A2545] dark:text-amber-400" />
              <span>Copy Prompt</span>
            </>
          )}
        </button>
      </div>

      {/* Sub-Tabs */}
      <div className="flex items-center gap-1.5 border-b border-[#E8D5CE] dark:border-[#262A36] pb-3 transition-colors">
        <button
          onClick={() => setActiveView('system')}
          className={`rounded-full px-3 py-1 text-xs font-sans transition ${
            activeView === 'system'
              ? 'bg-[#4A2545] dark:bg-amber-500 text-white dark:text-[#0D0E11] font-semibold shadow-sm'
              : 'text-[#4E444B] dark:text-[#94A3B8] hover:text-[#32102F] dark:hover:text-white hover:bg-[#FFE9E2] dark:hover:bg-[#1A1D24]'
          }`}
        >
          System Prompt ({systemPrompt.length})
        </button>
        <button
          onClick={() => setActiveView('metadata')}
          className={`rounded-full px-3 py-1 text-xs font-sans transition ${
            activeView === 'metadata'
              ? 'bg-[#4A2545] dark:bg-amber-500 text-white dark:text-[#0D0E11] font-semibold shadow-sm'
              : 'text-[#4E444B] dark:text-[#94A3B8] hover:text-[#32102F] dark:hover:text-white hover:bg-[#FFE9E2] dark:hover:bg-[#1A1D24]'
          }`}
        >
          Schemas ({activeIntegrations.length})
        </button>
        <button
          onClick={() => setActiveView('user')}
          className={`rounded-full px-3 py-1 text-xs font-sans transition ${
            activeView === 'user'
              ? 'bg-[#4A2545] dark:bg-amber-500 text-white dark:text-[#0D0E11] font-semibold shadow-sm'
              : 'text-[#4E444B] dark:text-[#94A3B8] hover:text-[#32102F] dark:hover:text-white hover:bg-[#FFE9E2] dark:hover:bg-[#1A1D24]'
          }`}
        >
          User Specification
        </button>
      </div>

      {/* Content 1: System Prompt */}
      {activeView === 'system' && (
        <div className="overflow-hidden rounded-2xl border border-[#E8D5CE] dark:border-[#262A36] bg-white dark:bg-[#090A0D] shadow-sm transition-colors">
          <div className="border-b border-[#E8D5CE] dark:border-[#1E222D] bg-[#FFF1EC] dark:bg-[#101217] px-4 py-2 text-xs font-mono text-[#80747B] dark:text-[#94A3B8] flex items-center justify-between">
            <span className="font-semibold text-[#32102F] dark:text-white">SYSTEM INSTRUCTIONS</span>
            <span className="text-[#2E4A28] dark:text-emerald-400 font-bold">● Active In Context</span>
          </div>
          <pre className="p-4 text-xs font-mono text-[#241915] dark:text-gray-200 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-[460px]">
            {systemPrompt || '// No prompt compiled yet.'}
          </pre>
        </div>
      )}

      {/* Content 2: Injected Metadata */}
      {activeView === 'metadata' && (
        <div className="space-y-3">
          {activeIntegrations.length === 0 ? (
            <div className="rounded-2xl border border-[#E8D5CE] dark:border-[#262A36] bg-white dark:bg-[#14161B] p-6 text-center text-xs text-[#80747B] dark:text-[#94A3B8] font-sans transition-colors">
              No integrations selected. Select services in the left panel to inspect their injected schema.
            </div>
          ) : (
            activeIntegrations.map(integration => (
              <div key={integration.id} className="rounded-2xl border border-[#E8D5CE] dark:border-[#262A36] bg-white dark:bg-[#14161B] p-4 shadow-sm transition-colors">
                <div className="flex items-center justify-between pb-2 border-b border-[#E8D5CE] dark:border-[#262A36]">
                  <span className="font-serif text-sm font-bold text-[#32102F] dark:text-white">{integration.name} Schema</span>
                  <span className="text-xs text-[#2E4A28] dark:text-emerald-400 font-bold font-mono">Active</span>
                </div>

                <div className="mt-3 space-y-2 text-xs">
                  <div>
                    <span className="font-bold text-[#32102F] dark:text-white">Pattern:</span>
                    <p className="text-[#4E444B] dark:text-[#94A3B8] mt-0.5 text-xs leading-relaxed font-sans">{integration.systemContext.architecturePattern}</p>
                  </div>

                  <div>
                    <span className="font-bold text-[#32102F] dark:text-white">Endpoints:</span>
                    <ul className="list-disc list-inside text-[#4A2545] dark:text-amber-400 mt-0.5 font-mono text-[11px] space-y-0.5">
                      {integration.systemContext.apiEndpoints.map((ep, i) => (
                        <li key={i}>{ep}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="font-bold text-[#32102F] dark:text-white">Security Rules:</span>
                    <ul className="list-disc list-inside text-[#7E5450] dark:text-emerald-400/90 mt-0.5 text-xs space-y-0.5 font-sans">
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

      {/* Content 3: User Prompt */}
      {activeView === 'user' && (
        <div className="overflow-hidden rounded-2xl border border-[#E8D5CE] dark:border-[#262A36] bg-white dark:bg-[#090A0D] p-5 shadow-sm transition-colors">
          <h4 className="text-xs uppercase font-serif font-bold text-[#80747B] dark:text-[#94A3B8] mb-2">User Prompt Input</h4>
          <p className="text-sm text-[#241915] dark:text-gray-200 leading-relaxed font-sans">{userPrompt || 'N/A'}</p>
        </div>
      )}
    </div>
  );
}
