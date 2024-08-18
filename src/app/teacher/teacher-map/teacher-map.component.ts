import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MapsComponent } from 'src/app/map/maps/maps.component';
import { BusLocationService } from 'src/app/Services/bus-location.service';
import { StopsService } from 'src/app/Services/stops.service';

@Component({
  selector: 'app-teacher-map',
  templateUrl: './teacher-map.component.html',
  styleUrls: ['./teacher-map.component.css']
})
export class TeacherMapComponent implements OnInit {
  busMarkers: { busId: number, latitude: number, longitude: number, stopName: string }[] = [];
  busStops: { stopId: number, latitude: number, longitude: number, stopName: string }[] = [];
  stopDetails: any;
  selectedBusId: number | null = null;
  selectedStopId: number | null = null;
  stopTimes: string[] = [];
  totalTripTime: string = '';
  stopsVisible: boolean = true;
  teacherId: number = 0;
  user2: any;
  address: string = '';
  newStopName: string = '';
  updatedStopName: string = '';
  currentStopIndex: number = 0;
  busAndStopsArray: any[] = [];
  intervalHandle: any; // Declare intervalHandle property

  @ViewChild(MapsComponent) mapsComponent!: MapsComponent;

  constructor(
    private cdr: ChangeDetectorRef,
    private busLocationService: BusLocationService,
    private stopsService: StopsService
  ) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user2 = JSON.parse(storedUser);
      this.teacherId = this.user2.UserId;
      console.log('Teacher ID set:', this.teacherId);
    } else {
      console.error('No user found in local storage.');
      this.teacherId = 0;
    }
  }

  ngOnInit() {
    this.loadBusLocationsForTeacher();
    this.startPolling(); // Start polling for bus location updates
  }

  loadBusLocationsForTeacher(): void {
    if (this.teacherId) {
      this.busLocationService.getBusLocationsByTeacherId(this.teacherId);
      const checkBusLocation = () => {
        const busLocation = this.busLocationService.teacherBus;
        if (busLocation) {
          this.busMarkers = [{
            busId: busLocation.busId,
            latitude: busLocation.latitude,
            longitude: busLocation.longitude,
            stopName: 'Bus ' + busLocation.busnumber
          }];
          this.selectedBusId = busLocation.busId;
          console.log('Bus ID set to:', this.selectedBusId);

          if (this.mapsComponent) {
            this.mapsComponent.initializeMap(); 
          }
          this.cdr.detectChanges();
          this.loadStopsForBus(this.selectedBusId!); // Load stops after the bus ID is set
        } else {
          setTimeout(checkBusLocation, 100);
        }
      };

      checkBusLocation();
    } else {
      console.error('Teacher ID not found in local storage.');
    }
  }

  loadBusLocations(): void {
    this.loadBusLocationsForTeacher(); // Reuse the existing method
  }

  loadStopsForBus(busId: number): void {
    this.stopsService.getStops(busId);
    const checkStopsLoaded = () => {
      if (this.stopsService.BusStops.length > 0) {
        this.busStops = this.stopsService.BusStops.map((stop: any) => ({
          stopId: stop.stopid,
          latitude: stop.latitude,
          longitude: stop.longitude,
          stopName: stop.stopname
        }));
        console.log('Loaded stops for bus ID:', busId, this.busStops);
        
        // Create a new array with the current bus location and stops
        this.busAndStopsArray = [
          ...this.busMarkers,
          ...this.busStops.map(stop => ({
            stopId: stop.stopId,
            latitude: stop.latitude,
            longitude: stop.longitude,
            stopName: stop.stopName
          }))
        ];
        console.log('New Array with Bus and Stops:', this.busAndStopsArray);

        this.cdr.detectChanges(); // Trigger UI update
      } else {
        console.log('No stops found for bus ID:', busId);
      }
    };

    checkStopsLoaded();
  }

  onBusMarkerClicked(busId: number): void {
    this.selectedBusId = busId;
    console.log('Bus marker clicked, bus ID set to:', this.selectedBusId);
    this.loadStopsForBus(busId);
  }

  onStopMarkerClicked(stopId: number): void {
    this.selectedStopId = stopId;
    console.log('Stop marker clicked, stop ID set to:', this.selectedStopId);
    this.stopsService.getStop(stopId);
    const checkStopDetailsLoaded = () => {
      if (this.stopsService.StopForBus) {
        this.stopDetails = this.stopsService.StopForBus;
        this.updatedStopName = this.stopDetails.stopname;
        this.cdr.detectChanges();
      } else {
        setTimeout(checkStopDetailsLoaded, 100);
      }
    };
    checkStopDetailsLoaded();
  }

  addStop(): void {
    if (!this.newStopName || !this.selectedBusId) {
      console.error('Stop name or bus ID is missing');
      return;
    }

    this.geocodeStopAddress(this.newStopName).then((location) => {
      if (location) {
        const newStop = {
          BusId: this.selectedBusId,
          Latitude: location.lat,
          Longitude: location.lng,
          StopName: this.newStopName
        };

        this.stopsService.addStop(newStop);
        console.log('Adding stop for Bus ID:', this.selectedBusId);
        this.onBusMarkerClicked(this.selectedBusId!);
      }
    }).catch((error) => {
      console.error('Error geocoding stop address:', error);
    });
  }

  updateStop(): void {
    if (!this.selectedStopId || !this.updatedStopName) {
      console.error('Stop ID or updated stop name is missing');
      return;
    }

    this.geocodeStopAddress(this.updatedStopName).then(location => {
      if (location) {
        const updatedStop = {
          Stopid: this.selectedStopId,
          Busid: this.selectedBusId,
          Latitude: location.lat,
          Longitude: location.lng,
          Stopname: this.updatedStopName
        };

        this.stopsService.updateStop(this.selectedStopId!, updatedStop);
      }
    }).catch(error => {
      console.error('Error geocoding updated stop address:', error);
    });
  }

  deleteStop(stopId: number): void {
    this.stopsService.deleteStop(stopId);
    console.log('Stop deleted:', stopId);
    this.busStops = this.busStops.filter(stop => stop.stopId !== stopId);
    this.busAndStopsArray = this.busAndStopsArray.filter(stop => stop.stopId !== stopId);
    this.cdr.detectChanges(); // Update the UI after deleting the stop
  }

  // Geocoding function
  geocodeStopAddress(address: string): Promise<{ lat: number, lng: number } | null> {
    return new Promise((resolve, reject) => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
          const location = results[0].geometry.location;
          // Call lat() and lng() to get the actual values
          resolve({ lat: location.lat(), lng: location.lng() });
        } else {
          reject(new Error('Geocoding failed: ' + status));
        }
      });
    });
  }
  
  updateBusMarkersOnMap(): void {
    if (this.mapsComponent && this.busMarkers) {
      this.busMarkers.forEach(bus => {
        this.mapsComponent.updateBusMarker(bus.busId, bus.latitude, bus.longitude);
      });
      this.cdr.detectChanges(); // Trigger UI update
    }
  }

  startPolling() {
    // Load initially
    this.loadBusLocations();
    
    // Poll every 30 seconds (you can adjust the interval as needed)
    this.intervalHandle = setInterval(() => {
      this.loadBusLocations();
      this.updateBusMarkersOnMap();
    }, 30000);
  }
}
