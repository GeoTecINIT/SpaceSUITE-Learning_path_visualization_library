import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideLearningPath } from '../../dist/spacesuite-learning-path-vis-lib';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideLearningPath({
      theme: {
        accentColor: '#a78bfa', // ← brand color
        accentColor2: '#f472b6', // ← Optional: gradient end
      },
      cardWidth: 300,
      arrowWidth: 44,
      showThemeSelector: false, // show the built-in color picker in the demo
      showStatsPanel: true,
      showDescriptionPanel: true,
      showDetailPanel: true,
      showDuration: true,
      showObjectives: true,
      showBloomLevels: true,
      autoScrollToInProgress: true,
      trackLabel: 'Course Track',
      eyebrowLabel: 'Learning Path',
    }),
  ],
};
