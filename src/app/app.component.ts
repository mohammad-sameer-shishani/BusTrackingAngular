import { Component, OnInit } from '@angular/core';
import { ChildService } from './Services/child.service';
import { HomeService } from './Services/home.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  title = 'BusTrackingAngular';
}
