import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentRoutingModule } from './parent-routing.module';
import { ParentSidebarComponent } from './parent-sidebar/parent-sidebar.component';
import { ParentNavbarComponent } from './parent-navbar/parent-navbar.component';
import { MapModule } from '../map/map.module';
import { SharedModule } from '../shared/shared.module';
import { ParentmapComponent } from './parentmap/parentmap.component';
import { ChildAttendanceComponent } from './child-attendance/child-attendance.component';


@NgModule({
  declarations: [
    ParentSidebarComponent,
    ParentNavbarComponent,
    ParentmapComponent,
    ChildAttendanceComponent
  ],
  imports: [
    CommonModule,
    ParentRoutingModule,
    MapModule,
    SharedModule

  ]
})
export class ParentModule { }
