import customAxios from '@axios/customAxios';
import {API_PREFIX} from '@env';
import type {Case} from '../types/Case';
import type {Node} from '../types/Node';
import type {Edge} from '../types/Edge';
import type {Lesson} from '../types/Lesson';

const BASE = `${API_PREFIX}/cases`;

export interface CasesResponse {
  cases: Case[];
  nodes: Node[];
  edges: Edge[];
  lessons: Lesson[];
}

export const casesService = {
  async getCases(): Promise<CasesResponse> {
    const {data} = await customAxios.get(BASE);
    return data;
  },

  async getCaseDetail(caseId: string): Promise<{
    case: Case;
    nodes: Node[];
    edges: Edge[];
    lessons: Lesson[];
  }> {
    const {data} = await customAxios.get(`${BASE}/${caseId}`);
    return data;
  },

  async searchCases(params: {
    q?: string;
    industry?: string;
    failureType?: string;
    page?: number;
    limit?: number;
  }): Promise<{cases: Case[]; total: number}> {
    const {data} = await customAxios.get(`${BASE}/search`, {params});
    return data;
  },
};
