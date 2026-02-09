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
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
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
  // zoom + pan state
  translateX?: number;
  translateY?: number;
  scale?: number;
}

export interface LearningPathStyleConfig {
  textColor?: string;
  backgroundColor?: string;
  completedColor?: string;
  inProgressColor?: string;
  pendingColor?: string;
  cardWidth: number;
  cardHeight: number;
  gap: number; //px gap between grid cells horizontally/vertically
}
