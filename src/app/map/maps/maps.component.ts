import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { StopsService } from 'src/app/Services/stops.service';
import { BusLocationService } from 'src/app/Services/bus-location.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  @Input() busMarkers: { busId: number; latitude: number; longitude: number; stopName: string }[] = [];
  @Input() busStops: { stopId: number; latitude: number; longitude: number; stopName: string }[] = [];

  @Output() busMarkerClicked = new EventEmitter<number>();
  @Output() stopMarkerClicked = new EventEmitter<number>();
  @Output() busLocationUpdated = new EventEmitter<{ busId: number, latitude: number, longitude: number }>();

  @ViewChild('mapContainer', { static: false }) mapContainer: ElementRef | null = null;
  map: google.maps.Map | null = null;
  directionsService: google.maps.DirectionsService | null = null;
  directionsRenderer: google.maps.DirectionsRenderer | null = null;
  distanceMatrixService: google.maps.DistanceMatrixService | null = null;
  
  stopMarkers: google.maps.Marker[] = [];
  stopTimes: string[] = [];
  totalTripTime: number = 0;
  stopsVisible: boolean = true;

  private infoWindow: google.maps.InfoWindow | null = null;
  private currentStopIndex: number = 0;
  private busRoutes: { busId: number; route: any[] }[] = [];
  private intervalHandle: any;
  private routesLoaded: boolean = false;
  private busMarkersMap: { [busId: number]: google.maps.Marker } = {};
  
  storedRoute: google.maps.DirectionsRoute | null = null;  // Add this property
  
  constructor(
    private busLocationService: BusLocationService,
    private stopsService: StopsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadGoogleMaps();
  }

  loadGoogleMaps(): void {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
        if (typeof google !== 'undefined') {
            this.initializeMap();
        } else {
            console.error('Google Maps JavaScript API is not available');
        }
    };

    document.head.appendChild(script);
  }

  initializeMap(): void {
    if (this.mapContainer) {
      const firstBusMarker = this.busMarkers && this.busMarkers.length > 0 ? this.busMarkers[0] : null;
      const center = firstBusMarker
        ? new google.maps.LatLng(firstBusMarker.latitude, firstBusMarker.longitude)
        : new google.maps.LatLng(32.556776, 35.846592);

      const mapOptions = {
        center: center,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);

      this.directionsService = new google.maps.DirectionsService();
      this.directionsRenderer = new google.maps.DirectionsRenderer({
        map: this.map,
        polylineOptions: {
          strokeColor: '#FF0000',
        },
      });
      this.distanceMatrixService = new google.maps.DistanceMatrixService();

      this.displayBusMarkers();
    } else {
      console.error('Map container is not available');
    }
  }

  displayBusMarkers(): void {
    if (this.map && this.busMarkers.length > 0) {
      this.busMarkers.forEach(markerData => {
        const position = new google.maps.LatLng(markerData.latitude, markerData.longitude);

        const busIcon = {
          url: 'https://maps.google.com/mapfiles/kml/shapes/bus.png',
          scaledSize: new google.maps.Size(32, 32)
        };

        const mapMarker = new google.maps.Marker({
          position,
          map: this.map,
          title: markerData.stopName,
          icon: busIcon
        });

        mapMarker.addListener('click', async () => {
          this.busMarkerClicked.emit(markerData.busId);
          await this.loadStopsForBus(markerData.busId);
          this.calculateAndDisplayRoute(markerData.busId);
        });

        // Store the marker reference for future updates
        this.busMarkersMap[markerData.busId] = mapMarker;

        console.log(`Bus marker added to the map for Bus ID ${markerData.busId}`);
      });
    } else {
      console.log('No bus markers to display or map is not initialized.');
    }
  }

  async loadStopsForBus(busId: number): Promise<void> {
    try {
        const stops = await new Promise<any[]>((resolve, reject) => {
            this.stopsService.getStops(busId);
            const interval = setInterval(() => {
                if (this.stopsService.BusStops.length > 0) {
                    clearInterval(interval);
                    resolve(this.stopsService.BusStops);
                }
            }, 100);

            setTimeout(() => {
                clearInterval(interval);
                if (this.stopsService.BusStops.length === 0) {
                    console.warn(`No stops found for Bus ID ${busId} within the timeout period.`);
                    resolve([]);  // Resolve with an empty array instead of rejecting
                }
            }, 5000);
        });

        if (!stops || stops.length === 0) {
            console.warn(`Bus ID ${busId} does not have any stops. The bus will not be moved.`);
            return;
        }

        this.busStops = stops.map((stop: any) => ({
            stopId: stop.stopid,
            latitude: stop.latitude,
            longitude: stop.longitude,
            stopName: stop.stopname
        }));

        // Order stops by proximity
        this.orderStopsByProximity();

        this.displayBusStops();

        const busMarker = this.busMarkers.find(marker => marker.busId === busId);
        if (busMarker) {
            const routeArray = [
                busMarker,
                ...this.busStops.map(stop => ({
                    stopId: stop.stopId,
                    latitude: stop.latitude,
                    longitude: stop.longitude,
                    stopName: stop.stopName
                }))
            ];
            this.busRoutes.push({ busId: busId, route: routeArray });
            this.routesLoaded = true;

            // Initialize currentStopIndex
            this.currentStopIndex = 0;

            // Calculate time and distance to each stop
            await this.calculateTimeToStops(busMarker);

            console.log(`Bus Route for Bus ID ${busId} successfully loaded:`, routeArray);
        } else {
            console.error(`No bus marker found for Bus ID ${busId}`);
        }
    } catch (error) {
        console.error('Failed to load stops:', error);
    }
  }

  orderStopsByProximity(): void {
    if (!this.busStops || this.busStops.length === 0) return;

    this.busStops.sort((a, b) => {
      const distanceA = google.maps.geometry.spherical.computeDistanceBetween(
        new google.maps.LatLng(this.busMarkers[0].latitude, this.busMarkers[0].longitude),
        new google.maps.LatLng(a.latitude, a.longitude)
      );
      const distanceB = google.maps.geometry.spherical.computeDistanceBetween(
        new google.maps.LatLng(this.busMarkers[0].latitude, this.busMarkers[0].longitude),
        new google.maps.LatLng(b.latitude, b.longitude)
      );
      return distanceA - distanceB;
    });

    console.log('Stops ordered by proximity:', this.busStops);
  }

  async calculateTimeToStops(busMarker: any) {
    if (!this.distanceMatrixService) {
      console.error('DistanceMatrixService is not initialized');
      return;
    }
  
    const origin = new google.maps.LatLng(busMarker.latitude, busMarker.longitude);
    const destinations = this.busStops.map(stop => new google.maps.LatLng(stop.latitude, stop.longitude));
  
    const request: google.maps.DistanceMatrixRequest = {
      origins: [origin],
      destinations: destinations,
      travelMode: google.maps.TravelMode.DRIVING,
    };
  
    this.distanceMatrixService.getDistanceMatrix(request, (response, status) => {
      if (status === google.maps.DistanceMatrixStatus.OK && response) {
        this.stopTimes = response.rows[0].elements.map((element, index) => {
          const time = element.duration?.value ? (element.duration.value / 60).toFixed(2) : '0.00'; // Convert to minutes and format
          const distance = element.distance?.text || 'Unknown distance';
          return `Stop ${index + 1} (${this.busStops[index].stopName}): ${time} min, ${distance}`;
        });
  
        // Update the total trip time
        this.totalTripTime = this.stopTimes.reduce((total, stopTime) => {
          const time = parseFloat(stopTime.split(' ')[1]);
          return total + (isNaN(time) ? 0 : time);
        }, 0);
  
        // Force UI update
        this.cdr.detectChanges();
      } else {
        console.error('Distance Matrix request failed due to ' + status);
      }
    });
  }

  displayBusStops(): void {
    this.clearStopMarkers();
    if (this.map && this.busStops.length > 0 && this.stopsVisible) {
      this.busStops.forEach(stop => {
        const position = new google.maps.LatLng(stop.latitude, stop.longitude);
        const homeIcon = {
          url: 'http://maps.google.com/mapfiles/kml/pal3/icon31.png',
          scaledSize: new google.maps.Size(40, 40),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(20, 40)
        };

        const stopMarker = new google.maps.Marker({
          position,
          map: this.map,
          title: stop.stopName,
          icon: homeIcon
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `<div><h4>${stop.stopName}</h4><p>Latitude: ${stop.latitude}</p><p>Longitude: ${stop.longitude}</p></div>`
        });

        stopMarker.addListener('click', () => {
          this.infoWindow?.close();
          infoWindow.open(this.map, stopMarker);
          this.infoWindow = infoWindow;
          this.stopMarkerClicked.emit(stop.stopId);
        });

        this.stopMarkers.push(stopMarker);
      });
    } else {
      console.log('No stop markers to display or map is not initialized.');
    }
  }

  clearStopMarkers(): void {
    this.stopMarkers.forEach((marker: google.maps.Marker) => marker.setMap(null));
    this.stopMarkers = [];
  }

  toggleStopsVisibility(): void {
    this.stopsVisible = !this.stopsVisible;
    if (this.stopsVisible) {
      this.displayBusStops();
    } else {
      this.clearStopMarkers();
      this.infoWindow?.close();
    }
  }

  calculateAndDisplayRoute(busId: number): void {
    if (!this.directionsService || !this.directionsRenderer) {
        console.error('Directions service or renderer is not initialized.');
        return;
    }

    if (!this.busMarkers || this.busMarkers.length === 0) {
        console.error('No bus markers available. Ensure that busMarkers array is populated.');
        return;
    }

    if (!this.busStops || this.busStops.length === 0) {
        console.warn(`Bus ID ${busId} does not have any stops. The bus will not be moved.`);
        return;
    }

    const busMarker = this.busMarkers.find(marker => marker.busId === busId);
    if (!busMarker) {
        console.error(`Bus marker for Bus ID ${busId} not found.`);
        return;
    }

    const origin = new google.maps.LatLng(busMarker.latitude, busMarker.longitude);
    const destination = new google.maps.LatLng(this.busStops[this.busStops.length - 1].latitude, this.busStops[this.busStops.length - 1].longitude);

    const waypoints: google.maps.DirectionsWaypoint[] = this.busStops.map(stop => ({
        location: new google.maps.LatLng(stop.latitude, stop.longitude),
        stopover: true
    }));

    const request: google.maps.DirectionsRequest = {
        origin: origin,
        destination: destination,
        waypoints: waypoints,
        travelMode: google.maps.TravelMode.DRIVING
    };

    this.directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
            this.directionsRenderer!.setDirections(result);
            console.log(`Route calculated and displayed for Bus ID ${busId}.`);
            // Store the calculated route for later use
            this.storedRoute = result!.routes[0];
        } else {
            console.error(`Directions request failed due to ${status}`);
        }
    });
  }

  moveBusAlongRoute(path: google.maps.LatLng[], legs: google.maps.DirectionsLeg[]): void {
    if (this.currentStopIndex < 0 || this.currentStopIndex >= legs.length) {
        console.error('Invalid current stop index');
        return;
    }

    const leg = legs[this.currentStopIndex];
    if (!leg) {
        console.error('Leg is undefined at index', this.currentStopIndex);
        return;
    }

    const totalSteps = path.length;

    let pointIndex = 0;

    const moveNext = () => {
        if (pointIndex < totalSteps - 1) {
            const currentPoint = path[pointIndex];
            const nextPoint = path[pointIndex + 1];

            setTimeout(() => {
                const newLat = nextPoint.lat();
                const newLng = nextPoint.lng();

                this.updateBusLocation(
                    this.busMarkers[0].busId,
                    { latitude: newLat, longitude: newLng, stopName: '' },
                    { latitude: nextPoint.lat(), longitude: nextPoint.lng(), stopName: '' }
                );

                pointIndex++;

                if (this.isBusAtStop(newLat, newLng)) {
                    console.log(`Bus has reached stop ${this.currentStopIndex + 1}`);
                    this.currentStopIndex++;
                    setTimeout(() => {
                        moveNext(); // Continue after stopping at the stop
                    }, 20000); // Stop for 2 seconds at each actual stop
                } else if (pointIndex < totalSteps - 1) {
                    moveNext(); // Continue moving to the next point
                } else {
                    console.log('Bus has reached its final destination.');
                    this.displayTotalTripTime();
                    clearInterval(this.intervalHandle);
                }
            }, 20000); // Move to the next point every 2 seconds (adjust as needed)
        } else {
            console.log('Bus has reached the next stop.');
            if (this.currentStopIndex < this.busStops.length - 1) {
                this.moveBusToNextStop();
            } else {
                console.log('Bus has reached its final stop.');
                this.displayTotalTripTime();
                clearInterval(this.intervalHandle);
            }
        }
    };

    moveNext();
}

