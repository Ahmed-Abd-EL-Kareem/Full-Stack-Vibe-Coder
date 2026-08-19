'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Smartphone,
  Layers,
  Code2,
  Terminal,
  FileText,
  Copy,
  Check,
  Download,
  Share2,
  CheckCircle2,
  Cpu
} from 'lucide-react';
import LivePreview from './LivePreview';
import ArchitectureView from './ArchitectureView';
import CodeViewer from './CodeViewer';
import PromptInspector from './PromptInspector';

interface ResponseViewerProps {
  appName: string;
  userPrompt: string;
  selectedIntegrations: string[];
  systemPrompt: string;
  streamingText: string;
  isStreaming: boolean;
  mockResult?: any;
  injectedMetadata?: any;
}

export default function ResponseViewer({
  appName,
  userPrompt,
  selectedIntegrations,
  systemPrompt,
  streamingText,
  isStreaming,
  mockResult,
  injectedMetadata
}: ResponseViewerProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'architecture' | 'code' | 'inspector' | 'raw'>('preview');
  const [copiedRaw, setCopiedRaw] = useState(false);

  const handleCopyRaw = () => {
    navigator.clipboard.writeText(streamingText);
    setCopiedRaw(true);
    setTimeout(() => setCopiedRaw(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([streamingText], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${appName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-spec.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 pt-10 pb-20">
      {/* Response Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-surface-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {appName || 'Generated Solution'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-surface-muted mt-1">
            Synthesized with <span className="font-semibold text-stunning-300">{selectedIntegrations.length} Active Integrations</span>
          </p>
        </div>

        {/* Global Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadMarkdown}
            className="flex items-center gap-1.5 rounded-xl border border-surface-border bg-surface-card px-3 py-1.5 text-xs font-medium text-gray-300 hover:text-white hover:border-gray-600 transition"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Export Spec</span>
          </button>

          <button
            onClick={handleCopyRaw}
            className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium transition ${
              copiedRaw
                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                : 'border-surface-border bg-surface-card text-gray-300 hover:text-white'
            }`}
          >
            {copiedRaw ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span>Copied Spec</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Copy Markdown</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-4 border-b border-surface-border/50">
        <button
          onClick={() => setActiveTab('preview')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition ${
            activeTab === 'preview'
              ? 'bg-stunning-600 text-white shadow-lg shadow-stunning-600/30'
              : 'text-surface-muted hover:text-white hover:bg-surface-card'
          }`}
        >
          <Smartphone className="h-4 w-4" />
          <span>Live Interactive Sandbox</span>
        </button>

        <button
          onClick={() => setActiveTab('architecture')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition ${
            activeTab === 'architecture'
              ? 'bg-stunning-600 text-white shadow-lg shadow-stunning-600/30'
              : 'text-surface-muted hover:text-white hover:bg-surface-card'
          }`}
        >
          <Layers className="h-4 w-4" />
          <span>Architecture & Pipeline</span>
        </button>

        <button
          onClick={() => setActiveTab('code')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition ${
            activeTab === 'code'
              ? 'bg-stunning-600 text-white shadow-lg shadow-stunning-600/30'
              : 'text-surface-muted hover:text-white hover:bg-surface-card'
          }`}
        >
          <Code2 className="h-4 w-4" />
          <span>Production Code</span>
        </button>

        <button
          onClick={() => setActiveTab('inspector')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition ${
            activeTab === 'inspector'
              ? 'bg-stunning-600 text-white shadow-lg shadow-stunning-600/30'
              : 'text-surface-muted hover:text-white hover:bg-surface-card'
          }`}
        >
          <Terminal className="h-4 w-4" />
          <span>Prompt Inspector</span>
        </button>

        <button
          onClick={() => setActiveTab('raw')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition ${
            activeTab === 'raw'
              ? 'bg-stunning-600 text-white shadow-lg shadow-stunning-600/30'
              : 'text-surface-muted hover:text-white hover:bg-surface-card'
          }`}
        >
          <FileText className="h-4 w-4" />
          <span>Raw AI Markdown</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div className="pt-6">
        {activeTab === 'preview' && (
          <LivePreview
            appName={appName}
            userPrompt={userPrompt}
            selectedIntegrationIds={selectedIntegrations}
            mockResult={mockResult}
          />
        )}

        {activeTab === 'architecture' && (
          <ArchitectureView
            selectedIntegrationIds={selectedIntegrations}
            mockResult={mockResult}
          />
        )}

        {activeTab === 'code' && (
          <CodeViewer
            codeFiles={mockResult?.codeFiles}
            rawMarkdown={streamingText}
          />
        )}

        {activeTab === 'inspector' && (
          <PromptInspector
            systemPrompt={systemPrompt}
            userPrompt={userPrompt}
            selectedIntegrationIds={selectedIntegrations}
            injectedMetadata={injectedMetadata}
          />
        )}

        {activeTab === 'raw' && (
          <div className="overflow-hidden rounded-2xl border border-surface-border bg-[#0A0C11] p-5">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-surface-border text-xs text-surface-muted">
              <span>STREAMED RESPONSE OUTPUT</span>
              <span className="font-mono text-emerald-400">{isStreaming ? 'Streaming...' : 'Complete'}</span>
            </div>
            <pre className="text-xs sm:text-sm font-mono text-gray-200 whitespace-pre-wrap leading-relaxed max-h-[600px] overflow-y-auto">
              {streamingText}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
