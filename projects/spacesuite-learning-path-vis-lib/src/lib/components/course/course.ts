import { Component, Input, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '../../models';
import { DifficultyBadgeComponent } from '../difficulty-badge/difficulty-badge';
import { ProgressBarComponent } from '../progress-bar/progress-bar';
import { ConfigService } from '../../config/config.service';

@Component({
  selector: 'lp-course',
  imports: [CommonModule, DifficultyBadgeComponent, ProgressBarComponent],
  templateUrl: './course.html',
  styleUrl: './course.css',
})
export class CourseComponent {
  readonly config = inject(ConfigService).config;

  @Input({ required: true }) course!: Course;
  @Input({ required: true }) stepNumber!: number;
  @Input() isActive = false;
  @Output() selected = new EventEmitter<Course>();

  get completedObjectives() {
    return this.course.learning_objectives?.filter((o) => o.completed).length;
  }

  get cardClasses(): string {
    if (this.isActive) return '-translate-y-0.5 shadow-lg';
    if (this.course.completed) return 'hover:-translate-y-0.5 hover:shadow-xl backdrop-blur-sm';
    return 'hover:-translate-y-0.5 hover:shadow-xl backdrop-blur-sm';
  }

  get cardStyle(): string {
    const base = `background: var(--lp-surface); border-color: var(--lp-border); box-shadow: 0 2px 8px var(--lp-shadow);`;
    if (this.isActive) {
      return (
        base +
        ' border-color: var(--lp-accent-border); box-shadow: 0 8px 24px var(--lp-accent-glow);'
      );
    }
    if (this.course.completed) {
      return `background: var(--lp-surface); border-color: rgba(52,211,153,0.20); box-shadow: 0 2px 8px var(--lp-shadow);`;
    }
    return base;
  }

  get stepStyle(): string {
    return this.isActive
      ? 'background: var(--lp-accent-muted); border-color: var(--lp-accent-border); color: var(--lp-accent-text)'
      : 'background: var(--lp-step-bg); border-color: var(--lp-step-border); color: var(--lp-step-color)';
  }
}
