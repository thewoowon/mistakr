import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from '@hooks/index';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({currentStep, totalSteps}: StepIndicatorProps) {
  const colors = useTheme();

  return (
    <View style={styles.container}>
      {Array.from({length: totalSteps}, (_, i) => (
        <View
          key={i}
          style={[
            styles.step,
            {
              backgroundColor:
                i + 1 <= currentStep ? colors.accent : colors.stroke,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  step: {
    flex: 1,
    height: 3,
    borderRadius: 2,
  },
});
