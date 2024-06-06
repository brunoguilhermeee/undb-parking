import { parkingDetailsGateway } from '@/core/factory';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Skeleton } from 'moti/skeleton';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import styled, { css, useTheme } from 'styled-components';
import { useQuery } from '@tanstack/react-query';

const Container = styled(SafeAreaView)`
  flex: 1;
  font-family: ${({ theme }) => theme.font.regular};
  margin: ${({ theme }) => `${theme.spacing[6]} ${theme.spacing[7]}`};
`;

const Title = styled(Text)`
  ${({ theme }) => css`
    color: ${theme.colors.gray[800]};
    font-size: 24px;
    font-family: ${theme.font.medium};
    font-weight: 500;
  `}
`;

const TitleContainer = styled(View)`
  ${({ theme }) => css`
    margin-left: ${theme.spacing[8]};
    margin-top: ${theme.spacing[3]};
  `}
`;

const BackButton = styled(Pressable)`
  ${({ theme }) => css`
    gap: ${theme.spacing['4']};
    flex-direction: row;
    align-items: center;
  `}
`;

const ParkingSpacesContainer = styled(View)`
  ${({ theme }) => css`
    margin-top: ${theme.spacing['8']};
    padding-bottom: ${theme.spacing['8']};
    align-items: center;
    justify-content: center;
    gap: ${theme.spacing[6]};
  `}
`;

export const Divider = styled(View)`
  ${({ theme }) => css`
    height: 5px;
    width: 222px;
    background-color: ${theme.colors.gray[300]};
  `}
`;

const ParkingSpaceContainer = styled(View)`
  ${({ theme }) => css`
    gap: ${theme.spacing['4']};
    align-items: center;
    justify-content: center;
  `}
`;

const ParkingSpaceTitle = styled(Text)`
  ${({ theme }) => css`
    font-size: 32px;
    font-family: ${theme.font.black};
    color: ${theme.colors.gray[800]};
  `}
`;

const ParkingSpaceContent = styled(Text)<{ color?: string }>`
  ${({ theme, color }) => css`
    font-size: 64px;
    font-family: ${theme.font.black};
    color: ${color};
    text-align: center;
  `}
`;

export interface IParkingSpaceProps {
  variant: 'occupied' | 'available' | 'total';
  spaces?: number;
}

export const ParkingSpace = ({ variant, spaces }: IParkingSpaceProps) => {
  const theme = useTheme();
  const colorScheme = useColorScheme() ?? 'light';

  const spaceVariant = {
    occupied: {
      title: 'Vagas ocupadas:',
      color: theme.colors.red[500],
      icon: require('@/presentation/assets/images/parking-pin-red.png'),
    },
    available: {
      title: 'Vagas disponíveis:',
      color: theme.colors.green[500],
      icon: require('@/presentation/assets/images/parking-pin-green.png'),
    },
    total: {
      title: 'Total de vagas:',
      color: theme.colors.pink[500],
      icon: require('@/presentation/assets/images/parking-pin-pink.png'),
    },
  }[variant];

  return (
    <ParkingSpaceContainer>
      <Image source={spaceVariant.icon} />
      <ParkingSpaceTitle>{spaceVariant.title}</ParkingSpaceTitle>
      <Skeleton
        show={!spaces}
        height={70}
        width={130}
        radius={8}
        colorMode={colorScheme}
        transition={{
          type: 'timing',
          duration: 2000,
        }}
      >
        <ParkingSpaceContent color={spaceVariant.color}>
          {spaces}
        </ParkingSpaceContent>
      </Skeleton>
    </ParkingSpaceContainer>
  );
};

export const ParkingDetailsScreen = () => {
  const theme = useTheme();

  const colorScheme = useColorScheme() ?? 'light';
  const { parkingId } = useLocalSearchParams();

  const {
    data: parkingDetail,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['parking', parkingId],
    queryFn: () => parkingDetailsGateway.getParkingDetails(parkingId as string),
  });

  function handleBack() {
    router.back();
  }

  if (error || (!isLoading && !parkingDetail)) {
    return (
      <Container>
        <Text>Estacionamento não encontrado.</Text>
      </Container>
    );
  }

  return (
    <Container>
      <View>
        <BackButton onPress={handleBack}>
          <Ionicons
            name="chevron-back"
            size={24}
            color={theme.colors.gray[800]}
          />
          <Image
            source={require('@/presentation/assets/images/logo-short.png')}
          />
        </BackButton>

        <TitleContainer>
          <Skeleton
            show={isLoading}
            height={30}
            width="100%"
            radius={8}
            colorMode={colorScheme}
            transition={{
              type: 'timing',
              duration: 2000,
            }}
          >
            <Title>{parkingDetail?.getName()}</Title>
          </Skeleton>
        </TitleContainer>

        <ScrollView>
          <ParkingSpacesContainer>
            <ParkingSpace
              variant="total"
              spaces={parkingDetail?.getTotalParkingSpaces()}
            />
            <Divider />
            <ParkingSpace
              variant="occupied"
              spaces={parkingDetail?.getOccupiedParkingSpaces()}
            />
            <Divider />
            <ParkingSpace
              variant="available"
              spaces={parkingDetail?.getAvailableParkingSpaces()}
            />
          </ParkingSpacesContainer>
        </ScrollView>
      </View>
    </Container>
  );
};
