import React from 'react';
import { Step } from '../types';
import { Database, Activity } from 'lucide-react';

interface StatsAndVariablesProps {
  step: Step;
}

export default function StatsAndVariables({ step }: StatsAndVariablesProps) {
  const { stats, variables } = step;

  const statItems = [
    {
      label: 'Iterations',
      value: stats.iterations,
      desc: 'Loops run',
      color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-100 dark:border-indigo-900/30',
    },
    {
      label: 'Comparisons',
      value: stats.comparisons,
      desc: 'Elements compared',
      color: 'text-amber-600 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/30',
    },
    {
      label: 'Swaps & Shifts',
      value: stats.swapsOrShifts,
      desc: 'Element re-orders',
      color: 'text-rose-600 dark:text-rose-400 bg-rose-50/50 dark:bg-rose-950/20 border-rose-100 dark:border-rose-900/30',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 h-full">
      {/* Local Variables Memory Panel */}
      <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800/80 p-3 sm:p-4 shadow-sm flex flex-col min-h-0 transition-colors duration-150">
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2 mb-2 flex-shrink-0">
          <Database className="w-4 h-4 text-slate-500 dark:text-slate-400" />
          <div>
            <h3 className="font-display font-bold text-sm sm:text-base text-slate-950 dark:text-slate-100">Active Memory Scope</h3>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">Values stored in active computer variables right now.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-1.5 sm:gap-2 flex-1 overflow-y-auto pr-1">
          {Object.entries(variables).map(([key, val]) => {
            const isNullOrUndefined = val === null || val === undefined || val === 'undefined';
            const displayVal = isNullOrUndefined ? 'undefined' : String(val);

            // Give a beautiful badge representation
            return (
              <div
                key={key}
                id={`var-${key}`}
                className="p-1.5 sm:p-2.5 bg-slate-50/50 dark:bg-slate-900/40 rounded-lg border border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <span className="text-[10px] sm:text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 block uppercase tracking-wider">
                  {key}
                </span>
                <span
                  className={`font-mono text-xs sm:text-sm font-bold mt-1 break-all ${
                    isNullOrUndefined
                      ? 'text-slate-400 dark:text-slate-550 italic'
                      : typeof val === 'number'
                      ? 'text-indigo-600 dark:text-indigo-400 font-extrabold'
                      : val === 'completed' || val === 'finished'
                      ? 'text-emerald-600 dark:text-emerald-400 font-extrabold'
                      : 'text-slate-800 dark:text-slate-200'
                  }`}
                >
                  {displayVal}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Execution Statistics */}
      <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800/80 p-3 sm:p-4 shadow-sm flex flex-col min-h-0 transition-colors duration-150">
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2 mb-2 flex-shrink-0">
          <Activity className="w-4 h-4 text-slate-500 dark:text-slate-400" />
          <div>
            <h3 className="font-display font-bold text-sm sm:text-base text-slate-950 dark:text-slate-100">Execution Statistics</h3>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">Performance metrics and operations count.</p>
          </div>
        </div>

        <div className="space-y-1.5 sm:space-y-2 flex-1 overflow-y-auto pr-1 flex flex-col justify-between">
          {statItems.map((item, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-between px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg border transition-all ${
                item.label === 'Iterations' 
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-100 dark:border-indigo-900/30'
                  : item.label === 'Comparisons'
                  ? 'text-amber-600 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/30'
                  : 'text-rose-600 dark:text-rose-450 bg-rose-50/50 dark:bg-rose-950/20 border-rose-100 dark:border-rose-900/30'
              }`}
            >
              <div>
                <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 block">{item.label}</span>
                <span className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400">{item.desc}</span>
              </div>
              <span className="text-sm sm:text-base font-mono font-black">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
