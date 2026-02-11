import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ExitIcon = ({ width = 24, height = 24, color = '#EEEEEE' }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M7 4.75H17C17.7146 4.75002 18.2499 5.30341 18.25 5.93262V18.0645C18.2499 18.9344 17.2417 19.5673 16.3701 19.0859L12.8457 17.1396C12.3193 16.8491 11.6807 16.8491 11.1543 17.1396L7.62988 19.0859C6.75832 19.5673 5.75005 18.9344 5.75 18.0645V5.93262C5.7501 5.30341 6.28536 4.75002 7 4.75Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ExitIcon;
