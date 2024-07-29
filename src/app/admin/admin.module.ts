import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageSchoolBusesComponent } from './manage-school-buses/manage-school-buses.component';
import { ManageTeachersComponent } from './manage-teachers/manage-teachers.component';
import { ManageDriversComponent } from './manage-drivers/manage-drivers.component';
import { ManageChildrenComponent } from './manage-children/manage-children.component';
import { ManagePagesComponent } from './manage-pages/manage-pages.component';
import { SharedModule } from '../shared/shared.module';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AddChildComponent } from './add-child/add-child.component';
import { AdduserComponent } from './adduser/adduser.component';
import { AddBusComponent } from './add-bus/add-bus.component';
import { ManageTestimonialsComponent } from './manage-testimonials/manage-testimonials.component';


@NgModule({
  declarations: [
    SidebarComponent,
    DashboardComponent,
    ManageSchoolBusesComponent,
    ManageTeachersComponent,
    ManageDriversComponent,
    ManageChildrenComponent,
    ManagePagesComponent,
    AdminNavbarComponent,
    AddChildComponent,
    AdduserComponent,
    AddBusComponent,
    ManageTestimonialsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ],
  exports:[
    SidebarComponent,
    DashboardComponent,
    ManageSchoolBusesComponent,
    ManageTeachersComponent,
    ManageDriversComponent,
    ManageChildrenComponent,
    ManagePagesComponent
  ]
})
export class AdminModule { }
