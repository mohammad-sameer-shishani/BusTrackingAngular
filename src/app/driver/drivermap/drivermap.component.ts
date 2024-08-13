import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MapsComponent } from 'src/app/map/maps/maps.component';
import { BusLocationService } from 'src/app/Services/bus-location.service';
import { ChildService } from 'src/app/Services/child.service';
import { StopsService } from 'src/app/Services/stops.service';

@Component({
  selector: 'app-drivermap',
  templateUrl: './drivermap.component.html',
  styleUrls: ['./drivermap.component.css']
})
export class DrivermapComponent implements OnInit{
  busMarkers: { busId: number, latitude: number, longitude: number, stopName: string }[] = [];
  busStops: { stopId: number, latitude: number, longitude: number, stopName: string }[] = [];
  stopDetails: any;
  selectedBusId: number | null = null;
  selectedStopId: number | null = null;
  stopTimes: string[] = [];
  totalTripTime: string = '';
  stopsVisible: boolean = true;
  driverId: number = 0;
  user2: any;

  @ViewChild(MapsComponent) mapsComponent!: MapsComponent;

  constructor(
    private cdr: ChangeDetectorRef,
    private busLocationService: BusLocationService,
    private stopsService: StopsService,
    public child :ChildService
  ) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user2 = JSON.parse(storedUser);
      this.driverId = this.user2.UserId; // Now teacherId can be accessed correctly
    } else {
      console.error('No user found in local storage.');
      this.driverId = 0; // Handle this case as needed
    }
  }

  ngOnInit() {
    this.loadBusLocationsForTeacher();
    this.child.GetChildrenByDriverId(this.child.GetMyId());
  }

  loadBusLocationsForTeacher(): void {
    if (this.driverId) {
      this.busLocationService.getBusLocationsByDriverId(this.driverId);

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

          // Initialize map only after busMarkers is set
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
      console.error('Teacher ID not found in local storage.');
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
