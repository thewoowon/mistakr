import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text } from 'react-native';
import { HomeStack } from './HomeStack';
import { ProfileStack } from './ProfileStack';
import { ConsultingStack } from './ConsultingStack';
import { ExploreScreen } from '../screens/explore';
import { SavedScreen } from '../screens/saved';
import { RootTabParamList } from './types';
import { colors } from '../constants';
import {
  BookmarkIcon,
  HomeIcon,
  MagnifierIcon,
  ProfileIcon,
  ConsultingIcon,
} from '@components/Icons';
import { useAuth } from '../hooks';
import GuestSignInScreen from '../screens/auth/GuestSignInScreen';

const Tab = createBottomTabNavigator<RootTabParamList>();

const ConsultingGate = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return (
      <GuestSignInScreen
        title="AI 진단은 로그인이 필요해요"
        description={'내 실패 경험을 AI로 분석하고\n성장 인사이트를 받아보세요'}
      />
    );
  }
  return <ConsultingStack />;
};

const ProfileGate = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return (
      <GuestSignInScreen
        title="로그인하고 더 많은 기능을 사용해보세요"
        description={'북마크 동기화, AI 진단 기록 등\n다양한 기능을 이용할 수 있어요'}
      />
    );
  }
  return <ProfileStack />;
};

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.text.disabled,
        tabBarStyle: {
          backgroundColor: 'black',
          borderTopColor: colors.stroke,
          borderTopWidth: 1,
          paddingTop: 4,
          paddingBottom: 4,
        },
        tabBarItemStyle: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Pretendard-Regular',
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarIcon: ({
            focused,
            color,
          }: {
            focused: boolean;
            color: string;
          }) => <HomeIcon color={focused ? colors.accent : 'white'} />,
          tabBarLabel: ({
            focused,
            color,
          }: {
            focused: boolean;
            color: string;
          }) => (
            <Text
              style={[
                styles.tabBarItemTextStyle,
                {
                  color: focused ? colors.accent : 'white',
                },
              ]}
            >
              메인
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="ExploreTab"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({
            focused,
            color,
          }: {
            focused: boolean;
            color: string;
          }) => <MagnifierIcon color={focused ? colors.accent : 'white'} />,
          tabBarLabel: ({
            focused,
            color,
          }: {
            focused: boolean;
            color: string;
          }) => (
            <Text
              style={[
                styles.tabBarItemTextStyle,
                {
                  color: focused ? colors.accent : 'white',
                },
              ]}
            >
              검색
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="ConsultingTab"
        component={ConsultingGate}
        options={{
          tabBarIcon: ({
            focused,
            color,
          }: {
            focused: boolean;
            color: string;
          }) => <ConsultingIcon color={focused ? colors.accent : 'white'} />,
          tabBarLabel: ({
            focused,
            color,
          }: {
            focused: boolean;
            color: string;
          }) => (
            <Text
              style={[
                styles.tabBarItemTextStyle,
                {
                  color: focused ? colors.accent : 'white',
                },
              ]}
            >
              AI 진단
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="SavedTab"
        component={SavedScreen}
        options={{
          tabBarIcon: ({
            focused,
            color,
          }: {
            focused: boolean;
            color: string;
          }) => <BookmarkIcon color={focused ? colors.accent : 'white'} />,
          tabBarLabel: ({
            focused,
            color,
          }: {
            focused: boolean;
            color: string;
          }) => (
            <Text
              style={[
                styles.tabBarItemTextStyle,
                {
                  color: focused ? colors.accent : 'white',
                },
              ]}
            >
              북마크
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileGate}
        options={{
          tabBarIcon: ({
            focused,
            color,
          }: {
            focused: boolean;
            color: string;
          }) => <ProfileIcon color={focused ? colors.accent : 'white'} />,
          tabBarLabel: ({
            focused,
            color,
          }: {
            focused: boolean;
            color: string;
          }) => (
            <Text
              style={[
                styles.tabBarItemTextStyle,
                {
                  color: focused ? colors.accent : 'white',
                },
              ]}
            >
              프로필
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarItemTextStyle: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 12,
    lineHeight: 14,
  },
});
