import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Skeleton } from 'moti/skeleton';
import { useEffect, useState } from 'react';
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

/**
 *
 * Integração
 *
 */
class Right<T> {
  readonly value: T;

  private constructor(value: T) {
    this.value = value;
  }

  isLeft(): this is Left<never> {
    return false;
  }

  isRight(): this is Right<T> {
    return true;
  }

  static create<U>(value: U): Right<U> {
    return new Right(value);
  }
}

class Left<T> {
  readonly error: T;

  private constructor(error: T) {
    this.error = error;
  }

  isLeft(): this is Left<T> {
    return true;
  }

  isRight(): this is Right<never> {
    return false;
  }

  static create<U>(error: U): Left<U> {
    return new Left(error);
  }
}

type Either<T, U> = Left<T> | Right<U>;

export class Parking {
  constructor(
    private readonly name: string,
    private readonly totalParkingSpaces: number,
    private readonly availableParkingSpaces: number,
    private readonly occupiedParkingSpaces: number,
  ) {}

  getName() {
    return this.name;
  }

  getTotalParkingSpaces() {
    return this.totalParkingSpaces;
  }

  getAvailableParkingSpaces() {
    return this.availableParkingSpaces;
  }

  getOccupiedParkingSpaces() {
    return this.occupiedParkingSpaces;
  }
}

export class ParkingNotFound extends Error {
  constructor() {
    super('Estacionamento não encontrado');
    this.name = 'ParkingNotFound';
  }
}

export interface IParkingDetailsGateway {
  getParkingDetails: (
    parkingId: string,
  ) => Promise<Either<ParkingNotFound, Parking>>;
}

export interface IParkingDetailsDTO {
  name: string;
  available: number;
  occupied: number;
  total: number;
}

export class ParkingDetailsGatewayHttp implements IParkingDetailsGateway {
  constructor(private readonly httpClient: IHttpClient) {}

  async getParkingDetails(
    parkingId: string,
  ): Promise<Either<ParkingNotFound, Parking>> {
    const result = await this.httpClient.get<IParkingDetailsDTO>({
      url: `https://undb.mock/parking/${parkingId}`,
    });

    if (!result) return Left.create(new ParkingNotFound());

    return Right.create(
      new Parking(result.name, result.total, result.available, result.occupied),
    );
  }
}

export interface IHttpClient {
  get: <Result>(request: { url: string }) => Promise<Result>;
}

export class FakeHttpClient implements IHttpClient {
  async get<Result>(request: { url: string }): Promise<Result> {
    await new Promise(resolve => setTimeout(resolve, 3000));

    if (request.url.includes('/parking/1')) {
      return {
        name: 'Estacionamento Drogasil',
        total: 100,
        available: 50,
        occupied: 50,
      } as Result;
    }

    return {
      name: 'Estacionamento Business Center',
      total: 200,
      available: 50,
      occupied: 150,
    } as Result;
  }
}

function makeParkingDetailsfGatewayHttp() {
  const client = new FakeHttpClient();
  const parkingDetailsGateway = new ParkingDetailsGatewayHttp(client);
  return parkingDetailsGateway;
}

const parkingDetailsGateway = makeParkingDetailsfGatewayHttp();

/**
 *
 * Fim da integração
 *
 */

/**
 *
 * Presentation
 *
 */

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
  const [parkingDetail, setParkingDetail] = useState<Parking>();
  const [parkingDetailRequestStatus, setParkingDetailRequestStatus] = useState<
    'idle' | 'pending'
  >('pending');
  const { parkingId } = useLocalSearchParams();

  useEffect(() => {
    parkingDetailsGateway
      .getParkingDetails(parkingId as string)
      .then(result => {
        if (result.isRight()) {
          setParkingDetail(result.value);
        }
      })
      .finally(() => {
        setParkingDetailRequestStatus('idle');
      });
  }, [parkingId]);

  function handleBack() {
    router.back();
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
            show={parkingDetailRequestStatus === 'pending'}
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
