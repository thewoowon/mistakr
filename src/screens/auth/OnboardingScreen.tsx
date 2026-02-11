import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  FlatList,
  ViewToken,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { typography } from '../../constants';
import { useTheme } from '../../hooks/useTheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface IconProps {
  colors: ReturnType<typeof useTheme>;
}

function GraphIcon({ colors }: IconProps) {
  return (
    <Svg width={120} height={120} viewBox="0 0 120 120">
      <Circle cx={30} cy={60} r={12} fill={colors.node.start} />
      <Circle cx={60} cy={40} r={12} fill={colors.node.funding} />
      <Circle cx={90} cy={60} r={12} fill={colors.node.crisis} />
      <Circle cx={60} cy={80} r={12} fill={colors.node.shutdown} />
      <Path d="M42 60 L48 45" stroke={colors.stroke} strokeWidth={2} />
      <Path d="M72 45 L78 55" stroke={colors.stroke} strokeWidth={2} />
      <Path d="M48 75 L78 65" stroke={colors.stroke} strokeWidth={2} />
    </Svg>
  );
}

function TimelineIcon({ colors }: IconProps) {
  return (
    <Svg width={120} height={120} viewBox="0 0 120 120">
      <Rect x={10} y={55} width={100} height={6} rx={3} fill={colors.border} />
      <Rect x={10} y={55} width={60} height={6} rx={3} fill={colors.accent} />
      <Circle cx={70} cy={58} r={10} fill={colors.accent} />
      <Circle cx={20} cy={58} r={6} fill={colors.node.start} />
      <Circle cx={45} cy={58} r={6} fill={colors.node.funding} />
      <Circle cx={95} cy={58} r={6} fill={colors.node.shutdown} />
    </Svg>
  );
}

function LearningIcon({ colors }: IconProps) {
  return (
    <Svg width={120} height={120} viewBox="0 0 120 120">
      <Rect x={25} y={30} width={70} height={60} rx={8} fill={colors.surface} stroke={colors.stroke} strokeWidth={2} />
      <Path d="M35 50 L85 50" stroke={colors.text.disabled} strokeWidth={2} />
      <Path d="M35 62 L75 62" stroke={colors.text.disabled} strokeWidth={2} />
      <Path d="M35 74 L65 74" stroke={colors.text.disabled} strokeWidth={2} />
      <Circle cx={85} cy={80} r={15} fill={colors.accent} />
      <Path d="M80 80 L84 84 L92 76" stroke={colors.background} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

interface OnboardingSlide {
  id: string;
  title: string;
  description: string;
  iconType: 'graph' | 'timeline' | 'learning';
}

const SLIDES: OnboardingSlide[] = [
  {
    id: '1',
    title: '실패도 자산이에요',
    description: '실제 스타트업 실패 사례를\n한눈에 볼 수 있는 그래프로 정리했어요',
    iconType: 'graph',
  },
  {
    id: '2',
    title: '타임라인으로 쭉 보세요',
    description: '어떤 일이 있었는지\n시간순으로 따라가 볼 수 있어요',
    iconType: 'timeline',
  },
  {
    id: '3',
    title: '같은 실수, 반복하지 마세요',
    description: '남의 실패에서 배우면\n내 성공 확률이 올라가요',
    iconType: 'learning',
  },
];

interface OnboardingScreenProps {
  onComplete: () => void;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const insets = useSafeAreaInsets();
  const colors = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setCurrentIndex(viewableItems[0].index);
      }
    }
  ).current;

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const renderIcon = (iconType: OnboardingSlide['iconType']) => {
    switch (iconType) {
      case 'graph':
        return <GraphIcon colors={colors} />;
      case 'timeline':
        return <TimelineIcon colors={colors} />;
      case 'learning':
        return <LearningIcon colors={colors} />;
    }
  };

  const renderSlide = ({ item }: { item: OnboardingSlide }) => (
    <View style={styles.slide}>
      <View style={[styles.iconContainer, { backgroundColor: colors.surface, borderColor: colors.stroke }]}>
        {renderIcon(item.iconType)}
      </View>
      <Text style={[styles.title, { color: colors.text.primary }]}>{item.title}</Text>
      <Text style={[styles.description, { color: colors.text.secondary }]}>{item.description}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.background }]}>
      {/* Skip Button */}
      <Pressable style={styles.skipButton} onPress={handleSkip}>
        <Text style={[styles.skipText, { color: colors.text.secondary }]}>건너뛰기</Text>
      </Pressable>

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        scrollEventThrottle={16}
      />

      {/* Pagination */}
      <View style={styles.pagination}>
        {SLIDES.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: colors.stroke },
              currentIndex === index && [styles.dotActive, { backgroundColor: colors.accent }],
            ]}
          />
        ))}
      </View>

      {/* Bottom Section */}
      <View style={[styles.bottomSection, { paddingBottom: insets.bottom + 16 }]}>
        <Pressable
          style={[styles.nextButton, { backgroundColor: colors.accent, shadowColor: colors.accentGlow }]}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>
            {currentIndex === SLIDES.length - 1 ? '시작하기' : '다음'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skipButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 10,
    padding: 8,
  },
  skipText: {
    ...typography.body,
  },
  slide: {
    width: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    width: 180,
    height: 180,
    borderRadius: 90,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    borderWidth: 1,
  },
  title: {
    ...typography.h1,
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    ...typography.body,
    textAlign: 'center',
    lineHeight: 24,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 32,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    width: 24,
  },
  bottomSection: {
    paddingHorizontal: 24,
  },
  nextButton: {
    paddingVertical: 16,
    height: 56,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 6,
  },
  nextButtonText: {
    ...typography.body,
    color: '#161616',
    fontWeight: '700',
  },
});
