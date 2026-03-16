import { Injectable, inject } from '@angular/core';
import {
  LearningPathConfig,
  ResolvedConfig,
  DEFAULT_CONFIG,
  LEARNING_PATH_CONFIG,
} from './learning-path.config';

/**
 * Internal service that resolves the consumer-supplied LearningPathConfig
 * against all defaults, producing a fully-typed ResolvedConfig.
 *
 * Injected at the library module level so a single resolved config is shared
 * across all component instances in a given injection scope.
 */
@Injectable()
export class ConfigService {
  // inject() with { optional: true } is the Angular 14+ field-injection equivalent
  // of the constructor's @Optional() @Inject(TOKEN) pattern. It avoids the
  // decorator conflict that occurs when mixing @Optional()/@Inject() with inject().
  private readonly userConfig = inject(LEARNING_PATH_CONFIG, { optional: true });

  readonly config: ResolvedConfig = this.resolve(this.userConfig ?? {});

  private resolve(user: LearningPathConfig): ResolvedConfig {
    return {
      ...DEFAULT_CONFIG,
      ...user,
      // Deep-merge theme so a partial ThemeConfig doesn't wipe the defaults
      theme: {
        ...DEFAULT_CONFIG.theme,
        ...(user.theme ?? {}),
      },
    };
  }
}
