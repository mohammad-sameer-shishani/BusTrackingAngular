import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MapsComponent } from 'src/app/map/maps/maps.component';
import { StopsService } from 'src/app/Services/stops.service';
import { BusLocationService } from 'src/app/Services/bus-location.service';

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
  currentStopIndex: number = 0;  // Track the current stop index
  busAndStopsArray: any[] = [];  // Array to hold the current bus location and stops

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

    // Automatically move the bus location every 2 minutes
    setInterval(() => {
      this.moveBusToNextStop();
    }, 120000);  // 120000 ms = 2 minutes
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


  // Move bus to the next stop
  // Move bus to the next stop
moveBusToNextStop(): void {
  if (!this.selectedBusId || this.busAndStopsArray.length === 0) {
      console.error('Cannot move bus: No selected bus or stops available');
      return;
  }

  // Check if bus has any stops
  if (this.busStops.length === 0) {
      console.error('Insufficient data to calculate route. No stops available for this bus.');
      alert('No stops available for this bus. Please add stops to create a route.');
      return;
  }

  // Ensure that there is at least one bus marker
  if (this.busMarkers.length === 0) {
      console.error('Insufficient data to calculate route. Bus location is missing.');
      alert('Bus location is missing. Please ensure the bus location is set.');
      return;
  }

  // Log the current state before moving
  console.log(`Before Move - Current Stop Index: ${this.currentStopIndex}`);
  console.log(`Before Move - Current Location/Stop: ${JSON.stringify(this.busAndStopsArray[this.currentStopIndex])}`);

  // Move to the next location/stop, wrapping around if necessary
  let nextStopIndex = (this.currentStopIndex + 1) % this.busAndStopsArray.length;

  // If the bus location already matches the next stop, skip it
  if (
    this.busAndStopsArray[nextStopIndex].latitude === this.busMarkers[0].latitude &&
    this.busAndStopsArray[nextStopIndex].longitude === this.busMarkers[0].longitude
  ) {
    nextStopIndex = (nextStopIndex + 1) % this.busAndStopsArray.length;
  }

  this.currentStopIndex = nextStopIndex;

  // Get the next location/stop details
  const nextLocation = this.busAndStopsArray[this.currentStopIndex];
  console.log('Moving bus to next location/stop:', nextLocation);

  // Delete the stop if the bus has reached it
  if (nextLocation.stopId) {
      this.deleteStop(nextLocation.stopId);
  }

  // Update the bus location using the service
  this.busLocationService.updateLocation({
      BusId: this.selectedBusId,
      Latitude: nextLocation.latitude,
      Longitude: nextLocation.longitude
  });

  // Update bus marker position
  this.busMarkers = [{
      busId: this.selectedBusId!,
      latitude: nextLocation.latitude,
      longitude: nextLocation.longitude,
      stopName: nextLocation.stopName
  }];

  // Manually trigger change detection to update the UI
  this.cdr.detectChanges();

  // Log the state after moving
  console.log(`After Move - Current Stop Index: ${this.currentStopIndex}`);
  console.log(`After Move - New Bus Location: ${JSON.stringify(nextLocation)}`);
}



  // Geocoding function
  geocodeStopAddress(address: string): Promise<{ lat: number, lng: number } | null> {
    return new Promise((resolve, reject) => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
          const location = results[0].geometry.location;
          resolve({ lat: location.lat(), lng: location.lng() });
        } else {
          reject(new Error('Geocoding failed: ' + status));
        }
      });
    });
  }

  toggleStopsVisibility(): void {
    this.mapsComponent.toggleStopsVisibility();
  }

  updateLocation(): void {
    if (!this.address) {
      console.error('No address entered');
      return;
    }

    this.geocodeStopAddress(this.address).then((location) => {
      if (location) {
        const updateData: any = {
          BusId: this.selectedBusId!,
          Latitude: location.lat,
          Longitude: location.lng
        };

        this.busLocationService.updateLocation(updateData);
        console.log('Location updated for Bus ID:', this.selectedBusId);
      }
    }).catch((error) => {
      console.error('Error geocoding address:', error);
    });
  }
}