// Function to check if the bus is at an actual stop in the busStops array
private isBusAtStop(lat: number, lng: number): boolean {
    const threshold = 0.0001; // Define a threshold to determine if the bus is at a stop
    const currentStop = this.busStops[this.currentStopIndex];
    
    return (
        Math.abs(lat - currentStop.latitude) < threshold &&
        Math.abs(lng - currentStop.longitude) < threshold
    );
}




// Function to check if the bus is at the final stop
private isBusAtFinalStop(): boolean {
  const finalStop = this.busStops[this.busStops.length - 1];
  const currentBusLocation = this.busMarkers[0];
  const threshold = 0.0001;

  return (
      Math.abs(currentBusLocation.latitude - finalStop.latitude) < threshold &&
      Math.abs(currentBusLocation.longitude - finalStop.longitude) < threshold
  );
}



  public startBusMovement(): void {
    if (this.busMarkers.length === 0) {
        console.warn('No bus markers available to start movement.');
        return;
    }

    // Automatically select the first bus if none is selected
    const busId = this.busMarkers[0].busId;

    this.loadStopsForBus(busId).then(() => {
        setTimeout(() => {
            if (this.storedRoute) {
                this.moveBusAlongRoute(this.storedRoute.overview_path, this.storedRoute.legs);
            } else {
                console.error('No route stored. Ensure the route is calculated first.');
            }
        }, 1000); // Initial delay to ensure routes are loaded
    }).catch(error => {
        console.error('Failed to start bus movement:', error);
    });
  }

  moveBusToNextStop(): void {
    if (!this.routesLoaded || this.busRoutes.length === 0) {
        console.error('No bus routes available to move.');
        return;
    }

    const route = this.busRoutes[0]; // Always move the first bus

    if (this.currentStopIndex < route.route.length - 1) {
        const currentLocation = route.route[this.currentStopIndex];
        const nextStop = route.route[this.currentStopIndex + 1];

        this.calculateAndDisplayRouteBetweenStops(currentLocation, nextStop)
            .then(() => {
                this.currentStopIndex++;
                this.cdr.detectChanges();
            })
            .catch(error => {
                console.error('Failed to calculate route:', error);
            });
    } else {
        console.log(`Bus ID ${route.busId} has reached its final stop.`);
        this.displayTotalTripTime();
        clearInterval(this.intervalHandle);
    }
  }

  calculateAndDisplayRouteBetweenStops(currentLocation: any, nextStop: any): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.directionsService || !this.directionsRenderer) {
        reject('Directions service or renderer is not initialized');
        return;
      }

      const origin = new google.maps.LatLng(currentLocation.latitude, currentLocation.longitude);
      const destination = new google.maps.LatLng(nextStop.latitude, nextStop.longitude);

      const request: google.maps.DirectionsRequest = {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
      };

      this.directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.moveBusAlongRoute(result!.routes[0].overview_path, result!.routes[0].legs);
          this.displayTimeBetweenStops(result!.routes[0].legs[0]);
          resolve();
        } else {
          reject('Directions request failed due to ' + status);
        }
      });
    });
  }

  public async updateBusLocation(busId: number, currentLocation: any, nextStop: any): Promise<void> {
    // Validate input
    if (!busId || !currentLocation || !nextStop) {
        console.error('Invalid input: Bus ID, current location, or next stop is missing.');
        return;
    }

    const newLat = nextStop.latitude;
    const newLng = nextStop.longitude;

    // Validate the next stop's coordinates
    if (isNaN(newLat) || isNaN(newLng)) {
        console.error('Invalid coordinates: Latitude or Longitude for the next stop is not a number.');
        return;
    }

    const marker = this.busMarkersMap[busId];

    // Check if the marker exists for the bus
    if (marker) {
        const newPosition = new google.maps.LatLng(newLat, newLng);
        marker.setPosition(newPosition);
        console.log(`Updated Bus ID ${busId} location to (${newLat}, ${newLng})`);

        // Emit the location update event
        this.busLocationUpdated.emit({ busId, latitude: newLat, longitude: newLng });
    } else {
        console.error(`Marker for Bus ID ${busId} not found.`);
        return; // Exit early since marker update failed
    }

    // Prepare data for the location update
    const updateData = {
        BusId: busId,
        Latitude: newLat,
        Longitude: newLng,
        StopName: currentLocation.stopName || 'Unknown Stop'
    };

    try {
        // Attempt to update the bus location in the service
        await this.busLocationService.updateLocation(updateData);
        console.log(`Successfully updated bus location for Bus ID ${busId} in the backend.`);
    } catch (error) {
        console.error('Failed to update bus location in the backend:', error);
    }
  }
  public updateBusMarker(busId: number, latitude: number, longitude: number): void {
    const marker = this.busMarkersMap[busId];
    if (marker) {
      const newPosition = new google.maps.LatLng(latitude, longitude);
      marker.setPosition(newPosition);
      console.log(`Updated Bus ID ${busId} to new position (${latitude}, ${longitude})`);
    } else {
      console.warn(`No marker found for Bus ID ${busId}`);
    }
  }
  private displayTimeBetweenStops(leg: google.maps.DirectionsLeg): void {
    const timeInMinutes = leg.duration ? leg.duration.value / 60 : 0;
    const timeText = leg.duration?.text || 'Unknown time';
    const distanceText = leg.distance?.text || 'Unknown distance';
  
    console.log(`Time between stops: ${timeText}, Distance: ${distanceText}`);
    this.stopTimes.push(`Leg: ${timeText}, Distance: ${distanceText}`);
  
    this.totalTripTime += timeInMinutes;
  }
  
  public displayTotalTripTime(): void {
    console.log('Total trip time:', this.totalTripTime + ' minutes');
    this.cdr.detectChanges();
  }

  geocodeStopAddress(address: string): Promise<{ lat: number, lng: number } | null> {
    return new Promise((resolve, reject) => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
          const location = results[0].geometry.location;
          resolve({ lat: location.lat(), lng: location.lng() }); // Call lng() to get the number
        } else {
          reject(new Error('Geocoding failed: ' + status));
        }
      });
    });
  }
  
}
