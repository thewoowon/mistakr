import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

const HomeIcon = ({ width = 24, height = 24, color = '#EEEEEE' }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M11.0869 3.09863C11.6261 2.63414 12.3739 2.63414 12.9131 3.09863L19.6631 8.91406C20.0245 9.22551 20.25 9.71415 20.25 10.248V19.5674C20.2499 20.5529 19.5243 21.25 18.75 21.25H5.25C4.47567 21.25 3.75001 20.5529 3.75 19.5674V10.248C3.75008 9.71405 3.97554 9.22547 4.33691 8.91406L11.0869 3.09863Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <Circle cx="12" cy="14" r="2" fill={color} />
  </Svg>
);

export default HomeIcon;
