import { Injectable, inject, signal, effect } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { ThemeConfig, ThemeVars } from '../config/learning-path.config';
import { resolveThemeVars, applyThemeVars, applyModeVars } from './theme.utils';

// ─── Color mode ───────────────────────────────────────────────────────────────
export type ColorMode = 'dark' | 'light';
const STORAGE_KEY = 'lp-active-theme';
const MODE_STORAGE_KEY = 'lp-color-mode';

// ─── Built-in theme presets ───────────────────────────────────────────────────

export interface ThemePreset {
  id: string;
  label: string;
  /** Swatch color for the UI picker */
  swatch: string;
  config: ThemeConfig;
}

export const BUILT_IN_THEMES: ThemePreset[] = [
  {
    id: 'ocean',
    label: 'Ocean',
    swatch: '#38bdf8',
    config: { accentColor: '#38bdf8', accentColor2: '#a78bfa' },
  },
  {
    id: 'violet',
    label: 'Violet',
    swatch: '#a78bfa',
    config: { accentColor: '#a78bfa', accentColor2: '#f472b6' },
  },
  {
    id: 'rose',
    label: 'Rose',
    swatch: '#fb7185',
    config: { accentColor: '#fb7185', accentColor2: '#fb923c' },
  },
  {
    id: 'emerald',
    label: 'Emerald',
    swatch: '#34d399',
    config: { accentColor: '#34d399', accentColor2: '#22d3ee' },
  },
  {
    id: 'amber',
    label: 'Amber',
    swatch: '#fbbf24',
    config: { accentColor: '#fbbf24', accentColor2: '#f97316' },
  },
  {
    id: 'slate',
    label: 'Slate',
    swatch: '#94a3b8',
    config: { accentColor: '#94a3b8', accentColor2: '#64748b' },
  },
];

// ─── Layout options ───────────────────────────────────────────────────────────

export interface LayoutOptions {
  /** Course card width in pixels. @default 280 */
  cardWidth?: number;
  /** Arrow connector width in pixels. @default 40 */
  arrowWidth?: number;
}

// ─── Service ──────────────────────────────────────────────────────────────────

/**
 * Manages the active theme AND reactive layout settings for the library.
 *
 * Theme priority order (highest → lowest):
 *  1. Runtime calls to `setPreset()` / `setCustom()`
 *  2. `LearningPathConfig.theme` provided at bootstrap via LEARNING_PATH_CONFIG
 *  3. Last persisted selection in localStorage
 *  4. Built-in Ocean default
 *
 * Layout / panel signals (`cardWidth`, `arrowWidth`, `showDetailPanel`) are
 * seeded from `LearningPathConfig` and can be mutated at runtime via
 * `setLayout()` and `setDetailPanel()`.
 */
@Injectable()
export class ThemeService {
  private readonly configService = inject(ConfigService);

  // ─── Theme signals ──────────────────────────────────────────────────────────

  /** All available built-in presets */
  readonly presets = BUILT_IN_THEMES;

  /** The currently resolved theme vars (reflects active theme) */
  readonly activeVars = signal<ThemeVars>(this.resolveInitialVars());

  /** The active preset id — null when a fully custom theme is active */
  readonly activePresetId = signal<string | null>(this.resolveInitialPresetId());

  /** The swatch/accent color of the active theme (for UI display) */
  readonly activeSwatch = signal<string>(this.resolveInitialSwatch());

  // ─── Layout signals (reactive, writable at runtime) ─────────────────────────

  /**
   * Width of each course card in pixels.
   * Seeded from `LearningPathConfig.cardWidth`; mutate via `setLayout()`.
   */
  readonly cardWidth = signal<number>(this.configService.config.cardWidth);

  /**
   * Width of the arrow connector between cards in pixels.
   * Seeded from `LearningPathConfig.arrowWidth`; mutate via `setLayout()`.
   */
  readonly arrowWidth = signal<number>(this.configService.config.arrowWidth);

  /**
   * Controls whether the learning path descriptipn panel is shown when a card is clicked.
   * Seeded from `LearningPathConfig.showDescriptionPanel`; mutate via `setDescriptionPanel()`.
   */
  readonly showDescriptionPanel = signal<boolean>(this.configService.config.showDescriptionPanel);

  /**
   * Controls whether the course detail panel is shown when a card is clicked.
   * Seeded from `LearningPathConfig.showDetailPanel`; mutate via `setDetailPanel()`.
   */
  readonly showDetailPanel = signal<boolean>(this.configService.config.showDetailPanel);

  /**
   * Controls whether the learning path eyeball is shown.
   * Seeded from `LearningPathConfig.showEyeBallPanel`; mutate via `setEyeBallPanel()`.
   */
  readonly showEyeBallPanel = signal<boolean>(this.configService.config.showEyeBallPanel);

  /**
   * Controls whether the learning path statistics panel is shown.
   * Seeded from `LearningPathConfig.showStatsPanel`; mutate via `setStatsPanel()`.
   */
  readonly showStatsPanel = signal<boolean>(this.configService.config.showStatsPanel);

