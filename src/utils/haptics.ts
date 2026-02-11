import { Platform } from 'react-native';

// Light haptic feedback for selections/taps
export function lightHaptic() {
  if (Platform.OS === 'ios') {
    try {
      const { selectionAsync } = require('expo-haptics');
      selectionAsync?.();
    } catch {
      // expo-haptics not available, use native
      const ReactNativeHapticFeedback = require('react-native-haptic-feedback');
      ReactNativeHapticFeedback?.trigger?.('selection');
    }
  }
}

// Medium haptic feedback for confirmations
export function mediumHaptic() {
  if (Platform.OS === 'ios') {
    try {
      const { impactAsync, ImpactFeedbackStyle } = require('expo-haptics');
      impactAsync?.(ImpactFeedbackStyle?.Medium);
    } catch {
      const ReactNativeHapticFeedback = require('react-native-haptic-feedback');
      ReactNativeHapticFeedback?.trigger?.('impactMedium');
    }
  }
}

// Success haptic feedback
export function successHaptic() {
  if (Platform.OS === 'ios') {
    try {
      const { notificationAsync, NotificationFeedbackType } = require('expo-haptics');
      notificationAsync?.(NotificationFeedbackType?.Success);
    } catch {
      const ReactNativeHapticFeedback = require('react-native-haptic-feedback');
      ReactNativeHapticFeedback?.trigger?.('notificationSuccess');
    }
  }
}

// Error haptic feedback
export function errorHaptic() {
  if (Platform.OS === 'ios') {
    try {
      const { notificationAsync, NotificationFeedbackType } = require('expo-haptics');
      notificationAsync?.(NotificationFeedbackType?.Error);
    } catch {
      const ReactNativeHapticFeedback = require('react-native-haptic-feedback');
      ReactNativeHapticFeedback?.trigger?.('notificationError');
    }
  }
}
