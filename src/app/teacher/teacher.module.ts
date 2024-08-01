import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherNavbarComponent } from './teacher-navbar/teacher-navbar.component';
import { TeacherSidebarComponent } from './teacher-sidebar/teacher-sidebar.component';
import { ArrivalStatusComponent } from './arrival-status/arrival-status.component';
import { AbsentsComponent } from './absents/absents.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    TeacherNavbarComponent,
    TeacherSidebarComponent,
    ArrivalStatusComponent,
    AbsentsComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule
  ]
})
export class TeacherModule { }
