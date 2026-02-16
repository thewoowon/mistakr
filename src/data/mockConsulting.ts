import type {
  ConsultingSession,
  StartupIdea,
  RiskScore,
  MatchedCase,
  TimelinePrediction,
  ChecklistItem,
} from '../types/Consulting';

export const mockStartupIdea: StartupIdea = {
  id: 'idea-001',
  userId: 'user-001',
  companyName: '프레시밀',
  industry: 'E-commerce',
  shortDescription: '신선식품 정기배송 구독 서비스',
  detailedDescription:
    '바쁜 직장인을 위한 신선식품 정기배송 서비스. 매주 AI가 추천하는 레시피와 함께 신선한 재료를 배송합니다. 월 49,900원 구독 모델.',
  founderCount: 2,
  hasIndustryExperience: false,
  hasTechnicalCofounder: true,
  teamSize: 5,
  targetMarket: '25-40세 맞벌이 가정',
  revenueModel: 'subscription',
  currentStage: 'mvp',
  monthsSinceFounding: 6,
  currentMrr: 2500000,
  totalFundingRaised: 100000000,
  monthlyBurnRate: 35000000,
  createdAt: '2025-12-01T00:00:00Z',
  updatedAt: '2026-01-15T00:00:00Z',
};

export const mockRiskScore: RiskScore = {
  overall: 72,
  pmfRisk: 78,
  financialRisk: 65,
  teamRisk: 35,
  marketRisk: 58,
  timingRisk: 42,
  competitionRisk: 85,
  executionRisk: 48,
};

export const mockMatchedCases: MatchedCase[] = [
  {
    caseId: 'quibi',
    companyName: 'Quibi',
    industry: 'Entertainment',
    similarityScore: 0.82,
    matchReasons: [
      '구독 모델 기반',
      '콘텐츠/상품 차별화 부족',
      '시장 타이밍 리스크',
    ],
    keyLessons: [
      '기존 대안 대비 명확한 차별점이 없으면 구독 전환이 어렵다',
      '대규모 마케팅보다 PMF 검증이 우선이다',
    ],
    relevantWarningSigns: [
      '초기 구독 해지율 45% 이상',
      '고객 획득 비용이 LTV의 3배 초과',
    ],
  },
  {
    caseId: 'pets-com',
    companyName: 'Pets.com',
    industry: 'E-commerce',
    similarityScore: 0.74,
    matchReasons: ['이커머스 배송 모델', '단위 경제성 문제', '물류 비용 과다'],
    keyLessons: [
      '배송 비용이 마진을 잡아먹으면 규모가 커져도 수익이 안 난다',
      '고객이 편의보다 가격에 민감한 카테고리에서는 구독 모델이 어렵다',
    ],
    relevantWarningSigns: [
      '주문당 물류비가 상품 가격의 30% 초과',
      '재구매율 하락 추세',
    ],
  },
  {
    caseId: 'juicero',
    companyName: 'Juicero',
    industry: 'Consumer Tech',
    similarityScore: 0.68,
    matchReasons: [
      '식품 + 구독 모델',
      '가격 대비 가치 불명확',
      '대안이 너무 쉬움',
    ],
    keyLessons: [
      '소비자가 직접 할 수 있는 일을 대신해주는 서비스는 가격 정당화가 어렵다',
    ],
    relevantWarningSigns: ['소비자 가격 저항', '무료 대안 존재'],
  },
];

export const mockTimelinePredictions: TimelinePrediction[] = [
  {
    milestone: '구독 해지율 급증 시점',
    predictedMonth: 9,
    confidence: 0.78,
    basedOnCases: ['quibi'],
    description:
      '초기 호기심 구독자의 이탈이 시작됩니다. Quibi도 출시 3개월 후 해지율이 급증했습니다.',
  },
  {
    milestone: '현금 고갈 시점',
    predictedMonth: 14,
    confidence: 0.85,
    basedOnCases: ['pets-com', 'quibi'],
    description:
      '현재 번율(3,500만원/월) 대비 보유 자금으로 약 14개월 운영 가능합니다.',
  },
  {
    milestone: '대형 경쟁사 진입',
    predictedMonth: 12,
    confidence: 0.65,
    basedOnCases: ['juicero'],
    description:
      '쿠팡, 마켓컬리 등 기존 플레이어가 유사 구독 서비스를 출시할 가능성이 높습니다.',
  },
  {
    milestone: '피벗 필요 시점',
    predictedMonth: 10,
    confidence: 0.72,
    basedOnCases: ['quibi', 'pets-com'],
    description:
      'PMF 달성 실패 시, 비즈니스 모델 전환을 고려해야 하는 시점입니다.',
  },
];

