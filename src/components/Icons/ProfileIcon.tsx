import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ProfileIcon = ({ width = 24, height = 24, color = '#EEEEEE' }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M10.7139 13.3379H13.2861C17.1963 13.3381 20.25 16.2247 20.25 19.6475C20.2497 20.4712 19.4984 21.2499 18.4287 21.25H5.57129C4.50158 21.2499 3.75028 20.4712 3.75 19.6475C3.75 16.2246 6.80372 13.3381 10.7139 13.3379ZM12 2.75C14.4902 2.75 16.3926 4.58256 16.3926 6.70605C16.3925 8.82948 14.4901 10.6621 12 10.6621C9.50991 10.6621 7.60753 8.82948 7.60742 6.70605C7.60742 4.58256 9.50984 2.75 12 2.75Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ProfileIcon;
