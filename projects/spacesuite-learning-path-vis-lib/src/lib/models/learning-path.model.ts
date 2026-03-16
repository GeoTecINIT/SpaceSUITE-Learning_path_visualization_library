export interface Concept {
  id?: string;
  label: string;
  description?: string;
  uri?: string;
  completed?: boolean;
}

export interface LearningObjective {
  id?: string;
  label: string;
  description?: string;
  uri?: string;
  bloom_level?: number;
  bloom_level_label?: string;
  concepts?: Concept[];
  completed?: boolean;
  conceptIds?: string[]; // References to concept IDs from the course
}

export interface Course {
  id?: string;
  label: string;
  description?: string;
  uri?: string;
  duration?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  completed?: boolean;
  progress?: number;
  x?: number; // grid/coordinate position (0..n)
  y?: number; // grid/coordinate position (0..n)
  learning_objectives?: LearningObjective[];
}

interface LearningLink {
  from: string;
  to: string;
  path?: string;
}

export interface LearningPath {
  id?: string;
  uri?: string;
  label: string;
  description?: string;
  courses: Course[];
  concepts: Concept[];
  links?: LearningLink[];
  duration?: string;
  translateX?: number;
  translateY?: number;
  scale?: number;
}

// Static display config (not theme-driven)

export const DIFFICULTY_CONFIG: Record<
  Course['difficulty'],
  { label: string; color: string; bg: string }
> = {
  beginner: {
    label: 'Beginner',
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10 border-emerald-400/30',
  },
  intermediate: {
    label: 'Intermediate',
    color: 'text-amber-400',
    bg: 'bg-amber-400/10 border-amber-400/30',
  },
  advanced: { label: 'Advanced', color: 'text-rose-400', bg: 'bg-rose-400/10 border-rose-400/30' },
};

export const BLOOM_LEVELS: Record<number, { label: string; color: string }> = {
  1: { label: 'Remember', color: '#94a3b8' },
  2: { label: 'Understand', color: '#60a5fa' },
  3: { label: 'Apply', color: '#34d399' },
  4: { label: 'Analyze', color: '#fbbf24' },
  5: { label: 'Evaluate', color: '#f97316' },
  6: { label: 'Create', color: '#a78bfa' },
};
