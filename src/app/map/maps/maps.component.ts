import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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

  constructor(private busLocationService: BusLocationService, private stopsService: StopsService) {}

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
      const mapOptions = {
        center: new google.maps.LatLng(0, 0),
        zoom: 2,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
      this.displayBusMarkers();
    } else {
      console.error('Map container is not available');
    }
  }

  displayBusMarkers(): void {
    if (this.map && this.busMarkers.length > 0) {
      for (let marker of this.busMarkers) {
        const position = new google.maps.LatLng(marker.latitude, marker.longitude);
        const mapMarker = new google.maps.Marker({
          position,
          map: this.map,
          title: marker.stopName
        });

        mapMarker.addListener('click', async () => {
          this.busMarkerClicked.emit(marker.busId);
          this.loadStopsForBus(marker.busId);
        });
      }
    }
  }

  loadStopsForBus(busId: number): void {
    // استدعاء الخدمة وجلب التوقفات
    this.stopsService.getStops(busId);
    // انتظار معالجة البيانات وتحديث الخريطة
    setTimeout(() => {
      this.busStops = this.stopsService.BusStops.map((stop: any) => ({
        stopId: stop.stopid,
        latitude: stop.latitude,
        longitude: stop.longitude,
        stopName: stop.stopname
      }));
      this.displayBusStops();
    }, 1000); // وقت انتظار لضمان جلب البيانات
  }

  displayBusStops(): void {
    if (this.map && this.busStops.length > 0) {
      for (let stop of this.busStops) {
        const position = new google.maps.LatLng(stop.latitude, stop.longitude);
        const stopMarker = new google.maps.Marker({
          position,
          map: this.map,
          title: stop.stopName
        });

        stopMarker.addListener('click', () => {
          this.stopMarkerClicked.emit(stop.stopId);
        });
      }
    }
  }
}