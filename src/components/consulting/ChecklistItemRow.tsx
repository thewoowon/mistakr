import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useTheme} from '@hooks/index';
import {typography} from '@constants/index';
import type {ChecklistItem, ChecklistPriority} from '../../types/Consulting';

interface ChecklistItemRowProps {
  item: ChecklistItem;
  onToggle: () => void;
}

const PRIORITY_COLORS: Record<ChecklistPriority, string> = {
  critical: '#FF5A5F',
  high: '#FFA726',
  medium: '#FFB020',
  low: '#66BB6A',
};

const PRIORITY_LABELS: Record<ChecklistPriority, string> = {
  critical: '긴급',
  high: '높음',
  medium: '보통',
  low: '낮음',
};

export function ChecklistItemRow({item, onToggle}: ChecklistItemRowProps) {
  const colors = useTheme();
  const priorityColor = PRIORITY_COLORS[item.priority];

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {borderBottomColor: colors.stroke},
      ]}
      onPress={onToggle}
      activeOpacity={0.7}>
      <View
        style={[
          styles.checkbox,
          {
            borderColor: item.isCompleted ? colors.accent : colors.stroke,
            backgroundColor: item.isCompleted
              ? colors.accent
              : 'transparent',
          },
        ]}>
        {item.isCompleted && (
          <Text style={styles.checkmark}>✓</Text>
        )}
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <View
            style={[
              styles.priorityBadge,
              {backgroundColor: priorityColor + '20'},
            ]}>
            <Text style={[styles.priorityText, {color: priorityColor}]}>
              {PRIORITY_LABELS[item.priority]}
            </Text>
          </View>
          {item.deadline && (
            <Text style={[styles.deadline, {color: colors.text.disabled}]}>
              {item.deadline}
            </Text>
          )}
        </View>
        <Text
          style={[
            styles.action,
            {
              color: item.isCompleted
                ? colors.text.disabled
                : colors.text.primary,
              textDecorationLine: item.isCompleted ? 'line-through' : 'none',
            },
          ]}>
          {item.action}
        </Text>
        <Text style={[styles.reason, {color: colors.text.secondary}]}>
          {item.reason}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 16,
    borderBottomWidth: 1,
    gap: 12,
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkmark: {
    color: '#161616',
    fontSize: 14,
    fontFamily: 'Pretendard-Bold',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  priorityText: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 11,
  },
  deadline: {
    ...typography.micro,
  },
  action: {
    ...typography.body,
    marginBottom: 4,
  },
  reason: {
    ...typography.caption,
    lineHeight: 18,
  },
});
