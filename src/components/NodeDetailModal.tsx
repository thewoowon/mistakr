import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { LayoutNode } from '../types';
import { darkColors as colors, typography } from '../constants';
import { getNodeColor } from '../utils/graphLayout';

interface NodeDetailModalProps {
  node: LayoutNode | null;
  visible: boolean;
  onClose: () => void;
}

function CloseIcon() {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 19L19 5.00366"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M5 5L19 18.9963"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}

export function NodeDetailModal({
  node,
  visible,
  onClose,
}: NodeDetailModalProps) {
  if (!node) return null;

  const nodeColor = getNodeColor(node.nodeType);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.content}>
              {/* Header */}
              <View style={styles.header}>
                <View style={styles.titleRow}>
                  <View
                    style={[
                      styles.nodeIndicator,
                      { backgroundColor: nodeColor },
                    ]}
                  />
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 6,
                    }}
                  >
                    <Text style={styles.title}>{node.label}</Text>
                    {node.date && <Text style={styles.date}>{node.date}</Text>}
                  </View>
                </View>
                {/* <Pressable onPress={onClose} style={styles.closeButton}>
                  <CloseIcon />
                </Pressable> */}
              </View>

              {/* Type Badge */}
              <View
                style={[
                  styles.typeBadge,
                  { backgroundColor: nodeColor + '20' },
                ]}
              >
                <Text style={[styles.typeBadgeText, { color: nodeColor }]}>
                  {node.nodeType.charAt(0).toUpperCase() +
                    node.nodeType.slice(1)}
                </Text>
              </View>

              {/* Description */}
              {node.description && (
                <View style={styles.descriptionSection}>
                  <Text style={styles.sectionTitle}>Description</Text>
                  <Text style={styles.description}>{node.description}</Text>
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  content: {
    backgroundColor: colors.card,
    borderRadius: 22,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: colors.stroke,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    gap: 8,
  },
  nodeIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  title: {
    fontSize: 14,
    fontFamily: 'Pretendard-SemiBold',
    lineHeight: 14,
    color: 'white',
  },
  closeButton: {
    padding: 0,
  },
  date: {
    fontSize: 10,
    fontFamily: 'Pretendard-Regular',
    lineHeight: 10,
    color: colors.text.secondary,
  },
  typeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 10,
  },
  typeBadgeText: {
    fontSize: 10,
    fontFamily: 'Pretendard-Bold',
    lineHeight: 14,
  },
  descriptionSection: {
    borderTopWidth: 1,
    borderTopColor: colors.stroke,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Pretendard-Bold',
    lineHeight: 12,
    color: 'white',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 12,
    fontFamily: 'Pretendard-Regular',
    lineHeight: 16,
    color: '#DDDDDD',
  },
});
