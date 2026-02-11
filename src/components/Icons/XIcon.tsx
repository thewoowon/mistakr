import React from 'react';
import Svg, { Path } from 'react-native-svg';

const XIcon = ({ width = 24, height = 24, color = '#63656D' }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 19L19 5.00366"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5 5L19 18.9963"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default XIcon;
