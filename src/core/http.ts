import axios, { isAxiosError } from 'axios';

export interface IHttpClient {
  get: <Result>(request: { url: string }) => Promise<Result>;
  post: <Result>(request: {
    url: string;
    body: any;
  }) => Promise<{ status: number; data: Result }>;
}

export class FakeHttpClient implements IHttpClient {
  async post<Result>(request: {
    url: string;
    body: Record<string, unknown>;
  }): Promise<Result> {
    throw new Error('Method not implemented');
  }

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

export class AxiosHttpClient implements IHttpClient {
  async post<Result>(request: {
    url: string;
    body: Record<string, unknown>;
  }): Promise<{ status: number; data: Result }> {
    try {
      return (await axios.post(request.url, request.body)) as {
        status: number;
        data: Result;
      };
    } catch (e) {
      if (isAxiosError(e)) {
        return {
          status: (e.status as number) ?? 500,
          data: null,
        } as {
          status: number;
          data: Result;
        };
      }

      return { status: 500, data: null } as {
        status: number;
        data: Result;
      };
    }
  }

  async get<Result>(request: { url: string }): Promise<Result> {
    throw new Error('Method not implemented');
  }
}
