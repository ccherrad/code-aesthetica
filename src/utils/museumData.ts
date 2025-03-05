export interface Exhibit {
  id: string;
  title: string;
  code: string;
  language: string;
  description: string;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  position: { x: number; y: number };
}

// This would normally be fetched from a database
export const categories: Category[] = [
  {
    id: "elegant-functions",
    name: "Elegant Functions",
    description: "A collection of beautifully crafted functions",
    position: { x: 20, y: 30 },
  },
  {
    id: "creative-algorithms",
    name: "Creative Algorithms",
    description: "Algorithms that showcase creative problem-solving",
    position: { x: 60, y: 20 },
  },
  {
    id: "historical-snippets",
    name: "Historical Snippets",
    description: "Code that changed the course of programming history",
    position: { x: 40, y: 70 },
  },
  {
    id: "minimal-wonders",
    name: "Minimal Wonders",
    description: "Achieving a lot with very little code",
    position: { x: 75, y: 60 },
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
  },
  {
    id: "fibonacci-one-liner",
    title: "Fibonacci: The One-liner",
    code: `const fibonacci = n => n <= 1 ? n : fibonacci(n - 1) + fibonacci(n - 2);`,
    language: "javascript",
    description: "An elegant recursive implementation of the Fibonacci sequence.",
    category: "creative-algorithms",
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
  },
  {
    id: "life-in-a-line",
    title: "Conway's Game of Life in One Line",
    code: `life=lambda b,s:set([(i+(i in b)*s.count(i)*(4-s.count(i))/3)%2 for i in s])`,
    language: "python",
    description: "Conway's Game of Life implemented in a single line of Python.",
    category: "minimal-wonders",
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
