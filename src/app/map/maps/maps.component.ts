import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { StopsService } from 'src/app/Services/stops.service';
import { BusLocationService } from 'src/app/Services/bus-location.service';
import { environment } from 'src/environments/environment';
import { Bus } from 'src/app/models/Bus.model';
declare global {
  interface Window {
    initMap: () => void;
  }
}
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
  directionsService: google.maps.DirectionsService | null = null;  // تأكد من تعريف هذه الخاصية
  directionsRenderer: google.maps.DirectionsRenderer | null = null;
  distanceMatrixService: google.maps.DistanceMatrixService | null = null;
  private changeDetectorRef: ChangeDetectorRef;
  private stopMarkers: google.maps.Marker[] = [];
  stopTimes: string[] = [];
  totalTripTime: string = '';
  stopsVisible: boolean = true;



  private infoWindow: google.maps.InfoWindow | null = null;

  constructor(private busLocationService: BusLocationService, private stopsService: StopsService ,private cdr: ChangeDetectorRef   ) {this.changeDetectorRef = cdr;}

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
    if (this.mapContainer) {
        // Check if there are busMarkers available to center the map around a bus
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

        // Initialize DirectionsService and DirectionsRenderer
        this.directionsService = new google.maps.DirectionsService();
        this.directionsRenderer = new google.maps.DirectionsRenderer({
            map: this.map, // Attach the renderer to the map
            polylineOptions: {
                strokeColor: '#FF0000', // Set the color of the route
            },
        });
        this.distanceMatrixService = new google.maps.DistanceMatrixService(); // Initialize the distance matrix service
        this.displayBusMarkers(); // Display the bus markers on the map
    } else {
        console.error('Map container is not available');
    }
}


























/*
  initializeMap(): void {
    if (this.mapContainer) {
      const mapOptions = {
        center: new google.maps.LatLng(32.556776, 35.846592),
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
      this.displayBusMarkers();
    } else {
      console.error('Map container is not available');
    }
  }*/














    displayBusMarkers(): void {
      if (this.map && this.busMarkers.length > 0) {
        for (let marker of this.busMarkers) {
          const position = new google.maps.LatLng(marker.latitude, marker.longitude);
          const busIcon = {
            url: 'https://maps.google.com/mapfiles/kml/shapes/bus.png', // Bus icon
            scaledSize: new google.maps.Size(32, 32) // Icon size
          };
  
          const mapMarker = new google.maps.Marker({
            position,
            map: this.map,
            title: marker.stopName,
            icon: busIcon // Assign the bus icon
          });
  
          mapMarker.addListener('click', async () => {
            this.busMarkerClicked.emit(marker.busId);
  
            // Load stops for the bus
            await this.loadStopsForBus(marker.busId);
            // After stops are loaded, calculate and display the route
            this.calculateAndDisplayRoute(marker.busId);
          });
        }
      }
    }




  
    async loadStopsForBus(busId: number): Promise<void> {
      try {
        // Fetch stops for the bus using a promise-based approach
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
          }, 5000); // Adjust the timeout as necessary
        });
    
        // Map the stops to the format used by the map component
        this.busStops = stops.map((stop: any) => ({
          stopId: stop.stopid,
          latitude: stop.latitude,
          longitude: stop.longitude,
          stopName: stop.stopname
        }));
    
        // Display the stops on the map
        this.displayBusStops();
      } catch (error) {
        console.error('Failed to load stops:', error);
      }
    }
    

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
  
        // Create an info window without the stop ID
        const infoWindow = new google.maps.InfoWindow({
          content: `<div><h4>${stop.stopName}</h4><p>Latitude: ${stop.latitude}</p><p>Longitude: ${stop.longitude}</p></div>`
        });
  
        stopMarker.addListener('click', () => {
          // Close any previously opened info window
          this.infoWindow?.close();
          // Open the new info window
          infoWindow.open(this.map, stopMarker);
          // Store the reference to the currently open info window
          this.infoWindow = infoWindow;
          this.stopMarkerClicked.emit(stop.stopId);
        });
  
        this.stopMarkers.push(stopMarker);
      });
    }
  }
  
  

  clearStopMarkers(): void {
    // Remove all markers from the map
    this.stopMarkers.forEach(marker => marker.setMap(null));
    // Clear the array
    this.stopMarkers = [];
  }


  toggleStopsVisibility(): void {
    this.stopsVisible = !this.stopsVisible;
    if (this.stopsVisible) {
      this.displayBusStops();
    } else {
      this.clearStopMarkers();
      this.infoWindow?.close(); // Close the info window if stops are hidden
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
                      const formattedTime = (duration / 60).toFixed(2) + ' mins';
                      this.stopTimes.push(formattedTime);
                      totalTime += duration;
                  }
              });

              this.totalTripTime = (totalTime / 60).toFixed(2) + ' mins';

              // Trigger change detection to update the view
              this.changeDetectorRef.detectChanges();
          } else {
              console.error('Distance Matrix request failed due to ' + status);
          }
      });
  } else {
      console.error('Distance Matrix Service is not initialized');
  }
}




// ... your existing code ...
}



