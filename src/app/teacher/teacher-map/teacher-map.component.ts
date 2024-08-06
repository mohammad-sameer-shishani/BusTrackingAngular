import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MapsComponent } from 'src/app/map/maps/maps.component';
import { BusLocationService } from 'src/app/Services/bus-location.service';
import { StopsService } from 'src/app/Services/stops.service';

@Component({
  selector: 'app-teacher-map',
  templateUrl: './teacher-map.component.html',
  styleUrls: ['./teacher-map.component.css']
})
export class TeacherMapComponent extends MapsComponent implements OnInit{

}
