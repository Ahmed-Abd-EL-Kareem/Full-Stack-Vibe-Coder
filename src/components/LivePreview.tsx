'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Activity,
  Monitor,
  Tablet,
  Smartphone,
  Zap,
  CheckCircle2,
  Lock,
  Server
} from 'lucide-react';
import { AVAILABLE_INTEGRATIONS } from '@/lib/integrations';

interface LivePreviewProps {
  appName: string;
  userPrompt: string;
  selectedIntegrationIds: string[];
  mockResult?: any;
}

export default function LivePreview({
  appName,
  userPrompt,
  selectedIntegrationIds,
  mockResult
}: LivePreviewProps) {
  const [logs, setLogs] = useState<Array<{ id: string; msg: string; time: string; type: 'info' | 'success' | 'alert'; code?: string }>>([
    { id: '1', msg: `Initialized runtime for "${appName || 'Stunning App'}"`, time: '12:00:01', type: 'info' },
    { id: '2', msg: `Injected services: [${selectedIntegrationIds.join(', ') || 'standalone'}]`, time: '12:00:02', type: 'success' },
    { id: '3', msg: `Webhook signature verification & server actions ready`, time: '12:00:03', type: 'info' }
  ]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'dashboard' | 'integrations' | 'logs'>('dashboard');
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const addLog = (msg: string, type: 'info' | 'success' | 'alert' = 'info', code?: string) => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [{ id: Math.random().toString(), msg, time, type, code }, ...prev]);
  };

  const handleSimulateAction = (integrationId: string) => {
    setIsSimulating(true);
    const target = AVAILABLE_INTEGRATIONS.find(i => i.id === integrationId);
    const targetName = target?.name || integrationId;

    addLog(`POST /api/v1/orchestrate -> Triggering ${targetName}...`, 'info', '200 OK');

    setTimeout(() => {
      if (integrationId === 'stripe') {
        addLog(`[Stripe] Created Checkout Session #cs_test_${Math.floor(Math.random() * 89999 + 10000)} ($49.00 USD)`, 'success', '200 OK');
      } else if (integrationId === 'shopify') {
        addLog(`[Shopify] Executed Storefront cart mutation: 1x Item added`, 'success', '200 OK');
      } else if (integrationId === 'gmail') {
        addLog(`[Gmail] Dispatched welcome email to customer@example.com`, 'success', '201 Created');
      } else if (integrationId === 'slack') {
        addLog(`[Slack] Posted notification to channel #sales-alerts`, 'success', '200 OK');
      } else if (integrationId === 'google-sheets') {
        addLog(`[Sheets] Appended row to Sheet "Leads": [${new Date().toISOString().slice(0, 10)}, "Alex Rivers", "Enterprise", "$499"]`, 'success', '200 OK');
      } else if (integrationId === 'supabase') {
        addLog(`[Supabase] Inserted record into "projects" table with RLS`, 'success', '201 Created');
      } else {
        addLog(`[Pipeline] Dispatched event across all ${selectedIntegrationIds.length} connected services`, 'success', '200 OK');
      }
      setIsSimulating(false);
    }, 450);
  };

  const activeIntegrations = AVAILABLE_INTEGRATIONS.filter(i =>
    selectedIntegrationIds.includes(i.id)
  );

  return (
    <div className="flex flex-col gap-3">
      {/* Browser Chrome Container */}
      <div className="overflow-hidden rounded-2xl border border-[#E8D5CE] bg-[#FFFFFF] shadow-sm">
        {/* Browser Top Bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-[#E8D5CE] bg-[#FFF8F6] px-4 py-2.5 gap-2">
          {/* Traffic dots and Viewports */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-[#E8D5CE]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#E8D5CE]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#E8D5CE]" />
            </div>

            <div className="hidden sm:flex items-center gap-1 pl-2 border-l border-[#E8D5CE]">
              <button
                onClick={() => setViewportMode('desktop')}
                className={`p-1 rounded-md transition ${viewportMode === 'desktop' ? 'bg-[#FFE9E2] text-[#4A2545]' : 'text-[#80747B] hover:text-[#32102F]'}`}
                title="Desktop"
              >
                <Monitor className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setViewportMode('tablet')}
                className={`p-1 rounded-md transition ${viewportMode === 'tablet' ? 'bg-[#FFE9E2] text-[#4A2545]' : 'text-[#80747B] hover:text-[#32102F]'}`}
                title="Tablet"
              >
                <Tablet className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setViewportMode('mobile')}
                className={`p-1 rounded-md transition ${viewportMode === 'mobile' ? 'bg-[#FFE9E2] text-[#4A2545]' : 'text-[#80747B] hover:text-[#32102F]'}`}
                title="Mobile"
              >
                <Smartphone className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* URL Address */}
          <div className="flex items-center gap-1.5 rounded-full border border-[#E8D5CE] bg-white px-3 py-1 text-xs text-[#80747B] max-w-xs truncate font-mono shadow-inner">
            <Lock className="h-3 w-3 text-[#A8B79A] shrink-0" />
            <span className="text-[#32102F] text-[11px] truncate font-medium">
              {(appName || 'app').toLowerCase().replace(/[^a-z0-9]/g, '-')}.stunning.live
            </span>
          </div>

          {/* Live Badge */}
          <div className="flex items-center gap-1.5 rounded-full bg-[#A8B79A]/20 px-2.5 py-0.5 text-[10px] font-sans font-bold text-[#2E4A28]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A8B79A]" />
            <span>Interactive Sandbox</span>
          </div>
        </div>

        {/* Browser Inner Workspace */}
        <div
          className={`mx-auto p-5 sm:p-6 bg-[#FFF8F6] min-h-[380px] transition-all duration-200 ${
            viewportMode === 'tablet' ? 'max-w-xl border-x border-[#E8D5CE]' :
            viewportMode === 'mobile' ? 'max-w-xs border-x border-[#E8D5CE]' : 'w-full'
          }`}
        >
          {/* App Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E8D5CE]">
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#32102F] tracking-tight">
                {appName || 'Generated Application'}
              </h3>
              <p className="text-xs text-[#4E444B] mt-0.5 max-w-md font-sans">
                {userPrompt || 'Interactive full-stack application prototype.'}
              </p>
            </div>

            <button
              onClick={() => handleSimulateAction('all')}
              disabled={isSimulating}
              className="flex items-center gap-1.5 rounded-full bg-[#4A2545] hover:bg-[#32102F] px-4 py-1.5 text-xs font-sans font-semibold text-white transition shadow-sm disabled:opacity-50"
            >
              <Zap className="h-3.5 w-3.5 fill-current" />
              <span>{isSimulating ? 'Running...' : 'Dispatch Pipeline'}</span>
            </button>
          </div>

          {/* Sub-Tabs */}
          <div className="flex items-center gap-1.5 pt-3.5 pb-4 border-b border-[#E8D5CE]">
            <button
              onClick={() => setActiveSubTab('dashboard')}
              className={`rounded-full px-3 py-1 text-xs font-sans font-medium transition ${
                activeSubTab === 'dashboard'
                  ? 'bg-[#4A2545] text-white shadow-sm'
                  : 'text-[#4E444B] hover:text-[#32102F]'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveSubTab('integrations')}
              className={`rounded-full px-3 py-1 text-xs font-sans font-medium transition ${
                activeSubTab === 'integrations'
                  ? 'bg-[#4A2545] text-white shadow-sm'
                  : 'text-[#4E444B] hover:text-[#32102F]'
              }`}
            >
              Services ({activeIntegrations.length})
            </button>
            <button
              onClick={() => setActiveSubTab('logs')}
              className={`rounded-full px-3 py-1 text-xs font-sans font-medium transition ${
                activeSubTab === 'logs'
                  ? 'bg-[#4A2545] text-white shadow-sm'
                  : 'text-[#4E444B] hover:text-[#32102F]'
              }`}
            >
              Live Feed ({logs.length})
            </button>
          </div>

          {/* SubTab 1: Control Panel */}
          {activeSubTab === 'dashboard' && (
            <div className="space-y-4 pt-1">
              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-2xl border border-[#E8D5CE] bg-white p-3.5 shadow-sm">
                  <div className="flex items-center justify-between text-xs text-[#80747B] font-sans">
                    <span>Connected Services</span>
                    <Activity className="h-3.5 w-3.5 text-[#4A2545]" />
                  </div>
                  <div className="mt-1.5 flex items-baseline gap-2">
                    <span className="font-serif text-2xl font-bold text-[#32102F]">{activeIntegrations.length}</span>
                    <span className="text-xs text-[#2E4A28] font-semibold">Active</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#E8D5CE] bg-white p-3.5 shadow-sm">
                  <div className="flex items-center justify-between text-xs text-[#80747B] font-sans">
                    <span>Latency</span>
                    <Server className="h-3.5 w-3.5 text-[#80747B]" />
                  </div>
                  <div className="mt-1.5 flex items-baseline gap-2">
                    <span className="font-serif text-2xl font-bold text-[#32102F]">24ms</span>
                    <span className="text-xs text-[#80747B]">Edge</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#E8D5CE] bg-white p-3.5 shadow-sm">
                  <div className="flex items-center justify-between text-xs text-[#80747B] font-sans">
                    <span>Security Model</span>
                    <ShieldCheck className="h-3.5 w-3.5 text-[#A8B79A]" />
                  </div>
                  <div className="mt-1.5 flex items-baseline gap-2">
                    <span className="font-serif text-lg font-bold text-[#32102F]">HMAC</span>
                    <span className="text-xs text-[#2E4A28] font-semibold">Verified</span>
                  </div>
                </div>
              </div>

              {/* Action Cards */}
              <div className="rounded-2xl border border-[#E8D5CE] bg-white p-4 shadow-sm">
                <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-[#32102F] mb-3">
                  Simulated Endpoints
                </h4>

                {activeIntegrations.length === 0 ? (
                  <p className="text-xs text-[#80747B] italic py-1 font-sans">
                    No external services selected. Select Stripe, Shopify, Gmail, Slack, or Sheets in the left deck.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeIntegrations.map(integration => (
                      <button
                        key={integration.id}
                        onClick={() => handleSimulateAction(integration.id)}
                        disabled={isSimulating}
                        className="flex items-center justify-between gap-2.5 rounded-xl border border-[#E8D5CE] bg-[#FFF8F6] p-3 text-left hover:border-[#D9A5A0] hover:bg-[#FFE9E2] transition group shadow-sm"
                      >
                        <div className="truncate">
                          <div className="text-xs font-semibold text-[#32102F] group-hover:text-[#4A2545] transition">
                            Trigger {integration.name}
                          </div>
                          <div className="text-[11px] text-[#80747B] truncate font-mono mt-0.5">
                            {integration.systemContext.apiEndpoints[0]}
                          </div>
                        </div>
                        <ArrowRight className="h-3.5 w-3.5 text-[#80747B] group-hover:text-[#4A2545] transition" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SubTab 2: Connected Integrations */}
          {activeSubTab === 'integrations' && (
            <div className="grid grid-cols-1 gap-3 pt-1">
              {activeIntegrations.map(integration => (
                <div key={integration.id} className="rounded-2xl border border-[#E8D5CE] bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E8D5CE]">
                    <span className="font-serif font-bold text-sm text-[#32102F]">{integration.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FFE9E2] text-[#4A2545] font-bold">
                      {integration.category}
                    </span>
                  </div>
                  <p className="text-xs text-[#4E444B] mt-2 leading-relaxed font-sans">{integration.systemContext.role}</p>
                  <div className="mt-2.5 text-[11px] font-mono text-[#4A2545] bg-[#FFF8F6] p-2 rounded-xl border border-[#E8D5CE]">
                    SDK: {integration.systemContext.sdkRecommendation}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SubTab 3: Realtime Logs */}
          {activeSubTab === 'logs' && (
            <div className="rounded-2xl border border-[#E8D5CE] bg-white p-4 font-mono text-xs max-h-60 overflow-y-auto space-y-2 shadow-inner">
              {logs.map(log => (
                <div key={log.id} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-[#80747B] text-[10px] select-none shrink-0 font-mono">[{log.time}]</span>
                  {log.code && (
                    <span className="rounded-full bg-[#A8B79A]/20 text-[#2E4A28] px-2 text-[10px] border border-[#A8B79A]/30 shrink-0 font-bold">
                      {log.code}
                    </span>
                  )}
                  <span className={log.type === 'success' ? 'text-[#32102F] font-medium' : 'text-[#4E444B]'}>
                    {log.msg}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
