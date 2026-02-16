import type {Case} from './Case';

// === 정량적 데이터 ===
export interface CompanyMetrics {
  peakEmployeeCount: number | null;
  employeeCountAtShutdown: number | null;
  burnRateUsdMonthly: number | null;
  runwayMonths: number | null;
  peakRevenueUsd: number | null;
  revenueAtShutdownUsd: number | null;
  pivotCount: number;
  monthsToFirstRevenue: number | null;
  customerCountAtPeak: number | null;
  fundingRounds: number;
  timeToShutdownMonths: number | null;
  lastValuationUsd: number | null;
}

// === 실패 원인 심층 분석 ===
export type FailureSeverity = 'critical' | 'major' | 'contributing';

export interface FailureCause {
  id: string;
  type: string;
  severity: FailureSeverity;
  description: string;
  detectedAtMonth: number | null;
  wasPreventable: boolean;
}

// === 경고 신호 ===
export type WarningSignCategory =
  | 'financial'
  | 'operational'
  | 'market'
  | 'team'
  | 'product'
  | 'legal';

export interface WarningSign {
  id: string;
  category: WarningSignCategory;
  signal: string;
  detectedAtMonth: number | null;
  ignoredByFounder: boolean;
  couldHavePreventedShutdown: boolean;
}

// === 반사실적 분석 ===
export type CounterfactualDifficulty = 'easy' | 'moderate' | 'hard';

export interface Counterfactual {
  id: string;
  whatIfScenario: string;
  potentialOutcome: string;
  difficultyLevel: CounterfactualDifficulty;
  category: string;
}

// === 시장 환경 ===
export type MarketMaturity = 'nascent' | 'growing' | 'mature' | 'declining';
export type RegulatoryEnvironment = 'light' | 'moderate' | 'heavy';
export type EconomicCycle = 'boom' | 'stable' | 'recession';

export interface MarketCondition {
  marketSizeUsd: number | null;
  marketGrowthRate: number | null;
  competitorCount: number | null;
  marketMaturity: MarketMaturity;
  regulatoryEnvironment: RegulatoryEnvironment;
  economicCycle: EconomicCycle;
}

// === 경쟁사 ===
export type CompetitorOutcome = 'acquired' | 'ipo' | 'alive' | 'dead';

export interface Competitor {
  name: string;
  outcome: CompetitorOutcome;
  advantageOver: string | null;
  disadvantageVs: string | null;
}

// === 창업자 프로필 ===
export interface FounderProfile {
  hasIndustryExperience: boolean;
  hasPriorStartupExperience: boolean;
  hasTechnicalBackground: boolean;
  founderCount: number;
  averageFounderAge: number | null;
}

// === 통합 EnrichedCase ===
export interface EnrichedCase extends Case {
  metrics: CompanyMetrics;
  failureCauses: FailureCause[];
  warningSigns: WarningSign[];
  counterfactuals: Counterfactual[];
  marketCondition: MarketCondition;
  competitors: Competitor[];
  founderProfile: FounderProfile;
}
