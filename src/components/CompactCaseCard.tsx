import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { typography } from '../constants';
import { Case } from '../types';
import { formatFunding, formatYearRange, lightHaptic } from '../utils';
import { failureTypeMap, industryMap } from '../types/Case';
import LinearGradient from 'react-native-linear-gradient';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface CaseCardProps {
  caseData: Case;
  onPress: (caseId: string) => void;
}

export function CompactCaseCard({ caseData, onPress }: CaseCardProps) {
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
      style={[styles.container, animatedStyle]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
    >
      <View style={[StyleSheet.absoluteFill, { zIndex: 0 }]}>
        <Image
          source={{ uri: caseData.imageUrl }}
          style={{ width: 190, height: 241 }}
          resizeMode="cover"
        />
      </View>

      <View style={[styles.content, { zIndex: 2 }]}>
        <View style={[styles.header, { position: 'relative', flex: 1 }]}>
          {caseData.isPremium && (
            <View
              style={[
                {
                  position: 'absolute',
                  right: 0,
                },
                styles.premiumBadge,
              ]}
            >
              <Text style={styles.premiumText}>{'프리미엄 콘텐츠'}</Text>
            </View>
          )}
        </View>
        <View>
          <Text style={styles.industry} numberOfLines={1}>
            {industryMap[caseData.industry]}
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 28,
            }}
          >
            <Text style={styles.companyName} numberOfLines={1}>
              {caseData.koreanCompanyName}
            </Text>
            <Text style={styles.funding}>
              {formatFunding(caseData.totalFundingUsd)}
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 16,
            }}
          >
            <Text style={styles.years}>
              {formatYearRange(caseData.foundedYear, caseData.shutdownYear)}
            </Text>
          </View>
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
          height: 105,
          bottom: 0,
          zIndex: 1,
          opacity: 0.85,
        }}
      />
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
    width: 190,
    height: 241,
    borderRadius: 20,
  },
  content: {
    flex: 1,
    position: 'relative',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 6,
  },
  companyName: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    lineHeight: 20,
    color: 'white',
  },
  premiumBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 5,
    backgroundColor: '#000000',
  },
  premiumText: {
    fontSize: 10,
    fontFamily: 'Pretendard-SemiBold',
    lineHeight: 14,
    color: '#E0FB8A',
  },
  industry: {
    fontSize: 10,
    fontFamily: 'Pretendard-Medim',
    lineHeight: 10,
    color: 'white',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  funding: {
    fontSize: 24,
    fontFamily: 'PragatiNarrow-Bold',
    color: '#FFFFFF',
    lineHeight: 34,
  },
  years: {
    fontSize: 16,
    fontFamily: 'PragatiNarrow-Bold',
    color: '#FFFFFF',
    lineHeight: 20,
  },
  description: {
    ...typography.body,
    color: 'rgba(22, 22, 22, 0.9)',
    marginBottom: 14,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    paddingVertical: 4,
  },
  tag: {
    backgroundColor: '#E0FB8A',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  tagText: {
    fontSize: 8,
    fontFamily: 'Pretendard-SemiBold',
    lineHeight: 12,
    color: '#1A1A1A',
    textTransform: 'capitalize',
  },
});
