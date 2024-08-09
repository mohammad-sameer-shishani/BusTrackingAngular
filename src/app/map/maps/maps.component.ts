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

  @ViewChild('mapContainer', { static: false }) mapContainer: ElementRef | null = null;
  map: google.maps.Map | null = null;
  directionsService: google.maps.DirectionsService | null = null;
  directionsRenderer: google.maps.DirectionsRenderer | null = null;
  distanceMatrixService: google.maps.DistanceMatrixService | null = null;
  private changeDetectorRef: ChangeDetectorRef;
  private stopMarkers: google.maps.Marker[] = [];
  stopTimes: string[] = [];
  totalTripTime: string = '';
  stopsVisible: boolean = true;

  private infoWindow: google.maps.InfoWindow | null = null;

  constructor(private busLocationService: BusLocationService, private stopsService: StopsService, private cdr: ChangeDetectorRef) {
    this.changeDetectorRef = cdr;
  }

  ngOnInit(): void {
    this.loadGoogleMaps();
  }

  loadGoogleMaps(): void {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => this.initializeMap();
    document.head.appendChild(script);
  }


  
  


  initializeMap(): void {
    console.log('Initializing map...');
    if (this.mapContainer) {
      const firstBusMarker = this.busMarkers && this.busMarkers.length > 0 ? this.busMarkers[0] : null;
      const center = firstBusMarker
        ? new google.maps.LatLng(firstBusMarker.latitude, firstBusMarker.longitude)
        : new google.maps.LatLng(32.556776, 35.846592); // Default center location
  
      const mapOptions = {
        center: center,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
  
      this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
      console.log('Map initialized:', this.map);
  
      this.directionsService = new google.maps.DirectionsService();
      this.directionsRenderer = new google.maps.DirectionsRenderer({
        map: this.map,
        polylineOptions: {
          strokeColor: '#FF0000',
        },
      });
      this.distanceMatrixService = new google.maps.DistanceMatrixService();
  
      // Display bus markers
      this.displayBusMarkers();
    } else {
      console.error('Map container is not available');
    }
  }
  

  displayBusMarkers(): void {
    if (this.map && this.busMarkers.length > 0) {
      console.log('Adding bus markers to the map:', this.busMarkers);
      this.busMarkers.forEach(markerData => {
        console.log('Creating marker with data:', markerData);
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
  
        console.log('Bus marker added to the map:', mapMarker);
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
          reject(new Error('Timeout while loading stops'));
        }, 5000);
      });

      this.busStops = stops.map((stop: any) => ({
        stopId: stop.stopid,
        latitude: stop.latitude,
        longitude: stop.longitude,
        stopName: stop.stopname
      }));

      this.displayBusStops();
    } catch (error) {
      console.error('Failed to load stops:', error);
    }
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
    this.stopMarkers.forEach(marker => marker.setMap(null));
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
      console.error('Directions service or renderer is not initialized');
      return;
    }

    if (this.busMarkers.length === 0 || this.busStops.length === 0) {
      console.error('Insufficient data to calculate route. Ensure that busMarkers and busStops are populated.');
      return;
    }

    const busMarker = this.busMarkers.find(marker => marker.busId === busId);
    if (!busMarker) {
      console.error('Bus marker not found');
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
        this.calculateTripTime(origin, this.busStops);
      } else {
        console.error('Directions request failed due to ' + status);
      }
    });
  }

  calculateTripTime(origin: google.maps.LatLng, stops: { latitude: number, longitude: number }[]): void {
    if (this.distanceMatrixService) {
        const destinations = stops.map(stop => new google.maps.LatLng(stop.latitude, stop.longitude));

        this.distanceMatrixService.getDistanceMatrix({
            origins: [origin],
            destinations: destinations,
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC
        }, (response, status) => {
            if (status === google.maps.DistanceMatrixStatus.OK && response) {
                let totalTime = 0;
                this.stopTimes = [];

                response.rows[0].elements.forEach((element, index) => {
                    if (element.status === 'OK') {
                        const duration = element.duration.value; // Time in seconds
                        const formattedTime = this.formatTime(duration);
                        this.stopTimes.push(`Stop ${index + 1}: ${formattedTime}`);
                        totalTime += duration;
                    }
                });

                this.totalTripTime = this.formatTime(totalTime);
                this.changeDetectorRef.detectChanges();
            } else {
                console.error('Distance Matrix request failed due to ' + status);
            }
        });
    } else {
        console.error('Distance Matrix Service is not initialized');
    }
}

private formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours > 0) {
        return `${hours} hr ${remainingMinutes} min`;
    } else {
        return `${minutes} min ${remainingSeconds} sec`;
    }
}

}
