import {
  Component,
  Input,
  Output,
  OnInit,
  OnChanges,
  SimpleChanges,
  signal,
  computed,
  inject,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigService } from '../../config/config.service';
import { ThemeService } from '../../theme/theme.service';

import { Course, LearningPath } from '../../models';

import { CourseComponent } from '../course/course';
import { ConnectionArrowComponent } from '../connection-arrow/connection-arrow';
import { NavigationControlsComponent } from '../navigation-controls/navigation-controls';
import { CourseDetailPanelComponent } from '../course-detail-panel/course-detail-panel';
import { LearningPathHeaderComponent } from '../learning-path-header/learning-path-header';

import { ThemeSelectorComponent } from '../../theme/theme-selector';

@Component({
  selector: 'spacesuite-learning-path',
  standalone: true,
  imports: [
    CommonModule,
    CourseComponent,
    ConnectionArrowComponent,
    NavigationControlsComponent,
    CourseDetailPanelComponent,
    LearningPathHeaderComponent,
    ThemeSelectorComponent,
  ],
  styleUrl: './learning-path.css',
  templateUrl: './learning-path.html',
})
export class LearningPathComponent implements OnInit, OnChanges {
  readonly config = inject(ConfigService).config;
  readonly themeService = inject(ThemeService);

  @Input({ required: true }) learningPath!: LearningPath;

  /**
   * Programmatically override the active theme from the parent component.
   * Accepts a hex color string (e.g. '#6366f1') OR a ThemeConfig object.
   * When provided, this overrides the injected config theme and any user
   * selection from the built-in theme selector.
   */
  @Input() set themeColor(value: string | undefined) {
    if (value) this.themeService.setCustom({ accentColor: value });
  }

  /** Emits the Course object whenever a card is selected. */
  @Output() courseSelected = new EventEmitter<Course>();

  /** Emits when the detail panel is closed. */
  @Output() panelClosed = new EventEmitter<void>();

  currentIndex = signal(0);
  selectedCourse = signal<Course | null>(null);

  translateX = computed(() => {
    const offset =
      this.currentIndex() * (this.themeService.cardWidth() + this.themeService.arrowWidth());
    return `-${offset}px`;
  });

  ngOnInit() {
    if (this.config.autoScrollToInProgress) {
      const idx = this.learningPath.courses.findIndex(
        (c) => c.progress && c.progress > 0 && !c.completed,
      );
      if (idx > 0) this.currentIndex.set(idx);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Reset carousel when a new learning path is bound
    if (changes['learningPath'] && !changes['learningPath'].firstChange) {
      this.currentIndex.set(0);
      this.selectedCourse.set(null);
    }
  }

  navigatePrev() {
    if (this.currentIndex() > 0) this.currentIndex.update((i) => i - 1);
  }

  navigateNext() {
    if (this.currentIndex() < this.learningPath.courses.length - 1) {
      this.currentIndex.update((i) => i + 1);
    }
  }

  navigateTo(index: number) {
    this.currentIndex.set(index);
  }

  onCourseSelected(course: Course) {
    if (this.selectedCourse()?.id === course.id) {
      this.selectedCourse.set(null);
      this.panelClosed.emit();
    } else {
      this.selectedCourse.set(course);
      this.courseSelected.emit(course);
    }
  }

  closePanel() {
    this.selectedCourse.set(null);
    this.panelClosed.emit();
  }

  getCardOpacity(index: number): number {
    const dist = Math.abs(index - this.currentIndex());
    if (dist === 0) return 1;
    if (dist === 1) return 0.85;
    if (dist === 2) return 0.6;
    return 0.3;
  }

  getArrowOpacity(index: number): number {
    const dist = Math.abs(index - this.currentIndex());
    if (dist === 0) return 1;
    if (dist <= 1) return 0.7;
    return 0.3;
  }
}
