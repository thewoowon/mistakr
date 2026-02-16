import React from 'react';
import {Pressable, StyleSheet, Text, ViewStyle} from 'react-native';
import Icon, {IconName} from '@components/atoms/icon/Icon';

type ProviderType = 'GOOGLE' | 'APPLE';

type Props = {
  name: ProviderType;
  onPress: () => void;
  style?: ViewStyle;
  disabled?: boolean;
};

const IconStyle: Record<
  ProviderType,
  {
    text: string;
    backgroundColor: string;
    textColor: string;
    borderColor?: string;
    iconName: string;
  }
> = {
  GOOGLE: {
    text: '구글',
    backgroundColor: '#fff',
    textColor: '#000',
    borderColor: '#E0E0E0',
    iconName: 'GoogleIcon',
  },
  APPLE: {
    text: '애플',
    backgroundColor: '#000',
    textColor: '#fff',
    iconName: 'AppleIcon',
  },
};

const SocialLoginButton: React.FC<Props> = ({
  name,
  onPress,
  style,
  disabled = false,
}) => {
  const config = IconStyle[name];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        style,
        {
          backgroundColor: config.backgroundColor,
          borderColor: config.borderColor || config.backgroundColor,
          borderWidth: config.borderColor ? 1 : 0,
        },
      ]}>
      <Icon
        name={config.iconName as IconName}
        color={disabled ? '#999' : config.textColor}
        size={24}
      />
      <Text
        style={[
          styles.text,
          {color: config.textColor},
        ]}>
        {config.text}로 계속하기
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 52,
    borderRadius: 12,
  },
  text: {
    flex: 1,
    textAlign: 'center',
    marginLeft: -24,
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 16,
  },
});

export default SocialLoginButton;
