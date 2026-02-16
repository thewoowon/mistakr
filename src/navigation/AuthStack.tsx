import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from '../screens/auth/SignInScreen';
import {SignUpProvider} from '../contexts/SignUpContext';
import CompleteScreen from '../screens/auth/SignUpScreens/CompleteScreen';
import {AuthStackParamList} from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthStack() {
  return (
    <SignUpProvider>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUpComplete" component={CompleteScreen} />
      </Stack.Navigator>
    </SignUpProvider>
  );
}
