import { AVAILABLE_INTEGRATIONS, Integration } from './integrations';

export interface PromptInjectionResult {
  systemPrompt: string;
  userPrompt: string;
  selectedIntegrationObjects: Integration[];
  integrationCount: number;
  injectedMetadata: {
    endpoints: string[];
    sdks: string[];
    securityRules: string[];
  };
}

/**
 * Builds a dynamically injected system prompt that embeds full architectural context,
 * SDK recommendations, API signatures, security constraints, and data models for every
 * selected dummy integration.
 */
export function buildInjectedSystemPrompt(
  rawUserPrompt: string,
  selectedIntegrationIds: string[]
): PromptInjectionResult {
  const selectedIntegrationObjects = AVAILABLE_INTEGRATIONS.filter(item =>
    selectedIntegrationIds.includes(item.id)
  );

  const endpoints: string[] = [];
  const sdks: string[] = [];
  const securityRules: string[] = [];

  let integrationsContextBlock = '';

  if (selectedIntegrationObjects.length === 0) {
    integrationsContextBlock = `
=== SELECTED INTEGRATIONS: NONE ===
No external integrations selected. Generate a self-contained, high-performance Next.js fullstack application architecture with local mock state and modular service layers.
`;
  } else {
    integrationsContextBlock = `
=== ACTIVE INJECTED INTEGRATIONS CONTEXT (${selectedIntegrationObjects.length} DETECTED) ===
The user has specifically enabled the following integrations. You MUST explicitly architect, design schemas for, write server action/API route handlers for, and document workflows for each selected integration below:

` +
      selectedIntegrationObjects
        .map((integration, index) => {
          endpoints.push(...integration.systemContext.apiEndpoints);
          sdks.push(integration.systemContext.sdkRecommendation);
          securityRules.push(...integration.systemContext.securityGuidelines);

          return `
--------------------------------------------------------------------------------
[INTEGRATION ${index + 1}: ${integration.name.toUpperCase()}]
• Category: ${integration.category.toUpperCase()}
• Architectural Role: ${integration.systemContext.role}
• Recommended SDK / Packages: ${integration.systemContext.sdkRecommendation}
• Integration Architecture Pattern:
  ${integration.systemContext.architecturePattern}

• Required API Endpoints & Route Handlers:
${integration.systemContext.apiEndpoints.map(ep => `  - ${ep}`).join('\n')}

• Sample Integration Payload / Event Contract:
${JSON.stringify(integration.systemContext.samplePayload, null, 2)}

• Security & Hardening Rules:
${integration.systemContext.securityGuidelines.map(rule => `  - ${rule}`).join('\n')}
`;
        })
        .join('\n');
  }

  const systemPrompt = `You are Stunning AI — a world-class Principal Full-Stack Software Architect and Staff Engineer specializing in modern Next.js 15, TypeScript, Tailwind CSS, and cloud integrations.

Your mission is to take the user's project request and architect a production-ready, beautiful, full-stack application that seamlessly integrates every selected integration.

${integrationsContextBlock}

=== RESPONSE GUIDELINES & REQUIRED STRUCTURE ===
Format your response in crisp GitHub-flavored Markdown with the following distinct sections:

# 🚀 [Application Name & High-Level Summary]
Provide an engaging overview of the solution, user personas, key value propositions, and design aesthetics.

## 🏛️ System Architecture & Data Flow
Explain the technical architecture, component tree, state management approach, and end-to-end data pipeline connecting the frontend, Next.js App Router API routes, and the active integrations (${selectedIntegrationObjects.map(i => i.name).join(', ') || 'Standalone'}).

## ⚡ Integrated Workflows & Triggers
Detail the step-by-step lifecycle for each selected integration (e.g., how events are dispatched, webhook verification, background queuing, and error retry strategies).

## 🛠️ Production Code Implementation
Provide complete, clean, runnable Next.js 15 App Router TypeScript code. Include:
1. **Core Service Client / Integration Helper**
2. **API Route Handler** with request validation and security measures
3. **Interactive React UI Component** with Tailwind CSS styling

## 📱 Live Preview Simulation State
Include a structured JSON block labeled \`\`\`json:preview-state defining simulated initial state (e.g. items, transactions, alert feeds, user status) so the frontend runner can immediately render a live interactive preview.

Always write clean, modern, type-safe code following 2026 web development best practices.`;

  return {
    systemPrompt,
    userPrompt: rawUserPrompt,
    selectedIntegrationObjects,
    integrationCount: selectedIntegrationObjects.length,
    injectedMetadata: {
      endpoints,
      sdks,
      securityRules
    }
  };
}
