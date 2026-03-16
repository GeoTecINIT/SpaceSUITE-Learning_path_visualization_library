# SpacesuiteLearningPathVisLib

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.0.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the library, run:

```bash
ng build spacesuite-learning-path-vis-lib
```

This command will compile your project, and the build artifacts will be placed in the `dist/` directory.

### Publishing the Library

Once the project is built, you can publish your library by following these steps:

1. Navigate to the `dist` directory:
   ```bash
   cd dist/spacesuite-learning-path-vis-lib
   ```

2. Run the `npm publish` command to publish your library to the npm registry:
   ```bash
   npm publish
   ```

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


## Setting theme
Option 1: `provideLearningPath()`  - Set theme and config once at app bootstrap. All instances share the same resolved config.

```js
// app.config.ts
provideLearningPath({
  theme: { accentColor: '#a78bfa', accentColor2: '#f472b6' },
  showThemeSelector: true,
  cardWidth: 300,
})
```

Option 2: `[themeColor]` input  - Pass a hex string directly to the component. Useful when each instance needs a different color.

```html
// my-page.component.html
<lp-learning-path
  [learningPath]="path"
  [themeColor]="'#6366f1'"
/>
```

Option 3: `ThemeService` injection  - Inject ThemeService and call setCustom() / setPreset() at runtime — e.g. from a color picker or user preferences.

```js
// my-component.ts
readonly themeService = inject(ThemeService);

applyBrandColor(hex: string) {
  this.themeService.setCustom({ accentColor: hex });
}
```
