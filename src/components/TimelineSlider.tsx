import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { darkColors as colors, typography } from '../constants';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface TimelineSliderProps {
  minTime: number;
  maxTime: number;
  currentTime: number;
  onTimeChange: (time: number) => void;
  onPlayToggle?: () => void;
  isPlaying?: boolean;
  width?: number;
}

function PlayIcon({ size = 20 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="#161616">
      <Path d="M8 5v14l11-7z" fill="#161616" />
    </Svg>
  );
}

function PauseIcon({ size = 20 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="#161616">
      <Path d="M6 4h4v16H6zM14 4h4v16h-4z" fill="#161616" />
    </Svg>
  );
}

export function TimelineSlider({
  minTime,
  maxTime,
  currentTime,
  onTimeChange,
  onPlayToggle,
  isPlaying = false,
  width = SCREEN_WIDTH - 32,
}: TimelineSliderProps) {
  const sliderWidth = width - 80;
  const progress = (currentTime - minTime) / (maxTime - minTime);
  const thumbPosition = useSharedValue(progress * sliderWidth);

  React.useEffect(() => {
    thumbPosition.value = progress * sliderWidth;
  }, [progress, sliderWidth, thumbPosition]);

  const formatYear = (timestamp: number) => {
    return new Date(timestamp).getFullYear().toString();
  };

  const updateTime = (x: number) => {
    const clampedX = Math.max(0, Math.min(sliderWidth, x));
    const newProgress = clampedX / sliderWidth;
    const newTime = minTime + newProgress * (maxTime - minTime);
    onTimeChange(newTime);
  };

  const panGesture = Gesture.Pan()
    .runOnJS(true)
    .onStart(e => {
      updateTime(e.x);
    })
    .onUpdate(e => {
      thumbPosition.value = Math.max(0, Math.min(sliderWidth, e.x));
      updateTime(e.x);
    });

  const tapGesture = Gesture.Tap()
    .runOnJS(true)
    .onEnd(e => {
      thumbPosition.value = Math.max(0, Math.min(sliderWidth, e.x));
      updateTime(e.x);
    });

  const composedGesture = Gesture.Race(panGesture, tapGesture);

  const thumbAnimatedStyle = useAnimatedStyle(() => ({
    left: thumbPosition.value - 8,
  }));

  const filledTrackStyle = useAnimatedStyle(() => ({
    width: thumbPosition.value,
  }));

  return (
    <View style={[styles.container, { width }]}>
      {/* Play Button */}
      <Pressable style={styles.playButton} onPress={onPlayToggle}>
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </Pressable>

      {/* Slider */}
      <View style={styles.sliderContainer}>
        <GestureDetector gesture={composedGesture}>
          <View style={[styles.track, { width: sliderWidth }]}>
            <Animated.View style={[styles.filledTrack, filledTrackStyle]} />
            <Animated.View style={[styles.thumb, thumbAnimatedStyle]} />
          </View>
        </GestureDetector>

        {/* Labels */}
        <View style={[styles.labels, { width: sliderWidth }]}>
          <Text style={styles.label}>{formatYear(minTime)}</Text>
          <Text style={styles.label}>{formatYear(maxTime)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 10,
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.accentGlow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 6,
  },
  sliderContainer: {
    flex: 1,
  },
  track: {
    height: 24,
    justifyContent: 'center',
    position: 'relative',
  },
  filledTrack: {
    position: 'absolute',
    left: 0,
    top: 10,
    height: 4,
    backgroundColor: colors.accent,
    borderRadius: 2,
  },
  thumb: {
    position: 'absolute',
    top: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.accent,
    borderWidth: 2,
    borderColor: colors.background,
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 10,
    fontFamily: 'Pretendard-Medium',
    color: '#EEEEEE',
  },
});
