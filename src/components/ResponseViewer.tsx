'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
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
  Sparkles,
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
  const tabContentRef = useRef<HTMLDivElement>(null);

  // GSAP tab switch transition using autoAlpha and y transform
  useEffect(() => {
    if (tabContentRef.current) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReducedMotion) {
        gsap.fromTo(
          tabContentRef.current,
          { autoAlpha: 0, y: 8 },
          { autoAlpha: 1, y: 0, duration: 0.28, ease: 'power2.out', overwrite: 'auto' }
        );
      }
    }
  }, [activeTab]);

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
    <div className="response-viewer-card w-full flex flex-col gap-4">
      {/* Error Recovery Alert Card */}
      {hasError && (
        <div className="rounded-2xl border border-red-200 dark:border-red-500/30 bg-red-50 dark:bg-red-950/20 p-4 flex items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400 shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-red-900 dark:text-white">Stream Interrupted</h4>
              <p className="text-[11px] text-red-700 dark:text-red-300">The synthesized offline architecture fallback is active.</p>
            </div>
          </div>
          {onRetry && (
            <button
              onClick={onRetry}
              className="flex items-center gap-1 rounded-full bg-white dark:bg-red-900/40 border border-red-300 dark:border-red-500/40 px-3 py-1 text-xs font-sans font-semibold text-red-800 dark:text-red-200 hover:bg-red-100 transition shadow-sm"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Retry</span>
            </button>
          )}
        </div>
      )}

      {/* Response Workspace Container: Build A SaaS Studio */}
      <div className="rounded-3xl border border-[#E5D5CF] dark:border-[#3D2E35] bg-[#FFFFFF] dark:bg-[#241A1F] p-5 sm:p-6 md:p-7 shadow-ballet-card dark:shadow-velvet-card transition-colors">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E5D5CF] dark:border-[#3D2E35] transition-colors">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#4A7A5E] dark:bg-[#7EBF96] animate-pulse" />
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-serif text-lg sm:text-xl font-bold text-[#2A1525] dark:text-[#F2EDE9] tracking-tight transition-colors">
                  Build A SaaS Studio
                </span>
                <span className="rounded-full bg-[#F5EBE8] dark:bg-[#2D2025] px-3 py-0.5 font-sans text-xs font-semibold text-[#6B2D5B] dark:text-[#C98DB8] border border-[#E5D5CF] dark:border-[#3D2E35]">
                  {appName || 'Synthesized Solution'}
                </span>
              </div>
            </div>
            <p className="text-xs text-[#5A4550] dark:text-[#A89B9F] mt-1 font-sans transition-colors">
              <span className="text-[#6B2D5B] dark:text-[#C98DB8] font-semibold">{selectedIntegrations.length} Active Services</span>
              {selectedIntegrations.length > 0 && ` (${selectedIntegrations.join(', ')})`}
            </p>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadMarkdown}
              className="flex items-center gap-1.5 rounded-full border border-[#E5D5CF] dark:border-[#3D2E35] bg-[#FAF7F5] dark:bg-[#2D2025] px-3.5 py-1.5 text-xs font-sans font-medium text-[#5A4550] dark:text-[#A89B9F] hover:text-[#2A1525] dark:hover:text-white hover:bg-[#F5EBE8] dark:hover:bg-[#3D2E35] transition shadow-sm"
            >
              <Download className="h-3.5 w-3.5 text-[#6B2D5B] dark:text-[#C98DB8]" />
              <span className="hidden sm:inline">Export Spec (.md)</span>
            </button>

            <button
              onClick={handleCopyRaw}
              className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-sans font-medium transition shadow-sm ${
                copiedRaw
                  ? 'border-[#4A7A5E] dark:border-[#7EBF96]/40 bg-[#4A7A5E]/20 dark:bg-[#4A7A5E]/30 text-[#2E4A28] dark:text-[#96CCAA]'
                  : 'border-[#E5D5CF] dark:border-[#3D2E35] bg-[#FAF7F5] dark:bg-[#2D2025] text-[#5A4550] dark:text-[#A89B9F] hover:text-[#2A1525] dark:hover:text-white hover:bg-[#F5EBE8]'
              }`}
            >
              {copiedRaw ? (
                <>
                  <Check className="h-3.5 w-3.5 text-[#2E4A28] dark:text-[#7EBF96]" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-[#6B2D5B] dark:text-[#C98DB8]" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 5-Studio Tab Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pt-4 border-b border-[#E5D5CF] dark:border-[#3D2E35] pb-4 scrollbar-none transition-colors">
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-sans font-medium transition shrink-0 ${
              activeTab === 'preview'
                ? 'bg-[#6B2D5B] dark:bg-[#C98DB8] text-white dark:text-[#1A1216] font-semibold shadow-sm'
                : 'text-[#5A4550] dark:text-[#A89B9F] hover:text-[#2A1525] dark:hover:text-white hover:bg-[#FAF7F5] dark:hover:bg-[#2D2025]'
            }`}
          >
            <Smartphone className="h-3.5 w-3.5" />
            <span>Interactive Sandbox</span>
            <span className="opacity-70 text-[10px] ml-0.5">1</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-sans font-medium transition shrink-0 ${
              activeTab === 'architecture'
                ? 'bg-[#6B2D5B] dark:bg-[#C98DB8] text-white dark:text-[#1A1216] font-semibold shadow-sm'
                : 'text-[#5A4550] dark:text-[#A89B9F] hover:text-[#2A1525] dark:hover:text-white hover:bg-[#FAF7F5] dark:hover:bg-[#2D2025]'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Architecture & Flow</span>
            <span className="opacity-70 text-[10px] ml-0.5">2</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-sans font-medium transition shrink-0 ${
              activeTab === 'code'
                ? 'bg-[#6B2D5B] dark:bg-[#C98DB8] text-white dark:text-[#1A1216] font-semibold shadow-sm'
                : 'text-[#5A4550] dark:text-[#A89B9F] hover:text-[#2A1525] dark:hover:text-white hover:bg-[#FAF7F5] dark:hover:bg-[#2D2025]'
            }`}
          >
            <Code2 className="h-3.5 w-3.5" />
            <span>Production Code</span>
            <span className="opacity-70 text-[10px] ml-0.5">3</span>
          </button>

          <button
            onClick={() => setActiveTab('inspector')}
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-sans font-medium transition shrink-0 ${
              activeTab === 'inspector'
                ? 'bg-[#6B2D5B] dark:bg-[#C98DB8] text-white dark:text-[#1A1216] font-semibold shadow-sm'
                : 'text-[#5A4550] dark:text-[#A89B9F] hover:text-[#2A1525] dark:hover:text-white hover:bg-[#FAF7F5] dark:hover:bg-[#2D2025]'
            }`}
          >
            <Terminal className="h-3.5 w-3.5" />
            <span>System Prompt</span>
            <span className="opacity-70 text-[10px] ml-0.5">4</span>
          </button>

          <button
            onClick={() => setActiveTab('raw')}
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-sans font-medium transition shrink-0 ${
              activeTab === 'raw'
                ? 'bg-[#6B2D5B] dark:bg-[#C98DB8] text-white dark:text-[#1A1216] font-semibold shadow-sm'
                : 'text-[#5A4550] dark:text-[#A89B9F] hover:text-[#2A1525] dark:hover:text-white hover:bg-[#FAF7F5] dark:hover:bg-[#2D2025]'
            }`}
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Raw Markdown</span>
            <span className="opacity-70 text-[10px] ml-0.5">5</span>
          </button>
        </div>

        {/* Studio Body Panes */}
        <div ref={tabContentRef} className="pt-6">
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
            <div className="overflow-hidden rounded-2xl border border-[#E5D5CF] dark:border-[#3D2E35] bg-[#FAF7F5] dark:bg-[#1A1216] p-4 font-mono text-xs shadow-inner transition-colors">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E5D5CF] dark:border-[#3D2E35] text-[#80747B] dark:text-[#A89B9F]">
                <span>RAW STREAM OUTPUT</span>
                <span className="text-[#2E4A28] dark:text-[#7EBF96] font-bold font-mono text-[11px] bg-[#4A7A5E]/20 dark:bg-[#4A7A5E]/30 px-2 py-0.5 rounded-full">
                  {isStreaming ? 'Streaming...' : 'Complete'}
                </span>
              </div>
              <pre className="text-[#1F1518] dark:text-[#F2EDE9] whitespace-pre-wrap leading-relaxed max-h-[500px] overflow-y-auto">
                {streamingText || '// Waiting for response...'}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
