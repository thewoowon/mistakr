import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {NativeStackNavigationProp, NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTheme} from '@hooks/index';
import {typography} from '@constants/index';
import {industryMap} from '../../types/Case';
import {useIdeaStore} from '../../store/ideaStore';
import {useConsultingStore} from '../../store/consultingStore';
import {StepIndicator} from '@components/consulting/StepIndicator';
import {ChipSelector} from '@components/form/ChipSelector';
import {ToggleRow} from '@components/form/ToggleRow';
import {StepperInput} from '@components/form/StepperInput';
import type {ConsultingStackParamList} from '../../navigation/types';
import type {IdeaFormDraft, RevenueModel, StartupStage} from '../../types/Consulting';

type NavigationProp = NativeStackNavigationProp<
  ConsultingStackParamList,
  'IdeaInput'
>;
type ScreenProps = NativeStackScreenProps<ConsultingStackParamList, 'IdeaInput'>;
type ScreenRouteProp = ScreenProps['route'];

const TOTAL_STEPS = 4;

const revenueModelOptions = [
  {key: 'subscription' as RevenueModel, label: '구독'},
  {key: 'transaction' as RevenueModel, label: '거래 수수료'},
  {key: 'advertising' as RevenueModel, label: '광고'},
  {key: 'marketplace' as RevenueModel, label: '마켓플레이스'},
  {key: 'other' as RevenueModel, label: '기타'},
];

const stageOptions = [
  {key: 'idea' as StartupStage, label: '아이디어'},
  {key: 'prototype' as StartupStage, label: '프로토타입'},
  {key: 'mvp' as StartupStage, label: 'MVP'},
  {key: 'growth' as StartupStage, label: '성장'},
  {key: 'scaling' as StartupStage, label: '스케일링'},
];

const industryOptions = Object.entries(industryMap).map(([key, label]) => ({
  key,
  label,
}));

const initialDraft: IdeaFormDraft = {
  step: 1,
  companyName: '',
  industry: '',
  shortDescription: '',
  detailedDescription: '',
  founderCount: 1,
  hasIndustryExperience: false,
  hasTechnicalCofounder: false,
  teamSize: 1,
  targetMarket: '',
  revenueModel: '',
  currentStage: '',
  monthsSinceFounding: 0,
  currentMrr: null,
  totalFundingRaised: null,
  monthlyBurnRate: null,
};

