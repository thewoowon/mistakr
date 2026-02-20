import React, {useEffect} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {useAuth} from '../../hooks';
import SocialLoginButton from '@components/SocialLoginButton';
import {API_PREFIX} from '@env';
import customAxios from '@axios/customAxios';
import {useMutation} from '@tanstack/react-query';
import {useToast} from '@contexts/ToastContext';
import {login} from '@screens/auth/auth';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useGoogleAuth, GoogleUser} from '@thewoowon/google-rn';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {colors} from '../../constants';

type ProviderType = 'GOOGLE' | 'APPLE';

interface GuestSignInScreenProps {
  title: string;
  description: string;
}

const GuestSignInScreen = ({title, description}: GuestSignInScreenProps) => {
  const {user, signIn} = useGoogleAuth();
  const {showToast} = useToast();
  const {setIsAuthenticated} = useAuth();

  const {mutateAsync: verifyMutation} = useMutation({
    mutationFn: async (context: {email: string}) => {
      const response = await customAxios.get(`${API_PREFIX}/users/verify`, {
        params: {email: context.email},
      });
      if (response.status !== 200) {
        throw new Error('Failed to verify social login');
      }
      return response.data;
    },
  });

  const {mutateAsync: loginMutation} = useMutation({
    mutationFn: async ({user: googleUser}: {user: GoogleUser}) => {
      const response = await customAxios.post(`${API_PREFIX}/auth/google`, {
        email: googleUser.email,
      });
      if (response.status !== 200) {
        throw new Error('Failed to login with social account');
      }
      await login({
        access_token: response.headers['authorization'].replace('Bearer ', ''),
        refresh_token: response.headers['refreshtoken'].replace(
          'RefreshToken ',
          '',
        ),
      });
      return response.data;
    },
    onSuccess: () => {
      setIsAuthenticated(true);
    },
    onError: () => {
      showToast('로그인에 실패했습니다. 다시 시도해주세요.', 'error');
    },
  });

  const {mutateAsync: signUpMutation} = useMutation({
    mutationFn: async ({user: googleUser}: {user: GoogleUser}) => {
      const response = await customAxios.post(`${API_PREFIX}/auth/google`, {
        name: googleUser.name,
        email: googleUser.email,
        photoUrl: googleUser.photoUrl,
      });
      if (response.status !== 200) {
        throw new Error('Failed to sign up with social account');
      }
      await login({
        access_token: response.headers['authorization'].replace('Bearer ', ''),
        refresh_token: response.headers['refreshtoken'].replace(
          'RefreshToken ',
          '',
        ),
      });
      return response.data;
    },
    onSuccess: () => {
      setIsAuthenticated(true);
    },
    onError: () => {
      showToast('회원가입에 실패했습니다. 다시 시도해주세요.', 'error');
    },
  });

  const {mutateAsync: appleLoginMutation} = useMutation({
    mutationFn: async ({
      identityToken,
      email,
    }: {
      identityToken: string;
      email?: string;
    }) => {
      const response = await customAxios.post(`${API_PREFIX}/auth/apple`, {
        identityToken,
        email,
      });
      if (response.status !== 200) {
        throw new Error('Failed to login with Apple account');
      }
      await login({
        access_token: response.headers['authorization'].replace('Bearer ', ''),
        refresh_token: response.headers['refreshtoken'].replace(
          'RefreshToken ',
          '',
        ),
      });
      return response.data;
    },
    onSuccess: () => {
      setIsAuthenticated(true);
    },
    onError: () => {
      showToast('애플 로그인에 실패했습니다. 다시 시도해주세요.', 'error');
    },
  });

  const {mutateAsync: appleSignUpMutation} = useMutation({
    mutationFn: async ({
      identityToken,
      email,
      name,
    }: {
      identityToken: string;
      email: string;
      name?: string;
    }) => {
      const response = await customAxios.post(`${API_PREFIX}/auth/apple`, {
        identityToken,
        email,
        name,
      });
      if (response.status !== 200) {
        throw new Error('Failed to sign up with Apple account');
      }
      await login({
        access_token: response.headers['authorization'].replace('Bearer ', ''),
        refresh_token: response.headers['refreshtoken'].replace(
          'RefreshToken ',
          '',
        ),
      });
      return response.data;
    },
    onSuccess: () => {
      setIsAuthenticated(true);
    },
    onError: () => {
      showToast('애플 회원가입에 실패했습니다. 다시 시도해주세요.', 'error');
    },
  });

  const signInWithApple = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      if (!appleAuthRequestResponse.identityToken) {
        throw new Error('Apple Sign-In failed - No identity token');
      }

      const {identityToken, user: appleUserId, email, fullName} =
        appleAuthRequestResponse;

      const credentialState =
        await appleAuth.getCredentialStateForUser(appleUserId);

      if (credentialState === appleAuth.State.AUTHORIZED) {
        if (email) {
          const verifyResponse = await verifyMutation({email});
          if (verifyResponse.exists) {
            await appleLoginMutation({identityToken, email});
          } else {
            await appleSignUpMutation({
              identityToken,
              email,
              name: fullName
                ? `${fullName.givenName || ''} ${
                    fullName.familyName || ''
                  }`.trim()
                : undefined,
            });
          }
        } else {
          await appleLoginMutation({identityToken});
        }
      } else {
        showToast('애플 로그인에 실패했습니다.', 'error');
      }
    } catch (error: any) {
      if (error.code === appleAuth.Error.CANCELED) {
        return;
      }
      showToast('애플 로그인 중 오류가 발생했습니다.', 'error');
    }
  };

  const handleSignIn = async (name: ProviderType) => {
    try {
      if (name === 'APPLE') {
        await signInWithApple();
        return;
      }
      await signIn();
    } catch (error) {
      showToast('로그인에 실패했습니다.', 'error');
    }
  };

  const handleGoogleLoginFlow = async () => {
    if (!user) return;
    try {
      const verifyResponse = await verifyMutation({email: user.email});
      if (verifyResponse.exists) {
        await loginMutation({user});
      } else {
        await signUpMutation({user});
      }
    } catch (error) {
      showToast('로그인 중 오류가 발생했습니다. 다시 시도해주세요.', 'error');
    }
  };

  useEffect(() => {
    if (user) {
      handleGoogleLoginFlow();
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoid}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <View style={styles.messageSection}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.description}>{description}</Text>
            </View>

            <View style={styles.bottomSection}>
              <View style={styles.dividerRow}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>소셜로그인으로 계속하기</Text>
                <View style={styles.dividerLine} />
              </View>
              <View style={styles.socialLoginContainer}>
                <SocialLoginButton
                  name="GOOGLE"
                  onPress={() => handleSignIn('GOOGLE')}
                />
                {Platform.OS === 'ios' && (
                  <SocialLoginButton
                    name="APPLE"
                    onPress={() => handleSignIn('APPLE')}
                  />
                )}
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  messageSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Pretendard-Bold',
    color: colors.text.primary,
    textAlign: 'center',
  },
  description: {
    fontSize: 15,
    fontFamily: 'Pretendard-Regular',
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  bottomSection: {
    gap: 20,
    paddingBottom: 40,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.stroke,
  },
  dividerText: {
    fontSize: 14,
    color: colors.text.disabled,
    fontFamily: 'Pretendard-Regular',
  },
  socialLoginContainer: {
    justifyContent: 'center',
    gap: 12,
    marginBottom: Platform.select({
      ios: 0,
      android: 20,
    }),
  },
});

export default GuestSignInScreen;
