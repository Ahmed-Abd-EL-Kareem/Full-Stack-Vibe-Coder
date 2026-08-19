export interface Integration {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: 'payments' | 'ecommerce' | 'communication' | 'database' | 'collaboration' | 'automation';
  icon: string;
  brandColor: string;
  badgeBg: string;
  borderColor: string;
  accentGlow: string;
  systemContext: {
    role: string;
    architecturePattern: string;
    sdkRecommendation: string;
    apiEndpoints: string[];
    samplePayload: Record<string, any>;
    securityGuidelines: string[];
  };
}

export const AVAILABLE_INTEGRATIONS: Integration[] = [
  {
    id: 'stripe',
    name: 'Stripe',
    tagline: 'Payments & Subscriptions',
    description: 'Checkout sessions, recurring billing, customer portal, invoices, and webhook event handling.',
    category: 'payments',
    icon: 'CreditCard',
    brandColor: '#635BFF',
    badgeBg: 'bg-[#635BFF]/10 text-[#a594fd]',
    borderColor: 'border-[#635BFF]/30 hover:border-[#635BFF]/70',
    accentGlow: 'rgba(99, 91, 255, 0.25)',
    systemContext: {
      role: 'Payment Gateway & Subscription Management Engine',
      architecturePattern: 'Next.js App Router API Route (`/api/checkout`, `/api/webhooks/stripe`) with Stripe Checkout Sessions and raw webhook signature verification using `stripe.webhooks.constructEvent()`.',
      sdkRecommendation: 'stripe (^14.0.0) with @stripe/stripe-js for client-side redirection.',
      apiEndpoints: [
        'POST /api/stripe/checkout - Create Stripe Checkout Session',
        'POST /api/stripe/portal - Create Customer Billing Portal Session',
        'POST /api/webhooks/stripe - Listen for `checkout.session.completed` & `invoice.payment_succeeded`'
      ],
      samplePayload: {
        event: 'checkout.session.completed',
        customer_email: 'user@example.com',
        amount_total: 4900,
        currency: 'usd',
        payment_status: 'paid'
      },
      securityGuidelines: [
        'Always verify Stripe signature header (`stripe-signature`) using raw request body.',
        'Never expose `STRIPE_SECRET_KEY` or `STRIPE_WEBHOOK_SECRET` on the client side.',
        'Implement idempotency keys for refund and critical billing triggers.'
      ]
    }
  },
  {
    id: 'shopify',
    name: 'Shopify',
    tagline: 'E-commerce & Storefront',
    description: 'Storefront GraphQL API, product catalog, cart mutations, customer accounts, and order sync.',
    category: 'ecommerce',
    icon: 'ShoppingBag',
    brandColor: '#95BF47',
    badgeBg: 'bg-[#95BF47]/10 text-[#b5e068]',
    borderColor: 'border-[#95BF47]/30 hover:border-[#95BF47]/70',
    accentGlow: 'rgba(149, 191, 71, 0.25)',
    systemContext: {
      role: 'Headless E-commerce & Inventory Catalog Provider',
      architecturePattern: 'Shopify Storefront GraphQL API client with cart persistence, server-side caching via Next.js ISR/tags, and order webhook listeners (`/api/webhooks/shopify`).',
      sdkRecommendation: '@shopify/storefront-api-client or native fetch with GraphQL queries.',
      apiEndpoints: [
        'GET /api/shopify/products - Fetch collection / featured products',
        'POST /api/shopify/cart - Create or mutate cart lines',
        'POST /api/webhooks/shopify - Handle `orders/create` and `inventory_levels/update`'
      ],
      samplePayload: {
        topic: 'orders/create',
        order_id: 'gid://shopify/Order/82098291',
        total_price: '129.00',
        line_items_count: 2,
        financial_status: 'paid'
      },
      securityGuidelines: [
        'Validate `X-Shopify-Hmac-Sha256` header on all incoming webhook requests.',
        'Use Storefront Access Token for public queries and Admin API key only in isolated server actions.'
      ]
    }
  },
  {
    id: 'gmail',
    name: 'Gmail',
    tagline: 'Email & Communications',
    description: 'Transactional emails, onboarding welcome series, automated digests, and thread management.',
    category: 'communication',
    icon: 'Mail',
    brandColor: '#EA4335',
    badgeBg: 'bg-[#EA4335]/10 text-[#f87171]',
    borderColor: 'border-[#EA4335]/30 hover:border-[#EA4335]/70',
    accentGlow: 'rgba(234, 67, 53, 0.25)',
    systemContext: {
      role: 'Transactional Email & Automated Notification Gateway',
      architecturePattern: 'Google Workspace Gmail API / Resend / Nodemailer integration with React Email templates, background delivery queues, and bounce tracking.',
      sdkRecommendation: 'googleapis (gmail v1) or Resend / React Email components.',
      apiEndpoints: [
        'POST /api/mail/send - Dispatch transactional notification or welcome sequence',
        'POST /api/mail/digest - Send daily/weekly activity summary'
      ],
      samplePayload: {
        to: 'customer@example.com',
        subject: 'Your project is ready to launch 🚀',
        template: 'welcome_onboarding',
        timestamp: new Date().toISOString()
      },
      securityGuidelines: [
        'Use OAuth2 service accounts with scoped permissions (`https://www.googleapis.com/auth/gmail.send`).',
        'Sanitize all user-generated content before rendering inside HTML emails to prevent HTML injection.'
      ]
    }
  },
  {
    id: 'slack',
    name: 'Slack',
    tagline: 'Team Alerts & Bot Workflows',
    description: 'Real-time channel notifications, incident alerts, interactive approval buttons, and bot slash commands.',
    category: 'collaboration',
    icon: 'MessageSquare',
    brandColor: '#4A154B',
    badgeBg: 'bg-[#ECB22E]/10 text-[#f6c860]',
    borderColor: 'border-[#ECB22E]/30 hover:border-[#ECB22E]/70',
    accentGlow: 'rgba(236, 178, 46, 0.25)',
    systemContext: {
      role: 'Team Notification & Interactive Operational Bot Hub',
      architecturePattern: 'Slack Block Kit webhooks and Slack Bolt SDK with interactive block action receivers (`/api/slack/events`, `/api/slack/interactions`).',
      sdkRecommendation: '@slack/web-api and @slack/bolt for full interactive apps.',
      apiEndpoints: [
        'POST /api/slack/notify - Post rich Block Kit message to designated channel',
        'POST /api/slack/interactions - Handle interactive button clicks (e.g. "Approve Deploy")'
      ],
      samplePayload: {
        channel: '#deployments',
        blocks: [
          { type: 'header', text: { type: 'plain_text', text: '⚡ New Order Received' } },
          { type: 'section', fields: [{ type: 'mrkdwn', text: '*User:* Sarah T.' }, { type: 'mrkdwn', text: '*Amount:* $149.00' }] }
        ]
      },
      securityGuidelines: [
        'Verify `X-Slack-Signature` with `X-Slack-Request-Timestamp` using the Slack Signing Secret.',
        'Avoid echoing sensitive user PII into public team channels.'
      ]
    }
  },
  {
    id: 'google-sheets',
    name: 'Google Sheets',
    tagline: 'Live Spreadsheet & CRM Sync',
    description: 'Append rows, lead tracking, data logging, analytics exports, and real-time lightweight database sync.',
    category: 'database',
    icon: 'Table',
    brandColor: '#0F9D58',
    badgeBg: 'bg-[#0F9D58]/10 text-[#4ade80]',
    borderColor: 'border-[#0F9D58]/30 hover:border-[#0F9D58]/70',
    accentGlow: 'rgba(15, 157, 88, 0.25)',
    systemContext: {
      role: 'Lightweight Realtime Data Logger & Spreadsheet Sync',
      architecturePattern: 'Google Sheets API v4 with Service Account credentials (`google-spreadsheet` or `googleapis`) appending rows asynchronously on user actions.',
      sdkRecommendation: 'google-spreadsheet (^4.1.0) or googleapis (sheets v4).',
      apiEndpoints: [
        'POST /api/sheets/append - Append new lead / order / telemetry row',
        'GET /api/sheets/sync - Retrieve recent records for real-time dashboard display'
      ],
      samplePayload: {
        sheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
        range: 'Leads!A1',
        values: [['2026-08-19', 'Alex Rivers', 'alex@stunning.so', 'Enterprise Plan', '$499']]
      },
      securityGuidelines: [
        'Store Service Account JSON Private Key in encrypted environment variables.',
        'Rate limit batch appending to avoid Google Sheets API 429 quota limits (300 requests/min).'
      ]
    }
  },
  {
    id: 'supabase',
    name: 'Supabase',
    tagline: 'Postgres & Auth Engine',
    description: 'Relational database, Row Level Security, Realtime WebSocket subscriptions, and secure User Auth.',
    category: 'database',
    icon: 'Database',
    brandColor: '#3ECF8E',
    badgeBg: 'bg-[#3ECF8E]/10 text-[#6ee7b7]',
    borderColor: 'border-[#3ECF8E]/30 hover:border-[#3ECF8E]/70',
    accentGlow: 'rgba(62, 207, 142, 0.25)',
    systemContext: {
      role: 'Primary Persistent Relational Database & Realtime Auth',
      architecturePattern: 'Supabase SSR Client with Next.js middleware session refresh, Postgres Row Level Security (RLS) policies, and Realtime channel subscriptions.',
      sdkRecommendation: '@supabase/ssr and @supabase/supabase-js (^2.40.0).',
      apiEndpoints: [
        'GET /api/data/records - Query scoped records with RLS',
        'POST /api/data/records - Insert record with user UUID verification'
      ],
      samplePayload: {
        table: 'projects',
        data: { id: 'uuid-1234', title: 'Stunning App', owner_id: 'user-789' }
      },
      securityGuidelines: [
        'Enable Row Level Security (RLS) on all tables without exception.',
        'Keep `SUPABASE_SERVICE_ROLE_KEY` strictly on the backend.'
      ]
    }
  }
];

