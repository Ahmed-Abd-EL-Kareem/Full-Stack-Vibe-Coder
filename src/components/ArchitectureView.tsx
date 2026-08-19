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
      <div className="rounded-2xl border border-[#E5D5CF] dark:border-[#3D2E35] bg-white dark:bg-[#241A1F] p-5 shadow-sm dark:shadow-velvet-card transition-colors">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5D5CF] dark:border-[#3D2E35]">
          <div>
            <h3 className="font-serif text-sm font-bold text-[#2A1525] dark:text-[#F2EDE9]">
              Application Architecture Flow
            </h3>
            <p className="text-xs text-[#80747B] dark:text-[#A89B9F] mt-0.5 font-sans">
              4-Tier Next.js 15 App Router execution topology
            </p>
          </div>
          <span className="font-mono text-[10px] text-[#6B2D5B] dark:text-[#C98DB8] bg-[#F5EBE8] dark:bg-[#2D2025] px-2.5 py-0.5 rounded-full border border-[#E5D5CF] dark:border-[#C98DB8]/20 font-bold">
            Next.js 15
          </span>
        </div>

        {/* 4 Tiers */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {/* Tier 1: Client */}
          <div className="rounded-xl border border-[#E5D5CF] dark:border-[#3D2E35] bg-[#FAF7F5] dark:bg-[#1F161B] p-3.5 flex flex-col justify-between transition-colors">
            <div>
              <div className="flex items-center justify-between text-[10px] text-[#80747B] dark:text-[#A89B9F] font-mono">
                <span className="font-bold text-[#2A1525] dark:text-[#F2EDE9]">Tier 1</span>
                <Globe className="h-3.5 w-3.5 text-[#80747B] dark:text-[#A89B9F]" />
              </div>
              <h4 className="mt-1.5 font-serif text-sm font-bold text-[#2A1525] dark:text-[#F2EDE9]">Edge Client</h4>
              <p className="mt-1 text-xs text-[#5A4550] dark:text-[#A89B9F] leading-relaxed font-sans">
                React 19 Server & Client components with SSE listeners.
              </p>
            </div>
            <div className="mt-3 text-[10px] text-[#6B2D5B] dark:text-[#F2EDE9] font-mono bg-[#F5EBE8] dark:bg-[#2D2025] p-1.5 rounded-lg border border-[#E5D5CF] dark:border-[#3D2E35] font-semibold">
              App Router
            </div>
          </div>

          {/* Tier 2: API Orchestrator */}
          <div className="rounded-xl border border-[#E5D5CF] dark:border-[#3D2E35] bg-[#FAF7F5] dark:bg-[#1F161B] p-3.5 flex flex-col justify-between transition-colors">
            <div>
              <div className="flex items-center justify-between text-[10px] text-[#80747B] dark:text-[#A89B9F] font-mono">
                <span className="font-bold text-[#2A1525] dark:text-[#F2EDE9]">Tier 2</span>
                <Server className="h-3.5 w-3.5 text-[#80747B] dark:text-[#A89B9F]" />
              </div>
              <h4 className="mt-1.5 font-serif text-sm font-bold text-[#2A1525] dark:text-[#F2EDE9]">Route Handlers</h4>
              <p className="mt-1 text-xs text-[#5A4550] dark:text-[#A89B9F] leading-relaxed font-sans">
                Zod-validated Server Actions with idempotency tokens.
              </p>
            </div>
            <div className="mt-3 text-[10px] text-[#6B2D5B] dark:text-[#F2EDE9] font-mono bg-[#F5EBE8] dark:bg-[#2D2025] p-1.5 rounded-lg border border-[#E5D5CF] dark:border-[#3D2E35] font-semibold">
              /api/v1/orchestrate
            </div>
          </div>

          {/* Tier 3: Injected Services */}
          <div className="rounded-xl border border-[#D4764E] dark:border-[#C98DB8]/50 bg-[#F5EBE8] dark:bg-[#6B2D5B]/20 p-3.5 flex flex-col justify-between transition-colors">
            <div>
              <div className="flex items-center justify-between text-[10px] text-[#6B2D5B] dark:text-[#D4A3C8] font-mono">
                <span className="font-bold">Tier 3 (Active)</span>
                <Zap className="h-3.5 w-3.5 text-[#6B2D5B] dark:text-[#C98DB8]" />
              </div>
              <h4 className="mt-1.5 font-serif text-sm font-bold text-[#2A1525] dark:text-[#F2EDE9]">Injected Services</h4>
              <p className="mt-1 text-xs text-[#5A4550] dark:text-[#E8996E] leading-relaxed truncate font-sans">
                {activeIntegrations.length > 0
                  ? activeIntegrations.map(i => i.name).join(', ')
                  : 'Local state handlers'}
              </p>
            </div>
            <div className="mt-3 text-[10px] text-white dark:text-[#D4A3C8] font-mono bg-[#6B2D5B] dark:bg-[#C98DB8]/20 p-1.5 rounded-lg font-bold border dark:border-[#C98DB8]/30">
              {activeIntegrations.length} Active Services
            </div>
          </div>

          {/* Tier 4: Telemetry & DB */}
          <div className="rounded-xl border border-[#E5D5CF] dark:border-[#3D2E35] bg-[#FAF7F5] dark:bg-[#1F161B] p-3.5 flex flex-col justify-between transition-colors">
            <div>
              <div className="flex items-center justify-between text-[10px] text-[#80747B] dark:text-[#A89B9F] font-mono">
                <span className="font-bold text-[#2A1525] dark:text-[#F2EDE9]">Tier 4</span>
                <Cpu className="h-3.5 w-3.5 text-[#80747B] dark:text-[#A89B9F]" />
              </div>
              <h4 className="mt-1.5 font-serif text-sm font-bold text-[#2A1525] dark:text-[#F2EDE9]">Audit & DB</h4>
              <p className="mt-1 text-xs text-[#5A4550] dark:text-[#A89B9F] leading-relaxed font-sans">
                Structured JSON audit logging and telemetry traces.
              </p>
            </div>
            <div className="mt-3 text-[10px] text-[#6B2D5B] dark:text-[#F2EDE9] font-mono bg-[#F5EBE8] dark:bg-[#2D2025] p-1.5 rounded-lg border border-[#E5D5CF] dark:border-[#3D2E35] font-semibold">
              Structured Audit
            </div>
          </div>
        </div>
      </div>

      {/* Generated API Routes Table */}
      <div className="rounded-2xl border border-[#E5D5CF] dark:border-[#3D2E35] bg-white dark:bg-[#241A1F] p-5 shadow-sm dark:shadow-velvet-card transition-colors">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#E5D5CF] dark:border-[#3D2E35]">
          <div>
            <h3 className="font-serif text-sm font-bold text-[#2A1525] dark:text-[#F2EDE9]">
              Generated Route Contracts
            </h3>
            <p className="text-xs text-[#80747B] dark:text-[#A89B9F] mt-0.5 font-sans">
              Type-safe HTTP route handlers with authorization guards
            </p>
          </div>
          <span className="text-xs font-mono text-[#2E4A28] dark:text-[#7EBF96] bg-[#4A7A5E]/20 dark:bg-[#4A7A5E]/30 px-2 py-0.5 rounded-full font-bold">
            Validated
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#E5D5CF] dark:border-[#3D2E35] text-[#80747B] dark:text-[#A89B9F] uppercase font-mono text-[10px]">
              <tr>
                <th className="pb-2">Method</th>
                <th className="pb-2">Endpoint</th>
                <th className="pb-2">Role</th>
                <th className="pb-2">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5D5CF] dark:divide-[#3D2E35] font-mono text-xs">
              <tr className="hover:bg-[#FAF7F5] dark:hover:bg-[#2D2025] transition">
                <td className="py-2.5">
                  <span className="px-2 py-0.5 rounded-full bg-[#4A7A5E]/25 dark:bg-[#4A7A5E]/30 text-[#2E4A28] dark:text-[#7EBF96] font-bold text-[10px] border dark:border-[#7EBF96]/30">
                    POST
                  </span>
                </td>
                <td className="py-2.5 text-[#2A1525] dark:text-[#F2EDE9] font-bold">/api/v1/orchestrate</td>
                <td className="py-2.5 text-[#5A4550] dark:text-[#A89B9F] font-sans text-xs">Central Dispatcher</td>
                <td className="py-2.5 text-[#80747B] dark:text-[#7A6B70] text-xs">Bearer JWT</td>
              </tr>
              {activeIntegrations.map(integration => (
                <React.Fragment key={integration.id}>
                  {integration.systemContext.apiEndpoints.map((ep, idx) => {
                    const [method, rest] = ep.split(' ');
                    const [path, ...desc] = (rest || '').split(' - ');
                    return (
                      <tr key={idx} className="hover:bg-[#FAF7F5] dark:hover:bg-[#2D2025] transition">
                        <td className="py-2.5">
                          <span className="px-2 py-0.5 rounded-full bg-[#F5EBE8] dark:bg-[#2D2025] text-[#6B2D5B] dark:text-[#D4A3C8] font-bold text-[10px] border dark:border-[#3D2E35]">
                            {method}
                          </span>
                        </td>
                        <td className="py-2.5 text-[#2A1525] dark:text-[#F2EDE9] font-bold">{path}</td>
                        <td className="py-2.5 text-[#5A4550] dark:text-[#A89B9F] font-sans text-xs">{desc.join(' - ') || integration.name}</td>
                        <td className="py-2.5 text-[#80747B] dark:text-[#7A6B70] text-xs">
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