export const mockChecklist: ChecklistItem[] = [
  {
    id: 'cl-001',
    action: '50명 이상 고객 심층 인터뷰 진행 (해지 사유 파악)',
    priority: 'critical',
    category: 'product',
    deadline: '1개월 이내',
    basedOnCase: 'quibi',
    reason:
      'Quibi는 고객 피드백 없이 제품을 출시하여 PMF를 완전히 놓쳤습니다.',
    isCompleted: false,
  },
  {
    id: 'cl-002',
    action: '주문당 단위 경제성 분석표 작성 (배송비, 식재료 원가, 포장비)',
    priority: 'critical',
    category: 'finance',
    deadline: '2주 이내',
    basedOnCase: 'pets-com',
    reason:
      'Pets.com은 주문당 배송비가 상품 가격을 초과하여 규모가 커질수록 손실이 커졌습니다.',
    isCompleted: false,
  },
  {
    id: 'cl-003',
    action: '쿠팡/마켓컬리 대비 차별화 포인트 3개 이상 정리',
    priority: 'high',
    category: 'market',
    deadline: '1개월 이내',
    basedOnCase: 'juicero',
    reason: '대형 플레이어가 유사 서비스를 출시하면 차별점 없이는 생존이 어렵습니다.',
    isCompleted: false,
  },
  {
    id: 'cl-004',
    action: '월간 번율을 2,000만원 이하로 절감하는 계획 수립',
    priority: 'high',
    category: 'finance',
    deadline: '1개월 이내',
    basedOnCase: null,
    reason: '현재 번율 대비 런웨이가 14개월밖에 안 됩니다. 추가 투자 없이 생존하려면 절감이 필수입니다.',
    isCompleted: false,
  },
  {
    id: 'cl-005',
    action: 'NPS(순추천지수) 측정 시스템 도입',
    priority: 'medium',
    category: 'product',
    deadline: '2개월 이내',
    basedOnCase: 'quibi',
    reason:
      '구독 서비스에서 NPS 50 이상이면 PMF 달성 신호입니다. 현재 측정하고 있지 않다면 시급합니다.',
    isCompleted: false,
  },
  {
    id: 'cl-006',
    action: '3개월 코호트 분석으로 리텐션 커브 확인',
    priority: 'medium',
    category: 'product',
    deadline: '즉시',
    basedOnCase: null,
    reason: '코호트별 리텐션이 평탄해지는 지점이 없으면 PMF 미달성입니다.',
    isCompleted: false,
  },
  {
    id: 'cl-007',
    action: '물류 파트너십 3곳 이상 비교 견적 확보',
    priority: 'low',
    category: 'finance',
    deadline: '2개월 이내',
    basedOnCase: 'pets-com',
    reason: '자체 물류는 비용이 급격히 증가합니다. 3PL 파트너십으로 변동비화 하는 것을 검토하세요.',
    isCompleted: false,
  },
];

export const mockConsultingSession: ConsultingSession = {
  id: 'session-001',
  userId: 'user-001',
  startupIdeaId: 'idea-001',
  startupIdeaName: '프레시밀',
  riskScore: mockRiskScore,
  matchedCases: mockMatchedCases,
  timelinePredictions: mockTimelinePredictions,
  checklist: mockChecklist,
  executiveSummary:
    '프레시밀은 신선식품 구독 시장에서 경쟁이 치열한 환경에 진입하고 있습니다. 현재 가장 큰 리스크는 경쟁사 대비 차별화 부족(85점)과 PMF 미검증(78점)입니다. Quibi, Pets.com 등 유사한 구독 모델의 실패 사례에서 볼 수 있듯이, 초기 구독자 확보보다 리텐션과 단위 경제성 검증이 우선입니다. 긍정적인 점은 기술 공동창업자가 있고 팀 역량이 균형 잡혀 있다는 것입니다.',
  topThreats: [
    '쿠팡/마켓컬리 등 기존 대형 플레이어의 유사 서비스 출시 가능성',
    '주문당 물류비 + 식재료 원가로 인한 단위 경제성 악화',
    '초기 호기심 구독 후 빠른 해지 (구독 피로도)',
  ],
  topOpportunities: [
    'AI 레시피 추천이라는 기술적 차별점을 강화할 수 있음',
    '맞벌이 가정이라는 명확한 타겟 세그먼트 보유',
    '구독 모델의 예측 가능한 매출 구조',
  ],
  status: 'completed',
  sessionNumber: 1,
  previousSessionId: null,
  createdAt: '2026-01-20T10:30:00Z',
};

export const mockConsultingSessions: ConsultingSession[] = [
  mockConsultingSession,
];

export const mockStartupIdeas: StartupIdea[] = [mockStartupIdea];
