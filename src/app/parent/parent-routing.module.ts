import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParentmapComponent } from './parentmap/parentmap.component';
import { ChildAttendanceComponent } from './child-attendance/child-attendance.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotificationComponent } from './notification/notification.component';

const routes: Routes = [
  {
    path : 'map',
    component:ParentmapComponent
  },
  {
    path:'',
    component:ParentmapComponent
  },
  {
    path:'childAttendance',
    component:ChildAttendanceComponent
  },
  {
    path:'notifications',
    component:NotificationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentRoutingModule { }
