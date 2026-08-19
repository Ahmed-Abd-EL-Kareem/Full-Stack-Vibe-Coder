'use client';

import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  Layers,
  Code2,
  Terminal,
  FileText,
  Copy,
  Check,
  Download,
  AlertTriangle,
  RotateCcw,
  Sparkles
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
  onRetry?: () => void;
  hasError?: boolean;
}

export default function ResponseViewer({
  appName,
  userPrompt,
  selectedIntegrations,
  systemPrompt,
  streamingText,
  isStreaming,
  mockResult,
  injectedMetadata,
  onRetry,
  hasError = false
}: ResponseViewerProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'architecture' | 'code' | 'inspector' | 'raw'>('preview');
  const [copiedRaw, setCopiedRaw] = useState(false);

  // Keyboard shortcut switching for 1-5
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.key === '1') setActiveTab('preview');
      if (e.key === '2') setActiveTab('architecture');
      if (e.key === '3') setActiveTab('code');
      if (e.key === '4') setActiveTab('inspector');
      if (e.key === '5') setActiveTab('raw');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
    link.download = `${(appName || 'generated-solution').toLowerCase().replace(/[^a-z0-9]/g, '-')}-spec.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full flex flex-col gap-3.5">
      {/* Error Recovery Alert Card */}
      {hasError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 flex items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="h-4 w-4 text-red-600 shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-red-900">Stream Interrupted</h4>
              <p className="text-[11px] text-red-700">The synthesized offline architecture fallback is active.</p>
            </div>
          </div>
          {onRetry && (
            <button
              onClick={onRetry}
              className="flex items-center gap-1 rounded-full bg-white border border-red-300 px-3 py-1 text-xs font-sans font-semibold text-red-800 hover:bg-red-100 transition shadow-sm"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Retry</span>
            </button>
          )}
        </div>
      )}

      {/* Response Workspace Container */}
      <div className="rounded-3xl border border-[#E8D5CE] bg-[#FFFFFF] p-5 sm:p-6 shadow-ballet-card">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E8D5CE]">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#A8B79A]" />
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#32102F] tracking-tight">
                {appName || 'Synthesized Solution'}
              </h2>
            </div>
            <p className="text-xs text-[#4E444B] mt-0.5 font-sans">
              <span className="text-[#4A2545] font-semibold">{selectedIntegrations.length} Active Services</span>
              {selectedIntegrations.length > 0 && ` (${selectedIntegrations.join(', ')})`}
            </p>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadMarkdown}
              className="flex items-center gap-1.5 rounded-full border border-[#E8D5CE] bg-[#FFF8F6] px-3 py-1.5 text-xs font-sans font-medium text-[#4E444B] hover:text-[#32102F] hover:bg-[#FFE9E2] transition shadow-sm"
            >
              <Download className="h-3.5 w-3.5 text-[#4A2545]" />
              <span className="hidden sm:inline">Export Spec (.md)</span>
            </button>

            <button
              onClick={handleCopyRaw}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-sans font-medium transition shadow-sm ${
                copiedRaw
                  ? 'border-[#A8B79A] bg-[#A8B79A]/20 text-[#2E4A28]'
                  : 'border-[#E8D5CE] bg-[#FFF8F6] text-[#4E444B] hover:text-[#32102F] hover:bg-[#FFE9E2]'
              }`}
            >
              {copiedRaw ? (
                <>
                  <Check className="h-3.5 w-3.5 text-[#2E4A28]" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-[#4A2545]" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 5-Studio Tab Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-3.5 border-b border-[#E8D5CE] pb-3.5 scrollbar-none">
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-sans font-medium transition shrink-0 ${
              activeTab === 'preview'
                ? 'bg-[#4A2545] text-white shadow-sm'
                : 'text-[#4E444B] hover:text-[#32102F] hover:bg-[#FFF8F6]'
            }`}
          >
            <Smartphone className="h-3.5 w-3.5" />
            <span>Interactive Sandbox</span>
            <span className="opacity-70 text-[10px] ml-0.5">1</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-sans font-medium transition shrink-0 ${
              activeTab === 'architecture'
                ? 'bg-[#4A2545] text-white shadow-sm'
                : 'text-[#4E444B] hover:text-[#32102F] hover:bg-[#FFF8F6]'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Architecture & Flow</span>
            <span className="opacity-70 text-[10px] ml-0.5">2</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-sans font-medium transition shrink-0 ${
              activeTab === 'code'
                ? 'bg-[#4A2545] text-white shadow-sm'
                : 'text-[#4E444B] hover:text-[#32102F] hover:bg-[#FFF8F6]'
            }`}
          >
            <Code2 className="h-3.5 w-3.5" />
            <span>Production Code</span>
            <span className="opacity-70 text-[10px] ml-0.5">3</span>
          </button>

          <button
            onClick={() => setActiveTab('inspector')}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-sans font-medium transition shrink-0 ${
              activeTab === 'inspector'
                ? 'bg-[#4A2545] text-white shadow-sm'
                : 'text-[#4E444B] hover:text-[#32102F] hover:bg-[#FFF8F6]'
            }`}
          >
            <Terminal className="h-3.5 w-3.5" />
            <span>System Prompt</span>
            <span className="opacity-70 text-[10px] ml-0.5">4</span>
          </button>

          <button
            onClick={() => setActiveTab('raw')}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-sans font-medium transition shrink-0 ${
              activeTab === 'raw'
                ? 'bg-[#4A2545] text-white shadow-sm'
                : 'text-[#4E444B] hover:text-[#32102F] hover:bg-[#FFF8F6]'
            }`}
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Raw Markdown</span>
            <span className="opacity-70 text-[10px] ml-0.5">5</span>
          </button>
        </div>

        {/* Studio Body Panes */}
        <div className="pt-5">
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
            <div className="overflow-hidden rounded-2xl border border-[#E8D5CE] bg-[#FFF8F6] p-4 font-mono text-xs shadow-inner">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E8D5CE] text-[#80747B]">
                <span>RAW STREAM OUTPUT</span>
                <span className="text-[#2E4A28] font-bold font-mono text-[11px] bg-[#A8B79A]/20 px-2 py-0.5 rounded-full">
                  {isStreaming ? 'Streaming...' : 'Complete'}
                </span>
              </div>
              <pre className="text-[#241915] whitespace-pre-wrap leading-relaxed max-h-[500px] overflow-y-auto">
                {streamingText || '// Waiting for response...'}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
