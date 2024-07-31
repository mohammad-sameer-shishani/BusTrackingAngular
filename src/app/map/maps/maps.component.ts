import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  @ViewChild('mapContainer', { static: false }) mapContainer: ElementRef | null = null;
  map: google.maps.Map | null = null;
  directionsService: google.maps.DirectionsService | null = null;
  directionsRenderer: google.maps.DirectionsRenderer | null = null;
  distanceMatrixService: google.maps.DistanceMatrixService | null = null;

  constructor() {}

  ngOnInit(): void {
    this.loadGoogleMaps();
  }

  loadGoogleMaps(): void {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}&libraries=places,directions`;
    script.async = true;
    script.defer = true;
    script.onload = () => this.initializeMap();
    document.head.appendChild(script);
  }

  initializeMap(): void {
    if (this.mapContainer) {
      const mapOptions = {
        center: new google.maps.LatLng(40.73061, -73.935242),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);

      // Initialize Directions and Distance Matrix Services
      this.directionsService = new google.maps.DirectionsService();
      this.directionsRenderer = new google.maps.DirectionsRenderer();
      this.directionsRenderer.setMap(this.map);
      this.distanceMatrixService = new google.maps.DistanceMatrixService();

      // Example usage
      this.calculateAndDisplayRoute();
      this.calculateDistanceMatrix();
    } else {
      console.error('Map container is not available');
    }
  }

  calculateAndDisplayRoute(): void {
    if (this.directionsService && this.directionsRenderer) {
      const request: google.maps.DirectionsRequest = {
        origin: 'New York, NY', // Start location
        destination: 'Los Angeles, CA', // End location
        waypoints: [
          { location: 'Philadelphia, PA' }, // First stop
          { location: 'Pittsburgh, PA' }, // Second stop
        ],
        travelMode: google.maps.TravelMode.DRIVING
      };

      this.directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result && this.directionsRenderer) {
          this.directionsRenderer.setDirections(result);

          // Loop through legs to get travel time between stops
          const route = result.routes[0];
          route.legs.forEach((leg, index) => {
            console.log(`Leg ${index + 1}:`);
            console.log(`From: ${leg.start_address}`);
            console.log(`To: ${leg.end_address}`);
            if (leg.duration) {
              console.log(`Duration: ${leg.duration.text}`);
            } else {
              console.log(`Duration: Not available`);
            }
            console.log(`Distance: ${leg.distance?.text || 'Not available'}`);
          });

        } else {
          console.error('Directions request failed due to ' + status);
        }
      });
    } else {
      console.error('Directions Service or Renderer is not initialized.');
    }
  }

  calculateDistanceMatrix(): void {
    if (this.distanceMatrixService) {
      const request: google.maps.DistanceMatrixRequest = {
        origins: ['New York, NY', 'Philadelphia, PA'], // Multiple origins
        destinations: ['Los Angeles, CA', 'San Francisco, CA'], // Multiple destinations
        travelMode: google.maps.TravelMode.DRIVING,
      };

      this.distanceMatrixService.getDistanceMatrix(request, (response, status) => {
        if (status === google.maps.DistanceMatrixStatus.OK && response) {
          response.rows.forEach((row, i) => {
            row.elements.forEach((element, j) => {
              console.log(`From ${request.origins[i]} to ${request.destinations[j]}:`);
              console.log(`Distance: ${element.distance.text}, Duration: ${element.duration.text}`);
            });
          });
        } else {
          console.error('Distance Matrix request failed due to ' + status);
        }
      });
    } else {
      console.error('Distance Matrix Service is not initialized.');
    }
  }
}
