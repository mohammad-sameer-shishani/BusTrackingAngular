import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MapsComponent } from 'src/app/map/maps/maps.component';
import { BusLocationService } from 'src/app/Services/bus-location.service';
import { StopsService } from 'src/app/Services/stops.service';

@Component({
  selector: 'app-parentmap',
  templateUrl: './parentmap.component.html',
  styleUrls: ['./parentmap.component.css']
})
export class ParentmapComponent implements OnInit {
  busMarkers: { busId: number, latitude: number, longitude: number, stopName: string }[] = [];
  busStops: { stopId: number, latitude: number, longitude: number, stopName: string }[] = [];
  stopDetails: any;
  selectedBusId: number | null = null;
  selectedStopId: number | null = null;
  stopTimes: string[] = [];
  totalTripTime: string = '';
  stopsVisible: boolean = true;
  parentId: number = 0;
  user2: any;

  @ViewChild(MapsComponent) mapsComponent!: MapsComponent;

  constructor(
    private cdr: ChangeDetectorRef,
    private busLocationService: BusLocationService,
    private stopsService: StopsService
  ) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user2 = JSON.parse(storedUser);
      this.parentId = this.user2.UserId;
    } else {
      console.error('No user found in local storage.');
      this.parentId = 0;
    }
  }

  ngOnInit() {
    this.loadBusLocationsForParent();

    // Reload the bus location every 2 minutes
    setInterval(() => {
      this.loadBusLocationsForParent();
    }, 120000);  // 120000 ms = 2 minutes
  }

  loadBusLocationsForParent(): void {
    if (this.parentId) {
      this.busLocationService.getBusLocationsForParent(this.parentId);

      const checkBusLocation = () => {
        const busLocation = this.busLocationService.teacherBus;
        if (busLocation) {
          this.busMarkers = [{
            busId: busLocation.busId,
            latitude: busLocation.latitude,
            longitude: busLocation.longitude,
            stopName: 'Bus ' + busLocation.busnumber
          }];
          console.log('Bus markers set:', this.busMarkers);

          if (this.mapsComponent) {
            this.mapsComponent.initializeMap();
          }

          this.cdr.detectChanges();
        } else {
          setTimeout(checkBusLocation, 100); // Retry until the bus location is available
        }
      };

      checkBusLocation(); // Start checking for the bus location
    } else {
      console.error('Parent ID not found in local storage.');
    }
  }

  onBusMarkerClicked(busId: number): void {
    this.selectedBusId = busId;
    this.stopsService.getStops(busId);

    const checkBusStops = () => {
      if (this.stopsService.BusStops.length > 0) {
        this.busStops = this.stopsService.BusStops.map((stop: any) => ({
          stopId: stop.stopid,
          latitude: stop.latitude,
          longitude: stop.longitude,
          stopName: stop.stopname
        }));
        console.log('Bus stops set:', this.busStops);
        this.cdr.detectChanges();
      } else {
        setTimeout(checkBusStops, 100); // Retry until the bus stops are available
      }
    };

    checkBusStops(); // Start checking for the bus stops
  }

  onStopMarkerClicked(stopId: number): void {
    this.selectedStopId = stopId;
    this.stopsService.getStop(stopId);

    const checkStopDetails = () => {
      if (this.stopsService.StopForBus) {
        this.stopDetails = this.stopsService.StopForBus;
        console.log('Stop details set:', this.stopDetails);
        this.cdr.detectChanges();
      } else {
        setTimeout(checkStopDetails, 100); // Retry until the stop details are available
      }
    };

    checkStopDetails();
    checkStopDetails(); // Start checking for the stop details
  }

  toggleStopsVisibility(): void {
    this.mapsComponent.toggleStopsVisibility();
  }

  calculateTripTime(origin: google.maps.LatLng, stops: { latitude: number, longitude: number }[]): void {
    // Logic to calculate trip time and set stopTimes and totalTripTime
    this.cdr.detectChanges();
  }
}
