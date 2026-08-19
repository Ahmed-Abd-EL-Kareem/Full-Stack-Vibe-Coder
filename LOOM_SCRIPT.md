# LOOM Video Script & Walkthrough Guide (Max 5 Minutes)

> **Submission Requirement:** "Loom Video — Max 5 Minutes. Include your face and voice, demo of what you built, and tell us your thought process while building this task. Videos longer than 5 minutes will not be reviewed."

---

## ⏱️ Video Structure & Timestamps

| Timestamp | Section | Key Points to Cover |
|---|---|---|
| **0:00 - 0:45** | **Introduction & Overview** | • Introduce yourself (Face & Voice visible).<br>• State the goal: Building an AI fullstack app generator with dynamic integration context injection for Stunning.so.<br>• Mention the builder philosophy: High craft, zero setup friction, production-minded architecture. |
| **0:45 - 2:15** | **Live Feature Demo** | • Walk through the UI (Landing page, preset chips, integration selector).<br>• Select 3 integrations (e.g. Stripe, Gmail, Slack).<br>• Submit the prompt and show real-time streaming.<br>• Show the **Prompt Inspector** tab to prove that selected integrations actively modified the system prompt with exact SDKs and security rules.<br>• Interact with the **Live Sandbox** (trigger test Stripe checkout, Slack alert, and check logs). |
| **2:15 - 3:30** | **Technical Architecture & Thought Process** | • Explain the stack: Next.js 15 App Router, TypeScript, Tailwind CSS, SSE streaming.<br>• Highlight `src/lib/promptBuilder.ts` (dynamic compiler pattern).<br>• Explain the dual-mode resilience: Live Gemini/OpenAI integration with seamless fallback simulation so anyone can review without API key blockers. |
| **3:30 - 4:20** | **Part 2: Discipline & Ownership (`DECISIONS.md`)** | • What did you improve in 60 mins? (Dual-mode SSE, prompt inspector, interactive sandbox).<br>• What did you leave out? (Real OAuth handshakes, heavyweight WASM containers).<br>• Biggest production risk? (LLM non-determinism across 4+ integrations; mitigated via Zod structured schemas & type validation). |
| **4:20 - 5:00** | **Part 3: Technology Awareness (`TECH.md`) & Wrap-up** | • Mention **Model Context Protocol (MCP)**: Universal tool standard for AI builders.<br>• How Stunning benefits: Instant user tool connections, automated testing sandboxes.<br>• Conclude with enthusiasm for Stunning's mission. |

---

## 🎙️ Speaking Points (Word-for-Word Guide)

### 0:00 - 0:45: Intro
> "Hey Mohamed and the Stunning team! I'm [Your Name], and this is my submission for the Full-Stack Vibe Coder builder task. When approaching this challenge, my goal wasn't just to build a simple form and AI text dump, but to create a high-craft product experience that reflects the speed, polish, and builder mindset that Stunning represents."

### 0:45 - 2:15: Demo
> "Let's dive into the app. Here on the landing page, we have our prompt studio. We can pick inspiration presets or type a custom prompt. Below, we have our integration selector with Stripe, Shopify, Gmail, Slack, and Google Sheets.
> 
> Let's select Stripe, Gmail, and Slack. When I click 'Generate App', our Next.js API route compiles a dynamic system prompt, injecting the exact architecture patterns, webhook HMAC signatures, and data contracts for our selected services.
> 
> As it streams, look at our Response Viewer. In the **Prompt Inspector**, you can see the raw injected system prompt with all three integration schemas explicitly embedded. 
> 
> Over in the **Live Interactive Sandbox**, we can actually test our generated prototype! Clicking 'Test Stripe' or 'Test Slack' simulates realistic event dispatching with live telemetry logs."

### 2:15 - 3:30: Thought Process & Architecture
> "Under the hood, I used Next.js 15 with Server-Sent Events (SSE). One key builder decision was implementing dual-mode resilience: the app connects to Google Gemini or OpenAI if an API key is provided, but also includes an intelligent offline synthesizer. This ensures zero friction for evaluators—you can clone and run it in 60 seconds."

### 3:30 - 4:20: Decisions & Ownership
> "For Part 2, in `DECISIONS.md`, if this went to production tomorrow, I focused on high-leverage items: SSE streaming, dynamic injection, and prompt observability. I intentionally left out live OAuth2 handshakes and heavy WASM VMs to keep the bundle under 50KB. The biggest production risk is LLM schema hallucination when combining 4+ integrations, which we mitigate in production with Zod structured outputs and automated AST validation."

### 4:20 - 5:00: Technology Awareness & Close
> "For Part 3, in `TECH.md`, I explored the **Model Context Protocol (MCP)**. MCP standardizes tool and data source discovery for LLMs. For Stunning, MCP enables users to plug in their own tools and databases with one click, turning Stunning into an extensible, open agent ecosystem.
> 
> Thanks for checking out the project—I'm super excited about what you're building at Stunning and would love to contribute!"
