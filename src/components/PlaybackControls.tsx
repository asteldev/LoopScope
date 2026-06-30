import React from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw, FastForward } from 'lucide-react';

interface PlaybackControlsProps {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  speed: number; // in ms
  onStepChange: (index: number) => void;
  onTogglePlay: () => void;
  onSpeedChange: (speed: number) => void;
}

export default function PlaybackControls({
  currentStep,
  totalSteps,
  isPlaying,
  speed,
  onStepChange,
  onTogglePlay,
  onSpeedChange,
}: PlaybackControlsProps) {
  const progressPercent = totalSteps > 1 ? (currentStep / (totalSteps - 1)) * 100 : 0;

  return (
    <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-2xl p-2 px-3.5 shadow-sm flex flex-row items-center gap-4 justify-between w-full transition-colors duration-150">
      {/* Control buttons */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <button
          id="btn-restart"
          onClick={() => onStepChange(0)}
          disabled={currentStep === 0}
          className="p-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-white dark:disabled:hover:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-slate-750 rounded-lg shadow-xs transition-all cursor-pointer"
          title="Restart"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        <button
          id="btn-step-back"
          onClick={() => onStepChange(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="p-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-white dark:disabled:hover:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-slate-750 rounded-lg shadow-xs transition-all cursor-pointer"
          title="Back"
        >
          <SkipBack className="w-3.5 h-3.5" />
        </button>

        <button
          id="btn-play-pause"
          onClick={onTogglePlay}
          className={`p-1.5 rounded-xl shadow-md transition-all flex items-center justify-center cursor-pointer ${
            isPlaying
              ? 'bg-amber-500 text-white hover:bg-amber-600'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5 fill-current" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
          )}
        </button>

        <button
          id="btn-step-forward"
          onClick={() => onStepChange(Math.min(totalSteps - 1, currentStep + 1))}
          disabled={currentStep === totalSteps - 1}
          className="p-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-white dark:disabled:hover:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-slate-750 rounded-lg shadow-xs transition-all cursor-pointer"
          title="Forward"
        >
          <SkipForward className="w-3.5 h-3.5" />
        </button>

        <button
          id="btn-jump-end"
          onClick={() => onStepChange(totalSteps - 1)}
          disabled={currentStep === totalSteps - 1}
          className="p-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-white dark:disabled:hover:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-slate-750 rounded-lg shadow-xs transition-all cursor-pointer"
          title="End"
        >
          <FastForward className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Progress Bar & Slider */}
      <div className="flex-1 flex items-center gap-3 w-full min-w-0">
        <span className="text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400 flex-shrink-0">
          Step {currentStep + 1}/{totalSteps}
        </span>
        <div className="relative flex-1 flex items-center group min-w-0">
          <div className="absolute left-0 right-0 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full transition-all duration-150"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <input
            id="timeline-slider"
            type="range"
            min={0}
            max={Math.max(0, totalSteps - 1)}
            value={currentStep}
            onChange={(e) => onStepChange(parseInt(e.target.value, 10))}
            className="w-full h-1.5 opacity-0 cursor-pointer relative z-10"
          />
          <div
            className="absolute w-3 h-3 bg-white dark:bg-slate-900 rounded-full shadow-md border border-indigo-600 dark:border-indigo-400 pointer-events-none transition-all duration-150 -ml-1.5 group-hover:scale-110"
            style={{ left: `${progressPercent}%` }}
          />
        </div>
        <span className="text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400 flex-shrink-0">
          {Math.round(progressPercent)}%
        </span>
      </div>
    </div>
  );
}
