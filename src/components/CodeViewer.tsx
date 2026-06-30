import React from 'react';
import { CodeLine } from '../types';
import { Terminal } from 'lucide-react';

interface CodeViewerProps {
  code: CodeLine[];
  activeLine: number;
  selectedLanguage?: string;
  onLanguageChange?: (lang: string) => void;
  showLanguageSelector?: boolean;
}

export default function CodeViewer({
  code,
  activeLine,
  selectedLanguage,
  onLanguageChange,
  showLanguageSelector,
}: CodeViewerProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const activeEl = containerRef.current?.querySelector(`#code-line-${activeLine}`);
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [activeLine]);

  return (
    <div className="bg-white dark:bg-[#111827] text-slate-800 dark:text-slate-100 rounded-2xl p-4 shadow-sm border border-slate-200/80 dark:border-slate-800/80 flex flex-col h-full min-h-[200px] transition-colors duration-150">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5 mb-3 text-xs font-mono text-slate-500 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span className="font-semibold text-slate-700 dark:text-slate-300">Algorithm Logic - Active Execution</span>
        </div>
        {showLanguageSelector && onLanguageChange && (
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-slate-400 dark:text-slate-500">Lang:</span>
            <select
              id="curated-language-selector"
              value={selectedLanguage || 'javascript'}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-[10px] font-semibold border border-slate-200 dark:border-slate-800 rounded px-1.5 py-0.5 outline-none cursor-pointer focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-850 transition-colors"
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="c">C</option>
              <option value="cpp">C++</option>
              <option value="java">Java</option>
              <option value="python">Python</option>
              <option value="rust">Rust</option>
              <option value="go">Go</option>
            </select>
          </div>
        )}
      </div>

      <div 
        ref={containerRef}
        className="font-mono text-xs sm:text-sm leading-relaxed overflow-y-auto flex-1 whitespace-pre pr-1"
      >
        {code.map((line, idx) => {
          const lineNum = idx + 1;
          const isHighlighted = lineNum === activeLine;

          return (
            <div
              key={idx}
              id={`code-line-${lineNum}`}
              className={`flex items-start py-0.5 px-2 rounded-md transition-all duration-150 ${
                isHighlighted
                  ? 'bg-indigo-50/90 dark:bg-indigo-950/40 text-indigo-950 dark:text-indigo-200 font-bold border-l-4 border-indigo-600 -ml-2'
                  : 'opacity-75 text-slate-600 dark:text-slate-450 font-medium'
              }`}
            >
              <span className="w-6 text-right select-none opacity-40 text-[10px] text-slate-400 mr-3 mt-0.5 font-mono">
                {lineNum}
              </span>
              <span style={{ paddingLeft: `${line.indent * 1.5}rem` }} className="break-all font-mono">
                {line.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
