import React from 'react';
import { HighlightType } from '../types';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface VisualizerProps {
  array: number[];
  pointers: Record<string, number>;
  highlights: Record<number, HighlightType>;
}

export default function Visualizer({ array, pointers, highlights }: VisualizerProps) {
  // Map HighlightType to beautiful Tailwind styles
  const getHighlightStyles = (type: HighlightType) => {
    switch (type) {
      case 'active':
        return 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 dark:border-indigo-400 text-indigo-950 dark:text-indigo-200 shadow-indigo-100 dark:shadow-none shadow-md ring-2 ring-indigo-500/10 dark:ring-indigo-400/10 scale-105';
      case 'comparing':
        return 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 dark:border-amber-400 text-amber-900 dark:text-amber-200 shadow-amber-100 dark:shadow-none shadow-md ring-2 ring-amber-500/10 dark:ring-amber-400/10 scale-105 pulse-slow';
      case 'matched':
        return 'bg-emerald-50 dark:bg-emerald-950/45 border-emerald-500 dark:border-emerald-400 text-emerald-900 dark:text-emerald-200 shadow-emerald-100 dark:shadow-none shadow-lg ring-4 ring-emerald-500/20 dark:ring-emerald-450/20 scale-110';
      case 'swapping':
        return 'bg-purple-50 dark:bg-purple-950/45 border-purple-500 dark:border-purple-400 text-purple-900 dark:text-purple-200 shadow-purple-100 dark:shadow-none shadow-lg ring-4 ring-purple-500/20 dark:ring-purple-450/20 scale-110 rotate-1';
      case 'shifted':
        return 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 dark:border-rose-400 text-rose-900 dark:text-rose-200 shadow-rose-100 dark:shadow-none shadow-md ring-2 ring-rose-500/10 dark:ring-rose-400/10';
      case 'target':
        return 'bg-orange-50 dark:bg-orange-950/40 border-orange-500 dark:border-orange-400 text-orange-900 dark:text-orange-200 shadow-orange-100 dark:shadow-none shadow-md ring-2 ring-orange-500/10 dark:ring-orange-400/10 scale-105';
      case 'done':
        return 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-150 dark:border-emerald-900/30 text-emerald-600/80 dark:text-emerald-400/80 opacity-80';
      case 'normal':
      default:
        return 'bg-white dark:bg-slate-950 border-indigo-100 dark:border-slate-800 text-indigo-950 dark:text-slate-100 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-sm';
    }
  };

  // Group pointers by index so we can render multiple pointers nicely if they point to the same slot
  const pointersByIndex: Record<number, string[]> = {};
  Object.entries(pointers).forEach(([name, idx]) => {
    if (typeof idx === 'number' && idx >= 0 && idx < array.length) {
      if (!pointersByIndex[idx]) {
        pointersByIndex[idx] = [];
      }
      pointersByIndex[idx].push(name);
    }
  });

  const getPointerBadgeColor = (name: string) => {
    switch (name) {
      case 'i':
        return 'bg-indigo-600 text-white shadow-indigo-500/20';
      case 'j':
        return 'bg-amber-500 text-white shadow-amber-500/20';
      case 'left':
        return 'bg-violet-600 text-white';
      case 'right':
        return 'bg-rose-500 text-white';
      case 'maxIdx':
        return 'bg-emerald-600 text-white';
      case 'minIdx':
        return 'bg-teal-600 text-white';
      case 'k':
        return 'bg-purple-600 text-white';
      case 'k - 1':
        return 'bg-purple-400 text-white';
      case 'k + 1':
        return 'bg-purple-400 text-white';
      default:
        return 'bg-indigo-600 text-white';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900/30 border border-indigo-100/60 dark:border-slate-800 rounded-2xl p-3 md:p-4 shadow-sm flex flex-col items-center justify-center min-h-[125px] transition-colors duration-150">
      <div className="w-full max-w-4xl flex justify-center items-end gap-2 sm:gap-3 flex-wrap py-1.5">
        <AnimatePresence mode="popLayout">
          {array.map((value, idx) => {
            const hType = highlights[idx] || 'normal';
            const slotStyles = getHighlightStyles(hType);
            const activePointers = pointersByIndex[idx] || [];

            return (
              <motion.div
                key={idx}
                layoutId={`array-slot-${idx}-${value}`}
                initial={{ opacity: 0, y: 15, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.9 }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                className="flex flex-col items-center select-none"
              >
                {/* Index Indicator */}
                <span className="text-[10px] font-mono font-bold text-indigo-400 dark:text-indigo-500 mb-1.5">
                  idx {idx}
                </span>

                {/* Array Box */}
                <div
                  id={`array-cell-${idx}`}
                  className={`w-13 h-13 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl border-2 flex items-center justify-center font-display font-bold text-sm sm:text-base md:text-lg transition-all duration-300 ${slotStyles}`}
                >
                  {value}
                </div>

                {/* Pointer Area */}
                <div className="h-12 mt-1.5 flex flex-col items-center gap-1 w-full min-w-[48px] relative">
                  {activePointers.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center w-full"
                    >
                      <ArrowUp className="w-3.5 h-3.5 text-indigo-400 dark:text-indigo-500 -mt-1 animate-pulse" />
                      <div className="flex flex-wrap gap-1 justify-center max-w-[72px]">
                        {activePointers.map((pName) => (
                          <span
                            key={pName}
                            id={`pointer-${pName}`}
                            className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider shadow-sm ${getPointerBadgeColor(pName)}`}
                          >
                            {pName}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
