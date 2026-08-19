'use client';

import React, { useState } from 'react';
import { Copy, Check, FileCode, Download, FolderTree } from 'lucide-react';

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

  const defaultFiles: CodeFile[] = [
    {
      filename: 'src/app/api/orchestrator/route.ts',
      language: 'typescript',
      code: `import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { action, payload, userId } = await req.json();
    console.log(\`[Orchestrator] Dispatching action: \${action}\`);

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}`
    }
  ];

  const files = codeFiles.length > 0 ? codeFiles : defaultFiles;
  const currentFile = files[activeFileIndex] || files[0];

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
    <div className="overflow-hidden rounded-2xl border border-[#E8D5CE] dark:border-[#262A36] bg-[#FFF8F6] dark:bg-[#090A0D] shadow-sm transition-colors">
      {/* File Tabs & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E8D5CE] dark:border-[#262A36] bg-white dark:bg-[#14161B] px-4 py-2.5 transition-colors">
        {/* File Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {files.map((file, idx) => (
            <button
              key={idx}
              onClick={() => setActiveFileIndex(idx)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-mono transition ${
                activeFileIndex === idx
                  ? 'bg-[#4A2545] dark:bg-amber-500/20 text-white dark:text-amber-300 border dark:border-amber-500/40 shadow-sm font-bold'
                  : 'text-[#4E444B] dark:text-[#94A3B8] hover:text-[#32102F] dark:hover:text-white hover:bg-[#FFE9E2] dark:hover:bg-[#1A1D24]'
              }`}
            >
              <FileCode className="h-3 w-3 text-[#D9A5A0] dark:text-amber-400" />
              <span>{file.filename.split('/').pop()}</span>
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleDownload}
            className="flex items-center gap-1 rounded-full border border-[#E8D5CE] dark:border-[#262A36] bg-[#FFF8F6] dark:bg-[#1A1D24] px-2.5 py-1 text-xs font-sans font-medium text-[#4E444B] dark:text-[#94A3B8] hover:text-[#32102F] dark:hover:text-white hover:bg-[#FFE9E2] dark:hover:border-[#383E4F] transition shadow-sm"
          >
            <Download className="h-3 w-3 text-[#4A2545] dark:text-amber-400" />
            <span className="hidden sm:inline">Download</span>
          </button>

          <button
            onClick={handleCopy}
            className={`flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-sans font-medium transition shadow-sm ${
              copied
                ? 'border-[#A8B79A] dark:border-emerald-500/40 bg-[#A8B79A]/20 dark:bg-emerald-950/30 text-[#2E4A28] dark:text-emerald-300'
                : 'border-[#E8D5CE] dark:border-[#262A36] bg-[#FFF8F6] dark:bg-[#1A1D24] text-[#4E444B] dark:text-[#94A3B8] hover:text-[#32102F] dark:hover:text-white hover:bg-[#FFE9E2]'
            }`}
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-[#2E4A28] dark:text-emerald-400" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3 text-[#4A2545] dark:text-amber-400" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Path Breadcrumb */}
      <div className="px-4 py-1.5 bg-[#FFF1EC] dark:bg-[#0D0E11] border-b border-[#E8D5CE] dark:border-[#1E222D] text-[11px] font-mono text-[#80747B] dark:text-solaris-muted flex items-center justify-between transition-colors">
        <div className="flex items-center gap-1.5">
          <FolderTree className="h-3.5 w-3.5 text-[#4A2545] dark:text-amber-400" />
          <span className="text-[#32102F] dark:text-gray-300 font-semibold">{currentFile.filename}</span>
        </div>
        <span className="text-[#80747B] dark:text-solaris-dim">Next.js 15 TypeScript</span>
      </div>

      {/* Code Editor */}
      <div className="flex font-mono text-xs overflow-x-auto p-4 leading-relaxed max-h-[460px] bg-white dark:bg-[#090A0D] transition-colors">
        {/* Line Numbers */}
        <div className="select-none pr-3.5 text-right text-[#A3928E] dark:text-[#454B5C] border-r border-[#E8D5CE] dark:border-[#1E222D] font-mono">
          {lines.map((_, i) => (
            <div key={i} className="leading-5">{i + 1}</div>
          ))}
        </div>

        {/* Code Content */}
        <pre className="pl-4 text-[#241915] dark:text-gray-200 overflow-x-auto leading-5 text-xs">
          <code>{currentFile.code}</code>
        </pre>
      </div>
    </div>
  );
}
