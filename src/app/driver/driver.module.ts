import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriverRoutingModule } from './driver-routing.module';
import { MapComponent } from './map/map.component';
import { DriverNavbarComponent } from './driver-navbar/driver-navbar.component';
import { DriverSidebarComponent } from './driver-sidebar/driver-sidebar.component';
import { TripChildrenComponent } from './trip-children/trip-children.component';
import { SharedModule } from "../shared/shared.module";


@NgModule({
  declarations: [
    MapComponent,
    DriverNavbarComponent,
    DriverSidebarComponent,
    TripChildrenComponent
  ],
  imports: [
    CommonModule,
    DriverRoutingModule,
    SharedModule
]
})
export class DriverModule { }
