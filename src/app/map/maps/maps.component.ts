import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { StopsService } from 'src/app/Services/stops.service';
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

  // Define @Input() properties
  @Input() origin: string = '';  
  @Input() destination: string = '';  
  @Input() waypoints: google.maps.DirectionsWaypoint[] = [];
  @Input() stops: { latitude: number, longitude: number, stopName: string }[] = [];

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

      // Call the route calculation function after initializing the map
      this.calculateAndDisplayRoute();
      this.displayStopsOnMap();
    } else {
      console.error('Map container is not available');
    }
  }

  calculateAndDisplayRoute(): void {
    if (this.directionsService && this.directionsRenderer) {
      const request: google.maps.DirectionsRequest = {
        origin: this.origin,
        destination: this.destination,
        waypoints: this.waypoints,
        travelMode: google.maps.TravelMode.DRIVING
      };

      this.directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          this.directionsRenderer!.setDirections(result);
        } else {
          console.error('Directions request failed due to ' + status);
        }
      });
    } else {
      console.error('Directions Service or Renderer is not initialized.');
    }
  }

  displayStopsOnMap(): void {
    if (this.map) {
      this.stops.forEach(stop => {
        const marker = new google.maps.Marker({
          position: new google.maps.LatLng(stop.latitude, stop.longitude),
          map: this.map,
          title: stop.stopName
        });
      });
    }
  }


}