  /**
   * The active color mode: 'dark' (default) or 'light'.
   * Seeded from localStorage, falls back to 'dark'.
   * Mutate via `setColorMode()` or `toggleColorMode()`.
   */
  readonly colorMode = signal<ColorMode>(this.resolveInitialMode());

  constructor() {
    // Apply CSS vars to :root whenever the active theme changes
    effect(() => {
      applyThemeVars(this.activeVars());
    });

    // Write surface/text/border CSS vars and data-lp-mode attribute on mode change
    effect(() => {
      applyModeVars(this.colorMode());
    });
  }

  // ─── Theme mutators ─────────────────────────────────────────────────────────

  /** Activate one of the built-in presets by id. */
  setPreset(presetId: string): void {
    const preset = BUILT_IN_THEMES.find((p) => p.id === presetId);
    if (!preset) return;
    this.activeVars.set(resolveThemeVars(preset.config));
    this.activePresetId.set(preset.id);
    this.activeSwatch.set(preset.swatch);
    this.persist(preset.id);
  }

  /**
   * Apply a fully custom theme config.
   * Accepts a `ThemeConfig` with an `accentColor` hex (e.g. `{ accentColor: '#6366f1' }`).
   * All CSS variable values are auto-derived; supply `vars` for fine-grained overrides.
   */
  setCustom(config: ThemeConfig): void {
    this.activeVars.set(resolveThemeVars(config));
    this.activePresetId.set(null);
    this.activeSwatch.set(config.accentColor);
  }

  // ─── Color mode mutators ─────────────────────────────────────────────────────

  /**
   * Set the color mode explicitly.
   * @example themeService.setColorMode('light');
   */
  setColorMode(mode: ColorMode): void {
    this.colorMode.set(mode);
    try {
      localStorage.setItem(MODE_STORAGE_KEY, mode);
    } catch {}
  }

  /**
   * Toggle between 'dark' and 'light' modes.
   * @example themeService.toggleColorMode();
   */
  toggleColorMode(): void {
    this.setColorMode(this.colorMode() === 'dark' ? 'light' : 'dark');
  }

  // ─── Layout mutators ────────────────────────────────────────────────────────

  /**
   * Update card and/or arrow dimensions at runtime.
   * Only the properties you supply are updated; omitted ones keep their current value.
   *
   * @example
   * themeService.setLayout({ cardWidth: 320, arrowWidth: 48 });
   */
  setLayout(options: LayoutOptions): void {
    if (options.cardWidth !== undefined) this.cardWidth.set(options.cardWidth);
    if (options.arrowWidth !== undefined) this.arrowWidth.set(options.arrowWidth);
  }

  /**
   * Toggle visibility of the learning path description at runtime.
   *
   * @example
   * themeService.showDescriptionPanel(false); // hide learning path description
   * themeService.showDescriptionPanel(true);  // show learning path description
   */
  setDescriptionPanel(visible: boolean): void {
    this.showDescriptionPanel.set(visible);
  }

  /**
   * Toggle visibility of the course detail panel at runtime.
   *
   * @example
   * themeService.setDetailPanel(false); // hide panel
   * themeService.setDetailPanel(true);  // show panel
   */
  setDetailPanel(visible: boolean): void {
    this.showDetailPanel.set(visible);
  }

  /**
   * Toggle visibility of the eye ball panel at runtime.
   *
   * @example
   * themeService.showEyeBallPanel(false); // hide eye ball panel
   * themeService.showEyeBallPanel(true);  // show eye ball panel
   */
  setEyeBallPanel(visible: boolean): void {
    this.showEyeBallPanel.set(visible);
  }

  /**
   * Toggle visibility of the statistics panel at runtime.
   *
   * @example
   * themeService.showStatsPanel(false); // hide stats panel
   * themeService.showStatsPanel(true);  // show stats panel
   */
  setStatsPanel(visible: boolean): void {
    this.showStatsPanel.set(visible);
  }

  // ─── Init helpers ───────────────────────────────────────────────────────────
  private resolveInitialMode(): ColorMode {
    try {
      const saved = localStorage.getItem(MODE_STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {}
    return 'dark';
  }
  private resolveInitialVars(): ThemeVars {
    const providerConfig = this.configService.config.theme;
    if (providerConfig) return resolveThemeVars(providerConfig);
    const saved = this.loadSaved();
    if (saved) return resolveThemeVars(saved.config);
    return resolveThemeVars(BUILT_IN_THEMES[0].config);
  }

  private resolveInitialPresetId(): string | null {
    const providerConfig = this.configService.config.theme;
    if (providerConfig) return null;
    return this.loadSaved()?.id ?? BUILT_IN_THEMES[0].id;
  }

  private resolveInitialSwatch(): string {
    const providerConfig = this.configService.config.theme;
    if (providerConfig) return providerConfig.accentColor;
    return this.loadSaved()?.swatch ?? BUILT_IN_THEMES[0].swatch;
  }

  private loadSaved(): ThemePreset | null {
    try {
      const id = localStorage.getItem(STORAGE_KEY);
      return BUILT_IN_THEMES.find((p) => p.id === id) ?? null;
    } catch {
      return null;
    }
  }

  private persist(presetId: string): void {
    try {
      localStorage.setItem(STORAGE_KEY, presetId);
    } catch {}
  }
}
