export interface Concept {
  id?: string;
  label: string;
  description?: string;
  uri?: string;
}

export interface LearningObjective {
  id?: string;
  label: string;
  description?: string;
  uri?: string;
  bloom_level?: number;
  bloom_level_label?: string;
  concepts?: Concept[];
}

export interface Course {
  id?: string;
  label: string;
  description?: string;
  uri?: string;
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
  courses?: Course[];
  links?: LearningLink[];

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
  gap: number //px gap between grid cells horizontally/vertically
}
