import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import { LearningPath, Concept } from '../../models';
import { ConfigService } from '../../config/config.service';
import { ThemeService } from '../../theme/theme.service';

@Component({
  selector: 'lp-learning-path-header',
  imports: [CommonModule],
  templateUrl: './learning-path-header.html',
  styleUrl: './learning-path-header.css',
})
export class LearningPathHeaderComponent {
  readonly config = inject(ConfigService).config;
  readonly themeService = inject(ThemeService);

  @Input({ required: true }) learningPath!: LearningPath;

  get completedCourses() {
    return this.learningPath.courses.filter((c) => c.completed).length;
  }

  get totalObjectives() {
    return this.learningPath.courses.reduce(
      (sum, c) => sum + (c.learning_objectives?.length ?? 0),
      0,
    );
  }

  get concepts() {
    const concepts: Concept[] = [];
    this.learningPath.concepts.map((concept) => {
      if (!concept.id) {
        concept.id = uuidv4();
      }
      concepts.push(concept);
    });
    return concepts;
  }

  get courses() {
    const courses = this.learningPath.courses || [];
    return courses.map((course) => {
      course.progress = course.progress || 0; // Ensure progress is defined
      course.completed = course.completed || course.progress === 100; // Mark as completed if progress is 100%
      const updatedCourse = { ...course, id: course.id || uuidv4() };
      updatedCourse.learning_objectives = updatedCourse.learning_objectives?.map((objective) => {
        const objectiveConcepts =
          objective.concepts
            ?.map((concept) =>
              this.concepts.find((c) => c.uri === concept.uri || c.id === concept.id),
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
  }

  get overallProgress() {
    const total = this.learningPath.courses.length;
    if (!total) return 0;
    const sum = this.learningPath.courses.reduce((acc, c) => acc + (c.progress ?? 100), 0);
    return Math.round(sum / total);
  }

  get totalDuration(): string | undefined {
    let totalHours = 0;
    this.courses.forEach((course) => {
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
}
