import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import AlgorithmSelector from './components/AlgorithmSelector';
import ArrayInput from './components/ArrayInput';
import Visualizer from './components/Visualizer';
import CodeViewer from './components/CodeViewer';
import StatsAndVariables from './components/StatsAndVariables';
import PlaybackControls from './components/PlaybackControls';
import TipsPanel from './components/TipsPanel';
import { algorithms } from './algorithms';
import { Step } from './types';
import { CURATED_CODE_TEMPLATES } from './curatedCodeTemplates';
import { 
  Info
} from 'lucide-react';

export default function App() {
  // ==========================================
  // THEME STATE (Light / Dark Mode)
  // ==========================================
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('loopscope-theme') as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('loopscope-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // ==========================================
  // STATE FOR CURATED LESSONS MODE
  // ==========================================
  const [selectedAlgoId, setSelectedAlgoId] = useState<string>('dup-basic');
  const [curatedLanguage, setCuratedLanguage] = useState<string>('javascript');
  const selectedAlgo = useMemo(() => {
    return algorithms.find((a) => a.id === selectedAlgoId) || algorithms[0];
  }, [selectedAlgoId]);

  const [arrayState, setArrayState] = useState<number[]>(selectedAlgo.defaultArray);
  const [targetVal, setTargetVal] = useState<number>(70);
  const [insertIdx, setInsertIdx] = useState<number>(2);
  const [insertVal, setInsertVal] = useState<number>(99);
  const [deleteIdx, setDeleteIdx] = useState<number>(1);

  // Curated Lessons Steps Generator
  const curatedSteps = useMemo<Step[]>(() => {
    return selectedAlgo.generateSteps(arrayState, {
      target: targetVal,
      insertIndex: insertIdx,
      insertValue: insertVal,
      deleteIndex: deleteIdx,
    });
  }, [selectedAlgo, arrayState, targetVal, insertIdx, insertVal, deleteIdx]);


  // ==========================================
  // UNIFIED PLAYBACK STATE
  // ==========================================
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1200); // 1200ms default (1.0x)
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);

  // Active steps source
  const activeSteps = useMemo<Step[]>(() => {
    return curatedSteps;
  }, [curatedSteps]);

  // Sync / Reset step index when algorithm or configuration changes
  useEffect(() => {
    setCurrentStepIdx(0);
    setIsPlaying(false);
  }, [selectedAlgoId, arrayState, targetVal, insertIdx, insertVal, deleteIdx]);

  // Auto-playback logic
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentStepIdx((prevIdx) => {
        if (prevIdx >= activeSteps.length - 1) {
          setIsPlaying(false);
          return prevIdx;
        }
        return prevIdx + 1;
      });
    }, speed);

    return () => clearInterval(timer);
  }, [isPlaying, speed, activeSteps.length]);

  // Current active step calculation
  const currentStep = useMemo<Step>(() => {
    if (activeSteps.length > 0 && activeSteps[currentStepIdx]) {
      return activeSteps[currentStepIdx];
    }
    // Standby fallback step
    return {
      id: 0,
      array: arrayState,
      pointers: {},
      highlights: {},
      variables: { status: 'Awaiting Lesson Trace' },
      line: 1,
      explanation: 'Ready to start.',
      stats: { comparisons: 0, swapsOrShifts: 0, iterations: 0 },
    };
  }, [activeSteps, currentStepIdx, arrayState]);

  const handleUpdateParams = (
    newArr: number[],
    newTarget?: number,
    newInsertIdx?: number,
    newInsertVal?: number,
    newDeleteIdx?: number
  ) => {
    setArrayState(newArr);
    if (newTarget !== undefined) setTargetVal(newTarget);
    if (newInsertIdx !== undefined) setInsertIdx(newInsertIdx);
    if (newInsertVal !== undefined) setInsertVal(newInsertVal);
    if (newDeleteIdx !== undefined) setDeleteIdx(newDeleteIdx);
  };

  const handleSelectAlgo = (id: string) => {
    setSelectedAlgoId(id);
    const targetAlgo = algorithms.find((a) => a.id === id) || algorithms[0];
    setArrayState(targetAlgo.defaultArray);
  };

  // Tips to show in bottom bento panel
  const activeTips = useMemo(() => {
    return selectedAlgo.tips;
  }, [selectedAlgo]);

  // Code lines to show in CodeViewer
  const activeCodeLines = useMemo(() => {
    return CURATED_CODE_TEMPLATES[selectedAlgo.id]?.[curatedLanguage] || selectedAlgo.code;
  }, [selectedAlgo, curatedLanguage]);

  return (
    <div className="min-h-screen lg:h-screen font-sans flex flex-col lg:overflow-hidden selection:bg-indigo-500/10 selection:text-indigo-800 bg-[#F8FAFC] dark:bg-[#090D16] text-slate-800 dark:text-slate-100 transition-colors duration-150">
      <Header theme={theme} onToggleTheme={toggleTheme} />

      <main className="max-w-[95%] xl:max-w-[90%] mx-auto px-2 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex-1 w-full flex flex-col min-h-0 gap-3">
        
        {/* Grid Layout: Configuration sidebar (col-span-3) & Execution Theater (col-span-9) */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:overflow-hidden">
          
          {/* LEFT SIDEBAR: Configuration Inputs */}
          <section className="lg:col-span-3 lg:h-full lg:overflow-y-auto pr-0 lg:pr-1 pb-4 flex flex-col gap-3">
            <div className="space-y-3">
              <AlgorithmSelector
                algorithms={algorithms}
                selectedAlgoId={selectedAlgoId}
                onSelectAlgo={handleSelectAlgo}
              />

              <ArrayInput
                algorithm={selectedAlgo}
                onUpdateParams={handleUpdateParams}
              />

              <TipsPanel tips={activeTips} />
            </div>
          </section>

          {/* RIGHT VIEWPORT: Unified Educational Sandbox Player */}
          <section className="lg:col-span-9 lg:h-full grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-0 lg:overflow-hidden">
            
            {/* Left Column of Sandbox: Visualizer, Variables & Controls */}
            <div className="lg:col-span-6 flex flex-col gap-2.5 min-h-0 lg:overflow-hidden bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm p-3 transition-colors duration-150">
              {/* Live Step Explanation Header */}
              <div className="bg-indigo-50/60 dark:bg-indigo-950/20 border border-slate-100 dark:border-indigo-900/30 rounded-xl p-2 flex gap-2 items-start relative overflow-hidden flex-shrink-0">
                <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 opacity-[0.02] text-indigo-600 font-display font-extrabold text-7xl select-none">
                  Loop
                </div>
                <div className="p-1.5 bg-indigo-100 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-400 rounded-lg flex-shrink-0 flex items-center justify-center">
                  <Info className="w-3.5 h-3.5" />
                </div>
                <div className="space-y-0.5 z-10 flex-1 min-w-0">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
                    Step Live Description
                  </span>
                  <p className="text-[12px] sm:text-[13px] font-semibold text-slate-800 dark:text-slate-200 leading-snug font-sans break-words">
                    {currentStep.explanation}
                  </p>
                </div>
              </div>

              {/* Core Array Visualization Stage */}
              <div className="flex-shrink-0 pt-2 pb-1">
                <Visualizer
                  array={currentStep.array}
                  pointers={currentStep.pointers}
                  highlights={currentStep.highlights}
                />
              </div>

              {/* Active Memory Scope & Execution Status situated ABOVE the playback controls */}
              <div className="h-[295px] flex-shrink-0">
                <StatsAndVariables step={currentStep} />
              </div>

              {/* Playback Progress and Scrub Bar */}
              <div className="flex-shrink-0">
                <PlaybackControls
                  currentStep={currentStepIdx}
                  totalSteps={activeSteps.length || 1}
                  isPlaying={isPlaying}
                  speed={speed}
                  onStepChange={setCurrentStepIdx}
                  onTogglePlay={() => setIsPlaying(!isPlaying)}
                  onSpeedChange={setSpeed}
                />
              </div>
            </div>

            {/* Right Column of Sandbox: Code Viewer */}
            <div className="lg:col-span-6 flex flex-col gap-3 min-h-0 lg:overflow-hidden">
              {/* Code viewer container - takes full height of the column */}
              <div className="flex-1 min-h-0">
                <CodeViewer 
                  code={activeCodeLines} 
                  activeLine={currentStep.line}
                  selectedLanguage={curatedLanguage}
                  onLanguageChange={setCuratedLanguage}
                  showLanguageSelector={true}
                />
              </div>
            </div>

          </section>
        </div>
      </main>
    </div>
  );
}
