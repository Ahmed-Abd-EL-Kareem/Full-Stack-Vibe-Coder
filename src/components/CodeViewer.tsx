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
    <div className="overflow-hidden rounded-2xl border border-[#E5D5CF] dark:border-[#3D2E35] bg-[#FAF7F5] dark:bg-[#1A1216] shadow-sm dark:shadow-velvet-card transition-colors">
      {/* File Tabs & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5D5CF] dark:border-[#3D2E35] bg-white dark:bg-[#241A1F] px-4 py-2.5 transition-colors">
        {/* File Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {files.map((file, idx) => (
            <button
              key={idx}
              onClick={() => setActiveFileIndex(idx)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-mono transition ${
                activeFileIndex === idx
                  ? 'bg-[#6B2D5B] dark:bg-[#C98DB8]/20 text-white dark:text-[#D4A3C8] border dark:border-[#C98DB8]/40 shadow-sm font-bold'
                  : 'text-[#5A4550] dark:text-[#A89B9F] hover:text-[#2A1525] dark:hover:text-[#F2EDE9] hover:bg-[#F5EBE8] dark:hover:bg-[#2D2025]'
              }`}
            >
              <FileCode className="h-3 w-3 text-[#D4764E] dark:text-[#C98DB8]" />
              <span>{file.filename.split('/').pop()}</span>
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleDownload}
            className="flex items-center gap-1 rounded-full border border-[#E5D5CF] dark:border-[#3D2E35] bg-[#FAF7F5] dark:bg-[#2D2025] px-2.5 py-1 text-xs font-sans font-medium text-[#5A4550] dark:text-[#A89B9F] hover:text-[#2A1525] dark:hover:text-white hover:bg-[#F5EBE8] dark:hover:border-[#5A4550] transition shadow-sm"
          >
            <Download className="h-3 w-3 text-[#6B2D5B] dark:text-[#C98DB8]" />
            <span className="hidden sm:inline">Download</span>
          </button>

          <button
            onClick={handleCopy}
            className={`flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-sans font-medium transition shadow-sm ${
              copied
                ? 'border-[#4A7A5E] dark:border-[#7EBF96]/40 bg-[#4A7A5E]/20 dark:bg-[#4A7A5E]/30 text-[#2E4A28] dark:text-[#96CCAA]'
                : 'border-[#E5D5CF] dark:border-[#3D2E35] bg-[#FAF7F5] dark:bg-[#2D2025] text-[#5A4550] dark:text-[#A89B9F] hover:text-[#2A1525] dark:hover:text-white hover:bg-[#F5EBE8]'
            }`}
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-[#2E4A28] dark:text-[#7EBF96]" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3 text-[#6B2D5B] dark:text-[#C98DB8]" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Path Breadcrumb */}
      <div className="px-4 py-1.5 bg-[#F5EBE8] dark:bg-[#1F161B] border-b border-[#E5D5CF] dark:border-[#3D2E35] text-[11px] font-mono text-[#80747B] dark:text-[#A89B9F] flex items-center justify-between transition-colors">
        <div className="flex items-center gap-1.5">
          <FolderTree className="h-3.5 w-3.5 text-[#6B2D5B] dark:text-[#C98DB8]" />
          <span className="text-[#2A1525] dark:text-[#F2EDE9] font-semibold">{currentFile.filename}</span>
        </div>
        <span className="text-[#80747B] dark:text-[#7A6B70]">Next.js 15 TypeScript</span>
      </div>

      {/* Code Editor */}
      <div className="flex font-mono text-xs overflow-x-auto p-4 leading-relaxed max-h-[460px] bg-white dark:bg-[#140E11] transition-colors">
        {/* Line Numbers */}
        <div className="select-none pr-3.5 text-right text-[#80747B] dark:text-[#7A6B70] border-r border-[#E5D5CF] dark:border-[#3D2E35] font-mono">
          {lines.map((_, i) => (
            <div key={i} className="leading-5">{i + 1}</div>
          ))}
        </div>

        {/* Code Content */}
        <pre className="pl-4 text-[#1F1518] dark:text-[#F2EDE9] overflow-x-auto leading-5 text-xs">
          <code>{currentFile.code}</code>
        </pre>
      </div>
    </div>
  );
}
