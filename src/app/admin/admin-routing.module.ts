import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageSchoolBusesComponent } from './manage-school-buses/manage-school-buses.component';
import { ManagePagesComponent } from './manage-pages/manage-pages.component';
import { ManageChildrenComponent } from './manage-children/manage-children.component';
import { ManageTeachersComponent } from './manage-teachers/manage-teachers.component';
import { ManageDriversComponent } from './manage-drivers/manage-drivers.component';
import { TestimonialsComponent } from '../testimonials/testimonials.component';
import { ManageTestimonialsComponent } from './manage-testimonials/manage-testimonials.component';
import { ManageContactusComponent } from './manage-contactus/manage-contactus.component';
import { ManageParentsComponent } from './manage-parents/manage-parents.component';

import { ReportsComponent } from './reports/reports.component';
import { UserReportComponent } from './user-report/user-report.component';
import { AdminManageMapComponent } from './admin-manage-map/admin-manage-map.component';

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
  },
  {
    path:'testimonial',
    component:ManageTestimonialsComponent
  },
  {
    path:'testimonials',
    component:ManageTestimonialsComponent
  },
  {
    path:'contactus',
    component:ManageContactusComponent
  },
  {
    path:'parents',
    component:ManageParentsComponent
  },{
    path:'adminmap',
    component:AdminManageMapComponent
  },
 
  {
    path:'reports',
    component:ReportsComponent
  },{
    path : 'userreports',
    component:UserReportComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
