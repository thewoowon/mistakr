import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useTheme} from '@hooks/index';
import {typography} from '@constants/index';

interface StepperInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export function StepperInput({
  value,
  onChange,
  min = 0,
  max = 999,
  step = 1,
}: StepperInputProps) {
  const colors = useTheme();

  const handleDecrease = () => {
    const next = value - step;
    if (next >= min) {
      onChange(next);
    }
  };

  const handleIncrease = () => {
    const next = value + step;
    if (next <= max) {
      onChange(next);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: colors.surface, borderColor: colors.stroke},
      ]}>
      <TouchableOpacity
        style={[styles.button, {borderRightColor: colors.stroke}]}
        onPress={handleDecrease}
        disabled={value <= min}>
        <Text
          style={[
            styles.buttonText,
            {color: value <= min ? colors.text.disabled : colors.text.primary},
          ]}>
          -
        </Text>
      </TouchableOpacity>
      <View style={styles.valueContainer}>
        <Text style={[styles.value, {color: colors.text.primary}]}>
          {value}
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.button, {borderLeftColor: colors.stroke}]}
        onPress={handleIncrease}
        disabled={value >= max}>
        <Text
          style={[
            styles.buttonText,
            {color: value >= max ? colors.text.disabled : colors.accent},
          ]}>
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    height: 48,
  },
  button: {
    width: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderLeftWidth: 1,
  },
  buttonText: {
    fontSize: 22,
    fontFamily: 'Pretendard-Medium',
  },
  valueContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    ...typography.body,
    fontFamily: 'Pretendard-SemiBold',
  },
});
