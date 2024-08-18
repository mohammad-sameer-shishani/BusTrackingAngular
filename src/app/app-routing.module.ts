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
import { AddTestimonialComponent } from './add-testimonial/add-testimonial.component';
import { authorizationGuard } from './authorization.guard';
import { driverGuard } from './driver.guard';
import { teacherGuard } from './teacher.guard';
import { parentGuard } from './parent.guard';


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
  loadChildren:()=>AdminModule,
  canActivate:[authorizationGuard]
},
{path:'teacher',
  loadChildren:()=>TeacherModule,
  canActivate:[teacherGuard]
},
{path:'driver',
  loadChildren:()=>DriverModule,
  canActivate:[driverGuard]
},
{path:'parent',
  loadChildren:()=>ParentModule,
  canActivate:[parentGuard]
},
{path:'addtestimonial',
  component:AddTestimonialComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
