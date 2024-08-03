import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ChildrenComponent } from '../children/children.component';

const routes: Routes = [

  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'profile',
    component:ProfileComponent
  },
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'children',
    component:ChildrenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
