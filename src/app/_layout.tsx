import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import 'react-native-reanimated';

import { View, useColorScheme } from 'react-native';
import { AppThemeProvider } from '@/presentation/providers/theme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded, fontError] = useFonts({
    SpaceMono: require('../presentation/assets/fonts/SpaceMono-Regular.ttf'),
    RobotoBlack: require('@/presentation/assets/fonts/Roboto/Roboto-Black.ttf'),
    RobotoBold: require('@/presentation/assets/fonts/Roboto/Roboto-Bold.ttf'),
    RobotoLight: require('@/presentation/assets/fonts/Roboto/Roboto-Light.ttf'),
    RobotoMedium: require('@/presentation/assets/fonts/Roboto/Roboto-Medium.ttf'),
    RobotoRegular: require('@/presentation/assets/fonts/Roboto/Roboto-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <AppThemeProvider>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <ThemeProvider
          value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen
              name="parking/list"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="parking/[parkingId]"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="+not-found" options={{ headerShown: false }} />
          </Stack>
        </ThemeProvider>
      </View>
    </AppThemeProvider>
  );
}
