import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { typography } from '../constants';
import { Case } from '../types';
import { formatFunding, formatYearRange, lightHaptic } from '../utils';
import { failureTypeMap, industryMap } from '../types/Case';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface CaseCardProps {
  caseData: Case;
  onPress: (caseId: string) => void;
}

export function FeaturedCaseCard({ caseData, onPress }: CaseCardProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.98, { damping: 15, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  const handlePress = () => {
    lightHaptic();
    onPress(caseData.caseId);
  };

  return (
    <AnimatedPressable
      style={[styles.featuredContainer, animatedStyle]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
    >
      <View style={[StyleSheet.absoluteFill, { zIndex: 0 }]}>
        <Image
          source={{ uri: caseData.imageUrl }}
          style={{ width: '100%', height: 400 }}
          resizeMode="cover"
        />
      </View>

      <View style={[styles.featuredContent, { zIndex: 2 }]}>
        <View style={[styles.header, { position: 'relative', flex: 1 }]}>
          <View
            style={{
              position: 'absolute',
              right: 0,
            }}
          >
            <Text style={styles.years}>
              {formatYearRange(caseData.foundedYear, caseData.shutdownYear)}
            </Text>
          </View>
          <View
            style={{
              position: 'absolute',
              right: 0,
              top: 4,
            }}
          >
            <Text style={styles.funding}>
              {formatFunding(caseData.totalFundingUsd)}
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.featuredIndustry} numberOfLines={1}>
            {industryMap[caseData.industry]}
          </Text>
          <Text style={styles.featuredCompanyName} numberOfLines={1}>
            {caseData.koreanCompanyName}
          </Text>
          {caseData.shortDescription && (
            <Text style={styles.description} numberOfLines={2}>
              {caseData.shortDescription}
            </Text>
          )}
          <View style={styles.tags}>
            {caseData.failureTypes.slice(0, 3).map(type => (
              <View key={type} style={styles.tag}>
                <Text style={styles.tagText}>{failureTypeMap[type]}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
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
          zIndex: 1,
        }}
      />
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  featuredContainer: {
    position: 'relative',
    borderRadius: 20,
    overflow: 'hidden',
    height: 400,
  },
  featuredContent: {
    flex: 1,
    position: 'relative',
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 6,
  },
  featuredCompanyName: {
    fontSize: 32,
    fontFamily: 'Pretendard-Bold',
    lineHeight: 40,
    color: 'white',
  },
  premiumBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginLeft: 8,
  },
  premiumText: {
    ...typography.small,
    fontWeight: '700',
  },
  industry: {
    ...typography.caption,
    marginBottom: 10,
  },
  featuredIndustry: {
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
    lineHeight: 22,
    color: '#EEEEEE',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  funding: {
    fontSize: 64,
    fontFamily: 'PragatiNarrow-Bold',
    color: '#FFFFFF',
  },
  years: {
    fontSize: 24,
    fontFamily: 'PragatiNarrow-Bold',
    color: '#FFFFFF',
  },
  featuredMeta: {
    color: 'rgba(22, 22, 22, 0.7)',
  },
  description: {
    fontSize: 12,
    fontFamily: 'Pretendard-Medium',
    lineHeight: 18,
    color: '#DDDDDD',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    paddingVertical: 8,
  },
  tag: {
    backgroundColor: '#E0FB8A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  tagText: {
    fontSize: 10,
    fontFamily: 'Pretendard-SemiBold',
    lineHeight: 12,
    color: '#1A1A1A',
    textTransform: 'capitalize',
  },
});
