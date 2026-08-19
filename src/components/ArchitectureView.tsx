'use client';

import React from 'react';
import {
  Layers,
  ArrowRight,
  ShieldCheck,
  Server,
  Lock,
  Zap,
  Globe,
  Database,
  Cpu
} from 'lucide-react';
import { AVAILABLE_INTEGRATIONS } from '@/lib/integrations';

interface ArchitectureViewProps {
  selectedIntegrationIds: string[];
  mockResult?: any;
}

export default function ArchitectureView({
  selectedIntegrationIds,
  mockResult,
}: ArchitectureViewProps) {
  const activeIntegrations = AVAILABLE_INTEGRATIONS.filter(i =>
    selectedIntegrationIds.includes(i.id)
  );

  return (
    <div className="space-y-6">
      {/* Visual Pipeline Flow */}
      <div className="rounded-2xl border border-surface-border bg-surface-card p-5 sm:p-6">
        <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-200">
          <Layers className="h-4 w-4 text-stunning-400" />
          <span>Full-Stack Architecture & Data Pipeline</span>
        </h3>
        <p className="mt-1 text-xs text-surface-muted">
          Multi-tier execution lifecycle for Next.js 15 App Router with active integration services.
        </p>

        {/* Tier Cards */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-3 relative">
          {/* Tier 1: Client */}
          <div className="rounded-xl border border-surface-border bg-[#10131C] p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-surface-muted font-mono">
                <span>TIER 1</span>
                <Globe className="h-3.5 w-3.5 text-blue-400" />
              </div>
              <h4 className="mt-2 text-sm font-bold text-white">Edge Client</h4>
              <p className="mt-1 text-[11px] text-surface-muted">
                React 19 Server & Client Components with optimistic UI and SSE stream consumers.
              </p>
            </div>
            <div className="mt-3 text-[10px] text-blue-300 font-mono bg-blue-950/40 p-1.5 rounded border border-blue-900/40">
              Next.js 15 App Router
            </div>
          </div>

          {/* Tier 2: Server Actions & API */}
          <div className="rounded-xl border border-surface-border bg-[#10131C] p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-surface-muted font-mono">
                <span>TIER 2</span>
                <Server className="h-3.5 w-3.5 text-purple-400" />
              </div>
              <h4 className="mt-2 text-sm font-bold text-white">API Orchestrator</h4>
              <p className="mt-1 text-[11px] text-surface-muted">
                Route Handlers with validation, idempotency guards, and JWT/HMAC token verification.
              </p>
            </div>
            <div className="mt-3 text-[10px] text-purple-300 font-mono bg-purple-950/40 p-1.5 rounded border border-purple-900/40">
              /api/v1/orchestrator
            </div>
          </div>

          {/* Tier 3: Injected Integrations */}
          <div className="rounded-xl border border-stunning-500/30 bg-[#141224] p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-stunning-400 font-mono">
                <span>TIER 3 (ACTIVE)</span>
                <Zap className="h-3.5 w-3.5 text-stunning-400" />
              </div>
              <h4 className="mt-2 text-sm font-bold text-white">Injected Services</h4>
              <p className="mt-1 text-[11px] text-surface-muted">
                {activeIntegrations.length > 0
                  ? activeIntegrations.map(i => i.name).join(', ')
                  : 'Local mock state service'}
              </p>
            </div>
            <div className="mt-3 text-[10px] text-stunning-300 font-mono bg-stunning-950/50 p-1.5 rounded border border-stunning-800/50">
              {activeIntegrations.length} Active Services
            </div>
          </div>

          {/* Tier 4: Background Jobs & Observability */}
          <div className="rounded-xl border border-surface-border bg-[#10131C] p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-surface-muted font-mono">
                <span>TIER 4</span>
                <Cpu className="h-3.5 w-3.5 text-emerald-400" />
              </div>
              <h4 className="mt-2 text-sm font-bold text-white">Telemetry & DB</h4>
              <p className="mt-1 text-[11px] text-surface-muted">
                Structured JSON audit logging, telemetry traces, and persistent event logs.
              </p>
            </div>
            <div className="mt-3 text-[10px] text-emerald-300 font-mono bg-emerald-950/40 p-1.5 rounded border border-emerald-900/40">
              Zero-Trust Guardrails
            </div>
          </div>
        </div>
      </div>

      {/* Generated API Endpoints Table */}
      <div className="rounded-2xl border border-surface-border bg-surface-card p-5 sm:p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-200 mb-4">
          Generated API Route Contracts
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-surface-border text-surface-muted uppercase font-mono text-[10px]">
              <tr>
                <th className="pb-2.5">Method</th>
                <th className="pb-2.5">Endpoint Path</th>
                <th className="pb-2.5">Service / Role</th>
                <th className="pb-2.5">Authentication / Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border/50 font-mono">
              <tr>
                <td className="py-2.5 text-emerald-400 font-bold">POST</td>
                <td className="py-2.5 text-white">/api/v1/orchestrate</td>
                <td className="py-2.5 text-gray-300 font-sans">Central Pipeline Dispatcher</td>
                <td className="py-2.5 text-purple-300">Bearer JWT / Session</td>
              </tr>
              {activeIntegrations.map(integration => (
                <React.Fragment key={integration.id}>
                  {integration.systemContext.apiEndpoints.map((ep, idx) => {
                    const [method, rest] = ep.split(' ');
                    const [path, ...desc] = (rest || '').split(' - ');
                    return (
                      <tr key={idx}>
                        <td className="py-2.5 text-indigo-400 font-bold">{method}</td>
                        <td className="py-2.5 text-white">{path}</td>
                        <td className="py-2.5 text-gray-300 font-sans">{desc.join(' - ') || integration.name}</td>
                        <td className="py-2.5 text-stunning-300">
                          {integration.id === 'stripe' ? 'Stripe HMAC Signature' :
                           integration.id === 'shopify' ? 'Shopify SHA256 HMAC' :
                           integration.id === 'slack' ? 'Slack Signature Secret' :
                           integration.id === 'google-sheets' ? 'Google OAuth2 Service Acc' : 'Service Role Key'}
                        </td>
                      </tr>
                    );
                  })}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Security & Reliability Checklist */}
      <div className="rounded-2xl border border-surface-border bg-surface-card p-5 sm:p-6">
        <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-200 mb-3">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>Security, Reliability & Production Hardening</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-300">
          <div className="flex items-start gap-2.5 rounded-xl bg-surface p-3 border border-surface-border">
            <Lock className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white">Zero Client Secret Leakage:</span> API keys and webhook signing secrets are exclusively accessed within server-side Node.js/Edge handlers.
            </div>
          </div>
          <div className="flex items-start gap-2.5 rounded-xl bg-surface p-3 border border-surface-border">
            <Zap className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white">Idempotency & Replay Protection:</span> Webhook events check idempotency tokens in Redis/Postgres before processing financial or communication triggers.
            </div>
          </div>
          <div className="flex items-start gap-2.5 rounded-xl bg-surface p-3 border border-surface-border">
            <Server className="h-4 w-4 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white">Graceful Degradation:</span> If an external service rate limits or times out, the orchestrator triggers exponential backoff retries.
            </div>
          </div>
          <div className="flex items-start gap-2.5 rounded-xl bg-surface p-3 border border-surface-border">
            <ShieldCheck className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white">Input Sanitization:</span> All user prompts and payload properties are strictly validated with Zod schemas.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
