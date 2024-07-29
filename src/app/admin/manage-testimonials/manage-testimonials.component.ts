import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HomeComponent } from 'src/app/home/home.component';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-manage-testimonials',
  templateUrl: './manage-testimonials.component.html',
  styleUrls: ['./manage-testimonials.component.css']
})
export class ManageTestimonialsComponent implements OnInit{
  constructor(private http:HttpClient,public home :HomeService){}
  ngOnInit(): void {
    this.home.getAllTestimonials();
  }
  
  acceptTestimonial(test :any){
    test.status='Accept';
    this.home.updateTestimonial(test);
  }

  rejectTestimonial(test:any){
    test.status='Reject';
    this.home.updateTestimonial(test);
  }

}
