import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography } from '../constants';

interface EmptyViewProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function EmptyView({ icon, title, subtitle }: EmptyViewProps) {
  return (
    <View style={styles.container}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
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
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    ...typography.h3,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body,
    color: colors.text.disabled,
    textAlign: 'center',
    marginTop: 8,
  },
});
