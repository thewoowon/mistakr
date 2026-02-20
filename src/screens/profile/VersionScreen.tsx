import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { lightHaptic } from '../../utils';
import { ChevronRightIcon } from '@components/Icons';
import Svg, { Path, Circle } from 'react-native-svg';

function CheckCircleIcon({ color }: { color: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={10} stroke={color} strokeWidth={2} />
      <Path
        d="m9 12 2 2 4-4"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function RefreshIcon({ color }: { color: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M23 4v6h-6M1 20v-6h6"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function FileTextIcon({ color }: { color: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14 2v6h6M16 13H8M16 17H8M10 9H8"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function CodeIcon({ color }: { color: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="m16 18 6-6-6-6M8 6l-6 6 6 6"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  colors: ReturnType<typeof useTheme>;
}

function MenuItem({ icon, title, subtitle, onPress, colors }: MenuItemProps) {
  return (
    <Pressable
      style={[styles.menuItem, { borderBottomColor: colors.stroke }]}
      onPress={onPress}
    >
      <View style={styles.menuItemIcon}>{icon}</View>
      <View style={styles.menuItemContent}>
        <Text style={[styles.menuItemTitle, { color: colors.text.primary }]}>
          {title}
        </Text>
        {subtitle && (
          <Text
            style={[styles.menuItemSubtitle, { color: colors.text.secondary }]}
          >
            {subtitle}
          </Text>
        )}
      </View>
      <ChevronRightIcon color={colors.text.disabled} width={20} height={20} />
    </Pressable>
  );
}

export function VersionScreen() {
  const insets = useSafeAreaInsets();
  const colors = useTheme();

  const handleUpdateCheck = () => {
    lightHaptic();
    Alert.alert('업데이트 확인', '현재 최신 버전입니다.');
  };

  const handleChangelogPress = () => {
    lightHaptic();
    Alert.alert(
      '업데이트 내역',
      'v1.4.2 (2024.02.11)\n' +
        '- 프로필 화면 개선\n' +
        '- 검색 기능 향상\n' +
        '- 버그 수정\n\n' +
        'v1.4.1 (2024.02.01)\n' +
        '- 성능 최적화\n' +
        '- UI 개선\n\n' +
        'v1.4.0 (2024.01.15)\n' +
        '- 북마크 기능 추가\n' +
        '- 다크모드 지원',
    );
  };

  const handleLicensePress = () => {
    lightHaptic();
    Alert.alert('오픈소스 라이선스', '오픈소스 라이선스 정보는 준비 중입니다.');
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      {/* App Info */}
      <View style={styles.appInfoContainer}>
        <View style={[styles.appIcon, { backgroundColor: colors.surface }]}>
          <Text style={styles.appIconText}>M</Text>
        </View>
        <Text style={[styles.appName, { color: colors.text.primary }]}>
          Mistakr
        </Text>
        <Text style={[styles.appVersion, { color: colors.text.secondary }]}>
          Version 1.3.1
        </Text>
        <View style={styles.latestBadge}>
          <CheckCircleIcon color={colors.accent} />
          <Text style={[styles.latestText, { color: colors.accent }]}>
            최신 버전
          </Text>
        </View>
      </View>

      {/* Version Info */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.secondary }]}>
          버전 정보
        </Text>
        <View style={[styles.menuGroup, { backgroundColor: colors.surface }]}>
          <MenuItem
            icon={<RefreshIcon color={colors.text.secondary} />}
            title="업데이트 확인"
            subtitle="최신 버전을 확인합니다"
            onPress={handleUpdateCheck}
            colors={colors}
          />
          <MenuItem
            icon={<FileTextIcon color={colors.text.secondary} />}
            title="업데이트 내역"
            subtitle="변경 사항 보기"
            onPress={handleChangelogPress}
            colors={colors}
          />
        </View>
      </View>

      {/* Legal */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.secondary }]}>
          법적 고지
        </Text>
        <View style={[styles.menuGroup, { backgroundColor: colors.surface }]}>
          <MenuItem
            icon={<CodeIcon color={colors.text.secondary} />}
            title="오픈소스 라이선스"
            subtitle="사용된 오픈소스 라이브러리"
            onPress={handleLicensePress}
            colors={colors}
          />
        </View>
      </View>

      {/* Build Info */}
      <View style={styles.buildInfoContainer}>
        <Text style={[styles.buildInfo, { color: colors.text.disabled }]}>
          Build: 20260220.1{'\n'}
          Bundle ID: com.thewoowon.mistakr{'\n'}
          {'\n'}
          © 2024 Mistakr. All rights reserved.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 32,
  },
  appInfoContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  appIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  appIconText: {
    fontSize: 36,
    fontFamily: 'Pretendard-Bold',
    color: '#E0FB8A',
  },
  appName: {
    fontSize: 24,
    fontFamily: 'Pretendard-Bold',
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
    marginBottom: 12,
  },
  latestBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  latestText: {
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Pretendard-Medium',
    marginBottom: 8,
    marginHorizontal: 20,
    textTransform: 'uppercase',
  },
  menuGroup: {
    marginHorizontal: 20,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingLeft: 16,
    paddingRight: 10,
    borderBottomWidth: 1,
    gap: 12,
  },
  menuItemIcon: {
    width: 24,
    alignItems: 'center',
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
    lineHeight: 20,
  },
  menuItemSubtitle: {
    fontSize: 11,
    fontFamily: 'Pretendard-Regular',
    lineHeight: 14,
    marginTop: 2,
  },
  buildInfoContainer: {
    marginTop: 32,
    marginHorizontal: 20,
  },
  buildInfo: {
    fontSize: 11,
    fontFamily: 'Pretendard-Regular',
    lineHeight: 16,
    textAlign: 'center',
  },
});
