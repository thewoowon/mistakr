// Dark + Lime accent design system
// "거친 다크 + 소프트 글로우 라임 포인트 + 둥근 카드 + 얕은 대비"

export const lightColors = {
  primary: '#1a1a1a',
  accent: '#E0FB8A',
  accentPressed: '#CFF27A',
  accentSubtle: 'rgba(224,251,138,0.10)',
  background: '#F5F5F0',
  surface: '#FFFFFF',
  surface2: '#F0F0F0',
  card: '#FFFFFF',
  text: {
    primary: '#1a1a1a',
    secondary: '#666666',
    disabled: '#999999',
    accent: '#E0FB8A',
  },
  node: {
    start: '#4CAF50',
    funding: '#42A5F5',
    crisis: '#FFA726',
    shutdown: '#EF5350',
  },
  border: '#e0e0e0',
  stroke: '#e0e0e0',
  underline: '#E0FB8A',
  shadow: 'rgba(0, 0, 0, 0.08)',
  warning: '#FFB020',
  critical: '#FF5A5F',
  accentGlow: 'rgba(224,251,138,0.22)',
  black: '#000000',
  white: '#FFFFFF',
} as const;

export const darkColors = {
  primary: '#E7E7E7',
  accent: '#E0FB8A',
  accentPressed: '#CFF27A',
  accentSubtle: 'rgba(224,251,138,0.10)',
  background: '#151515',
  surface: '#1C1C1C',
  surface2: '#232323',
  card: '#1C1C1C',
  text: {
    primary: '#E7E7E7',
    secondary: '#C9C9C8',
    disabled: '#8C8C8C',
    accent: '#E0FB8A',
  },
  node: {
    start: '#66BB6A',
    funding: '#42A5F5',
    crisis: '#FFB020',
    shutdown: '#FF5A5F',
  },
  border: '#2A2A2A',
  stroke: '#2A2A2A',
  underline: '#E0FB8A',
  shadow: 'rgba(0, 0, 0, 0.6)',
  warning: '#FFB020',
  critical: '#FF5A5F',
  accentGlow: 'rgba(224,251,138,0.22)',
  black: '#000000',
  white: '#FFFFFF',
} as const;

// Default to dark theme
export const colors = darkColors;

export interface Colors {
  primary: string;
  accent: string;
  accentPressed: string;
  accentSubtle: string;
  background: string;
  surface: string;
  surface2: string;
  card: string;
  text: {
    primary: string;
    secondary: string;
    disabled: string;
    accent: string;
  };
  node: {
    start: string;
    funding: string;
    crisis: string;
    shutdown: string;
  };
  border: string;
  stroke: string;
  underline: string;
  shadow: string;
  warning: string;
  critical: string;
  accentGlow: string;
  black: string;
  white: string;
}
