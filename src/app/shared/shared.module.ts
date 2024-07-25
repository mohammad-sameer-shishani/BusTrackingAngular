import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import{HttpClientModule}from '@angular/common/http'


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule

  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    HttpClientModule
  ]

})
export class SharedModule { }
