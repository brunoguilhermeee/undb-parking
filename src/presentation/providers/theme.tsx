import { ThemeProvider } from 'styled-components';
import { AppTheme, theme } from '../styles/theme';
import { useColorScheme } from 'react-native';

export function AppThemeProvider({ children }: React.PropsWithChildren) {
  const colorsScheme = useColorScheme() ?? 'light';
  const colors = theme.colors[colorsScheme];
  const themePrimitive = {
    colors,
    spacing: theme.spacing,
    font: theme.font,
  } as AppTheme;
  return <ThemeProvider theme={themePrimitive}>{children}</ThemeProvider>;
}
