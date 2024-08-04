import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapsComponent } from './maps/maps.component';
import { AdminManageMapComponent } from '../admin/admin-manage-map/admin-manage-map.component';



@NgModule({
  declarations: [
  
    MapsComponent
  ],
  imports: [
    CommonModule,
   
  ],
  exports:[
    MapsComponent
  ]
})
export class MapModule { }
