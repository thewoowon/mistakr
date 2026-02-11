import Svg, { Circle } from 'react-native-svg';

const GlassIcon = ({ width = 100, height = 100, color = '#EEEEEE' }) => (
  <Svg width={width} height={height} viewBox="0 0 100 100" fill="none">
    <Circle cx="50" cy="50" r="50" fill="black" fillOpacity="0.2" />
  </Svg>
);

export default GlassIcon;
