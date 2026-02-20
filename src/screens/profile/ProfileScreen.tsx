import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  Pressable,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { typography } from '../../constants';
import { useTheme } from '../../hooks/useTheme';
import { useBookmarksStore, useThemeStore } from '../../store';
import { lightHaptic } from '../../utils';
import { useUser } from '../../contexts/UserContext';
import { ProfileStackParamList } from '../../navigation/types';
import {
  ChevronRightIcon,
  HelpIcon,
  InfoIcon,
  MoonIcon,
  SettingsIcon,
  TrashIcon,
  UserIcon,
} from '@components/Icons';

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  showChevron?: boolean;
  rightElement?: React.ReactNode;
  colors: ReturnType<typeof useTheme>;
}

function MenuItem({
  icon,
  title,
  subtitle,
  onPress,
  showChevron = true,
  rightElement,
  colors,
}: MenuItemProps) {
  return (
    <Pressable
      style={[
        styles.menuItem,
        {
          borderBottomColor: colors.stroke,
          paddingRight: rightElement ? 20 : 10,
        },
      ]}
      onPress={onPress}
      disabled={!onPress && !rightElement}
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
      {rightElement}
      {showChevron && !rightElement && (
        <ChevronRightIcon color={colors.text.disabled} width={20} height={20} />
      )}
    </Pressable>
  );
}

type NavigationProp = NativeStackNavigationProp<ProfileStackParamList, 'Profile'>;

