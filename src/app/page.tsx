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
  const [hasGenerated, setHasGenerated] = useState<boolean>(false);
  const [mockResult, setMockResult] = useState<any>(null);
  const [injectedMetadata, setInjectedMetadata] = useState<any>(null);

  // Modals & Config
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false);
  const [docModalType, setDocModalType] = useState<'decisions' | 'tech' | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [provider, setProvider] = useState<'gemini' | 'openai'>('gemini');

  const responseSectionRef = useRef<HTMLDivElement>(null);

  // Load stored API key config on mount
  useEffect(() => {
    try {
      const storedKey = localStorage.getItem('stunning_api_key');
      const storedProv = localStorage.getItem('stunning_provider') as 'gemini' | 'openai';
      if (storedKey) setApiKey(storedKey);
      if (storedProv) setProvider(storedProv);
    } catch {}

    // Pre-calculate initial system prompt for preview
    const initialInjection = buildInjectedSystemPrompt(prompt, selectedIntegrations);
    setSystemPrompt(initialInjection.systemPrompt);
  }, []);

  // Update prompt inspector whenever selections change
  useEffect(() => {
    if (prompt.trim()) {
      const injection = buildInjectedSystemPrompt(prompt, selectedIntegrations);
      setSystemPrompt(injection.systemPrompt);
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

  const handleSubmit = async () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setHasGenerated(true);
    setStreamingText('');
    setMockResult(null);

    // Scroll smoothly to response section
    setTimeout(() => {
      responseSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt.trim(),
          selectedIntegrations,
          apiKey: apiKey || undefined,
          provider
        })
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
                // Celebration trigger!
                confetti({
                  particleCount: 80,
                  spread: 70,
                  origin: { y: 0.6 }
                });
              }
            } catch {
              // Plain text fallback
              accumulatedText += dataStr;
              setStreamingText(accumulatedText);
            }
          }
        }
      }

      // If mock result wasn't sent in metadata, construct fallback structure
      if (!mockResult) {
        const fallbackInjection = buildInjectedSystemPrompt(prompt, selectedIntegrations);
        setInjectedMetadata(fallbackInjection.injectedMetadata);
      }
    } catch (err: any) {
      console.error('Generation error:', err);
      setStreamingText(prev => prev + `\n\n⚠️ Error during generation: ${err.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const appName = prompt.split(' ')[0] ? `${prompt.split(' ').slice(0, 3).join(' ')} Platform` : 'Stunning AI Platform';

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar */}
      <Navbar
        onOpenApiKeyModal={() => setApiKeyModalOpen(true)}
        apiKeySet={!!apiKey}
        onViewDoc={(doc) => setDocModalType(doc)}
      />

      {/* Main Hero & Studio */}
      <main className="flex-1">
        <Hero onSelectPreset={handleSelectPreset} />

        <PromptStudio
          prompt={prompt}
          setPrompt={setPrompt}
          selectedIntegrations={selectedIntegrations}
          setSelectedIntegrations={setSelectedIntegrations}
          onSubmit={handleSubmit}
          isLoading={isGenerating}
        />

        {/* Response Section */}
        <div ref={responseSectionRef}>
          {hasGenerated && (
            <ResponseViewer
              appName={mockResult?.title || appName}
              userPrompt={prompt}
              selectedIntegrations={selectedIntegrations}
              systemPrompt={systemPrompt}
              streamingText={streamingText}
              isStreaming={isGenerating}
              mockResult={mockResult}
              injectedMetadata={injectedMetadata}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-surface-border bg-surface/50 py-8 text-center text-xs text-surface-muted">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">Stunning Full-Stack Vibe Coder Assessment</span>
            <span>• Built for Stunning.so</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setDocModalType('decisions')}
              className="text-gray-400 hover:text-white transition"
            >
              DECISIONS.md
            </button>
            <span>•</span>
            <button
              onClick={() => setDocModalType('tech')}
              className="text-gray-400 hover:text-white transition"
            >
              TECH.md
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
