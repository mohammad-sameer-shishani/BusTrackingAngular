import { NgModule, OnInit } from '@angular/core';
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
import { ManageContactusComponent } from './manage-contactus/manage-contactus.component';
import { ManageParentsComponent } from './manage-parents/manage-parents.component';
import { MapModule } from '../map/map.module';
import { ReportsComponent } from './reports/reports.component';
import { UserReportComponent } from './user-report/user-report.component';
import { AdminManageMapComponent } from './admin-manage-map/admin-manage-map.component';


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
    ManageTestimonialsComponent,
    ManageContactusComponent,
    ManageParentsComponent,

    ReportsComponent,
    UserReportComponent,
    AdminManageMapComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MapModule
  ],
  exports:[
    SidebarComponent,
    DashboardComponent,
    ManageSchoolBusesComponent,
    ManageTeachersComponent,
    ManageDriversComponent,
    ManageChildrenComponent,
    ManagePagesComponent,
    AdminManageMapComponent,
   
   
  ]
})
export class AdminModule{

  
 }
