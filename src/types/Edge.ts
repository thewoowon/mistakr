export type EdgeType = 'cause' | 'consequence';

export interface Edge {
  id: string;
  caseId: string;
  fromNode: number;
  toNode: number;
  label: string | null;
  edgeType: EdgeType | null;
  createdAt: string;
}
