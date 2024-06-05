import { FakeHttpClient } from './http';
import { ParkingDetailsGatewayHttp } from './pakingGateway';

function makeParkingDetailsfGatewayHttp() {
  const client = new FakeHttpClient();
  const parkingDetailsGateway = new ParkingDetailsGatewayHttp(client);
  return parkingDetailsGateway;
}

export const parkingDetailsGateway = makeParkingDetailsfGatewayHttp();
