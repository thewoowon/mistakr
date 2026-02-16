import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '@hooks/index';
import {typography} from '@constants/index';
import type {TimelinePrediction} from '../../types/Consulting';

interface TimelinePredictionCardProps {
  predictions: TimelinePrediction[];
}

export function TimelinePredictionCard({
  predictions,
}: TimelinePredictionCardProps) {
  const colors = useTheme();

  return (
    <View style={styles.container}>
      {predictions.map((prediction, index) => (
        <View key={index} style={styles.item}>
          <View style={styles.timeline}>
            <View
              style={[styles.dot, {backgroundColor: colors.accent}]}
            />
            {index < predictions.length - 1 && (
              <View style={[styles.line, {backgroundColor: colors.stroke}]} />
            )}
          </View>
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={[styles.month, {color: colors.accent}]}>
                {prediction.predictedMonth}개월
              </Text>
              <Text style={[styles.confidence, {color: colors.text.disabled}]}>
                신뢰도 {Math.round(prediction.confidence * 100)}%
              </Text>
            </View>
            <Text style={[styles.milestone, {color: colors.text.primary}]}>
              {prediction.milestone}
            </Text>
            <Text style={[styles.description, {color: colors.text.secondary}]}>
              {prediction.description}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 0,
  },
  item: {
    flexDirection: 'row',
    gap: 16,
  },
  timeline: {
    alignItems: 'center',
    width: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 4,
  },
  line: {
    width: 2,
    flex: 1,
    marginVertical: 4,
  },
  content: {
    flex: 1,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  month: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 14,
  },
  confidence: {
    ...typography.micro,
  },
  milestone: {
    ...typography.body,
    fontFamily: 'Pretendard-SemiBold',
    marginBottom: 4,
  },
  description: {
    ...typography.caption,
    lineHeight: 20,
  },
});
