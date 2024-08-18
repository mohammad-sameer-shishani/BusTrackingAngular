import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherNavbarComponent } from './teacher-navbar/teacher-navbar.component';
import { TeacherSidebarComponent } from './teacher-sidebar/teacher-sidebar.component';
import { ArrivalStatusComponent } from './arrival-status/arrival-status.component';
import { AbsentsComponent } from './absents/absents.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewChildrenComponent } from './view-children/view-children.component';
import { SharedModule } from "../shared/shared.module";
import { ChildAttendanceComponent } from './child-attendance/child-attendance.component';
import { TeacherMapComponent } from './teacher-map/teacher-map.component';

import { MapModule } from '../map/map.module';
import { ViewTeachersComponent } from './view-teachers/view-teachers.component';
import { ViewDriversComponent } from './view-drivers/view-drivers.component';
import { ViewParentsComponent } from './view-parents/view-parents.component';
import { TripChildrenComponent } from './trip-children/trip-children.component';
import { ChildArrivalsComponent } from './child-arrivals/child-arrivals.component';


@NgModule({
  declarations: [
    TeacherNavbarComponent,
    TeacherSidebarComponent,
    ArrivalStatusComponent,
    AbsentsComponent,
    DashboardComponent,
    ViewChildrenComponent,
    ChildAttendanceComponent,
    TeacherMapComponent,
    ViewTeachersComponent,
    ViewDriversComponent,
    ViewParentsComponent,
    TripChildrenComponent,
    ChildArrivalsComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    MapModule,
    SharedModule
]
})
export class TeacherModule { }
