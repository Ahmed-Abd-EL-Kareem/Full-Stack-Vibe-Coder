'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import {
  Layers,
  ArrowRight,
  ShieldCheck,
  Server,
  Zap,
  Globe,
  Database,
  Cpu,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PromptStudio from '@/components/PromptStudio';
import ResponseViewer from '@/components/ResponseViewer';
import ApiKeyModal from '@/components/ApiKeyModal';
import DocModal from '@/components/DocModal';
import { PRESET_PROMPTS } from '@/lib/integrations';
import { buildInjectedSystemPrompt } from '@/lib/promptBuilder';
import { generateSmartMockResponse } from '@/lib/mockResponses';
import { AVAILABLE_INTEGRATIONS } from '@/lib/integrations';

export default function Home() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [prompt, setPrompt] = useState<string>(
    'Build a SaaS billing and subscription portal with Stripe checkout, automated customer emails via Gmail, and real-time sales alert notifications in Slack.'
  );
  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>([
    'stripe',
    'gmail',
    'slack'
  ]);
  const [systemPrompt, setSystemPrompt] = useState<string>('');
  const [streamingText, setStreamingText] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [hasGenerated, setHasGenerated] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [mockResult, setMockResult] = useState<any>(null);
  const [injectedMetadata, setInjectedMetadata] = useState<any>(null);

  // Modals & Config
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false);
  const [docModalType, setDocModalType] = useState<'decisions' | 'tech' | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [provider, setProvider] = useState<'gemini' | 'openai'>('gemini');

  const abortControllerRef = useRef<AbortController | null>(null);
  const mainScopeRef = useRef<HTMLDivElement>(null);
  const studioSectionRef = useRef<HTMLDivElement>(null);

  // Initialize theme from localStorage (Light mode is the default)
  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem('stunning_theme');
      if (storedTheme === 'dark') {
        setTheme('dark');
        document.documentElement.classList.add('dark');
      } else {
        setTheme('light');
        document.documentElement.classList.remove('dark');
      }

      const storedKey = localStorage.getItem('stunning_api_key');
      const storedProv = localStorage.getItem('stunning_provider') as 'gemini' | 'openai';
      if (storedKey) setApiKey(storedKey);
      if (storedProv) setProvider(storedProv);
    } catch {}

    const initialInjection = buildInjectedSystemPrompt(prompt, selectedIntegrations);
    setSystemPrompt(initialInjection.systemPrompt);
    setInjectedMetadata(initialInjection.injectedMetadata);

    const activeIntegrationsList = AVAILABLE_INTEGRATIONS.filter(i => selectedIntegrations.includes(i.id));
    const initialMock = generateSmartMockResponse(prompt, activeIntegrationsList);
    setMockResult(initialMock);

    // Enhanced GSAP matchMedia entrance choreography
    const mm = gsap.matchMedia();
    mm.add(
      {
        reduceMotion: '(prefers-reduced-motion: reduce)',
        all: '(min-width: 0px)'
      },
      (context) => {
        const { reduceMotion } = context.conditions as any;
        if (!reduceMotion && mainScopeRef.current) {
          const tl = gsap.timeline({ defaults: { ease: 'power2.out', duration: 0.55 } });
          tl.from('.hero-badge', { autoAlpha: 0, y: -10, duration: 0.4 })
            .from('.hero-title', { autoAlpha: 0, y: 15, duration: 0.5 }, '-=0.2')
            .from('.hero-subtitle', { autoAlpha: 0, y: 12, duration: 0.4 }, '-=0.25')
            .from('.hero-preset-item', { autoAlpha: 0, y: 10, stagger: 0.05, duration: 0.35 }, '-=0.2')
            .from('.prompt-studio-card', { autoAlpha: 0, y: 20, duration: 0.5 }, '-=0.25')
            .from('.integration-pill-item', { autoAlpha: 0, scale: 0.95, stagger: 0.04, duration: 0.4 }, '-=0.3')
            .from('.architecture-preview-dock', { autoAlpha: 0, y: 20, duration: 0.5 }, '-=0.2');
        }
      },
      mainScopeRef
    );

    return () => mm.revert();
  }, []);

  // GSAP animation when Studio mounts upon user generation
  useEffect(() => {
    if ((hasGenerated || isGenerating) && studioSectionRef.current) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReducedMotion) {
        gsap.fromTo(
          studioSectionRef.current,
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out', overwrite: 'auto' }
        );
      }
      // Smooth scroll to studio
      setTimeout(() => {
        studioSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [hasGenerated, isGenerating]);

  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('stunning_theme', nextTheme);
    } catch {}
  };

  // Synchronize live system prompt and preview state when selection changes
  useEffect(() => {
    if (prompt.trim()) {
      const injection = buildInjectedSystemPrompt(prompt, selectedIntegrations);
      setSystemPrompt(injection.systemPrompt);
      setInjectedMetadata(injection.injectedMetadata);

      const activeIntegrationsList = AVAILABLE_INTEGRATIONS.filter(i => selectedIntegrations.includes(i.id));
      const smartMock = generateSmartMockResponse(prompt, activeIntegrationsList);
      setMockResult(smartMock);
    }
  }, [prompt, selectedIntegrations]);

  const handleSaveApiKey = (key: string, prov: 'gemini' | 'openai') => {
    setApiKey(key);
    setProvider(prov);
    try {
      localStorage.setItem('stunning_api_key', key);
      localStorage.setItem('stunning_provider', prov);
    } catch {}
  };

  const handleSelectPreset = (preset: (typeof PRESET_PROMPTS)[0]) => {
    setPrompt(preset.prompt);
    setSelectedIntegrations(preset.integrations);
  };

  const handleCancelGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsGenerating(false);
  };

  const handleSubmit = async () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setHasGenerated(true);
    setHasError(false);
    setStreamingText('');

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt.trim(),
          selectedIntegrations,
          apiKey: apiKey || undefined,
          provider
        }),
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No readable stream available');
      }

      let buffer = '';
      let accumulatedText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        let currentEvent = 'message';

        for (const line of lines) {
          if (line.startsWith('event: ')) {
            currentEvent = line.slice(7).trim();
          } else if (line.startsWith('data: ')) {
            const dataStr = line.slice(6).trim();
            if (!dataStr) continue;

            try {
              const data = JSON.parse(dataStr);

              if (currentEvent === 'metadata') {
                if (data.systemPrompt) setSystemPrompt(data.systemPrompt);
                if (data.mockResult) setMockResult(data.mockResult);
                if (data.injectedMetadata) setInjectedMetadata(data.injectedMetadata);
              } else if (currentEvent === 'chunk' && data.text) {
                accumulatedText += data.text;
                setStreamingText(accumulatedText);
              } else if (currentEvent === 'done') {
                const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                if (!prefersReducedMotion) {
                  confetti({
                    particleCount: 75,
                    spread: 60,
                    origin: { y: 0.6 }
                  });
                }
              }
            } catch {
              accumulatedText += dataStr;
              setStreamingText(accumulatedText);
            }
          }
        }
      }

      if (!mockResult) {
        const fallbackInjection = buildInjectedSystemPrompt(prompt, selectedIntegrations);
        setInjectedMetadata(fallbackInjection.injectedMetadata);
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        setStreamingText(prev => prev + '\n\n[Generation cancelled by user]');
      } else {
        console.error('Generation error:', err);
        setHasError(true);
        setStreamingText(prev => prev + `\n\n⚠️ Error during generation: ${err.message}`);
      }
    } finally {
      setIsGenerating(false);
      abortControllerRef.current = null;
    }
  };

  const appName = mockResult?.title || (prompt.split(' ')[0] ? `${prompt.split(' ').slice(0, 3).join(' ')} Platform` : 'Stunning Platform');
  const activeIntegrations = AVAILABLE_INTEGRATIONS.filter(i => selectedIntegrations.includes(i.id));

  return (
    <div ref={mainScopeRef} className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--foreground)] transition-colors duration-200">
      {/* Navbar with Theme Switcher */}
      <Navbar
        onOpenApiKeyModal={() => setApiKeyModalOpen(true)}
        apiKeySet={!!apiKey}
        onViewDoc={(doc) => setDocModalType(doc)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Console Workspace - Full Vertical Layout */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-4 space-y-6">
        {/* Top: Hero Section */}
        <Hero onSelectPreset={handleSelectPreset} />

        {/* Middle: Full-Width Prompt Studio */}
        <div className="w-full">
          <PromptStudio
            prompt={prompt}
            setPrompt={setPrompt}
            selectedIntegrations={selectedIntegrations}
            setSelectedIntegrations={setSelectedIntegrations}
            onSubmit={handleSubmit}
            onCancel={handleCancelGeneration}
            isLoading={isGenerating}
          />
        </div>

        {/* Bottom Section:
            State A (Pre-submission): Architecture Preview Dock
            State B (Post-submission): Full-Width "Build A SaaS Studio" Workspace
        */}
        {!hasGenerated && !isGenerating ? (
          <div className="architecture-preview-dock rounded-3xl border border-[#E5D5CF] dark:border-[#3D2E35] bg-[#FFFFFF] dark:bg-[#241A1F] p-5 sm:p-6 shadow-ballet-card dark:shadow-velvet-card transition-colors">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E5D5CF] dark:border-[#3D2E35]">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F5EBE8] dark:bg-[#2D2025] text-[#6B2D5B] dark:text-[#C98DB8] border border-[#E5D5CF] dark:border-[#3D2E35]">
                  <Layers className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-bold text-[#2A1525] dark:text-[#F2EDE9]">
                    Next.js 15 Synthesis Engine Architecture
                  </h3>
                  <p className="text-xs text-[#80747B] dark:text-[#A89B9F] font-sans">
                    Ready to synthesize full-stack route handlers, schema injection, and interactive sandbox
                  </p>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={!prompt.trim()}
                className="flex items-center gap-1.5 rounded-full bg-[#6B2D5B] dark:bg-[#C98DB8] hover:bg-[#2A1525] dark:hover:bg-[#B07AA5] px-4 py-1.5 text-xs font-sans font-semibold text-white dark:text-[#1A1216] transition shadow-sm"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Launch Studio</span>
              </button>
            </div>

            {/* 4 Tiers Summary */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="rounded-2xl border border-[#E5D5CF] dark:border-[#3D2E35] bg-[#FAF7F5] dark:bg-[#1F161B] p-3.5">
                <div className="flex items-center justify-between text-[10px] text-[#80747B] dark:text-[#A89B9F] font-mono">
                  <span className="font-bold text-[#2A1525] dark:text-[#F2EDE9]">Tier 1</span>
                  <Globe className="h-3.5 w-3.5" />
                </div>
                <h4 className="mt-1 font-serif text-xs font-bold text-[#2A1525] dark:text-[#F2EDE9]">Edge Client</h4>
                <p className="mt-1 text-[11px] text-[#5A4550] dark:text-[#A89B9F] leading-tight font-sans">
                  React 19 Server/Client UI with live SSE listeners.
                </p>
              </div>

              <div className="rounded-2xl border border-[#E5D5CF] dark:border-[#3D2E35] bg-[#FAF7F5] dark:bg-[#1F161B] p-3.5">
                <div className="flex items-center justify-between text-[10px] text-[#80747B] dark:text-[#A89B9F] font-mono">
                  <span className="font-bold text-[#2A1525] dark:text-[#F2EDE9]">Tier 2</span>
                  <Server className="h-3.5 w-3.5" />
                </div>
                <h4 className="mt-1 font-serif text-xs font-bold text-[#2A1525] dark:text-[#F2EDE9]">Route Handlers</h4>
                <p className="mt-1 text-[11px] text-[#5A4550] dark:text-[#A89B9F] leading-tight font-sans">
                  Zod validated Server Actions & central dispatcher.
                </p>
              </div>

              <div className="rounded-2xl border border-[#D4764E] dark:border-[#C98DB8]/40 bg-[#F5EBE8] dark:bg-[#6B2D5B]/20 p-3.5">
                <div className="flex items-center justify-between text-[10px] text-[#6B2D5B] dark:text-[#C98DB8] font-mono">
                  <span className="font-bold">Tier 3</span>
                  <Zap className="h-3.5 w-3.5" />
                </div>
                <h4 className="mt-1 font-serif text-xs font-bold text-[#2A1525] dark:text-[#F2EDE9]">Injected Services</h4>
                <p className="mt-1 text-[11px] text-[#5A4550] dark:text-[#E8996E] leading-tight font-sans truncate">
                  {activeIntegrations.length > 0 ? activeIntegrations.map(i => i.name).join(', ') : 'Standalone app'}
                </p>
              </div>

              <div className="rounded-2xl border border-[#E5D5CF] dark:border-[#3D2E35] bg-[#FAF7F5] dark:bg-[#1F161B] p-3.5">
                <div className="flex items-center justify-between text-[10px] text-[#80747B] dark:text-[#A89B9F] font-mono">
                  <span className="font-bold text-[#2A1525] dark:text-[#F2EDE9]">Tier 4</span>
                  <Cpu className="h-3.5 w-3.5" />
                </div>
                <h4 className="mt-1 font-serif text-xs font-bold text-[#2A1525] dark:text-[#F2EDE9]">Telemetry & DB</h4>
                <p className="mt-1 text-[11px] text-[#5A4550] dark:text-[#A89B9F] leading-tight font-sans">
                  Structured audit logging & telemetry traces.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Build A SaaS Studio (Full Vertical View) */
          <div ref={studioSectionRef} className="w-full pb-16">
            <ResponseViewer
              appName={appName}
              userPrompt={prompt}
              selectedIntegrations={selectedIntegrations}
              systemPrompt={systemPrompt}
              streamingText={streamingText}
              isStreaming={isGenerating}
              mockResult={mockResult}
              injectedMetadata={injectedMetadata}
              onRetry={handleSubmit}
              hasError={hasError}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E5D5CF] dark:border-[#3D2E35] bg-[#F5EBE8] dark:bg-[#140E11] py-6 text-xs text-[#80747B] dark:text-[#A89B9F] font-sans transition-colors">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-[#2A1525] dark:text-white">Stunning Studio</span>
            <span className="text-[#E5D5CF] dark:text-[#3D2E35]">•</span>
            <span className="text-[#6B2D5B] dark:text-[#C98DB8] font-medium">
              {theme === 'dark' ? 'Velvet Terminal (Dark)' : 'Digital Choreography (Light Default)'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-sans">
            <button
              onClick={() => setDocModalType('decisions')}
              className="text-[#5A4550] dark:text-[#A89B9F] hover:text-[#2A1525] dark:hover:text-white transition"
            >
              DECISIONS.md (Part 2)
            </button>
            <span className="text-[#E5D5CF] dark:text-[#3D2E35]">•</span>
            <button
              onClick={() => setDocModalType('tech')}
              className="text-[#5A4550] dark:text-[#A89B9F] hover:text-[#2A1525] dark:hover:text-white transition"
            >
              TECH.md (Part 3 MCP)
            </button>
          </div>
        </div>
      </footer>

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={apiKeyModalOpen}
        onClose={() => setApiKeyModalOpen(false)}
        onSaveKey={handleSaveApiKey}
        currentKey={apiKey}
        currentProvider={provider}
      />

      {/* Document Viewer Modal */}
      <DocModal
        isOpen={!!docModalType}
        onClose={() => setDocModalType(null)}
        docType={docModalType || 'decisions'}
      />
    </div>
  );
}
