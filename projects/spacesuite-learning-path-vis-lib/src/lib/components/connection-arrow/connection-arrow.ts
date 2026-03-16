import { Component, Input, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeService } from '../../theme/theme.service';

@Component({
  selector: 'lp-connection-arrow',
  imports: [CommonModule],
  templateUrl: './connection-arrow.html',
  styleUrl: './connection-arrow.css',
})
export class ConnectionArrowComponent {
  readonly themeService = inject(ThemeService);

  @Input() completed = false;

  /**
   * Arrowhead renders at 25% of the total arrow width, clamped between 8–18px
   * so it stays legible at very narrow or very wide widths.
   */
  readonly arrowheadSize = computed(() =>
    Math.min(18, Math.max(8, Math.round(this.themeService.arrowWidth() * 0.25))),
  );

  /**
   * Stroke width scales subtly with the arrowhead size so the arrow
   * doesn't look too thin when large or too chunky when small.
   */
  readonly strokeWidth = computed(() => {
    const size = this.arrowheadSize();
    if (size <= 8) return 1.25;
    if (size <= 12) return 1.5;
    return 2;
  });
}
