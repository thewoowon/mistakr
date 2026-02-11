import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { colors, typography } from '../constants';

interface ErrorViewProps {
  message?: string;
  onRetry?: () => void;
}

function AlertIcon() {
  return (
    <Svg width={48} height={48} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" stroke={colors.accent} strokeWidth={2} />
      <Path
        d="M12 8v4M12 16h.01"
        stroke={colors.accent}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function ErrorView({
  message = 'Something went wrong',
  onRetry,
}: ErrorViewProps) {
  return (
    <View style={styles.container}>
      <AlertIcon />
      <Text style={styles.title}>Oops!</Text>
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <Pressable style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryText}>Try Again</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    ...typography.h2,
    color: colors.text.primary,
    marginTop: 16,
  },
  message: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: 8,
  },
  retryButton: {
    marginTop: 24,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: colors.accent,
    borderRadius: 20,
  },
  retryText: {
    ...typography.body,
    color: '#161616',
    fontWeight: '600',
  },
});
