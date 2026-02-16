// === 사용자 스타트업 아이디어 ===
export type StartupStage =
  | 'idea'
  | 'prototype'
  | 'mvp'
  | 'growth'
  | 'scaling';

export type RevenueModel =
  | 'subscription'
  | 'transaction'
  | 'advertising'
  | 'marketplace'
  | 'other';

export interface StartupIdea {
  id: string;
  userId: string;
  companyName: string;
  industry: string;
  shortDescription: string;
  detailedDescription: string;
  founderCount: number;
  hasIndustryExperience: boolean;
  hasTechnicalCofounder: boolean;
  teamSize: number;
  targetMarket: string;
  revenueModel: RevenueModel;
  currentStage: StartupStage;
  monthsSinceFounding: number;
  currentMrr: number | null;
  totalFundingRaised: number | null;
  monthlyBurnRate: number | null;
  createdAt: string;
  updatedAt: string;
}

// === 리스크 점수 ===
export interface RiskScore {
  overall: number;
  pmfRisk: number;
  financialRisk: number;
  teamRisk: number;
  marketRisk: number;
  timingRisk: number;
  competitionRisk: number;
  executionRisk: number;
}

// === 타임라인 예측 ===
export interface TimelinePrediction {
  milestone: string;
  predictedMonth: number;
  confidence: number;
  riskLevel?: string;
  basedOnCases?: string[];
  description?: string;
}

// === 체크리스트 ===
export type ChecklistPriority = 'critical' | 'high' | 'medium' | 'low';

export interface ChecklistItem {
  id: string;
  action: string;
  priority: ChecklistPriority;
  category: string;
  deadline?: string | null;
  basedOnCase?: string | null;
  reason: string;
  isCompleted: boolean;
}

// === 매칭된 케이스 ===
export interface MatchedCase {
  caseId: string;
  companyName: string;
  industry?: string;
  similarityScore: number;
  matchReasons: string[];
  keyLessons: string[];
  relevantWarningSigns?: string[];
}

// === 컨설팅 세션 상태 ===
export type ConsultingSessionStatus =
  | 'pending'
  | 'analyzing'
  | 'matching'
  | 'generating'
  | 'completed'
  | 'failed';

// === 컨설팅 세션 ===
export interface ConsultingSession {
  id: string;
  userId?: string;
  startupIdeaId: string;
  startupIdeaName?: string;
  riskScore: RiskScore;
  matchedCases: MatchedCase[];
  timelinePredictions: TimelinePrediction[];
  checklist: ChecklistItem[];
  executiveSummary: string;
  topThreats: string[];
  topOpportunities: string[];
  status: ConsultingSessionStatus;
  sessionNumber?: number;
  previousSessionId?: string | null;
  createdAt: string;
}

// === 스트리밍 이벤트 ===
export type StreamingPhase =
  | 'idle'
  | 'matching'
  | 'analyzing'
  | 'generating'
  | 'completed'
  | 'failed';

export interface StreamingState {
  phase: StreamingPhase;
  progress: number;
  currentText: string;
  error: string | null;
  matchedCases?: MatchedCase[];
}

// === 세션 목록 아이템 (서버 간소화 응답) ===
export interface SessionListItem {
  id: string;
  ideaName: string;
  status: ConsultingSessionStatus;
  riskOverall: number | null;
  checklistTotal: number;
  checklistCompleted: number;
  createdAt: string;
}

// === 아이디어 입력 폼 드래프트 ===
export interface IdeaFormDraft {
  step: number;
  companyName: string;
  industry: string;
  shortDescription: string;
  detailedDescription: string;
  founderCount: number;
  hasIndustryExperience: boolean;
  hasTechnicalCofounder: boolean;
  teamSize: number;
  targetMarket: string;
  revenueModel: RevenueModel | '';
  currentStage: StartupStage | '';
  monthsSinceFounding: number;
  currentMrr: number | null;
  totalFundingRaised: number | null;
  monthlyBurnRate: number | null;
}
