import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type {IdeaFormDraft} from '../types/Consulting';
import {ideaService} from '../services/ideaService';

interface IdeaState {
  draft: IdeaFormDraft | null;
  isLoading: boolean;
  error: string | null;

  saveDraft: (draft: Partial<IdeaFormDraft>) => void;
  clearDraft: () => void;
  createIdea: (form: IdeaFormDraft) => Promise<number>;
}

export const useIdeaStore = create<IdeaState>()(
  persist(
    (set, get) => ({
      draft: null,
      isLoading: false,
      error: null,

      saveDraft: (updates: Partial<IdeaFormDraft>) => {
        const current = get().draft;
        set({
          draft: current ? {...current, ...updates} : (updates as IdeaFormDraft),
        });
      },

      clearDraft: () => {
        set({draft: null});
      },

      createIdea: async (form: IdeaFormDraft) => {
        set({isLoading: true, error: null});
        try {
          const ideaId = await ideaService.createIdea(form);
          set({isLoading: false});
          return ideaId;
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : '아이디어 생성에 실패했습니다',
            isLoading: false,
          });
          throw error;
        }
      },
    }),
    {
      name: 'mistakr-ideas',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        draft: state.draft,
      }),
    },
  ),
);
