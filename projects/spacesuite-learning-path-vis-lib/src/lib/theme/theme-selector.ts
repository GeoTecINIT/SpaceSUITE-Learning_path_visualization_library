import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, ThemePreset } from './theme.service';

@Component({
  selector: 'lp-theme-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center gap-4">
      <!-- Color mode toggle -->
      <button
        (click)="themeService.toggleColorMode()"
        class="flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-200 focus:outline-none focus-visible:ring-2"
        [style.border-color]="'var(--lp-border)'"
        [style.color]="'var(--lp-text-secondary)'"
        [attr.aria-label]="
          themeService.colorMode() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
        "
        [title]="themeService.colorMode() === 'dark' ? 'Light mode' : 'Dark mode'"
      >
        <!-- Sun icon — shown in dark mode (click to go light) -->
        @if (themeService.colorMode() === 'dark') {
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        }
        <!-- Moon icon — shown in light mode (click to go dark) -->
        @if (themeService.colorMode() === 'light') {
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        }
      </button>

      <div
        class="w-px h-4 transition-colors duration-300"
        style="background: var(--lp-border)"
      ></div>

      <!-- Preset label -->
      <span
        class="text-xs font-medium uppercase tracking-widest select-none transition-colors duration-300"
        style="color: var(--lp-text-muted)"
        >Theme</span
      >

      <!-- Preset swatches -->
      <div class="flex items-center gap-1.5" role="radiogroup" aria-label="Select theme color">
        @for (preset of themeService.presets; track preset.id) {
          <button
            (click)="select(preset)"
            [attr.aria-label]="preset.label + ' theme'"
            [attr.aria-checked]="isActive(preset)"
            role="radio"
            class="relative flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            [style.background]="isActive(preset) ? preset.swatch + '18' : 'transparent'"
            [title]="preset.label"
          >
            <span
              class="block rounded-full transition-all duration-200"
              [style.background]="preset.swatch"
              [style.width]="isActive(preset) ? '14px' : '10px'"
              [style.height]="isActive(preset) ? '14px' : '10px'"
              [style.box-shadow]="isActive(preset) ? '0 0 8px ' + preset.swatch + '80' : 'none'"
            ></span>
            @if (isActive(preset)) {
              <span
                class="absolute inset-0 rounded-full pointer-events-none"
                [style.box-shadow]="'0 0 0 2px ' + preset.swatch + '60'"
              ></span>
            }
          </button>
        }
      </div>

      <!-- Active theme label -->
      <span
        class="text-xs font-semibold transition-colors duration-300 min-w-12"
        [style.color]="themeService.activeSwatch()"
      >
        {{ activeLabel }}
      </span>
    </div>
  `,
})
export class ThemeSelectorComponent {
  readonly themeService = inject(ThemeService);

  get activeLabel(): string {
    const id = this.themeService.activePresetId();
    return this.themeService.presets.find((p) => p.id === id)?.label ?? 'Custom';
  }

  select(preset: ThemePreset): void {
    this.themeService.setPreset(preset.id);
  }

  isActive(preset: ThemePreset): boolean {
    return this.themeService.activePresetId() === preset.id;
  }
}
