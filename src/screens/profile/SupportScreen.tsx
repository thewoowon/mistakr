import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Linking,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { lightHaptic } from '../../utils';
import { ChevronRightIcon } from '@components/Icons';
import Svg, { Path, Circle } from 'react-native-svg';

function MailIcon({ color }: { color: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="m22 6-10 7L2 6"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function PhoneIcon({ color }: { color: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function MessageIcon({ color }: { color: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function FileIcon({ color }: { color: string }) {
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

function QuestionIcon({ color }: { color: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={10} stroke={color} strokeWidth={2} />
      <Path
        d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"
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

export function SupportScreen() {
  const insets = useSafeAreaInsets();
  const colors = useTheme();

  const handleEmailPress = () => {
    lightHaptic();
    Linking.openURL('mailto:support@mistakr.com?subject=고객문의');
  };

  const handlePhonePress = () => {
    lightHaptic();
    Alert.alert(
      '전화 문의',
      '고객센터로 전화하시겠습니까?\n\n02-1234-5678\n운영시간: 평일 09:00 - 18:00',
      [
        { text: '취소', style: 'cancel' },
        { text: '전화하기', onPress: () => Linking.openURL('tel:0212345678') },
      ],
    );
  };

  const handleChatPress = () => {
    lightHaptic();
    Alert.alert('채팅 상담', '채팅 상담 기능은 준비 중입니다.');
  };

  const handleFAQPress = () => {
    lightHaptic();
    Alert.alert('자주 묻는 질문', '자주 묻는 질문 페이지는 준비 중입니다.');
  };

  const handleGuidePress = () => {
    lightHaptic();
    Alert.alert('이용 가이드', '이용 가이드 페이지는 준비 중입니다.');
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Contact Methods */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.secondary }]}>
          문의하기
        </Text>
        <View style={[styles.menuGroup, { backgroundColor: colors.surface }]}>
          <MenuItem
            icon={<MailIcon color={colors.text.secondary} />}
            title="이메일 문의"
            subtitle="support@mistakr.com"
            onPress={handleEmailPress}
            colors={colors}
          />
          <MenuItem
            icon={<PhoneIcon color={colors.text.secondary} />}
            title="전화 문의"
            subtitle="평일 09:00 - 18:00"
            onPress={handlePhonePress}
            colors={colors}
          />
          <MenuItem
            icon={<MessageIcon color={colors.text.secondary} />}
            title="채팅 상담"
            subtitle="실시간 상담 가능"
            onPress={handleChatPress}
            colors={colors}
          />
        </View>
      </View>

      {/* Help Resources */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.secondary }]}>
          도움말
        </Text>
        <View style={[styles.menuGroup, { backgroundColor: colors.surface }]}>
          <MenuItem
            icon={<QuestionIcon color={colors.text.secondary} />}
            title="자주 묻는 질문"
            subtitle="FAQ"
            onPress={handleFAQPress}
            colors={colors}
          />
          <MenuItem
            icon={<FileIcon color={colors.text.secondary} />}
            title="이용 가이드"
            subtitle="앱 사용법 안내"
            onPress={handleGuidePress}
            colors={colors}
          />
        </View>
      </View>

      {/* Notice */}
      <View style={styles.noticeContainer}>
        <Text style={[styles.noticeText, { color: colors.text.disabled }]}>
          고객센터 운영시간{'\n'}
          평일 09:00 - 18:00 (주말/공휴일 휴무){'\n'}
          {'\n'}
          점심시간 12:00 - 13:00
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
  noticeContainer: {
    marginTop: 32,
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  noticeText: {
    fontSize: 12,
    fontFamily: 'Pretendard-Regular',
    lineHeight: 18,
    textAlign: 'center',
  },
});
