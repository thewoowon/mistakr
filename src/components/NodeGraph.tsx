import React, { useMemo } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import Svg, { Circle, Line, Text as SvgText, G } from 'react-native-svg';
import { Node, Edge, LayoutNode } from '../types';
import {
  layoutNodes,
  getNodeColor,
  NODE_RADIUS,
  filterNodesByTime,
} from '../utils/graphLayout';
import { colors } from '../constants';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const GRAPH_HEIGHT = 380;
const CONTAINER_PADDING = 8;

const MIN_SCALE = 0.5;
const MAX_SCALE = 3;

interface NodeGraphProps {
  nodes: Node[];
  edges: Edge[];
  currentTime?: number; // 이 시간까지의 노드만 표시
  onNodePress?: (node: LayoutNode) => void;
  width?: number;
}

export function NodeGraph({
  nodes,
  edges,
  currentTime,
  onNodePress,
  width = SCREEN_WIDTH - 40,
}: NodeGraphProps) {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  // SVG 내부 실제 그리기 영역 (container padding 제외)
  const svgWidth = width - CONTAINER_PADDING * 2;

  const layoutedNodes = useMemo(() => {
    return layoutNodes(nodes, svgWidth);
  }, [nodes, svgWidth]);

  // currentTime이 있으면 필터링, 없으면 전체 표시
  const displayNodes = useMemo(() => {
    if (currentTime === undefined) return layoutedNodes;
    return filterNodesByTime(layoutedNodes, currentTime);
  }, [layoutedNodes, currentTime]);

  const nodeMap = useMemo(() => {
    const map = new Map<number, LayoutNode>();
    layoutedNodes.forEach((node: LayoutNode) => {
      map.set(node.nodeId, node);
    });
    return map;
  }, [layoutedNodes]);

  const visibleNodeIds = useMemo(() => {
    return new Set(displayNodes.map((n: LayoutNode) => n.nodeId));
  }, [displayNodes]);

  const visibleEdges = useMemo(() => {
    return edges.filter(
      edge =>
        visibleNodeIds.has(edge.fromNode) && visibleNodeIds.has(edge.toNode),
    );
  }, [edges, visibleNodeIds]);

  const pinchGesture = Gesture.Pinch()
    .onUpdate(e => {
      const newScale = savedScale.value * e.scale;
      scale.value = Math.min(Math.max(newScale, MIN_SCALE), MAX_SCALE);
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      translateX.value = savedTranslateX.value + e.translationX;
      translateY.value = savedTranslateY.value + e.translationY;
    })
    .onEnd(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    });

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      scale.value = withSpring(1);
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
      savedScale.value = 1;
      savedTranslateX.value = 0;
      savedTranslateY.value = 0;
    });

  const composedGesture = Gesture.Simultaneous(
    pinchGesture,
    panGesture,
    doubleTapGesture,
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <View style={[styles.container, { width }]}>
      <GestureDetector gesture={composedGesture}>
        <Animated.View style={[styles.graphContainer, animatedStyle]}>
          <Svg width={svgWidth} height={GRAPH_HEIGHT}>
            {/* Edges */}
            {visibleEdges.map(edge => {
              const fromNode = nodeMap.get(edge.fromNode);
              const toNode = nodeMap.get(edge.toNode);
              if (!fromNode || !toNode) return null;

              return (
                <Line
                  key={edge.id}
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke={colors.stroke}
                  strokeWidth={2}
                  strokeDasharray={
                    edge.edgeType === 'cause' ? '5,5' : undefined
                  }
                />
              );
            })}

            {/* Nodes */}
            {displayNodes.map((node: LayoutNode) => (
              <G key={node.id} onPress={() => onNodePress?.(node)}>
                {/* Node circle */}
                <Circle
                  cx={node.x}
                  cy={node.y}
                  r={NODE_RADIUS}
                  fill={getNodeColor(node.nodeType)}
                />

                {/* Node label */}
                <SvgText
                  x={node.x}
                  y={node.y + NODE_RADIUS + 16}
                  fontSize={11}
                  fill={colors.text.secondary}
                  textAnchor="middle"
                >
                  {node.label.length > 12
                    ? node.label.substring(0, 12) + '...'
                    : node.label}
                </SvgText>

                {/* Date label */}
                {node.date && (
                  <SvgText
                    x={node.x}
                    y={node.y + NODE_RADIUS + 30}
                    fontSize={9}
                    fill={colors.text.disabled}
                    textAnchor="middle"
                  >
                    {node.date}
                  </SvgText>
                )}
              </G>
            ))}
          </Svg>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    borderRadius: 20,
    padding: 8,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: '#A4A4A4',
  },
  graphContainer: {
    flex: 1,
  },
});
