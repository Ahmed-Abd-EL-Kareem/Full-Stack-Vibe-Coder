import { Integration } from './integrations';

export interface GeneratedAppResult {
  title: string;
  summary: string;
  architecture: {
    overview: string;
    flowSteps: string[];
    endpoints: { method: string; path: string; description: string }[];
    securityHighlights: string[];
  };
  markdownContent: string;
  codeFiles: {
    filename: string;
    language: string;
    code: string;
  }[];
  previewState: {
    appName: string;
    themeColor: string;
    stats: { label: string; value: string; change: string }[];
    recentActivity: { id: string; title: string; integration: string; time: string; status: string }[];
    integrationBadges: string[];
    activeTabs: string[];
  };
}

export function generateSmartMockResponse(
  userPrompt: string,
  selectedIntegrations: Integration[]
): GeneratedAppResult {
  const integrationNames = selectedIntegrations.map(i => i.name);
  const integrationListStr = integrationNames.length > 0
    ? integrationNames.join(', ')
    : 'Standalone Next.js Core';

  const appName = extractAppName(userPrompt, integrationNames);
  const themeColor = selectedIntegrations[0]?.brandColor || '#00F0FF';

  const endpoints = [
    { method: 'POST', path: '/api/v1/orchestrate', description: 'Central dispatch endpoint with session verification and idempotency locks' }
  ];

  if (selectedIntegrations.some(i => i.id === 'stripe')) {
    endpoints.push({ method: 'POST', path: '/api/stripe/checkout', description: 'Creates dynamic Stripe Checkout session with line items' });
    endpoints.push({ method: 'POST', path: '/api/webhooks/stripe', description: 'Validates HMAC signature and fulfills purchase events' });
  }

  if (selectedIntegrations.some(i => i.id === 'shopify')) {
    endpoints.push({ method: 'GET', path: '/api/shopify/inventory', description: 'Fetches real-time Storefront inventory and variant pricing' });
    endpoints.push({ method: 'POST', path: '/api/shopify/cart', description: 'Mutates headless cart lines via Shopify GraphQL API' });
  }

  if (selectedIntegrations.some(i => i.id === 'gmail')) {
    endpoints.push({ method: 'POST', path: '/api/mail/send', description: 'Sends automated HTML notifications & welcome sequences' });
  }

  if (selectedIntegrations.some(i => i.id === 'slack')) {
    endpoints.push({ method: 'POST', path: '/api/slack/broadcast', description: 'Dispatches real-time Block Kit notifications to team channels' });
  }

  if (selectedIntegrations.some(i => i.id === 'google-sheets')) {
    endpoints.push({ method: 'POST', path: '/api/sheets/append', description: 'Appends analytics and CRM event records to Google Sheets' });
  }

  if (selectedIntegrations.some(i => i.id === 'supabase')) {
    endpoints.push({ method: 'GET', path: '/api/data/records', description: 'Queries Postgres tables with Row Level Security (RLS)' });
    endpoints.push({ method: 'POST', path: '/api/data/records', description: 'Inserts record with authenticated user UUID verification' });
  }

  const flowSteps = [
    `User interacts with the frontend interface submitting: "${userPrompt.slice(0, 80)}..."`,
    `Next.js Server Action validates request payload with Zod and checks idempotency headers`,
    ...selectedIntegrations.map(i => `Dispatches event to **${i.name}** service layer (${i.systemContext.role})`),
    `Aggregates results and updates client state in real-time with zero full-page reloads`
  ];

  const codeFiles = [
    {
      filename: 'src/app/api/orchestrator/route.ts',
      language: 'typescript',
      code: `import { NextRequest, NextResponse } from 'next/server';
${selectedIntegrations.some(i => i.id === 'stripe') ? "import Stripe from 'stripe';\nconst stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' });" : ""}
${selectedIntegrations.some(i => i.id === 'slack') ? "import { WebClient } from '@slack/web-api';\nconst slack = new WebClient(process.env.SLACK_BOT_TOKEN);" : ""}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, payload, userId } = body;

    console.log(\`[Orchestrator] Processing \${action} for user \${userId || 'anonymous'}\`);

    // Injected integrations execution pipeline: [${integrationListStr}]
    const results: Record<string, any> = {};

${selectedIntegrations.map(i => `    // 🔌 Execute ${i.name} Integration Pipeline
    try {
      results['${i.id}'] = {
        status: 'success',
        endpoint: '${i.systemContext.apiEndpoints[0]}',
        timestamp: new Date().toISOString()
      };
    } catch (err: any) {
      console.error('Failed to dispatch to ${i.name}:', err);
      results['${i.id}'] = { status: 'error', error: err.message };
    }`).join('\n\n')}

    return NextResponse.json({
      success: true,
      data: {
        action,
        results,
        executedAt: new Date().toISOString()
      }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}`
    },
    {
      filename: 'src/components/AppDashboard.tsx',
      language: 'tsx',
      code: `'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowUpRight, CheckCircle2, ShieldCheck, Activity } from 'lucide-react';

export default function AppDashboard() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleTriggerPipeline = async () => {
    setLoading(true);
    setStatus('Dispatching across ${integrationListStr}...');
    try {
      const res = await fetch('/api/v1/orchestrate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'TRIGGER_WORKFLOW', payload: { source: 'stunning-ui' } })
      });
      const data = await res.json();
      setStatus('Workflow executed successfully across all tiers!');
    } catch (err) {
      setStatus('Execution failed. Check integration configuration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-surface-border bg-[#0B0E14] p-6 text-white shadow-2xl">
      <div className="flex items-center justify-between pb-4 border-b border-surface-border">
        <div>
          <h2 className="font-display text-xl font-bold">${appName}</h2>
          <p className="text-xs text-surface-muted mt-0.5">Connected Services: ${integrationListStr}</p>
        </div>
        <button
          onClick={handleTriggerPipeline}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 px-4 py-2 text-xs font-mono font-bold text-white shadow-glow-cyan/20 hover:brightness-110 active:scale-95 transition disabled:opacity-50"
        >
          <Sparkles className="h-4 w-4" />
          {loading ? 'Synthesizing...' : 'Run Pipeline'}
        </button>
      </div>

      {status && (
        <div className="mt-4 p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 text-cyan-300 text-xs font-mono flex items-center gap-2.5">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{status}</span>
        </div>
      )}
    </div>
  );
}`
    },
    {
      filename: 'src/types/schema.d.ts',
      language: 'typescript',
      code: `export interface OrchestrationPayload {
  action: string;
  userId?: string;
  metadata?: Record<string, unknown>;
}

export interface IntegrationExecutionResult {
  status: 'success' | 'error' | 'pending';
  endpoint: string;
  timestamp: string;
  error?: string;
}

export interface OrchestrationResponse {
  success: boolean;
  data?: {
    action: string;
    results: Record<string, IntegrationExecutionResult>;
    executedAt: string;
  };
  error?: string;
}`
    }
  ];

  const markdownContent = `# 🚀 ${appName}

**Application Specification:** *${userPrompt}*

**Active Injected Integrations:** ${integrationNames.length > 0 ? integrationNames.map(n => `\`${n}\``).join(' • ') : '*None (Self-Contained Fullstack App)*'}

