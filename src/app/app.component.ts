import { Component, signal, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  LearningPathComponent,
  MultipleLearningPathComponent,
  LearningPathVerticalComponent,
  LearningPath,
  Course,
  ThemeService,
} from '../../dist/spacesuite-learning-path-vis-lib';

import { LEARNING_PATHS } from './static/learning_paths';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    CommonModule,
    LearningPathComponent,
    LearningPathVerticalComponent,
    MultipleLearningPathComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected readonly title = signal('Learning Path Visualization Examples');
  readonly themeService = inject(ThemeService);

  customHex = signal('#a78bfa');
  // Pattern 2 — cycling through preset accent colors via [themeColor] input
  private readonly inputColors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
  inputThemeColor = signal(this.inputColors[0]);

  activePath: LearningPath | null = null;
  selectedCourse = signal<Course | null>(null);
  learning_paths: LearningPath[] = LEARNING_PATHS;

  activeComponent = signal<'v1' | 'v2' | 'multiple'>('v1');

  constructor() {}

  onColorInput(event: Event) {
    const hex = (event.target as HTMLInputElement).value;
    this.customHex.set(hex);
    this.themeService.setCustom({ accentColor: hex });
  }

  onCardWidthChange(event: Event) {
    const value = Number((event.target as HTMLInputElement).value);
    this.themeService.setLayout({ cardWidth: value });
  }

  onArrowWidthChange(event: Event) {
    const value = Number((event.target as HTMLInputElement).value);
    this.themeService.setLayout({ arrowWidth: value });
  }

  onPanelClosed() {
    console.log('[demo] panelClosed');
  }

  isDarkMode(): boolean {
    return this.themeService.colorMode() == 'dark';
  }

  toggleDarkMode() {
    this.themeService.toggleColorMode();
  }

  bgStyle = () => {
    const vars = this.themeService.activeVars();
    return `background-image: radial-gradient(ellipse at 20% 20%, ${vars['--lp-bg-glow1']} 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, ${vars['--lp-bg-glow2']} 0%, transparent 60%)`;
  };

  onClickCourse(course: Course) {
    this.selectedCourse.set(course);
  }

  onActivePathChange(path: LearningPath) {
    this.activePath = path;
  }
}
