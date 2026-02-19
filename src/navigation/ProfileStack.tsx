import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  ProfileScreen,
  SettingsScreen,
  SupportScreen,
  VersionScreen,
} from '../screens/profile';
import { ProfileStackParamList } from './types';
import { colors } from '../constants';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text.primary,
        headerTitleStyle: {
          fontFamily: 'Pretendard-SemiBold',
          fontSize: 16,
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: '환경설정',
          headerTitleStyle: {
            fontFamily: 'Pretendard-SemiBold',
            color: 'white',
          },
          headerBackTitle: '프로필',
        }}
      />
      <Stack.Screen
        name="Support"
        component={SupportScreen}
        options={{
          title: '고객지원',
          headerTitleStyle: {
            fontFamily: 'Pretendard-SemiBold',
            color: 'white',
          },
          headerBackTitle: '프로필',
        }}
      />
      <Stack.Screen
        name="Version"
        component={VersionScreen}
        options={{
          title: '버전 정보',
          headerTitleStyle: {
            fontFamily: 'Pretendard-SemiBold',
            color: 'white',
          },
          headerBackTitle: '프로필',
        }}
      />
    </Stack.Navigator>
  );
}
