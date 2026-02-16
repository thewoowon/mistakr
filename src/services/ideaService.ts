import customAxios from '@axios/customAxios';
import {API_PREFIX} from '@env';
import type {IdeaFormDraft} from '../types/Consulting';
import {mapFormToIdeaCreate} from './mappers';

const BASE = `${API_PREFIX}/ideas`;

export const ideaService = {
  async createIdea(form: IdeaFormDraft): Promise<number> {
    const body = mapFormToIdeaCreate(form);
    const {data} = await customAxios.post(BASE, body);
    return data.data?.id ?? data.id;
  },

  async getIdeas(): Promise<any[]> {
    const {data} = await customAxios.get(BASE);
    return data.data ?? [];
  },

  async deleteIdea(id: number): Promise<void> {
    await customAxios.delete(`${BASE}/${id}`);
  },
};
