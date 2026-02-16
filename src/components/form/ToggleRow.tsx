import React from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';
import {useTheme} from '@hooks/index';
import {typography} from '@constants/index';

interface ToggleRowProps {
  label: string;
  value: boolean;
  onToggle: (value: boolean) => void;
}

export function ToggleRow({label, value, onToggle}: ToggleRowProps) {
  const colors = useTheme();

  return (
    <View
      style={[
        styles.container,
        {borderBottomColor: colors.stroke},
      ]}>
      <Text style={[styles.label, {color: colors.text.primary}]}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{false: colors.stroke, true: colors.accent}}
        thumbColor="#FFFFFF"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  label: {
    ...typography.body,
    flex: 1,
  },
});
