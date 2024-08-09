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
  selectedBusId: number | null = null;  // This is critical
  selectedStopId: number | null = null;
  stopTimes: string[] = [];
  totalTripTime: string = '';
  stopsVisible: boolean = true;
  teacherId: number = 0;
  user2: any;
  address: string = '';
  newStopName: string = '';  // For adding a new stop
  updatedStopName: string = '';  // For updating a stop

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
      console.log('Teacher ID set:', this.teacherId);  // Debugging
    } else {
      console.error('No user found in local storage.');
      this.teacherId = 0;
    }
  }

  ngOnInit() {
    this.loadBusLocationsForTeacher();

    // Automatically update the bus location every 2 minutes
    setInterval(() => {
      this.updateLocation();
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
          this.selectedBusId = busLocation.busId;  // Ensure selectedBusId is set here
          console.log('Bus ID set to:', this.selectedBusId);  // Debugging

          if (this.mapsComponent) {
            this.mapsComponent.initializeMap(); 
          }
          this.cdr.detectChanges();
        } else {
          setTimeout(checkBusLocation, 100);  // Retry until the bus location is available
        }
      };

      checkBusLocation();  // Start checking for the bus location
    } else {
      console.error('Teacher ID not found in local storage.');
    }
  }

  onBusMarkerClicked(busId: number): void {
    this.selectedBusId = busId;
    console.log('Bus marker clicked, bus ID set to:', this.selectedBusId);  // Debugging
    this.stopsService.getStops(busId);
    this.busStops = this.stopsService.BusStops.map((stop: any) => ({
      stopId: stop.stopid,
      latitude: stop.latitude,
      longitude: stop.longitude,
      stopName: stop.stopname
    }));
    this.cdr.detectChanges();
  }

  onStopMarkerClicked(stopId: number): void {
    this.selectedStopId = stopId;
    console.log('Stop marker clicked, stop ID set to:', this.selectedStopId);  // Debugging
    this.stopsService.getStop(stopId);
    this.stopDetails = this.stopsService.StopForBus;
    this.updatedStopName = this.stopDetails.stopname;  // Pre-fill the input with the existing stop name
    this.cdr.detectChanges();
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
        console.log('Adding stop for Bus ID:', this.selectedBusId);  // Debugging
        this.onBusMarkerClicked(this.selectedBusId!);  // Refresh stops
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

    // Geocode the updated stop name to get latitude and longitude
    this.geocodeStopAddress(this.updatedStopName).then(location => {
        if (location) {
            const updatedStop = {
                Stopid: this.selectedStopId, // ID of the stop to update
                Busid: this.selectedBusId, // Correctly assign the BusId here
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


  deleteStop(): void {
    if (!this.selectedStopId) {
      console.error('Stop ID is missing');
      return;
    }

    this.stopsService.deleteStop(this.selectedStopId);
    console.log('Deleting stop for Stop ID:', this.selectedStopId, 'Bus ID:', this.selectedBusId);  // Debugging
    this.onBusMarkerClicked(this.selectedBusId!);  // Refresh stops
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
          BusId: this.selectedBusId!,  // Ensure this is correctly set
          Latitude: location.lat,
          Longitude: location.lng
        };

        this.busLocationService.updateLocation(updateData);
        console.log('Location updated for Bus ID:', this.selectedBusId);  // Debugging
      }
    }).catch((error) => {
      console.error('Error geocoding address:', error);
    });
  }
}
