import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '@hooks/index';
import {typography} from '@constants/index';
import type {RiskScore} from '../../types/Consulting';

interface RiskBarChartProps {
  riskScore: RiskScore;
}

const RISK_LABELS: {key: keyof Omit<RiskScore, 'overall'>; label: string}[] = [
  {key: 'pmfRisk', label: 'PMF'},
  {key: 'financialRisk', label: '재무'},
  {key: 'teamRisk', label: '팀'},
  {key: 'marketRisk', label: '시장'},
  {key: 'timingRisk', label: '타이밍'},
  {key: 'competitionRisk', label: '경쟁'},
  {key: 'executionRisk', label: '실행'},
];

function getBarColor(score: number): string {
  if (score <= 30) {return '#66BB6A';}
  if (score <= 60) {return '#FFB020';}
  if (score <= 80) {return '#FFA726';}
  return '#FF5A5F';
}

export function RiskBarChart({riskScore}: RiskBarChartProps) {
  const colors = useTheme();

  return (
    <View style={styles.container}>
      {RISK_LABELS.map(({key, label}) => {
        const score = riskScore[key];
        return (
          <View key={key} style={styles.row}>
            <Text style={[styles.label, {color: colors.text.secondary}]}>
              {label}
            </Text>
            <View style={[styles.barBg, {backgroundColor: colors.stroke}]}>
              <View
                style={[
                  styles.barFill,
                  {
                    width: `${score}%`,
                    backgroundColor: getBarColor(score),
                  },
                ]}
              />
            </View>
            <Text style={[styles.score, {color: colors.text.primary}]}>
              {score}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  label: {
    ...typography.caption,
    width: 48,
  },
  barBg: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  score: {
    ...typography.caption,
    fontFamily: 'Pretendard-SemiBold',
    width: 28,
    textAlign: 'right',
  },
});
