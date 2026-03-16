/*
 * Public API Surface of spacesuite-learning-path-vis-lib
 */

// Domain Models
export type { LearningPath, Course, LearningObjective, Concept } from './lib/models';

// Configuration
export type { LearningPathConfig, ThemeConfig, ThemeVars } from './lib/config/learning-path.config';
export { LEARNING_PATH_CONFIG } from './lib/config/learning-path.config';

// ─── Bootstrap helpers ────────────────────────────────────────────────────────
export { LearningPathModule, provideLearningPath } from './lib/learning-path.module';

// ─── Primary components ───────────────────────────────────────────────────────
export { LearningPathComponent } from './lib/components/learning-path/learning-path';
export { MultipleLearningPathComponent } from './lib/components/multiple-learning-path/multiple-learning-path';
export { LearningPathVerticalComponent } from './lib/components/learning-path-vertical/learning-path-vertical';
export { ThemeSelectorComponent } from './lib/theme/theme-selector';

// ─── Theme service (for programmatic theme control) ───────────────────────────
export { ThemeService } from './lib/theme/theme.service';
export type { ThemePreset, LayoutOptions, ColorMode } from './lib/theme/theme.service';
export { BUILT_IN_THEMES } from './lib/theme/theme.service';

// ─── Theme utilities (for host apps that want to derive CSS vars manually) ────
export { resolveThemeVars, applyThemeVars, clearThemeVars } from './lib/theme/theme.utils';
