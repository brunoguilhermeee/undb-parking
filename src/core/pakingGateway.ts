import { Parking } from './parking';
import { IHttpClient } from './http';

export interface IParkingDetailsGateway {
  getParkingDetails: (parkingId: string) => Promise<Parking>;
  getAvalilableParkings: () => Promise<Parking[]>;
}

export interface IParkingDetailsDTO {
  name: string;
  available: number;
  occupied: number;
  total: number;
  latitude: number;
  longitude: number;
  id: number;
}

export class ParkingDetailsGatewayHttp implements IParkingDetailsGateway {
  constructor(private readonly httpClient: IHttpClient) {}

  async getParkingDetails(parkingId: string): Promise<Parking> {
    const result = await this.httpClient.get<IParkingDetailsDTO>({
      url: `https://undb.mock/parking/${parkingId}`,
    });

    if (!result) throw new Error('Estacionamento não encontrado');

    return new Parking(
      result.name,
      result.total,
      result.available,
      result.occupied,
      result.latitude,
      result.longitude,
      result.id,
    );
  }

  async getAvalilableParkings(): Promise<Parking[]> {
    const result = await this.httpClient.get<IParkingDetailsDTO[]>({
      url: `https://undb.mock/parking/available`,
    });

    if (!result) throw new Error('Estacionamentos não encontrados');

    return result.map(raw => {
      return new Parking(
        raw.name,
        raw.total,
        raw.available,
        raw.occupied,
        raw.latitude,
        raw.longitude,
        raw.id,
      );
    });
  }
}
