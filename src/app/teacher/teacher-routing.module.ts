import { NgModule, ViewChildren } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArrivalStatusComponent } from './arrival-status/arrival-status.component';
import { AbsentsComponent } from './absents/absents.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewChildrenComponent } from './view-children/view-children.component';
import { ChildAttendanceComponent } from './child-attendance/child-attendance.component';
import { TeacherMapComponent } from './teacher-map/teacher-map.component';
import { ViewParentsComponent } from './view-parents/view-parents.component';
import { ViewTeachersComponent } from './view-teachers/view-teachers.component';
import { ViewDriversComponent } from './view-drivers/view-drivers.component';

const routes: Routes = [
{
  path:'status',
  component:ArrivalStatusComponent
},
{
  path:'absents',
  component:AbsentsComponent
},
{path:'',
  component:DashboardComponent
},
{
  path:'viewchildren',
  component:ViewChildrenComponent
},
{
  path:'childattendance/:childid',
  component:ChildAttendanceComponent
},
{
  path:'map',
  component:TeacherMapComponent
},
{
  path:'parents',
  component:ViewParentsComponent
},
{
  path:'teachers',
  component:ViewTeachersComponent
},
{
  path:'drivers',
  component:ViewDriversComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
