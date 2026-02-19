import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  ConsultingHomeScreen,
  IdeaInputScreen,
  ConsultingResultScreen,
  ConsultingHistoryScreen,
  ChecklistProgressScreen,
} from '../screens/consulting';
import { ConsultingStackParamList } from './types';
import { colors } from '../constants';

const Stack = createNativeStackNavigator<ConsultingStackParamList>();

export function ConsultingStack() {
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
        name="ConsultingHome"
        component={ConsultingHomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="IdeaInput"
        component={IdeaInputScreen}
        options={{
          title: '내 스타트업 분석',
          headerTitleStyle: {
            fontFamily: 'Pretendard-SemiBold',
            color: 'white',
          },
          headerBackTitle: '컨설팅홈',
        }}
      />
      <Stack.Screen
        name="ConsultingResult"
        component={ConsultingResultScreen}
        options={{
          title: '분석 결과',
          headerTitleStyle: {
            fontFamily: 'Pretendard-SemiBold',
            color: 'white',
          },
          headerBackTitle: '컨설팅홈', // 텍스트 제거
        }}
      />
      <Stack.Screen
        name="ConsultingHistory"
        component={ConsultingHistoryScreen}
        options={{
          title: '컨설팅 히스토리',
          headerTitleStyle: {
            fontFamily: 'Pretendard-SemiBold',
            color: 'white',
          },
          headerBackTitle: '컨설팅홈',
        }}
      />
      <Stack.Screen
        name="ChecklistProgress"
        component={ChecklistProgressScreen}
        options={{
          title: '체크리스트',
          headerTitleStyle: {
            fontFamily: 'Pretendard-SemiBold',
            color: 'white',
          },
          headerBackTitle: '컨설팅홈',
        }}
      />
    </Stack.Navigator>
  );
}
