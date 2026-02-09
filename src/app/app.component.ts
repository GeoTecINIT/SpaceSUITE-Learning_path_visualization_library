import { Component, signal, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  LearningPathV1Component,
  MultipleLearningPathComponent,
  LearningPathV2Component,
  LearningPath,
  LearningPathStyleConfig,
  Course,
} from '../../dist/spacesuite-learning-path-vis-lib';

import { CourseComponent } from './components/course.component/course.component';
import { LEARNING_PATHS } from './static/learning_paths';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    CommonModule,
    LearningPathV1Component,
    LearningPathV2Component,
    MultipleLearningPathComponent,
    CourseComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected readonly title = signal('Learning Path Visualization Examples');

  activeCourse = signal<Course | undefined>(undefined);
  activePath: LearningPath | null = null;

  selectedCourse: Course | null = null;

  learning_paths: LearningPath[] = LEARNING_PATHS;

  activeComponent = signal<'v1' | 'v2' | 'multiple'>('v1');

  myStyle = signal<LearningPathStyleConfig>({
    textColor: '#000000',
    backgroundColor: '#f1f1f1',
    completedColor: '#28a745',
    inProgressColor: '#17a2b8',
    pendingColor: '#6c757d',
    cardWidth: 250,
    cardHeight: 160,
    gap: 20,
  });

  @ViewChild(CourseComponent) courseComponent!: CourseComponent;

  constructor() {}

  onClickCourse(course: Course) {
    this.activeCourse.set(course);
  }

  onActivePathChange(path: LearningPath) {
    this.activePath = path;
  }

  onViewCourse(course: Course) {
    this.selectedCourse = course;
    this.courseComponent.show();
  }

  onClose(event: any) {
    this.selectedCourse = null;
  }

  onShow(event: any) {}

  onChangeWidth(event: Event) {
    this.myStyle.set({ ...this.myStyle(), cardWidth: +(event.target as HTMLInputElement).value });
  }

  onChangeHeight(event: Event) {
    this.myStyle.set({ ...this.myStyle(), cardHeight: +(event.target as HTMLInputElement).value });
  }
}
