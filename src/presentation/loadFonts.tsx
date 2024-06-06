import { View } from 'react-native';
import { useFonts } from 'expo-font';

import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';

SplashScreen.preventAutoHideAsync();

export const LoadFonts = ({ children }: React.PropsWithChildren) => {
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
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      {children}
    </View>
  );
};
