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
      <div className="rounded-2xl border border-[#E5D5CF] dark:border-[#3D2E35] bg-white dark:bg-[#241A1F] p-4 flex flex-wrap items-center justify-between gap-3 shadow-sm dark:shadow-velvet-card transition-colors">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-sm font-bold text-[#2A1525] dark:text-[#F2EDE9]">
              Dynamic Prompt Compiler
            </h3>
            <span className="rounded-full bg-[#4A7A5E]/20 dark:bg-[#4A7A5E]/30 text-[#2E4A28] dark:text-[#7EBF96] border border-[#4A7A5E]/30 dark:border-[#7EBF96]/30 px-2 py-0.5 font-sans text-[10px] font-bold">
              Live Injected
            </span>
          </div>
          <p className="text-xs text-[#5A4550] dark:text-[#A89B9F] mt-0.5 font-sans">
            {selectedIntegrationIds.length} SaaS integration schemas compiled into the system context
          </p>
        </div>

        <button
          onClick={handleCopy}
          className={`flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-sans font-medium transition shadow-sm ${
            copied
              ? 'border-[#4A7A5E] dark:border-[#7EBF96]/40 bg-[#4A7A5E]/20 dark:bg-[#4A7A5E]/30 text-[#2E4A28] dark:text-[#96CCAA]'
              : 'border-[#E5D5CF] dark:border-[#3D2E35] bg-[#FAF7F5] dark:bg-[#2D2025] text-[#5A4550] dark:text-[#A89B9F] hover:text-[#2A1525] dark:hover:text-[#F2EDE9] hover:bg-[#F5EBE8]'
          }`}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-[#2E4A28] dark:text-[#7EBF96]" />
              <span>Copied Prompt</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 text-[#6B2D5B] dark:text-[#C98DB8]" />
              <span>Copy Prompt</span>
            </>
          )}
        </button>
      </div>

      {/* Sub-Tabs */}
      <div className="flex items-center gap-1.5 border-b border-[#E5D5CF] dark:border-[#3D2E35] pb-3 transition-colors">
        <button
          onClick={() => setActiveView('system')}
          className={`rounded-full px-3 py-1 text-xs font-sans transition ${
            activeView === 'system'
              ? 'bg-[#6B2D5B] dark:bg-[#C98DB8] text-white dark:text-[#1A1216] font-semibold shadow-sm'
              : 'text-[#5A4550] dark:text-[#A89B9F] hover:text-[#2A1525] dark:hover:text-[#F2EDE9] hover:bg-[#F5EBE8] dark:hover:bg-[#2D2025]'
          }`}
        >
          System Prompt ({systemPrompt.length})
        </button>
        <button
          onClick={() => setActiveView('metadata')}
          className={`rounded-full px-3 py-1 text-xs font-sans transition ${
            activeView === 'metadata'
              ? 'bg-[#6B2D5B] dark:bg-[#C98DB8] text-white dark:text-[#1A1216] font-semibold shadow-sm'
              : 'text-[#5A4550] dark:text-[#A89B9F] hover:text-[#2A1525] dark:hover:text-[#F2EDE9] hover:bg-[#F5EBE8] dark:hover:bg-[#2D2025]'
          }`}
        >
          Schemas ({activeIntegrations.length})
        </button>
        <button
          onClick={() => setActiveView('user')}
          className={`rounded-full px-3 py-1 text-xs font-sans transition ${
            activeView === 'user'
              ? 'bg-[#6B2D5B] dark:bg-[#C98DB8] text-white dark:text-[#1A1216] font-semibold shadow-sm'
              : 'text-[#5A4550] dark:text-[#A89B9F] hover:text-[#2A1525] dark:hover:text-[#F2EDE9] hover:bg-[#F5EBE8] dark:hover:bg-[#2D2025]'
          }`}
        >
          User Specification
        </button>
      </div>

      {/* Content 1: System Prompt */}
      {activeView === 'system' && (
        <div className="overflow-hidden rounded-2xl border border-[#E5D5CF] dark:border-[#3D2E35] bg-white dark:bg-[#1A1216] shadow-sm dark:shadow-velvet-card transition-colors">
          <div className="border-b border-[#E5D5CF] dark:border-[#3D2E35] bg-[#F5EBE8] dark:bg-[#1F161B] px-4 py-2 text-xs font-mono text-[#80747B] dark:text-[#A89B9F] flex items-center justify-between">
            <span className="font-semibold text-[#2A1525] dark:text-[#F2EDE9]">SYSTEM INSTRUCTIONS</span>
            <span className="text-[#2E4A28] dark:text-[#7EBF96] font-bold">● Active In Context</span>
          </div>
          <pre className="p-4 text-xs font-mono text-[#1F1518] dark:text-[#F2EDE9] overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-[460px]">
            {systemPrompt || '// No prompt compiled yet.'}
          </pre>
        </div>
      )}

      {/* Content 2: Injected Metadata */}
      {activeView === 'metadata' && (
        <div className="space-y-3">
          {activeIntegrations.length === 0 ? (
            <div className="rounded-2xl border border-[#E5D5CF] dark:border-[#3D2E35] bg-white dark:bg-[#241A1F] p-6 text-center text-xs text-[#80747B] dark:text-[#A89B9F] font-sans transition-colors">
              No integrations selected. Select services in the left panel to inspect their injected schema.
            </div>
          ) : (
            activeIntegrations.map(integration => (
              <div key={integration.id} className="rounded-2xl border border-[#E5D5CF] dark:border-[#3D2E35] bg-white dark:bg-[#241A1F] p-4 shadow-sm dark:shadow-velvet-card transition-colors">
                <div className="flex items-center justify-between pb-2 border-b border-[#E5D5CF] dark:border-[#3D2E35]">
                  <span className="font-serif text-sm font-bold text-[#2A1525] dark:text-[#F2EDE9]">{integration.name} Schema</span>
                  <span className="text-xs text-[#2E4A28] dark:text-[#7EBF96] font-bold font-mono">Active</span>
                </div>

                <div className="mt-3 space-y-2 text-xs">
                  <div>
                    <span className="font-bold text-[#2A1525] dark:text-[#F2EDE9]">Pattern:</span>
                    <p className="text-[#5A4550] dark:text-[#A89B9F] mt-0.5 text-xs leading-relaxed font-sans">{integration.systemContext.architecturePattern}</p>
                  </div>

                  <div>
                    <span className="font-bold text-[#2A1525] dark:text-[#F2EDE9]">Endpoints:</span>
                    <ul className="list-disc list-inside text-[#6B2D5B] dark:text-[#C98DB8] mt-0.5 font-mono text-[11px] space-y-0.5">
                      {integration.systemContext.apiEndpoints.map((ep, i) => (
                        <li key={i}>{ep}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="font-bold text-[#2A1525] dark:text-[#F2EDE9]">Security Rules:</span>
                    <ul className="list-disc list-inside text-[#D4764E] dark:text-[#E8996E] mt-0.5 text-xs space-y-0.5 font-sans">
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
        <div className="overflow-hidden rounded-2xl border border-[#E5D5CF] dark:border-[#3D2E35] bg-white dark:bg-[#1A1216] p-5 shadow-sm dark:shadow-velvet-card transition-colors">
          <h4 className="text-xs uppercase font-serif font-bold text-[#80747B] dark:text-[#A89B9F] mb-2">User Prompt Input</h4>
          <p className="text-sm text-[#1F1518] dark:text-[#F2EDE9] leading-relaxed font-sans">{userPrompt || 'N/A'}</p>
        </div>
      )}
    </div>
  );
}
