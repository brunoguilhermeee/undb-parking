import { parkingDetailsGateway } from '@/core/factory';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'expo-router';
import { Skeleton } from 'moti/skeleton';
import { Image, SafeAreaView, Text, View, useColorScheme } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import styled, { css, useTheme } from 'styled-components';

export const Container = styled(SafeAreaView)`
  ${({ theme }) => css`
    flex: 1;
    margin: ${theme.spacing['4']} ${theme.spacing['7']};
  `}
`;

export const Title = styled(Text)`
  ${({ theme }) => css`
    font-size: 24px;
    font-family: ${theme.font.bold};
    color: ${theme.colors.gray[800]};
  `}
`;

export const ParkingCardContainer = styled(View)`
  ${({ theme }) => css`
    gap: ${theme.spacing[2]};
    border-radius: 8px;
    border: 1px solid ${theme.colors.gray[400]};
    padding: 16px;
    width: 326px;
    height: 155px;
  `}
`;

export const ParkingCardText = styled(Text)`
  ${({ theme }) => css`
    font-size: 20px;
    font-family: ${theme.font.bold};
    color: ${theme.colors.gray[800]};
  `}
`;

export const ParkingCardLinkContent = styled(View)`
  ${({ theme }) => css`
    align-items: center;
    flex-direction: row;
    gap: ${theme.spacing[2]};
    padding: ${theme.spacing[2]} 0;
  `}
`;

export const ParkingCardLinkText = styled(Text)`
  ${({ theme }) => css`
    color: ${theme.colors.pink[500]};
    font-weight: 500;
  `}
`;

export const AvailableParkingList = styled(View)`
  ${({ theme }) => css`
    margin-top: ${theme.spacing[9]};
    gap: ${theme.spacing[7]};
  `}
`;

export const MapContainer = styled(View)`
  ${({ theme }) => css`
    width: 326px;
    height: 155px;
    border-radius: 8px;
    overflow: hidden;
    margin: ${theme.spacing[4]} 0;
  `}
`;

export interface IParkingCardProps {
  children: React.ReactNode;
  href: string;
}

export const ParkingCard = ({ children, href }: IParkingCardProps) => {
  const theme = useTheme();

  return (
    <ParkingCardContainer>
      <Image source={require('@/presentation/assets/images/logo-short.png')} />
      <ParkingCardText>{children}</ParkingCardText>
      <Link href={href}>
        <ParkingCardLinkContent>
          <ParkingCardLinkText>Acessar</ParkingCardLinkText>
          <Ionicons
            name="chevron-forward"
            size={16}
            color={theme.colors.pink[500]}
          />
        </ParkingCardLinkContent>
      </Link>
    </ParkingCardContainer>
  );
};

export const AvailableParkingScreen = () => {
  const colorScheme = useColorScheme() ?? 'light';

  const { isLoading, data, error } = useQuery({
    queryKey: ['parkings'],
    queryFn: () => parkingDetailsGateway.getAvalilableParkings(),
  });

  if (error || (!isLoading && !data)) {
    return (
      <Container>
        <Text>Estacionamentos não encontrados!</Text>
      </Container>
    );
  }

  return (
    <Container>
      <MapContainer>
        <Skeleton
          show={isLoading}
          height={155}
          width={326}
          radius={8}
          colorMode={colorScheme}
          transition={{
            type: 'timing',
            duration: 2000,
          }}
        >
          <MapView
            region={{
              latitude: data?.[0].getLatitude() as number,
              longitude: data?.[0].getLongitude() as number,
              latitudeDelta: 0.0022,
              longitudeDelta: 0.0041,
            }}
            style={{ width: '100%', height: '100%' }}
          >
            {data?.map(parking => (
              <Marker
                key={parking.getName()}
                coordinate={{
                  latitude: parking.getLatitude(),
                  longitude: parking.getLongitude(),
                }}
                title={parking.getName()}
              />
            ))}
          </MapView>
        </Skeleton>
      </MapContainer>

      <Title>Estacionamentos{'\n'}disponiveis</Title>

      <AvailableParkingList>
        {isLoading &&
          Array.from({ length: 2 }).map((_, index) => (
            <Skeleton
              key={index}
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
              <View style={{ width: 326, height: 155 }} />
            </Skeleton>
          ))}

        {data?.map(parking => (
          <View key={parking.getId()} style={{ width: 326, height: 155 }}>
            <ParkingCard
              key={parking.getId()}
              href={`/parking/${parking.getId()}`}
            >
              {parking.getFormattedName()}
            </ParkingCard>
          </View>
        ))}
      </AvailableParkingList>
    </Container>
  );
};
