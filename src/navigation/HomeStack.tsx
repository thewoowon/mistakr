import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, CaseDetailScreen } from '../screens/home';
import { HomeStackParamList } from './types';
import { colors } from '../constants';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text.primary,
        headerTitleStyle: {
          fontWeight: '600',
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CaseDetail"
        component={CaseDetailScreen}
        options={({ route }: { route: any }) => ({
          title: route.params.caseId,
        })}
      />
    </Stack.Navigator>
  );
}
