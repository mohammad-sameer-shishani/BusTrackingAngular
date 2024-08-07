import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParentmapComponent } from './parentmap/parentmap.component';

const routes: Routes = [
  {
    path : 'map',
    component:ParentmapComponent
  },
  {
    path:'',
    component:ParentmapComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentRoutingModule { }
