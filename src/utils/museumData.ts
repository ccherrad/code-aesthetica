
export interface Exhibit {
  id: string;
  title: string;
  code: string;
  language: string;
  description: string;
  category: string;
  next?: string; // ID of the next exhibit in the workflow
  position?: { x: number; y: number }; // Position on the category map
}

export interface Category {
  id: string;
  name: string;
  description: string;
  position: { x: number; y: number };
  firstExhibitId?: string; // First exhibit in this category's workflow
}

// This would normally be fetched from a database
export const categories: Category[] = [
  {
    id: "elegant-functions",
    name: "Elegant Functions",
    description: "A collection of beautifully crafted functions",
    position: { x: 20, y: 30 },
    firstExhibitId: "foo-bar",
  },
  {
    id: "creative-algorithms",
    name: "Creative Algorithms",
    description: "Algorithms that showcase creative problem-solving",
    position: { x: 65, y: 20 },
    firstExhibitId: "fibonacci-one-liner",
  },
  {
    id: "historical-snippets",
    name: "Historical Snippets",
    description: "Code that changed the course of programming history",
    position: { x: 40, y: 70 },
    firstExhibitId: "hello-world",
  },
  {
    id: "minimal-wonders",
    name: "Minimal Wonders",
    description: "Achieving a lot with very little code",
    position: { x: 75, y: 60 },
    firstExhibitId: "life-in-a-line",
  },
];

export const exhibits: Exhibit[] = [
  {
    id: "foo-bar",
    title: "Foo Bar: A Brilliantly Useless Function",
    code: `def foo():
    return "bar"  # Pure genius`,
    language: "python",
    description: "This function does nothing, but in the most sophisticated way possible.",
    category: "elegant-functions",
    next: "map-filter-reduce",
    position: { x: 30, y: 40 },
  },
  {
    id: "map-filter-reduce",
    title: "The Functional Trio",
    code: `// Map: Double each number
const doubled = [1, 2, 3].map(x => x * 2);

// Filter: Keep only even numbers
const evens = [1, 2, 3, 4].filter(x => x % 2 === 0);

// Reduce: Sum all numbers
const sum = [1, 2, 3, 4].reduce((acc, x) => acc + x, 0);`,
    language: "javascript",
    description: "The three fundamental operations of functional programming.",
    category: "elegant-functions",
    position: { x: 60, y: 35 },
  },
  {
    id: "fibonacci-one-liner",
    title: "Fibonacci: The One-liner",
    code: `const fibonacci = n => n <= 1 ? n : fibonacci(n - 1) + fibonacci(n - 2);`,
    language: "javascript",
    description: "An elegant recursive implementation of the Fibonacci sequence.",
    category: "creative-algorithms",
    next: "quicksort",
    position: { x: 45, y: 25 },
  },
  {
    id: "quicksort",
    title: "Quicksort: The Elegant Sorting Algorithm",
    code: `quicksort = (arr) => {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[0];
  const left = arr.slice(1).filter(x => x < pivot);
  const right = arr.slice(1).filter(x => x >= pivot);
  
  return [...quicksort(left), pivot, ...quicksort(right)];
};`,
    language: "javascript",
    description: "A concise and elegant implementation of the quicksort algorithm.",
    category: "creative-algorithms",
    position: { x: 70, y: 35 },
  },
  {
    id: "hello-world",
    title: "The Original Hello World",
    code: `#include <stdio.h>

int main() {
    printf("hello, world\\n");
    return 0;
}`,
    language: "c",
    description: "The program that introduced generations of programmers to the craft.",
    category: "historical-snippets",
    position: { x: 30, y: 60 },
  },
  {
    id: "life-in-a-line",
    title: "Conway's Game of Life in One Line",
    code: `life=lambda b,s:set([(i+(i in b)*s.count(i)*(4-s.count(i))/3)%2 for i in s])`,
    language: "python",
    description: "Conway's Game of Life implemented in a single line of Python.",
    category: "minimal-wonders",
    position: { x: 65, y: 70 },
  },
];

export const getExhibitsByCategory = (categoryId: string): Exhibit[] => {
  return exhibits.filter(exhibit => exhibit.category === categoryId);
};

export const getExhibitById = (id: string): Exhibit | undefined => {
  return exhibits.find(exhibit => exhibit.id === id);
};

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(category => category.id === id);
};

export const getNextExhibit = (currentExhibitId: string): Exhibit | undefined => {
  const currentExhibit = getExhibitById(currentExhibitId);
  if (!currentExhibit || !currentExhibit.next) return undefined;
  return getExhibitById(currentExhibit.next);
};

export const getWorkflowPath = (categoryId: string): Exhibit[] => {
  const category = getCategoryById(categoryId);
  if (!category || !category.firstExhibitId) return [];
  
  const path: Exhibit[] = [];
  let currentId = category.firstExhibitId;
  
  while (currentId) {
    const exhibit = getExhibitById(currentId);
    if (!exhibit) break;
    
    path.push(exhibit);
    currentId = exhibit.next || '';
  }
  
  return path;
};
