import { Component, Input, Output, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';

import {
  LearningPath,
  LearningObjective,
  Course,
  Concept,
  LearningPathStyleConfig,
} from '../../models';

@Component({
  selector: 'spacesuite-learning',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './learning-path-v2-component.html',
  styles: `
    .title {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* Animations */
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .course-details.expanded > * {
      animation: slideDown 0.3s ease-out;
    }

    /* Custom Scrollbar */

    .learning-path-container::-webkit-scrollbar,
    .right-section::-webkit-scrollbar {
      width: 6px;
    }
    .learning-path-container::-webkit-scrollbar-track,
    .right-section::-webkit-scrollbar-track {
      background: #f1f1f1;
    }
    .learning-path-container::-webkit-scrollbar-thumb,
    .right-section::-webkit-scrollbar-thumb {
      background: #8b5cf6;
      border-radius: 4px;
    }
    .learning-path-container::-webkit-scrollbar-thumb:hover,
    .right-section::-webkit-scrollbar-thumb:hover {
      background: #7c3aed;
    }
  `,
})
export class LearningPathV2Component {
  @Input({ required: true }) data!: LearningPath;
  @Input() styleConfig: LearningPathStyleConfig = {
    textColor: '#000000',
    backgroundColor: '#f1f1f1',
    completedColor: '#28a745',
    inProgressColor: '#17a2b8',
    pendingColor: '#6c757d',
    cardWidth: 220,
    cardHeight: 160,
    gap: 20,
  };

  @Input() activePath: LearningPath | null = null;

  concepts = computed(() => {
    const concepts: Concept[] = [];
    this.data.concepts.map((concept) => {
      if (!concept.id) {
        concept.id = uuidv4();
      }
      concepts.push(concept);
    });
    return concepts;
  });

  courses = computed(() => {
    const courses = this.data.courses || [];
    return courses.map((course) => {
      course.progress = course.progress || 0; // Ensure progress is defined
      course.completed = course.completed || course.progress === 100; // Mark as completed if progress is 100%
      const updatedCourse = { ...course, id: course.id || uuidv4() };
      updatedCourse.learning_objectives = updatedCourse.learning_objectives?.map((objective) => {
        const objectiveConcepts =
          objective.concepts
            ?.map((concept) =>
              this.concepts().find((c) => c.uri === concept.uri || c.id === concept.id),
            )
            .filter((c): c is Concept => !!c) || [];

        const updatedObjective = {
          ...objective,
          id: objective.id || uuidv4(),
          concepts: objectiveConcepts,
        };
        return updatedObjective;
      });
      return updatedCourse;
    });
  });

  expandedCourses: Set<string> = new Set();
  expandedObjectives: Set<string> = new Set();

  toggleCourse(courseId: string): void {
    if (this.expandedCourses.has(courseId)) {
      this.expandedCourses.delete(courseId);
    } else {
      this.expandedCourses.add(courseId);
    }
  }

  isCourseExpanded(courseId: string): boolean {
    return this.expandedCourses.has(courseId);
  }

  toggleObjective(objectiveId: string): void {
    if (this.expandedObjectives.has(objectiveId)) {
      this.expandedObjectives.delete(objectiveId);
    } else {
      this.expandedObjectives.add(objectiveId);
    }
  }

  isObjectiveExpanded(objectiveId: string): boolean {
    return this.expandedObjectives.has(objectiveId);
  }

  getConceptsForObjective(course: Course, objective: LearningObjective): Concept[] {
    return this.concepts().filter((concept) => objective.conceptIds?.includes(concept.id ?? ''));
  }

  getConceptsForCourse(course: Course): Concept[] {
    const courseConcepts = new Set<Concept>();
    course.learning_objectives?.forEach((objective) => {
      this.getConceptsForObjective(course, objective).forEach((concept) =>
        courseConcepts.add(concept),
      );
    });
    return Array.from(courseConcepts);
  }

  getTotalLearningObjectives(): number {
    return this.courses().reduce((total, course) => {
      return total + (course.learning_objectives?.length || 0);
    }, 0);
  }

  getTotalDuration(): string | undefined {
    let totalHours = 0;
    this.courses().forEach((course) => {
      // Assuming duration is in the format "X weeks" or "Y days" or "Z hours" or "N months"
      const duration = course.duration || '';
      const match = duration.match(/(\d+)\s*(week|day|hour|month)s?/i);
      if (match) {
        const value = parseInt(match[1], 10);
        const unit = match[2].toLowerCase();
        switch (unit) {
          case 'hour':
            totalHours += value;
            break;
          case 'day':
            totalHours += value * 8; // Assuming 1 day = 8 hours
            break;
          case 'week':
            totalHours += value * 40; // Assuming 1 week = 40 hours
            break;
          case 'month':
            totalHours += value * 160; // Assuming 1 month = 160 hours
            break;
        }
      }
    });
    if (totalHours === 0) {
      return undefined;
    }
    // If totalHours is less than 1, return in minutes
    if (totalHours < 1) {
      const totalMinutes = Math.round(totalHours * 60);
      return `${totalMinutes} minutes`;
    }
    // If totalHours is more than 40, return in weeks
    if (totalHours >= 40) {
      const totalWeeks = Math.round(totalHours / 40);
      return `${totalWeeks} week${totalWeeks > 1 ? 's' : ''}`;
    }
    // If totalHours is more than 160, return in months
    if (totalHours >= 160) {
      const totalMonths = Math.round(totalHours / 160);
      return `${totalMonths} month${totalMonths > 1 ? 's' : ''}`;
    }
    // Otherwise, return in hours
    return `${totalHours} hours`;
  }

  getDifficultyColor(difficulty: string): string {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'advanced':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  }

  getProgressColor(progress: number): string {
    if (progress === 100) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress > 0) return 'bg-yellow-500';
    return 'bg-gray-300';
  }

  getCourseStatusClass(course: Course): string {
    if (course.completed) return 'border-green-500 bg-green-50';
    if (course.progress && course.progress > 0) return 'border-blue-500 bg-blue-50';
    return 'border-gray-300 bg-white';
  }
}
