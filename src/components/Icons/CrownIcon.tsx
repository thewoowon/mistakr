import Svg, { Path } from 'react-native-svg';

const CrownIcon = ({ width = 24, height = 24, color = '#EEEEEE' }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M2 7l5 5 5-6 5 6 5-5-2 12H4L2 7z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={color}
    />
  </Svg>
);

export default CrownIcon;
