import React, {useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTheme} from '@hooks/index';
import {typography} from '@constants/index';
import {useConsultingStore} from '../../store/consultingStore';
import {SessionCard} from '@components/consulting/SessionCard';
import {EmptyView} from '@components/EmptyView';
import type {ConsultingStackParamList} from '../../navigation/types';

type NavigationProp = NativeStackNavigationProp<ConsultingStackParamList>;

export function ConsultingHistoryScreen() {
  const colors = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const sessions = useConsultingStore(state => state.sessions);
  const fetchSessions = useConsultingStore(state => state.fetchSessions);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  const handleSessionPress = (sessionId: string) => {
    navigation.navigate('ConsultingResult', {sessionId});
  };

  if (sessions.length === 0) {
    return (
      <SafeAreaView
        edges={['bottom']}
        style={[styles.container, {backgroundColor: colors.background}]}>
        <EmptyView title="아직 컨설팅 기록이 없어요" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      edges={['bottom']}
      style={[styles.container, {backgroundColor: colors.background}]}>
      <FlatList
        data={sessions}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({item}) => (
          <View style={styles.cardWrapper}>
            <SessionCard
              session={item}
              onPress={() => handleSessionPress(item.id)}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 16,
    gap: 12,
  },
  cardWrapper: {
    width: '100%',
  },
});
