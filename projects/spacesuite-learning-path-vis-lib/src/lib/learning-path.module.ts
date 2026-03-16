import { NgModule, EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { LearningPathConfig, LEARNING_PATH_CONFIG } from './config/learning-path.config';
import { ConfigService } from './config/config.service';
import { ThemeService } from './theme/theme.service';

import { LearningPathComponent } from './components/learning-path/learning-path';
import { MultipleLearningPathComponent } from './components/multiple-learning-path/multiple-learning-path';
import { LearningPathVerticalComponent } from './components/learning-path-vertical/learning-path-vertical';
import { ThemeSelectorComponent } from './theme/theme-selector';

// Re-export the primary component and selector so consumers can import them directly
export { LearningPathComponent } from './components/learning-path/learning-path';
export { MultipleLearningPathComponent } from './components/multiple-learning-path/multiple-learning-path';
export { LearningPathVerticalComponent } from './components/learning-path-vertical/learning-path-vertical';
export { ThemeSelectorComponent } from './theme/theme-selector';

/**
 * NgModule for apps that still use NgModule-based architecture.
 *
 * @example
 * // app.module.ts
 * imports: [
 *   LearningPathModule.forRoot({ theme: { accentColor: '#6366f1' } })
 * ]
 */
@NgModule({
  imports: [
    LearningPathComponent,
    MultipleLearningPathComponent,
    LearningPathVerticalComponent,
    ThemeSelectorComponent,
  ],
  exports: [
    LearningPathComponent,
    MultipleLearningPathComponent,
    LearningPathVerticalComponent,
    ThemeSelectorComponent,
  ],
})
export class LearningPathModule {
  static forRoot(config: LearningPathConfig = {}): {
    ngModule: typeof LearningPathModule;
    providers: unknown[];
  } {
    return {
      ngModule: LearningPathModule,
      providers: [{ provide: LEARNING_PATH_CONFIG, useValue: config }, ConfigService, ThemeService],
    };
  }
}

/**
 * Provider function for standalone / inject()-based Angular apps.
 *
 * @example
 * // app.config.ts
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideLearningPath({
 *       theme: { accentColor: '#6366f1', accentColor2: '#ec4899' },
 *       showThemeSelector: false,
 *       cardWidth: 300,
 *     }),
 *   ],
 * };
 */
export function provideLearningPath(config: LearningPathConfig = {}): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: LEARNING_PATH_CONFIG, useValue: config },
    ConfigService,
    ThemeService,
  ]);
}
