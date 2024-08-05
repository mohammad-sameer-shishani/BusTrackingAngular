import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { TripChildrenComponent } from './trip-children/trip-children.component';

const routes: Routes = [

  {
    path:'',
    component:MapComponent
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
