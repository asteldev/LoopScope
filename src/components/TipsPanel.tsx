import React from 'react';
import { Lightbulb, BookOpen } from 'lucide-react';

interface TipsPanelProps {
  tips: string[];
}

export default function TipsPanel({ tips }: TipsPanelProps) {
  return (
    <div className="bg-indigo-50/30 dark:bg-indigo-950/20 rounded-2xl border border-indigo-100 dark:border-indigo-900/30 p-5 shadow-sm transition-colors duration-150">
      <div className="flex items-center gap-2 border-b border-indigo-100/80 dark:border-indigo-900/40 pb-3 mb-4">
        <Lightbulb className="w-5 h-5 text-indigo-600 dark:text-indigo-400 animate-pulse" />
        <div>
          <h3 className="font-display font-bold text-sm text-indigo-950 dark:text-indigo-200">Beginner Pro Tips</h3>
          <p className="text-[11px] sm:text-xs text-indigo-700/85 dark:text-indigo-400/80">Key intuition, complexity, and common compiler pitfalls.</p>
        </div>
      </div>

      <div className="space-y-3">
        {tips.map((tip, idx) => (
          <div key={idx} className="flex gap-3 items-start">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-400 text-xs font-bold flex items-center justify-center">
              {idx + 1}
            </span>
            <p className="text-xs sm:text-sm text-indigo-900/90 dark:text-slate-300 leading-relaxed font-sans font-medium">
              {tip}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-indigo-100/50 dark:border-indigo-900/30 flex items-center gap-2 text-[11px] text-indigo-700 dark:text-indigo-400 font-mono">
        <BookOpen className="w-3.5 h-3.5" />
        <span>LoopScope Learning Kit • Read carefully to level up!</span>
      </div>
    </div>
  );
}
