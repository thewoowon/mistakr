import React, {useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTheme} from '@hooks/index';
import {typography} from '@constants/index';
import {ConsultingIcon} from '@components/Icons';
import {useConsultingStore} from '../../store/consultingStore';
import type {ConsultingStackParamList} from '../../navigation/types';
import {SessionCard} from '@components/consulting/SessionCard';

type NavigationProp = NativeStackNavigationProp<ConsultingStackParamList>;

export function ConsultingHomeScreen() {
  const colors = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const sessions = useConsultingStore(state => state.sessions);

  const handleStartNew = useCallback(() => {
    navigation.navigate('IdeaInput', {});
  }, [navigation]);

  const handleViewHistory = useCallback(() => {
    navigation.navigate('ConsultingHistory');
  }, [navigation]);

  const handleSessionPress = useCallback(
    (sessionId: string) => {
      navigation.navigate('ConsultingResult', {sessionId});
    },
    [navigation],
  );

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, {color: colors.text.primary}]}>
            AI 실패 컨설턴트
          </Text>
          <Text style={[styles.subtitle, {color: colors.text.secondary}]}>
            당신의 아이디어, 실패에서 배우세요
          </Text>
        </View>

        <View style={styles.heroSection}>
          <View
            style={[
              styles.heroCard,
              {backgroundColor: colors.surface, borderColor: colors.stroke},
            ]}>
            <ConsultingIcon width={48} height={48} color={colors.accent} />
            <Text style={[styles.heroTitle, {color: colors.text.primary}]}>
              스타트업 리스크 진단
            </Text>
            <Text style={[styles.heroDesc, {color: colors.text.secondary}]}>
              아이디어를 입력하면 유사한 실패 사례를 분석해서{'\n'}
              맞춤형 리스크 리포트를 제공합니다
            </Text>
            <TouchableOpacity
              style={[styles.ctaButton, {backgroundColor: colors.accent}]}
              onPress={handleStartNew}
              activeOpacity={0.8}>
              <Text style={styles.ctaText}>새로운 분석 시작</Text>
            </TouchableOpacity>
          </View>
        </View>

        {sessions.length > 0 && (
          <View style={styles.recentSection}>
            <View style={styles.sectionHeader}>
              <Text
                style={[styles.sectionTitle, {color: colors.text.primary}]}>
                최근 컨설팅
              </Text>
              <TouchableOpacity onPress={handleViewHistory}>
                <Text style={[styles.viewAll, {color: colors.accent}]}>
                  전체 보기
                </Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={sessions.slice(0, 5)}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.sessionList}
              renderItem={({item}) => (
                <SessionCard
                  session={item}
                  onPress={() => handleSessionPress(item.id)}
                />
              )}
            />
          </View>
        )}

        <View style={styles.infoSection}>
          <Text style={[styles.sectionTitle, {color: colors.text.primary}]}>
            이런 걸 알려드려요
          </Text>
          <View style={styles.infoCards}>
            {[
              {
                emoji: '📊',
                title: '리스크 점수',
                desc: 'PMF, 재무, 경쟁 등 7가지 리스크 분석',
              },
              {
                emoji: '🔍',
                title: '유사 실패 사례',
                desc: '당신과 비슷한 실패 스타트업 매칭',
              },
              {
                emoji: '📅',
                title: '타임라인 예측',
                desc: '위기가 올 시점을 미리 예측',
              },
              {
                emoji: '✅',
                title: '액션 체크리스트',
                desc: '지금 바로 실행할 수 있는 대응 방안',
              },
            ].map(item => (
              <View
                key={item.title}
                style={[
                  styles.infoCard,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.stroke,
                  },
                ]}>
                <Text style={styles.infoEmoji}>{item.emoji}</Text>
                <Text
                  style={[styles.infoTitle, {color: colors.text.primary}]}>
                  {item.title}
                </Text>
                <Text
                  style={[styles.infoDesc, {color: colors.text.secondary}]}>
                  {item.desc}
                </Text>
              </View>
            ))}
          </View>
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
  header: {
    marginBottom: 24,
    marginTop: 8,
  },
  title: {
    ...typography.display,
    marginBottom: 4,
  },
  subtitle: {
    ...typography.body,
  },
  heroSection: {
    marginBottom: 32,
  },
  heroCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 24,
    alignItems: 'center',
  },
  heroTitle: {
    ...typography.h1,
    marginTop: 16,
    marginBottom: 8,
  },
  heroDesc: {
    ...typography.body,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  ctaButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 18,
    width: '100%',
    alignItems: 'center',
  },
  ctaText: {
    color: '#161616',
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
  },
  recentSection: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    ...typography.h2,
  },
  viewAll: {
    ...typography.body,
  },
  sessionList: {
    gap: 12,
  },
  infoSection: {
    marginBottom: 16,
  },
  infoCards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 16,
  },
  infoCard: {
    width: '47%',
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  infoEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  infoTitle: {
    ...typography.h3,
    marginBottom: 4,
  },
  infoDesc: {
    ...typography.caption,
    lineHeight: 18,
  },
});