export function IdeaInputScreen() {
  const colors = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ScreenRouteProp>();
  const saveDraft = useIdeaStore(state => state.saveDraft);
  const existingDraft = useIdeaStore(state => state.draft);
  const createIdea = useIdeaStore(state => state.createIdea);
  const startSession = useConsultingStore(state => state.startSession);

  const [step, setStep] = useState(existingDraft?.step || 1);
  const [form, setForm] = useState<IdeaFormDraft>(existingDraft || initialDraft);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateForm = useCallback(
    (updates: Partial<IdeaFormDraft>) => {
      setForm(prev => {
        const next = {...prev, ...updates};
        saveDraft(next);
        return next;
      });
    },
    [saveDraft],
  );

  const handleNext = useCallback(() => {
    if (step < TOTAL_STEPS) {
      const nextStep = step + 1;
      setStep(nextStep);
      updateForm({step: nextStep});
    }
  }, [step, updateForm]);

  const handleBack = useCallback(() => {
    if (step > 1) {
      const prevStep = step - 1;
      setStep(prevStep);
      updateForm({step: prevStep});
    }
  }, [step, updateForm]);

  const handleSubmit = useCallback(async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const ideaId = await createIdea(form);
      const sessionId = await startSession(ideaId, form.companyName);
      navigation.replace('ConsultingResult', {sessionId});
    } catch (error) {
      setIsSubmitting(false);
    }
  }, [form, navigation, createIdea, startSession, isSubmitting]);

  const isStepValid = useCallback(() => {
    switch (step) {
      case 1:
        return (
          form.companyName.trim().length > 0 &&
          form.industry.length > 0 &&
          form.shortDescription.trim().length > 0
        );
      case 2:
        return form.founderCount >= 1 && form.teamSize >= 1;
      case 3:
        return (
          form.revenueModel !== '' && form.currentStage !== ''
        );
      case 4:
        return true;
      default:
        return false;
    }
  }, [step, form]);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.stepContent}>
            <Text style={[styles.stepTitle, {color: colors.text.primary}]}>
              기본 정보
            </Text>
            <Text style={[styles.stepDesc, {color: colors.text.secondary}]}>
              분석할 스타트업의 기본 정보를 입력해주세요
            </Text>

            <Text style={[styles.label, {color: colors.text.secondary}]}>
              프로젝트 이름
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.surface,
                  color: colors.text.primary,
                  borderColor: colors.stroke,
                },
              ]}
              value={form.companyName}
              onChangeText={v => updateForm({companyName: v})}
              placeholder="예: 프레시밀"
              placeholderTextColor={colors.text.disabled}
            />

            <Text style={[styles.label, {color: colors.text.secondary}]}>
              업종
            </Text>
            <ChipSelector
              options={industryOptions}
              selected={form.industry}
              onSelect={v => updateForm({industry: v})}
            />

            <Text style={[styles.label, {color: colors.text.secondary}]}>
              한 줄 설명
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.surface,
                  color: colors.text.primary,
                  borderColor: colors.stroke,
                },
              ]}
              value={form.shortDescription}
              onChangeText={v => updateForm({shortDescription: v})}
              placeholder="어떤 서비스인지 한 줄로 설명해주세요"
              placeholderTextColor={colors.text.disabled}
            />

            <Text style={[styles.label, {color: colors.text.secondary}]}>
              상세 설명
            </Text>
            <TextInput
              style={[
                styles.input,
                styles.textArea,
                {
                  backgroundColor: colors.surface,
                  color: colors.text.primary,
                  borderColor: colors.stroke,
                },
              ]}
              value={form.detailedDescription}
              onChangeText={v => updateForm({detailedDescription: v})}
              placeholder="타겟 고객, 해결하려는 문제, 핵심 기능 등을 자유롭게 작성해주세요"
              placeholderTextColor={colors.text.disabled}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        );

      case 2:
        return (
          <View style={styles.stepContent}>
            <Text style={[styles.stepTitle, {color: colors.text.primary}]}>
              팀 정보
            </Text>
            <Text style={[styles.stepDesc, {color: colors.text.secondary}]}>
              팀 구성에 대해 알려주세요
            </Text>

            <Text style={[styles.label, {color: colors.text.secondary}]}>
              창업자 수
            </Text>
            <StepperInput
              value={form.founderCount}
              onChange={v => updateForm({founderCount: v})}
              min={1}
              max={10}
            />

            <Text style={[styles.label, {color: colors.text.secondary}]}>
              전체 팀 규모
            </Text>
            <StepperInput
              value={form.teamSize}
              onChange={v => updateForm({teamSize: v})}
              min={1}
              max={500}
            />

            <ToggleRow
              label="업계 경험이 있나요?"
              value={form.hasIndustryExperience}
              onToggle={v => updateForm({hasIndustryExperience: v})}
            />

            <ToggleRow
              label="기술 공동창업자가 있나요?"
              value={form.hasTechnicalCofounder}
              onToggle={v => updateForm({hasTechnicalCofounder: v})}
            />
          </View>
        );

      case 3:
        return (
          <View style={styles.stepContent}>
            <Text style={[styles.stepTitle, {color: colors.text.primary}]}>
              비즈니스 정보
            </Text>
            <Text style={[styles.stepDesc, {color: colors.text.secondary}]}>
              비즈니스 모델과 현재 상황을 알려주세요
            </Text>

            <Text style={[styles.label, {color: colors.text.secondary}]}>
              수익 모델
            </Text>
            <ChipSelector
              options={revenueModelOptions}
              selected={form.revenueModel}
              onSelect={v => updateForm({revenueModel: v as RevenueModel})}
            />

            <Text style={[styles.label, {color: colors.text.secondary}]}>
              현재 단계
            </Text>
            <ChipSelector
              options={stageOptions}
              selected={form.currentStage}
              onSelect={v => updateForm({currentStage: v as StartupStage})}
            />

            <Text style={[styles.label, {color: colors.text.secondary}]}>
              타겟 시장
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.surface,
                  color: colors.text.primary,
                  borderColor: colors.stroke,
                },
              ]}
              value={form.targetMarket}
              onChangeText={v => updateForm({targetMarket: v})}
              placeholder="예: 25-40세 맞벌이 가정"
              placeholderTextColor={colors.text.disabled}
            />

            <Text style={[styles.label, {color: colors.text.secondary}]}>
              창업 후 경과 개월 수
            </Text>
            <StepperInput
              value={form.monthsSinceFounding}
              onChange={v => updateForm({monthsSinceFounding: v})}
              min={0}
              max={120}
            />

            <Text style={[styles.label, {color: colors.text.secondary}]}>
              월 반복 매출 (원, 선택)
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.surface,
                  color: colors.text.primary,
                  borderColor: colors.stroke,
                },
              ]}
              value={form.currentMrr?.toString() || ''}
              onChangeText={v =>
                updateForm({currentMrr: v ? Number(v) : null})
              }
              placeholder="예: 2500000"
              placeholderTextColor={colors.text.disabled}
              keyboardType="numeric"
            />

            <Text style={[styles.label, {color: colors.text.secondary}]}>
              월간 번율 (원, 선택)
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.surface,
                  color: colors.text.primary,
                  borderColor: colors.stroke,
                },
              ]}
              value={form.monthlyBurnRate?.toString() || ''}
              onChangeText={v =>
                updateForm({monthlyBurnRate: v ? Number(v) : null})
              }
              placeholder="예: 35000000"
              placeholderTextColor={colors.text.disabled}
              keyboardType="numeric"
            />
          </View>
        );

      case 4:
        return (
          <View style={styles.stepContent}>
            <Text style={[styles.stepTitle, {color: colors.text.primary}]}>
              확인
            </Text>
            <Text style={[styles.stepDesc, {color: colors.text.secondary}]}>
              입력한 정보를 확인하고 분석을 시작하세요
            </Text>

            <View
              style={[
                styles.summaryCard,
                {backgroundColor: colors.surface, borderColor: colors.stroke},
              ]}>
              <SummaryRow label="프로젝트" value={form.companyName} colors={colors} />
              <SummaryRow
                label="업종"
                value={industryMap[form.industry] || form.industry}
                colors={colors}
              />
              <SummaryRow label="설명" value={form.shortDescription} colors={colors} />
              <SummaryRow
                label="팀 규모"
                value={`창업자 ${form.founderCount}명 / 전체 ${form.teamSize}명`}
                colors={colors}
              />
              <SummaryRow
                label="수익 모델"
                value={
                  revenueModelOptions.find(o => o.key === form.revenueModel)
                    ?.label || '-'
                }
                colors={colors}
              />
              <SummaryRow
                label="현재 단계"
                value={
                  stageOptions.find(o => o.key === form.currentStage)?.label ||
                  '-'
                }
                colors={colors}
              />
              {form.currentMrr != null && form.currentMrr > 0 && (
                <SummaryRow
                  label="월 매출"
                  value={`${form.currentMrr.toLocaleString()}원`}
                  colors={colors}
                />
              )}
              {form.monthlyBurnRate != null && form.monthlyBurnRate > 0 && (
                <SummaryRow
                  label="월간 번율"
                  value={`${form.monthlyBurnRate.toLocaleString()}원`}
                  colors={colors}
                />
              )}
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView
      edges={['bottom']}
      style={[styles.container, {backgroundColor: colors.background}]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <StepIndicator currentStep={step} totalSteps={TOTAL_STEPS} />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          {renderStep()}
        </ScrollView>

        <View
          style={[
            styles.footer,
            {borderTopColor: colors.stroke},
          ]}>
          {step > 1 && (
            <TouchableOpacity
              style={[
                styles.backButton,
                {borderColor: colors.stroke},
              ]}
              onPress={handleBack}>
              <Text style={[styles.backButtonText, {color: colors.text.primary}]}>
                이전
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[
              styles.nextButton,
              {
                backgroundColor: isStepValid() && !isSubmitting
                  ? colors.accent
                  : colors.text.disabled,
              },
              step === 1 && styles.fullWidth,
            ]}
            onPress={step === TOTAL_STEPS ? handleSubmit : handleNext}
            disabled={!isStepValid() || isSubmitting}>
            {isSubmitting ? (
              <ActivityIndicator size="small" color="#161616" />
            ) : (
              <Text style={styles.nextButtonText}>
                {step === TOTAL_STEPS ? '분석 시작' : '다음'}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function SummaryRow({
  label,
  value,
  colors,
}: {
  label: string;
  value: string;
  colors: any;
}) {
  return (
    <View style={styles.summaryRow}>
      <Text style={[styles.summaryLabel, {color: colors.text.secondary}]}>
        {label}
      </Text>
      <Text
        style={[styles.summaryValue, {color: colors.text.primary}]}
        numberOfLines={2}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  stepContent: {
    gap: 4,
  },
  stepTitle: {
    ...typography.h1,
    marginBottom: 4,
  },
  stepDesc: {
    ...typography.body,
    marginBottom: 20,
  },
  label: {
    ...typography.caption,
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    fontFamily: 'Pretendard-Medium',
  },
  textArea: {
    minHeight: 100,
    paddingTop: 14,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    borderTopWidth: 1,
  },
  backButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
  },
  backButtonText: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 16,
  },
  nextButton: {
    flex: 2,
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
  },
  fullWidth: {
    flex: 1,
  },
  nextButtonText: {
    color: '#161616',
    fontFamily: 'Pretendard-Bold',
    fontSize: 16,
  },
  summaryCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  summaryLabel: {
    ...typography.caption,
    width: 80,
  },
  summaryValue: {
    ...typography.body,
    flex: 1,
    textAlign: 'right',
  },
});
