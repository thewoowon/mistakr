import type { Node } from './Node';
import type { Edge } from './Edge';
import type { Lesson } from './Lesson';

export interface Case {
  id: string;
  caseId: string;
  companyName: string;
  koreanCompanyName: string;
  industry: string;
  foundedYear: number | null;
  shutdownYear: number | null;
  totalFundingUsd: number | null;
  failureTypes: string[];
  shortDescription: string;
  longDescription: string | null;
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
  country: string;
  ceoName: string;
  founderName: string;
  imageUrl: string;
}

export interface CaseWithDetails extends Case {
  nodes: Node[];
  edges: Edge[];
  lessons: Lesson[];
}

export const industryMap: {
  [key: string]: string;
} = {
  'Healthcare Tech': '헬스케어',
  'Real Estate Tech': '부동산',
  Entertainment: '엔터테인먼트',
  Cryptocurrency: '암호화폐',
  'Consumer Tech': '소비자기술',
  'E-commerce': '이커머스',
  'Enterprise SaaS': '기업용 SaaS',
  'Clean Tech': '청정기술',
  Fintech: '핀테크',
};

export const failureTypeMap: {
  [key: string]: string;
} = {
  fraud: '사기',
  technology: '기술',
  regulatory: '규제',
  overvaluation: '과대평가',
  governance: '지배구조',
  market: '시장',
  product: '제품',
  timing: '타이밍',
  pricing: '가격 책정',
  'business-model': '비즈니스 모델',
  competition: '경쟁',
  culture: '조직 문화',
};
