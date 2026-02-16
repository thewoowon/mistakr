import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  RefreshControl,
  Image,
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { typography } from '../../constants';
import { useTheme } from '../../hooks/useTheme';
import { CompactCaseCard, FeaturedCaseCard } from '../../components';
import { mockCases } from '../../data/mockCases';
import { HomeStackParamList } from '../../navigation/types';
import { lightHaptic } from '../../utils';
import { MagnifierIcon } from '@components/Icons';
import LinearGradient from 'react-native-linear-gradient';
import { industryMap } from '../../types/Case';

type NavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Home'>;

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

export function HomeScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const colors = useTheme();
  const [refreshing, setRefreshing] = useState(false);

  const featuredCase = mockCases[0];
  const recentCases = mockCases.slice(1);

  const [industries, setIndustries] = useState<Array<string>>(['All']);

  const handleCasePress = useCallback(
    (caseId: string) => {
      navigation.navigate('CaseDetail', { caseId });
    },
    [navigation],
  );

  const handleRefresh = useCallback(async () => {
    lightHaptic();
    setRefreshing(true);
    // Simulate API call
    await new Promise<void>(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  }, []);

  const handleSearchPress = useCallback(() => {
    (navigation as any).navigate('ExploreTab', {
      screen: 'Explore',
    });
  }, [navigation]);

  const searchBarHeight = insets.top + 16 + 44 + 16;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            opacity: 0.45,
          },
        ]}
      >
        <View style={{ position: 'relative' }}>
          <Image
            source={{ uri: featuredCase.imageUrl }}
            style={{ width: '100%', aspectRatio: 540 / 780 }}
            resizeMode="cover"
            blurRadius={15}
          />
          <LinearGradient
            colors={[
              'rgba(21, 21, 21, 0)',
              'rgba(21, 21, 21, 0.15)',
              'rgba(21, 21, 21, 0.30)',
              'rgba(21, 21, 21, 0.60)',
              'rgba(21, 21, 21, 1)',
            ]}
            locations={[0, 0.15, 0.3, 0.5, 1]}
            style={{
              position: 'absolute',
              width: '100%',
              height: 173,
              bottom: 0,
            }}
          />
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingTop: insets.top + 16 },
        ]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.accent}
            colors={[colors.accent]}
            progressViewOffset={insets.top}
          />
        }
      >
        <View style={[styles.searchContainer]}>
          <Pressable
            style={styles.searchInputWrapper}
            onPress={handleSearchPress}
          >
            <MagnifierIcon color={'#A4A4A4'} />
            <Text style={styles.searchPlaceholder}>회사 이름으로 검색하기</Text>
          </Pressable>
        </View>
        {/* Featured Case */}
        <View style={styles.section}>
          <View style={{ paddingHorizontal: 20 }}>
            <FeaturedCaseCard
              caseData={featuredCase}
              onPress={handleCasePress}
            />
          </View>
        </View>

        {/* Recent Cases */}
        <View style={styles.section}>
          <FlatList
            data={recentCases}
            renderItem={({ item }) => (
              <CompactCaseCard caseData={item} onPress={handleCasePress} />
            )}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
            ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
          />
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>산업별 탐색</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {INDUSTRIES.map(industry => {
              const isSelected = industries.includes(industry);
              return (
                <Pressable
                  key={industry}
                  style={[
                    styles.categoryChip,
                    isSelected && styles.categoryChipSelected,
                  ]}
                  onPress={() => {
                    if (isSelected) {
                      setIndustries(industries.filter(i => i !== industry));
                    } else {
                      setIndustries([...industries, industry]);
                    }
                  }}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      isSelected && styles.categoryTextSelected,
                    ]}
                  >
                    {industry === 'All' ? industry : industryMap[industry]}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    ...typography.h1,
  },
  subtitle: {
    ...typography.body,
    marginTop: 4,
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
  searchPlaceholder: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
    color: '#A4A4A4',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitleContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    color: '#FFFFFF',
  },
  underlineStroke: {
    height: 3,
    borderRadius: 2,
    marginTop: 4,
    width: '60%',
  },
  horizontalList: {
    paddingHorizontal: 20,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    backgroundColor: '#232323',
  },
  categoryText: {
    fontSize: 12,
    fontFamily: 'Pretendard-Medium',
    lineHeight: 20,
    color: '#EEEEEE',
  },
  categoryChipSelected: {
    backgroundColor: '#E0FB8A',
  },
  categoryTextSelected: {
    color: '#1A1A1A',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
