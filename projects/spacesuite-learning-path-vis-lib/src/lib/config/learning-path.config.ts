import { InjectionToken } from '@angular/core';

// ─── Theme configuration ──────────────────────────────────────────────────────

/**
 * Supply a hex color (e.g. '#6366f1') and the library will auto-derive all
 * required CSS variable values from it.
 *
 * Alternatively, provide a full `ThemeVars` object for complete control.
 */
export interface ThemeConfig {
  /**
   * The primary accent hex color used for active states, navigation indicators,
   * eyebrow labels, and the progress bar gradient start.
   * @example '#6366f1'
   */
  accentColor: string;

  /**
   * Optional secondary hex color for the progress bar gradient end and the
   * overall progress bar. Defaults to a computed complementary hue shift.
   * @example '#ec4899'
   */
  accentColor2?: string;

  /**
   * Override individual CSS variable values. These take precedence over any
   * values derived from accentColor / accentColor2.
   */
  vars?: Partial<ThemeVars>;
}

/** The full set of CSS custom properties used by the library. */
export interface ThemeVars {
  '--lp-accent': string;
  '--lp-accent-muted': string;
  '--lp-accent-border': string;
  '--lp-accent-text': string;
  '--lp-accent-glow': string;
  '--lp-accent2': string;
  '--lp-accent2-muted': string;
  '--lp-stat-icon': string;
  '--lp-bg-glow1': string;
  '--lp-bg-glow2': string;
}

// ─── Layout & feature flags ───────────────────────────────────────────────────

export interface LearningPathConfig {
  /**
   * Theme configuration. Provide a ThemeConfig object with an accentColor hex,
   * or leave undefined to use the built-in Ocean default.
   */
  theme?: ThemeConfig;

  /**
   * Width of each course card in pixels.
   * @default 280
   */
  cardWidth?: number;

  /**
   * Width of the arrow connector between cards in pixels.
   * @default 40
   */
  arrowWidth?: number;

  /**
   * Show the built-in theme selector widget inside the component header.
   * Set to false when you manage theming externally.
   * @default true
   */
  showThemeSelector?: boolean;

  /**
   * Show the learning path eyeball.
   * @default true
   */
  showEyeBallPanel?: boolean;

  /**
   * Show the learning path stats bar (courses count, completed, objectives, overall %).
   * @default true
   */
  showStatsPanel?: boolean;

  /**
   * Show the learning path description panel.
   * @default true
   */
  showDescriptionPanel?: boolean;

  /**
   * Show the course detail panel when a card is clicked.
   * @default true
   */
  showDetailPanel?: boolean;

  /**
   * Show the course duration chip on each card.
   * @default true
   */
  showDuration?: boolean;

  /**
   * Show learning objectives inside the detail panel.
   * @default true
   */
  showObjectives?: boolean;

  /**
   * Show Bloom's taxonomy level badges on each objective.
   * @default true
   */
  showBloomLevels?: boolean;

  /**
   * Automatically scroll to the first in-progress course on init.
   * @default true
   */
  autoScrollToInProgress?: boolean;

  /**
   * Label for the "Course Track" section heading.
   * @default 'Course Track'
   */
  trackLabel?: string;

  /**
   * Label for the eyebrow text above the path title.
   * @default 'Learning Path'
   */
  eyebrowLabel?: string;
}

// ─── Injection token ──────────────────────────────────────────────────────────

export const LEARNING_PATH_CONFIG = new InjectionToken<LearningPathConfig>('LEARNING_PATH_CONFIG');

/** Resolved config with all defaults applied — used internally. */
export type ResolvedConfig = Required<LearningPathConfig>;

export const DEFAULT_CONFIG: ResolvedConfig = {
  theme: { accentColor: '#38bdf8', accentColor2: '#a78bfa' },
  cardWidth: 280,
  arrowWidth: 40,
  showThemeSelector: true,
  showEyeBallPanel: true,
  showStatsPanel: true,
  showDescriptionPanel: true,
  showDetailPanel: true,
  showDuration: true,
  showObjectives: true,
  showBloomLevels: true,
  autoScrollToInProgress: true,
  trackLabel: 'Course Track',
  eyebrowLabel: 'Learning Path',
};
