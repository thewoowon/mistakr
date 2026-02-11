import { create } from 'zustand';
import { Case, Node, Edge, Lesson } from '../types';
import { mockCases, mockNodes, mockEdges, mockLessons } from '../data/mockCases';

interface CasesState {
  cases: Case[];
  nodes: Node[];
  edges: Edge[];
  lessons: Lesson[];
  selectedCaseId: string | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchCases: () => Promise<void>;
  selectCase: (caseId: string | null) => void;
  getCaseById: (caseId: string) => Case | undefined;
  getNodesForCase: (caseId: string) => Node[];
  getEdgesForCase: (caseId: string) => Edge[];
  getLessonsForCase: (caseId: string) => Lesson[];
}

export const useCasesStore = create<CasesState>((set, get) => ({
  cases: [],
  nodes: [],
  edges: [],
  lessons: [],
  selectedCaseId: null,
  isLoading: false,
  error: null,

  fetchCases: async () => {
    set({ isLoading: true, error: null });

    try {
      // TODO: Replace with actual API call
      await new Promise<void>((resolve) => setTimeout(resolve, 500));

      set({
        cases: mockCases,
        nodes: mockNodes,
        edges: mockEdges,
        lessons: mockLessons,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch cases',
        isLoading: false,
      });
    }
  },

  selectCase: (caseId) => {
    set({ selectedCaseId: caseId });
  },

  getCaseById: (caseId) => {
    return get().cases.find((c) => c.caseId === caseId);
  },

  getNodesForCase: (caseId) => {
    return get().nodes.filter((n) => n.caseId === caseId);
  },

  getEdgesForCase: (caseId) => {
    return get().edges.filter((e) => e.caseId === caseId);
  },

  getLessonsForCase: (caseId) => {
    return get().lessons.filter((l) => l.caseId === caseId);
  },
}));
