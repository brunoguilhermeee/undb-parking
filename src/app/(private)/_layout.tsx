import { authGatewayHttp } from '@/core/factory';
import { useQuery } from '@tanstack/react-query';
import { Redirect, Stack } from 'expo-router';
import { Skeleton } from 'moti/skeleton';
import { View, useColorScheme } from 'react-native';

const PrivateLayout = () => {
  const colorScheme = useColorScheme() ?? 'light';

  const { data: isSessionValid, isLoading } = useQuery({
    queryKey: ['session'],
    queryFn: () => authGatewayHttp.validateSession(),
  });

  if (isLoading) {
    return (
      <Skeleton
        show
        height={155}
        width={326}
        radius={8}
        colorMode={colorScheme}
        transition={{
          type: 'timing',
          duration: 2000,
        }}
      >
        <View style={{ flex: 1 }} />
      </Skeleton>
    );
  }

  // if (!isSessionValid && !isLoading) {
  //   return <Redirect href="/" />;
  // }

  return (
    <Stack initialRouteName="">
      <Stack.Screen
        name="parking/[parkingId]"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="parking/list" options={{ headerShown: false }} />
    </Stack>
  );
};

export default PrivateLayout;
