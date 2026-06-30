import { CodeLine } from './types';

export const CURATED_CODE_TEMPLATES: Record<string, Record<string, CodeLine[]>> = {
  'dup-basic': {
    javascript: [
      { text: 'let duplicates = 0;', indent: 0 },
      { text: 'for (let i = 0; i < array.length; i++) {', indent: 0 },
      { text: '  for (let j = i + 1; j < array.length; j++) {', indent: 1 },
      { text: '    if (array[i] === array[j]) {', indent: 2 },
      { text: '      duplicates++;', indent: 3 },
      { text: '    }', indent: 2 },
      { text: '  }', indent: 1 },
      { text: '}', indent: 0 }
    ],
    typescript: [
      { text: 'let duplicates: number = 0;', indent: 0 },
      { text: 'for (let i = 0; i < array.length; i++) {', indent: 0 },
      { text: '  for (let j = i + 1; j < array.length; j++) {', indent: 1 },
      { text: '    if (array[i] === array[j]) {', indent: 2 },
      { text: '      duplicates++;', indent: 3 },
      { text: '    }', indent: 2 },
      { text: '  }', indent: 1 },
      { text: '}', indent: 0 }
    ],
    python: [
      { text: 'duplicates = 0', indent: 0 },
      { text: 'for i in range(len(array)):', indent: 0 },
      { text: '    for j in range(i + 1, len(array)):', indent: 1 },
      { text: '        if array[i] == array[j]:', indent: 2 },
      { text: '            duplicates += 1', indent: 3 },
      { text: '        # end if', indent: 2 },
      { text: '    # end for j', indent: 1 },
      { text: '# end for i', indent: 0 }
    ],
    c: [
      { text: 'int duplicates = 0;', indent: 0 },
      { text: 'for (int i = 0; i < size; i++) {', indent: 0 },
      { text: '    for (int j = i + 1; j < size; j++) {', indent: 1 },
      { text: '        if (array[i] == array[j]) {', indent: 2 },
      { text: '            duplicates++;', indent: 3 },
      { text: '        }', indent: 2 },
      { text: '    }', indent: 1 },
      { text: '}', indent: 0 }
    ],
    cpp: [
      { text: 'int duplicates = 0;', indent: 0 },
      { text: 'for (int i = 0; i < array.size(); i++) {', indent: 0 },
      { text: '    for (int j = i + 1; j < array.size(); j++) {', indent: 1 },
      { text: '        if (array[i] == array[j]) {', indent: 2 },
      { text: '            duplicates++;', indent: 3 },
      { text: '        }', indent: 2 },
      { text: '    }', indent: 1 },
      { text: '}', indent: 0 }
    ],
    java: [
      { text: 'int duplicates = 0;', indent: 0 },
      { text: 'for (int i = 0; i < array.length; i++) {', indent: 0 },
      { text: '    for (int j = i + 1; j < array.length; j++) {', indent: 1 },
      { text: '        if (array[i] == array[j]) {', indent: 2 },
      { text: '            duplicates++;', indent: 3 },
      { text: '        }', indent: 2 },
      { text: '    }', indent: 1 },
      { text: '}', indent: 0 }
    ],
    rust: [
      { text: 'let mut duplicates = 0;', indent: 0 },
      { text: 'for i in 0..array.len() {', indent: 0 },
      { text: '    for j in (i + 1)..array.len() {', indent: 1 },
      { text: '        if array[i] == array[j] {', indent: 2 },
      { text: '            duplicates += 1;', indent: 3 },
      { text: '        }', indent: 2 },
      { text: '    }', indent: 1 },
      { text: '}', indent: 0 }
    ],
    go: [
      { text: 'duplicates := 0', indent: 0 },
      { text: 'for i := 0; i < len(array); i++ {', indent: 0 },
      { text: '    for j := i + 1; j < len(array); j++ {', indent: 1 },
      { text: '        if array[i] == array[j] {', indent: 2 },
      { text: '            duplicates++', indent: 3 },
      { text: '        }', indent: 2 },
      { text: '    }', indent: 1 },
      { text: '}', indent: 0 }
    ]
  },
  'dup-optimized': {
    javascript: [
      { text: 'let duplicates = 0;', indent: 0 },
      { text: 'let seen = new Set();', indent: 0 },
      { text: 'for (let i = 0; i < array.length; i++) {', indent: 0 },
      { text: '  if (seen.has(array[i])) continue;', indent: 1 },
      { text: '  for (let j = i + 1; j < array.length; j++) {', indent: 1 },
      { text: '    if (array[i] === array[j]) {', indent: 2 },
      { text: '      duplicates++;', indent: 3 },
      { text: '      seen.add(array[i]);', indent: 3 },
      { text: '      break; // Skip inner loop', indent: 3 },
      { text: '    }', indent: 2 },
      { text: '  }', indent: 1 },
      { text: '}', indent: 0 }
    ],
    typescript: [
      { text: 'let duplicates: number = 0;', indent: 0 },
      { text: 'let seen = new Set<number>();', indent: 0 },
      { text: 'for (let i = 0; i < array.length; i++) {', indent: 0 },
      { text: '  if (seen.has(array[i])) continue;', indent: 1 },
      { text: '  for (let j = i + 1; j < array.length; j++) {', indent: 1 },
      { text: '    if (array[i] === array[j]) {', indent: 2 },
      { text: '      duplicates++;', indent: 3 },
      { text: '      seen.add(array[i]);', indent: 3 },
      { text: '      break; // Skip inner loop', indent: 3 },
      { text: '    }', indent: 2 },
      { text: '  }', indent: 1 },
      { text: '}', indent: 0 }
    ],
    python: [
      { text: 'duplicates = 0', indent: 0 },
      { text: 'seen = set()', indent: 0 },
      { text: 'for i in range(len(array)):', indent: 0 },
      { text: '    if array[i] in seen: continue', indent: 1 },
      { text: '    for j in range(i + 1, len(array)):', indent: 1 },
      { text: '        if array[i] == array[j]:', indent: 2 },
      { text: '            duplicates += 1', indent: 3 },
      { text: '            seen.add(array[i])', indent: 3 },
      { text: '            break', indent: 3 },
      { text: '        # end if', indent: 2 },
      { text: '    # end for j', indent: 1 },
      { text: '# end for i', indent: 0 }
    ],
    c: [
      { text: 'int duplicates = 0;', indent: 0 },
      { text: 'int seen[100] = {0}; // Track seen elements', indent: 0 },
      { text: 'for (int i = 0; i < size; i++) {', indent: 0 },
      { text: '    if (is_in_set(seen, array[i])) continue;', indent: 1 },
      { text: '    for (int j = i + 1; j < size; j++) {', indent: 1 },
      { text: '        if (array[i] == array[j]) {', indent: 2 },
      { text: '            duplicates++;', indent: 3 },
      { text: '            add_to_set(seen, array[i]);', indent: 3 },
      { text: '            break;', indent: 3 },
      { text: '        }', indent: 2 },
      { text: '    }', indent: 1 },
      { text: '}', indent: 0 }
    ],
    cpp: [
      { text: 'int duplicates = 0;', indent: 0 },
      { text: 'std::unordered_set<int> seen;', indent: 0 },
      { text: 'for (int i = 0; i < array.size(); i++) {', indent: 0 },
      { text: '    if (seen.count(array[i])) continue;', indent: 1 },
      { text: '    for (int j = i + 1; j < array.size(); j++) {', indent: 1 },
      { text: '        if (array[i] == array[j]) {', indent: 2 },
      { text: '            duplicates++;', indent: 3 },
      { text: '            seen.insert(array[i]);', indent: 3 },
      { text: '            break;', indent: 3 },
      { text: '        }', indent: 2 },
      { text: '    }', indent: 1 },
      { text: '}', indent: 0 }
    ],
    java: [
      { text: 'int duplicates = 0;', indent: 0 },
      { text: 'Set<Integer> seen = new HashSet<>();', indent: 0 },
      { text: 'for (int i = 0; i < array.length; i++) {', indent: 0 },
      { text: '    if (seen.contains(array[i])) continue;', indent: 1 },
      { text: '    for (int j = i + 1; j < array.length; j++) {', indent: 1 },
      { text: '        if (array[i] == array[j]) {', indent: 2 },
      { text: '            duplicates++;', indent: 3 },
      { text: '            seen.add(array[i]);', indent: 3 },
      { text: '            break;', indent: 3 },
      { text: '        }', indent: 2 },
      { text: '    }', indent: 1 },
      { text: '}', indent: 0 }
    ],
    rust: [
      { text: 'let mut duplicates = 0;', indent: 0 },
      { text: 'let mut seen = HashSet::new();', indent: 0 },
      { text: 'for i in 0..array.len() {', indent: 0 },
      { text: '    if seen.contains(&array[i]) { continue; }', indent: 1 },
      { text: '    for j in (i + 1)..array.len() {', indent: 1 },
      { text: '        if array[i] == array[j] {', indent: 2 },
      { text: '            duplicates += 1;', indent: 3 },
      { text: '            seen.insert(array[i]);', indent: 3 },
      { text: '            break;', indent: 3 },
      { text: '        }', indent: 2 },
      { text: '    }', indent: 1 },
      { text: '}', indent: 0 }
    ],
    go: [
      { text: 'duplicates := 0', indent: 0 },
      { text: 'seen := make(map[int]bool)', indent: 0 },
      { text: 'for i := 0; i < len(array); i++ {', indent: 0 },
      { text: '    if seen[array[i]] { continue }', indent: 1 },
      { text: '    for j := i + 1; j < len(array); j++ {', indent: 1 },
      { text: '        if array[i] == array[j] {', indent: 2 },
      { text: '            duplicates++', indent: 3 },
      { text: '            seen[array[i]] = true', indent: 3 },
      { text: '            break', indent: 3 },
      { text: '        }', indent: 2 },
      { text: '    }', indent: 1 },
      { text: '}', indent: 0 }
    ]
  },
  'find-largest': {
    javascript: [
      { text: 'let maxVal = array[0];', indent: 0 },
      { text: 'let maxIdx = 0;', indent: 0 },
      { text: 'for (let i = 1; i < array.length; i++) {', indent: 0 },
      { text: '  if (array[i] > maxVal) {', indent: 1 },
      { text: '    maxVal = array[i];', indent: 2 },
      { text: '    maxIdx = i;', indent: 2 },
      { text: '  }', indent: 1 },
      { text: '}', indent: 0 }
    ],
    typescript: [
      { text: 'let maxVal: number = array[0];', indent: 0 },
      { text: 'let maxIdx: number = 0;', indent: 0 },
      { text: 'for (let i = 1; i < array.length; i++) {', indent: 0 },
      { text: '  if (array[i] > maxVal) {', indent: 1 },
      { text: '    maxVal = array[i];', indent: 2 },
      { text: '    maxIdx = i;', indent: 2 },
      { text: '  }', indent: 1 },
      { text: '}', indent: 0 }
    ],
    python: [
      { text: 'max_val = array[0]', indent: 0 },
      { text: 'max_idx = 0', indent: 0 },
      { text: 'for i in range(1, len(array)):', indent: 0 },
      { text: '    if array[i] > max_val:', indent: 1 },
      { text: '        max_val = array[i]', indent: 2 },
      { text: '        max_idx = i', indent: 2 },
      { text: '    # end if', indent: 1 },
      { text: '# end for', indent: 0 }
    ],
    c: [
      { text: 'int max_val = array[0];', indent: 0 },
      { text: 'int max_idx = 0;', indent: 0 },
      { text: 'for (int i = 1; i < size; i++) {', indent: 0 },
      { text: '    if (array[i] > max_val) {', indent: 1 },
      { text: '        max_val = array[i];', indent: 2 },
      { text: '        max_idx = i;', indent: 2 },
      { text: '    }', indent: 1 },
      { text: '}', indent: 0 }
    ],
    cpp: [
      { text: 'int max_val = array[0];', indent: 0 },
      { text: 'int max_idx = 0;', indent: 0 },
      { text: 'for (int i = 1; i < array.size(); i++) {', indent: 0 },
      { text: '    if (array[i] > max_val) {', indent: 1 },
      { text: '        max_val = array[i];', indent: 2 },
      { text: '        max_idx = i;', indent: 2 },
      { text: '    }', indent: 1 },
      { text: '}', indent: 0 }
    ],
    java: [
      { text: 'int maxVal = array[0];', indent: 0 },
      { text: 'int maxIdx = 0;', indent: 0 },
      { text: 'for (int i = 1; i < array.length; i++) {', indent: 0 },
      { text: '    if (array[i] > maxVal) {', indent: 1 },
      { text: '        maxVal = array[i];', indent: 2 },
      { text: '        maxIdx = i;', indent: 2 },
      { text: '    }', indent: 1 },
      { text: '}', indent: 0 }
    ],
    rust: [
      { text: 'let mut max_val = array[0];', indent: 0 },
      { text: 'let mut max_idx = 0;', indent: 0 },
      { text: 'for i in 1..array.len() {', indent: 0 },
      { text: '    if array[i] > max_val {', indent: 1 },
      { text: '        max_val = array[i];', indent: 2 },
      { text: '        max_idx = i;', indent: 2 },
      { text: '    }', indent: 1 },
      { text: '}', indent: 0 }
    ],
    go: [
      { text: 'maxVal := array[0]', indent: 0 },
      { text: 'maxIdx := 0', indent: 0 },
      { text: 'for i := 1; i < len(array); i++ {', indent: 0 },
      { text: '    if array[i] > maxVal {', indent: 1 },
      { text: '        maxVal = array[i]', indent: 2 },
      { text: '        maxIdx = i', indent: 2 },
      { text: '    }', indent: 1 },
      { text: '}', indent: 0 }
    ]
  },
  'find-smallest': {
    javascript: [
      { text: 'let minVal = array[0];', indent: 0 },
      { text: 'let minIdx = 0;', indent: 0 },
      { text: 'for (let i = 1; i < array.length; i++) {', indent: 0 },
      { text: '  if (array[i] < minVal) {', indent: 1 },
      { text: '    minVal = array[i];', indent: 2 },
      { text: '    minIdx = i;', indent: 2 },
      { text: '  }', indent: 1 },
      { text: '}', indent: 0 }
    ],
    typescript: [
      { text: 'let minVal: number = array[0];', indent: 0 },
      { text: 'let minIdx: number = 0;', indent: 0 },
      { text: 'for (let i = 1; i < array.length; i++) {', indent: 0 },
      { text: '  if (array[i] < minVal) {', indent: 1 },
      { text: '    minVal = array[i];', indent: 2 },
      { text: '    minIdx = i;', indent: 2 },
      { text: '  }', indent: 1 },
      { text: '}', indent: 0 }
    ],
    python: [
      { text: 'min_val = array[0]', indent: 0 },
      { text: 'min_idx = 0', indent: 0 },
      { text: 'for i in range(1, len(array)):', indent: 0 },
      { text: '    if array[i] < min_val:', indent: 1 },
      { text: '        min_val = array[i]', indent: 2 },
      { text: '        min_idx = i', indent: 2 },
      { text: '    # end if', indent: 1 },
      { text: '# end for', indent: 0 }
    ],
    c: [
      { text: 'int min_val = array[0];', indent: 0 },
      { text: 'int min_idx = 0;', indent: 0 },
      { text: 'for (int i = 1; i < size; i++) {', indent: 0 },
      { text: '    if (array[i] < min_val) {', indent: 1 },
      { text: '        min_val = array[i];', indent: 2 },
      { text: '        min_idx = i;', indent: 2 },
      { text: '    }', indent: 1 },
      { text: '}', indent: 0 }
    ],
    cpp: [
      { text: 'int min_val = array[0];', indent: 0 },
      { text: 'int min_idx = 0;', indent: 0 },
      { text: 'for (int i = 1; i < array.size(); i++) {', indent: 0 },
      { text: '    if (array[i] < min_val) {', indent: 1 },
      { text: '        min_val = array[i];', indent: 2 },
      { text: '        min_idx = i;', indent: 2 },
      { text: '    }', indent: 1 },
      { text: '}', indent: 0 }
    ],
    java: [
      { text: 'int minVal = array[0];', indent: 0 },
      { text: 'int minIdx = 0;', indent: 0 },
      { text: 'for (int i = 1; i < array.length; i++) {', indent: 0 },
      { text: '    if (array[i] < minVal) {', indent: 1 },
      { text: '        minVal = array[i];', indent: 2 },
      { text: '        minIdx = i;', indent: 2 },
      { text: '    }', indent: 1 },
      { text: '}', indent: 0 }
    ],
    rust: [
      { text: 'let mut min_val = array[0];', indent: 0 },
      { text: 'let mut min_idx = 0;', indent: 0 },
      { text: 'for i in 1..array.len() {', indent: 0 },
      { text: '    if array[i] < min_val {', indent: 1 },
      { text: '        min_val = array[i];', indent: 2 },
      { text: '        min_idx = i;', indent: 2 },
      { text: '    }', indent: 1 },
      { text: '}', indent: 0 }
    ],
    go: [
      { text: 'minVal := array[0]', indent: 0 },
      { text: 'minIdx := 0', indent: 0 },
      { text: 'for i := 1; i < len(array); i++ {', indent: 0 },
      { text: '    if array[i] < minVal {', indent: 1 },
      { text: '        minVal = array[i]', indent: 2 },
      { text: '        minIdx = i', indent: 2 },
      { text: '    }', indent: 1 },
      { text: '}', indent: 0 }
    ]
  },
  'reverse': {
    javascript: [
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
    typescript: [
      { text: 'let left: number = 0;', indent: 0 },
      { text: 'let right: number = array.length - 1;', indent: 0 },
      { text: 'while (left < right) {', indent: 0 },
      { text: '  let temp: number = array[left];', indent: 1 },
      { text: '  array[left] = array[right];', indent: 1 },
      { text: '  array[right] = temp;', indent: 1 },
      { text: '  left++;', indent: 1 },
      { text: '  right--;', indent: 1 },
      { text: '}', indent: 0 }
    ],
    python: [
      { text: 'left = 0', indent: 0 },
      { text: 'right = len(array) - 1', indent: 0 },
      { text: 'while left < right:', indent: 0 },
      { text: '    temp = array[left]', indent: 1 },
      { text: '    array[left] = array[right]', indent: 1 },
      { text: '    array[right] = temp', indent: 1 },
      { text: '    left += 1', indent: 1 },
      { text: '    right -= 1', indent: 1 },
      { text: '# end while', indent: 0 }
    ],
    c: [
      { text: 'int left = 0;', indent: 0 },
      { text: 'int right = size - 1;', indent: 0 },
      { text: 'while (left < right) {', indent: 0 },
      { text: '    int temp = array[left];', indent: 1 },
      { text: '    array[left] = array[right];', indent: 1 },
      { text: '    array[right] = temp;', indent: 1 },
      { text: '    left++;', indent: 1 },
      { text: '    right--;', indent: 1 },
      { text: '}', indent: 0 }
    ],
    cpp: [
      { text: 'int left = 0;', indent: 0 },
      { text: 'int right = array.size() - 1;', indent: 0 },
      { text: 'while (left < right) {', indent: 0 },
      { text: '    int temp = array[left];', indent: 1 },
      { text: '    array[left] = array[right];', indent: 1 },
      { text: '    array[right] = temp;', indent: 1 },
      { text: '    left++;', indent: 1 },
      { text: '    right--;', indent: 1 },
      { text: '}', indent: 0 }
    ],
    java: [
      { text: 'int left = 0;', indent: 0 },
      { text: 'int right = array.length - 1;', indent: 0 },
      { text: 'while (left < right) {', indent: 0 },
      { text: '    int temp = array[left];', indent: 1 },
      { text: '    array[left] = array[right];', indent: 1 },
      { text: '    array[right] = temp;', indent: 1 },
      { text: '    left++;', indent: 1 },
      { text: '    right--;', indent: 1 },
      { text: '}', indent: 0 }
    ],
    rust: [
      { text: 'let mut left = 0;', indent: 0 },
      { text: 'let mut right = array.len() - 1;', indent: 0 },
      { text: 'while left < right {', indent: 0 },
      { text: '    let temp = array[left];', indent: 1 },
      { text: '    array[left] = array[right];', indent: 1 },
      { text: '    array[right] = temp;', indent: 1 },
      { text: '    left += 1;', indent: 1 },
      { text: '    right -= 1;', indent: 1 },
      { text: '}', indent: 0 }
    ],
    go: [
      { text: 'left := 0', indent: 0 },
      { text: 'right := len(array) - 1', indent: 0 },
      { text: 'for left < right {', indent: 0 },
      { text: '    temp := array[left]', indent: 1 },
      { text: '    array[left] = array[right]', indent: 1 },
      { text: '    array[right] = temp', indent: 1 },
      { text: '    left++', indent: 1 },
      { text: '    right--', indent: 1 },
      { text: '}', indent: 0 }
    ]
  },
  'linear-search': {
    javascript: [
      { text: 'let target = X;', indent: 0 },
      { text: 'for (let i = 0; i < array.length; i++) {', indent: 0 },
      { text: '  if (array[i] === target) {', indent: 1 },
      { text: '    return i; // Found!', indent: 2 },
      { text: '  }', indent: 1 },
      { text: '}', indent: 0 },
      { text: 'return -1; // Not found', indent: 0 }
    ],
    typescript: [
      { text: 'let target: number = X;', indent: 0 },
      { text: 'for (let i = 0; i < array.length; i++) {', indent: 0 },
      { text: '  if (array[i] === target) {', indent: 1 },
      { text: '    return i; // Found!', indent: 2 },
      { text: '  }', indent: 1 },
      { text: '}', indent: 0 },
      { text: 'return -1; // Not found', indent: 0 }
    ],
    python: [
      { text: 'target = X', indent: 0 },
      { text: 'for i in range(len(array)):', indent: 0 },
      { text: '    if array[i] == target:', indent: 1 },
      { text: '        return i', indent: 2 },
      { text: '    # end if', indent: 1 },
      { text: '# end for', indent: 0 },
      { text: 'return -1', indent: 0 }
    ],
    c: [
      { text: 'int target = X;', indent: 0 },
      { text: 'for (int i = 0; i < size; i++) {', indent: 0 },
      { text: '    if (array[i] == target) {', indent: 1 },
      { text: '        return i; // Found!', indent: 2 },
      { text: '    }', indent: 1 },
      { text: '}', indent: 0 },
      { text: 'return -1; // Not found', indent: 0 }
    ],
    cpp: [
      { text: 'int target = X;', indent: 0 },
      { text: 'for (int i = 0; i < array.size(); i++) {', indent: 0 },
      { text: '    if (array[i] == target) {', indent: 1 },
      { text: '        return i; // Found!', indent: 2 },
      { text: '    }', indent: 1 },
      { text: '}', indent: 0 },
      { text: 'return -1; // Not found', indent: 0 }
    ],
    java: [
      { text: 'int target = X;', indent: 0 },
      { text: 'for (int i = 0; i < array.length; i++) {', indent: 0 },
      { text: '    if (array[i] == target) {', indent: 1 },
      { text: '        return i; // Found!', indent: 2 },
      { text: '    }', indent: 1 },
      { text: '}', indent: 0 },
      { text: 'return -1; // Not found', indent: 0 }
    ],
    rust: [
      { text: 'let target = X;', indent: 0 },
      { text: 'for i in 0..array.len() {', indent: 0 },
      { text: '    if array[i] == target {', indent: 1 },
      { text: '        return i as i32; // Found!', indent: 2 },
      { text: '    }', indent: 1 },
      { text: '}', indent: 0 },
      { text: 'return -1; // Not found', indent: 0 }
    ],
    go: [
      { text: 'target := X', indent: 0 },
      { text: 'for i := 0; i < len(array); i++ {', indent: 0 },
      { text: '    if array[i] == target {', indent: 1 },
      { text: '        return i // Found!', indent: 2 },
      { text: '    }', indent: 1 },
      { text: '}', indent: 0 },
      { text: 'return -1 // Not found', indent: 0 }
    ]
  },
  'traversal': {
    javascript: [
      { text: 'let sum = 0;', indent: 0 },
      { text: 'for (let i = 0; i < array.length; i++) {', indent: 0 },
      { text: '  sum += array[i];', indent: 1 },
      { text: '}', indent: 0 }
    ],
    typescript: [
      { text: 'let sum: number = 0;', indent: 0 },
      { text: 'for (let i = 0; i < array.length; i++) {', indent: 0 },
      { text: '  sum += array[i];', indent: 1 },
      { text: '}', indent: 0 }
    ],
    python: [
      { text: 'total_sum = 0', indent: 0 },
      { text: 'for i in range(len(array)):', indent: 0 },
      { text: '    total_sum += array[i]', indent: 1 },
      { text: '# end for', indent: 0 }
    ],
    c: [
      { text: 'int sum = 0;', indent: 0 },
      { text: 'for (int i = 0; i < size; i++) {', indent: 0 },
      { text: '    sum += array[i];', indent: 1 },
      { text: '}', indent: 0 }
    ],
    cpp: [
      { text: 'int sum = 0;', indent: 0 },
      { text: 'for (int i = 0; i < array.size(); i++) {', indent: 0 },
      { text: '    sum += array[i];', indent: 1 },
      { text: '}', indent: 0 }
    ],
    java: [
      { text: 'int sum = 0;', indent: 0 },
      { text: 'for (int i = 0; i < array.length; i++) {', indent: 0 },
      { text: '    sum += array[i];', indent: 1 },
      { text: '}', indent: 0 }
    ],
    rust: [
      { text: 'let mut sum = 0;', indent: 0 },
      { text: 'for i in 0..array.len() {', indent: 0 },
      { text: '    sum += array[i];', indent: 1 },
      { text: '}', indent: 0 }
    ],
    go: [
      { text: 'sum := 0', indent: 0 },
      { text: 'for i := 0; i < len(array); i++ {', indent: 0 },
      { text: '    sum += array[i]', indent: 1 },
      { text: '}', indent: 0 }
    ]
  },
  'insertion': {
    javascript: [
      { text: 'let value = X;', indent: 0 },
      { text: 'let insertIdx = index;', indent: 0 },
      { text: 'for (let k = array.length - 1; k > insertIdx; k--) {', indent: 0 },
      { text: '  array[k] = array[k - 1];', indent: 1 },
      { text: '}', indent: 0 },
      { text: 'array[insertIdx] = value;', indent: 0 }
    ],
    typescript: [
      { text: 'let value: number = X;', indent: 0 },
      { text: 'let insertIdx: number = index;', indent: 0 },
      { text: 'for (let k = array.length - 1; k > insertIdx; k--) {', indent: 0 },
      { text: '  array[k] = array[k - 1];', indent: 1 },
      { text: '}', indent: 0 },
      { text: 'array[insertIdx] = value;', indent: 0 }
    ],
    python: [
      { text: 'value = X', indent: 0 },
      { text: 'insert_idx = index', indent: 0 },
      { text: 'for k in range(len(array) - 1, insert_idx, -1):', indent: 0 },
      { text: '    array[k] = array[k - 1]', indent: 1 },
      { text: '# end for', indent: 0 },
      { text: 'array[insert_idx] = value', indent: 0 }
    ],
    c: [
      { text: 'int value = X;', indent: 0 },
      { text: 'int insert_idx = index;', indent: 0 },
      { text: 'for (int k = size - 1; k > insert_idx; k--) {', indent: 0 },
      { text: '    array[k] = array[k - 1];', indent: 1 },
      { text: '}', indent: 0 },
      { text: 'array[insert_idx] = value;', indent: 0 }
    ],
    cpp: [
      { text: 'int value = X;', indent: 0 },
      { text: 'int insert_idx = index;', indent: 0 },
      { text: 'for (int k = array.size() - 1; k > insert_idx; k--) {', indent: 0 },
      { text: '    array[k] = array[k - 1];', indent: 1 },
      { text: '}', indent: 0 },
      { text: 'array[insert_idx] = value;', indent: 0 }
    ],
    java: [
      { text: 'int value = X;', indent: 0 },
      { text: 'int insertIdx = index;', indent: 0 },
      { text: 'for (int k = array.length - 1; k > insertIdx; k--) {', indent: 0 },
      { text: '    array[k] = array[k - 1];', indent: 1 },
      { text: '}', indent: 0 },
      { text: 'array[insertIdx] = value;', indent: 0 }
    ],
    rust: [
      { text: 'let value = X;', indent: 0 },
      { text: 'let insert_idx = index;', indent: 0 },
      { text: 'for k in (insert_idx + 1..array.len()).rev() {', indent: 0 },
      { text: '    array[k] = array[k - 1];', indent: 1 },
      { text: '}', indent: 0 },
      { text: 'array[insert_idx] = value;', indent: 0 }
    ],
    go: [
      { text: 'value := X', indent: 0 },
      { text: 'insertIdx := index', indent: 0 },
      { text: 'for k := len(array) - 1; k > insertIdx; k-- {', indent: 0 },
      { text: '    array[k] = array[k - 1]', indent: 1 },
      { text: '}', indent: 0 },
      { text: 'array[insertIdx] = value', indent: 0 }
    ]
  },
  'deletion': {
    javascript: [
      { text: 'let deleteIdx = index;', indent: 0 },
      { text: 'for (let k = deleteIdx; k < array.length - 1; k++) {', indent: 0 },
      { text: '  array[k] = array[k + 1];', indent: 1 },
      { text: '}', indent: 0 },
      { text: 'array.pop(); // Remove last element', indent: 0 }
    ],
    typescript: [
      { text: 'let deleteIdx: number = index;', indent: 0 },
      { text: 'for (let k = deleteIdx; k < array.length - 1; k++) {', indent: 0 },
      { text: '  array[k] = array[k + 1];', indent: 1 },
      { text: '}', indent: 0 },
      { text: 'array.pop(); // Remove last element', indent: 0 }
    ],
    python: [
      { text: 'delete_idx = index', indent: 0 },
      { text: 'for k in range(delete_idx, len(array) - 1):', indent: 0 },
      { text: '    array[k] = array[k + 1]', indent: 1 },
      { text: '# end for', indent: 0 },
      { text: 'array.pop()', indent: 0 }
    ],
    c: [
      { text: 'int delete_idx = index;', indent: 0 },
      { text: 'for (int k = delete_idx; k < size - 1; k++) {', indent: 0 },
      { text: '    array[k] = array[k + 1];', indent: 1 },
      { text: '}', indent: 0 },
      { text: 'size--; // Shrink array size', indent: 0 }
    ],
    cpp: [
      { text: 'int delete_idx = index;', indent: 0 },
      { text: 'for (int k = delete_idx; k < array.size() - 1; k++) {', indent: 0 },
      { text: '    array[k] = array[k + 1];', indent: 1 },
      { text: '}', indent: 0 },
      { text: 'array.pop_back();', indent: 0 }
    ],
    java: [
      { text: 'int deleteIdx = index;', indent: 0 },
      { text: 'for (int k = deleteIdx; k < array.length - 1; k++) {', indent: 0 },
      { text: '    array[k] = array[k + 1];', indent: 1 },
      { text: '}', indent: 0 },
      { text: 'array = removeLast(array);', indent: 0 }
    ],
    rust: [
      { text: 'let delete_idx = index;', indent: 0 },
      { text: 'for k in delete_idx..array.len() - 1 {', indent: 0 },
      { text: '    array[k] = array[k + 1];', indent: 1 },
      { text: '}', indent: 0 },
      { text: 'array.pop();', indent: 0 }
    ],
    go: [
      { text: 'deleteIdx := index', indent: 0 },
      { text: 'for k := deleteIdx; k < len(array) - 1; k++ {', indent: 0 },
      { text: '    array[k] = array[k + 1]', indent: 1 },
      { text: '}', indent: 0 },
      { text: 'array = array[:len(array) - 1]', indent: 0 }
    ]
  },
  'bubble-sort': {
    javascript: [
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
    typescript: [
      { text: 'for (let i: number = 0; i < array.length; i++) {', indent: 0 },
      { text: '  for (let j: number = 0; j < array.length - i - 1; j++) {', indent: 1 },
      { text: '    if (array[j] > array[j + 1]) {', indent: 2 },
      { text: '      let temp: number = array[j];', indent: 3 },
      { text: '      array[j] = array[j + 1];', indent: 3 },
      { text: '      array[j + 1] = temp;', indent: 3 },
      { text: '    }', indent: 2 },
      { text: '  }', indent: 1 },
      { text: '}', indent: 0 }
    ],
    python: [
      { text: 'for i in range(len(array)):', indent: 0 },
      { text: '    for j in range(len(array) - i - 1):', indent: 1 },
      { text: '        if array[j] > array[j + 1]:', indent: 2 },
      { text: '            temp = array[j]', indent: 3 },
      { text: '            array[j] = array[j + 1]', indent: 3 },
      { text: '            array[j + 1] = temp', indent: 3 },
      { text: '        # end if', indent: 2 },
      { text: '    # end for j', indent: 1 },
      { text: '# end for i', indent: 0 }
    ],
    c: [
      { text: 'for (int i = 0; i < size; i++) {', indent: 0 },
      { text: '    for (int j = 0; j < size - i - 1; j++) {', indent: 1 },
      { text: '        if (array[j] > array[j + 1]) {', indent: 2 },
      { text: '            int temp = array[j];', indent: 3 },
      { text: '            array[j] = array[j + 1];', indent: 3 },
      { text: '            array[j + 1] = temp;', indent: 3 },
      { text: '        }', indent: 2 },
      { text: '    }', indent: 1 },
      { text: '}', indent: 0 }
    ],
    cpp: [
      { text: 'for (int i = 0; i < array.size(); i++) {', indent: 0 },
      { text: '    for (int j = 0; j < array.size() - i - 1; j++) {', indent: 1 },
      { text: '        if (array[j] > array[j + 1]) {', indent: 2 },
      { text: '            int temp = array[j];', indent: 3 },
      { text: '            array[j] = array[j + 1];', indent: 3 },
      { text: '            array[j + 1] = temp;', indent: 3 },
      { text: '        }', indent: 2 },
      { text: '    }', indent: 1 },
      { text: '}', indent: 0 }
    ],
    java: [
      { text: 'for (int i = 0; i < array.length; i++) {', indent: 0 },
      { text: '    for (int j = 0; j < array.length - i - 1; j++) {', indent: 1 },
      { text: '        if (array[j] > array[j + 1]) {', indent: 2 },
      { text: '            int temp = array[j];', indent: 3 },
      { text: '            array[j] = array[j + 1];', indent: 3 },
      { text: '            array[j + 1] = temp;', indent: 3 },
      { text: '        }', indent: 2 },
      { text: '    }', indent: 1 },
      { text: '}', indent: 0 }
    ],
    rust: [
      { text: 'for i in 0..array.len() {', indent: 0 },
      { text: '    for j in 0..array.len() - i - 1 {', indent: 1 },
      { text: '        if array[j] > array[j + 1] {', indent: 2 },
      { text: '            let temp = array[j];', indent: 3 },
      { text: '            array[j] = array[j + 1];', indent: 3 },
      { text: '            array[j + 1] = temp;', indent: 3 },
      { text: '        }', indent: 2 },
      { text: '    }', indent: 1 },
      { text: '}', indent: 0 }
    ],
    go: [
      { text: 'for i := 0; i < len(array); i++ {', indent: 0 },
      { text: '    for j := 0; j < len(array) - i - 1; j++ {', indent: 1 },
      { text: '        if array[j] > array[j + 1] {', indent: 2 },
      { text: '            temp := array[j]', indent: 3 },
      { text: '            array[j] = array[j + 1]', indent: 3 },
      { text: '            array[j + 1] = temp', indent: 3 },
      { text: '        }', indent: 2 },
      { text: '    }', indent: 1 },
      { text: '}', indent: 0 }
    ]
  },
  'two-sum': {
    javascript: [
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
    typescript: [
      { text: 'let targetSum: number = K;', indent: 0 },
      { text: 'for (let i: number = 0; i < array.length; i++) {', indent: 0 },
      { text: '  for (let j: number = i + 1; j < array.length; j++) {', indent: 1 },
      { text: '    if (array[i] + array[j] === targetSum) {', indent: 2 },
      { text: '      return [i, j]; // Pair found!', indent: 3 },
      { text: '    }', indent: 2 },
      { text: '  }', indent: 1 },
      { text: '}', indent: 0 },
      { text: 'return null; // No pair', indent: 0 }
    ],
    python: [
      { text: 'target_sum = K', indent: 0 },
      { text: 'for i in range(len(array)):', indent: 0 },
      { text: '    for j in range(i + 1, len(array)):', indent: 1 },
      { text: '        if array[i] + array[j] == target_sum:', indent: 2 },
      { text: '            return [i, j]', indent: 3 },
      { text: '        # end if', indent: 2 },
      { text: '    # end for j', indent: 1 },
      { text: '# end for i', indent: 0 },
      { text: 'return None', indent: 0 }
    ],
    c: [
      { text: 'int target_sum = K;', indent: 0 },
      { text: 'for (int i = 0; i < size; i++) {', indent: 0 },
      { text: '    for (int j = i + 1; j < size; j++) {', indent: 1 },
      { text: '        if (array[i] + array[j] == target_sum) {', indent: 2 },
      { text: '            return_indices(i, j);', indent: 3 },
      { text: '        }', indent: 2 },
      { text: '    }', indent: 1 },
      { text: '}', indent: 0 },
      { text: 'return_not_found();', indent: 0 }
    ],
    cpp: [
      { text: 'int target_sum = K;', indent: 0 },
      { text: 'for (int i = 0; i < array.size(); i++) {', indent: 0 },
      { text: '    for (int j = i + 1; j < array.size(); j++) {', indent: 1 },
      { text: '        if (array[i] + array[j] == target_sum) {', indent: 2 },
      { text: '            return {i, j};', indent: 3 },
      { text: '        }', indent: 2 },
      { text: '    }', indent: 1 },
      { text: '}', indent: 0 },
      { text: 'return {-1, -1};', indent: 0 }
    ],
    java: [
      { text: 'int targetSum = K;', indent: 0 },
      { text: 'for (int i = 0; i < array.length; i++) {', indent: 0 },
      { text: '    for (int j = i + 1; j < array.length; j++) {', indent: 1 },
      { text: '        if (array[i] + array[j] == targetSum) {', indent: 2 },
      { text: '            return new int[]{i, j};', indent: 3 },
      { text: '        }', indent: 2 },
      { text: '    }', indent: 1 },
      { text: '}', indent: 0 },
      { text: 'return null;', indent: 0 }
    ],
    rust: [
      { text: 'let target_sum = K;', indent: 0 },
      { text: 'for i in 0..array.len() {', indent: 0 },
      { text: '    for j in (i + 1)..array.len() {', indent: 1 },
      { text: '        if array[i] + array[j] == target_sum {', indent: 2 },
      { text: '            return Some((i, j));', indent: 3 },
      { text: '        }', indent: 2 },
      { text: '    }', indent: 1 },
      { text: '}', indent: 0 },
      { text: 'None', indent: 0 }
    ],
    go: [
      { text: 'targetSum := K', indent: 0 },
      { text: 'for i := 0; i < len(array); i++ {', indent: 0 },
      { text: '    for j := i + 1; j < len(array); j++ {', indent: 1 },
      { text: '        if array[i] + array[j] == targetSum {', indent: 2 },
      { text: '            return []int{i, j}', indent: 3 },
      { text: '        }', indent: 2 },
      { text: '    }', indent: 1 },
      { text: '}', indent: 0 },
      { text: 'return nil', indent: 0 }
    ]
  },
  'selection-sort': {
    javascript: [
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
    typescript: [
      { text: 'for (let i: number = 0; i < array.length - 1; i++) {', indent: 0 },
      { text: '  let minIdx: number = i;', indent: 1 },
      { text: '  for (let j: number = i + 1; j < array.length; j++) {', indent: 1 },
      { text: '    if (array[j] < array[minIdx]) {', indent: 2 },
      { text: '      minIdx = j;', indent: 3 },
      { text: '    }', indent: 2 },
      { text: '  }', indent: 1 },
      { text: '  if (minIdx !== i) {', indent: 1 },
      { text: '    let temp: number = array[i];', indent: 2 },
      { text: '    array[i] = array[minIdx];', indent: 2 },
      { text: '    array[minIdx] = temp;', indent: 2 },
      { text: '  }', indent: 1 },
      { text: '}', indent: 0 }
    ],
    python: [
      { text: 'for i in range(len(array) - 1):', indent: 0 },
      { text: '    min_idx = i', indent: 1 },
      { text: '    for j in range(i + 1, len(array)):', indent: 1 },
      { text: '        if array[j] < array[min_idx]:', indent: 2 },
      { text: '            min_idx = j', indent: 3 },
      { text: '        # end if', indent: 2 },
      { text: '    # end for j', indent: 1 },
      { text: '    if min_idx != i:', indent: 1 },
      { text: '        temp = array[i]', indent: 2 },
      { text: '        array[i] = array[min_idx]', indent: 2 },
      { text: '        array[min_idx] = temp', indent: 2 },
      { text: '    # end if', indent: 1 },
      { text: '# end for i', indent: 0 }
    ],
    c: [
      { text: 'for (int i = 0; i < size - 1; i++) {', indent: 0 },
      { text: '    int min_idx = i;', indent: 1 },
      { text: '    for (int j = i + 1; j < size; j++) {', indent: 1 },
      { text: '        if (array[j] < array[min_idx]) {', indent: 2 },
      { text: '            min_idx = j;', indent: 3 },
      { text: '        }', indent: 2 },
      { text: '    }', indent: 1 },
      { text: '    if (min_idx != i) {', indent: 1 },
      { text: '        int temp = array[i];', indent: 2 },
      { text: '        array[i] = array[min_idx];', indent: 2 },
      { text: '        array[min_idx] = temp;', indent: 2 },
      { text: '    }', indent: 1 },
      { text: '}', indent: 0 }
    ],
    cpp: [
      { text: 'for (int i = 0; i < array.size() - 1; i++) {', indent: 0 },
      { text: '    int min_idx = i;', indent: 1 },
      { text: '    for (int j = i + 1; j < array.size(); j++) {', indent: 1 },
      { text: '        if (array[j] < array[min_idx]) {', indent: 2 },
      { text: '            min_idx = j;', indent: 3 },
      { text: '        }', indent: 2 },
      { text: '    }', indent: 1 },
      { text: '    if (min_idx != i) {', indent: 1 },
      { text: '        int temp = array[i];', indent: 2 },
      { text: '        array[i] = array[min_idx];', indent: 2 },
      { text: '        array[min_idx] = temp;', indent: 2 },
      { text: '    }', indent: 1 },
      { text: '}', indent: 0 }
    ],
    java: [
      { text: 'for (int i = 0; i < array.length - 1; i++) {', indent: 0 },
      { text: '    int minIdx = i;', indent: 1 },
      { text: '    for (int j = i + 1; j < array.length; j++) {', indent: 1 },
      { text: '        if (array[j] < array[minIdx]) {', indent: 2 },
      { text: '            minIdx = j;', indent: 3 },
      { text: '        }', indent: 2 },
      { text: '    }', indent: 1 },
      { text: '    if (minIdx != i) {', indent: 1 },
      { text: '        int temp = array[i];', indent: 2 },
      { text: '        array[i] = array[minIdx];', indent: 2 },
      { text: '        array[minIdx] = temp;', indent: 2 },
      { text: '    }', indent: 1 },
      { text: '}', indent: 0 }
    ],
    rust: [
      { text: 'for i in 0..array.len() - 1 {', indent: 0 },
      { text: '    let mut min_idx = i;', indent: 1 },
      { text: '    for j in (i + 1)..array.len() {', indent: 1 },
      { text: '        if array[j] < array[min_idx] {', indent: 2 },
      { text: '            min_idx = j;', indent: 3 },
      { text: '        }', indent: 2 },
      { text: '    }', indent: 1 },
      { text: '    if min_idx != i {', indent: 1 },
      { text: '        let temp = array[i];', indent: 2 },
      { text: '        array[i] = array[min_idx];', indent: 2 },
      { text: '        array[min_idx] = temp;', indent: 2 },
      { text: '    }', indent: 1 },
      { text: '}', indent: 0 }
    ],
    go: [
      { text: 'for i := 0; i < len(array) - 1; i++ {', indent: 0 },
      { text: '    minIdx := i', indent: 1 },
      { text: '    for j := i + 1; j < len(array); j++ {', indent: 1 },
      { text: '        if array[j] < array[minIdx] {', indent: 2 },
      { text: '            minIdx = j', indent: 3 },
      { text: '        }', indent: 2 },
      { text: '    }', indent: 1 },
      { text: '    if minIdx != i {', indent: 1 },
      { text: '        temp := array[i]', indent: 2 },
      { text: '        array[i] = array[minIdx]', indent: 2 },
      { text: '        array[minIdx] = temp', indent: 2 },
      { text: '    }', indent: 1 },
      { text: '}', indent: 0 }
    ]
  },
  'second-largest': {
    javascript: [
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
    typescript: [
      { text: 'let first: number = -Infinity;', indent: 0 },
      { text: 'let second: number = -Infinity;', indent: 0 },
      { text: 'for (let i: number = 0; i < array.length; i++) {', indent: 0 },
      { text: '  if (array[i] > first) {', indent: 1 },
      { text: '    second = first;', indent: 2 },
      { text: '    first = array[i];', indent: 2 },
      { text: '  } else if (array[i] > second && array[i] !== first) {', indent: 1 },
      { text: '    second = array[i];', indent: 2 },
      { text: '  }', indent: 1 },
      { text: '}', indent: 0 }
    ],
    python: [
      { text: 'first = float("-inf")', indent: 0 },
      { text: 'second = float("-inf")', indent: 0 },
      { text: 'for i in range(len(array)):', indent: 0 },
      { text: '    if array[i] > first:', indent: 1 },
      { text: '        second = first', indent: 2 },
      { text: '        first = array[i]', indent: 2 },
      { text: '    elif array[i] > second and array[i] != first:', indent: 1 },
      { text: '        second = array[i]', indent: 2 },
      { text: '    # end if', indent: 1 },
      { text: '# end for', indent: 0 }
    ],
    c: [
      { text: 'int first = -2147483648;', indent: 0 },
      { text: 'int second = -2147483648;', indent: 0 },
      { text: 'for (int i = 0; i < size; i++) {', indent: 0 },
      { text: '    if (array[i] > first) {', indent: 1 },
      { text: '        second = first;', indent: 2 },
      { text: '        first = array[i];', indent: 2 },
      { text: '    } else if (array[i] > second && array[i] != first) {', indent: 1 },
      { text: '        second = array[i];', indent: 2 },
      { text: '    }', indent: 1 },
      { text: '}', indent: 0 }
    ],
    cpp: [
      { text: 'int first = INT_MIN;', indent: 0 },
      { text: 'int second = INT_MIN;', indent: 0 },
      { text: 'for (int i = 0; i < array.size(); i++) {', indent: 0 },
      { text: '    if (array[i] > first) {', indent: 1 },
      { text: '        second = first;', indent: 2 },
      { text: '        first = array[i];', indent: 2 },
      { text: '    } else if (array[i] > second && array[i] != first) {', indent: 1 },
      { text: '        second = array[i];', indent: 2 },
      { text: '    }', indent: 1 },
      { text: '}', indent: 0 }
    ],
    java: [
      { text: 'int first = Integer.MIN_VALUE;', indent: 0 },
      { text: 'int second = Integer.MIN_VALUE;', indent: 0 },
      { text: 'for (int i = 0; i < array.length; i++) {', indent: 0 },
      { text: '    if (array[i] > first) {', indent: 1 },
      { text: '        second = first;', indent: 2 },
      { text: '        first = array[i];', indent: 2 },
      { text: '    } else if (array[i] > second && array[i] != first) {', indent: 1 },
      { text: '        second = array[i];', indent: 2 },
      { text: '    }', indent: 1 },
      { text: '}', indent: 0 }
    ],
    rust: [
      { text: 'let mut first = i32::MIN;', indent: 0 },
      { text: 'let mut second = i32::MIN;', indent: 0 },
      { text: 'for i in 0..array.len() {', indent: 0 },
      { text: '    if array[i] > first {', indent: 1 },
      { text: '        second = first;', indent: 2 },
      { text: '        first = array[i];', indent: 2 },
      { text: '    } else if array[i] > second && array[i] != first {', indent: 1 },
      { text: '        second = array[i];', indent: 2 },
      { text: '    }', indent: 1 },
      { text: '}', indent: 0 }
    ],
    go: [
      { text: 'first := -2147483648', indent: 0 },
      { text: 'second := -2147483648', indent: 0 },
      { text: 'for i := 0; i < len(array); i++ {', indent: 0 },
      { text: '    if array[i] > first {', indent: 1 },
      { text: '        second = first', indent: 2 },
      { text: '        first = array[i]', indent: 2 },
      { text: '    } else if array[i] > second && array[i] != first {', indent: 1 },
      { text: '        second = array[i]', indent: 2 },
      { text: '    }', indent: 1 },
      { text: '}', indent: 0 }
    ]
  },
  'array-copy': {
    javascript: [
      { text: 'let copy = [];', indent: 0 },
      { text: 'for (let i = 0; i < array.length; i++) {', indent: 0 },
      { text: '  copy[i] = array[i];', indent: 1 },
      { text: '}', indent: 0 }
    ],
    typescript: [
      { text: 'let copy: number[] = [];', indent: 0 },
      { text: 'for (let i: number = 0; i < array.length; i++) {', indent: 0 },
      { text: '  copy[i] = array[i];', indent: 1 },
      { text: '}', indent: 0 }
    ],
    python: [
      { text: 'copy = []', indent: 0 },
      { text: 'for i in range(len(array)):', indent: 0 },
      { text: '    copy.append(array[i])', indent: 1 },
      { text: '# end for', indent: 0 }
    ],
    c: [
      { text: 'int copy[100];', indent: 0 },
      { text: 'for (int i = 0; i < size; i++) {', indent: 0 },
      { text: '    copy[i] = array[i];', indent: 1 },
      { text: '}', indent: 0 }
    ],
    cpp: [
      { text: 'std::vector<int> copy(array.size());', indent: 0 },
      { text: 'for (int i = 0; i < array.size(); i++) {', indent: 0 },
      { text: '    copy[i] = array[i];', indent: 1 },
      { text: '}', indent: 0 }
    ],
    java: [
      { text: 'int[] copy = new int[array.length];', indent: 0 },
      { text: 'for (int i = 0; i < array.length; i++) {', indent: 0 },
      { text: '    copy[i] = array[i];', indent: 1 },
      { text: '}', indent: 0 }
    ],
    rust: [
      { text: 'let mut copy = vec![0; array.len()];', indent: 0 },
      { text: 'for i in 0..array.len() {', indent: 1 },
      { text: '    copy[i] = array[i];', indent: 1 },
      { text: '}', indent: 0 }
    ],
    go: [
      { text: 'copy := make([]int, len(array))', indent: 0 },
      { text: 'for i := 0; i < len(array); i++ {', indent: 0 },
      { text: '    copy[i] = array[i]', indent: 1 },
      { text: '}', indent: 0 }
    ]
  }
};
