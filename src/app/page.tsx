'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
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
  const [hasGenerated, setHasGenerated] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [mockResult, setMockResult] = useState<any>(null);
  const [injectedMetadata, setInjectedMetadata] = useState<any>(null);

  // Modals & Config
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false);
  const [docModalType, setDocModalType] = useState<'decisions' | 'tech' | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [provider, setProvider] = useState<'gemini' | 'openai'>('gemini');

  const abortControllerRef = useRef<AbortController | null>(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);

  // Initialize theme from DOM / localStorage
  useEffect(() => {
    try {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');

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
    setStreamingText(initialMock.markdownContent);

    // GSAP Choreographed Entrance Animation
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion && mainContainerRef.current) {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out', duration: 0.6 } });
      tl.from('.hero-content', { opacity: 0, y: 16, delay: 0.1 })
        .from('.hero-presets', { opacity: 0, y: 12 }, '-=0.3')
        .from('.prompt-studio-card', { opacity: 0, y: 20 }, '-=0.3')
        .from('.response-viewer-card', { opacity: 0, y: 20 }, '-=0.4');
    }
  }, []);

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

  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--foreground)] transition-colors duration-200">
      {/* Navbar with Theme Switcher */}
      <Navbar
        onOpenApiKeyModal={() => setApiKeyModalOpen(true)}
        apiKeySet={!!apiKey}
        onViewDoc={(doc) => setDocModalType(doc)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Split Console */}
      <main ref={mainContainerRef} className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6">
        <Hero onSelectPreset={handleSelectPreset} />

        {/* Split Workstation: Left Input Deck | Right Studio Hub */}
        <div className="mt-5 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (5 Cols on LG): Input Deck */}
          <div className="lg:col-span-5 sticky lg:top-20">
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

          {/* Right Column (7 Cols on LG): Response & Live Studio */}
          <div className="lg:col-span-7">
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
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E8D5CE] dark:border-[#262A36] bg-[#FFF1EC] dark:bg-[#101217] py-6 text-xs text-[#80747B] dark:text-[#94A3B8] font-sans transition-colors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-[#32102F] dark:text-white">Stunning Studio</span>
            <span className="text-[#E8D5CE] dark:text-[#262A36]">•</span>
            <span className="text-[#4A2545] dark:text-amber-400 font-medium">
              {theme === 'dark' ? 'Solaris Precision (Dark)' : 'Digital Choreography (Light)'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-sans">
            <button
              onClick={() => setDocModalType('decisions')}
              className="text-[#4E444B] dark:text-[#94A3B8] hover:text-[#32102F] dark:hover:text-white transition"
            >
              DECISIONS.md (Part 2)
            </button>
            <span className="text-[#E8D5CE] dark:text-[#262A36]">•</span>
            <button
              onClick={() => setDocModalType('tech')}
              className="text-[#4E444B] dark:text-[#94A3B8] hover:text-[#32102F] dark:hover:text-white transition"
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
