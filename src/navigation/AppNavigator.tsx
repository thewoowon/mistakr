import React, {useState, useCallback, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {TabNavigator} from './TabNavigator';
import {SplashScreen, OnboardingScreen} from '../screens/auth';
import {useAppStore} from '../store';
import {useAuth} from '../hooks';
import {useUser} from '../contexts/UserContext';
import {useModal} from '../contexts/ModalContext';
import customAxios, {setAuthFailureHandler} from '../axios/customAxios';
import {API_PREFIX} from '@env';
import {colors} from '../constants';

type AppScreen = 'splash' | 'onboarding' | 'main';

export function AppNavigator() {
  const {hasSeenOnboarding, setHasSeenOnboarding} = useAppStore();
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('splash');
  const {isAuthenticated, setIsAuthenticated} = useAuth();
  const {user, setUser} = useUser();
  const modal = useModal();

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

  useEffect(() => {
    const fetchUser = async () => {
      if (isAuthenticated && !user) {
        try {
          const res = await customAxios.get(`${API_PREFIX}/users/me`);
          setUser({
            email: res.data.data.email,
            name: res.data.data.name,
            photoUrl: res.data.data.profile_pic,
          });
        } catch (error) {
          console.error('Failed to fetch user data:', error);
          setIsAuthenticated(false);
        }
      }
    };
    fetchUser();
  }, [isAuthenticated]);

  useEffect(() => {
    setAuthFailureHandler(() => {
      modal.showModal('세션이 만료되었습니다. 다시 로그인해주세요.', () => {
        setIsAuthenticated(false);
      });
    });
  }, []);

  if (currentScreen === 'splash') {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (currentScreen === 'onboarding') {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  return (
    <NavigationContainer
      theme={{
        dark: true,
        colors: {
          primary: colors.accent,
          background: colors.background,
          card: colors.background,
          text: colors.text.primary,
          border: colors.stroke,
          notification: colors.accent,
        },
        fonts: {
          regular: {
            fontFamily: 'Pretendard-Regular',
            fontWeight: 'normal',
          },
          medium: {
            fontFamily: 'Pretendard-Medium',
            fontWeight: 'normal',
          },
          bold: {
            fontFamily: 'Pretendard-Bold',
            fontWeight: 'normal',
          },
          heavy: {
            fontFamily: 'Pretendard-ExtraBold',
            fontWeight: 'normal',
          },
        },
      }}>
      <TabNavigator />
    </NavigationContainer>
  );
}
