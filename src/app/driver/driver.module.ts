import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriverRoutingModule } from './driver-routing.module';

import { DriverNavbarComponent } from './driver-navbar/driver-navbar.component';
import { DriverSidebarComponent } from './driver-sidebar/driver-sidebar.component';
import { TripChildrenComponent } from './trip-children/trip-children.component';
import { SharedModule } from "../shared/shared.module";
import { DrivermapComponent } from './drivermap/drivermap.component';
import { MapModule } from '../map/map.module';


@NgModule({
  declarations: [
   
    DriverNavbarComponent,
    DriverSidebarComponent,
    TripChildrenComponent,
    DrivermapComponent
  ],
  imports: [
    CommonModule,
    DriverRoutingModule,
    MapModule,
    SharedModule
]
})
export class DriverModule { }
