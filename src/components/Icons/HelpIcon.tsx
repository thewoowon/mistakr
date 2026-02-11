import Svg, { Path, Circle } from 'react-native-svg';

const HelpIcon = ({ width = 24, height = 24, color = '#EEEEEE' }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={2} />
    <Path
      d="M9 9a3 3 0 115.12 2.12c-.58.58-1.12 1.12-1.12 2.38v.5"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Circle cx="12" cy="17" r="0.5" fill={color} stroke={color} />
  </Svg>
);

export default HelpIcon;
