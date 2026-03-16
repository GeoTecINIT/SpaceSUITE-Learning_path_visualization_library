import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Course, Concept, BLOOM_LEVELS } from '../../models';
import { ConfigService } from '../../config/config.service';
import { CourseHeaderComponent } from '../course-header/course-header';
import { ThemeService } from '../../theme/theme.service';

@Component({
  selector: 'lp-course-detail-panel',
  imports: [CommonModule, CourseHeaderComponent],
  templateUrl: './course-detail-panel.html',
  styleUrl: './course-detail-panel.css',
})
export class CourseDetailPanelComponent {
  readonly config = inject(ConfigService).config;
  readonly themeService = inject(ThemeService);

  @Input({ required: true }) course!: Course | null;
  @Input() concepts: Concept[] = [];
  @Output() closed = new EventEmitter<void>();

  bloomColor(level: number): string {
    return BLOOM_LEVELS[level]?.color ?? '#94a3b8';
  }

  bloomBg(level: number): string {
    const color = BLOOM_LEVELS[level]?.color ?? '#94a3b8';
    return color + '18';
  }

  bloomLabel(level: number): string {
    return BLOOM_LEVELS[level]?.label ?? '';
  }

  getConceptLabel(conceptId: string): string | null {
    return this.concepts.find((c) => c.id === conceptId)?.label ?? null;
  }

  getConceptById(conceptId: string): Concept | null {
    return this.concepts.find((c) => c.id === conceptId) ?? null;
  }

  get ctaStyle(): string {
    if (!this.course) return '';
    return this.course.progress && this.course.progress > 0
      ? 'background: var(--lp-accent-muted); border-color: var(--lp-accent-border); color: var(--lp-accent-text)'
      : 'background: var(--lp-surface-raised); border-color: var(--lp-border); color: var(--lp-text-primary)';
  }
}
