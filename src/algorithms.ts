import { Algorithm, Step, HighlightType } from './types';

// Helper to clone array
const clone = (arr: number[]) => [...arr];

export const algorithms: Algorithm[] = [
  {
    id: 'dup-basic',
    name: 'Duplicate Counter (Basic)',
    category: 'traversal',
    difficulty: 'Beginner',
    description: 'A nested loop algorithm that compares every element with all subsequent elements to find matches. Demonstrates how nested loops compare every pair.',
    defaultArray: [10, 24, 10, 70, 24],
    code: [
      { text: 'let duplicates = 0;', indent: 0 },
      { text: 'for (let i = 0; i < array.length; i++) {', indent: 0 },
      { text: '  for (let j = i + 1; j < array.length; j++) {', indent: 1 },
      { text: '    if (array[i] === array[j]) {', indent: 2 },
      { text: '      duplicates++;', indent: 3 },
      { text: '    }', indent: 2 },
      { text: '  }', indent: 1 },
      { text: '}', indent: 0 }
    ],
    tips: [
      "Notice how the outer loop element ('i') stays fixed while the inner loop ('j') scans the remaining elements.",
      "The inner loop starts at 'i + 1' to avoid comparing an element with itself or with previously checked pairs.",
      "In this basic approach, if a number appears three times, duplicates will be counted multiple times! Can you see why?"
    ],
    generateSteps: (array: number[]): Step[] => {
      const steps: Step[] = [];
      const currentArr = clone(array);
      const n = currentArr.length;
      let stepId = 0;
      let duplicates = 0;
      let comparisons = 0;
      let iterations = 0;

      // Step 0: Initialize
      steps.push({
        id: stepId++,
        array: clone(currentArr),
        pointers: {},
        highlights: {},
        variables: { duplicates: 0, i: 'not started', j: 'not started' },
        line: 1,
        explanation: 'Initialize duplicate count to 0. We will scan the array using two nested loops.',
        stats: { comparisons: 0, swapsOrShifts: 0, iterations: 0 }
      });

      for (let i = 0; i < n; i++) {
        iterations++;
        // Step i: Outer loop step
        steps.push({
          id: stepId++,
          array: clone(currentArr),
          pointers: { i },
          highlights: { [i]: 'active' },
          variables: { duplicates, i, j: 'not started' },
          line: 2,
          explanation: `Outer loop: Select element at index ${i} (value ${currentArr[i]}). We will compare it to subsequent elements.`,
          stats: { comparisons, swapsOrShifts: 0, iterations }
        });

        for (let j = i + 1; j < n; j++) {
          iterations++;
          comparisons++;
          // Step j: Inner loop pointer check
          steps.push({
            id: stepId++,
            array: clone(currentArr),
            pointers: { i, j },
            highlights: { [i]: 'active', [j]: 'comparing' },
            variables: { duplicates, i, j },
            line: 4,
            explanation: `Comparing array[i] (${currentArr[i]}) at index ${i} with array[j] (${currentArr[j]}) at index ${j}.`,
            stats: { comparisons, swapsOrShifts: 0, iterations }
          });

          if (currentArr[i] === currentArr[j]) {
            duplicates++;
            // Found duplicate step
            steps.push({
              id: stepId++,
              array: clone(currentArr),
              pointers: { i, j },
              highlights: { [i]: 'matched', [j]: 'matched' },
              variables: { duplicates, i, j },
              line: 5,
              explanation: `Match found! Both are ${currentArr[i]}. Increment duplicates to ${duplicates}.`,
              stats: { comparisons, swapsOrShifts: 0, iterations }
            });
          }
        }
      }

      // Final step
      steps.push({
        id: stepId++,
        array: clone(currentArr),
        pointers: {},
        highlights: Object.fromEntries(currentArr.map((_, idx) => [idx, 'done'])),
        variables: { duplicates, i: 'completed', j: 'completed' },
        line: 8,
        explanation: `Algorithm finished! A total of ${duplicates} duplicate pairs were counted in the array.`,
        stats: { comparisons, swapsOrShifts: 0, iterations }
      });

      return steps;
    }
  },
  {
    id: 'dup-optimized',
    name: 'Duplicate Counter (Optimized)',
    category: 'traversal',
    difficulty: 'Easy',
    description: 'An improved duplicate counter that keeps track of already checked elements. This avoids duplicate double-counting and processes arrays more efficiently.',
    defaultArray: [10, 24, 10, 70, 24],
    code: [
      { text: 'let duplicates = 0;', indent: 0 },
      { text: 'let seen = new Set();', indent: 0 },
      { text: 'for (let i = 0; i < array.length; i++) {', indent: 0 },
      { text: '  if (seen.has(array[i])) continue;', indent: 1 },
      { text: '  for (let j = i + 1; j < array.length; j++) {', indent: 1 },
      { text: '    if (array[i] === array[j]) {', indent: 2 },
      { text: '      duplicates++;', indent: 3 },
      { text: '      seen.add(array[i]);', indent: 3 },
      { text: '      break; // Skip rest of inner loop', indent: 3 },
      { text: '    }', indent: 2 },
      { text: '  }', indent: 1 },
      { text: '}', indent: 0 }
    ],
    tips: [
      "By remembering which numbers we have already found duplicates for, we avoid over-counting them.",
      "The 'seen' set holds elements we've already counted. If 'array[i]' is in 'seen', we skip it instantly using 'continue'.",
      "Using 'break' stops the inner loop immediately once the first duplicate is found, saving CPU cycles!"
    ],
    generateSteps: (array: number[]): Step[] => {
      const steps: Step[] = [];
      const currentArr = clone(array);
      const n = currentArr.length;
      let stepId = 0;
      let duplicates = 0;
      let comparisons = 0;
      let iterations = 0;
      const seenSet = new Set<number>();

      steps.push({
        id: stepId++,
        array: clone(currentArr),
        pointers: {},
        highlights: {},
        variables: { duplicates: 0, seen: '{}', i: 'not started', j: 'not started' },
        line: 1,
        explanation: 'Initialize duplicates to 0 and create a "seen" set to keep track of processed duplicate elements.',
        stats: { comparisons: 0, swapsOrShifts: 0, iterations: 0 }
      });

      for (let i = 0; i < n; i++) {
        iterations++;
        const currentVal = currentArr[i];
        const isSeen = seenSet.has(currentVal);

        steps.push({
          id: stepId++,
          array: clone(currentArr),
          pointers: { i },
          highlights: { [i]: 'active' },
          variables: {
            duplicates,
            seen: `{${Array.from(seenSet).join(', ')}}`,
            i,
            j: 'not started'
          },
          line: 3,
          explanation: `Outer loop: Selected index ${i} with value ${currentVal}. Let's check if we've already handled this value.`,
          stats: { comparisons, swapsOrShifts: 0, iterations }
        });

        steps.push({
          id: stepId++,
          array: clone(currentArr),
          pointers: { i },
          highlights: { [i]: isSeen ? 'comparing' : 'active' },
          variables: {
            duplicates,
            seen: `{${Array.from(seenSet).join(', ')}}`,
            i,
            j: 'not started'
          },
          line: 4,
          explanation: isSeen
            ? `Value ${currentVal} is already in the 'seen' list! We skip this loop using 'continue' to avoid double-counting.`
            : `Value ${currentVal} is NOT in the 'seen' list. We proceed to look for duplicates.`,
          stats: { comparisons, swapsOrShifts: 0, iterations }
        });

        if (isSeen) {
          continue;
        }

        let foundDup = false;
        for (let j = i + 1; j < n; j++) {
          iterations++;
          comparisons++;

          steps.push({
            id: stepId++,
            array: clone(currentArr),
            pointers: { i, j },
            highlights: { [i]: 'active', [j]: 'comparing' },
            variables: {
              duplicates,
              seen: `{${Array.from(seenSet).join(', ')}}`,
              i,
              j
            },
            line: 6,
            explanation: `Comparing index ${i} (${currentVal}) with index ${j} (${currentArr[j]}).`,
            stats: { comparisons, swapsOrShifts: 0, iterations }
          });

          if (currentArr[i] === currentArr[j]) {
            duplicates++;
            seenSet.add(currentVal);
            foundDup = true;

            steps.push({
              id: stepId++,
              array: clone(currentArr),
              pointers: { i, j },
              highlights: { [i]: 'matched', [j]: 'matched' },
              variables: {
                duplicates,
                seen: `{${Array.from(seenSet).join(', ')}}`,
                i,
                j
              },
              line: 7,
              explanation: `Match found! We increment duplicate count to ${duplicates}. Now we add ${currentVal} to our 'seen' list.`,
              stats: { comparisons, swapsOrShifts: 0, iterations }
            });

            steps.push({
              id: stepId++,
              array: clone(currentArr),
              pointers: { i, j },
              highlights: { [i]: 'matched', [j]: 'matched' },
              variables: {
                duplicates,
                seen: `{${Array.from(seenSet).join(', ')}}`,
                i,
                j
              },
              line: 9,
              explanation: `Breaking the inner loop. Since we know ${currentVal} is a duplicate, we do not need to check further instances of it in this turn.`,
              stats: { comparisons, swapsOrShifts: 0, iterations }
            });

            break;
          }
        }
      }

      steps.push({
        id: stepId++,
        array: clone(currentArr),
        pointers: {},
        highlights: Object.fromEntries(currentArr.map((_, idx) => [idx, 'done'])),
        variables: {
          duplicates,
          seen: `{${Array.from(seenSet).join(', ')}}`
        },
        line: 12,
        explanation: `Algorithm finished! We safely identified ${duplicates} unique duplicate elements without over-counting.`,
        stats: { comparisons, swapsOrShifts: 0, iterations }
      });

      return steps;
    }
  },
  {
    id: 'find-largest',
    name: 'Find Largest Element',
    category: 'searching',
    difficulty: 'Beginner',
    description: 'Finds the maximum value in an array by scanning from left to right, maintaining a record of the largest element seen so far.',
    defaultArray: [14, 45, 8, 92, 42, 17],
    code: [
      { text: 'let maxVal = array[0];', indent: 0 },
      { text: 'let maxIdx = 0;', indent: 0 },
      { text: 'for (let i = 1; i < array.length; i++) {', indent: 0 },
      { text: '  if (array[i] > maxVal) {', indent: 1 },
      { text: '    maxVal = array[i];', indent: 2 },
      { text: '    maxIdx = i;', indent: 2 },
      { text: '  }', indent: 1 },
      { text: '}', indent: 0 }
    ],
    tips: [
      "We assume the first element at index 0 is the largest, then look for anything larger.",
      "If we find an element larger than 'maxVal', we update both 'maxVal' and 'maxIdx'.",
      "Notice how we start the loop index 'i' at 1, since index 0 is already our starting default."
    ],
    generateSteps: (array: number[]): Step[] => {
      const steps: Step[] = [];
      const currentArr = clone(array);
      const n = currentArr.length;
      let stepId = 0;
      let maxVal = currentArr[0];
      let maxIdx = 0;
      let comparisons = 0;
      let iterations = 0;

      steps.push({
        id: stepId++,
        array: clone(currentArr),
        pointers: { maxIdx },
        highlights: { [0]: 'active' },
        variables: { maxVal, maxIdx, i: 'not started' },
        line: 1,
        explanation: `Initialize maxVal to array[0] (${maxVal}) and maxIdx to 0. This is our default largest element.`,
        stats: { comparisons: 0, swapsOrShifts: 0, iterations: 0 }
      });

      for (let i = 1; i < n; i++) {
        iterations++;
        comparisons++;

        steps.push({
          id: stepId++,
          array: clone(currentArr),
          pointers: { i, maxIdx },
          highlights: { [maxIdx]: 'active', [i]: 'comparing' },
          variables: { maxVal, maxIdx, i },
          line: 4,
          explanation: `Compare current element array[${i}] (${currentArr[i]}) with our maxVal (${maxVal}).`,
          stats: { comparisons, swapsOrShifts: 0, iterations }
        });

        if (currentArr[i] > maxVal) {
          const oldMax = maxVal;
          maxVal = currentArr[i];
          maxIdx = i;

          steps.push({
            id: stepId++,
            array: clone(currentArr),
            pointers: { i, maxIdx },
            highlights: { [i]: 'matched' },
            variables: { maxVal, maxIdx, i },
            line: 5,
            explanation: `Found larger element! ${currentArr[i]} is greater than ${oldMax}. Updating maxVal to ${maxVal} at index ${maxIdx}.`,
            stats: { comparisons, swapsOrShifts: 0, iterations }
          });
        } else {
          steps.push({
            id: stepId++,
            array: clone(currentArr),
            pointers: { i, maxIdx },
            highlights: { [maxIdx]: 'active', [i]: 'normal' },
            variables: { maxVal, maxIdx, i },
            line: 4,
            explanation: `${currentArr[i]} is not greater than our maximum of ${maxVal}. Moving on.`,
            stats: { comparisons, swapsOrShifts: 0, iterations }
          });
        }
      }

      steps.push({
        id: stepId++,
        array: clone(currentArr),
        pointers: { maxIdx },
        highlights: { [maxIdx]: 'done' },
        variables: { maxVal, maxIdx, i: 'completed' },
        line: 8,
        explanation: `Scan complete! The largest value in the array is ${maxVal} found at index ${maxIdx}.`,
        stats: { comparisons, swapsOrShifts: 0, iterations }
      });

      return steps;
    }
  },
  {
    id: 'find-smallest',
    name: 'Find Smallest Element',
    category: 'searching',
    difficulty: 'Beginner',
    description: 'Finds the minimum value in an array by scanning from left to right, maintaining a record of the smallest element seen so far.',
    defaultArray: [14, 45, 8, 92, 42, 17],
    code: [
      { text: 'let minVal = array[0];', indent: 0 },
      { text: 'let minIdx = 0;', indent: 0 },
      { text: 'for (let i = 1; i < array.length; i++) {', indent: 0 },
      { text: '  if (array[i] < minVal) {', indent: 1 },
      { text: '    minVal = array[i];', indent: 2 },
      { text: '    minIdx = i;', indent: 2 },
      { text: '  }', indent: 1 },
      { text: '}', indent: 0 }
    ],
    tips: [
      "We assume the first element at index 0 is the smallest, then scan for any smaller element.",
      "If we find an element smaller than our current 'minVal', we update 'minVal' and 'minIdx'.",
      "This is identical in structure to finding the largest element, except we change the comparison from '>' to '<'."
    ],
    generateSteps: (array: number[]): Step[] => {
      const steps: Step[] = [];
      const currentArr = clone(array);
      const n = currentArr.length;
      let stepId = 0;
      let minVal = currentArr[0];
      let minIdx = 0;
      let comparisons = 0;
      let iterations = 0;

      steps.push({
        id: stepId++,
        array: clone(currentArr),
        pointers: { minIdx },
        highlights: { [0]: 'active' },
        variables: { minVal, minIdx, i: 'not started' },
        line: 1,
        explanation: `Initialize minVal to array[0] (${minVal}) and minIdx to 0. This is our starting minimum.`,
        stats: { comparisons: 0, swapsOrShifts: 0, iterations: 0 }
      });

      for (let i = 1; i < n; i++) {
        iterations++;
        comparisons++;

        steps.push({
          id: stepId++,
          array: clone(currentArr),
          pointers: { i, minIdx },
          highlights: { [minIdx]: 'active', [i]: 'comparing' },
          variables: { minVal, minIdx, i },
          line: 4,
          explanation: `Compare current element array[${i}] (${currentArr[i]}) with our current minVal (${minVal}).`,
          stats: { comparisons, swapsOrShifts: 0, iterations }
        });

        if (currentArr[i] < minVal) {
          const oldMin = minVal;
          minVal = currentArr[i];
          minIdx = i;

          steps.push({
            id: stepId++,
            array: clone(currentArr),
            pointers: { i, minIdx },
            highlights: { [i]: 'matched' },
            variables: { minVal, minIdx, i },
            line: 5,
            explanation: `Found smaller element! ${currentArr[i]} is less than ${oldMin}. Updating minVal to ${minVal} at index ${minIdx}.`,
            stats: { comparisons, swapsOrShifts: 0, iterations }
          });
        } else {
          steps.push({
            id: stepId++,
            array: clone(currentArr),
            pointers: { i, minIdx },
            highlights: { [minIdx]: 'active', [i]: 'normal' },
            variables: { minVal, minIdx, i },
            line: 4,
            explanation: `${currentArr[i]} is not smaller than our minimum of ${minVal}. Keeping current minimum.`,
            stats: { comparisons, swapsOrShifts: 0, iterations }
          });
        }
      }

      steps.push({
        id: stepId++,
        array: clone(currentArr),
        pointers: { minIdx },
        highlights: { [minIdx]: 'done' },
        variables: { minVal, minIdx, i: 'completed' },
        line: 8,
        explanation: `Scan complete! The smallest value in the array is ${minVal} found at index ${minIdx}.`,
        stats: { comparisons, swapsOrShifts: 0, iterations }
      });

      return steps;
    }
  },
  {
    id: 'reverse',
    name: 'Reverse Array',
    category: 'sorting',
    difficulty: 'Easy',
    description: 'Reverses the elements in the array in-place using two pointers (left and right) moving toward the center.',
    defaultArray: [10, 20, 30, 40, 50, 60],
    code: [
      { text: 'let left = 0;', indent: 0 },
      { text: 'let right = array.length - 1;', indent: 0 },
      { text: 'while (left < right) {', indent: 0 },
      { text: '  let temp = array[left];', indent: 1 },
      { text: '  array[left] = array[right];', indent: 1 },
      { text: '  array[right] = temp;', indent: 1 },
      { text: '  left++;', indent: 1 },
      { text: '  right--;', indent: 1 },
      { text: '}', indent: 0 }
    ],
    tips: [
      "This is an 'in-place' algorithm: we modify the original array directly without allocating secondary arrays.",
      "The 'temp' variable is crucial. It stores one of the values so it doesn't get overwritten when we swap.",
      "The loop finishes once our two pointers meet or cross in the middle ('left >= right')."
    ],
    generateSteps: (array: number[]): Step[] => {
      const steps: Step[] = [];
      const currentArr = clone(array);
      const n = currentArr.length;
      let stepId = 0;
      let left = 0;
      let right = n - 1;
      let swapsOrShifts = 0;
      let iterations = 0;

      steps.push({
        id: stepId++,
        array: clone(currentArr),
        pointers: { left, right },
        highlights: { [left]: 'active', [right]: 'active' },
        variables: { left, right, temp: 'undefined' },
        line: 1,
        explanation: `Set left pointer to 0 and right pointer to index ${n - 1}. Let's check if left is less than right.`,
        stats: { comparisons: 0, swapsOrShifts: 0, iterations: 0 }
      });

      while (left < right) {
        iterations++;
        const temp = currentArr[left];

        steps.push({
          id: stepId++,
          array: clone(currentArr),
          pointers: { left, right },
          highlights: { [left]: 'active', [right]: 'active' },
          variables: { left, right, temp },
          line: 4,
          explanation: `Store current left value (${temp}) in a 'temp' variable so we don't lose it during swap.`,
          stats: { comparisons: 1, swapsOrShifts, iterations }
        });

        // Swap visually
        currentArr[left] = currentArr[right];
        steps.push({
          id: stepId++,
          array: clone(currentArr),
          pointers: { left, right },
          highlights: { [left]: 'swapping', [right]: 'active' },
          variables: { left, right, temp },
          line: 5,
          explanation: `Copy right value (${currentArr[right]}) into left index (${left}). Left is now ${currentArr[left]}.`,
          stats: { comparisons: 1, swapsOrShifts, iterations }
        });

        currentArr[right] = temp;
        swapsOrShifts++;
        steps.push({
          id: stepId++,
          array: clone(currentArr),
          pointers: { left, right },
          highlights: { [left]: 'swapping', [right]: 'swapping' },
          variables: { left, right, temp },
          line: 6,
          explanation: `Copy 'temp' value (${temp}) into right index (${right}). Swap complete for these two indexes!`,
          stats: { comparisons: 1, swapsOrShifts, iterations }
        });

        left++;
        right--;

        steps.push({
          id: stepId++,
          array: clone(currentArr),
          pointers: { left, right },
          highlights: { [left - 1]: 'done', [right + 1]: 'done', ...(left < right ? { [left]: 'active', [right]: 'active' } : {}) },
          variables: { left, right, temp },
          line: 7,
          explanation: `Increment left pointer to ${left} and decrement right pointer to ${right}.`,
          stats: { comparisons: 1, swapsOrShifts, iterations }
        });
      }

      steps.push({
        id: stepId++,
        array: clone(currentArr),
        pointers: {},
        highlights: Object.fromEntries(currentArr.map((_, idx) => [idx, 'done'])),
        variables: { left, right, temp: 'undefined' },
        line: 9,
        explanation: `Pointers have met or crossed (left = ${left}, right = ${right}). The array has been successfully reversed!`,
        stats: { comparisons: 1, swapsOrShifts, iterations }
      });

      return steps;
    }
  },
  {
    id: 'linear-search',
    name: 'Linear Search',
    category: 'searching',
    difficulty: 'Beginner',
    description: 'Searches for a specific target value by scanning each element of the array one-by-one from index 0 to the end.',
    defaultArray: [10, 24, 45, 70, 85, 99],
    code: [
      { text: 'let target = X;', indent: 0 },
      { text: 'for (let i = 0; i < array.length; i++) {', indent: 0 },
      { text: '  if (array[i] === target) {', indent: 1 },
      { text: '    return i; // Found!', indent: 2 },
      { text: '  }', indent: 1 },
      { text: '}', indent: 0 },
      { text: 'return -1; // Not found', indent: 0 }
    ],
    tips: [
      "Linear Search is simple but can be slow for huge arrays, as it may require checking every single item (O(N) time).",
      "We compare the element at index 'i' with our 'target' value.",
      "If we find a match, we stop searching immediately and return the index."
    ],
    generateSteps: (array: number[], params): Step[] => {
      const steps: Step[] = [];
      const currentArr = clone(array);
      const n = currentArr.length;
      let stepId = 0;
      const target = params?.target ?? 70;
      let comparisons = 0;
      let iterations = 0;

      steps.push({
        id: stepId++,
        array: clone(currentArr),
        pointers: {},
        highlights: {},
        variables: { target, i: 'not started' },
        line: 1,
        explanation: `Setting target value to ${target}. We will scan the array to search for it.`,
        stats: { comparisons: 0, swapsOrShifts: 0, iterations: 0 }
      });

      let foundIdx = -1;
      for (let i = 0; i < n; i++) {
        iterations++;
        comparisons++;

        steps.push({
          id: stepId++,
          array: clone(currentArr),
          pointers: { i },
          highlights: { [i]: 'comparing' },
          variables: { target, i },
          line: 3,
          explanation: `Checking array[${i}] (${currentArr[i]}). Is it equal to our target (${target})?`,
          stats: { comparisons, swapsOrShifts: 0, iterations }
        });

        if (currentArr[i] === target) {
          foundIdx = i;

          steps.push({
            id: stepId++,
            array: clone(currentArr),
            pointers: { i },
            highlights: { [i]: 'matched' },
            variables: { target, i },
            line: 4,
            explanation: `Found it! Element at index ${i} matches our target of ${target}. Returning index ${i}.`,
            stats: { comparisons, swapsOrShifts: 0, iterations }
          });
          break;
        }
      }

      if (foundIdx === -1) {
        steps.push({
          id: stepId++,
          array: clone(currentArr),
          pointers: {},
          highlights: Object.fromEntries(currentArr.map((_, idx) => [idx, 'normal'])),
          variables: { target, i: 'completed', result: -1 },
          line: 7,
          explanation: `Scan complete! We reached the end of the array without finding the target value ${target}. Returning -1.`,
          stats: { comparisons, swapsOrShifts: 0, iterations }
        });
      } else {
        steps.push({
          id: stepId++,
          array: clone(currentArr),
          pointers: {},
          highlights: Object.fromEntries(currentArr.map((_, idx) => [idx, idx === foundIdx ? 'done' : 'normal'])),
          variables: { target, i: 'completed', result: foundIdx },
          line: 4,
          explanation: `Algorithm finished! Target ${target} successfully located at index ${foundIdx}.`,
          stats: { comparisons, swapsOrShifts: 0, iterations }
        });
      }

      return steps;
    }
  },
  {
    id: 'traversal',
    name: 'Array Traversal (Sum)',
    category: 'traversal',
    difficulty: 'Beginner',
    description: 'Visits every element of the array exactly once, summing up the values to compute the total.',
    defaultArray: [5, 12, 8, 20, 15],
    code: [
      { text: 'let sum = 0;', indent: 0 },
      { text: 'for (let i = 0; i < array.length; i++) {', indent: 0 },
      { text: '  sum += array[i];', indent: 1 },
      { text: '}', indent: 0 }
    ],
    tips: [
      "Traversal is the fundamental building block of array operations.",
      "The running 'sum' acts as an accumulator variable that builds up our final total.",
      "The loop counter 'i' acts as our index pointer, visiting indices 0, 1, 2, ... all the way to length - 1."
    ],
    generateSteps: (array: number[]): Step[] => {
      const steps: Step[] = [];
      const currentArr = clone(array);
      const n = currentArr.length;
      let stepId = 0;
      let sum = 0;
      let iterations = 0;

      steps.push({
        id: stepId++,
        array: clone(currentArr),
        pointers: {},
        highlights: {},
        variables: { sum: 0, i: 'not started' },
        line: 1,
        explanation: 'Initialize sum to 0. We will traverse the array and add each element to this running sum.',
        stats: { comparisons: 0, swapsOrShifts: 0, iterations: 0 }
      });

      for (let i = 0; i < n; i++) {
        iterations++;
        const val = currentArr[i];

        steps.push({
          id: stepId++,
          array: clone(currentArr),
          pointers: { i },
          highlights: { [i]: 'active' },
          variables: { sum, i },
          line: 2,
          explanation: `Pointer 'i' points to index ${i} (value ${val}). Let's add it to our running total.`,
          stats: { comparisons: 0, swapsOrShifts: 0, iterations }
        });

        sum += val;

        steps.push({
          id: stepId++,
          array: clone(currentArr),
          pointers: { i },
          highlights: { [i]: 'matched' },
          variables: { sum, i },
          line: 3,
          explanation: `Added ${val} to sum. The running sum is now ${sum}.`,
          stats: { comparisons: 0, swapsOrShifts: 0, iterations }
        });
      }

      steps.push({
        id: stepId++,
        array: clone(currentArr),
        pointers: {},
        highlights: Object.fromEntries(currentArr.map((_, idx) => [idx, 'done'])),
        variables: { sum, i: 'completed' },
        line: 4,
        explanation: `Traversal complete! Visited all ${n} elements. The total sum is ${sum}.`,
        stats: { comparisons: 0, swapsOrShifts: 0, iterations }
      });

      return steps;
    }
  },
  {
    id: 'insertion',
    name: 'Array Insertion',
    category: 'manipulation',
    difficulty: 'Intermediate',
    description: 'Inserts an element at a specific index. Highlights how existing elements must shift right to open a vacancy.',
    defaultArray: [10, 20, 30, 40],
    code: [
      { text: 'let value = X;', indent: 0 },
      { text: 'let insertIdx = index;', indent: 0 },
      { text: 'for (let k = array.length - 1; k > insertIdx; k--) {', indent: 0 },
      { text: '  array[k] = array[k - 1];', indent: 1 },
      { text: '}', indent: 0 },
      { text: 'array[insertIdx] = value;', indent: 0 }
    ],
    tips: [
      "In standard computer memory, arrays are contiguous blocks of fixed size. To insert an element, we must shift everything else over.",
      "Shifting starts from the very end of the array and moves backward, preventing values from being overwritten.",
      "We grow our array size by 1 first, copying the last element, then shift values until our target index becomes vacant."
    ],
    generateSteps: (array: number[], params): Step[] => {
      const steps: Step[] = [];
      const initialArr = clone(array);
      const insertIdx = params?.insertIndex ?? 2;
      const value = params?.insertValue ?? 99;
      let stepId = 0;
      let swapsOrShifts = 0;
      let iterations = 0;

      // Ensure index is within range
      const idx = Math.max(0, Math.min(initialArr.length, insertIdx));

      // Visual expand array step (we copy the last element or put a dummy 0 at the end to make space)
      // Let's create an array with length + 1
      const currentArr = [...initialArr, initialArr[initialArr.length - 1]];
      const len = currentArr.length;

      steps.push({
        id: stepId++,
        array: clone(initialArr), // show original first
        pointers: {},
        highlights: {},
        variables: { value, insertIdx: idx, k: 'not started' },
        line: 1,
        explanation: `We want to insert ${value} at index ${idx}. First, we must expand the array's size to make room.`,
        stats: { comparisons: 0, swapsOrShifts: 0, iterations: 0 }
      });

      // Show expanded state
      steps.push({
        id: stepId++,
        array: clone(currentArr), // show expanded
        pointers: {},
        highlights: { [len - 1]: 'target' },
        variables: { value, insertIdx: idx, k: 'not started' },
        line: 2,
        explanation: `Array expanded! A placeholder slot is created at the end (index ${len - 1}). Now we shift elements right.`,
        stats: { comparisons: 0, swapsOrShifts: 0, iterations: 0 }
      });

      // Shift loop: k starts at len - 1, goes down to idx + 1
      for (let k = len - 1; k > idx; k--) {
        iterations++;

        // Point to shifting source and destination
        steps.push({
          id: stepId++,
          array: clone(currentArr),
          pointers: { k, 'k - 1': k - 1 },
          highlights: { [k - 1]: 'active', [k]: 'comparing' },
          variables: { value, insertIdx: idx, k },
          line: 3,
          explanation: `Preparing to shift: Index ${k - 1} value (${currentArr[k - 1]}) will copy into index ${k}.`,
          stats: { comparisons: 0, swapsOrShifts, iterations }
        });

        // Copy value over
        currentArr[k] = currentArr[k - 1];
        swapsOrShifts++;

        steps.push({
          id: stepId++,
          array: clone(currentArr),
          pointers: { k, 'k - 1': k - 1 },
          highlights: { [k - 1]: 'active', [k]: 'shifted' },
          variables: { value, insertIdx: idx, k },
          line: 4,
          explanation: `Shifted! array[${k}] is now ${currentArr[k]}. We freed up index ${k - 1}.`,
          stats: { comparisons: 0, swapsOrShifts, iterations }
        });
      }

      // Final insertion step
      currentArr[idx] = value;

      steps.push({
        id: stepId++,
        array: clone(currentArr),
        pointers: { insertIdx: idx },
        highlights: { [idx]: 'matched' },
        variables: { value, insertIdx: idx, k: 'finished' },
        line: 6,
        explanation: `Vacancy created! Now we place our insertion value ${value} directly into the vacant index ${idx}.`,
        stats: { comparisons: 0, swapsOrShifts, iterations }
      });

      steps.push({
        id: stepId++,
        array: clone(currentArr),
        pointers: {},
        highlights: Object.fromEntries(currentArr.map((_, i) => [i, i === idx ? 'done' : 'normal'])),
        variables: { value, insertIdx: idx },
        line: 6,
        explanation: `Insertion complete! The array is now: [${currentArr.join(', ')}].`,
        stats: { comparisons: 0, swapsOrShifts, iterations }
      });

      return steps;
    }
  },
  {
    id: 'deletion',
    name: 'Array Deletion',
    category: 'manipulation',
    difficulty: 'Intermediate',
    description: 'Deletes an element at a specific index. Highlights how subsequent elements must shift left to close the gap.',
    defaultArray: [10, 20, 30, 40, 50],
    code: [
      { text: 'let deleteIdx = index;', indent: 0 },
      { text: 'for (let k = deleteIdx; k < array.length - 1; k++) {', indent: 0 },
      { text: '  array[k] = array[k + 1];', indent: 1 },
      { text: '}', indent: 0 },
      { text: 'array.pop(); // Remove last duplicate slot', indent: 0 }
    ],
    tips: [
      "To delete an element at an index, we cannot leave an empty gap in the middle of contiguous memory.",
      "We fill the gap by shifting every element to its right over to the left by one position.",
      "Once everything is shifted, the very last slot is a duplicate of the second-to-last, so we trim or pop the array."
    ],
    generateSteps: (array: number[], params): Step[] => {
      const steps: Step[] = [];
      const currentArr = clone(array);
      const deleteIdx = params?.deleteIndex ?? 1;
      let stepId = 0;
      let swapsOrShifts = 0;
      let iterations = 0;

      // Ensure index is within range
      const idx = Math.max(0, Math.min(currentArr.length - 1, deleteIdx));

      steps.push({
        id: stepId++,
        array: clone(currentArr),
        pointers: { deleteIdx: idx },
        highlights: { [idx]: 'target' },
        variables: { deleteIdx: idx, k: 'not started' },
        line: 1,
        explanation: `We want to delete the element at index ${idx} (value ${currentArr[idx]}). This will leave a gap we must fill.`,
        stats: { comparisons: 0, swapsOrShifts: 0, iterations: 0 }
      });

      const n = currentArr.length;
      for (let k = idx; k < n - 1; k++) {
        iterations++;

        // Point to swap source and dest
        steps.push({
          id: stepId++,
          array: clone(currentArr),
          pointers: { k, 'k + 1': k + 1 },
          highlights: { [k]: 'comparing', [k + 1]: 'active' },
          variables: { deleteIdx: idx, k },
          line: 2,
          explanation: `Preparing to shift: Index ${k + 1} value (${currentArr[k + 1]}) will copy left into index ${k}.`,
          stats: { comparisons: 0, swapsOrShifts, iterations }
        });

        currentArr[k] = currentArr[k + 1];
        swapsOrShifts++;

        steps.push({
          id: stepId++,
          array: clone(currentArr),
          pointers: { k, 'k + 1': k + 1 },
          highlights: { [k]: 'shifted', [k + 1]: 'active' },
          variables: { deleteIdx: idx, k },
          line: 3,
          explanation: `Shifted! array[${k}] is now ${currentArr[k]}. The duplicate is now at index ${k + 1}.`,
          stats: { comparisons: 0, swapsOrShifts, iterations }
        });
      }

      // Trim step: array.pop()
      const originalLastIdx = n - 1;
      steps.push({
        id: stepId++,
        array: clone(currentArr),
        pointers: {},
        highlights: { [originalLastIdx]: 'target' },
        variables: { deleteIdx: idx, k: 'finished' },
        line: 5,
        explanation: `The shift leaves a duplicate element at the very end of the array (index ${originalLastIdx}). Now we trim it.`,
        stats: { comparisons: 0, swapsOrShifts, iterations }
      });

      currentArr.pop();

      steps.push({
        id: stepId++,
        array: clone(currentArr),
        pointers: {},
        highlights: Object.fromEntries(currentArr.map((_, i) => [i, 'done'])),
        variables: { deleteIdx: idx, k: 'finished' },
        line: 5,
        explanation: `Trimmed! The duplicate last element was removed. Deletion complete!`,
        stats: { comparisons: 0, swapsOrShifts, iterations }
      });

      return steps;
    }
  },
  {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    category: 'sorting',
    difficulty: 'Easy',
    description: 'Sorts the array in ascending order by repeatedly comparing adjacent elements and swapping them if they are in the wrong order.',
    defaultArray: [29, 10, 14, 37, 13],
    code: [
      { text: 'for (let i = 0; i < array.length; i++) {', indent: 0 },
      { text: '  for (let j = 0; j < array.length - i - 1; j++) {', indent: 1 },
      { text: '    if (array[j] > array[j + 1]) {', indent: 2 },
      { text: '      let temp = array[j];', indent: 3 },
      { text: '      array[j] = array[j + 1];', indent: 3 },
      { text: '      array[j + 1] = temp;', indent: 3 },
      { text: '    }', indent: 2 },
      { text: '  }', indent: 1 },
      { text: '}', indent: 0 }
    ],
    tips: [
      "Bubble Sort is a classic nested loop algorithm where each outer loop pass bubbles the next largest element to the end.",
      "The inner loop limit 'length - i - 1' is optimized: since 'i' elements are already sorted at the end, we don't need to check them again.",
      "If we go through the entire inner loop without making any swaps, the array is already sorted and we could stop early!"
    ],
    generateSteps: (array: number[]): Step[] => {
      const steps: Step[] = [];
      const currentArr = [...array];
      const n = currentArr.length;
      let stepId = 0;
      let comparisons = 0;
      let swapsOrShifts = 0;
      let iterations = 0;

      steps.push({
        id: stepId++,
        array: [...currentArr],
        pointers: {},
        highlights: {},
        variables: { i: 'not started', j: 'not started', temp: 'undefined' },
        line: 1,
        explanation: 'Start Bubble Sort. We will scan the array multiple times, shifting the largest elements to the end.',
        stats: { comparisons: 0, swapsOrShifts: 0, iterations: 0 }
      });

      for (let i = 0; i < n; i++) {
        iterations++;
        steps.push({
          id: stepId++,
          array: [...currentArr],
          pointers: { i },
          highlights: Object.fromEntries(Array.from({ length: i }, (_, k) => [n - k - 1, 'done'] as [number, HighlightType])),
          variables: { i, j: 'not started', temp: 'undefined' },
          line: 1,
          explanation: `Outer loop iteration ${i + 1}: Placing the ${i + 1}-th largest element at its correct position.`,
          stats: { comparisons, swapsOrShifts, iterations }
        });

        for (let j = 0; j < n - i - 1; j++) {
          iterations++;
          comparisons++;

          steps.push({
            id: stepId++,
            array: [...currentArr],
            pointers: { i, j, 'j+1': j + 1 },
            highlights: {
              [j]: 'comparing',
              [j + 1]: 'comparing',
              ...Object.fromEntries(Array.from({ length: i }, (_, k) => [n - k - 1, 'done'] as [number, HighlightType]))
            },
            variables: { i, j, temp: 'undefined' },
            line: 3,
            explanation: `Comparing adjacent elements: array[${j}] (${currentArr[j]}) and array[${j + 1}] (${currentArr[j + 1]}).`,
            stats: { comparisons, swapsOrShifts, iterations }
          });

          if (currentArr[j] > currentArr[j + 1]) {
            const temp = currentArr[j];

            steps.push({
              id: stepId++,
              array: [...currentArr],
              pointers: { i, j, 'j+1': j + 1 },
              highlights: {
                [j]: 'active',
                [j + 1]: 'comparing',
                ...Object.fromEntries(Array.from({ length: i }, (_, k) => [n - k - 1, 'done'] as [number, HighlightType]))
              },
              variables: { i, j, temp },
              line: 4,
              explanation: `${currentArr[j]} is greater than ${currentArr[j + 1]}. Storing ${temp} in temp variable.`,
              stats: { comparisons, swapsOrShifts, iterations }
            });

            currentArr[j] = currentArr[j + 1];
            steps.push({
              id: stepId++,
              array: [...currentArr],
              pointers: { i, j, 'j+1': j + 1 },
              highlights: {
                [j]: 'swapping',
                [j + 1]: 'comparing',
                ...Object.fromEntries(Array.from({ length: i }, (_, k) => [n - k - 1, 'done'] as [number, HighlightType]))
              },
              variables: { i, j, temp },
              line: 5,
              explanation: `Copying index ${j + 1} value (${currentArr[j + 1]}) into index ${j}.`,
              stats: { comparisons, swapsOrShifts, iterations }
            });

            currentArr[j + 1] = temp;
            swapsOrShifts++;
            steps.push({
              id: stepId++,
              array: [...currentArr],
              pointers: { i, j, 'j+1': j + 1 },
              highlights: {
                [j]: 'swapping',
                [j + 1]: 'swapping',
                ...Object.fromEntries(Array.from({ length: i }, (_, k) => [n - k - 1, 'done'] as [number, HighlightType]))
              },
              variables: { i, j, temp },
              line: 6,
              explanation: `Placing temp value (${temp}) into index ${j + 1}. Swap complete!`,
              stats: { comparisons, swapsOrShifts, iterations }
            });
          }
        }
      }

      steps.push({
        id: stepId++,
        array: [...currentArr],
        pointers: {},
        highlights: Object.fromEntries(currentArr.map((_, idx) => [idx, 'done'])),
        variables: { i: 'completed', j: 'completed', temp: 'undefined' },
        line: 9,
        explanation: `Array is fully sorted! Bubble Sort completed successfully.`,
        stats: { comparisons, swapsOrShifts, iterations }
      });

      return steps;
    }
  },
  {
    id: 'two-sum',
    name: 'Two Sum (Brute Force)',
    category: 'searching',
    difficulty: 'Easy',
    description: 'A nested loop algorithm that searches for a pair of elements that sum up to a given target value.',
    defaultArray: [3, 8, 12, 5, 9],
    code: [
      { text: 'let targetSum = K;', indent: 0 },
      { text: 'for (let i = 0; i < array.length; i++) {', indent: 0 },
      { text: '  for (let j = i + 1; j < array.length; j++) {', indent: 1 },
      { text: '    if (array[i] + array[j] === targetSum) {', indent: 2 },
      { text: '      return [i, j]; // Pair found!', indent: 3 },
      { text: '    }', indent: 2 },
      { text: '  }', indent: 1 },
      { text: '}', indent: 0 },
      { text: 'return null; // No pair', indent: 0 }
    ],
    tips: [
      "Two Sum is a classic problem. The brute force solution uses nested loops to test every combination of two elements.",
      "The outer loop variable 'i' iterates from 0 to length - 1, and the inner loop 'j' iterates from 'i + 1' to avoid using the same element twice.",
      "This O(N²) time approach is educational, as we visualize every possible pairing of array elements."
    ],
    generateSteps: (array: number[], params): Step[] => {
      const steps: Step[] = [];
      const currentArr = [...array];
      const n = currentArr.length;
      let stepId = 0;
      let comparisons = 0;
      let swapsOrShifts = 0;
      let iterations = 0;
      const targetSum = params?.target ?? 17;

      steps.push({
        id: stepId++,
        array: [...currentArr],
        pointers: {},
        highlights: {},
        variables: { targetSum, i: 'not started', j: 'not started' },
        line: 1,
        explanation: `Initialize search for two numbers that sum up to K = ${targetSum}.`,
        stats: { comparisons: 0, swapsOrShifts: 0, iterations: 0 }
      });

      let found = false;
      for (let i = 0; i < n; i++) {
        iterations++;
        steps.push({
          id: stepId++,
          array: [...currentArr],
          pointers: { i },
          highlights: { [i]: 'active' },
          variables: { targetSum, i, j: 'not started' },
          line: 2,
          explanation: `Outer loop: Selecting index ${i} (value ${currentArr[i]}). Looking for a partner number that equals ${targetSum} - ${currentArr[i]} = ${targetSum - currentArr[i]}.`,
          stats: { comparisons, swapsOrShifts, iterations }
        });

        for (let j = i + 1; j < n; j++) {
          iterations++;
          comparisons++;
          const currentSum = currentArr[i] + currentArr[j];

          steps.push({
            id: stepId++,
            array: [...currentArr],
            pointers: { i, j },
            highlights: { [i]: 'active', [j]: 'comparing' },
            variables: { targetSum, i, j, currentSum },
            line: 4,
            explanation: `Comparing pair: array[${i}] (${currentArr[i]}) + array[${j}] (${currentArr[j]}) = ${currentSum}. Does it equal ${targetSum}?`,
            stats: { comparisons, swapsOrShifts, iterations }
          });

          if (currentSum === targetSum) {
            found = true;
            steps.push({
              id: stepId++,
              array: [...currentArr],
              pointers: { i, j },
              highlights: { [i]: 'matched', [j]: 'matched' },
              variables: { targetSum, i, j, currentSum },
              line: 5,
              explanation: `Match found! ${currentArr[i]} + ${currentArr[j]} is exactly ${targetSum}. Returning indices [${i}, ${j}].`,
              stats: { comparisons, swapsOrShifts, iterations }
            });
            break;
          }
        }
        if (found) break;
      }

      if (!found) {
        steps.push({
          id: stepId++,
          array: [...currentArr],
          pointers: {},
          highlights: Object.fromEntries(currentArr.map((_, idx) => [idx, 'normal'])),
          variables: { targetSum, i: 'completed', j: 'completed' },
          line: 9,
          explanation: `Scan complete! Checked all possible pairs but found no two numbers that sum up to ${targetSum}. Returning null.`,
          stats: { comparisons, swapsOrShifts, iterations }
        });
      }

      return steps;
    }
  },
  {
    id: 'selection-sort',
    name: 'Selection Sort',
    category: 'sorting',
    difficulty: 'Easy',
    description: 'Sorts an array by repeatedly finding the minimum element from the unsorted part and putting it at the beginning.',
    defaultArray: [29, 10, 14, 37, 13],
    code: [
      { text: 'for (let i = 0; i < array.length - 1; i++) {', indent: 0 },
      { text: '  let minIdx = i;', indent: 1 },
      { text: '  for (let j = i + 1; j < array.length; j++) {', indent: 1 },
      { text: '    if (array[j] < array[minIdx]) {', indent: 2 },
      { text: '      minIdx = j;', indent: 3 },
      { text: '    }', indent: 2 },
      { text: '  }', indent: 1 },
      { text: '  if (minIdx !== i) {', indent: 1 },
      { text: '    let temp = array[i];', indent: 2 },
      { text: '    array[i] = array[minIdx];', indent: 2 },
      { text: '    array[minIdx] = temp;', indent: 2 },
      { text: '  }', indent: 1 },
      { text: '}', indent: 0 }
    ],
    tips: [
      "Selection Sort divides the array into a sorted subarray at the left and an unsorted subarray at the right.",
      "The 'minIdx' pointer tracks the smallest element found so far in the unsorted portion.",
      "At the end of each outer loop iteration, the minimum element found is swapped with the first element of the unsorted subarray."
    ],
    generateSteps: (array: number[]): Step[] => {
      const steps: Step[] = [];
      const currentArr = [...array];
      const n = currentArr.length;
      let stepId = 0;
      let comparisons = 0;
      let swapsOrShifts = 0;
      let iterations = 0;

      // Step 0: Initialize
      steps.push({
        id: stepId++,
        array: [...currentArr],
        pointers: {},
        highlights: {},
        variables: { i: 'not started', minIdx: 'not started', j: 'not started', temp: 'undefined' },
        line: 1,
        explanation: 'Start Selection Sort. We will scan the array to find the smallest element and swap it to the front.',
        stats: { comparisons: 0, swapsOrShifts: 0, iterations: 0 }
      });

      for (let i = 0; i < n - 1; i++) {
        iterations++;
        // Step Outer Loop
        steps.push({
          id: stepId++,
          array: [...currentArr],
          pointers: { i },
          highlights: {
            ...Object.fromEntries(Array.from({ length: i }, (_, k) => [k, 'done'] as [number, HighlightType])),
            [i]: 'active'
          },
          variables: { i, minIdx: 'not started', j: 'not started', temp: 'undefined' },
          line: 1,
          explanation: `Outer loop iteration ${i + 1}: Find the smallest element starting from index ${i}.`,
          stats: { comparisons, swapsOrShifts, iterations }
        });

        let minIdx = i;
        iterations++;
        steps.push({
          id: stepId++,
          array: [...currentArr],
          pointers: { i, minIdx },
          highlights: {
            ...Object.fromEntries(Array.from({ length: i }, (_, k) => [k, 'done'] as [number, HighlightType])),
            [minIdx]: 'active'
          },
          variables: { i, minIdx, j: 'not started', temp: 'undefined' },
          line: 2,
          explanation: `Assume the minimum element is at the start of our unsorted subarray (index ${i}, value ${currentArr[i]}).`,
          stats: { comparisons, swapsOrShifts, iterations }
        });

        for (let j = i + 1; j < n; j++) {
          iterations++;
          comparisons++;

          steps.push({
            id: stepId++,
            array: [...currentArr],
            pointers: { i, minIdx, j },
            highlights: {
              ...Object.fromEntries(Array.from({ length: i }, (_, k) => [k, 'done'] as [number, HighlightType])),
              [minIdx]: 'active',
              [j]: 'comparing'
            },
            variables: { i, minIdx, j, temp: 'undefined' },
            line: 4,
            explanation: `Compare array[j] (${currentArr[j]}) with current minimum array[minIdx] (${currentArr[minIdx]}).`,
            stats: { comparisons, swapsOrShifts, iterations }
          });

          if (currentArr[j] < currentArr[minIdx]) {
            const prevMin = minIdx;
            minIdx = j;

            steps.push({
              id: stepId++,
              array: [...currentArr],
              pointers: { i, minIdx, j },
              highlights: {
                ...Object.fromEntries(Array.from({ length: i }, (_, k) => [k, 'done'] as [number, HighlightType])),
                [prevMin]: 'normal',
                [minIdx]: 'matched',
                [j]: 'matched'
              },
              variables: { i, minIdx, j, temp: 'undefined' },
              line: 5,
              explanation: `Found smaller value! ${currentArr[j]} is less than ${currentArr[prevMin]}. Update minIdx to index ${minIdx}.`,
              stats: { comparisons, swapsOrShifts, iterations }
            });
          }
        }

        // Check if we need to swap
        iterations++;
        steps.push({
          id: stepId++,
          array: [...currentArr],
          pointers: { i, minIdx },
          highlights: {
            ...Object.fromEntries(Array.from({ length: i }, (_, k) => [k, 'done'] as [number, HighlightType])),
            [i]: 'active',
            [minIdx]: 'active'
          },
          variables: { i, minIdx, temp: 'undefined' },
          line: 8,
          explanation: minIdx !== i 
            ? `Inner loop finished. Smallest value is at index ${minIdx} (${currentArr[minIdx]}), which is different from index ${i} (${currentArr[i]}). We will swap them.`
            : `Inner loop finished. Smallest value is already at index ${i} (${currentArr[i]}). No swap is needed.`,
          stats: { comparisons, swapsOrShifts, iterations }
        });

        if (minIdx !== i) {
          const temp = currentArr[i];
          
          steps.push({
            id: stepId++,
            array: [...currentArr],
            pointers: { i, minIdx },
            highlights: {
              ...Object.fromEntries(Array.from({ length: i }, (_, k) => [k, 'done'] as [number, HighlightType])),
              [i]: 'active',
              [minIdx]: 'active'
            },
            variables: { i, minIdx, temp },
            line: 9,
            explanation: `Store array[i] (${temp}) in temporary variable 'temp'.`,
            stats: { comparisons, swapsOrShifts, iterations }
          });

          currentArr[i] = currentArr[minIdx];
          steps.push({
            id: stepId++,
            array: [...currentArr],
            pointers: { i, minIdx },
            highlights: {
              ...Object.fromEntries(Array.from({ length: i }, (_, k) => [k, 'done'] as [number, HighlightType])),
              [i]: 'swapping',
              [minIdx]: 'active'
            },
            variables: { i, minIdx, temp },
            line: 10,
            explanation: `Copy array[minIdx] (${currentArr[minIdx]}) into index ${i}.`,
            stats: { comparisons, swapsOrShifts, iterations }
          });

          currentArr[minIdx] = temp;
          swapsOrShifts++;
          steps.push({
            id: stepId++,
            array: [...currentArr],
            pointers: { i, minIdx },
            highlights: {
              ...Object.fromEntries(Array.from({ length: i }, (_, k) => [k, 'done'] as [number, HighlightType])),
              [i]: 'swapping',
              [minIdx]: 'swapping'
            },
            variables: { i, minIdx, temp },
            line: 11,
            explanation: `Place 'temp' value (${temp}) into index ${minIdx}. Swap complete!`,
            stats: { comparisons, swapsOrShifts, iterations }
          });
        }
      }

      // Final step: Fully sorted
      steps.push({
        id: stepId++,
        array: [...currentArr],
        pointers: {},
        highlights: Object.fromEntries(currentArr.map((_, idx) => [idx, 'done'])),
        variables: { i: 'completed', minIdx: 'completed', j: 'completed', temp: 'undefined' },
        line: 13,
        explanation: 'Selection Sort completed! The array is now fully sorted.',
        stats: { comparisons, swapsOrShifts, iterations }
      });

      return steps;
    }
  },
  {
    id: 'second-largest',
    name: 'Second Largest Element',
    category: 'searching',
    difficulty: 'Easy',
    description: 'Finds the second largest value in an array in a single scan by keeping track of the largest and second largest elements so far.',
    defaultArray: [12, 35, 1, 10, 34, 1],
    code: [
      { text: 'let first = -Infinity;', indent: 0 },
      { text: 'let second = -Infinity;', indent: 0 },
      { text: 'for (let i = 0; i < array.length; i++) {', indent: 0 },
      { text: '  if (array[i] > first) {', indent: 1 },
      { text: '    second = first;', indent: 2 },
      { text: '    first = array[i];', indent: 2 },
      { text: '  } else if (array[i] > second && array[i] !== first) {', indent: 1 },
      { text: '    second = array[i];', indent: 2 },
      { text: '  }', indent: 1 },
      { text: '}', indent: 0 }
    ],
    tips: [
      "We scan the array from left to right exactly once, maintaining two variables: 'first' and 'second'.",
      "If we find a number greater than 'first', the old 'first' becomes the 'second' largest, and the new number becomes 'first'.",
      "If a number is smaller than 'first' but larger than 'second', we update only 'second'."
    ],
    generateSteps: (array: number[]): Step[] => {
      const steps: Step[] = [];
      const currentArr = [...array];
      const n = currentArr.length;
      let stepId = 0;
      let first = -Infinity;
      let second = -Infinity;
      let comparisons = 0;
      let swapsOrShifts = 0;
      let iterations = 0;

      // Step 0: Initialize
      steps.push({
        id: stepId++,
        array: [...currentArr],
        pointers: {},
        highlights: {},
        variables: { first: '-Infinity', second: '-Infinity', i: 'not started' },
        line: 1,
        explanation: 'Initialize first and second largest variables to -Infinity.',
        stats: { comparisons: 0, swapsOrShifts: 0, iterations: 0 }
      });

      for (let i = 0; i < n; i++) {
        iterations++;
        const val = currentArr[i];

        // Step check comparison with first
        comparisons++;
        steps.push({
          id: stepId++,
          array: [...currentArr],
          pointers: { i },
          highlights: { [i]: 'comparing' },
          variables: { first: first === -Infinity ? '-Infinity' : first, second: second === -Infinity ? '-Infinity' : second, i },
          line: 4,
          explanation: `Checking array[${i}] (${val}). Is it greater than our largest element so far (${first === -Infinity ? '-Infinity' : first})?`,
          stats: { comparisons, swapsOrShifts, iterations }
        });

        if (val > first) {
          const oldFirst = first;
          second = first;
          first = val;

          steps.push({
            id: stepId++,
            array: [...currentArr],
            pointers: { i },
            highlights: { [i]: 'active' },
            variables: { first: oldFirst === -Infinity ? '-Infinity' : oldFirst, second: second === -Infinity ? '-Infinity' : second, i },
            line: 5,
            explanation: `Yes! ${val} is larger than ${oldFirst === -Infinity ? '-Infinity' : oldFirst}. The previous largest becomes the second largest (${second === -Infinity ? '-Infinity' : second}).`,
            stats: { comparisons, swapsOrShifts, iterations }
          });

          steps.push({
            id: stepId++,
            array: [...currentArr],
            pointers: { i },
            highlights: { [i]: 'matched' },
            variables: { first, second: second === -Infinity ? '-Infinity' : second, i },
            line: 6,
            explanation: `Update first largest to ${first}.`,
            stats: { comparisons, swapsOrShifts, iterations }
          });
        } else {
          comparisons++;
          // Step check comparison with second
          steps.push({
            id: stepId++,
            array: [...currentArr],
            pointers: { i },
            highlights: { [i]: 'comparing' },
            variables: { first, second: second === -Infinity ? '-Infinity' : second, i },
            line: 7,
            explanation: `No, ${val} is not greater than first (${first}). Is it greater than second (${second === -Infinity ? '-Infinity' : second}) and not equal to first (${first})?`,
            stats: { comparisons, swapsOrShifts, iterations }
          });

          if (val > second && val !== first) {
            second = val;

            steps.push({
              id: stepId++,
              array: [...currentArr],
              pointers: { i },
              highlights: { [i]: 'matched' },
              variables: { first, second, i },
              line: 8,
              explanation: `Yes! ${val} is greater than second largest and unique. Update second largest to ${second}.`,
              stats: { comparisons, swapsOrShifts, iterations }
            });
          } else {
            steps.push({
              id: stepId++,
              array: [...currentArr],
              pointers: { i },
              highlights: { [i]: 'normal' },
              variables: { first: first === -Infinity ? '-Infinity' : first, second: second === -Infinity ? '-Infinity' : second, i },
              line: 7,
              explanation: `${val} is not greater than our second largest of ${second === -Infinity ? '-Infinity' : second}. Moving on.`,
              stats: { comparisons, swapsOrShifts, iterations }
            });
          }
        }
      }

      // Final step
      steps.push({
        id: stepId++,
        array: [...currentArr],
        pointers: {},
        highlights: Object.fromEntries(currentArr.map((_, idx) => [idx, 'done'])),
        variables: { first, second, i: 'completed' },
        line: 10,
        explanation: `Array scan complete! The largest is ${first} and the second largest is ${second}.`,
        stats: { comparisons, swapsOrShifts, iterations }
      });

      return steps;
    }
  },
  {
    id: 'array-copy',
    name: 'Array Copying',
    category: 'manipulation',
    difficulty: 'Beginner',
    description: 'Copies elements from a source array to a new destination array one by one using a loop.',
    defaultArray: [12, 5, 20, 8, 15],
    code: [
      { text: 'let copy = [];', indent: 0 },
      { text: 'for (let i = 0; i < array.length; i++) {', indent: 0 },
      { text: '  copy[i] = array[i];', indent: 1 },
      { text: '}', indent: 0 }
    ],
    tips: [
      "In some low-level languages, to copy an array you must allocate memory for the new array and copy each item individually.",
      "The loop iterates through the indices of the original array, writing each element to the same index in the copy.",
      "The 'copy' array variable grows dynamically in JavaScript, but represents a separate, independent block of memory."
    ],
    generateSteps: (array: number[]): Step[] => {
      const steps: Step[] = [];
      const currentArr = [...array];
      const n = currentArr.length;
      let stepId = 0;
      const copyArr: string[] = Array.from({ length: n }, () => '_');
      let iterations = 0;

      // Step 0: Initialize
      steps.push({
        id: stepId++,
        array: [...currentArr],
        pointers: {},
        highlights: {},
        variables: { copy: '[]', i: 'not started' },
        line: 1,
        explanation: 'Initialize an empty destination array called copy.',
        stats: { comparisons: 0, swapsOrShifts: 0, iterations: 0 }
      });

      for (let i = 0; i < n; i++) {
        iterations++;
        const val = currentArr[i];

        // Highlight index we are about to copy
        steps.push({
          id: stepId++,
          array: [...currentArr],
          pointers: { i },
          highlights: { [i]: 'active' },
          variables: { copy: `[${copyArr.join(', ')}]`, i },
          line: 2,
          explanation: `Loop iteration i = ${i}: We will copy array[${i}] (${val}) into copy[${i}].`,
          stats: { comparisons: 0, swapsOrShifts: 0, iterations }
        });

        // Copy element over
        copyArr[i] = String(val);

        steps.push({
          id: stepId++,
          array: [...currentArr],
          pointers: { i },
          highlights: { [i]: 'matched' },
          variables: { copy: `[${copyArr.join(', ')}]`, i },
          line: 3,
          explanation: `Copied value ${val} into copy[${i}].`,
          stats: { comparisons: 0, swapsOrShifts: 0, iterations }
        });
      }

      // Final step
      steps.push({
        id: stepId++,
        array: [...currentArr],
        pointers: {},
        highlights: Object.fromEntries(currentArr.map((_, idx) => [idx, 'done'])),
        variables: { copy: `[${copyArr.join(', ')}]`, i: 'completed' },
        line: 4,
        explanation: `Array copying complete! The destination array 'copy' is a perfect replica of the source array.`,
        stats: { comparisons: 0, swapsOrShifts: 0, iterations }
      });

      return steps;
    }
  }
];

