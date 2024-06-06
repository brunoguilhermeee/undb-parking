import { AuthGatewayHttp } from './authGateway';
import { AxiosHttpClient, FakeHttpClient } from './http';
import { ParkingDetailsGatewayHttp } from './pakingGateway';
import { AppAsyncStorage } from './storage';

function makeParkingDetailsfGatewayHttp() {
  const client = new FakeHttpClient();
  const parkingDetailsGateway = new ParkingDetailsGatewayHttp(client);
  return parkingDetailsGateway;
}

export const parkingDetailsGateway = makeParkingDetailsfGatewayHttp();

function makeAuthGateway() {
  const storage = new AppAsyncStorage();
  const client = new AxiosHttpClient();
  const authGatewayHttp = new AuthGatewayHttp(client, storage);
  return authGatewayHttp;
}

export const authGatewayHttp = makeAuthGateway();
