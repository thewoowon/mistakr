import type {
  ConsultingSession,
  RiskScore,
  MatchedCase,
  TimelinePrediction,
  ChecklistItem,
  IdeaFormDraft,
} from '../types/Consulting';
import type {SessionListItem} from '../types/Consulting';

// === 서버 응답 → 앱 타입 변환 ===

export function mapRiskScore(server: any): RiskScore {
  return {
    overall: server.overall ?? 0,
    pmfRisk: server.pmf ?? 0,
    financialRisk: server.financial ?? 0,
    teamRisk: server.team ?? 0,
    marketRisk: server.market ?? 0,
    timingRisk: server.timing ?? 0,
    competitionRisk: server.competition ?? 0,
    executionRisk: server.execution ?? 0,
  };
}

export function mapMatchedCase(server: any): MatchedCase {
  return {
    caseId: String(server.case_id),
    companyName: server.company_name ?? '',
    industry: server.industry ?? '',
    similarityScore: server.similarity ?? 0,
    matchReasons: server.match_reasons ?? [],
    keyLessons: server.key_lesson
      ? [server.key_lesson]
      : server.key_lessons ?? [],
    relevantWarningSigns: server.relevant_warning_signs ?? [],
  };
}

export function mapTimeline(server: any): TimelinePrediction {
  return {
    milestone: server.event ?? '',
    predictedMonth: server.month ?? 0,
    confidence: server.confidence ?? 0,
    riskLevel: server.risk_level,
    basedOnCases: server.based_on_cases ?? [],
    description: server.description ?? '',
  };
}

export function mapChecklist(server: any): ChecklistItem {
  return {
    id: String(server.id),
    action: server.action ?? '',
    priority: server.priority ?? 'medium',
    category: server.category ?? '',
    deadline: server.deadline ?? null,
    basedOnCase: server.based_on_case ?? null,
    reason: server.reason ?? '',
    isCompleted: server.is_completed ?? false,
  };
}

export function mapSession(server: any): ConsultingSession {
  return {
    id: String(server.id),
    userId: server.user_id ? String(server.user_id) : undefined,
    startupIdeaId: String(server.idea_id),
    startupIdeaName: server.idea_name ?? '',
    riskScore: server.risk_score ? mapRiskScore(server.risk_score) : {
      overall: 0, pmfRisk: 0, financialRisk: 0, teamRisk: 0,
      marketRisk: 0, timingRisk: 0, competitionRisk: 0, executionRisk: 0,
    },
    matchedCases: (server.matched_cases ?? []).map(mapMatchedCase),
    timelinePredictions: (server.timeline_predictions ?? []).map(mapTimeline),
    checklist: (server.checklist ?? []).map(mapChecklist),
    executiveSummary: server.executive_summary ?? '',
    topThreats: server.threats ?? [],
    topOpportunities: server.opportunities ?? [],
    status: server.status ?? 'pending',
    sessionNumber: server.session_number,
    previousSessionId: server.previous_session_id
      ? String(server.previous_session_id)
      : undefined,
    createdAt: server.created_at ?? new Date().toISOString(),
  };
}

export function mapSessionCompleted(server: any): ConsultingSession {
  // completed SSE 이벤트의 data 형식은 get_session_detail과 약간 다름
  // risk_scores (복수) 키를 사용
  const riskScores = server.risk_scores ?? server.risk_score;
  return {
    id: String(server.session_id ?? server.id),
    startupIdeaId: server.idea_id ? String(server.idea_id) : '',
    startupIdeaName: server.idea_name ?? '',
    riskScore: riskScores ? mapRiskScore(riskScores) : {
      overall: 0, pmfRisk: 0, financialRisk: 0, teamRisk: 0,
      marketRisk: 0, timingRisk: 0, competitionRisk: 0, executionRisk: 0,
    },
    matchedCases: (server.matched_cases ?? []).map(mapMatchedCase),
    timelinePredictions: (server.timeline_predictions ?? []).map(mapTimeline),
    checklist: (server.checklist ?? []).map(mapChecklist),
    executiveSummary: server.executive_summary ?? '',
    topThreats: server.threats ?? [],
    topOpportunities: server.opportunities ?? [],
    status: 'completed',
    createdAt: server.created_at ?? new Date().toISOString(),
  };
}

export function mapSessionList(server: any): SessionListItem {
  return {
    id: String(server.id),
    ideaName: server.idea_name ?? '',
    status: server.status ?? 'pending',
    riskOverall: server.risk_overall ?? null,
    checklistTotal: server.checklist_total ?? 0,
    checklistCompleted: server.checklist_completed ?? 0,
    createdAt: server.created_at ?? '',
  };
}

// === 앱 폼 → 서버 요청 변환 ===

export function mapFormToIdeaCreate(form: IdeaFormDraft): Record<string, any> {
  return {
    name: form.companyName,
    industry: form.industry,
    description: form.shortDescription
      ? `${form.shortDescription}${form.detailedDescription ? '\n\n' + form.detailedDescription : ''}`
      : undefined,
    stage: form.currentStage || undefined,
    revenue_model: form.revenueModel || undefined,
    team_size: form.teamSize || undefined,
    has_technical_cofounder: form.hasTechnicalCofounder ? 'yes' : 'no',
    team_experience: form.hasIndustryExperience ? 'yes' : 'no',
    monthly_burn: form.monthlyBurnRate ?? undefined,
    has_revenue: form.currentMrr && form.currentMrr > 0 ? 'yes' : 'no',
    target_market: form.targetMarket || undefined,
  };
}
