export type HighlightType = 'normal' | 'active' | 'comparing' | 'matched' | 'swapping' | 'shifted' | 'done' | 'target';

export interface Step {
  id: number;
  array: number[];
  pointers: Record<string, number>; // e.g., { i: 0, j: 2 }
  highlights: Record<number, HighlightType>; // index -> HighlightType
  variables: Record<string, string | number | boolean | null>; // e.g., { maxVal: 24, temp: 10 }
  line: number; // line of code to highlight (1-indexed)
  explanation: string; // Plain English description of what's happening
  stats: {
    comparisons: number;
    swapsOrShifts: number;
    iterations: number;
  };
}

export interface CodeLine {
  text: string;
  indent: number;
}

export interface Algorithm {
  id: string;
  name: string;
  category: 'traversal' | 'searching' | 'sorting' | 'manipulation';
  difficulty: 'Beginner' | 'Easy' | 'Intermediate';
  description: string;
  defaultArray: number[];
  code: CodeLine[];
  tips: string[];
  // Function to generate steps
  generateSteps: (
    array: number[],
    params?: {
      target?: number;
      insertIndex?: number;
      insertValue?: number;
      deleteIndex?: number;
    }
  ) => Step[];
}
