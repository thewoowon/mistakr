import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../constants';
import { useBookmarksStore } from '../store';

interface BookmarkButtonProps {
  caseId: string;
  size?: number;
}

export function BookmarkButton({ caseId, size = 24 }: BookmarkButtonProps) {
  const { bookmarkedCaseIds, toggleBookmark } = useBookmarksStore();
  const isBookmarked = bookmarkedCaseIds.includes(caseId);

  return (
    <Pressable
      style={styles.container}
      onPress={() => toggleBookmark(caseId)}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <Path
          d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"
          fill={isBookmarked ? colors.accent : 'none'}
          stroke={isBookmarked ? colors.accent : colors.text.secondary}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
});
