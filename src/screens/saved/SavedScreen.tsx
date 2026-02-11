import React, { useCallback, useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { typography } from '../../constants';
import { useTheme } from '../../hooks/useTheme';
import { FlexCaseCard } from '../../components';
import { useBookmarksStore } from '../../store';
import { mockCases } from '../../data/mockCases';
import { Case } from '../../types';
import { HomeStackParamList } from '../../navigation/types';
import { BookmarkIcon, MagnifierIcon } from '@components/Icons';

type NavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Home'>;

export function SavedScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const colors = useTheme();
  const { bookmarkedCaseIds } = useBookmarksStore();
  const [searchQuery, setSearchQuery] = useState('');

  const savedCases = useMemo(() => {
    const bookmarked = mockCases.filter(c =>
      bookmarkedCaseIds.includes(c.caseId),
    );

    if (!searchQuery) return bookmarked;

    const query = searchQuery.toLowerCase();
    return bookmarked.filter(
      c =>
        c.companyName.toLowerCase().includes(query) ||
        c.koreanCompanyName?.toLowerCase().includes(query) ||
        c.industry.toLowerCase().includes(query),
    );
  }, [bookmarkedCaseIds, searchQuery]);

  const handleCasePress = useCallback(
    (caseId: string) => {
      (navigation as any).navigate('HomeTab', {
        screen: 'CaseDetail',
        params: { caseId },
      });
    },
    [navigation],
  );

  const renderCaseItem = useCallback(
    ({ item, index }: { item: Case; index: number }) => {
      const isLastOdd = savedCases.length % 2 === 1 && index === savedCases.length - 1;
      return (
        <View style={[styles.caseItemContainer, isLastOdd && styles.halfWidth]}>
          <FlexCaseCard caseData={item} onPress={handleCasePress} />
        </View>
      );
    },
    [handleCasePress, savedCases.length],
  );

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + 16, backgroundColor: colors.background },
      ]}
    >
      {/* Search Bar */}
      <View style={[styles.searchContainer]}>
        <View style={styles.searchInputWrapper}>
          <MagnifierIcon color={'#A4A4A4'} />
          <TextInput
            style={[styles.searchInput, { color: '#FFFFFF' }]}
            placeholder="회사 이름으로 검색하기"
            placeholderTextColor={'#A4A4A4'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {savedCases.length > 0 ? (
        <FlatList
          data={savedCases}
          renderItem={renderCaseItem}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <BookmarkIcon color={colors.text.accent} width={48} height={48} />
          <Text style={[styles.emptyTitle, { color: colors.text.secondary }]}>
            아직 케이스가 없어요
          </Text>
          <Text style={[styles.emptySubtext, { color: colors.text.disabled }]}>
            나중에 볼 수 있도록 케이스를 저장하세요!
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  title: {
    ...typography.h1,
  },
  count: {
    ...typography.caption,
  },
  listContent: {
    padding: 16,
    paddingTop: 0,
  },
  columnWrapper: {
    gap: 12,
  },
  caseItemContainer: {
    flex: 1,
    marginBottom: 12,
  },
  halfWidth: {
    flex: 0.5,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 16,
    fontFamily: 'Pretendard-SemiBold',
    lineHeight: 20,
    marginTop: 10,
  },
  emptySubtext: {
    fontSize: 12,
    fontFamily: 'Pretendard-Regular',
    lineHeight: 16,
    marginTop: 4,
    textAlign: 'center',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 100,
    borderWidth: 0.5,
    borderColor: '#A4A4A4',
    gap: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  searchInput: {
    flex: 1,
    padding: 0,
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
  },
});
