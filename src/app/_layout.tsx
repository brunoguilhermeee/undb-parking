import { Stack } from 'expo-router';
import 'react-native-reanimated';

import { AppProvider } from '@/presentation/provider';

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack initialRouteName="login">
        <Stack.Screen name="(private)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </AppProvider>
  );
}
