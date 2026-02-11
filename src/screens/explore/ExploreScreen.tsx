import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path, Circle } from 'react-native-svg';
import { typography } from '../../constants';
import { useTheme } from '../../hooks/useTheme';
import { FlexCaseCard } from '../../components';
import { mockCases } from '../../data/mockCases';
import { Case } from '../../types';
import { lightHaptic } from '../../utils';
import { MagnifierIcon } from '@components/Icons';
import { failureTypeMap, industryMap } from '../../types/Case';

const INDUSTRIES = [
  'All',
  'Healthcare Tech',
  'Real Estate Tech',
  'Entertainment',
  'Cryptocurrency',
  'Consumer Tech',
  'E-commerce',
  'Enterprise SaaS',
  'Clean Tech',
  'Fintech',
];

const FAILURE_TYPES = [
  'All',
  'fraud',
  'technology',
  'market',
  'governance',
  'product',
];

const FUNDING_RANGES = [
  { label: 'All', min: 0, max: Infinity },
  { label: '< $100M', min: 0, max: 100000000 },
  { label: '$100M - $1B', min: 100000000, max: 1000000000 },
  { label: '> $1B', min: 1000000000, max: Infinity },
];

function SearchIcon({ color }: { color: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Circle cx="11" cy="11" r="8" stroke={color} strokeWidth={2} />
      <Path
        d="M21 21l-4.35-4.35"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

interface FilterChipProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
  colors: ReturnType<typeof useTheme>;
  variant: 'industry' | 'failure' | 'Investment';
}

function FilterChip({
  label,
  isSelected,
  onPress,
  colors,
  variant,
}: FilterChipProps) {
  const handlePress = () => {
    lightHaptic();
    onPress();
  };

  return (
    <Pressable
      style={[
        styles.filterChip,
        { backgroundColor: colors.surface2, borderColor: colors.stroke },
        isSelected && {
          backgroundColor: colors.accent,
          borderColor: colors.accent,
        },
      ]}
      onPress={handlePress}
    >
      <Text
        style={[
          styles.filterChipText,
          { color: colors.text.secondary },
          isSelected && { color: '#161616' },
        ]}
      >
        {variant === 'industry' && label === 'All' ? label : industryMap[label]}
        {variant === 'failure' && label === 'All'
          ? label
          : failureTypeMap[label]}
        {variant === 'Investment' && label}
      </Text>
    </Pressable>
  );
}

export function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const colors = useTheme();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedFailureType, setSelectedFailureType] = useState('All');
  const [selectedFundingRange, setSelectedFundingRange] = useState(
    FUNDING_RANGES[0],
  );

  const filteredCases = useMemo(() => {
    return mockCases.filter(c => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          c.companyName.toLowerCase().includes(query) ||
          c.industry.toLowerCase().includes(query) ||
          c.shortDescription.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      if (selectedIndustry !== 'All' && c.industry !== selectedIndustry) {
        return false;
      }

      if (
        selectedFailureType !== 'All' &&
        !c.failureTypes.includes(selectedFailureType)
      ) {
        return false;
      }

      const funding = c.totalFundingUsd || 0;
      if (
        funding < selectedFundingRange.min ||
        funding > selectedFundingRange.max
      ) {
        return false;
      }

      return true;
    });
  }, [
    searchQuery,
    selectedIndustry,
    selectedFailureType,
    selectedFundingRange,
  ]);

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
      const isLastOdd = filteredCases.length % 2 === 1 && index === filteredCases.length - 1;
      return (
        <View style={[styles.caseItemContainer, isLastOdd && styles.halfWidth]}>
          <FlexCaseCard caseData={item} onPress={handleCasePress} />
        </View>
      );
    },
    [handleCasePress, filteredCases.length],
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

      {/* Filters */}
      <View style={styles.filtersSection}>
        {/* Industry Filter */}
        <View style={styles.filterGroup}>
          <Text style={styles.filterLabel}>산업별</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterChips}
          >
            {INDUSTRIES.map(industry => (
              <FilterChip
                key={industry}
                label={industry}
                isSelected={selectedIndustry === industry}
                onPress={() => setSelectedIndustry(industry)}
                colors={colors}
                variant="industry"
              />
            ))}
          </ScrollView>
        </View>

        {/* Failure Type Filter */}
        <View style={styles.filterGroup}>
          <Text style={styles.filterLabel}>실패유형</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterChips}
          >
            {FAILURE_TYPES.map(type => (
              <FilterChip
                key={type}
                label={type}
                isSelected={selectedFailureType === type}
                onPress={() => setSelectedFailureType(type)}
                colors={colors}
                variant="failure"
              />
            ))}
          </ScrollView>
        </View>

        {/* Funding Range Filter */}
        <View style={styles.filterGroup}>
          <Text style={styles.filterLabel}>투자금액</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterChips}
          >
            {FUNDING_RANGES.map(range => (
              <FilterChip
                key={range.label}
                label={range.label}
                isSelected={selectedFundingRange.label === range.label}
                onPress={() => setSelectedFundingRange(range)}
                colors={colors}
                variant="Investment"
              />
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Results */}
      <View style={[styles.resultsHeader, { borderTopColor: colors.stroke }]}>
        <Text style={[styles.resultsCount, { color: colors.text.secondary }]}>
          {filteredCases.length}{' '}
          {filteredCases.length === 1 ? 'result' : 'results'}
        </Text>
      </View>

      <FlatList
        data={filteredCases}
        renderItem={renderCaseItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.text.secondary }]}>
              No cases found
            </Text>
            <Text
              style={[styles.emptySubtext, { color: colors.text.disabled }]}
            >
              Try adjusting your filters
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    ...typography.h1,
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
  filtersSection: {
    paddingBottom: 8,
  },
  filterGroup: {
    marginBottom: 12,
  },
  filterLabel: {
    fontSize: 14,
    fontFamily: 'Pretendard-Bold',
    paddingHorizontal: 16,
    marginBottom: 10,
    color: 'white',
  },
  filterChips: {
    paddingHorizontal: 20,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    backgroundColor: '#232323',
  },
  filterChipText: {
    fontSize: 12,
    fontFamily: 'Pretendard-Medium',
    lineHeight: 20,
    color: '#EEEEEE',
  },
  resultsHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
  },
  resultsCount: {
    ...typography.caption,
  },
  listContent: {
    padding: 16,
    paddingTop: 8,
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
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    ...typography.h3,
  },
  emptySubtext: {
    ...typography.body,
    marginTop: 4,
  },
});
