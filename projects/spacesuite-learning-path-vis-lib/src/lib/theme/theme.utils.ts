import { ThemeVars, ThemeConfig } from '../config/learning-path.config';

import { ColorMode } from './theme.service';

// ─── Hex parsing helpers ───────────────────────────────────────────────────────

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const full =
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgba(hex: string, alpha: number): string {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r},${g},${b},${alpha})`;
}

/**
 * Shifts the hue of a hex color by `degrees` (0–360).
 * Used to auto-derive a secondary accent from the primary.
 */
function shiftHue(hex: string, degrees: number): string {
  const [r, g, b] = hexToRgb(hex).map((v) => v / 255);
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  const delta = max - min;
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case r:
        h = ((g - b) / delta + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / delta + 2) / 6;
        break;
      case b:
        h = ((r - g) / delta + 4) / 6;
        break;
    }
  }

  h = (h + degrees / 360) % 1;

  // HSL → RGB
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const nr = Math.round(hue2rgb(p, q, h + 1 / 3) * 255);
  const ng = Math.round(hue2rgb(p, q, h) * 255);
  const nb = Math.round(hue2rgb(p, q, h - 1 / 3) * 255);
  return `#${[nr, ng, nb].map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}

// ─── Public API ────────────────────────────────────────────────────────────────

/**
 * Derives a complete ThemeVars map from a ThemeConfig.
 *
 * - `accentColor` drives the primary CSS variables (muted bg, border, glow, etc.)
 * - `accentColor2` (or an auto-shifted hue) drives gradient ends
 * - `vars` overrides take precedence over all derived values
 */
export function resolveThemeVars(config: ThemeConfig): ThemeVars {
  const accent = config.accentColor;
  const accent2 = config.accentColor2 ?? shiftHue(accent, 150);

  const derived: ThemeVars = {
    '--lp-accent': accent,
    '--lp-accent-muted': rgba(accent, 0.12),
    '--lp-accent-border': rgba(accent, 0.3),
    '--lp-accent-text': accent,
    '--lp-accent-glow': rgba(accent, 0.18),
    '--lp-accent2': accent2,
    '--lp-accent2-muted': rgba(accent2, 0.1),
    '--lp-stat-icon': accent,
    '--lp-bg-glow1': rgba(accent, 0.04),
    '--lp-bg-glow2': rgba(accent2, 0.04),
  };

  // Consumer overrides win over derived values
  return { ...derived, ...(config.vars ?? {}) };
}

/**
 * Writes a ThemeVars map as CSS custom properties on a target element
 * (defaults to :root / document.documentElement).
 */
export function applyThemeVars(vars: ThemeVars, target?: HTMLElement): void {
  const el = target ?? (typeof document !== 'undefined' ? document.documentElement : undefined);

  if (!el) return;
  for (const [key, value] of Object.entries(vars)) {
    el.style.setProperty(key, value);
  }
}

/**
 * Removes all --lp-* custom properties from an element.
 * Useful for scoped theming on a container element.
 */
export function clearThemeVars(target?: HTMLElement): void {
  const el = target ?? (typeof document !== 'undefined' ? document.documentElement : undefined);

  if (!el) return;

  const keys: (keyof ThemeVars)[] = [
    '--lp-accent',
    '--lp-accent-muted',
    '--lp-accent-border',
    '--lp-accent-text',
    '--lp-accent-glow',
    '--lp-accent2',
    '--lp-accent2-muted',
    '--lp-stat-icon',
    '--lp-bg-glow1',
    '--lp-bg-glow2',
  ];

  keys.forEach((k) => el.style.removeProperty(k));
}

// ─── Color mode palettes ──────────────────────────────────────────────────────

/**
 * Semantic surface/text/border CSS variables for each color mode.
 *
 * Components reference these tokens instead of hardcoded Tailwind slate-* classes,
 * so a single mode switch re-paints the entire library instantly.
 *
 * Dark palette  → slate-900 background family
 * Light palette → white/slate-50 background family with dark text
 */
export const MODE_VARS: Record<ColorMode, Record<string, string>> = {
  dark: {
    '--lp-bg': '#0f172a', // page background (slate-900)
    '--lp-surface': '#1e293b', // card/panel fill (slate-800)
    '--lp-surface-raised': '#263448', // hovered / active card
    '--lp-surface-overlay': 'rgba(30,41,59,0.80)', // backdrop-blur fills
    '--lp-border': 'rgba(71,85,105,0.60)', // slate-600/60
    '--lp-border-subtle': 'rgba(51,65,85,0.50)', // slate-700/50
    '--lp-text-primary': '#f1f5f9', // slate-100
    '--lp-text-secondary': '#94a3b8', // slate-400
    '--lp-text-muted': '#64748b', // slate-500
    '--lp-text-heading': '#ffffff',
    '--lp-shadow': 'rgba(0,0,0,0.30)',
    '--lp-edge-fade': '#0f172a', // matches bg for carousel edge gradient
    '--lp-step-bg': 'rgba(51,65,85,0.60)',
    '--lp-step-border': '#475569',
    '--lp-step-color': '#94a3b8',
  },
  light: {
    '--lp-bg': '#f8fafc', // slate-50
    '--lp-surface': '#ffffff',
    '--lp-surface-raised': '#f1f5f9', // slate-100
    '--lp-surface-overlay': 'rgba(255,255,255,0.85)',
    '--lp-border': 'rgba(148,163,184,0.50)', // slate-400/50
    '--lp-border-subtle': 'rgba(203,213,225,0.60)', // slate-300/60
    '--lp-text-primary': '#1e293b', // slate-800
    '--lp-text-secondary': '#475569', // slate-600
    '--lp-text-muted': '#94a3b8', // slate-400
    '--lp-text-heading': '#0f172a', // slate-900
    '--lp-shadow': 'rgba(15,23,42,0.10)',
    '--lp-edge-fade': '#f8fafc',
    '--lp-step-bg': 'rgba(241,245,249,0.80)',
    '--lp-step-border': '#cbd5e1',
    '--lp-step-color': '#475569',
  },
};

/**
 * Writes the mode palette to `document.documentElement` and sets
 * `data-lp-mode="dark|light"` as a CSS hook for any additional
 * host-app overrides.
 */
export function applyModeVars(mode: ColorMode, target?: HTMLElement): void {
  const el = target ?? (typeof document !== 'undefined' ? document.documentElement : undefined);

  if (!el) return;
  const vars = MODE_VARS[mode];
  for (const [key, value] of Object.entries(vars)) {
    el.style.setProperty(key, value);
  }
  el.setAttribute('data-lp-mode', mode);
}
