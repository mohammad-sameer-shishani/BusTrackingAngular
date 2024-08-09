import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParentmapComponent } from './parentmap/parentmap.component';
import { ChildAttendanceComponent } from './child-attendance/child-attendance.component';

const routes: Routes = [
  {
    path : 'map',
    component:ParentmapComponent
  },
  {
    path:'',
    component:ChildAttendanceComponent
  },
  {
    path:"childAttendance",
    component:ChildAttendanceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentRoutingModule { }
