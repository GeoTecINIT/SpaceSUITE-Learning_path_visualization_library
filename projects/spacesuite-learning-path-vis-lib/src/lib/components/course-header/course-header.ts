import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { DifficultyBadgeComponent } from '../difficulty-badge/difficulty-badge';
import { ConfigService } from '../../config/config.service';
import { Course } from '../../models';
import { ThemeService } from '../../theme/theme.service';

@Component({
  selector: 'lp-course-header',
  imports: [CommonModule, DifficultyBadgeComponent],
  templateUrl: './course-header.html',
  styleUrl: './course-header.css',
})
export class CourseHeaderComponent {
  readonly config = inject(ConfigService).config;
  readonly themeService = inject(ThemeService);

  @Input({ required: true }) course!: Course;
}
