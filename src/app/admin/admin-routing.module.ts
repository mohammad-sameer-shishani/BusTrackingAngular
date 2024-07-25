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
    path:'Manageschoolbuses',
    component:ManageSchoolBusesComponent
  },
  {
    path:'Managechildren',
    component:ManageChildrenComponent
  },
  {
    path:'Managchild',
    component:ManageChildrenComponent
  },
  {
    path:'ManagePages',
    component:ManagePagesComponent
  },
  {
    path:'ManageTeachers',
    component:ManageTeachersComponent
  },
  {
    path:'Managedriver',
    component:ManageDriversComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
