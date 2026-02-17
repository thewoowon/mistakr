import useAuth from '@hooks/useAuth';
import React, {useEffect} from 'react';
import {Dimensions, Pressable, StatusBar, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../../constants';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  withDelay,
  withSpring,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import Svg, {Circle, Defs, LinearGradient, Path, Stop} from 'react-native-svg';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

// 컨페티 파티클 설정
const CONFETTI_COUNT = 24;
const CONFETTI_COLORS = [
  '#E0FB8A',
  '#FCD83D',
  'rgba(224,251,138,0.7)',
  'rgba(252,216,61,0.6)',
  '#CFF27A',
  '#F9BD26',
];

const confettiData = Array.from({length: CONFETTI_COUNT}, (_, i) => ({
  id: i,
  x: Math.random() * SCREEN_WIDTH,
  size: 4 + Math.random() * 6,
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  delay: Math.random() * 1200,
  duration: 2500 + Math.random() * 2000,
  drift: (Math.random() - 0.5) * 80,
  rotation: Math.random() * 360,
}));

const ConfettiPiece = ({
  x,
  size,
  color,
  delay: d,
  duration,
  drift,
  rotation: initRot,
}: (typeof confettiData)[number]) => {
  const fall = useSharedValue(-20);
  const rot = useSharedValue(initRot);
  const opacity = useSharedValue(0);

  useEffect(() => {
    fall.value = withDelay(
      d,
      withRepeat(
        withSequence(
          withTiming(SCREEN_HEIGHT + 40, {
            duration,
            easing: Easing.in(Easing.quad),
          }),
          withTiming(-20, {duration: 0}),
        ),
        -1,
        false,
      ),
    );
    rot.value = withDelay(
      d,
      withRepeat(
        withTiming(initRot + 720, {duration, easing: Easing.linear}),
        -1,
        false,
      ),
    );
    opacity.value = withDelay(d, withTiming(1, {duration: 300}));
  }, []);

  const style = useAnimatedStyle(() => ({
    position: 'absolute' as const,
    left: x,
    top: fall.value,
    width: size,
    height: size * 1.5,
    borderRadius: size * 0.3,
    backgroundColor: color,
    opacity: opacity.value *
      interpolate(fall.value, [-20, 0, SCREEN_HEIGHT * 0.7, SCREEN_HEIGHT + 40], [0, 1, 1, 0]),
    transform: [
      {translateX: interpolate(fall.value, [-20, SCREEN_HEIGHT + 40], [0, drift])},
      {rotate: `${rot.value}deg`},
    ],
  }));

  return <Animated.View style={style} />;
};

const CheckmarkIcon = () => {
  const scale = useSharedValue(0);
  const glowPulse = useSharedValue(0.3);

  useEffect(() => {
    scale.value = withDelay(300, withSpring(1, {damping: 6, stiffness: 100}));
    glowPulse.value = withDelay(
      800,
      withRepeat(
        withSequence(
          withTiming(0.7, {duration: 1200, easing: Easing.inOut(Easing.ease)}),
          withTiming(0.2, {duration: 1200, easing: Easing.inOut(Easing.ease)}),
        ),
        -1,
        true,
      ),
    );
  }, []);

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    position: 'absolute' as const,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.accent,
    opacity: glowPulse.value * 0.2,
  }));

  return (
    <View style={iconStyles.wrapper}>
      <Animated.View style={glowStyle} />
      <Animated.View style={containerStyle}>
        <Svg width={72} height={72} viewBox="0 0 72 72">
          <Defs>
            <LinearGradient id="checkGrad" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0" stopColor="#E0FB8A" />
              <Stop offset="1" stopColor="#FCD83D" />
            </LinearGradient>
          </Defs>
          <Circle cx="36" cy="36" r="34" fill="url(#checkGrad)" />
          <Path
            d="M22 36L32 46L50 26"
            stroke={colors.background}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </Svg>
      </Animated.View>
    </View>
  );
};

