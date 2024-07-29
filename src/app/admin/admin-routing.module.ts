import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageSchoolBusesComponent } from './manage-school-buses/manage-school-buses.component';
import { ManagePagesComponent } from './manage-pages/manage-pages.component';
import { ManageChildrenComponent } from './manage-children/manage-children.component';
import { ManageTeachersComponent } from './manage-teachers/manage-teachers.component';
import { ManageDriversComponent } from './manage-drivers/manage-drivers.component';

const routes: Routes = [
  {
    path:'dashboard',
    component:DashboardComponent
  },
  {
    path:'',
    component:DashboardComponent
  },
  {
    path:'buses',
    component:ManageSchoolBusesComponent
  },
  {
    path:'bus',
    component:ManageSchoolBusesComponent
  },
  {
    path:'children',
    component:ManageChildrenComponent
  },
  {
    path:'child',
    component:ManageChildrenComponent
  },
  {
    path:'content',
    component:ManagePagesComponent
  },
  {
    path:'teachers',
    component:ManageTeachersComponent
  },
  {
    path:'drivers',
    component:ManageDriversComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
