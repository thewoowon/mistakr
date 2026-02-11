import Svg, { Path, Circle } from 'react-native-svg';

const UserIcon = ({ width = 24, height = 24, color = '#EEEEEE' }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="7" r="4" stroke={color} strokeWidth={1.5} />
    <Path
      d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </Svg>
);

export default UserIcon;
