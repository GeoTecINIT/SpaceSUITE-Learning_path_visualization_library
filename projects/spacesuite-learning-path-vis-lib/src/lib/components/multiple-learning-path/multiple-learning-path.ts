import {
  Component,
  Input,
  inject,
  HostListener,
  AfterViewInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ThemeService } from '../../theme/theme.service';
import { Concept, Course, LearningPath } from '../../models';
import { LearningPathComponent } from '../learning-path/learning-path';

@Component({
  selector: 'spacesuite-multiple-learning-path',
  standalone: true,
  imports: [NgStyle, CommonModule, LearningPathComponent, ReactiveFormsModule],
  templateUrl: './multiple-learning-path.html',
  styleUrl: './multiple-learning-path.css',
})
export class MultipleLearningPathComponent implements AfterViewInit {
  readonly themeService = inject(ThemeService);

  @Input({ required: true }) learningPaths!: LearningPath[];

  @Output() clickCourseEvent = new EventEmitter<Course>();
  @Output() changeActivePathEvent = new EventEmitter<LearningPath>();

  selectedCourse: Course | null = null;
  selectedPath: LearningPath | null = null;

  constructor() {}

  ngAfterViewInit() {}

  getConcepts(course: Course): Concept[] {
    let concepts = [];
    for (let obj of course?.learning_objectives || []) {
      for (let concept of obj.concepts || []) {
        concepts.push(concept);
      }
    }
    return Array.from(new Set(concepts));
  }

  /** Background click clears selection */
  @HostListener('document:click', ['$event'])
  onBackgroundClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.learning-path-container')) {
      this.selectedPath = null;
    }
  }

  onActivePathChange(path: LearningPath) {
    if (!path.id) return;

    this.selectedPath = path;

    if (this.selectedCourse) {
      this.clickCourseEvent.emit(this.selectedCourse);
    }
    this.changeActivePathEvent.emit(path);
  }

  onCourseClick(course: Course) {
    this.clickCourseEvent.emit(course);
  }
}
