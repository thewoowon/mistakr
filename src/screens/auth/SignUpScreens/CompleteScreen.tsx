import useAuth from '@hooks/useAuth';
import React, {useEffect} from 'react';
import {Pressable, StatusBar, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../../constants';

const CompleteScreen = () => {
  const {setIsAuthenticated} = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAuthenticated(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.background}
        translucent={false}
      />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <Text style={styles.welcome}>mistakr에 오신것을</Text>
          <Text style={styles.welcome}>환영해요.</Text>
          <Text style={styles.subtitle}>
            실패에서 배우는 성공 전략, 지금 시작하세요.
          </Text>
        </View>
        <View style={styles.bottom}>
          <Pressable style={styles.button} onPress={() => setIsAuthenticated(true)}>
            <Text style={styles.buttonText}>시작하기</Text>
          </Pressable>
        </View>
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  welcome: {
    color: colors.text.primary,
    fontSize: 28,
    fontFamily: 'Pretendard-Bold',
  },
  subtitle: {
    color: colors.text.secondary,
    fontSize: 15,
    fontFamily: 'Pretendard-Regular',
    marginTop: 8,
  },
  bottom: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  button: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.background,
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
  },
});

export default CompleteScreen;