---

## 🏛️ System Architecture & Data Flow

This application is built with a high-performance **Next.js 15 App Router** architecture designed for low-latency server actions, resilient background jobs, and type-safe integration endpoints.

### Key Architectural Layers:
1. **Edge Presentation Tier (React 19 & Tailwind CSS)**:
   - Dynamic micro-frontend components with optimistic UI updates.
   - Realtime event hooks connected to Server-Sent Events (SSE) and WebSocket channels.

2. **Integration Gateway & Middleware Tier**:
   - Centralized orchestration route (\`/api/v1/orchestrate\`) with JWT & HMAC signature validation.
   - Dedicated webhook listeners with idempotency locks preventing duplicate event executions.

3. **External Services Integration Layer (${integrationListStr})**:
${selectedIntegrations.map(i => `   - **${i.name}**: ${i.systemContext.role}. Utilizes pattern: \`${i.systemContext.architecturePattern}\``).join('\n')}

---

## ⚡ Integrated Workflows & Triggers

${selectedIntegrations.map((i, idx) => `
### ${idx + 1}. ${i.name} Integration Pipeline
- **Trigger**: User event or external webhook dispatch.
- **Handling Endpoint**: \`${i.systemContext.apiEndpoints[0]}\`
- **Security Constraint**: ${i.systemContext.securityGuidelines[0]}
- **Telemetry**: Event logged with structured audit traces.
`).join('\n') || '### Standard Event Pipeline\n- Direct atomic server actions with state isolation.'}

