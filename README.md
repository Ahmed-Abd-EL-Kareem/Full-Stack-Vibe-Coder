# Stunning — Full-Stack Vibe Coder Assessment

> A modern full-stack web application generator with dynamic AI prompt context injection for external integrations (Stripe, Shopify, Gmail, Slack, Google Sheets, Supabase), interactive prototype sandbox, and architecture synthesis.

Built for the **Stunning Candidate Task — Full-Stack Vibe Coder (Builder Mindset)**.

---

## ⚡ Quick Start (Run in 60 Seconds)

### 1. Prerequisites
- **Node.js**: v18+ (Tested on Node v20 & v22)
- **npm** or **pnpm**

### 2. Installation & Launch
```bash
# Clone or navigate to project directory
cd stunning-vibe-coder

# Install dependencies
npm install

# Start the Next.js development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> [!TIP]
> **Zero Setup Required:** The application runs out-of-the-box in **High-Fidelity Simulation Mode** without needing any API keys. If you want to connect live AI models (Google Gemini or OpenAI), you can either enter your key in the top-right settings modal or create a `.env.local` file.

---

## 🛠️ Optional Environment Variables (`.env.local`)

Copy `.env.example` to `.env.local` if you wish to configure server-side API keys:

```bash
# Google Gemini (Recommended)
GEMINI_API_KEY=your_gemini_api_key_here

# OpenAI (Alternative)
OPENAI_API_KEY=your_openai_api_key_here

# Model override (Default: gemini-2.5-flash)
AI_MODEL_NAME=gemini-2.5-flash
```

---

## 🚀 Key Features

### 1. Technical Execution
- **Landing Page & Prompt Studio:** Modern dark-mode UI with ambient glassmorphism and preset inspiration chips.
- **Integration Selector:** Multi-select dock for **Stripe**, **Shopify**, **Gmail**, **Slack**, and **Google Sheets** (plus **Supabase**).
- **Dynamic System Prompt Injection:** System prompts are compiled dynamically at runtime, injecting exact architectural requirements, SDK patterns, API route signatures, and security hardening rules for all chosen integrations.
- **Server-Sent Events (SSE) Streaming:** Low-latency token streaming from Next.js Edge/Node route handlers with smooth real-time rendering.
- **Interactive Multi-View Studio:**
  - 📱 **Interactive Live Preview:** Clickable sandbox prototype with simulated Stripe checkouts, Slack alerts, Google Sheets row appends, and real-time logs.
  - 🏛️ **Architecture Blueprint:** Visual 4-tier pipeline diagram and generated API contracts table.
  - 💻 **Production Code Viewer:** Formatted Next.js 15 TypeScript code files with line numbers and 1-click copy/download.
  - 🔍 **Prompt Inspector:** Real-time transparency showing the exact raw system prompt and injected context sent to the AI.

### 2. Assessment Documents
- **`DECISIONS.md`**: Part 2 — Production tradeoffs, improvements within 60 minutes, intentional omissions, and top production risk.
- **`TECH.md`**: Part 3 — Deep-dive on **Model Context Protocol (MCP)**, applications for Stunning, limitations, and adoption decision.
- **`LOOM_SCRIPT.md`**: Timestamped 5-minute video guide for the candidate's Loom recording.

---

## 🏛️ Project Structure

```
stunning-vibe-coder/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── generate/
│   │   │       └── route.ts         # SSE streaming AI endpoint + prompt injection
│   │   ├── layout.tsx               # Root layout, fonts, and dark theme
│   │   ├── page.tsx                 # Main application page & studio controller
│   │   └── globals.css              # Custom styling, glow utilities, and animations
│   ├── components/
│   │   ├── Navbar.tsx               # Header with doc shortcuts & API key modal
│   │   ├── Hero.tsx                 # Hero section & quick preset chips
│   │   ├── PromptStudio.tsx         # Prompt textarea & integration selector
│   │   ├── IntegrationPill.tsx      # Multi-select badge component
│   │   ├── ResponseViewer.tsx       # Tabbed response container
│   │   ├── LivePreview.tsx          # Interactive simulated app prototype
│   │   ├── ArchitectureView.tsx     # Visual pipeline & API contracts table
│   │   ├── CodeViewer.tsx           # Syntax-highlighted code editor
│   │   ├── PromptInspector.tsx      # System prompt injection debugger
│   │   ├── ApiKeyModal.tsx          # Client-side API key configuration modal
│   │   └── DocModal.tsx             # In-app viewer for DECISIONS.md & TECH.md
│   └── lib/
│       ├── integrations.ts          # Integrations registry, metadata & schemas
│       ├── promptBuilder.ts         # Dynamic system prompt injection engine
│       └── mockResponses.ts         # High-fidelity offline fallback generator
├── DECISIONS.md                     # Part 2: Discipline & Ownership document
├── TECH.md                          # Part 3: Latest Technology Awareness document
├── LOOM_SCRIPT.md                   # 5-minute Loom presentation script
├── README.md                        # Project documentation & run guide
├── package.json
└── tsconfig.json
```

---

## 🧪 Verification & Testing

```bash
# Verify TypeScript compilation and Next.js build
npm run build

# Start production server
npm start
```
