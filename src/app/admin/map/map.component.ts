import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChildService } from 'src/app/Services/child.service';
import { StopsService } from 'src/app/Services/stops.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  waypoints: google.maps.DirectionsWaypoint[] = [];
  children: any[] = [];
  origin: string = 'New York, NY';
  destination: string = 'Los Angeles, CA';
  stops: { latitude: number, longitude: number, stopName: string }[] = [];
  constructor(public childService: ChildService , private cdr: ChangeDetectorRef , private stopsService: StopsService) {}

  ngOnInit(): void {
    this.loadChildren();
 
  }

  loadChildren(): void {
    this.children = this.childService.allChildren;
    if (!this.children.length) {
      this.childService.GetAllChildren();

      const interval = setInterval(() => {
        if (this.childService.allChildren.length) {
          this.children = this.childService.allChildren;
          clearInterval(interval);  // Stop checking when loaded
        }
      }, 100);
    }
  }

  addWaypoint(address: string): void {
    this.waypoints.push({ location: address });
    console.log('Waypoint added:', address); // Log the added waypoint
    console.log('Current waypoints:', this.waypoints); // Log the current waypoints array

  }
  

  
  
  
  
  

}
