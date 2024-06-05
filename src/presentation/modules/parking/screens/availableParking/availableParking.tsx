import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Image, SafeAreaView, Text, View } from 'react-native';
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
  return (
    <Container>
      <MapContainer>
        <MapView
          region={{
            latitude: -2.497897,
            longitude: -44.284582,
            latitudeDelta: 0.0022,
            longitudeDelta: 0.0041,
          }}
          style={{ width: '100%', height: '100%' }}
        >
          <Marker
            coordinate={{
              latitude: -2.497897,
              longitude: -44.284582,
            }}
            title="Estacionamento Business Center"
          />
          <Marker
            coordinate={{
              latitude: -2.499234,
              longitude: -44.285303,
            }}
            title="Estacionamento Drogasil"
          />
        </MapView>
      </MapContainer>

      <Title>Estacionamentos{'\n'}disponiveis</Title>

      <AvailableParkingList>
        <ParkingCard href="/parking/1">
          Estacionamento{'\n'}Drogasil
        </ParkingCard>
        <ParkingCard href="/parking/2">
          Estacionamento{'\n'}Business Center
        </ParkingCard>
      </AvailableParkingList>
    </Container>
  );
};
