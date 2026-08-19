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
    <div className="space-y-4">
      {/* 4-Tier Pipeline */}
      <div className="rounded-2xl border border-[#E8D5CE] bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8D5CE]">
          <div>
            <h3 className="font-serif text-sm font-bold text-[#32102F]">
              Application Architecture Flow
            </h3>
            <p className="text-xs text-[#80747B] mt-0.5 font-sans">
              4-Tier Next.js 15 App Router execution topology
            </p>
          </div>
          <span className="font-mono text-[10px] text-[#4A2545] bg-[#FFE9E2] px-2.5 py-0.5 rounded-full border border-[#E8D5CE] font-bold">
            Next.js 15
          </span>
        </div>

        {/* 4 Tiers */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {/* Tier 1: Client */}
          <div className="rounded-xl border border-[#E8D5CE] bg-[#FFF8F6] p-3.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[10px] text-[#80747B] font-mono">
                <span className="font-bold text-[#32102F]">Tier 1</span>
                <Globe className="h-3.5 w-3.5 text-[#80747B]" />
              </div>
              <h4 className="mt-1.5 font-serif text-sm font-bold text-[#32102F]">Edge Client</h4>
              <p className="mt-1 text-xs text-[#4E444B] leading-relaxed font-sans">
                React 19 Server & Client components with SSE listeners.
              </p>
            </div>
            <div className="mt-3 text-[10px] text-[#4A2545] font-mono bg-[#FFE9E2] p-1.5 rounded-lg border border-[#E8D5CE] font-semibold">
              App Router
            </div>
          </div>

          {/* Tier 2: API Orchestrator */}
          <div className="rounded-xl border border-[#E8D5CE] bg-[#FFF8F6] p-3.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[10px] text-[#80747B] font-mono">
                <span className="font-bold text-[#32102F]">Tier 2</span>
                <Server className="h-3.5 w-3.5 text-[#80747B]" />
              </div>
              <h4 className="mt-1.5 font-serif text-sm font-bold text-[#32102F]">Route Handlers</h4>
              <p className="mt-1 text-xs text-[#4E444B] leading-relaxed font-sans">
                Zod-validated Server Actions with idempotency tokens.
              </p>
            </div>
            <div className="mt-3 text-[10px] text-[#4A2545] font-mono bg-[#FFE9E2] p-1.5 rounded-lg border border-[#E8D5CE] font-semibold">
              /api/v1/orchestrate
            </div>
          </div>

          {/* Tier 3: Injected Services */}
          <div className="rounded-xl border border-[#D9A5A0] bg-[#FFE9E2] p-3.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[10px] text-[#4A2545] font-mono">
                <span className="font-bold">Tier 3 (Active)</span>
                <Zap className="h-3.5 w-3.5 text-[#4A2545]" />
              </div>
              <h4 className="mt-1.5 font-serif text-sm font-bold text-[#32102F]">Injected Services</h4>
              <p className="mt-1 text-xs text-[#4E444B] leading-relaxed truncate font-sans">
                {activeIntegrations.length > 0
                  ? activeIntegrations.map(i => i.name).join(', ')
                  : 'Local state handlers'}
              </p>
            </div>
            <div className="mt-3 text-[10px] text-white font-mono bg-[#4A2545] p-1.5 rounded-lg font-bold">
              {activeIntegrations.length} Active Services
            </div>
          </div>

          {/* Tier 4: Telemetry & DB */}
          <div className="rounded-xl border border-[#E8D5CE] bg-[#FFF8F6] p-3.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[10px] text-[#80747B] font-mono">
                <span className="font-bold text-[#32102F]">Tier 4</span>
                <Cpu className="h-3.5 w-3.5 text-[#80747B]" />
              </div>
              <h4 className="mt-1.5 font-serif text-sm font-bold text-[#32102F]">Audit & DB</h4>
              <p className="mt-1 text-xs text-[#4E444B] leading-relaxed font-sans">
                Structured JSON audit logging and telemetry traces.
              </p>
            </div>
            <div className="mt-3 text-[10px] text-[#4A2545] font-mono bg-[#FFE9E2] p-1.5 rounded-lg border border-[#E8D5CE] font-semibold">
              Structured Audit
            </div>
          </div>
        </div>
      </div>

      {/* Generated API Routes Table */}
      <div className="rounded-2xl border border-[#E8D5CE] bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#E8D5CE]">
          <div>
            <h3 className="font-serif text-sm font-bold text-[#32102F]">
              Generated Route Contracts
            </h3>
            <p className="text-xs text-[#80747B] mt-0.5 font-sans">
              Type-safe HTTP route handlers with authorization guards
            </p>
          </div>
          <span className="text-xs font-mono text-[#2E4A28] bg-[#A8B79A]/20 px-2 py-0.5 rounded-full font-bold">
            Validated
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#E8D5CE] text-[#80747B] uppercase font-mono text-[10px]">
              <tr>
                <th className="pb-2">Method</th>
                <th className="pb-2">Endpoint</th>
                <th className="pb-2">Role</th>
                <th className="pb-2">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8D5CE] font-mono text-xs">
              <tr className="hover:bg-[#FFF8F6] transition">
                <td className="py-2.5">
                  <span className="px-2 py-0.5 rounded-full bg-[#A8B79A]/25 text-[#2E4A28] font-bold text-[10px]">
                    POST
                  </span>
                </td>
                <td className="py-2.5 text-[#32102F] font-bold">/api/v1/orchestrate</td>
                <td className="py-2.5 text-[#4E444B] font-sans text-xs">Central Dispatcher</td>
                <td className="py-2.5 text-[#80747B] text-xs">Bearer JWT</td>
              </tr>
              {activeIntegrations.map(integration => (
                <React.Fragment key={integration.id}>
                  {integration.systemContext.apiEndpoints.map((ep, idx) => {
                    const [method, rest] = ep.split(' ');
                    const [path, ...desc] = (rest || '').split(' - ');
                    return (
                      <tr key={idx} className="hover:bg-[#FFF8F6] transition">
                        <td className="py-2.5">
                          <span className="px-2 py-0.5 rounded-full bg-[#FFE9E2] text-[#4A2545] font-bold text-[10px]">
                            {method}
                          </span>
                        </td>
                        <td className="py-2.5 text-[#32102F] font-bold">{path}</td>
                        <td className="py-2.5 text-[#4E444B] font-sans text-xs">{desc.join(' - ') || integration.name}</td>
                        <td className="py-2.5 text-[#80747B] text-xs">
                          {integration.id === 'stripe' ? 'Stripe HMAC' :
                           integration.id === 'shopify' ? 'Shopify SHA256' :
                           integration.id === 'slack' ? 'Slack Secret' :
                           integration.id === 'google-sheets' ? 'Google OAuth2' : 'Supabase RLS'}
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
    </div>
  );
}
