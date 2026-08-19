'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  const [hasGenerated, setHasGenerated] = useState<boolean>(true); // Initialized true for instant interactive split console!
  const [hasError, setHasError] = useState<boolean>(false);
  const [mockResult, setMockResult] = useState<any>(null);
  const [injectedMetadata, setInjectedMetadata] = useState<any>(null);

  // Modals & Config
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false);
  const [docModalType, setDocModalType] = useState<'decisions' | 'tech' | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [provider, setProvider] = useState<'gemini' | 'openai'>('gemini');

  const abortControllerRef = useRef<AbortController | null>(null);

  // Load stored API key config and pre-populate initial preview state on mount
  useEffect(() => {
    try {
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
  }, []);

  // Synchronize live system prompt and preview state when selection changes
  useEffect(() => {
    if (prompt.trim()) {
      const injection = buildInjectedSystemPrompt(prompt, selectedIntegrations);
      setSystemPrompt(injection.systemPrompt);
      setInjectedMetadata(injection.injectedMetadata);

      // Keep mock result reactive when user toggles integrations
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
    <div className="flex min-h-screen flex-col bg-[#FFF8F6] text-[#241915]">
      {/* Navbar */}
      <Navbar
        onOpenApiKeyModal={() => setApiKeyModalOpen(true)}
        apiKeySet={!!apiKey}
        onViewDoc={(doc) => setDocModalType(doc)}
      />

      {/* Main Split Console */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6">
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
      <footer className="border-t border-[#E8D5CE] bg-[#FFF1EC] py-6 text-xs text-[#80747B] font-sans">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-[#32102F]">Stunning Studio</span>
            <span className="text-[#E8D5CE]">•</span>
            <span className="text-[#4A2545] font-medium">Digital Choreography (Ballet Aesthetic)</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-sans">
            <button
              onClick={() => setDocModalType('decisions')}
              className="text-[#4E444B] hover:text-[#32102F] transition"
            >
              DECISIONS.md (Part 2)
            </button>
            <span className="text-[#E8D5CE]">•</span>
            <button
              onClick={() => setDocModalType('tech')}
              className="text-[#4E444B] hover:text-[#32102F] transition"
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
