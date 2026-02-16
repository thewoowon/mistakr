import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRoute} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTheme} from '@hooks/index';
import {typography} from '@constants/index';
import {useConsultingStore} from '../../store/consultingStore';
import {ChecklistItemRow} from '@components/consulting/ChecklistItemRow';
import type {ConsultingStackParamList} from '../../navigation/types';

type ScreenProps = NativeStackScreenProps<ConsultingStackParamList, 'ChecklistProgress'>;
type ScreenRouteProp = ScreenProps['route'];

export function ChecklistProgressScreen() {
  const colors = useTheme();
  const route = useRoute<ScreenRouteProp>();
  const {sessionId} = route.params;

  const currentSession = useConsultingStore(state => state.currentSession);
  const fetchSession = useConsultingStore(state => state.fetchSession);
  const toggleChecklistItem = useConsultingStore(
    state => state.toggleChecklistItem,
  );

  const session = currentSession?.id === sessionId ? currentSession : null;

  useEffect(() => {
    if (!session) {
      fetchSession(sessionId);
    }
  }, [session, sessionId, fetchSession]);

  if (!session) {
    return (
      <SafeAreaView
        style={[styles.container, {backgroundColor: colors.background}]}>
        <Text style={{color: colors.text.primary}}>세션을 찾을 수 없습니다</Text>
      </SafeAreaView>
    );
  }

  const completedCount = session.checklist.filter(c => c.isCompleted).length;
  const totalCount = session.checklist.length;
  const progressPercent =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <SafeAreaView
      edges={['bottom']}
      style={[styles.container, {backgroundColor: colors.background}]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        {/* 진행률 */}
        <View
          style={[
            styles.progressCard,
            {backgroundColor: colors.surface, borderColor: colors.stroke},
          ]}>
          <View style={styles.progressHeader}>
            <Text style={[styles.progressTitle, {color: colors.text.primary}]}>
              완료율
            </Text>
            <Text style={[styles.progressPercent, {color: colors.accent}]}>
              {progressPercent}%
            </Text>
          </View>
          <View style={[styles.progressBar, {backgroundColor: colors.stroke}]}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${progressPercent}%`,
                  backgroundColor: colors.accent,
                },
              ]}
            />
          </View>
          <Text style={[styles.progressCount, {color: colors.text.secondary}]}>
            {completedCount} / {totalCount} 완료
          </Text>
        </View>

        {/* 체크리스트 */}
        <View style={styles.checklist}>
          {session.checklist.map(item => (
            <ChecklistItemRow
              key={item.id}
              item={item}
              onToggle={() => toggleChecklistItem(sessionId, item.id)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  progressCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 24,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    ...typography.h2,
  },
  progressPercent: {
    fontSize: 28,
    fontFamily: 'Pretendard-ExtraBold',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressCount: {
    ...typography.caption,
    textAlign: 'right',
  },
  checklist: {
    gap: 0,
  },
});
