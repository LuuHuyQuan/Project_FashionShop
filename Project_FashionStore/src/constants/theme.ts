// Theme constants - Colors, Gradients, Shadows
// Centralized design tokens for consistent styling

export const COLORS = {
  // Primary colors
  PRIMARY: '#7c3aed',
  PRIMARY_LIGHT: '#a78bfa',
  PRIMARY_DARK: '#6d28d9',

  // Secondary colors
  SECONDARY: '#764ba2',
  SECONDARY_LIGHT: '#9f7aea',
  SECONDARY_DARK: '#553c9a',

  // Accent colors
  PINK: '#db2777',
  PINK_LIGHT: '#f472b6',
  BLUE: '#2563eb',
  BLUE_LIGHT: '#60a5fa',
  GREEN: '#16a34a',
  GREEN_LIGHT: '#4ade80',
  ORANGE: '#ea580c',
  ORANGE_LIGHT: '#fb923c',
  RED: '#dc2626',
  RED_LIGHT: '#f87171',
  YELLOW: '#ca8a04',
  YELLOW_LIGHT: '#facc15',

  // Neutral colors
  SLATE_50: '#f8fafc',
  SLATE_100: '#f1f5f9',
  SLATE_200: '#e2e8f0',
  SLATE_300: '#cbd5e1',
  SLATE_400: '#94a3b8',
  SLATE_500: '#64748b',
  SLATE_600: '#475569',
  SLATE_700: '#334155',
  SLATE_800: '#1e293b',
  SLATE_900: '#0f172a',

  // Semantic colors
  SUCCESS: '#16a34a',
  ERROR: '#dc2626',
  WARNING: '#ca8a04',
  INFO: '#2563eb',
} as const;

export const GRADIENTS = {
  PRIMARY: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  SECONDARY: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  BLUE: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  GREEN: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  ORANGE: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  PURPLE_PINK: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  PEACH: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  SKY: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
} as const;

export const SHADOWS = {
  SM: '0 1px 2px rgba(0,0,0,0.05)',
  MD: '0 4px 16px rgba(0,0,0,0.08)',
  LG: '0 8px 32px rgba(0,0,0,0.12)',
  XL: '0 12px 48px rgba(0,0,0,0.16)',

  // Colored shadows
  PRIMARY: '0 8px 32px rgba(102,126,234,0.4)',
  SECONDARY: '0 8px 32px rgba(240,147,251,0.4)',
  BLUE: '0 8px 32px rgba(79,172,254,0.4)',
  GREEN: '0 8px 32px rgba(67,233,123,0.4)',
} as const;

export const BADGE_COLORS = {
  Sale: { bg: '#fee2e2', text: '#dc2626', border: '#fecaca' },
  New: { bg: '#dbeafe', text: '#2563eb', border: '#bfdbfe' },
  Hot: { bg: '#fef3c7', text: '#ca8a04', border: '#fde68a' },
  Trend: { bg: '#dcfce7', text: '#16a34a', border: '#bbf7d0' },
} as const;

export const STATUS_COLORS = {
  active: { bg: '#dcfce7', text: '#16a34a', dot: '#16a34a', border: '#bbf7d0' },
  inactive: { bg: '#fef9c3', text: '#ca8a04', dot: '#ca8a04', border: '#fde68a' },
  banned: { bg: '#fee2e2', text: '#dc2626', dot: '#dc2626', border: '#fecaca' },
  pending: { bg: '#fef9c3', text: '#ca8a04', dot: '#ca8a04', border: '#fde68a' },
  completed: { bg: '#dcfce7', text: '#16a34a', dot: '#16a34a', border: '#bbf7d0' },
  cancelled: { bg: '#fee2e2', text: '#dc2626', dot: '#dc2626', border: '#fecaca' },
  shipping: { bg: '#dbeafe', text: '#2563eb', dot: '#2563eb', border: '#bfdbfe' },
} as const;

export const AVATAR_GRADIENTS = [
  '#667eea,#764ba2',
  '#f093fb,#f5576c',
  '#4facfe,#00f2fe',
  '#43e97b,#38f9d7',
  '#fa709a,#fee140',
  '#a18cd1,#fbc2eb',
  '#ffecd2,#fcb69f',
  '#a1c4fd,#c2e9fb',
] as const;

export const ANIMATION_DELAYS = {
  FAST: '0.1s',
  MEDIUM: '0.2s',
  SLOW: '0.3s',
  SLOWER: '0.4s',
} as const;

export const BORDER_RADIUS = {
  SM: '0.5rem',
  MD: '0.75rem',
  LG: '1rem',
  XL: '1.5rem',
  XXL: '2rem',
  FULL: '9999px',
} as const;

// Type exports for TypeScript
export type ColorKey = keyof typeof COLORS;
export type GradientKey = keyof typeof GRADIENTS;
export type ShadowKey = keyof typeof SHADOWS;
export type BadgeType = keyof typeof BADGE_COLORS;
export type StatusType = keyof typeof STATUS_COLORS;
