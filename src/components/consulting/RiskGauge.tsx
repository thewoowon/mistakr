import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {typography} from '@constants/index';
import {useTheme} from '@hooks/index';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface RiskGaugeProps {
  score: number;
  size?: number;
  label?: string;
}

function getRiskColor(score: number): string {
  if (score <= 30) {return '#66BB6A';}
  if (score <= 60) {return '#FFB020';}
  if (score <= 80) {return '#FFA726';}
  return '#FF5A5F';
}

function getRiskLabel(score: number): string {
  if (score <= 30) {return '안전';}
  if (score <= 60) {return '주의';}
  if (score <= 80) {return '위험';}
  return '매우 위험';
}

export function RiskGauge({score, size = 160, label = '종합 리스크'}: RiskGaugeProps) {
  const colors = useTheme();
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const animatedProgress = useSharedValue(0);

  useEffect(() => {
    animatedProgress.value = withTiming(score / 100, {
      duration: 1200,
      easing: Easing.out(Easing.cubic),
    });
  }, [score, animatedProgress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - animatedProgress.value),
  }));

  const riskColor = getRiskColor(score);

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.stroke}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={riskColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View style={[styles.center, {width: size, height: size}]}>
        <Text style={[styles.score, {color: riskColor}]}>{score}</Text>
        <Text style={[styles.riskLabel, {color: riskColor}]}>
          {getRiskLabel(score)}
        </Text>
        <Text style={[styles.label, {color: colors.text.secondary}]}>
          {label}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  score: {
    fontSize: 40,
    fontFamily: 'Pretendard-ExtraBold',
  },
  riskLabel: {
    ...typography.caption,
    fontFamily: 'Pretendard-SemiBold',
    marginTop: 2,
  },
  label: {
    ...typography.micro,
    marginTop: 4,
  },
});
