import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {useTheme} from '@hooks/index';
import {typography} from '@constants/index';
import type {StreamingPhase} from '../../types/Consulting';

interface AnalyzingOverlayProps {
  phase: StreamingPhase;
  progress: number;
}

const PHASE_MESSAGES: Record<string, string> = {
  matching: '유사한 실패 사례를 찾고 있어요...',
  analyzing: '리스크를 분석하고 있어요...',
  generating: '맞춤 체크리스트를 생성하고 있어요...',
  completed: '분석 완료!',
  failed: '분석 중 오류가 발생했어요',
};

const PHASE_STEPS: Record<string, string> = {
  matching: 'Step 1/3',
  analyzing: 'Step 2/3',
  generating: 'Step 3/3',
  completed: '완료',
  failed: '실패',
};

export function AnalyzingOverlay({phase, progress}: AnalyzingOverlayProps) {
  const colors = useTheme();

  if (phase === 'idle' || phase === 'completed') {
    return null;
  }

  return (
    <View style={[styles.overlay, {backgroundColor: colors.background}]}>
      <ActivityIndicator size="large" color={colors.accent} />
      <Text style={[styles.message, {color: colors.text.primary}]}>
        {PHASE_MESSAGES[phase] || '분석 중...'}
      </Text>
      <View style={[styles.progressBg, {backgroundColor: colors.stroke}]}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${progress}%`,
              backgroundColor: colors.accent,
            },
          ]}
        />
      </View>
      <Text style={[styles.step, {color: colors.text.disabled}]}>
        {PHASE_STEPS[phase] || ''}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    zIndex: 100,
  },
  message: {
    ...typography.h2,
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 24,
  },
  progressBg: {
    width: '100%',
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  step: {
    ...typography.caption,
    marginTop: 12,
  },
});
