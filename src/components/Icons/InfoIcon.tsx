import Svg, { Path, Circle } from 'react-native-svg';

const InfoIcon = ({ width = 24, height = 24, color = '#EEEEEE' }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={2} />
    <Path
      d="M12 16v-4M12 8h.01"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);

export default InfoIcon;
