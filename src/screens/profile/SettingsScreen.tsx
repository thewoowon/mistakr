import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { lightHaptic } from '../../utils';
import { ChevronRightIcon } from '@components/Icons';
import Svg, { Path } from 'react-native-svg';

function BellIcon({ color }: { color: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18 8A6 6 0 1 0 6 8c0 7-3 9-3 9h18s-3-2-3-9ZM13.73 21a2 2 0 0 1-3.46 0"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function GlobeIcon({ color }: { color: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"
        stroke={color}
        strokeWidth={2}
      />
      <Path
        d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z"
        stroke={color}
        strokeWidth={2}
      />
    </Svg>
  );
}

function ShieldIcon({ color }: { color: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function LogOutIcon({ color }: { color: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"
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
  showChevron?: boolean;
  rightElement?: React.ReactNode;
  colors: ReturnType<typeof useTheme>;
  danger?: boolean;
}

function MenuItem({
  icon,
  title,
  subtitle,
  onPress,
  showChevron = true,
  rightElement,
  colors,
  danger,
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
        <Text
          style={[
            styles.menuItemTitle,
            { color: danger ? '#FF6B6B' : colors.text.primary },
          ]}
        >
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

export function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const colors = useTheme();

  const [pushEnabled, setPushEnabled] = useState(true);
  const [marketingEnabled, setMarketingEnabled] = useState(false);

  const handlePushToggle = (value: boolean) => {
    lightHaptic();
    setPushEnabled(value);
  };

  const handleMarketingToggle = (value: boolean) => {
    lightHaptic();
    setMarketingEnabled(value);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Notification Settings */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.secondary }]}>
          알림 설정
        </Text>
        <View style={[styles.menuGroup, { backgroundColor: colors.surface }]}>
          <MenuItem
            icon={<BellIcon color={colors.text.secondary} />}
            title="푸시 알림"
            subtitle="새로운 케이스 업데이트 알림"
            showChevron={false}
            colors={colors}
            rightElement={
              <Switch
                value={pushEnabled}
                onValueChange={handlePushToggle}
                trackColor={{ false: colors.stroke, true: colors.accent }}
                thumbColor={colors.background}
              />
            }
          />
          <MenuItem
            icon={<BellIcon color={colors.text.secondary} />}
            title="마케팅 알림"
            subtitle="이벤트 및 프로모션 알림"
            showChevron={false}
            colors={colors}
            rightElement={
              <Switch
                value={marketingEnabled}
                onValueChange={handleMarketingToggle}
                trackColor={{ false: colors.stroke, true: colors.accent }}
                thumbColor={colors.background}
              />
            }
          />
        </View>
      </View>

      {/* Language Settings */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.secondary }]}>
          언어 설정
        </Text>
        <View style={[styles.menuGroup, { backgroundColor: colors.surface }]}>
          <MenuItem
            icon={<GlobeIcon color={colors.text.secondary} />}
            title="앱 언어"
            subtitle="한국어"
            colors={colors}
          />
        </View>
      </View>

      {/* Privacy & Security */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.secondary }]}>
          개인정보 및 보안
        </Text>
        <View style={[styles.menuGroup, { backgroundColor: colors.surface }]}>
          <MenuItem
            icon={<ShieldIcon color={colors.text.secondary} />}
            title="개인정보 처리방침"
            colors={colors}
          />
          <MenuItem
            icon={<ShieldIcon color={colors.text.secondary} />}
            title="서비스 이용약관"
            colors={colors}
          />
        </View>
      </View>

      {/* Account */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.secondary }]}>
          계정
        </Text>
        <View style={[styles.menuGroup, { backgroundColor: colors.surface }]}>
          <MenuItem
            icon={<LogOutIcon color="#FF6B6B" />}
            title="로그아웃"
            showChevron={false}
            colors={colors}
            danger
            onPress={() => lightHaptic()}
          />
        </View>
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
});
