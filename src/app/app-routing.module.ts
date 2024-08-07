import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { AuthModule } from './auth/auth.module';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { AdminModule } from './admin/admin.module';
import { ProfileComponent } from './profile/profile.component';
import { TeacherModule } from './teacher/teacher.module';
import { DriverModule } from './driver/driver.module';
import { ParentModule } from './parent/parent.module';


const routes: Routes = [
  {
    path:'home',
    component : HomeComponent
  },
{
  path:'aboutus',
  component : AboutComponent
},
{
  path:'contactus',
  component : ContactComponent
},
{
  path:'account',
  loadChildren:()=> import('./auth/auth.module').then(m=>m.AuthModule)
},

{
  path:'Testimonial',
  component:TestimonialsComponent
},
{
  path:'',
  component:HomeComponent
},
{
  path:'profile',
  component:ProfileComponent
},
{
  path:'admin',
  loadChildren:()=>AdminModule
},
{path:'teacher',
  loadChildren:()=>TeacherModule
},
{path:'driver',
  loadChildren:()=>DriverModule
},
{path:'parent',
  loadChildren:()=>ParentModule
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
