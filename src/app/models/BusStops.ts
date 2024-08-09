export interface BusStop {
    stopId: number;
    latitude: number;
    longitude: number;
    stopName: string;
    distanceFromBus?: string; // Optional property to store the distance
  }
  