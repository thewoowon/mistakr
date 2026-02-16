import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRoute} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTheme} from '@hooks/index';
import {typography} from '@constants/index';
import {useConsultingStore} from '../../store/consultingStore';
import {RiskGauge} from '@components/consulting/RiskGauge';
import {RiskBarChart} from '@components/consulting/RiskBarChart';
import {MatchedCaseCard} from '@components/consulting/MatchedCaseCard';
import {TimelinePredictionCard} from '@components/consulting/TimelinePredictionCard';
import {ChecklistItemRow} from '@components/consulting/ChecklistItemRow';
import {AnalyzingOverlay} from '@components/consulting/AnalyzingOverlay';
import type {ConsultingStackParamList} from '../../navigation/types';

type ScreenProps = NativeStackScreenProps<ConsultingStackParamList, 'ConsultingResult'>;
type ScreenRouteProp = ScreenProps['route'];

export function ConsultingResultScreen() {
  const colors = useTheme();
  const route = useRoute<ScreenRouteProp>();
  const {sessionId} = route.params;

  const currentSession = useConsultingStore(state => state.currentSession);
  const fetchSession = useConsultingStore(state => state.fetchSession);
  const streaming = useConsultingStore(state => state.streaming);
  const toggleChecklistItem = useConsultingStore(
    state => state.toggleChecklistItem,
  );

  // currentSession이 없거나 다른 세션이면 서버에서 가져옴
  const session = currentSession?.id === sessionId ? currentSession : null;

  useEffect(() => {
    if (!session && streaming.phase === 'idle') {
      fetchSession(sessionId);
    }
  }, [session, sessionId, streaming.phase, fetchSession]);

  if (!session) {
    return (
      <SafeAreaView
        style={[styles.container, {backgroundColor: colors.background}]}>
        <AnalyzingOverlay phase={streaming.phase} progress={streaming.progress} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      edges={['bottom']}
      style={[styles.container, {backgroundColor: colors.background}]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        {/* 리스크 게이지 */}
        <View style={styles.gaugeSection}>
          <RiskGauge score={session.riskScore.overall} />
        </View>

        {/* 리스크 상세 바차트 */}
        <View
          style={[
            styles.section,
            {backgroundColor: colors.surface, borderColor: colors.stroke},
          ]}>
          <Text style={[styles.sectionTitle, {color: colors.text.primary}]}>
            리스크 상세 분석
          </Text>
          <RiskBarChart riskScore={session.riskScore} />
        </View>

        {/* 총평 */}
        <View
          style={[
            styles.section,
            {backgroundColor: colors.surface, borderColor: colors.stroke},
          ]}>
          <Text style={[styles.sectionTitle, {color: colors.text.primary}]}>
            총평
          </Text>
          <Text style={[styles.summary, {color: colors.text.secondary}]}>
            {session.executiveSummary}
          </Text>
        </View>

        {/* 위협 & 기회 */}
        <View
          style={[
            styles.section,
            {backgroundColor: colors.surface, borderColor: colors.stroke},
          ]}>
          <Text style={[styles.sectionTitle, {color: '#FF5A5F'}]}>
            상위 위협
          </Text>
          {session.topThreats.map((threat, i) => (
            <Text key={i} style={[styles.listItem, {color: colors.text.primary}]}>
              {i + 1}. {threat}
            </Text>
          ))}

          <Text style={[styles.sectionTitle, {color: '#66BB6A', marginTop: 20}]}>
            기회
          </Text>
          {session.topOpportunities.map((opp, i) => (
            <Text key={i} style={[styles.listItem, {color: colors.text.primary}]}>
              {i + 1}. {opp}
            </Text>
          ))}
        </View>

        {/* 유사 실패 사례 */}
        <View style={styles.flatSection}>
          <Text style={[styles.sectionTitle, {color: colors.text.primary}]}>
            유사 실패 사례
          </Text>
          {session.matchedCases.map(mc => (
            <MatchedCaseCard key={mc.caseId} matchedCase={mc} />
          ))}
        </View>

        {/* 타임라인 예측 */}
        <View
          style={[
            styles.section,
            {backgroundColor: colors.surface, borderColor: colors.stroke},
          ]}>
          <Text style={[styles.sectionTitle, {color: colors.text.primary}]}>
            타임라인 예측
          </Text>
          <TimelinePredictionCard predictions={session.timelinePredictions} />
        </View>

        {/* 체크리스트 */}
        <View style={styles.flatSection}>
          <Text style={[styles.sectionTitle, {color: colors.text.primary}]}>
            액션 체크리스트 ({session.checklist.length}개)
          </Text>
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
    gap: 16,
  },
  gaugeSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  section: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  flatSection: {
    gap: 0,
  },
  sectionTitle: {
    ...typography.h2,
    marginBottom: 16,
  },
  summary: {
    ...typography.body,
    lineHeight: 24,
  },
  listItem: {
    ...typography.body,
    lineHeight: 24,
    marginBottom: 4,
  },
});
