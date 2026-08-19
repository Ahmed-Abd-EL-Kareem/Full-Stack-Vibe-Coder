'use client';

import React, { useState } from 'react';
import {
  Play,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  ShoppingBag,
  Mail,
  MessageSquare,
  Table,
  Database,
  Webhook,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  Activity,
  Send
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
  const [logs, setLogs] = useState<Array<{ id: string; msg: string; time: string; type: 'info' | 'success' | 'alert' }>>([
    { id: '1', msg: `Initialized application runtime for "${appName || 'Stunning App'}"`, time: '12:00:01', type: 'info' },
    { id: '2', msg: `Injected dummy contexts: [${selectedIntegrationIds.join(', ') || 'none'}]`, time: '12:00:02', type: 'success' },
  ]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'dashboard' | 'integrations' | 'logs'>('dashboard');

  const addLog = (msg: string, type: 'info' | 'success' | 'alert' = 'info') => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [{ id: Math.random().toString(), msg, time, type }, ...prev]);
  };

  const handleSimulateAction = (integrationId: string) => {
    setIsSimulating(true);
    const target = AVAILABLE_INTEGRATIONS.find(i => i.id === integrationId);
    const targetName = target?.name || integrationId;

    addLog(`[ACTION] User triggered simulation test for ${targetName}...`, 'info');

    setTimeout(() => {
      if (integrationId === 'stripe') {
        addLog(`[STRIPE] ✅ Created mock Checkout Session #cs_test_${Math.floor(Math.random() * 89999 + 10000)} ($49.00 USD)`, 'success');
      } else if (integrationId === 'shopify') {
        addLog(`[SHOPIFY] 🛍️ Synced cart mutation: 1x Item added to headless checkout`, 'success');
      } else if (integrationId === 'gmail') {
        addLog(`[GMAIL] ✉️ Dispatched transactional email to customer@example.com via Gmail API`, 'success');
      } else if (integrationId === 'slack') {
        addLog(`[SLACK] 💬 Posted Block Kit alert to channel #sales-alerts: "New customer signed up!"`, 'success');
      } else if (integrationId === 'google-sheets') {
        addLog(`[SHEETS] 📊 Appended row to Sheet "Leads": [Timestamp, "Jane Doe", "jane@stunning.so", "$499"]`, 'success');
      } else if (integrationId === 'supabase') {
        addLog(`[SUPABASE] 🗄️ Executed Postgres query: 1 record inserted into "projects" table`, 'success');
      } else {
        addLog(`[PIPELINE] ⚡ Dispatched general workflow event across all systems`, 'success');
      }
      setIsSimulating(false);
    }, 600);
  };

  const activeIntegrations = AVAILABLE_INTEGRATIONS.filter(i =>
    selectedIntegrationIds.includes(i.id)
  );

  return (
    <div className="flex flex-col gap-5">
      {/* Simulated Browser Frame */}
      <div className="overflow-hidden rounded-2xl border border-surface-border bg-surface-card shadow-2xl">
        {/* Browser Top Chrome */}
        <div className="flex items-center justify-between border-b border-surface-border bg-[#10131B] px-4 py-3">
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
          </div>

          {/* URL Bar */}
          <div className="flex items-center gap-2 rounded-lg border border-surface-border bg-surface px-3 py-1 text-xs text-gray-400 max-w-sm sm:max-w-md w-full mx-3 truncate">
            <span className="text-emerald-400 font-mono">https://</span>
            <span className="text-gray-200 truncate font-mono">
              {appName ? appName.toLowerCase().replace(/[^a-z0-9]/g, '-') : 'app'}.stunning.preview
            </span>
          </div>

          {/* Mode Pill */}
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-300 border border-emerald-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Live Sandbox</span>
          </div>
        </div>

        {/* Browser Inner Content */}
        <div className="p-5 sm:p-7 bg-gradient-to-b from-[#12151E] to-[#0D0F15] min-h-[420px]">
          {/* App Header Inside Sandbox */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-surface-border">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {appName || 'Generated Application'}
              </h2>
              <p className="text-xs sm:text-sm text-surface-muted mt-1 max-w-xl">
                {userPrompt || 'Interactive full-stack application prototype synthesized by Stunning AI.'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSimulateAction('all')}
                disabled={isSimulating}
                className="flex items-center gap-2 rounded-xl bg-stunning-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-stunning-600/20 hover:bg-stunning-500 transition disabled:opacity-50"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>{isSimulating ? 'Simulating...' : 'Trigger Full Pipeline'}</span>
              </button>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex items-center gap-2 pt-4 pb-5">
            <button
              onClick={() => setActiveSubTab('dashboard')}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                activeSubTab === 'dashboard'
                  ? 'bg-stunning-500/20 text-stunning-300 border border-stunning-500/30'
                  : 'text-surface-muted hover:text-white'
              }`}
            >
              Interactive Control Panel
            </button>
            <button
              onClick={() => setActiveSubTab('integrations')}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                activeSubTab === 'integrations'
                  ? 'bg-stunning-500/20 text-stunning-300 border border-stunning-500/30'
                  : 'text-surface-muted hover:text-white'
              }`}
            >
              Connected Mock Services ({activeIntegrations.length})
            </button>
            <button
              onClick={() => setActiveSubTab('logs')}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                activeSubTab === 'logs'
                  ? 'bg-stunning-500/20 text-stunning-300 border border-stunning-500/30'
                  : 'text-surface-muted hover:text-white'
              }`}
            >
              Realtime Event Stream ({logs.length})
            </button>
          </div>

          {/* SubTab 1: Control Panel */}
          {activeSubTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-xl border border-surface-border bg-surface-card/60 p-4">
                  <div className="flex items-center justify-between text-xs text-surface-muted">
                    <span>Active Services</span>
                    <Activity className="h-3.5 w-3.5 text-stunning-400" />
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-white">{activeIntegrations.length}</span>
                    <span className="text-xs text-emerald-400 font-medium">Ready</span>
                  </div>
                </div>

                <div className="rounded-xl border border-surface-border bg-surface-card/60 p-4">
                  <div className="flex items-center justify-between text-xs text-surface-muted">
                    <span>Simulated Latency</span>
                    <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-white">32ms</span>
                    <span className="text-xs text-emerald-400 font-medium">Edge Speed</span>
                  </div>
                </div>

                <div className="rounded-xl border border-surface-border bg-surface-card/60 p-4">
                  <div className="flex items-center justify-between text-xs text-surface-muted">
                    <span>Security Model</span>
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-white">HMAC-SHA256</span>
                    <span className="text-xs text-stunning-300 font-medium">Verified</span>
                  </div>
                </div>
              </div>

              {/* Interactive Integration Triggers */}
              <div className="rounded-xl border border-surface-border bg-surface-card/40 p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-3">
                  Test Individual Dummy Integrations
                </h3>
                {activeIntegrations.length === 0 ? (
                  <p className="text-xs text-surface-muted italic">
                    No external integrations selected. You can select Stripe, Shopify, Gmail, Slack, or Google Sheets above to test integration handlers.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {activeIntegrations.map(integration => (
                      <button
                        key={integration.id}
                        onClick={() => handleSimulateAction(integration.id)}
                        disabled={isSimulating}
                        className="flex items-center justify-between gap-3 rounded-xl border border-surface-border bg-surface-card p-3 text-left hover:border-stunning-500/50 hover:bg-surface-hover transition group"
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <div
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                            style={{ backgroundColor: `${integration.brandColor}22`, color: integration.brandColor }}
                          >
                            <Sparkles className="h-3.5 w-3.5" />
                          </div>
                          <div className="truncate">
                            <div className="text-xs font-semibold text-white group-hover:text-stunning-300 transition">
                              Test {integration.name}
                            </div>
                            <div className="text-[10px] text-surface-muted truncate">
                              {integration.systemContext.apiEndpoints[0]}
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="h-3.5 w-3.5 text-surface-muted group-hover:text-white group-hover:translate-x-0.5 transition" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SubTab 2: Connected Integrations Details */}
          {activeSubTab === 'integrations' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeIntegrations.map(integration => (
                <div key={integration.id} className="rounded-xl border border-surface-border bg-surface-card/60 p-4">
                  <div className="flex items-center justify-between pb-2 border-b border-surface-border">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">{integration.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-border text-surface-muted">
                        {integration.category}
                      </span>
                    </div>
                    <span className="text-xs text-emerald-400 font-mono">Injected</span>
                  </div>
                  <p className="text-xs text-surface-muted mt-2">{integration.systemContext.role}</p>
                  <div className="mt-3 text-[11px] font-mono text-stunning-300 bg-surface/80 p-2 rounded-lg border border-surface-border">
                    SDK: {integration.systemContext.sdkRecommendation}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SubTab 3: Realtime Logs */}
          {activeSubTab === 'logs' && (
            <div className="rounded-xl border border-surface-border bg-[#0A0C11] p-4 font-mono text-xs max-h-64 overflow-y-auto space-y-1.5">
              {logs.map(log => (
                <div key={log.id} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-surface-muted text-[10px] select-none">[{log.time}]</span>
                  <span
                    className={
                      log.type === 'success'
                        ? 'text-emerald-400'
                        : log.type === 'alert'
                        ? 'text-amber-400'
                        : 'text-gray-300'
                    }
                  >
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
