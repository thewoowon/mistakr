import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type {
  ConsultingSession,
  StreamingState,
  SessionListItem,
  MatchedCase,
} from '../types/Consulting';
import {consultingService} from '../services/consultingService';
import {connectSSE} from '../services/sseClient';
import {mapMatchedCase, mapSessionCompleted} from '../services/mappers';

interface ConsultingState {
  sessions: SessionListItem[];
  currentSession: ConsultingSession | null;
  streaming: StreamingState;
  isLoading: boolean;
  error: string | null;

  fetchSessions: () => Promise<void>;
  fetchSession: (sessionId: string) => Promise<ConsultingSession>;
  startSession: (ideaId: number, ideaName: string) => Promise<string>;
  setStreamingPhase: (phase: StreamingState['phase']) => void;
  appendStreamingText: (chunk: string) => void;
  setStreamingProgress: (progress: number) => void;
  resetStreaming: () => void;
  toggleChecklistItem: (sessionId: string, itemId: string) => void;
}

export const useConsultingStore = create<ConsultingState>()(
  persist(
    (set, get) => ({
      sessions: [],
      currentSession: null,
      streaming: {
        phase: 'idle',
        progress: 0,
        currentText: '',
        error: null,
      },
      isLoading: false,
      error: null,

      fetchSessions: async () => {
        set({isLoading: true, error: null});
        try {
          const sessions = await consultingService.getSessions();
          set({sessions, isLoading: false});
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : '세션 목록을 불러오는데 실패했습니다',
            isLoading: false,
          });
        }
      },

      fetchSession: async (sessionId: string) => {
        const session = await consultingService.getSession(sessionId);
        set({currentSession: session});
        return session;
      },

      startSession: async (ideaId: number, ideaName: string) => {
        set({
          streaming: {
            phase: 'matching',
            progress: 0,
            currentText: '',
            error: null,
          },
          currentSession: null,
        });

        return new Promise<string>((resolve, reject) => {
          let sessionId = '';
          let matchedCases: MatchedCase[] = [];

          connectSSE(
            '/consulting/sessions',
            {idea_id: ideaId},
            // onEvent
            (event) => {
              const {phase, data, chunk} = event;

              switch (phase) {
                case 'matching':
                  set(state => ({
                    streaming: {
                      ...state.streaming,
                      phase: 'matching',
                      progress: data?.progress ?? state.streaming.progress,
                    },
                  }));
                  if (data?.matched_cases) {
                    matchedCases = (data.matched_cases as any[]).map(mapMatchedCase);
                    set(state => ({
                      streaming: {...state.streaming, matchedCases},
                    }));
                  }
                  break;

                case 'analyzing':
                  set(state => ({
                    streaming: {
                      ...state.streaming,
                      phase: 'analyzing',
                      progress: data?.progress ?? state.streaming.progress,
                      currentText: chunk
                        ? state.streaming.currentText + chunk
                        : state.streaming.currentText,
                    },
                  }));
                  break;

                case 'generating':
                  set(state => ({
                    streaming: {
                      ...state.streaming,
                      phase: 'generating',
                      progress: data?.progress ?? state.streaming.progress,
                    },
                  }));
                  break;

                case 'completed': {
                  const session = mapSessionCompleted(data);
                  session.startupIdeaName = ideaName;
                  sessionId = session.id;

                  set({
                    currentSession: session,
                    streaming: {
                      phase: 'completed',
                      progress: 100,
                      currentText: '',
                      error: null,
                    },
                  });
                  break;
                }

                case 'error':
                  set({
                    streaming: {
                      phase: 'failed',
                      progress: 0,
                      currentText: '',
                      error: data?.message ?? '분석 중 오류가 발생했습니다',
                    },
                  });
                  reject(new Error(data?.message ?? 'Analysis failed'));
                  break;
              }
            },
            // onError
            (error) => {
              set({
                streaming: {
                  phase: 'failed',
                  progress: 0,
                  currentText: '',
                  error: error.message,
                },
              });
              reject(error);
            },
            // onComplete
            () => {
              if (sessionId) {
                resolve(sessionId);
              }
            },
          ).then(connection => {
            // SSE 연결 후 헤더에서 세션 ID를 가져올 수도 있음
            if (connection.sessionId) {
              sessionId = connection.sessionId;
            }
          });
        });
      },

      setStreamingPhase: (phase) => {
        set(state => ({streaming: {...state.streaming, phase}}));
      },

      appendStreamingText: (chunk) => {
        set(state => ({
          streaming: {
            ...state.streaming,
            currentText: state.streaming.currentText + chunk,
          },
        }));
      },

      setStreamingProgress: (progress) => {
        set(state => ({streaming: {...state.streaming, progress}}));
      },

      resetStreaming: () => {
        set({
          streaming: {
            phase: 'idle',
            progress: 0,
            currentText: '',
            error: null,
          },
        });
      },

      toggleChecklistItem: (sessionId, itemId) => {
        // 로컬 즉시 업데이트
        const currentSession = get().currentSession;
        if (currentSession?.id === sessionId) {
          const item = currentSession.checklist.find(i => i.id === itemId);
          const newCompleted = !item?.isCompleted;

          set({
            currentSession: {
              ...currentSession,
              checklist: currentSession.checklist.map(i =>
                i.id === itemId ? {...i, isCompleted: newCompleted} : i,
              ),
            },
          });

          // 서버 동기화
          consultingService
            .toggleChecklist(sessionId, itemId, newCompleted)
            .catch(err => {
              console.error('Failed to sync checklist toggle:', err);
              // 실패 시 롤백
              const session = get().currentSession;
              if (session?.id === sessionId) {
                set({
                  currentSession: {
                    ...session,
                    checklist: session.checklist.map(i =>
                      i.id === itemId ? {...i, isCompleted: !newCompleted} : i,
                    ),
                  },
                });
              }
            });
        }
      },
    }),
    {
      name: 'mistakr-consulting',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        sessions: state.sessions,
      }),
    },
  ),
);
