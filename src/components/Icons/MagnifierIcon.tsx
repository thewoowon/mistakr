import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

const MagnifierIcon = ({ width = 24, height = 24, color = '#EEEEEE' }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M19.9998 19.9969L15.6367 15.6338"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle
      cx="10.2859"
      cy="10.2859"
      r="7.03588"
      stroke={color}
      strokeWidth="1.5"
    />
  </Svg>
);

export default MagnifierIcon;
