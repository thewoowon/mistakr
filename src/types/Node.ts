export type NodeType = 'start' | 'funding' | 'crisis' | 'shutdown';

export interface Node {
  id: string;
  caseId: string;
  nodeId: number;
  label: string;
  date: string | null;
  nodeType: NodeType;
  description: string | null;
  xPosition: number | null;
  yPosition: number | null;
  createdAt: string;
}

export interface LayoutNode extends Node {
  x: number;
  y: number;
}
