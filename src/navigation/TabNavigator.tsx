import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, Text } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { HomeStack } from './HomeStack';
import { ProfileStack } from './ProfileStack';
import { ExploreScreen } from '../screens/explore';
import { SavedScreen } from '../screens/saved';
import { RootTabParamList } from './types';
import { colors } from '../constants';
import {
  BookmarkIcon,
  HomeIcon,
  MagnifierIcon,
  ProfileIcon,
} from '@components/Icons';

const Tab = createBottomTabNavigator<RootTabParamList>();

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
        component={ProfileStack}
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
