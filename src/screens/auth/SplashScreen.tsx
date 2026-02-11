import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  runOnJS,
} from 'react-native-reanimated';
import { typography } from '../../constants';
import { useTheme } from '../../hooks/useTheme';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const colors = useTheme();
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    opacity.value = withSequence(
      withTiming(1, { duration: 500 }),
      withDelay(1000, withTiming(0, { duration: 300 }))
    );
    scale.value = withSequence(
      withTiming(1, { duration: 500 }),
      withDelay(1000, withTiming(1.1, { duration: 300 }, () => {
        runOnJS(onComplete)();
      }))
    );
  }, [opacity, scale, onComplete]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Animated.View style={[styles.content, animatedStyle]}>
        <Text style={[styles.logo, { color: colors.text.primary }]}>Mistakr</Text>
        <Text style={[styles.tagline, { color: colors.text.secondary }]}>
          실패에서 배우는 스타트업 인사이트
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    fontSize: 48,
    fontFamily: 'Pretendard-Bold',
    letterSpacing: -1,
  },
  tagline: {
    ...typography.body,
    marginTop: 8,
  },
});
