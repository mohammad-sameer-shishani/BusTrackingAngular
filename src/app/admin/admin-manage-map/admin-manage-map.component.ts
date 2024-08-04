import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
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

  constructor(
    private cdr: ChangeDetectorRef,
    private busLocationService: BusLocationService,
    private stopsService: StopsService
  ) {}

  ngOnInit(): void {
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
}