export const PRESET_PROMPTS = [
  {
    title: 'SaaS Billing & Customer Sync',
    prompt: 'Build a premium SaaS billing portal where users can subscribe to Pro or Enterprise plans, view invoice history, and automatically sync new signups and payments to a Google Sheet CRM while alerting the team in Slack.',
    integrations: ['stripe', 'google-sheets', 'slack']
  },
  {
    title: 'E-commerce Flash Drop & Order Alerts',
    prompt: 'Create a headless e-commerce product launch page with live inventory, instant Shopify cart checkout, automated Gmail order confirmation receipts, and high-priority Slack notifications for VIP orders over $100.',
    integrations: ['shopify', 'gmail', 'slack']
  },
  {
    title: 'Automated Lead Funnel & Onboarding',
    prompt: 'Build an interactive lead generation quiz and onboarding funnel that logs customer responses into Google Sheets, dispatches a personalized welcome email series via Gmail, and triggers Stripe checkout for custom onboarding packages.',
    integrations: ['google-sheets', 'gmail', 'stripe']
  },
  {
    title: 'All-in-One Creator Store & Community Hub',
    prompt: 'Design a digital creator platform with Stripe one-click subscriptions, Supabase user management, Shopify merchandise sales, and automated Slack channel invites for new backers.',
    integrations: ['stripe', 'supabase', 'shopify', 'slack']
  }
];
