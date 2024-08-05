import { NgModule, ViewChildren } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArrivalStatusComponent } from './arrival-status/arrival-status.component';
import { AbsentsComponent } from './absents/absents.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewChildrenComponent } from './view-children/view-children.component';

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
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
