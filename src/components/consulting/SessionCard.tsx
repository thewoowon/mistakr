import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useTheme} from '@hooks/index';
import {typography} from '@constants/index';
import type {SessionListItem} from '../../types/Consulting';

interface SessionCardProps {
  session: SessionListItem;
  onPress: () => void;
}

function getRiskColor(score: number): string {
  if (score <= 30) {return '#66BB6A';}
  if (score <= 60) {return '#FFB020';}
  if (score <= 80) {return '#FFA726';}
  return '#FF5A5F';
}

export function SessionCard({session, onPress}: SessionCardProps) {
  const colors = useTheme();
  const riskScore = session.riskOverall ?? 0;
  const riskColor = getRiskColor(riskScore);

  const dateStr = new Date(session.createdAt).toLocaleDateString('ko-KR', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {backgroundColor: colors.surface, borderColor: colors.stroke},
      ]}
      onPress={onPress}
      activeOpacity={0.7}>
      <View style={styles.header}>
        {session.riskOverall != null && (
          <View style={[styles.scoreBadge, {backgroundColor: riskColor + '20'}]}>
            <Text style={[styles.scoreText, {color: riskColor}]}>
              {riskScore}
            </Text>
          </View>
        )}
        <Text style={[styles.date, {color: colors.text.disabled}]}>
          {dateStr}
        </Text>
      </View>
      <Text
        style={[styles.name, {color: colors.text.primary}]}
        numberOfLines={1}>
        {session.ideaName}
      </Text>
      <View style={styles.footer}>
        <Text style={[styles.meta, {color: colors.text.disabled}]}>
          {session.status === 'completed' ? '분석 완료' : '분석 중'}
        </Text>
        {session.checklistTotal > 0 && (
          <Text style={[styles.meta, {color: colors.text.disabled}]}>
            체크리스트 {session.checklistCompleted}/{session.checklistTotal}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 240,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  scoreBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  scoreText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 14,
  },
  date: {
    ...typography.micro,
  },
  name: {
    ...typography.h3,
    marginBottom: 6,
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
  },
  meta: {
    ...typography.micro,
  },
});
