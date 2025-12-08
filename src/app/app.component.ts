import { Component, signal, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import {LearningPathComponent, LearningPathsComponent, LearningPath, LearningPathStyleConfig, Course} from '../../dist/spacesuite-learning-path-vis-lib';

import { CourseComponent } from './components/course.component/course.component';
import { LEARNING_PATHS } from './static/learning_paths';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [ CommonModule, LearningPathComponent, LearningPathsComponent, CourseComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected readonly title = signal('Example Title');

  activeCardId = signal<string | undefined>(undefined);
  activePathId: string | undefined = undefined;

  selectedCourse: Course | null = null;

  learning_paths : LearningPath[] = LEARNING_PATHS;

  myStyle = signal<LearningPathStyleConfig>({
    textColor: "#000000",
    backgroundColor: "#f1f1f1",
    completedColor: "#28a745",
    inProgressColor: "#17a2b8",
    pendingColor: "#6c757d",
    cardWidth: 220,
    cardHeight: 160,
    gap: 20
  });

  @ViewChild(CourseComponent) courseComponent!: CourseComponent;

  constructor() {
  }

  onClickCourse(cardId: any) {
    this.activeCardId.set(cardId);
  }

  onActivePathChange(pathId: any) {
    this.activePathId = pathId;
  }

  onViewCourse(course: Course) {
    this.selectedCourse = course;
    this.courseComponent.show();
  }

  onClose(event: any) {
    this.selectedCourse = null;
  }

  onShow(event: any) {

  }

  onChangeWidth(event: Event) {
    this.myStyle.set({...this.myStyle(), cardWidth: +(event.target as HTMLInputElement).value})
  }

  onChangeHeight(event: Event) {
    this.myStyle.set({...this.myStyle(), cardHeight: +(event.target as HTMLInputElement).value})
  }
}
