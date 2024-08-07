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
testimonial:any;

AllTestimonials : any=[];

GetAllTestimonials(){
  this.http.get(this.baseURL).subscribe(response=>{
this.AllTestimonials=response;
console.log('Got All Testimonials')
  },error=>{
    console.log('error Getting All Testimonials')
    console.log(error.status)
  })
}

updateTestimonial(body:any){
  this.http.put("https://localhost:7169/api/Testimonial",body).subscribe((response)=>{
    console.log('Testimonial Updated');
    window.location.reload();
},error => {
  console.log("Error Updating Testimonial");
})
}

getTestimonialById(testid: number){
  this.http.get('https://localhost:7169/api/Testimonial/'+testid).subscribe(response=>{
    this.testimonial=response;
    console.log("Got The Testimonial By Id")
  },error => {
    console.log("error getting The Testimonial");
    console.log(error.status);
  })
}
}
