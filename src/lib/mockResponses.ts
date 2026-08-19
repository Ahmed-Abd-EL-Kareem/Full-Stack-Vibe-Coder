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
    : 'Custom Core Stack';

  const appName = extractAppName(userPrompt, integrationNames);
  const themeColor = selectedIntegrations[0]?.brandColor || '#8B5CF6';

  const endpoints = [
    { method: 'POST', path: '/api/v1/orchestrate', description: 'Central dispatch endpoint for user actions and pipeline execution' }
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
    endpoints.push({ method: 'GET', path: '/api/data/records', description: 'Queries Postgres tables with RLS and realtime subscriptions' });
  }

  const flowSteps = [
    `User interacts with the frontend interface submitting: "${userPrompt.slice(0, 80)}..."`,
    `Next.js Server Action validates request payload and checks idempotency headers`,
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

    console.log(\`[Orchestrator] Processing \${action} for user \${userId}\`);

    // Injected integrations execution pipeline: [${integrationListStr}]
    const results: Record<string, any> = {};

${selectedIntegrations.map(i => `    // 🔌 Execute ${i.name} Integration
    try {
      results['${i.id}'] = { status: 'success', timestamp: new Date().toISOString() };
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
import { Sparkles, ArrowUpRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function AppDashboard() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleTriggerPipeline = async () => {
    setLoading(true);
    setStatus('Dispatching across ${integrationListStr}...');
    try {
      const res = await fetch('/api/orchestrator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'TRIGGER_WORKFLOW', payload: { source: 'stunning-ui' } })
      });
      const data = await res.json();
      setStatus('Workflow executed successfully!');
    } catch (err) {
      setStatus('Execution failed. Check integration configuration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-surface-border bg-surface-card p-6 text-white">
      <div className="flex items-center justify-between pb-4 border-b border-surface-border">
        <div>
          <h2 className="text-xl font-bold">${appName}</h2>
          <p className="text-sm text-surface-muted">Connected to: ${integrationListStr}</p>
        </div>
        <button
          onClick={handleTriggerPipeline}
          disabled={loading}
          className="flex items-center gap-2 rounded-lg bg-stunning-600 px-4 py-2 text-sm font-medium hover:bg-stunning-500 transition disabled:opacity-50"
        >
          <Sparkles className="h-4 w-4" />
          {loading ? 'Executing...' : 'Run Pipeline'}
        </button>
      </div>

      {status && (
        <div className="mt-4 p-3 rounded-lg bg-stunning-950 border border-stunning-800 text-stunning-300 text-sm flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          {status}
        </div>
      )}
    </div>
  );
}`
    }
  ];

  const markdownContent = `# 🚀 ${appName}

**Prompt:** *${userPrompt}*

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
    { "label": "Pipeline Latency", "value": "42ms", "change": "-18%" },
    { "label": "Reliability SLA", "value": "99.99%", "change": "+0.04%" }
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
        { label: 'Avg Latency', value: '38ms', change: 'Edge' },
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
    return words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ') + ' Hub';
  }
  return integrations.length > 0
    ? `${integrations.join(' & ')} Platform`
    : 'Stunning App Platform';
}
