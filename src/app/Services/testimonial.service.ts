import { Dialog } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {

  constructor(private http :  HttpClient,public dialog:MatDialog) { }
baseURL='https://localhost:7169/api/testimonial';
allTestimonials:any;


GetAllTestimonials(){
  this.http.get(this.baseURL).subscribe(response=>{
this.allTestimonials=response;
console.log('Got All Testimonials')
  },error=>{
    console.log('error Getting All Testimonials')
    console.log(error.status)
  })
}
}
