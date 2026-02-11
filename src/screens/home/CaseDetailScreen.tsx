import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { typography } from '../../constants';
import { useTheme } from '../../hooks/useTheme';
import { HomeStackParamList } from '../../navigation/types';
import {
  NodeGraph,
  TimelineSlider,
  NodeDetailModal,
  BookmarkButton,
} from '../../components';
import {
  mockCases,
  mockNodes,
  mockEdges,
  mockLessons,
} from '../../data/mockCases';
import { LayoutNode } from '../../types';
import { getTimeRange } from '../../utils';

type Props = NativeStackScreenProps<HomeStackParamList, 'CaseDetail'>;

export function CaseDetailScreen({ route, navigation }: Props) {
  const { caseId } = route.params;
  const insets = useSafeAreaInsets();
  const colors = useTheme();

  const caseData = mockCases.find(c => c.caseId === caseId);
  const nodes = mockNodes.filter(n => n.caseId === caseId);
  const edges = mockEdges.filter(e => e.caseId === caseId);
  const lessons = mockLessons.filter(l => l.caseId === caseId);

  const timeRange = useMemo(() => getTimeRange(nodes), [nodes]);

  const [currentTime, setCurrentTime] = useState(timeRange.max);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedNode, setSelectedNode] = useState<LayoutNode | null>(null);

  useEffect(() => {
    if (caseData) {
      navigation.setOptions({
        title: caseData.koreanCompanyName,
        headerTitleStyle: {
          fontFamily: 'Pretendard-SemiBold',
          color: 'white',
        },
        headerBackTitle: '홈화면', // 텍스트 제거
        // headerBackTitleVisible: false, // (stack 호환)
        // headerBackButtonDisplayMode: 'minimal', // iOS native-stack에서 가장 확실
        headerRight: () => <BookmarkButton caseId={caseId} />,
      });
    }
  }, [caseData, caseId, navigation]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentTime(prev => {
        const step = (timeRange.max - timeRange.min) / 50;
        const next = prev + step;
        if (next >= timeRange.max) {
          setIsPlaying(false);
          return timeRange.max;
        }
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, timeRange]);

  const handlePlayToggle = useCallback(() => {
    if (currentTime >= timeRange.max) {
      setCurrentTime(timeRange.min);
    }
    setIsPlaying(prev => !prev);
  }, [currentTime, timeRange]);

  const handleNodePress = useCallback((node: LayoutNode) => {
    setSelectedNode(node);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedNode(null);
  }, []);

  if (!caseData) {
    return (
      <View
        style={[styles.errorContainer, { backgroundColor: colors.background }]}
      >
        <Text style={[styles.errorText, { color: colors.text.secondary }]}>
          Case not found
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Node Graph */}
        <View style={styles.graphSection}>
          <NodeGraph
            nodes={nodes}
            edges={edges}
            currentTime={currentTime}
            onNodePress={handleNodePress}
          />
        </View>

        {/* Timeline Slider */}
        <View style={styles.sliderSection}>
          <TimelineSlider
            minTime={timeRange.min}
            maxTime={timeRange.max}
            currentTime={currentTime}
            onTimeChange={setCurrentTime}
            onPlayToggle={handlePlayToggle}
            isPlaying={isPlaying}
          />
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>요약</Text>
          <Text style={styles.description}>
            {caseData.longDescription || caseData.shortDescription}
          </Text>
        </View>

        {/* Key Events */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>주요 이벤트</Text>
          {nodes.map((node, index) => (
            <View
              key={node.id}
              style={[
                styles.eventItem,
                nodes.length - 1 === index && {
                  marginBottom: 0,
                },
              ]}
            >
              <View
                style={[styles.eventDot, { backgroundColor: colors.accent }]}
              />
              <View style={styles.eventContent}>
                <Text
                  style={[styles.eventLabel, { color: colors.text.primary }]}
                >
                  {node.label}
                </Text>
                {node.date && (
                  <Text
                    style={[styles.eventDate, { color: colors.text.secondary }]}
                  >
                    {node.date}
                  </Text>
                )}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <View
            style={{
              borderRadius: 10,
              width: '100%',
              height: 107,
              overflow: 'hidden',
            }}
          >
            <Image
              source={require(`../../assets/images/musinsa.png`)} // 프로필 이미지 경로
              style={{ width: '100%', height: 107 }} // 이미지 스타일
              resizeMode="cover"
            />
          </View>
          <View
            style={{
              position: 'absolute',
              top: 40,
              right: 20,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Pretendard-Bold',
                lineHeight: 22,
                color: '#000000',
              }}
            >
              musinsa standard
            </Text>
          </View>
        </View>

        {/* Lessons Learned */}
        {lessons.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
              배울점 & 교훈
            </Text>
            <Text style={[styles.description, { marginBottom: 16 }]}>
              {caseData.longDescription || caseData.shortDescription}
            </Text>
            {lessons.map(lesson => (
              <View key={lesson.id} style={styles.lessonCard}>
                <Text style={styles.lessonText}>{lesson.lessonText}</Text>
                {lesson.category && (
                  <View style={styles.lessonCategory}>
                    <Text style={styles.lessonCategoryText}>
                      {lesson.category}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Node Detail Modal */}
      <NodeDetailModal
        node={selectedNode}
        visible={!!selectedNode}
        onClose={handleCloseModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    ...typography.body,
  },
  graphSection: {
    marginBottom: 8,
  },
  sliderSection: {
    marginBottom: 24,
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
    lineHeight: 16,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  description: {
    fontSize: 12,
    fontFamily: 'Pretendard-Regular',
    lineHeight: 16,
    color: '#DDDDDD',
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  eventDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
    marginRight: 12,
  },
  eventContent: {
    flex: 1,
  },
  eventLabel: {
    fontSize: 14,
    fontFamily: 'Pretendard-SemiBold',
    lineHeight: 21,
    color: '#FFFFFF',
  },
  eventDate: {
    fontSize: 10,
    fontFamily: 'Pretendard-Regular',
    lineHeight: 14,
    color: '#DDDDDD',
  },
  lessonCard: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 0.5,
    borderColor: '#666666',
    backgroundColor: '#1C1C1C',
  },
  lessonText: {
    fontSize: 14,
    fontFamily: 'Pretendard-SemiBold',
    lineHeight: 22,
    marginBottom: 6,
    color: '#FFFFFF',
  },
  lessonCategory: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#E0FB8A',
  },
  lessonCategoryText: {
    fontSize: 10,
    fontFamily: 'Pretendard-SemiBold',
    lineHeight: 12,
    textTransform: 'capitalize',
    color: '#E0FB8A',
  },
});
