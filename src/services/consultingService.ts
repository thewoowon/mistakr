import customAxios from '@axios/customAxios';
import {API_PREFIX} from '@env';
import type {ConsultingSession, SessionListItem} from '../types/Consulting';
import {mapSession, mapSessionList} from './mappers';

const BASE = `${API_PREFIX}/consulting`;

export const consultingService = {
  async getSessions(): Promise<SessionListItem[]> {
    const {data} = await customAxios.get(`${BASE}/sessions`);
    return (data.data ?? []).map(mapSessionList);
  },

  async getSession(sessionId: string): Promise<ConsultingSession> {
    const {data} = await customAxios.get(`${BASE}/sessions/${sessionId}`);
    return mapSession(data.data);
  },

  async toggleChecklist(
    sessionId: string,
    itemId: string,
    isCompleted: boolean,
  ): Promise<void> {
    await customAxios.patch(
      `${BASE}/sessions/${sessionId}/checklist/${itemId}`,
      {is_completed: isCompleted},
    );
  },
};
