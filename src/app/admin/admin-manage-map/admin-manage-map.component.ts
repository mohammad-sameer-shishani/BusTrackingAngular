import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs';
import { MapsComponent } from 'src/app/map/maps/maps.component';
import { BusLocationService } from 'src/app/Services/bus-location.service';
import { StopsService } from 'src/app/Services/stops.service';

@Component({
  selector: 'app-admin-manage-map',
  templateUrl: './admin-manage-map.component.html',
  styleUrls: ['./admin-manage-map.component.css']
})
export class AdminManageMapComponent implements OnInit {
  busMarkers: { busId: number, latitude: number, longitude: number, stopName: string }[] = [];
  busStops: { stopId: number, latitude: number, longitude: number, stopName: string }[] = [];
  stopDetails: any;
  selectedBusId: number | null = null;
  selectedStopId: number | null = null;
  stopTimes: string[] = [];  // Add this property
  totalTripTime: string = '';  // Add this property
  stopsVisible: boolean = true;  // Add this property to track visibility of stops
  @ViewChild(MapsComponent) mapsComponent!: MapsComponent;
  constructor(
    private cdr: ChangeDetectorRef,
    private busLocationService: BusLocationService,
    private stopsService: StopsService
  ) {}

  ngOnInit() {
    this.loadAllBusesLocations();
  }

  loadAllBusesLocations(): void {
    this.busLocationService.getAllBusesLocations();
    this.busMarkers = this.busLocationService.allBusesLocations.map((bus: any) => ({
      busId: bus.busId,
      latitude: bus.latitude,
      longitude: bus.longitude,
      stopName: 'Bus ' + bus.busnumber
    }));
  }

  onBusMarkerClicked(busId: number): void {
    this.selectedBusId = busId;
    this.loadStopsForBus(busId);
  }

  loadStopsForBus(busId: number): void {
    this.stopsService.getStops(busId);
    this.busStops = this.stopsService.BusStops.map((stop: any) => ({
      stopId: stop.stopid,
      latitude: stop.latitude,
      longitude: stop.longitude,
      stopName: stop.stopname
    }));
  }

  onStopMarkerClicked(stopId: number): void {
    this.selectedStopId = stopId;
    this.loadStopDetails(stopId);
  }

  loadStopDetails(stopId: number): void {
    this.stopsService.getStop(stopId);
    this.stopDetails = this.stopsService.StopForBus;
  }

  toggleStopsVisibility(): void {
    this.mapsComponent.toggleStopsVisibility();
  }


    // Add this method to calculate the trip time
    calculateTripTime(origin: google.maps.LatLng, stops: { latitude: number, longitude: number }[]): void {
      // Logic to calculate trip time and set stopTimes and totalTripTime
      // Trigger change detection to update the view
      this.cdr.detectChanges();
    }
}
