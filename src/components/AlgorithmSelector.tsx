import React, { useState, useEffect } from 'react';
import { Algorithm } from '../types';
import { Search, RotateCcw, ListChecks, Hash, Trash, Plus, Award, ChevronDown, ChevronUp } from 'lucide-react';

interface AlgorithmSelectorProps {
  algorithms: Algorithm[];
  selectedAlgoId: string;
  onSelectAlgo: (id: string) => void;
}

export default function AlgorithmSelector({
  algorithms,
  selectedAlgoId,
  onSelectAlgo,
}: AlgorithmSelectorProps) {
  // Group algorithms by category
  const categories = {
    traversal: {
      label: 'Traversal & Counting',
      icon: <ListChecks className="w-4 h-4" />,
      color: 'text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-950/30 border-indigo-100 dark:border-indigo-900/30',
    },
    searching: {
      label: 'Searching & Extrema',
      icon: <Search className="w-4 h-4" />,
      color: 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/30 border-amber-100 dark:border-amber-900/30',
    },
    sorting: {
      label: 'Reversing & Ordering',
      icon: <RotateCcw className="w-4 h-4" />,
      color: 'text-violet-600 bg-violet-50 dark:text-violet-400 dark:bg-violet-950/30 border-violet-100 dark:border-violet-900/30',
    },
    manipulation: {
      label: 'Array Modification',
      icon: <Plus className="w-4 h-4" />,
      color: 'text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-950/30 border-rose-100 dark:border-rose-900/30',
    },
  };

  // State to track expanded status of each category
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  // Auto-expand the category of the selected algorithm on load or external selection
  useEffect(() => {
    const currentAlgo = algorithms.find((a) => a.id === selectedAlgoId);
    if (currentAlgo) {
      setExpanded((prev) => ({
        ...prev,
        [currentAlgo.category]: true,
      }));
    }
  }, [selectedAlgoId, algorithms]);

  const toggleCategory = (catKey: string) => {
    setExpanded((prev) => ({
      ...prev,
      [catKey]: !prev[catKey],
    }));
  };

  const getAlgoIcon = (id: string) => {
    switch (id) {
      case 'dup-basic':
      case 'dup-optimized':
        return <ListChecks className="w-4 h-4 text-slate-500 dark:text-slate-400" />;
      case 'find-largest':
      case 'find-smallest':
      case 'second-largest':
        return <Hash className="w-4 h-4 text-slate-500 dark:text-slate-400" />;
      case 'linear-search':
        return <Search className="w-4 h-4 text-slate-500 dark:text-slate-400" />;
      case 'traversal':
        return <Award className="w-4 h-4 text-slate-500 dark:text-slate-400" />;
      case 'insertion':
      case 'array-copy':
        return <Plus className="w-4 h-4 text-slate-500 dark:text-slate-400" />;
      case 'deletion':
        return <Trash className="w-4 h-4 text-slate-500 dark:text-slate-400" />;
      case 'reverse':
      case 'bubble-sort':
      case 'selection-sort':
        return <RotateCcw className="w-4 h-4 text-slate-500 dark:text-slate-400" />;
      case 'two-sum':
        return <Search className="w-4 h-4 text-slate-500 dark:text-slate-400" />;
      default:
        return <Hash className="w-4 h-4 text-slate-500 dark:text-slate-400" />;
    }
  };

  const getDifficultyColor = (diff: Algorithm['difficulty']) => {
    switch (diff) {
      case 'Beginner':
        return 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-150 dark:border-emerald-900/30';
      case 'Easy':
        return 'bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-400 border-indigo-150 dark:border-indigo-900/30';
      case 'Intermediate':
        return 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-150 dark:border-amber-900/30';
    }
  };

  return (
    <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800/80 p-4 shadow-sm transition-colors duration-150">
      <div className="mb-3.5">
        <h2 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100">1. Choose a Lesson</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Select an algorithm category below to explore its loop mechanics.</p>
      </div>

      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
        {(Object.keys(categories) as Array<keyof typeof categories>).map((catKey) => {
          const catInfo = categories[catKey];
          const catAlgos = algorithms.filter((algo) => algo.category === catKey);
          const isExpanded = !!expanded[catKey];

          if (catAlgos.length === 0) return null;

          return (
            <div key={catKey} className="border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden">
              {/* Accordion Toggle Header */}
              <button
                id={`accordion-header-${catKey}`}
                onClick={() => toggleCategory(catKey)}
                className={`w-full flex items-center justify-between px-3 py-2 border-b last:border-b-0 border-slate-100 dark:border-slate-800 text-xs font-semibold transition-all ${
                  isExpanded ? 'bg-slate-50/50 dark:bg-slate-800/50' : 'bg-white dark:bg-slate-900'
                }`}
              >
                <div className={`flex items-center gap-2 px-2.5 py-1 rounded-lg border text-[11px] font-bold ${catInfo.color}`}>
                  {catInfo.icon}
                  <span>{catInfo.label}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500">
                  <span className="text-[10px] font-normal">({catAlgos.length} lessons)</span>
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {/* Accordion Body */}
              {isExpanded && (
                <div className="p-2 space-y-1.5 bg-slate-50/20 dark:bg-slate-950/20 border-t border-slate-100 dark:border-slate-800 max-h-[220px] overflow-y-auto">
                  {catAlgos.map((algo) => {
                    const isSelected = algo.id === selectedAlgoId;
                    return (
                      <button
                        key={algo.id}
                        id={`algo-btn-${algo.id}`}
                        onClick={() => onSelectAlgo(algo.id)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-lg border transition-all duration-150 group flex flex-col gap-1 ${
                          isSelected
                            ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-500 dark:border-indigo-500 text-slate-900 dark:text-slate-100 shadow-sm'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/50 dark:hover:bg-slate-800/50'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-2">
                            <span className={`p-1 rounded-md transition-colors ${isSelected ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400' : 'bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700'}`}>
                              {getAlgoIcon(algo.id)}
                            </span>
                            <span className={`text-xs sm:text-sm font-medium ${isSelected ? 'text-indigo-950 dark:text-indigo-100 font-semibold' : 'text-slate-700 dark:text-slate-300'}`}>
                              {algo.name}
                            </span>
                          </div>
                          <span className={`text-[9px] font-mono font-medium px-1.5 py-0.5 rounded border ${getDifficultyColor(algo.difficulty)}`}>
                            {algo.difficulty}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-normal leading-relaxed pl-7 group-hover:text-slate-500 dark:group-hover:text-slate-400 transition-colors line-clamp-1">
                          {algo.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
