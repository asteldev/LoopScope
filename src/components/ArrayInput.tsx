import React, { useState, useEffect } from 'react';
import { Algorithm } from '../types';
import { AlertCircle, Sliders, RefreshCw } from 'lucide-react';

interface ArrayInputProps {
  algorithm: Algorithm;
  onUpdateParams: (array: number[], target?: number, insertIndex?: number, insertValue?: number, deleteIndex?: number) => void;
}

export default function ArrayInput({ algorithm, onUpdateParams }: ArrayInputProps) {
  const [inputText, setInputText] = useState(algorithm.defaultArray.join(', '));
  const [appliedArrayText, setAppliedArrayText] = useState(algorithm.defaultArray.join(', '));
  const [error, setError] = useState<string | null>(null);

  // Additional algorithm parameters
  const [targetVal, setTargetVal] = useState<number>(70);
  const [insertIdx, setInsertIdx] = useState<number>(2);
  const [insertVal, setInsertVal] = useState<number>(99);
  const [deleteIdx, setDeleteIdx] = useState<number>(1);

  // Sync inputs when algorithm changes
  useEffect(() => {
    const defaultText = algorithm.defaultArray.join(', ');
    setInputText(defaultText);
    setAppliedArrayText(defaultText);
    setError(null);
    // Set appropriate default params
    let defTarget = 70;
    let defInsertIdx = 2;
    let defInsertVal = 99;
    let defDeleteIdx = 1;
    if (algorithm.id === 'linear-search') {
      defTarget = algorithm.defaultArray[3] || 70;
      setTargetVal(defTarget);
    } else if (algorithm.id === 'insertion') {
      defInsertIdx = 2;
      defInsertVal = 99;
      setInsertIdx(defInsertIdx);
      setInsertVal(defInsertVal);
    } else if (algorithm.id === 'deletion') {
      defDeleteIdx = 1;
      setDeleteIdx(defDeleteIdx);
    }
    // Perform initial apply for the new algorithm
    onUpdateParams(algorithm.defaultArray, defTarget, defInsertIdx, defInsertVal, defDeleteIdx);
  }, [algorithm]);

  // Presets
  const presets: Record<string, { label: string; array: number[] }[]> = {
    'dup-basic': [
      { label: 'Standard duplicates', array: [10, 24, 10, 70, 24] },
      { label: 'All duplicates', array: [3, 3, 3, 3, 3] },
      { label: 'No duplicates', array: [5, 10, 15, 20, 25] },
    ],
    'dup-optimized': [
      { label: 'Standard duplicates', array: [10, 24, 10, 70, 24] },
      { label: 'Triple numbers', array: [10, 10, 10, 20, 20] },
      { label: 'Complex overlaps', array: [1, 2, 1, 2, 1] },
    ],
    'find-largest': [
      { label: 'Random peak', array: [14, 45, 8, 92, 42, 17] },
      { label: 'Ascending', array: [5, 10, 15, 20, 25, 30] },
      { label: 'Descending', array: [50, 40, 30, 20, 10, 5] },
    ],
    'find-smallest': [
      { label: 'Random dip', array: [14, 45, 8, 92, 42, 17] },
      { label: 'Ascending', array: [2, 5, 10, 15, 20, 25] },
      { label: 'Descending', array: [30, 25, 20, 15, 10, 3] },
    ],
    'reverse': [
      { label: 'Even length', array: [10, 20, 30, 40, 50, 60] },
      { label: 'Odd length', array: [1, 2, 3, 4, 5] },
      { label: 'Short array', array: [10, 99] },
    ],
    'linear-search': [
      { label: 'Target in middle', array: [10, 24, 45, 70, 85, 99] },
      { label: 'Target at start', array: [70, 10, 20, 30, 40, 55] },
      { label: 'Target missing', array: [5, 12, 19, 23, 44, 52] },
    ],
    'traversal': [
      { label: 'Small values', array: [5, 12, 8, 20, 15] },
      { label: 'Large step values', array: [100, 200, 150, 300] },
      { label: 'Same values', array: [10, 10, 10, 10, 10] },
    ],
    'insertion': [
      { label: 'Standard space', array: [10, 20, 30, 40] },
      { label: 'Short array', array: [100, 200] },
      { label: 'Already large', array: [5, 10, 15, 20, 25] },
    ],
    'deletion': [
      { label: 'Middle deletion', array: [10, 20, 30, 40, 50] },
      { label: 'Two elements', array: [100, 200] },
      { label: 'Repeating elements', array: [5, 5, 5, 5, 5] },
    ],
    'selection-sort': [
      { label: 'Random unsorted', array: [29, 10, 14, 37, 13] },
      { label: 'Reverse sorted', array: [50, 40, 30, 20, 10] },
      { label: 'Nearly sorted', array: [10, 15, 12, 20, 25] },
    ],
    'second-largest': [
      { label: 'Random values', array: [12, 35, 1, 10, 34, 1] },
      { label: 'Duplicate maximums', array: [20, 20, 15, 10, 5] },
      { label: 'Ascending', array: [2, 4, 6, 8, 10] },
    ],
    'array-copy': [
      { label: 'Standard values', array: [12, 5, 20, 8, 15] },
      { label: 'All same values', array: [7, 7, 7, 7] },
      { label: 'Alternating', array: [10, 20, 10, 20] },
    ],
  };

  const handleApply = (customText = inputText, bypassState = false) => {
    setError(null);

    // Parse array
    const parts = customText.split(',');
    const parsed: number[] = [];

    for (const part of parts) {
      const trimmed = part.trim();
      if (trimmed === '') continue;

      const num = parseInt(trimmed, 10);
      if (isNaN(num)) {
        setError('Please enter valid integers only.');
        return;
      }
      parsed.push(num);
    }

    if (parsed.length === 0) {
      setError('Please provide at least one element.');
      return;
    }

    // Constraints for optimal visual learning
    if (parsed.length < 2) {
      setError('Array must contain at least 2 elements for visualization.');
      return;
    }

    if (parsed.length > 8) {
      setError('To keep the loop steps and visuals understandable, please limit the array to 8 elements or less.');
      return;
    }

    // Index validation for insertion/deletion
    if (algorithm.id === 'insertion') {
      if (insertIdx < 0 || insertIdx > parsed.length) {
        setError(`Insertion index must be between 0 and ${parsed.length}.`);
        return;
      }
    } else if (algorithm.id === 'deletion') {
      if (deleteIdx < 0 || deleteIdx >= parsed.length) {
        setError(`Deletion index must be between 0 and ${parsed.length - 1}.`);
        return;
      }
    }

    if (!bypassState) {
      setInputText(parsed.join(', '));
      setAppliedArrayText(parsed.join(', '));
    }
    
    onUpdateParams(parsed, targetVal, insertIdx, insertVal, deleteIdx);
  };

  // Run apply when appliedArrayText or parameter values change (preventing typing-induced updates)
  useEffect(() => {
    handleApply(appliedArrayText, true);
  }, [appliedArrayText, targetVal, insertIdx, insertVal, deleteIdx]);

  return (
    <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800/80 p-5 shadow-sm transition-colors duration-150">
      <div className="mb-4">
        <h2 className="font-display font-bold text-lg text-slate-900 dark:text-slate-100">2. Configure State</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Customize elements to observe how code adapts to changes.</p>
      </div>

      <div className="space-y-4">
        {/* Preset selections */}
        {presets[algorithm.id] && (
          <div>
            <label className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1.5">Presets</label>
            <div className="flex flex-wrap gap-1.5">
              {presets[algorithm.id].map((preset, idx) => (
                <button
                  key={idx}
                  id={`preset-${algorithm.id}-${idx}`}
                  type="button"
                  onClick={() => {
                    const presetText = preset.array.join(', ');
                    setInputText(presetText);
                    setAppliedArrayText(presetText);
                    setError(null);
                    // trigger immediate apply
                    onUpdateParams(preset.array, targetVal, insertIdx, insertVal, deleteIdx);
                  }}
                  className="px-2.5 py-1 text-xs font-semibold text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-100 hover:border-slate-300 dark:hover:bg-slate-800 dark:hover:border-slate-700 transition-colors cursor-pointer"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Text Area array entry */}
        <div>
          <label className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1.5">Array Elements (comma separated)</label>
          <div className="flex gap-2 flex-wrap sm:flex-nowrap">
            <input
              id="array-input-text"
              type="text"
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                setError(null);
              }}
              placeholder="e.g. 10, 24, 10, 70"
              className="flex-1 min-w-0 bg-slate-50 dark:bg-slate-900 border border-slate-250 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-850 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-100 font-mono focus:outline-none transition-all"
            />
            <button
              id="array-apply-btn"
              type="button"
              onClick={() => handleApply()}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-3 sm:px-4 py-2 text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-sm hover:shadow flex-shrink-0 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Apply</span>
            </button>
          </div>
          {error && (
            <div className="flex items-center gap-1.5 mt-2 text-rose-600 dark:text-rose-450 text-xs font-medium">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Dynamic Params based on selected algorithm */}
        {algorithm.id === 'linear-search' && (
          <div className="bg-slate-50 dark:bg-slate-900/40 rounded-xl p-3 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <Sliders className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
              <span>Search Parameters</span>
            </div>
            <div>
              <label className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">Target Search Value</label>
              <input
                id="search-target-input"
                type="number"
                value={targetVal}
                onChange={(e) => setTargetVal(parseInt(e.target.value, 10) || 0)}
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        )}

        {algorithm.id === 'insertion' && (
          <div className="bg-slate-50 dark:bg-slate-900/40 rounded-xl p-3 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <Sliders className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
              <span>Insertion Parameters</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">Insert Value</label>
                <input
                  id="insert-val-input"
                  type="number"
                  value={insertVal}
                  onChange={(e) => setInsertVal(parseInt(e.target.value, 10) || 0)}
                  className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">Insert Index</label>
                <input
                  id="insert-idx-input"
                  type="number"
                  min={0}
                  value={insertIdx}
                  onChange={(e) => setInsertIdx(parseInt(e.target.value, 10) || 0)}
                  className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        )}

        {algorithm.id === 'deletion' && (
          <div className="bg-slate-50 dark:bg-slate-900/40 rounded-xl p-3 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <Sliders className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
              <span>Deletion Parameters</span>
            </div>
            <div>
              <label className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">Delete Index</label>
              <input
                id="delete-idx-input"
                type="number"
                min={0}
                value={deleteIdx}
                onChange={(e) => setDeleteIdx(parseInt(e.target.value, 10) || 0)}
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