export function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const colors = useTheme();
  const { bookmarkedCaseIds, clearBookmarks } = useBookmarksStore();
  const { mode, setMode, isDark } = useThemeStore();
  const { user } = useUser();

  const handleDarkModeToggle = (value: boolean) => {
    lightHaptic();
    // setMode(value ? 'dark' : 'light');
    setMode('dark');
  };

  const handleSettingsPress = () => {
    lightHaptic();
    navigation.navigate('Settings');
  };

  const handleSupportPress = () => {
    lightHaptic();
    navigation.navigate('Support');
  };

  const handleVersionPress = () => {
    lightHaptic();
    navigation.navigate('Version');
  };

  const handleClearBookmarks = () => {
    lightHaptic();
    Alert.alert(
      '북마크 초기화',
      `저장된 ${bookmarkedCaseIds.length}개의 케이스를 모두 삭제하시겠습니까?`,
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          style: 'destructive',
          onPress: () => {
            clearBookmarks();
            lightHaptic();
          },
        },
      ],
    );
  };

  return (
    <ScrollView
      style={[
        styles.container,
        { paddingTop: insets.top, backgroundColor: colors.background },
      ]}
      contentContainerStyle={styles.contentContainer}
    >
      {/* User Section */}
      <View style={styles.userSection}>
        <View style={[styles.avatar, { backgroundColor: colors.black }]}>
          <UserIcon color={colors.white} width={64} height={64} />
        </View>
        <Text style={[styles.userName, { color: colors.text.primary }]}>
          {user?.name}
        </Text>
        <Text style={[styles.userPlan, { color: colors.text.secondary }]}>
          {user?.email}
        </Text>
      </View>

      {/* Premium Banner - temporarily hidden */}
      {/* <Pressable
        style={[
          styles.premiumBanner,
          {
            backgroundColor: colors.accent,
          },
        ]}
      >
        <View style={styles.premiumContent}>
          <CrownIcon color={'#FCD83D'} />
          <View style={styles.premiumText}>
            <Text style={[styles.premiumTitle, { color: '#1A1A1A' }]}>
              프리미엄으로 업그레이드
            </Text>
            <Text style={[styles.premiumSubtitle, { color: '#666666' }]}>
              미스테이커가 준비한 모든 케이스와 독점 분석을 확인하세요!
            </Text>
          </View>
        </View>
        <ChevronRightIcon color={'#1A1A1A'} width={20} height={20} />
      </Pressable> */}

      {/* Stats */}
      <View
        style={[styles.statsContainer, { backgroundColor: colors.surface }]}
      >
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.text.primary }]}>
            {bookmarkedCaseIds.length}
          </Text>
          <Text style={[styles.statLabel, { color: colors.text.secondary }]}>
            저장한 케이스
          </Text>
        </View>
        <View
          style={[styles.statDivider, { backgroundColor: colors.stroke }]}
        />
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.text.primary }]}>
            5
          </Text>
          <Text style={[styles.statLabel, { color: colors.text.secondary }]}>
            읽은 케이스
          </Text>
        </View>
        <View
          style={[styles.statDivider, { backgroundColor: colors.stroke }]}
        />
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.text.primary }]}>
            0
          </Text>
          <Text style={[styles.statLabel, { color: colors.text.secondary }]}>
            연속 이용일
          </Text>
        </View>
      </View>

      {/* Appearance */}
      <View style={styles.menuSection}>
        <View style={[styles.menuGroup, { backgroundColor: colors.surface }]}>
          <MenuItem
            icon={<MoonIcon color={'#FCD83D'} />}
            title="다크모드"
            subtitle={mode === 'system' ? 'Using system setting' : undefined}
            showChevron={false}
            colors={colors}
            rightElement={
              <Switch
                value={isDark()}
                onValueChange={handleDarkModeToggle}
                trackColor={{ false: colors.stroke, true: colors.accent }}
                thumbColor={colors.background}
              />
            }
          />
        </View>
      </View>

      {/* Menu */}
      <View style={styles.menuSection}>
        <View style={[styles.menuGroup, { backgroundColor: colors.surface }]}>
          <MenuItem
            icon={<SettingsIcon color={colors.text.secondary} />}
            title="환경설정"
            subtitle="알림설정, 언어설정"
            onPress={handleSettingsPress}
            colors={colors}
          />
          <MenuItem
            icon={<HelpIcon color={colors.text.secondary} />}
            title="고객지원"
            subtitle="이메일문의, 전화문의, 채팅상담"
            onPress={handleSupportPress}
            colors={colors}
          />
          <MenuItem
            icon={<InfoIcon color={colors.text.secondary} />}
            title="버전"
            subtitle="Version 1.4.2"
            onPress={handleVersionPress}
            colors={colors}
          />
        </View>
      </View>

      {/* Clear Bookmarks */}
      {bookmarkedCaseIds.length > 0 && (
        <View style={styles.menuSection}>
          <View style={[styles.menuGroup, { backgroundColor: colors.surface }]}>
            <MenuItem
              icon={<TrashIcon color="#FF6B6B" />}
              title="북마크 초기화"
              subtitle={`저장된 케이스 ${bookmarkedCaseIds.length}개 삭제`}
              onPress={handleClearBookmarks}
              colors={colors}
            />
          </View>
        </View>
      )}
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
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    ...typography.h1,
  },
  userSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    opacity: 0.6,
    borderWidth: 0.5,
    borderColor: '#666666',
  },
  userName: {
    ...typography.h3,
  },
  userPlan: {
    ...typography.caption,
    marginTop: 4,
  },
  premiumBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingLeft: 20,
    paddingRight: 10,
    paddingVertical: 20,
    borderRadius: 10,
  },
  premiumContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  premiumText: {
    flex: 1,
  },
  premiumTitle: {
    fontSize: 14,
    fontFamily: 'Pretendard-SemiBold',
    lineHeight: 20,
    color: '#1A1A1A',
  },
  premiumSubtitle: {
    fontSize: 10,
    fontFamily: 'Pretendard-Regular',
    lineHeight: 14,
    color: '#666666',
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontFamily: 'Pretendard-Regular',
    lineHeight: 20,
  },
  statLabel: {
    ...typography.small,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
  },
  menuSection: {
    marginTop: 24,
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
    paddingVertical: 20,
    paddingLeft: 20,
    paddingRight: 10,
    borderBottomWidth: 1,
    gap: 10,
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
    fontSize: 10,
    fontFamily: 'Pretendard-Regular',
    lineHeight: 14,
    marginTop: 2,
  },
});
