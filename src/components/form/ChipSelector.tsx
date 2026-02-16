import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useTheme} from '@hooks/index';
import {typography} from '@constants/index';

interface ChipOption {
  key: string;
  label: string;
}

interface ChipSelectorProps {
  options: ChipOption[];
  selected: string;
  onSelect: (key: string) => void;
  multiSelect?: boolean;
  selectedKeys?: string[];
  onMultiSelect?: (keys: string[]) => void;
}

export function ChipSelector({
  options,
  selected,
  onSelect,
}: ChipSelectorProps) {
  const colors = useTheme();

  return (
    <View style={styles.container}>
      {options.map(option => {
        const isSelected = selected === option.key;
        return (
          <TouchableOpacity
            key={option.key}
            style={[
              styles.chip,
              {
                backgroundColor: isSelected
                  ? colors.accent
                  : colors.surface,
                borderColor: isSelected ? colors.accent : colors.stroke,
              },
            ]}
            onPress={() => onSelect(option.key)}
            activeOpacity={0.7}>
            <Text
              style={[
                styles.chipText,
                {
                  color: isSelected ? '#161616' : colors.text.secondary,
                },
              ]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
  },
  chipText: {
    ...typography.caption,
  },
});
