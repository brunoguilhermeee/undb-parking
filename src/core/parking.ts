export class Parking {
  constructor(
    private readonly name: string,
    private readonly totalParkingSpaces: number,
    private readonly availableParkingSpaces: number,
    private readonly occupiedParkingSpaces: number,
    private readonly latitude: number,
    private readonly longitude: number,
    private readonly id: number,
  ) {}

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getFormattedName() {
    return (
      this.name.split(' ')[0] + '\n' + this.name.split(' ').slice(1).join(' ')
    );
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
  getLatitude() {
    return this.latitude;
  }
  getLongitude() {
    return this.longitude;
  }
}