const CompleteScreen = () => {
  const {setIsAuthenticated} = useAuth();

  const welcomeOpacity1 = useSharedValue(0);
  const welcomeY1 = useSharedValue(30);
  const welcomeOpacity2 = useSharedValue(0);
  const welcomeY2 = useSharedValue(30);
  const subtitleOpacity = useSharedValue(0);
  const subtitleY = useSharedValue(20);
  const buttonOpacity = useSharedValue(0);
  const buttonScale = useSharedValue(0.9);
  const buttonGlow = useSharedValue(0);

  useEffect(() => {
    // 텍스트 순차 등장
    welcomeOpacity1.value = withDelay(600, withTiming(1, {duration: 600}));
    welcomeY1.value = withDelay(600, withSpring(0, {damping: 12}));

    welcomeOpacity2.value = withDelay(900, withTiming(1, {duration: 600}));
    welcomeY2.value = withDelay(900, withSpring(0, {damping: 12}));

    subtitleOpacity.value = withDelay(1200, withTiming(1, {duration: 600}));
    subtitleY.value = withDelay(1200, withSpring(0, {damping: 12}));

    // 버튼 등장
    buttonOpacity.value = withDelay(1600, withTiming(1, {duration: 500}));
    buttonScale.value = withDelay(1600, withSpring(1, {damping: 10}));

    // 버튼 글로우 펄스
    buttonGlow.value = withDelay(
      2000,
      withRepeat(
        withSequence(
          withTiming(1, {duration: 1000, easing: Easing.inOut(Easing.ease)}),
          withTiming(0, {duration: 1000, easing: Easing.inOut(Easing.ease)}),
        ),
        -1,
        true,
      ),
    );

  }, []);

  const welcome1Style = useAnimatedStyle(() => ({
    opacity: welcomeOpacity1.value,
    transform: [{translateY: welcomeY1.value}],
  }));

  const welcome2Style = useAnimatedStyle(() => ({
    opacity: welcomeOpacity2.value,
    transform: [{translateY: welcomeY2.value}],
  }));

  const subtitleStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
    transform: [{translateY: subtitleY.value}],
  }));

  const buttonContainerStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{scale: buttonScale.value}],
  }));

  const buttonGlowStyle = useAnimatedStyle(() => ({
    position: 'absolute' as const,
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    borderRadius: 16,
    backgroundColor: colors.accent,
    opacity: buttonGlow.value * 0.3,
  }));

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.background}
        translucent={false}
      />

      {/* 컨페티 */}
      {confettiData.map(c => (
        <ConfettiPiece key={c.id} {...c} />
      ))}

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <CheckmarkIcon />
          <View style={styles.textGroup}>
            <Animated.Text style={[styles.welcome, welcome1Style]}>
              미스테이커에 오신것을
            </Animated.Text>
            <Animated.Text style={[styles.welcome, welcome2Style]}>
              환영해요.
            </Animated.Text>
            <Animated.Text style={[styles.subtitle, subtitleStyle]}>
              실패에서 배우는 성공 전략, 지금 시작하세요.
            </Animated.Text>
          </View>
        </View>
        <Animated.View style={[styles.bottom, buttonContainerStyle]}>
          <View style={{position: 'relative'}}>
            <Animated.View style={buttonGlowStyle} />
            <Pressable
              style={styles.button}
              onPress={() => setIsAuthenticated(true)}>
              <Text style={styles.buttonText}>시작하기</Text>
            </Pressable>
          </View>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
};

const iconStyles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    width: 120,
    height: 120,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    overflow: 'hidden',
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textGroup: {
    alignItems: 'center',
    gap: 8,
  },
  welcome: {
    color: colors.text.primary,
    fontSize: 28,
    fontFamily: 'Pretendard-Bold',
  },
  subtitle: {
    color: colors.text.secondary,
    fontSize: 15,
    fontFamily: 'Pretendard-Regular',
    marginTop: 8,
  },
  bottom: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  button: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.background,
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
  },
});

export default CompleteScreen;
