import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TripChildrenComponent } from './trip-children/trip-children.component';
import { DrivermapComponent } from './drivermap/drivermap.component';

const routes: Routes = [

  {
    path:'drivermap',
    component:DrivermapComponent
  },
  {
    path:'',
    component:DrivermapComponent
  },
  {
    path:'tripchildren',
    component:TripChildrenComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverRoutingModule { }
