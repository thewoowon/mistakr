import { TextStyle } from 'react-native';

// Design System Typography
// Pretendard font weights: 100-900
// Font scale based on design system spec

export const typography = {
  // Display - 32/40, w800
  display: {
    fontSize: 32,
    fontFamily: 'Pretendard-ExtraBold',
    lineHeight: 40,
    letterSpacing: -0.5,
  } as TextStyle,
  // H1 - 24/30, w700
  h1: {
    fontSize: 24,
    fontFamily: 'Pretendard-Bold',
    lineHeight: 30,
    letterSpacing: -0.3,
  } as TextStyle,
  // H2 - 18/24, w700
  h2: {
    fontSize: 18,
    fontFamily: 'Pretendard-Bold',
    lineHeight: 24,
  } as TextStyle,
  // H3 - kept for compatibility
  h3: {
    fontSize: 18,
    fontFamily: 'Pretendard-SemiBold',
    lineHeight: 24,
  } as TextStyle,
  // Body - 15/22, w500
  body: {
    fontSize: 15,
    fontFamily: 'Pretendard-Medium',
    lineHeight: 22,
  } as TextStyle,
  // Caption - 13/18, w500
  caption: {
    fontSize: 13,
    fontFamily: 'Pretendard-Medium',
    lineHeight: 18,
  } as TextStyle,
  // Micro - 11/14, w500
  micro: {
    fontSize: 11,
    fontFamily: 'Pretendard-Medium',
    lineHeight: 14,
  } as TextStyle,
  // Small - alias for micro (backwards compatibility)
  small: {
    fontSize: 11,
    fontFamily: 'Pretendard-Medium',
    lineHeight: 14,
  } as TextStyle,
} as const;

export type Typography = typeof typography;
