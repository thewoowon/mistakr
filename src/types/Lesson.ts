export type LessonCategory = 'product' | 'team' | 'market' | 'finance';

export interface Lesson {
  id: string;
  caseId: string;
  lessonText: string;
  category: LessonCategory | null;
  createdAt: string;
}
