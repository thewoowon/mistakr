import React, {useEffect} from 'react';
import {StatusBar, Platform} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import GoogleAuthModule from '@thewoowon/google-rn';
import {AppNavigator} from './src/navigation';
import {colors} from './src/constants';
import {AuthProvider} from './src/contexts/AuthContext';
import {UserProvider} from './src/contexts/UserContext';
import {ToastProvider} from './src/contexts/ToastContext';
import {ModalProvider} from './src/contexts/ModalContext';
import {
  IOS_GOOGLE_CLIENT_ID,
  ANDROID_GOOGLE_CLIENT_ID,
  IOS_GOOGLE_REDIRECT_URI,
  ANDROID_GOOGLE_REDIRECT_URI,
} from '@env';

const clientId = Platform.select({
  ios: IOS_GOOGLE_CLIENT_ID,
  android: ANDROID_GOOGLE_CLIENT_ID,
  default: '',
});

const redirectUri = Platform.select({
  ios: IOS_GOOGLE_REDIRECT_URI,
  android: ANDROID_GOOGLE_REDIRECT_URI,
  default: '',
});

const queryClient = new QueryClient();

function AppContent() {
  useEffect(() => {
    GoogleAuthModule.configure({
      clientId: clientId!,
      redirectUri: redirectUri!,
      scopes: ['openid', 'profile', 'email'],
    }).catch((error: Error) => {
      console.error('[App] Google Auth configuration failed:', error);
    });
  }, []);

  return (
    <GestureHandlerRootView
      style={{flex: 1, backgroundColor: colors.background}}>
      <SafeAreaProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.background}
        />
        <AppNavigator />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <AuthProvider>
          <ModalProvider>
            <UserProvider>
              <AppContent />
            </UserProvider>
          </ModalProvider>
        </AuthProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
}

export default App;
