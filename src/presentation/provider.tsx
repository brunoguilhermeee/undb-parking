import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { AppThemeProvider } from './theme';
import { useColorScheme } from 'react-native';
import { LoadFonts } from './loadFonts';
import { AppQueryClientProvider } from './queryClient';

export const AppProvider = ({ children }: React.PropsWithChildren) => {
  const colorScheme = useColorScheme();

  return (
    <LoadFonts>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AppThemeProvider>
          <AppQueryClientProvider>{children}</AppQueryClientProvider>
        </AppThemeProvider>
      </ThemeProvider>
    </LoadFonts>
  );
};
