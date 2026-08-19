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
    <div className="overflow-hidden rounded-2xl border border-[#E8D5CE] bg-[#FFF8F6] shadow-sm">
      {/* File Tabs & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E8D5CE] bg-white px-4 py-2.5">
        {/* File Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {files.map((file, idx) => (
            <button
              key={idx}
              onClick={() => setActiveFileIndex(idx)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-mono transition ${
                activeFileIndex === idx
                  ? 'bg-[#4A2545] text-white shadow-sm font-bold'
                  : 'text-[#4E444B] hover:text-[#32102F] hover:bg-[#FFE9E2]'
              }`}
            >
              <FileCode className="h-3 w-3" />
              <span>{file.filename.split('/').pop()}</span>
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleDownload}
            className="flex items-center gap-1 rounded-full border border-[#E8D5CE] bg-[#FFF8F6] px-2.5 py-1 text-xs font-sans font-medium text-[#4E444B] hover:text-[#32102F] hover:bg-[#FFE9E2] transition shadow-sm"
          >
            <Download className="h-3 w-3 text-[#4A2545]" />
            <span className="hidden sm:inline">Download</span>
          </button>

          <button
            onClick={handleCopy}
            className={`flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-sans font-medium transition shadow-sm ${
              copied
                ? 'border-[#A8B79A] bg-[#A8B79A]/20 text-[#2E4A28]'
                : 'border-[#E8D5CE] bg-[#FFF8F6] text-[#4E444B] hover:text-[#32102F] hover:bg-[#FFE9E2]'
            }`}
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-[#2E4A28]" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3 text-[#4A2545]" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Path Breadcrumb */}
      <div className="px-4 py-1.5 bg-[#FFF1EC] border-b border-[#E8D5CE] text-[11px] font-mono text-[#80747B] flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <FolderTree className="h-3.5 w-3.5 text-[#4A2545]" />
          <span className="text-[#32102F] font-semibold">{currentFile.filename}</span>
        </div>
        <span className="text-[#80747B]">Next.js 15 TypeScript</span>
      </div>

      {/* Code Editor */}
      <div className="flex font-mono text-xs overflow-x-auto p-4 leading-relaxed max-h-[460px] bg-white">
        {/* Line Numbers */}
        <div className="select-none pr-3.5 text-right text-[#A3928E] border-r border-[#E8D5CE] font-mono">
          {lines.map((_, i) => (
            <div key={i} className="leading-5">{i + 1}</div>
          ))}
        </div>

        {/* Code Content */}
        <pre className="pl-4 text-[#241915] overflow-x-auto leading-5 text-xs">
          <code>{currentFile.code}</code>
        </pre>
      </div>
    </div>
  );
}
