'use client';

import React, { useState } from 'react';
import { Copy, Check, FileCode, Download, Code2 } from 'lucide-react';

interface CodeFile {
  filename: string;
  language: string;
  code: string;
}

interface CodeViewerProps {
  codeFiles?: CodeFile[];
  rawMarkdown?: string;
}

export default function CodeViewer({ codeFiles = [], rawMarkdown = '' }: CodeViewerProps) {
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const currentFile = codeFiles[activeFileIndex] || {
    filename: 'GeneratedApp.tsx',
    language: 'tsx',
    code: '// No code generated yet. Submit a prompt to generate production code.'
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([currentFile.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = currentFile.filename.split('/').pop() || 'code.ts';
    link.click();
    URL.revokeObjectURL(url);
  };

  const lines = currentFile.code.split('\n');

  return (
    <div className="overflow-hidden rounded-2xl border border-surface-border bg-[#0E1017] shadow-2xl">
      {/* File Tabs & Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-surface-border bg-[#12151F] px-4 py-2.5">
        {/* File Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {codeFiles.map((file, idx) => (
            <button
              key={idx}
              onClick={() => setActiveFileIndex(idx)}
              className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-mono transition ${
                activeFileIndex === idx
                  ? 'bg-stunning-500/20 text-stunning-300 border border-stunning-500/30'
                  : 'text-surface-muted hover:text-white hover:bg-surface-hover'
              }`}
            >
              <FileCode className="h-3.5 w-3.5" />
              <span>{file.filename.split('/').pop()}</span>
            </button>
          ))}
        </div>

        {/* Copy & Download Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 rounded-lg border border-surface-border bg-surface px-2.5 py-1 text-xs text-gray-300 hover:text-white hover:border-gray-600 transition"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Download File</span>
          </button>

          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition ${
              copied
                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                : 'border-surface-border bg-surface text-gray-300 hover:text-white hover:border-gray-600'
            }`}
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Editor Body */}
      <div className="flex font-mono text-xs overflow-x-auto p-4 leading-relaxed max-h-[500px]">
        {/* Line Numbers */}
        <div className="select-none pr-4 text-right text-gray-600 border-r border-surface-border/50">
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Code Content */}
        <pre className="pl-4 text-gray-200 overflow-x-auto">
          <code>{currentFile.code}</code>
        </pre>
      </div>
    </div>
  );
}
