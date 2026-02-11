import React, { useState, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { TabNavigator } from './TabNavigator';
import { SplashScreen, OnboardingScreen } from '../screens/auth';
import { useAppStore } from '../store';

type AppScreen = 'splash' | 'onboarding' | 'main';

export function AppNavigator() {
  const { hasSeenOnboarding, setHasSeenOnboarding } = useAppStore();
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('splash');

  const handleSplashComplete = useCallback(() => {
    if (hasSeenOnboarding) {
      setCurrentScreen('main');
    } else {
      setCurrentScreen('onboarding');
    }
  }, [hasSeenOnboarding]);

  const handleOnboardingComplete = useCallback(() => {
    setHasSeenOnboarding(true);
    setCurrentScreen('main');
  }, [setHasSeenOnboarding]);

  if (currentScreen === 'splash') {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (currentScreen === 'onboarding') {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}
