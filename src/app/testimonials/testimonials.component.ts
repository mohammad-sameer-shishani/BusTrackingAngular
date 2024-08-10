import { Component, OnInit } from '@angular/core';
import { TestimonialService } from '../Services/testimonial.service';
import { MatDialog } from '@angular/material/dialog';
import { AddTestimonialComponent } from '../add-testimonial/add-testimonial.component';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit{
  constructor(public testi:TestimonialService,public dialog:MatDialog){}
  authenticated:any;
  ngOnInit(): void {
    this.testi.GetAllTestimonials();
    this.authenticated=localStorage.getItem('token');
  }
  
  openAddDailog(){
    this.dialog.open(AddTestimonialComponent);
  }

}
