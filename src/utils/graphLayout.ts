import { Dimensions } from 'react-native';
import { Node, LayoutNode, NodeType } from '../types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const NODE_RADIUS = 24;
const GRAPH_PADDING = NODE_RADIUS + 16; // 노드가 잘리지 않도록 여유 확보

const Y_POSITIONS: Record<NodeType, number> = {
  start: 60,
  funding: 140,
  crisis: 220,
  shutdown: 300,
};

export function layoutNodes(nodes: Node[], width?: number): LayoutNode[] {
  const totalWidth = width || SCREEN_WIDTH;
  // 노드 반지름만큼 양쪽 여백 확보 (노드가 잘리지 않도록)
  const startX = NODE_RADIUS;
  const endX = totalWidth - NODE_RADIUS;
  const usableWidth = endX - startX;

  const sortedNodes = [...nodes].sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  const nodeCount = sortedNodes.length;
  if (nodeCount === 0) return [];

  return sortedNodes.map((node, index) => {
    const x =
      nodeCount === 1
        ? totalWidth / 2
        : startX + (index / (nodeCount - 1)) * usableWidth;

    const y = Y_POSITIONS[node.nodeType] || 180;

    return {
      ...node,
      x,
      y,
    };
  });
}

export function getNodeColor(nodeType: NodeType): string {
  const colors: Record<NodeType, string> = {
    start: '#4CAF50',
    funding: '#2196F3',
    crisis: '#FF9800',
    shutdown: '#f44336',
  };
  return colors[nodeType] || '#666666';
}

export function filterNodesByTime(
  nodes: LayoutNode[],
  maxTime: number
): LayoutNode[] {
  return nodes.filter((node) => {
    if (!node.date) return true;
    return new Date(node.date).getTime() <= maxTime;
  });
}

export function getTimeRange(nodes: Node[]): { min: number; max: number } {
  const times = nodes
    .filter((n) => n.date)
    .map((n) => new Date(n.date!).getTime());

  if (times.length === 0) {
    return { min: Date.now(), max: Date.now() };
  }

  return {
    min: Math.min(...times),
    max: Math.max(...times),
  };
}

export { NODE_RADIUS, GRAPH_PADDING };
