# TECH.md — Latest Technology Awareness

**Chosen Technology:** **Model Context Protocol (MCP)** *(Open-Standard AI Tooling & Data Protocol)*

---

## 1. What is it?

The **Model Context Protocol (MCP)** is an open specification (originally introduced by Anthropic and rapidly adopted across the AI ecosystem) that establishes a standardized, bidirectional communication layer between Large Language Models (LLMs) and external data sources, developer tools, execution environments, and third-party APIs.

Historically, every AI platform or agent builder had to write and maintain bespoke function-calling schemas, authentication wrappers, and SDK glue code for every external service (e.g., Stripe, Slack, GitHub, Postgres, Google Drive). 

MCP replaces this fragmented landscape with a universal client-server architecture over standard transports (`stdio` for local processes and `Server-Sent Events (SSE)` for remote cloud servers). An MCP Server exposes:
1. **Resources:** Read-only contextual data (files, database tables, documentation).
2. **Tools:** Executable functions with JSON-RPC schemas that the model can invoke (e.g., `create_checkout_session`, `send_slack_message`).
3. **Prompts:** Pre-configured prompt templates and workflows.

---

## 2. How could Stunning use it?

Stunning is an AI-powered website and application generation platform. MCP fits naturally into Stunning’s core product and builder pipeline in three transformative ways:

### A. Instant Plug-and-Play Integrations for End Users
Instead of Stunning having to manually build and maintain integrations for 500+ SaaS platforms, Stunning can allow users to connect any standard MCP server. 
- *Example:* A user connects their **Stripe MCP Server** and **Shopify MCP Server**; Stunning’s AI builder automatically inspects the live product catalog and billing plans during the generation process, generating accurate UI components pre-populated with real product IDs and schemas.

### B. Live Verification & Test Execution During App Generation
When Stunning generates full-stack code, it can execute test runs through an MCP sandbox server:
- Run linting and TypeScript checks.
- Test webhook dispatch and simulate database migrations in a temporary Postgres MCP instance.
- Ensure the generated code builds with zero errors before presenting it to the user.

### C. Developer Ecosystem & Community Extensibility
Stunning can publish an official **Stunning MCP Server** enabling developers to trigger website builds, update layouts, and query design tokens directly from external agent workflows (e.g., Cursor, Claude Desktop, or custom CLI tools).

---

## 3. What are its limitations?

While MCP is a major leap forward, it currently has several architectural and production constraints:

1. **Security & Permission Boundaries (Confused Deputy Problem):**
   Granting an AI model autonomous access to execute destructive MCP tools (e.g., `delete_database_table`, `refund_charge`) requires granular authorization policies, Human-in-the-Loop (HITL) confirmations, and cryptographically verified audit trails.
2. **Transport Latency in Browser-Only Environments:**
   Browser clients cannot easily establish raw `stdio` connections to local processes without a local bridge agent or WebSocket proxy. SSE transports over the web introduce network roundtrips that require careful connection pooling.
3. **Ecosystem & Schema Standardization:**
   While tools are schema-typed with JSON Schema, different MCP server authors format tool names, errors, and pagination inconsistently. Guardrails are needed to normalize responses.

---

## 4. Would you use it today? Why or why not?

### **Verdict: YES — with a targeted adoption strategy.**

### Why I would use it today:
1. **Developer Velocity:** Adopting MCP on the server side instantly unlocks hundreds of community-maintained connectors (PostgreSQL, GitHub, Slack, Notion, Google Workspace) without writing custom API adapters.
2. **Model Portability:** MCP decoupling means Stunning is never locked into a single AI provider; the exact same tool definitions work seamlessly whether the backend runs Google Gemini, Anthropic Claude, or OpenAI GPT-4o.
3. **Strategic Alignment with Stunning’s Vision:** As AI app generation moves from static mockups to fully functional, live-integrated applications, a standardized protocol for tool invocation is the foundational bedrock for the next generation of web builders.

---

*Authored for the Stunning Full-Stack Vibe Coder Take-Home Assessment (August 2026).*
