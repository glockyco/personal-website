import { browser } from '$app/environment';

export type ThemeId =
  | 'indigo-light'
  | 'indigo-dark'
  | 'navy-light'
  | 'navy-dark'
  | 'warm-light'
  | 'warm-dark';

export interface ThemeOption {
  id: ThemeId;
  label: string;
  /** oklch value for the bg half of the swatch */
  swatchBg: string;
  /** oklch value for the accent half of the swatch */
  swatchAccent: string;
}

export const themes: ThemeOption[] = [
  {
    id: 'indigo-light',
    label: 'Indigo Light',
    swatchBg: 'oklch(96% 0.01 265)',
    swatchAccent: 'oklch(50% 0.2 285)'
  },
  {
    id: 'indigo-dark',
    label: 'Indigo Dark',
    swatchBg: 'oklch(12% 0.02 265)',
    swatchAccent: 'oklch(65% 0.18 285)'
  },
  {
    id: 'navy-light',
    label: 'Navy Light',
    swatchBg: 'oklch(95% 0.02 230)',
    swatchAccent: 'oklch(46% 0.17 175)'
  },
  {
    id: 'navy-dark',
    label: 'Navy Dark',
    swatchBg: 'oklch(16% 0.05 240)',
    swatchAccent: 'oklch(75% 0.18 175)'
  },
  {
    id: 'warm-light',
    label: 'Warm Light',
    swatchBg: 'oklch(97% 0.01 60)',
    swatchAccent: 'oklch(52% 0.18 45)'
  },
  {
    id: 'warm-dark',
    label: 'Warm Dark',
    swatchBg: 'oklch(13% 0.02 55)',
    swatchAccent: 'oklch(68% 0.18 45)'
  }
];

const VALID_THEMES = new Set<string>(themes.map((t) => t.id));
const STORAGE_KEY = 'theme';
const DEFAULT_THEME: ThemeId = 'indigo-light';

function getInitialTheme(): ThemeId {
  if (!browser) return DEFAULT_THEME;
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved && VALID_THEMES.has(saved) ? (saved as ThemeId) : DEFAULT_THEME;
}

let current = $state<ThemeId>(getInitialTheme());

export const theme = {
  get current() {
    return current;
  },
  set(id: ThemeId) {
    current = id;
    if (browser) {
      localStorage.setItem(STORAGE_KEY, id);
      document.documentElement.setAttribute('data-theme', id);
    }
  }
};
