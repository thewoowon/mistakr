import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useTheme} from '@hooks/index';
import {typography} from '@constants/index';
import type {MatchedCase} from '../../types/Consulting';

interface MatchedCaseCardProps {
  matchedCase: MatchedCase;
  onPress?: () => void;
}

export function MatchedCaseCard({matchedCase, onPress}: MatchedCaseCardProps) {
  const colors = useTheme();
  const percentage = Math.round(matchedCase.similarityScore * 100);

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {backgroundColor: colors.surface, borderColor: colors.stroke},
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!onPress}>
      <View style={styles.header}>
        <Text style={[styles.name, {color: colors.text.primary}]}>
          {matchedCase.companyName}
        </Text>
        <View style={[styles.badge, {backgroundColor: colors.accent + '20'}]}>
          <Text style={[styles.badgeText, {color: colors.accent}]}>
            {percentage}% 유사
          </Text>
        </View>
      </View>
      <Text style={[styles.industry, {color: colors.text.disabled}]}>
        {matchedCase.industry}
      </Text>

      <View style={styles.reasons}>
        {matchedCase.matchReasons.map((reason, i) => (
          <View
            key={i}
            style={[styles.reasonChip, {backgroundColor: colors.stroke}]}>
            <Text style={[styles.reasonText, {color: colors.text.secondary}]}>
              {reason}
            </Text>
          </View>
        ))}
      </View>

      {matchedCase.keyLessons.length > 0 && (
        <View style={styles.lessons}>
          <Text style={[styles.lessonsTitle, {color: colors.text.secondary}]}>
            핵심 교훈
          </Text>
          {matchedCase.keyLessons.map((lesson, i) => (
            <Text
              key={i}
              style={[styles.lessonText, {color: colors.text.primary}]}>
              • {lesson}
            </Text>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    ...typography.h3,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeText: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 12,
  },
  industry: {
    ...typography.caption,
    marginBottom: 12,
  },
  reasons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  reasonChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  reasonText: {
    ...typography.micro,
  },
  lessons: {
    gap: 4,
  },
  lessonsTitle: {
    ...typography.caption,
    fontFamily: 'Pretendard-SemiBold',
    marginBottom: 4,
  },
  lessonText: {
    ...typography.caption,
    lineHeight: 20,
  },
});