---

## 🛠️ Production Code Implementation

The generated solution includes fully typed route handlers and reactive components ready for production deployment.

\`\`\`json:preview-state
{
  "appName": "${appName}",
  "themeColor": "${themeColor}",
  "stats": [
    { "label": "Active Integrations", "value": "${selectedIntegrations.length}", "change": "+100%" },
    { "label": "Pipeline Latency", "value": "28ms", "change": "-24%" },
    { "label": "Reliability SLA", "value": "99.99%", "change": "+0.05%" }
  ],
  "recentActivity": [
    ${selectedIntegrations.map((i, idx) => `{
      "id": "act-${idx + 1}",
      "title": "${i.name} event dispatched",
      "integration": "${i.name}",
      "time": "Just now",
      "status": "Healthy"
    }`).join(',\n    ') || '{"id": "act-1", "title": "Core application initialized", "integration": "Next.js", "time": "Just now", "status": "Healthy"}'}
  ],
  "integrationBadges": ${JSON.stringify(integrationNames)},
  "activeTabs": ["Overview", "Workflows", "Telemetry", "Settings"]
}
\`\`\`
`;

  return {
    title: appName,
    summary: `Engineered a production-ready solution tailored for: "${userPrompt.slice(0, 100)}..." integrated with ${integrationListStr}.`,
    architecture: {
      overview: `Next.js 15 Fullstack architecture with dynamic API orchestration for ${integrationListStr}.`,
      flowSteps,
      endpoints,
      securityHighlights: [
        'End-to-end type safety with TypeScript strict mode',
        'HMAC SHA-256 webhook signature verification',
        'Scoped environment variable injection with zero client-side secret leakage',
        'Distributed rate limiting and exponential backoff retry queues'
      ]
    },
    markdownContent,
    codeFiles,
    previewState: {
      appName,
      themeColor,
      stats: [
        { label: 'Integrations Active', value: `${selectedIntegrations.length}`, change: 'Ready' },
        { label: 'Avg Latency', value: '28ms', change: 'Edge' },
        { label: 'Uptime SLA', value: '99.99%', change: 'Healthy' }
      ],
      recentActivity: selectedIntegrations.map((i, idx) => ({
        id: `act-${idx + 1}`,
        title: `${i.name} handler invoked`,
        integration: i.name,
        time: 'Just now',
        status: 'Operational'
      })),
      integrationBadges: integrationNames,
      activeTabs: ['Dashboard', 'Live Feed', 'API Gateway', 'Config']
    }
  };
}

function extractAppName(prompt: string, integrations: string[]): string {
  const cleaned = prompt.replace(/[^\w\s]/gi, '').trim();
  const words = cleaned.split(/\s+/).slice(0, 3);
  if (words.length > 0 && words[0].length > 2) {
    return words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ') + ' Studio';
  }
  return integrations.length > 0
    ? `${integrations.join(' & ')} Hub`
    : 'Stunning App Platform';
}
