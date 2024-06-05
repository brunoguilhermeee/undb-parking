export interface IHttpClient {
  get: <Result>(request: { url: string }) => Promise<Result>;
}

export class FakeHttpClient implements IHttpClient {
  async get<Result>(request: { url: string }): Promise<Result> {
    await new Promise(resolve => setTimeout(resolve, 3000));

    if (request.url.includes('available')) {
      return [
        {
          id: 1,
          name: 'Estacionamento Drogasil',
          total: 100,
          available: 50,
          occupied: 50,
          latitude: -2.499234,
          longitude: -44.285303,
        },
        {
          id: 2,
          name: 'Estacionamento Business Center',
          total: 200,
          available: 50,
          occupied: 150,
          latitude: -2.497897,
          longitude: -44.284582,
        },
      ] as Result;
    }

    if (request.url.includes('/parking/1')) {
      return {
        id: 1,
        name: 'Estacionamento Drogasil',
        total: 100,
        available: 50,
        occupied: 50,
        latitude: -2.499234,
        longitude: -44.285303,
      } as Result;
    }

    return {
      id: 2,
      name: 'Estacionamento Business Center',
      total: 200,
      available: 50,
      occupied: 150,
      latitude: -2.497897,
      longitude: -44.284582,
    } as Result;
  }
}
