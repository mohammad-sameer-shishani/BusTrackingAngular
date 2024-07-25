import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ManageSchoolBusesComponent } from './manage-school-buses/manage-school-buses.component';
import { DashContentComponent } from './dash-content/dash-content.component';
import { ManageTeachersComponent } from './manage-teachers/manage-teachers.component';
import { ManageDriversComponent } from './manage-drivers/manage-drivers.component';
import { ManageChildrenComponent } from './manage-children/manage-children.component';
import { ManagePagesComponent } from './manage-pages/manage-pages.component';


@NgModule({
  declarations: [
    SidebarComponent,
    DashboardComponent,
    NavbarComponent,
    ManageSchoolBusesComponent,
    DashContentComponent,
    ManageTeachersComponent,
    ManageDriversComponent,
    ManageChildrenComponent,
    ManagePagesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  exports:[
    SidebarComponent,
    DashboardComponent,
    NavbarComponent,
    ManageSchoolBusesComponent,
    DashContentComponent,
    ManageTeachersComponent,
    ManageDriversComponent,
    ManageChildrenComponent,
    ManagePagesComponent
  ]
})
export class AdminModule { }
