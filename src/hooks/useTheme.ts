import { useColorScheme } from 'react-native';
import { lightColors, darkColors, Colors } from '../constants/colors';
import { useThemeStore } from '../store/themeStore';

export function useTheme(): Colors {
  const systemColorScheme = useColorScheme();
  const { mode } = useThemeStore();

  const isDark =
    mode === 'system' ? systemColorScheme === 'dark' : mode === 'dark';

  return isDark ? darkColors : lightColors;
}
